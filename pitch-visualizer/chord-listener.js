/* Bounded live inference: one audio window in flight, no queued recordings. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ChordListener = api;
})(globalThis, function () {
  function create({ onFrames, onStatus, makeWorker = () => new Worker('./chord-worker.js') }) {
    let worker = null, ready = false, busy = false, failed = false;
    let epoch = 0, after = -Infinity, lastSent = -Infinity, timer;
    const clearTimer = () => { clearTimeout(timer); timer = null; };
    function fail(message) {
      worker?.terminate(); worker = null; ready = busy = false; failed = true; clearTimer();
      onStatus({ state: 'error', message: message || 'Chord listening could not start.' });
    }
    return {
      start() {
        if (worker || failed) return;
        onStatus({ state: 'loading' });
        try {
          const current = makeWorker(); worker = current;
          timer = setTimeout(() => fail('Chord listening took too long to load. Check your connection and retry.'), 30000);
          current.onerror = event => {
            // Chromium can report an aborted import after a worker is stopped
            // during a mode switch. Handle errors here, including stale ones.
            event?.preventDefault();
            if (worker === current) fail('Chord listening is unavailable in this browser.');
          };
          current.onmessage = ({ data }) => {
            if (worker !== current) return;
            if (data.type === 'error') { fail(data.message); return; }
            if (data.type === 'ready') { clearTimer(); ready = true; onStatus({ state: 'ready' }); }
            if (data.type === 'frames') {
              busy = false; clearTimer();
              if (data.epoch !== epoch) return;
              const frames = data.frames.filter(frame => frame.time > after);
              if (frames.length) { after = frames.at(-1).time; onFrames(frames); }
            }
          };
        } catch (error) { fail(error.message); }
      },
      reset(at) { epoch++; after = at; lastSent = -Infinity; },
      submit(samples, sampleRate, a4, at) {
        if (!ready || busy || at - lastSent < 120) return;
        busy = true; lastSent = at;
        const copy = samples.slice();
        timer = setTimeout(() => fail('Chord listening stopped responding. Please retry.'), 10000);
        try { worker.postMessage({ type: 'audio', samples: copy, sampleRate, a4, at, after, epoch }, [copy.buffer]); }
        catch (error) { fail(error.message); }
      },
      stop() {
        worker?.terminate(); worker = null; ready = busy = failed = false;
        epoch++; after = lastSent = -Infinity; clearTimer(); onStatus({ state: 'stopped' });
      }
    };
  }
  return { create };
});
