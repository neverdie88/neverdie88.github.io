/* SPDX-License-Identifier: AGPL-3.0-only; see models/LICENSE.txt. */
importScripts('./omr-engine.js', './omr-musicxml.js', './lib/ort/ort.wasm.min.js');
ort.env.wasm.numThreads = 1; // Works on GitHub Pages without cross-origin isolation.
ort.env.wasm.wasmPaths = new URL('./lib/ort/', self.location.href).href;
const progress = text => postMessage({ type: 'progress', text });
async function modelFile(name, manifest) {
  const entry = manifest[name];
  const url = new URL('./models/' + entry.file, self.location.href).href;
  let cache;
  try { cache = await caches.open('pitch-omr-426-v1'); } catch { /* Storage can be disabled. */ }
  let response = await cache?.match(url);
  let bytes = response ? await response.arrayBuffer() : null;
  const valid = async data => data?.byteLength === entry.bytes && Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', data))).map(v => v.toString(16).padStart(2, '0')).join('') === entry.sha256;
  if (!await valid(bytes)) {
    progress(`Downloading ${name === 'encoder' ? '1' : '2'} of 2 recognition models… (100 MB total, saved in this browser when space allows)`);
    response = await fetch(url);
    if (!response.ok) throw new Error(`The recognition model could not download (HTTP ${response.status}). Check your connection and try again.`);
    bytes = await response.arrayBuffer();
    if (!await valid(bytes)) throw new Error('The recognition model download was incomplete. Please try again.');
    try { await cache?.put(url, new Response(bytes, { headers: { 'Content-Type': 'application/octet-stream' } })); } catch { /* Recognition still works without persistent cache. */ }
  }
  return bytes;
}
self.onmessage = async ({ data }) => {
  const sessions = [];
  try {
    progress('Finding staff lines…');
    const image = PitchOMR.grayImage(data.image);
    const staves = PitchOMR.findStaves(image);
    postMessage({ type: 'staves', count: staves.length });
    const selected = data.line === 'all' ? staves : [staves[Number(data.line)]];
    if (selected.some(s => !s)) throw new Error('That staff line was not found. Choose another line and try again.');
    const manifestResponse = await fetch('./models/manifest.json');
    const vocabResponse = await fetch('./models/vocabulary.json');
    if (!manifestResponse.ok || !vocabResponse.ok) throw new Error('Recognition files could not load. Check your connection and try again.');
    const manifest = await manifestResponse.json(), vocabulary = await vocabResponse.json();
    for (const name of ['encoder', 'decoder']) {
      const bytes = await modelFile(name, manifest);
      progress('Preparing recognition…');
      sessions.push(await ort.InferenceSession.create(bytes, { executionProviders: ['wasm'] }));
    }
    const results = [];
    for (let i = 0; i < selected.length; i++) {
      const report = count => progress(`Reading staff ${i + 1} of ${selected.length}${count ? ` · ${count} symbols` : ''}…`);
      report();
      results.push(await PitchOMR.recognize(ort, ...sessions, vocabulary, PitchOMR.inputPixels(image, selected[i]), report));
    }
    const result = PitchOMRXML.convert(results, data.title);
    if (staves.length > 1 && data.line === 'all') result.warnings.push('Staff lines are joined from top to bottom as one instrument. For piano or ensemble scores, select one staff line at a time.');
    postMessage({ type: 'result', ...result });
  } catch (error) {
    postMessage({ type: 'error', message: error instanceof Error ? error.message : 'Recognition could not run on this device. Try a smaller photo, or open MusicXML.' });
  } finally { for (const session of sessions) await session.release(); }
};
