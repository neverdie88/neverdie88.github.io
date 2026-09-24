const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),{webcrypto,createHash}=require('node:crypto');
const {DOMParser}=require('@xmldom/xmldom');
const XML=require('../sheet-music/omr-musicxml.js'),score=require('../sheet-music/music-score.js');
const source=fs.readFileSync(`${__dirname}/../sheet-music/omr-worker.js`,'utf8');
const s=(rhythm,pitch='C4')=>({rhythm,pitch,lift:'_'});
const treble=[s('clef_G2'),s('note_4','E4'),s('barline')],bass=[s('clef_F4'),s('note_4','C3'),s('barline')];
async function run({line='all',systems=[[0,1],[2,3]],symbols=[treble,bass,treble,bass]}={}){
  const messages=[],read=[],bytes=Uint8Array.of(1,2,3),sha256=createHash('sha256').update(bytes).digest('hex');let created=0,released=0;
  const entry={file:'model.onnx',bytes:bytes.length,sha256};
  const context=vm.createContext({
    self:{location:{href:'https://local.test/sheet-music/omr-worker.js'}},importScripts(){},postMessage:m=>messages.push(m),URL,Response,Error,crypto:webcrypto,
    caches:{open:async()=>({match:async()=>null,put:async()=>{}})},
    fetch:async url=>({ok:true,json:async()=>String(url).includes('manifest')?{encoder:entry,decoder:entry}:{},arrayBuffer:async()=>bytes.slice().buffer}),
    ort:{env:{wasm:{}},InferenceSession:{create:async()=>{created++;return {release:async()=>released++};}}},
    PitchOMR:{grayImage:image=>image,findStaves:()=>symbols.map((_,index)=>({index})),findSystems:()=>systems,inputPixels:(_image,staff)=>staff.index,
      recognize:async(_ort,_encoder,_decoder,_vocab,index)=>{read.push(index);return symbols[index];}},
    PitchOMRXML:XML
  });
  vm.runInContext(source,context);await context.self.onmessage({data:{image:{},line,title:'Worker score'}});
  return {messages,read,created,released,result:messages.find(m=>m.type==='result'),error:messages.find(m=>m.type==='error')};
}
test('worker converts all connected staves into aligned grand-staff rows',async()=>{
  const a=await run();assert.equal(a.error,undefined);assert.deepEqual(a.read,[0,1,2,3]);
  assert.equal(a.result.summary,'Recognized 4 staves in 2 grand-staff rows.');
  const parsed=score.parse(a.result.xml,DOMParser);assert.equal(parsed.lanes.length,2);
  assert.deepEqual(parsed.lanes.map(l=>l.events.map(n=>n.measureIndex)),[[0,1],[0,1]]);
  assert.equal(a.created,2);assert.equal(a.released,2);assert.match(a.result.warnings.join(' '),/Lyrics and chord names/);
});
test('worker supports explicit pairing, sequential rows, and one selected staff without losing notes',async()=>{
  const systems=[[0],[1],[2],[3]],paired=await run({systems,line:'grand'});
  assert.equal(score.parse(paired.result.xml,DOMParser).lanes.length,2);
  for(const line of ['all','sequential']){
    const a=await run({systems,line});assert.equal(a.result.noteCount,4);
    assert.deepEqual(score.parse(a.result.xml,DOMParser).lanes[0].events.map(e=>e.measureIndex),[0,1,2,3]);
  }
  const selected=await run({line:'3'});assert.deepEqual(selected.read,[3]);assert.equal(selected.result.noteCount,1);
  assert.equal(score.parse(selected.result.xml,DOMParser).lanes[0].clef,'bass');
});
test('worker reports incomplete pairs and mismatched bars instead of publishing a partial grand staff',async()=>{
  const odd=await run({line:'grand',symbols:[treble,bass,treble],systems:[[0,1],[2]]});
  assert.match(odd.error.message,/complete pairs/);assert.equal(odd.result,undefined);assert.equal(odd.created,0);
  const mismatch=await run({symbols:[treble,[...bass,...bass]],systems:[[0,1]]});
  assert.match(mismatch.error.message,/different recognized bar counts/);assert.equal(mismatch.result,undefined);assert.equal(mismatch.released,2);
});
