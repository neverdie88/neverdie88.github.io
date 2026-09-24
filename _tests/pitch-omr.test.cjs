const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { PNG } = require('pngjs');
const { DOMParser } = require('@xmldom/xmldom');
const engine = require('../sheet-music/omr-engine.js');
const { convert, convertGrandStaff } = require('../sheet-music/omr-musicxml.js');
const { parse } = require('../sheet-music/music-score.js');
const fixture = PNG.sync.read(fs.readFileSync(path.join(__dirname,'fixtures/printed-chords.png')));
test('staff segmentation finds printed lines and rejects a blank photograph', () => {
  assert.equal(engine.findStaves(engine.grayImage(fixture)).length,1);
  assert.throws(() => engine.findStaves({data:new Uint8Array(900*1200).fill(255),width:900,height:1200}), /No clear five-line/);
  const page = {width:fixture.width,height:fixture.height*3+600,data:new Uint8Array(fixture.width*(fixture.height*3+600)).fill(255)};
  const gray = engine.grayImage(fixture);
  for(let i=0;i<3;i++) page.data.set(gray.data,(i*(fixture.height+150)+75)*page.width);
  assert.equal(engine.findStaves(page).length,3);
});
function pairedStaves(connected=true,angle=0){
  const width=2318,height=1342,data=new Uint8Array(width*height).fill(255),slope=Math.tan(angle*Math.PI/180);
  const ink=(x,y)=>{y=Math.round(y+slope*(x-width/2));if(y>=0&&y<height)data[y*width+x]=0;};
  for(const top of [143,447,773,1131])for(let line=0;line<5;line++)for(let x=40;x<2250;x++)for(let dy=0;dy<2;dy++)ink(x,top+line*20+dy);
  if(connected)for(const [top,bottom]of [[143,527],[773,1211]])for(let y=top;y<=bottom;y++)for(let x=40;x<43;x++)ink(x,y);
  return {width,height,data};
}
test('staff fitting tolerates alternating rounded gaps and preserves connected grand-staff rows',()=>{
  for(const angle of [0,2]){
    const image=pairedStaves(true,angle),staves=engine.findStaves(image);
    assert.equal(staves.length,4,'all four five-line staves survive downsampling');
    assert.deepEqual(engine.findSystems(image,staves),[[0,1],[2,3]]);
    assert.ok(staves.every(s=>Math.abs(s.gap-20)<2));
  }
  const image=pairedStaves(false),staves=engine.findStaves(image);
  assert.deepEqual(engine.findSystems(image,staves),[[0],[1],[2],[3]],'unconnected rows are not guessed to be piano staves');
});
test('grand-staff conversion aligns both lanes, preserves chord pitches, and carries signatures across rows',()=>{
  const s=(rhythm,pitch='.',lift='_')=>({rhythm,pitch,lift});
  const upper=[s('clef_G2'),s('keySignature_-4'),s('timeSignature/4'),s('note_4.','C5'),s('chord'),s('note_4.','A4','b'),s('note_8','D5','b'),s('note_4','E5','b'),s('barline')];
  const lower=[s('clef_F4'),s('keySignature_-4'),s('timeSignature/4'),s('note_2','A2','b'),s('note_4','E3','b'),s('barline')];
  const result=convertGrandStaff([[upper,lower],[[s('note_2.','E5','b'),s('barline')],[s('note_2.','A2','b'),s('barline')]]],'Grand & staff');
  const parsed=parse(result.xml,DOMParser),doc=new DOMParser().parseFromString(result.xml,'application/xml');
  assert.equal(parsed.title,'Grand & staff');assert.equal(result.noteCount,8);
  assert.deepEqual(parsed.lanes.map(l=>[l.staff,l.clef,l.events.map(e=>[e.measureIndex,e.beat])]),[['1','treble',[[0,0],[0,1.5],[0,2],[1,0]]],['2','bass',[[0,0],[0,2],[1,0]]]]);
  assert.deepEqual(parsed.lanes[0].events[0].notes.map(n=>n.midi),[68,72]);
  assert.equal(doc.getElementsByTagName('staves')[0].textContent,'2');
  assert.equal(doc.getElementsByTagName('measure')[1].firstChild.getAttribute('new-system'),'yes');
  assert.equal(doc.getElementsByTagName('measure')[1].getElementsByTagName('attributes').length,0,'unchanged signatures are not re-announced at a new row');
  const {create}=require('../sheet-music/score-editor-model.js'),{XMLSerializer}=require('@xmldom/xmldom'),draft=create(result.xml,DOMParser,XMLSerializer);
  assert.equal(draft.context(0,1,'2').clef,'bass');assert.equal(draft.context(0,1,'1').fifths,-4);assert.equal(draft.context(0,1).beats,'3');
  assert.deepEqual(draft.inspect().groups.filter(g=>!g.rest).map(g=>g.beat),[0,1.5,2,0,2]);
});
test('grand-staff conversion shares divisions across tuplets, keeps rest-only lanes, and rejects unmatched bars',()=>{
  const s=(rhythm,pitch='C4')=>({rhythm,pitch,lift:'_'}),upper=[s('clef_G2'),s('note_8'),s('note_8'),s('barline')];
  const lower=[s('clef_F4'),s('note_12','C3'),s('note_12','D3'),s('note_12','E3'),s('barline')];
  const result=convertGrandStaff([[upper,lower],[[s('note_4'),s('barline')],[s('rest_4'),s('barline')]]]);
  const parsed=parse(result.xml,DOMParser),doc=new DOMParser().parseFromString(result.xml,'application/xml');
  assert.deepEqual(parsed.lanes[0].events.map(e=>[e.measureIndex,e.beat]),[[0,0],[0,.5],[1,0]]);
  assert.deepEqual(parsed.lanes[1].events.map(e=>e.beat),[0,1/3,2/3]);
  assert.ok([...doc.getElementsByTagName('divisions')].every(n=>n.textContent==='24'));
  assert.match(result.xml,/<rest\/>[\s\S]*?<staff>2<\/staff>/);
  assert.throws(()=>convertGrandStaff([[upper,[...lower,...lower]]]),/row 1.*different recognized bar counts/);
  assert.throws(()=>convertGrandStaff([[upper]]),/upper and lower staff/);
});
test('real HOMR WASM inference exports the expected melody from a printed image', {timeout:120000}, async () => {
  const ort = require('../sheet-music/lib/ort/ort.wasm.min.js');
  ort.env.wasm.numThreads=1; ort.env.wasm.wasmPaths=path.resolve(__dirname,'../sheet-music/lib/ort')+'/';
  const sessions=[];
  try {
    const manifest=require('../sheet-music/models/manifest.json');
    for(const name of ['encoder','decoder']) {
      const bytes=fs.readFileSync(path.join(__dirname,'../sheet-music/models',manifest[name].file));
      assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest[name].sha256);
      sessions.push(await ort.InferenceSession.create(bytes,{executionProviders:['wasm']}));
    }
    const gray=engine.grayImage(fixture);
    const symbols=await engine.recognize(ort,...sessions,require('../sheet-music/models/vocabulary.json'),engine.inputPixels(gray,engine.findStaves(gray)[0]));
    const score=parse(convert([symbols],'Printed chords').xml,DOMParser);
    assert.deepEqual(score.lanes[0].events.map(n=>n.notes.at(-1).name),'C5 C5 C5 C5 D5 D5 D5 D5 D5 C5 B4 A4 A4 G4 G4 G4 E4'.split(' '));
    assert.equal(score.lanes[0].events[4].notes[0].name,'F♯4');
    assert.equal(score.lanes[0].events[4].notes[0].duration,4);
  } finally {for(const session of sessions) await session.release();}
});
