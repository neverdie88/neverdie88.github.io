/* Salamander Grand Piano V3, Alexander Holm, CC BY 3.0. See samples/piano/. */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PianoSamples = api;
})(globalThis, function (root) {
  const base = root.document?.currentScript?.src
    ? new URL('./samples/piano/', root.document.currentScript.src).href : './samples/piano/';
  const anchors = Array.from({ length: 30 }, (_, index) => 21 + index * 3);
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const file = midi => `${names[midi % 12]}${Math.floor(midi / 12) - 1}v6.mp3`;
  const nearest = midi => anchors.reduce((best, note) => Math.abs(note - midi) < Math.abs(best - midi) ? note : best, anchors[0]);
  function createLoader({ fetchSample = url => fetch(url), baseURL = base } = {}) {
    const encoded = new Map(), contexts = new WeakMap();
    function bytes(midi) {
      if (!encoded.has(midi)) encoded.set(midi, (async () => {
        const response = await fetchSample(baseURL + encodeURIComponent(file(midi)));
        if (!response.ok) throw new Error('Piano samples could not load. Check your connection and press Play to retry.');
        return response.arrayBuffer();
      })().catch(error => { encoded.delete(midi); throw error; }));
      return encoded.get(midi);
    }
    async function load(context, onProgress = () => {}) {
      let buffers = contexts.get(context);
      if (!buffers) { buffers = new Map(); contexts.set(context, buffers); }
      let count = 0;
      onProgress(0, anchors.length);
      // Fetch all thirty notes once. Reuse both downloaded bytes and decoded
      // buffers, including between the full score and the draft player.
      await Promise.all(anchors.map(async midi => {
        if (!buffers.has(midi)) buffers.set(midi, bytes(midi)
          .then(data => context.decodeAudioData(data.slice(0)))
          .catch(error => { buffers.delete(midi); throw error; }));
        await buffers.get(midi); onProgress(++count, anchors.length);
      }));
      const decoded = new Map(await Promise.all(anchors.map(async midi => [midi, await buffers.get(midi)])));
      return {
        play(midi, at, duration, onEnded = () => {}) {
          const key = nearest(midi), source = context.createBufferSource(), gain = context.createGain();
          source.buffer = decoded.get(key);
          source.playbackRate.value = 2 ** ((midi - key) / 12);
          gain.gain.setValueAtTime(0, at);
          gain.gain.linearRampToValueAtTime(.6, at + .003);
          gain.gain.setValueAtTime(.6, at + duration);
          gain.gain.linearRampToValueAtTime(0, at + duration + .25);
          source.connect(gain); gain.connect(context.destination);
          source.onended = () => { source.disconnect(); gain.disconnect(); onEnded(source); };
          source.start(at); source.stop(at + duration + .26);
          return source;
        }
      };
    }
    return { load };
  }
  return { ...createLoader(), createLoader, anchors, file, nearest };
});
