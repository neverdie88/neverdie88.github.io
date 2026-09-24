const {test}=require('node:test');
const assert=require('node:assert/strict');
const {DOMParser,XMLSerializer}=require('@xmldom/xmldom');
const Model=require('../sheet-music/score-editor-model.js');
const edit=xml=>Model.create(xml,DOMParser,XMLSerializer);
const parse=xml=>new DOMParser().parseFromString(xml,'application/xml');
const elements=(node,name)=>Array.from(node.getElementsByTagName(name));
const values=(node,name)=>elements(node,name).map(n=>n.textContent);
const note=(step,alter=0,octave=4,extra='')=>`<note><pitch><step>${step}</step><alter>${alter}</alter><octave>${octave}</octave></pitch><duration>4</duration><type>quarter</type>${extra}</note>`;
const score=parts=>`<score-partwise version="4.0"><part-list>${parts.map((_,i)=>`<score-part id="P${i}"><part-name>Part ${i}</part-name></score-part>`).join('')}</part-list>${parts.map((p,i)=>`<part id="P${i}">${p}</part>`).join('')}</score-partwise>`;
const pitches=xml=>elements(parse(xml),'pitch').map(n=>['step','alter','octave'].map(k=>values(n,k)[0]||'0'));
const midis=xml=>pitches(xml).map(([s,a,o])=>({C:0,D:2,E:4,F:5,G:7,A:9,B:11}[s])+Number(a)+12*(Number(o)+1));

test('whole-score transposition covers parts, staves, key changes, chords and ties in one undo',()=>{
  const harmony='<harmony><root><root-step>A</root-step><root-alter>-1</root-alter></root><kind>major</kind><bass><bass-step>E</bass-step><bass-alter>-1</bass-alter></bass></harmony>';
  const upper=kind=>note('A',-1,4,`<tie type="${kind}"/><voice>1</voice><staff>1</staff><notations><tied type="${kind}"/><slur type="start"/></notations><lyric><text>Trời</text></lyric>`);
  const d=edit(score([
    `<measure number="1"><attributes><divisions>4</divisions><key><fifths>-4</fifths><mode>major</mode></key><staves>2</staves><clef number="1"><sign>G</sign><line>2</line></clef><clef number="2"><sign>F</sign><line>4</line></clef></attributes>${harmony}${upper('start')}<backup><duration>4</duration></backup>${note('E',-1,3,'<voice>2</voice><staff>2</staff>')}</measure><measure number="2"><attributes><key><cancel>-4</cancel><fifths>-1</fifths><mode>minor</mode></key></attributes>${upper('stop')}${note('D',0,4)}<note><rest/><duration>4</duration><type>quarter</type></note></measure>`,
    `<measure number="1"><attributes><divisions>4</divisions><key><fifths>-2</fifths><mode>major</mode></key><transpose><diatonic>-1</diatonic><chromatic>-2</chromatic></transpose></attributes>${note('B',-1,4)}${note('C',0,5).replace('<duration>4</duration>','<grace/>')}<note><unpitched><display-step>C</display-step><display-octave>5</display-octave></unpitched><duration>4</duration></note></measure>`
  ])),before=d.xml(),sounds=[0,1].map(p=>d.playback(p,null,null).events.map(e=>[e.midi,e.beat,e.duration]));
  d.transpose(2);const after=d.xml(),doc=parse(after);
  assert.deepEqual(midis(after),midis(before).map(n=>n+2));
  assert.deepEqual(values(doc,'fifths'),['-2','1','0']);assert.deepEqual(values(doc,'cancel'),['-2']);assert.deepEqual(values(doc,'mode'),['major','minor','major']);
  assert.deepEqual(values(doc,'root-step'),['B']);assert.deepEqual(values(doc,'root-alter'),['-1']);assert.deepEqual(values(doc,'bass-step'),['F']);assert.deepEqual(values(doc,'bass-alter'),[]);
  assert.deepEqual(pitches(after)[0],pitches(after)[2],'tied pitches keep their spelling');
  for(const tag of ['duration','backup','rest','tie','tied','slur','lyric','clef','transpose','unpitched','grace'])assert.deepEqual(elements(doc,tag).map(n=>new XMLSerializer().serializeToString(n)),elements(parse(before),tag).map(n=>new XMLSerializer().serializeToString(n)),tag);
  for(const part of [0,1])assert.deepEqual(d.playback(part,null,null).events.map(e=>[e.midi,e.beat,e.duration]),sounds[part].map(([m,b,t])=>[m+2,b,t]));
  d.undo();assert.equal(d.xml(),before);assert.equal(d.canUndo,false);d.redo();assert.equal(d.xml(),after);
  assert.deepEqual(midis(edit(after).xml()),midis(after),'export and reopen retain pitches');
});

test('implicit C keys and staff-specific key signatures transpose independently',()=>{
  const d=edit(score([
    `<measure number="1"><attributes><divisions>4</divisions><key number="1"><fifths>-4</fifths></key><staves>2</staves></attributes>${note('A',-1,4,'<staff>1</staff>')}<backup><duration>4</duration></backup>${note('C',0,3,'<staff>2</staff>')}</measure>`,
    `<measure number="1">${note('C')}</measure><measure number="2"><attributes><key><fifths>-3</fifths></key></attributes>${note('E',-1)}</measure>`
  ]));
  d.transpose(2);
  assert.equal(d.context(0,0,'1').fifths,-2);assert.equal(d.context(0,0,'2').fifths,2);assert.equal(d.context(1,0).fifths,2);assert.equal(d.context(1,1).fifths,-1);
  assert.deepEqual(pitches(d.xml()),[['B','-1','4'],['D','0','3'],['D','0','4'],['F','0','4']]);
});

test('all standard keys retain exact chromatic intervals and octaves preserve spelling',()=>{
  for(let fifths=-7;fifths<=7;fifths++)for(let semitones=-12;semitones<=12;semitones++)if(semitones){
    const notes='CDEFGAB'.split('').flatMap(step=>[-2,-1,0,1,2].map(alter=>note(step,alter))).join('');
    const d=edit(score([`<measure number="1"><attributes><key><fifths>${fifths}</fifths><mode>minor</mode></key></attributes>${notes}</measure>`])),before=d.xml();
    d.transpose(semitones);assert.deepEqual(midis(d.xml()),midis(before).map(n=>n+semitones),`${fifths}: ${semitones}`);
    assert.equal(d.context(0,0).mode,'minor');assert.ok(Math.abs(d.context(0,0).fifths)<=7);
    if(Math.abs(semitones)===12){assert.equal(d.context(0,0).fifths,fifths);assert.deepEqual(pitches(d.xml()).map(p=>p.slice(0,2)),pitches(before).map(p=>p.slice(0,2)));}
  }
});

test('out-of-range or unsupported transposition leaves all parts and undo history intact',()=>{
  for(const [extreme,shift]of [[note('C',0,8),1],[note('A',0,0),-1]]){
    const d=edit(score([`<measure number="1">${note('C')}</measure>`,`<measure number="1">${extreme}</measure>`])),before=d.xml();
    assert.throws(()=>d.transpose(shift),/A0 and C8/);assert.equal(d.xml(),before);assert.equal(d.canUndo,false);
  }
  for(const body of ['<attributes><key><key-step>F</key-step><key-alter>1</key-alter></key></attributes>'+note('C'),note('C',.5)]){
    const d=edit(score([`<measure number="1">${body}</measure>`])),before=d.xml();assert.throws(()=>d.transpose(2),/Transpose supports/);assert.equal(d.xml(),before);assert.equal(d.canUndo,false);
  }
});
