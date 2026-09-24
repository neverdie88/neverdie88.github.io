const {test}=require('node:test');
const assert=require('node:assert/strict');
const {DOMParser,XMLSerializer}=require('@xmldom/xmldom');
const OMR=require('../sheet-music/omr-musicxml.js');
const Model=require('../sheet-music/score-editor-model.js');
const Player=require('../sheet-music/sheet-player.js');
const s=(rhythm,pitch='C4')=>({rhythm,pitch,lift:'_'});
const upper=[s('clef_G2'),s('timeSignature/4'),s('note_8'),s('note_8.','D4'),s('note_16','E4'),s('barline'),s('note_2.','F4'),s('barline')];
const lower=[s('clef_F4'),s('timeSignature/4'),s('note_8','C3'),s('note_8.','D3'),s('note_16','E3'),s('barline'),s('note_2.','F3'),s('barline')];
const edit=xml=>Model.create(xml,DOMParser,XMLSerializer);
const xml=()=>OMR.convertGrandStaff([[upper,lower]],'Pickup timing').xml;
const boundary=score=>({end:Math.max(...score.events.filter(e=>e.measure===0).map(e=>e.beat+e.duration)),next:Math.min(...score.events.filter(e=>e.measure===1).map(e=>e.beat))});

test('recognized half-bar pickups start the next measure immediately on one or both staves',()=>{
  for(const source of [OMR.convert([upper]).xml,xml()]){
    const doc=new DOMParser().parseFromString(source,'application/xml');
    assert.equal(doc.getElementsByTagName('measure')[0].getAttribute('implicit'),'yes');
    assert.equal(doc.getElementsByTagName('measure')[0].getAttribute('number'),'1');
    const model=edit(source);assert.equal(model.context(0,0).beats,'3');
    assert.deepEqual(boundary(model.playback(0,null,null)),{end:1.5,next:1.5});
    for(const lane of model.lanes())assert.deepEqual(boundary(model.playback(0,lane.staff,lane.voice)),{end:1.5,next:1.5});
    assert.deepEqual(boundary(Player.sequence(model,Player.tracks(model))),{end:1.5,next:1.5});
    assert.deepEqual(boundary(edit(model.xml()).playback(0,null,null)),{end:1.5,next:1.5});
  }
});

test('older photo imports get a pickup flag while explicit and ordinary incomplete bars keep their timing',()=>{
  const legacy=xml().replace(' implicit="yes"',''),fixed=edit(legacy);
  assert.equal(fixed.dirty,false);assert.equal(fixed.canUndo,false);
  assert.match(fixed.xml(),/<measure number="1" implicit="yes">/);
  assert.deepEqual(boundary(fixed.playback(0,null,null)),{end:1.5,next:1.5});
  for(const source of [legacy.replace('Sheet Music Practice / HOMR','Another notation app'),legacy.replace('<measure number="1">','<measure number="1" implicit="no">')]){
    const ordinary=edit(source);assert.deepEqual(boundary(ordinary.playback(0,null,null)),{end:1.5,next:3});
    assert.doesNotMatch(ordinary.xml(),/implicit="yes"/);
  }
  const explicit=edit(xml().replace('Sheet Music Practice / HOMR','Another notation app'));
  assert.deepEqual(boundary(explicit.playback(0,null,null)),{end:1.5,next:1.5});
});

test('pickup detection preserves written rests and does not guess when scanned staves disagree',()=>{
  const mismatch=[s('clef_F4'),s('note_4','C3'),s('barline'),s('note_2.','F3'),s('barline')];
  const source=OMR.convertGrandStaff([[upper,mismatch]]).xml;
  assert.doesNotMatch(source,/implicit="yes"/);assert.doesNotMatch(edit(source).xml(),/implicit="yes"/);
  assert.equal(boundary(edit(source).playback(0,null,null)).next,3);
  const rests=[s('clef_G2'),s('note_8'),s('rest_2'),s('rest_8'),s('barline'),s('note_2.','F4'),s('barline')];
  const full=OMR.convert([rests]).xml;assert.doesNotMatch(full,/implicit="yes"/);
  assert.deepEqual(boundary(edit(full).playback()),{end:.5,next:3},'the written 2.5 beats of rest remain');
});
