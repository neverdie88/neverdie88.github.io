const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { detect } = require('../sheet-music/chord-engine.js');
const { createFollower } = require('../sheet-music/music-score.js');
const { create } = require('../sheet-music/chord-listener.js');
const { windowAudio } = require('./piano-audio.cjs');
const group = midis => ({ notes: midis.map(midi => ({ midi })) });

test('polyphonic follower handles partial/repeated chords without reusing held notes', () => {
  const f = createFollower([group([60, 64, 67]), group([60, 64, 67])]);
  const feed = (midis, from, to) => { for (let t = from; t <= to; t += 50) f.update(midis.map(midi => ({ midi, cents: 0 })), t); };
  feed([60, 67], 0, 300); assert.equal(f.current().index, 0); assert.deepEqual(f.current().matchedPitches, [60, 67]);
  feed([60, 64, 67], 350, 650); assert.equal(f.current().index, 1);
  feed([60, 64, 67], 700, 1500); assert.equal(f.current().index, 1);
  feed([], 1550, 1750); feed([60, 64, 67], 1800, 2100); assert.equal(f.current().complete, true);
});

test('live listener drops old results on reset/stop, bounds work, and can retry failures', () => {
  const workers = [], received = [], statuses = [];
  const listener = create({ onFrames: frames => received.push(frames), onStatus: state => statuses.push(state), makeWorker() {
    const worker = { sent: [], postMessage(data) { this.sent.push(data); }, terminate() { this.stopped = true; } }; workers.push(worker); return worker;
  } });
  const audio = new Float32Array(32768);
  listener.start(); const worker = workers[0]; worker.onmessage({ data: { type: 'ready' } });
  listener.reset(100); listener.submit(audio, 48000, 440, 300); listener.submit(audio, 48000, 440, 500);
  assert.equal(worker.sent.length, 1);
  const old = worker.sent[0]; listener.reset(400);
  worker.onmessage({ data: { type: 'frames', epoch: old.epoch, frames: [{ time: 280, pitches: [] }] } }); assert.equal(received.length, 0);
  listener.submit(audio, 48000, 440, 600); const next = worker.sent[1];
  worker.onmessage({ data: { type: 'frames', epoch: next.epoch, frames: [{ time: 350, pitches: [] }, { time: 450, pitches: [] }] } }); assert.equal(received[0].length, 1);
  worker.onmessage({ data: { type: 'error', message: 'Download failed' } }); assert.equal(statuses.at(-1).state, 'error');
  listener.stop(); listener.start(); assert.equal(workers.length, 2);
  listener.stop(); worker.onmessage({ data: { type: 'ready' } }); assert.equal(statuses.at(-1).state, 'stopped');
  let handled=false;worker.onerror({preventDefault(){handled=true;}});
  assert.equal(handled,true);assert.equal(statuses.at(-1).state,'stopped','aborted imports from an old mode must not report a current failure');
  listener.start();workers.at(-1).onerror({preventDefault(){}});assert.equal(statuses.at(-1).state,'error');
  listener.stop();
});

test('real Basic Pitch WASM recognizes recorded piano chords and rejects missing/wrong tones', { timeout: 120000 }, async () => {
  const ort = require('../sheet-music/lib/ort/ort.wasm.min.js');
  ort.env.wasm.numThreads = 1; ort.env.wasm.wasmPaths = path.resolve(__dirname, '../sheet-music/lib/ort') + '/';
  const bytes = fs.readFileSync(path.join(__dirname, '../sheet-music/models/basic-pitch/model.onnx'));
  const manifest = require('../sheet-music/models/basic-pitch/manifest.json');
  assert.equal(createHash('sha256').update(bytes).digest('hex'), manifest.sha256);
  const session = await ort.InferenceSession.create(bytes, { executionProviders: ['wasm'] });
  try {
    for (const { target, played, complete, sampleRate = 48000, a4 = 440 } of [
      { target: [60, 64, 67], played: [60, 64, 67], complete: true },
      { target: [60, 63, 66, 69], played: [60, 63, 66, 69], complete: true, sampleRate: 44100 },
      { target: [60, 64, 67], played: [60, 67], complete: false },
      { target: [60, 64, 67], played: [60, 65, 67], complete: false },
      { target: [60, 72], played: [60], complete: false },
      { target: [69, 72], played: [69, 72], complete: true, a4: 442 },
      { target: [60, 64], played: [], complete: false }
    ]) {
      const follower = createFollower([group(target)]); let after = 0, concurrent = false;
      for (let at = 300; at <= 1300 && !follower.current().complete; at += 120) {
        const frames = await detect(ort, session, windowAudio(played, at, { sampleRate, a4 }), sampleRate, a4, at, after);
        for (const frame of frames) {
          concurrent ||= target.every(midi => frame.pitches.some(p => p.midi === midi));
          follower.update(frame.pitches, frame.time); after = frame.time;
        }
      }
      assert.equal(follower.current().complete, complete, `target ${target}; played ${played}; matched ${follower.current().matchedPitches}`);
      if (complete) assert.equal(concurrent, true, 'all chord tones must be detected in the same audio frame');
    }
  } finally { await session.release(); }
});
