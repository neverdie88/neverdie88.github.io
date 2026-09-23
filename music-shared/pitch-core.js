/* YIN-style monophonic pitch estimation. No dependencies; usable in Node or a browser. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ViolinPitch = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
  const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const NATURALS = [0, 2, 4, 5, 7, 9, 11];
  const MAJOR = ['C♭', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯'];
  const MINOR = ['A♭', 'E♭', 'B♭', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯'];
  const KEYS = ['major', 'minor'].flatMap((mode) => [0, 1, 2, 3, 4, 5, 6, 7, -1, -2, -3, -4, -5, -6, -7].map((fifths) => ({ id: `${mode}:${fifths}`, name: `${(mode === 'major' ? MAJOR : MINOR)[fifths + 7]} ${mode}`, mode, fifths })));
  const RANGE = { minMidi: 21, maxMidi: 108 };
  const CLEFS = {
    treble: { label: 'G staff (treble)', name: 'treble', glyph: 'gClef', anchorStep: 2, stepOffset: 0, signatureOffset: 0 },
    bass: { label: 'F staff (bass)', name: 'bass', glyph: 'fClef', anchorStep: 6, stepOffset: 12, signatureOffset: -2 }
  };
  const notationCache = new Map();
  function keySignature(fifths = 0, clef = 'treble') {
    const order = fifths < 0 ? [6, 2, 5, 1, 4, 0, 3] : [3, 0, 4, 1, 5, 2, 6];
    const steps = fifths < 0 ? [4, 7, 3, 6, 2, 5, 1] : [8, 5, 9, 6, 3, 7, 4];
    return order.slice(0, Math.abs(fifths)).map((letter, i) => ({ letter, step: steps[i] + CLEFS[clef].signatureOffset, alteration: Math.sign(fifths), glyph: fifths < 0 ? 'accidentalFlat' : 'accidentalSharp' }));
  }
  function keyAlterations(fifths) {
    const result = Array(7).fill(0);
    keySignature(fifths).forEach((mark) => { result[mark.letter] = mark.alteration; });
    return result;
  }
  const frequency = (midi, a4 = 440) => a4 * 2 ** ((midi - 69) / 12);
  const midi = (hz, a4 = 440) => 69 + 12 * Math.log2(hz / a4);
  const name = (note) => NAMES[((note % 12) + 12) % 12] + (Math.floor(note / 12) - 1);
  function describe(hz, a4 = 440) {
    if (!Number.isFinite(hz) || hz <= 0 || !Number.isFinite(a4) || a4 <= 0) return null;
    const continuous = midi(hz, a4);
    const nearest = Math.round(continuous);
    return { hz, midi: nearest, name: name(nearest), cents: 100 * (continuous - nearest), target: frequency(nearest, a4) };
  }
  function notation(note, fifths = 0, clef = 'treble') {
    if (!Number.isInteger(note)) return null;
    const cacheKey = `${clef}:${fifths}:${note}`;
    if (notationCache.has(cacheKey)) return notationCache.get(cacheKey);
    const alterations = keyAlterations(fifths);
    const candidates = [];
    for (let letter = 0; letter < 7; letter++) {
      for (const alteration of [-1, 0, 1]) {
        const octave = (note - NATURALS[letter] - alteration) / 12 - 1;
        if (!Number.isInteger(octave)) continue;
        // Prefer notes supplied by the key, then natural cancellations, then
        // chromatic sharps or flats from the same signature family.
        const cost = alteration === alterations[letter] ? 0 : alteration === 0 ? 1 : alteration === (fifths < 0 ? -1 : 1) ? 2 : 3;
        candidates.push({ letter, alteration, octave, cost });
      }
    }
    candidates.sort((a, b) => a.cost - b.cost);
    const { letter, alteration, octave } = candidates[0];
    // One step is one staff line or space. The bottom line is E4 in G clef
    // and G2 in F clef; changing clef never changes the sounding pitch.
    const step = 7 * (octave - 4) + letter - 2 + CLEFS[clef].stepOffset;
    const ledgerSteps = [];
    for (let ledger = -2; ledger >= step; ledger -= 2) ledgerSteps.push(ledger);
    for (let ledger = 10; ledger <= step; ledger += 2) ledgerSteps.push(ledger);
    const result = { name: LETTERS[letter] + (alteration === 1 ? '♯' : alteration === -1 ? '♭' : '') + octave, letter, alteration, octave, step, sharp: alteration === 1, ledgerSteps, stemDown: step >= 4 };
    notationCache.set(cacheKey, result);
    return result;
  }
  function spellTrail(notes, fifths = 0, clef = 'treble') {
    const accidentals = new Map();
    const signature = keyAlterations(fifths);
    return notes.map((midi) => {
      const note = notation(midi, fifths, clef);
      const naturalName = `${note.letter}:${note.octave}`;
      const expected = accidentals.get(naturalName) ?? signature[note.letter];
      const accidental = note.alteration === expected ? null : note.alteration === 1 ? 'accidentalSharp' : note.alteration === -1 ? 'accidentalFlat' : 'accidentalNatural';
      accidentals.set(naturalName, note.alteration);
      return { ...note, accidental };
    });
  }
  function createPitchTrace(windowMs = 8000) {
    let points = [], endTime = 0;
    return {
      windowMs,
      get points() { return points; },
      get endTime() { return endTime; },
      push(pitch, time) {
        if (!Number.isFinite(time) || (points.length && time < endTime)) return;
        endTime = time;
        if (points.at(-1)?.time === time) points.pop();
        points.push(Array.isArray(pitch) ? { time, pitch: null, pitches: pitch } : { time, pitch });
        points = points.filter((point) => point.time >= time - windowMs);
      },
      reset() { points = []; endTime = 0; }
    };
  }
  function traceSegments(points, fifths = 0, clef = 'treble') {
    const segments = [];
    let previous = null, segment = null;
    for (const point of points) {
      if (!point.pitch) { previous = null; continue; }
      const writtenStep = notation(point.pitch.midi, fifths, clef).step;
      const plotted = { time: point.time, step: writtenStep + point.pitch.cents / 100, midi: point.pitch.midi, writtenStep };
      // A changed accidental can share a staff position. Break there rather
      // than drawing a misleading downward/upward sweep between accidentals.
      const changedAccidental = previous && previous.midi !== plotted.midi && previous.writtenStep === writtenStep;
      if (!previous || point.time - previous.time > 180 || changedAccidental) {
        segment = [];
        segments.push(segment);
      }
      segment.push(plotted);
      previous = plotted;
    }
    return segments;
  }
  function createNoteTrail({ settleMs = 100, releaseMs = 250, capacity = 64 } = {}) {
    let entries = [], active = null, candidate = null, lastSound = -Infinity, nextId = 0;
    function append(midi, now) {
      if (!Number.isInteger(midi) || !Number.isFinite(now)) return;
      active = { id: ++nextId, midi, startedAt: now, endedAt: now };
      entries.push(active);
      if (entries.length > capacity) entries.splice(0, entries.length - capacity);
      lastSound = now;
      candidate = null;
      return active;
    }
    return {
      get entries() { return entries; },
      get activeId() { return active?.id ?? null; },
      append,
      update(midi, now) {
        if (now - lastSound >= releaseMs) active = null;
        if (!Number.isInteger(midi)) { candidate = null; return; }
        lastSound = now;
        if (active?.midi === midi) { active.endedAt = now; candidate = null; return; }
        if (candidate?.midi !== midi) { candidate = { midi, since: now }; return; }
        if (now - candidate.since >= settleMs) {
          const start = candidate.since;
          append(midi, now).startedAt = start;
        }
      },
      release() { active = null; candidate = null; lastSound = -Infinity; },
      reset() { entries = []; active = null; candidate = null; lastSound = -Infinity; nextId = 0; }
    };
  }
  function sampleSize(sampleRate, minHz = frequency(RANGE.minMidi - 0.5)) {
    // Four periods at the lowest pitch, within Web Audio's analyser limits.
    return Math.min(32768, 2 ** Math.ceil(Math.log2(Math.max(2048, sampleRate / minHz * 4))));
  }
  function createDetector({ minHz = frequency(RANGE.minMidi - 0.5), maxHz = frequency(RANGE.maxMidi + 0.5), threshold = 0.15, silenceRms = 0.008 } = {}) {
    let difference = new Float64Array(0), prefix = new Float64Array(0);
    let real = new Float64Array(0), imaginary = new Float64Array(0);
    let cosine = new Float64Array(0), sine = new Float64Array(0), reverse = new Uint32Array(0);
    function prepare(length) {
      if (real.length === length) return;
      real = new Float64Array(length);
      imaginary = new Float64Array(length);
      cosine = new Float64Array(length / 2);
      sine = new Float64Array(length / 2);
      reverse = new Uint32Array(length);
      for (let i = 0; i < length / 2; i++) {
        cosine[i] = Math.cos(2 * Math.PI * i / length);
        sine[i] = Math.sin(2 * Math.PI * i / length);
      }
      for (let i = 1; i < length; i++) reverse[i] = (reverse[i >> 1] >> 1) | ((i & 1) ? length / 2 : 0);
    }
    function fft(inverse) {
      const length = real.length;
      for (let i = 0; i < length; i++) {
        const j = reverse[i];
        if (j > i) {
          [real[i], real[j]] = [real[j], real[i]];
          [imaginary[i], imaginary[j]] = [imaginary[j], imaginary[i]];
        }
      }
      for (let size = 2; size <= length; size *= 2) {
        const half = size / 2, stride = length / size;
        for (let start = 0; start < length; start += size) {
          for (let j = 0; j < half; j++) {
            const a = start + j, b = a + half;
            const wr = cosine[j * stride], wi = sine[j * stride] * (inverse ? 1 : -1);
            const tr = wr * real[b] - wi * imaginary[b], ti = wr * imaginary[b] + wi * real[b];
            real[b] = real[a] - tr;
            imaginary[b] = imaginary[a] - ti;
            real[a] += tr;
            imaginary[a] += ti;
          }
        }
      }
      if (inverse) for (let i = 0; i < length; i++) { real[i] /= length; imaginary[i] /= length; }
    }
    return function detect(samples, sampleRate) {
      if (!samples || samples.length < 64 || !Number.isFinite(sampleRate) || sampleRate <= 0) return null;
      let mean = 0;
      for (let i = 0; i < samples.length; i++) mean += samples[i];
      mean /= samples.length;
      let energy = 0;
      for (let i = 0; i < samples.length; i++) energy += (samples[i] - mean) ** 2;
      const rms = Math.sqrt(energy / samples.length);
      if (!Number.isFinite(rms) || rms < silenceRms) return null;
      const maxLag = Math.min(Math.ceil(sampleRate / minHz), Math.floor(samples.length / 2) - 1);
      const minLag = Math.max(2, Math.floor(sampleRate / maxHz));
      if (maxLag <= minLag) return null;
      if (difference.length < maxLag + 2) difference = new Float64Array(maxLag + 2);
      if (prefix.length < samples.length + 1) prefix = new Float64Array(samples.length + 1);
      // Zero padding makes this a linear autocorrelation. FFT computation avoids
      // a long nested difference loop when low notes require thousands of lags.
      prepare(2 ** Math.ceil(Math.log2(samples.length * 2)));
      real.fill(0);
      imaginary.fill(0);
      prefix[0] = 0;
      for (let i = 0; i < samples.length; i++) {
        real[i] = samples[i] - mean;
        prefix[i + 1] = prefix[i] + real[i] * real[i];
      }
      fft(false);
      for (let i = 0; i < real.length; i++) { real[i] = real[i] * real[i] + imaginary[i] * imaginary[i]; imaginary[i] = 0; }
      fft(true);
      difference[0] = 1;
      let cumulative = 0;
      for (let lag = 1; lag <= maxLag + 1; lag++) {
        // Normalize for overlap length before cumulative mean normalization.
        const sum = Math.max(0, (prefix[samples.length - lag] + prefix[samples.length] - prefix[lag] - 2 * real[lag]) / (samples.length - lag));
        cumulative += sum;
        difference[lag] = cumulative > 0 ? sum * lag / cumulative : 1;
      }
      function interpolate(lag) {
        const left = difference[lag - 1], center = difference[lag], right = difference[lag + 1];
        const denominator = left - 2 * center + right;
        const offset = denominator > 0 ? Math.max(-0.5, Math.min(0.5, 0.5 * (left - right) / denominator)) : 0;
        return { lag: lag + offset, value: center - 0.25 * (left - right) * offset };
      }
      let period = -1;
      let confidence = 0;
      for (let lag = minLag; lag <= maxLag; lag++) {
        if (difference[lag] <= difference[lag - 1] && difference[lag] <= difference[lag + 1]) {
          const minimum = interpolate(lag);
          // At the highest notes, a true minimum can sit between two samples.
          // Evaluate the interpolated minimum before rejecting the fundamental.
          if (minimum.value >= threshold) continue;
          period = minimum.lag;
          confidence = 1 - Math.max(0, minimum.value);
          break;
        }
      }
      // Reject unpitched sound instead of forcing a closest match.
      if (period < 0) return null;
      // Refine across several periods to reduce sample-quantization error in
      // high notes, which may have only 9–12 samples per fundamental cycle.
      const multiple = Math.min(16, Math.floor((maxLag - 2) / period));
      if (multiple >= 2) {
        const expected = Math.round(period * multiple);
        let best = expected;
        for (let lag = Math.max(1, expected - 2); lag <= Math.min(maxLag, expected + 2); lag++) if (difference[lag] < difference[best]) best = lag;
        const refined = interpolate(best);
        if (refined.value < threshold) period = refined.lag / multiple;
      }
      const hz = sampleRate / period;
      if (!Number.isFinite(hz) || hz < minHz || hz > maxHz) return null;
      return { hz, rms, confidence };
    };
  }
  return { KEYS, CLEFS, RANGE, keySignature, frequency, midi, name, describe, notation, spellTrail, createNoteTrail, createPitchTrace, traceSegments, sampleSize, createDetector };
});
