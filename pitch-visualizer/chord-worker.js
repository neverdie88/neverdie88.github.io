let session, busy = false;
const ready = (async () => {
  // Include script loading in the handled startup path. Mode switches may
  // terminate the worker while a synchronous import is still in flight.
  importScripts('./chord-engine.js', './lib/ort/ort.wasm.min.js');
  ort.env.wasm.numThreads = 1;
  ort.env.wasm.wasmPaths = new URL('./lib/ort/', self.location.href).href;
  const manifest = await fetch('./models/basic-pitch/manifest.json');
  if (!manifest.ok) throw new Error('Chord listening files could not load.');
  const info = await manifest.json();
  const response = await fetch('./models/basic-pitch/model.onnx');
  if (!response.ok) throw new Error('The chord model could not download.');
  const bytes = await response.arrayBuffer();
  const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))).map(v => v.toString(16).padStart(2, '0')).join('');
  if (bytes.byteLength !== info.bytes || hash !== info.sha256) throw new Error('The chord model download was incomplete.');
  session = await ort.InferenceSession.create(bytes, { executionProviders: ['wasm'] });
  postMessage({ type: 'ready' });
})().catch(error => postMessage({ type: 'error', message: error.message }));
self.onmessage = async ({ data }) => {
  await ready;
  if (!session || busy || data.type !== 'audio') return;
  busy = true;
  try {
    const frames = await PitchChords.detect(ort, session, data.samples, data.sampleRate, data.a4, data.at, data.after);
    postMessage({ type: 'frames', frames, epoch: data.epoch });
  } catch (error) { postMessage({ type: 'error', message: error.message }); }
  finally { busy = false; }
};
