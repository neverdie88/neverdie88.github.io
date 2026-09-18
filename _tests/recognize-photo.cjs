// Manual integration check: node _tests/recognize-photo.cjs /path/to/staff.png
const fs = require('node:fs');
const path = require('node:path');
const { PNG } = require('pngjs');
const engine = require('../pitch-visualizer/omr-engine.js');
const ort = require('../pitch-visualizer/lib/ort/ort.wasm.min.js');
ort.env.wasm.numThreads = 1;
ort.env.wasm.wasmPaths = path.resolve(__dirname, '../pitch-visualizer/lib/ort') + '/';
(async () => {
  const start = Date.now();
  const sessions = [];
  try {
    for (const file of ['encoder', 'decoder']) sessions.push(await ort.InferenceSession.create(fs.readFileSync(path.join(__dirname, '../pitch-visualizer/models/' + file + '.onnx')), { executionProviders: ['wasm'] }));
    const image = engine.grayImage(PNG.sync.read(fs.readFileSync(process.argv[2])));
    const vocab = require('../pitch-visualizer/models/vocabulary.json');
    const symbols = await engine.recognize(ort, ...sessions, vocab, engine.inputPixels(image, engine.findStaves(image)[0]), n => { if (n % 32 === 1) console.log('Symbols:', n); });
    fs.writeFileSync('/tmp/pitch-recognized.json', JSON.stringify(symbols, null, 2));
    console.log(symbols.map(s => s.rhythm + (s.pitch !== '.' ? ':' + s.pitch + s.lift : '')).join(' '));
    console.log('Elapsed seconds:', (Date.now() - start) / 1000);
  } finally { for (const session of sessions) await session.release(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
