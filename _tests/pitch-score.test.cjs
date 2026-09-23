const assert = require('node:assert/strict');
const { test } = require('node:test');
const { DOMParser } = require('@xmldom/xmldom');
const { parse, createFollower } = require('../sheet-music/music-score.js');
const { convert, duration } = require('../sheet-music/omr-musicxml.js');
const pitch = (step, octave = 4, extra = '') => `<note><pitch><step>${step}</step><octave>${octave}</octave></pitch><duration>4</duration>${extra}</note>`;
const score = measures => `<score-partwise version="4.0"><part-list><score-part id="P1"><part-name>Violin</part-name></score-part></part-list><part id="P1">${measures}</part></score-partwise>`;
const read = text => parse(text, DOMParser);
const hit = (follower, midi, from, to, cents = 0) => { let result; for (let t = from; t <= to; t += 50) result = follower.update({ midi, cents }, t); return result; };

test('MusicXML groups complete chords across voices, preserves rests, and skips tie continuations', () => {
  const result = read(score(`<measure number="0"><attributes><divisions>4</divisions><key><fifths>2</fifths></key><clef><sign>G</sign><line>2</line></clef></attributes><note><rest/><duration>2</duration></note>${pitch('C')}${pitch('E',4,'<chord/><tie type="start"/>')}<backup><duration>6</duration></backup>${pitch('G',3,'<voice>2</voice>')}</measure><measure number="1">${pitch('E',4,'<tie type="stop"/>')}${pitch('F')}</measure>`));
  assert.deepEqual(result.lanes[0].events.map(n => [n.notes.map(p => p.name),n.beat,n.measure]), [[['G3'],0,'0'],[['C4','E4'],.5,'0'],[['F4'],1,'1']]);
  assert.equal(result.lanes.length, 1);
  assert.equal(result.lanes[0].fifths, 2);
  assert.doesNotMatch(result.warnings.join(' '), /highest note/);
});
test('MusicXML uses explicit pitch alterations and instrument transposition', () => {
  const xml = score('<measure number="1"><attributes><divisions>4</divisions><key><fifths>1</fifths></key><transpose><chromatic>-2</chromatic></transpose></attributes><note><pitch><step>F</step><alter>1</alter><octave>4</octave></pitch><duration>4</duration></note></measure>');
  const event = read(xml).lanes[0].events[0].notes[0];
  assert.equal(event.writtenMidi,66); assert.equal(event.midi,64); assert.equal(event.name,'F♯4');
});
test('unsupported and unsafe score inputs fail without producing playable notes', () => {
  for (const xml of ['<html/>', '<score-partwise/>', '<!DOCTYPE x [<!ENTITY x "hello">]><score-partwise/>']) assert.throws(() => read(xml));
  assert.throws(() => read('x'.repeat(10 * 1024 * 1024 + 1)), /smaller than/);
});
test('follower requires stable in-tune pitch and cannot complete with a wrong octave or sharp note', () => {
  const f = createFollower([{midi:69},{midi:71}]);
  assert.equal(hit(f,81,0,400).index,0);
  assert.equal(hit(f,69,450,900,50).feedback,'sharp');
  assert.equal(hit(f,69,950,1150).index,0);
  assert.equal(hit(f,69,1200,1200).index,1);
  assert.equal(hit(f,71,1250,1500).complete,true);
  assert.equal(f.current().matched,2);
});
test('repeated notes require a release; frame gaps and pause cannot count as a hold', () => {
  const f = createFollower([{midi:60},{midi:60},{midi:62}]);
  hit(f,60,0,250); assert.equal(hit(f,60,300,900).index,1);
  f.update(null,950); f.update(null,1000); f.update(null,1100);
  assert.equal(hit(f,60,1150,1400).index,2);
  f.update({midi:62,cents:0},1450); f.update({midi:62,cents:0},3000);
  assert.equal(f.current().complete,false);
  f.pause(); assert.equal(hit(f,62,3050,3250).complete,false);
  assert.equal(hit(f,62,3300,3300).complete,true);
  assert.equal(f.reset().index,0); assert.equal(f.skip().skipped,1);
});
test('OMR XML preserves polyphony timing, explicit alterations, dots and tuplets', () => {
  const s = (rhythm, pitch='.', lift='_') => ({rhythm,pitch,lift});
  const converted = convert([[s('clef_G2'),s('keySignature_1'),s('timeSignature/4'),s('note_4','D5'),s('chord'),s('note_1','F4','#'),s('note_4','D5'),s('note_4','D5'),s('note_4','D5'),s('barline'),s('note_8.','F4','N'),s('note_16','G4'),s('barline')]], '<test & music>');
  const parsed = read(converted.xml);
  assert.equal(parsed.title,'<test & music>');
  assert.deepEqual(parsed.lanes[0].events.map(n => n.beat),[0,1,2,3,0,.75]);
  assert.equal(parsed.lanes[0].events[0].notes[0].midi,66);
  assert.equal(parsed.lanes[0].events[0].notes[0].duration,4);
  assert.equal(parsed.lanes[0].events[4].notes[0].midi,65);
  assert.equal(duration('note_12').beats,1/3);
  assert.equal(duration('note_8..').beats,.875);
  assert.throws(()=>convert([[s('rest_3m')]]),/Multi-measure/);
});

test('a chord accepts every distinct pitch in any order, never the same pitch twice', () => {
  const f = createFollower([{notes:[{midi:60},{midi:64},{midi:67}]},{notes:[{midi:62}]}]);
  let state = hit(f,67,0,250);
  assert.deepEqual(state.matchedPitches,[67]); assert.equal(state.index,0);
  hit(f,67,300,700); assert.equal(f.current().notesMatched,1);
  hit(f,69,750,1100); assert.equal(f.current().index,0);
  hit(f,60,1150,1400); assert.deepEqual(f.current().matchedPitches,[67,60]);
  state=hit(f,64,1450,1700); assert.equal(state.index,1); assert.equal(state.notesMatched,3);
  assert.deepEqual(state.matchedPitches,[]);
});

test('a held shared pitch cannot complete the next chord, and partial matches survive pause', () => {
  const f = createFollower([{notes:[{midi:60},{midi:64}]},{notes:[{midi:64},{midi:67}]}]);
  hit(f,60,0,250); f.pause(); hit(f,64,300,550);
  assert.equal(f.current().index,1);
  hit(f,64,600,1100); assert.deepEqual(f.current().matchedPitches,[]);
  hit(f,67,1150,1400); assert.deepEqual(f.current().matchedPitches,[67]);
  hit(f,64,1450,1700); assert.equal(f.current().complete,true);
  assert.equal(f.current().notesMatched,4);
});

test('sample sheet has single notes, repeats, two-note and three-note chords', () => {
  const fs=require('node:fs');
  const result=read(fs.readFileSync(`${__dirname}/../sheet-music/samples/notes-and-chords.musicxml`,'utf8'));
  assert.deepEqual(result.lanes[0].events.map(event=>event.notes.length),[1,1,2,1,3,1,1,3,1,1,2]);
  assert.equal(result.lanes[0].events.flatMap(event=>event.notes).length,17);
});
