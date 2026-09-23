/* Live adapter for Spotify Basic Pitch (model attribution: models/basic-pitch/). */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PitchChords = api;
})(globalThis, function () {
  'use strict';
  const RATE = 22050, SIZE = 43844, HOP = 256, PAD = 3840;
  const NOTE_OUTPUT = 'StatefulPartitionedCall:1', CONTOUR_OUTPUT = 'StatefulPartitionedCall:0';
  function prepare(samples, sampleRate, a4 = 440) {
    if (!samples?.length || !Number.isFinite(sampleRate) || sampleRate < 8000 || !Number.isFinite(a4) || a4 < 400 || a4 > 480) throw new Error('Invalid microphone audio.');
    // Shift calibrated A4 to the model's 440 Hz reference while resampling.
    // A windowed-sinc low-pass prevents frequencies above 11 kHz aliasing down.
    const ratio = sampleRate / RATE * 440 / a4, cutoff = Math.min(1, 1 / ratio) * .94;
    const length = Math.min(SIZE - PAD * 2, Math.floor((samples.length - 1) / ratio));
    const input = new Float32Array(SIZE), start = samples.length - 1 - length * ratio;
    for (let j = 0; j < length; j++) {
      const position = start + j * ratio, base = Math.floor(position);
      let sum = 0, weight = 0;
      for (let k = base - 15; k <= base + 16; k++) {
        if (k < 0 || k >= samples.length) continue;
        const x = position - k, z = Math.PI * x * cutoff;
        const w = (Math.abs(z) < 1e-8 ? cutoff : Math.sin(z) / (Math.PI * x)) * (.5 + .5 * Math.cos(Math.PI * x / 16));
        sum += samples[k] * w; weight += w;
      }
      input[PAD + j] = sum / weight;
    }
    return { input, length, timeScale: 440 / a4, a4 };
  }
  function decode(outputs, prepared, at, after = -Infinity) {
    const { input, length, timeScale, a4 } = prepared;
    const notes = outputs[NOTE_OUTPUT], contours = outputs[CONTOUR_OUTPUT];
    if (notes?.dims[1] !== 172 || notes?.dims[2] !== 88 || contours?.dims[2] !== 264) throw new Error('Unexpected chord model output.');
    const frames = [];
    // Keep real audio on both sides of a reported frame. Model padding is never
    // treated as a played note or a release. Times refer to captured audio.
    const first = Math.ceil((PAD + RATE * .1) / HOP);
    const last = Math.floor((PAD + length - RATE * .12) / HOP);
    for (let frame = first; frame <= last; frame++) {
      const time = at + (frame * HOP - PAD - length) / RATE * timeScale * 1000;
      if (time <= after) continue;
      let energy = 0;
      for (let i = frame * HOP - 256; i < frame * HOP + 256; i++) energy += input[i] ** 2;
      const pitches = [];
      if (Math.sqrt(energy / 512) >= .008) for (let n = 0; n < 88; n++) {
        const confidence = notes.data[frame * 88 + n];
        if (confidence < .45) continue;
        // Each semitone has three contour bins; its central (second) bin is
        // the nominal pitch (see Basic Pitch ANNOTATIONS_BASE_FREQUENCY).
        const center = n * 3 + 1, row = frame * 264;
        let peak = center;
        for (let bin = Math.max(0, center - 1); bin <= Math.min(263, center + 1); bin++) if (contours.data[row + bin] > contours.data[row + peak]) peak = bin;
        const left = contours.data[row + Math.max(0, peak - 1)], middle = contours.data[row + peak], right = contours.data[row + Math.min(263, peak + 1)];
        const divisor = left - 2 * middle + right;
        const offset = divisor < -1e-6 ? Math.max(-.5, Math.min(.5, .5 * (left - right) / divisor)) : 0;
        const cents = (peak + offset - center) * 100 / 3, midi = n + 21;
        pitches.push({ midi, cents, hz: a4 * 2 ** ((midi - 69 + cents / 100) / 12), confidence });
      }
      frames.push({ time, pitches });
    }
    return frames;
  }
  async function detect(ort, session, samples, sampleRate, a4, at, after) {
    const prepared = prepare(samples, sampleRate, a4);
    const tensor = new ort.Tensor('float32', prepared.input, [1, SIZE, 1]);
    let outputs;
    try {
      outputs = await session.run({ 'serving_default_input_2:0': tensor });
      return decode(outputs, prepared, at, after);
    } finally {
      tensor.dispose?.();
      if (outputs) Object.values(outputs).forEach(value => value.dispose?.());
    }
  }
  return { prepare, decode, detect };
});
