const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');
const { create, blank } = require('../pitch-visualizer/score-editor-model.js');
const { parse } = require('../pitch-visualizer/music-score.js');
const edit = xml => create(xml, DOMParser, XMLSerializer);
const read = xml => parse(xml, DOMParser);
const sample = fs.readFileSync(`${__dirname}/../pitch-visualizer/samples/notes-and-chords.musicxml`,'utf8');
const note = (step, extra='', length=4) => `<note><pitch><step>${step}</step><octave>4</octave></pitch><duration>${length}</duration><type>quarter</type>${extra}</note>`;
const score = measures => `<score-partwise version="4.0"><identification><creator type="composer">Original composer</creator></identification><part-list><score-part id="P1"><part-name>Piano</part-name></score-part><score-part id="P2"><part-name>Other part</part-name></score-part></part-list><part id="P1">${measures}</part><part id="P2"><measure number="1">${note('G')}</measure></part></score-partwise>`;

test('a draft round-trips sample notation, edits chords and title, and supports undo/redo', () => {
  const d=edit(sample);assert.equal(d.dirty,false);
  assert.deepEqual(read(d.xml()),read(sample));
  d.title('My <sheet> & chords');d.pitch(0,0,0,0,{step:'F',alter:1,octave:4});
  d.addTone(0,0,0);d.pitch(0,0,0,1,{step:'A',alter:0,octave:4});
  assert.equal(read(d.xml()).title,'My <sheet> & chords');
  assert.deepEqual(read(d.xml()).lanes[0].events[0].notes.map(n=>n.midi),[66,69]);
  d.undo();d.undo();assert.equal(read(d.xml()).lanes[0].events[0].notes.length,1);
  d.redo();assert.equal(read(d.xml()).lanes[0].events[0].notes.length,2);
  d.removeTone(0,0,0,0);assert.deepEqual(read(d.xml()).lanes[0].events[0].notes.map(n=>n.midi),[64]);
  while(d.canUndo)d.undo();assert.equal(d.dirty,false);assert.deepEqual(read(d.xml()),read(sample));
});

test('rhythm, insertion and deletion keep the other voice at its original onset', () => {
  const original=score(`<measure number="1"><attributes><divisions>4</divisions></attributes>${note('C','<voice>1</voice>')}${note('D','<voice>1</voice>')}<backup><duration>8</duration></backup>${note('G','<voice>2</voice>')}</measure>`);
  const d=edit(original);
  d.length(0,0,0,'half',1);
  assert.deepEqual(d.inspect().groups.map(g=>[g.voice,g.beat,g.duration]),[['1',0,3],['1',3,1],['2',0,1]]);
  d.insert(0,0,0,'after',true);
  assert.deepEqual(d.inspect().groups.map(g=>g.beat),[0,3,4,0]);
  d.remove(0,0,0);assert.deepEqual(d.inspect().groups.map(g=>g.beat),[0,1,0]);
  d.rest(0,0,0,false);assert.equal(d.inspect().groups[0].notes[0].step,'C');
  assert.deepEqual(read(d.xml()).lanes[1],read(original).lanes[1]);
  assert.match(d.xml(),/<creator type="composer">Original composer<\/creator>/);
});

test('pitch corrections follow ties; deleting a continuation cleans the surviving tie', () => {
  const d=edit(score(`<measure number="1"><attributes><divisions>4</divisions></attributes>${note('C','<tie type="start"/><notations><tied type="start"/></notations>')}</measure><measure number="2">${note('C','<tie type="stop"/><notations><tied type="stop"/></notations>')}${note('E')}</measure>`));
  d.pitch(0,0,0,0,{step:'D',alter:-1,octave:5});
  assert.equal(d.inspect(0,1).groups[0].notes[0].octave,5);
  assert.deepEqual(read(d.xml()).lanes[0].events.map(g=>g.notes[0].midi),[73,64]);
  d.remove(0,1,0);assert.equal(d.inspect(0,0).groups[0].notes[0].tied,false);
  d.undo();assert.equal(d.inspect(0,0).groups[0].notes[0].tied,true);
});

test('new sheets support rests, notes, chord lengths, measures and signature changes', () => {
  const d=edit(blank());assert.equal(d.inspect().groups[0].rest,true);
  d.rest(0,0,0,false);d.length(0,0,0,'half',0);d.addTone(0,0,0);
  d.length(0,0,0,'quarter',2);assert.equal(d.inspect().groups[0].duration,1.75);
  d.settings(0,0,{key:'minor:-3',clef:'bass',time:'3/4'});d.addMeasure(0);
  assert.equal(d.inspect(0,1).groups[0].duration,3);
  assert.equal(d.context(0,1).clef,'bass');assert.equal(d.context(0,1).fifths,-3);
  d.insert(0,1,0,'before',false);d.remove(0,1,1);
  assert.equal(read(d.xml()).lanes[0].events.length,2);
  d.remove(0,1,0);assert.equal(d.inspect(0,1).groups.length,0);
  d.insert(0,1,0);assert.equal(d.inspect(0,1).groups[0].notes[0].step,'C');
});

test('staff clef changes leave the other staff intact and preserve unedited notation', () => {
  const d=edit(score(`<measure number="1"><attributes><divisions>4</divisions><staves>2</staves><clef number="1"><sign>G</sign><line>2</line></clef><clef number="2"><sign>F</sign><line>4</line></clef><transpose><chromatic>-2</chromatic></transpose></attributes>${note('C','<staff>1</staff>')}${note('D','<staff>2</staff><notations><articulations><staccato/></articulations></notations>')}</measure>`));
  assert.equal(d.context(0,0,'2').clef,'bass');d.settings(0,0,{clef:'treble',staff:'2'});
  assert.equal(d.context(0,0,'1').clef,'treble');assert.equal(d.context(0,0,'2').clef,'treble');
  d.pitch(0,0,1,0,{step:'F',alter:0,octave:3});assert.match(d.xml(),/<staccato\/>/);
  assert.equal(read(d.xml()).lanes[1].events[0].notes[0].midi,51);
});

test('unsupported rhythm edits and invalid pitches roll back without consuming undo', () => {
  const d=edit(score(`<measure number="1">${note('C','<time-modification><actual-notes>3</actual-notes><normal-notes>2</normal-notes></time-modification>')}</measure>`));
  const before=d.xml();assert.throws(()=>d.length(0,0,0,'half',0),/tuplets/);
  assert.throws(()=>d.rest(0,0,0,true),/tuplets/);assert.throws(()=>d.remove(0,0,0),/tuplets/);
  assert.throws(()=>d.pitch(0,0,0,0,{step:'C',alter:0,octave:0}),/A0/);
  assert.equal(d.xml(),before);assert.equal(d.canUndo,false);
  d.pitch(0,0,0,0,{step:'D',alter:0,octave:4});assert.match(d.xml(),/<actual-notes>3<\/actual-notes>/);
  assert.throws(()=>edit('<!DOCTYPE x [<!ENTITY x "bad">]><score-partwise/>'),/entity/);
});

test('unequal chord durations cannot silently shift later notes when removing the leading tone', () => {
  const d=edit(score(`<measure number="1"><attributes><divisions>4</divisions></attributes>${note('C','',8)}${note('E','<chord/>',4)}${note('G')}</measure>`));
  const before=d.xml();assert.throws(()=>d.removeTone(0,0,0,0),/shared chord length/);assert.equal(d.xml(),before);
  d.length(0,0,0,'half',0);d.removeTone(0,0,0,0);assert.equal(d.inspect().groups[1].beat,2);
});

test('staff-specific keys and transpositions agree between editor, preview and practice',()=>{
  const d=edit(score(`<measure number="1"><attributes><divisions>4</divisions><key number="1"><fifths>1</fifths></key><key number="2"><fifths>-2</fifths></key><staves>2</staves><transpose number="1"><chromatic>-2</chromatic></transpose><transpose number="2"><chromatic>0</chromatic></transpose></attributes>${note('C','<staff>1</staff>')}<backup><duration>4</duration></backup>${note('C','<staff>2</staff>')}</measure><measure number="2"><attributes><key><fifths>3</fifths></key><transpose><chromatic>1</chromatic></transpose></attributes>${note('D','<staff>1</staff>')}<backup><duration>4</duration></backup>${note('D','<staff>2</staff>')}</measure>`));
  assert.deepEqual(read(d.xml()).lanes.slice(0,2).map(l=>l.events.map(e=>[e.fifths,e.notes[0].midi])),[[[1,58],[3,63]],[[-2,60],[3,63]]]);
  d.settings(0,0,{staff:'2',key:'minor:-3'});
  assert.equal(d.context(0,0,'1').fifths,1);assert.equal(d.context(0,0,'2').fifths,-3);
  for(const staff of ['1','2'])assert.deepEqual(d.playback(0,staff).events.map(e=>e.midi),read(d.xml()).lanes.find(l=>l.partIndex===0&&l.staff===staff).events.map(e=>e.notes[0].midi));
  assert.equal(d.context(0,1,'2').fifths,3,'later global changes reset all staves');
});
test('changing one staff key preserves the inherited key on other staves and undo restores XML',()=>{
  const d=edit(score(`<measure number="1"><attributes><divisions>4</divisions><key><fifths>1</fifths><mode>major</mode></key><staves>2</staves></attributes>${note('C','<staff>1</staff>')}${note('C','<staff>2</staff>')}</measure><measure number="2">${note('D','<staff>1</staff>')}${note('D','<staff>2</staff>')}</measure>`)),before=d.xml();
  d.settings(0,0,{staff:'2',key:'major:-2'});
  assert.equal(d.context(0,0,'1').fifths,1);assert.equal(d.context(0,0,'2').fifths,-2);
  d.settings(0,1,{staff:'1',key:'major:3'});assert.equal(d.context(0,1,'2').fifths,-2);
  assert.deepEqual(read(d.xml()).lanes.slice(0,2).map(l=>l.events.map(e=>e.fifths)),[[1,3],[-2,-2]]);
  d.undo();d.undo();assert.equal(d.xml(),before);
});
test('added measures preserve additive meters and reject empty time signatures',()=>{
  const d=edit(blank().replace('<beats>4</beats><beat-type>4</beat-type>','<beats>3+2</beats><beat-type>8</beat-type>'));
  d.addMeasure(0);assert.equal(d.inspect(0,1).groups[0].duration,2.5);
  const before=d.xml();assert.throws(()=>d.settings(0,0,{time:'0/4'}),/time signature/);assert.equal(d.xml(),before);
});
