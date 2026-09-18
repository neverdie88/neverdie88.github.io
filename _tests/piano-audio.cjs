const fs = require('node:fs');
const path = require('node:path');
const samples = new Map();
function recording(name) {
  if (!samples.has(name)) {
    const wav = fs.readFileSync(path.join(__dirname, 'fixtures/piano', name + '.wav'));
    let start = 12;
    while (wav.toString('ascii', start, start + 4) !== 'data') start += 8 + wav.readUInt32LE(start + 4) + (wav.readUInt32LE(start + 4) % 2);
    const length = wav.readUInt32LE(start + 4) / 2;
    samples.set(name, Float32Array.from({ length }, (_, i) => wav.readInt16LE(start + 8 + i * 2) / 32768));
  }
  return samples.get(name);
}
const sources = [[48, 'C3'], [60, 'C4'], [63, 'Ds4'], [66, 'Fs4'], [69, 'A4'], [72, 'C5']];
function piano(midi, seconds, a4 = 440) {
  const [base, name] = sources.reduce((best, source) => Math.abs(source[0] - midi) < Math.abs(best[0] - midi) ? source : best);
  const data = recording(name), index = seconds * 22050 * 2 ** ((midi - base) / 12) * a4 / 440, i = Math.floor(index);
  return i < 0 || i + 1 >= data.length ? 0 : data[i] + (data[i + 1] - data[i]) * (index - i);
}
function windowAudio(notes, at, { sampleRate = 48000, a4 = 440, gain = 1, onset = 0 } = {}) {
  const result = new Float32Array(32768);
  for (let i = 0; i < result.length; i++) {
    const time = at / 1000 - (result.length - i) / sampleRate - onset;
    for (const midi of notes) result[i] += gain * piano(midi, time, a4) / Math.sqrt(Math.max(1, notes.length));
  }
  return result;
}
module.exports = { piano, windowAudio };
