const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { PNG } = require('pngjs');
const { DOMParser } = require('@xmldom/xmldom');
const engine = require('../pitch-visualizer/omr-engine.js');
const { convert } = require('../pitch-visualizer/omr-musicxml.js');
const { parse } = require('../pitch-visualizer/music-score.js');
const fixture = PNG.sync.read(fs.readFileSync(path.join(__dirname,'fixtures/printed-chords.png')));
test('staff segmentation finds printed lines and rejects a blank photograph', () => {
  assert.equal(engine.findStaves(engine.grayImage(fixture)).length,1);
  assert.throws(() => engine.findStaves({data:new Uint8Array(900*1200).fill(255),width:900,height:1200}), /No clear five-line/);
  const page = {width:fixture.width,height:fixture.height*3+600,data:new Uint8Array(fixture.width*(fixture.height*3+600)).fill(255)};
  const gray = engine.grayImage(fixture);
  for(let i=0;i<3;i++) page.data.set(gray.data,(i*(fixture.height+150)+75)*page.width);
  assert.equal(engine.findStaves(page).length,3);
});
test('real HOMR WASM inference exports the expected melody from a printed image', {timeout:120000}, async () => {
  const ort = require('../pitch-visualizer/lib/ort/ort.wasm.min.js');
  ort.env.wasm.numThreads=1; ort.env.wasm.wasmPaths=path.resolve(__dirname,'../pitch-visualizer/lib/ort')+'/';
  const sessions=[];
  try {
    const manifest=require('../pitch-visualizer/models/manifest.json');
    for(const name of ['encoder','decoder']) {
      const bytes=fs.readFileSync(path.join(__dirname,'../pitch-visualizer/models',manifest[name].file));
      assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest[name].sha256);
      sessions.push(await ort.InferenceSession.create(bytes,{executionProviders:['wasm']}));
    }
    const gray=engine.grayImage(fixture);
    const symbols=await engine.recognize(ort,...sessions,require('../pitch-visualizer/models/vocabulary.json'),engine.inputPixels(gray,engine.findStaves(gray)[0]));
    const score=parse(convert([symbols],'Printed chords').xml,DOMParser);
    assert.deepEqual(score.lanes[0].events.map(n=>n.notes.at(-1).name),'C5 C5 C5 C5 D5 D5 D5 D5 D5 C5 B4 A4 A4 G4 G4 G4 E4'.split(' '));
    assert.equal(score.lanes[0].events[4].notes[0].name,'F♯4');
    assert.equal(score.lanes[0].events[4].notes[0].duration,4);
  } finally {for(const session of sessions) await session.release();}
});
