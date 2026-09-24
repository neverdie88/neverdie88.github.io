const {test}=require('node:test');
const assert=require('node:assert/strict');
const {DOMParser,XMLSerializer}=require('@xmldom/xmldom');
const {create,blank,template}=require('../sheet-music/score-editor-model.js');
const {create:player}=require('../sheet-music/score-playback.js');
const edit=xml=>create(xml,DOMParser,XMLSerializer);
const C4={step:'C',octave:4,alter:0};
test('piano templates and appended measures preserve independent treble and bass timelines',()=>{
  const {template}=require('../sheet-music/score-editor-model.js'),d=edit(template('piano'));
  assert.equal(d.inspect().parts[0].measures.length,8);assert.equal(d.lanes().length,2);
  d.addMeasure(0);assert.deepEqual(d.inspect(0,8).groups.map(g=>[g.staff,g.voice,g.beat,g.duration]),[['1','1',0,4],['2','2',0,4]]);
  d.place(0,8,0,{pitch:C4,staff:'1',voice:'1'});d.place(0,8,0,{pitch:{step:'C',alter:0,octave:3},staff:'2',voice:'2'});
  assert.equal(d.playback(0,'1','1').events[0].beat,32);assert.equal(d.playback(0,'2','2').events[0].beat,32);
});
test('adding a grand-staff line preserves meter, clefs and both voices with atomic undo',()=>{
  const {template}=require('../sheet-music/score-editor-model.js'),d=edit(template('piano'));
  d.settings(0,7,{time:'6/8',key:'major:2'});const before=d.xml();
  assert.equal(d.addLine(0),8);assert.equal(d.inspect().parts[0].measures.length,12);
  for(let m=8;m<12;m++){
    assert.deepEqual(d.inspect(0,m).groups.map(g=>[g.staff,g.voice,g.beat,g.duration,g.rest]),[['1','1',0,3,true],['2','2',0,3,true]]);
    assert.equal(d.context(0,m,'1').clef,'treble');assert.equal(d.context(0,m,'2').clef,'bass');assert.equal(d.context(0,m).fifths,2);
  }
  const after=d.xml();d.undo();assert.equal(d.xml(),before);d.redo();assert.equal(d.xml(),after);
  const reopened=edit(after),xml=new DOMParser().parseFromString(reopened.xml(),'application/xml');
  assert.equal(xml.getElementsByTagName('measure')[8].firstChild.getAttribute('new-system'),'yes');
});
test('a new line starts at the same measure in every part and leaves existing music intact',()=>{
  const second=blank().match(/<part id="P1">[\s\S]*?<\/part>/)[0].replace('id="P1"','id="P2"');
  const d=edit(blank().replace('</part-list>','<score-part id="P2"><part-name>Second part</part-name></score-part></part-list>').replace('</score-partwise>',second+'</score-partwise>'));
  d.place(0,0,0,{pitch:C4});d.addMeasure(1);const before=d.xml(),events=d.playback().events;
  assert.equal(d.addLine(1),2);assert.deepEqual(d.inspect().parts.map(p=>p.measures.length),[6,6]);
  assert.deepEqual(d.playback().events,events);
  const xml=new DOMParser().parseFromString(d.xml(),'application/xml');
  for(const part of Array.from(xml.getElementsByTagName('part'))){
    const measures=part.getElementsByTagName('measure');assert.equal(measures[2].firstChild.getAttribute('new-system'),'yes');
  }
  d.undo();assert.equal(d.xml(),before);
});
test('staff-only editor opens, cancels and applies edits without removed panel elements',async()=>{
  const fs=require('node:fs'),vm=require('node:vm');
  const html=fs.readFileSync(`${__dirname}/../sheet-music/index.html`,'utf8'),elements={},saved=[];
  const element=()=>({value:'',children:[],listeners:{},attributes:{},hidden:false,open:false,
    setAttribute(name,value){this.attributes[name]=String(value);},getAttribute(name){return this.attributes[name]??null;},
    get options(){return this.children;},append(...nodes){this.children.push(...nodes);},replaceChildren(...nodes){this.children=nodes;},
    addEventListener(type,fn){this.listeners[type]=fn;},showModal(){this.open=true;},close(){this.open=false;},focus(){}});
  for(const [,id] of html.matchAll(/id="vp-editor-([^"]+)"/g))elements[id]=element();
  let composer,api;
  const context=vm.createContext({
    document:{getElementById:id=>elements[id.replace('vp-editor-','')]||null,createElement:element,addEventListener(){}},
    window:{addEventListener(){}},ViolinPitch:{KEYS:[]},ScoreEditorModel:{create:xml=>edit(xml||blank())},
    PitchScore:{parse:xml=>require('../sheet-music/music-score.js').parse(xml,DOMParser)},
    ScoreComposer:{mount(options){composer=options;return{render(){assert.ok(composer.getDraft());},stop(){},close(){},reset(){}};}}
  });
  vm.runInContext(fs.readFileSync(`${__dirname}/../sheet-music/score-editor.js`,'utf8'),context);
  api=context.ScoreEditor.mount({apply:async xml=>saved.push(xml)});api.open();
  assert.equal(elements.dialog.open,true);assert.equal(elements['note-details'],undefined);assert.equal(elements['full-preview'],undefined);
  composer.mutate(()=>composer.getDraft().place(0,0,0,{pitch:C4}));
  elements.cancel.listeners.click();assert.equal(elements.dialog.open,false);assert.equal(saved.length,0);
  api.open();composer.mutate(()=>composer.getDraft().place(0,0,0,{pitch:C4}));
  elements.undo.listeners.click();assert.equal(composer.getDraft().inspect().groups[0].rest,true);
  elements.redo.listeners.click();elements.title.value='Staff composition';
  await elements.apply.listeners.click();assert.equal(elements.dialog.open,false);assert.equal(saved.length,1);
  const score=edit(saved[0]);assert.equal(score.inspect().title,'Staff composition');assert.equal(score.playback().events[0].midi,60);
});
test('writing on a beat splits rests, preserves bar length and makes one undo step',()=>{
  const d=edit(blank()),original=d.xml();
  const index=d.place(0,0,1,{pitch:C4,type:'eighth',dots:1});assert.equal(index,1);
  assert.deepEqual(d.inspect().groups.map(g=>[g.beat,g.duration,g.rest]),[[0,1,true],[1,.75,false],[1.75,2,true],[3.75,.25,true]]);
  d.undo();assert.equal(d.xml(),original);d.redo();assert.equal(d.inspect().groups[1].notes[0].step,'C');
  const before=d.xml();assert.throws(()=>d.place(0,0,1.25,{pitch:C4}),/has a note/);assert.equal(d.xml(),before);
  assert.throws(()=>d.place(0,0,3.75,{pitch:C4}),/bar line/);assert.equal(d.xml(),before);
  d.place(0,0,3.75,{pitch:{step:'E',octave:4,alter:0},type:'32nd',dots:2});
  assert.equal(d.inspect().groups.reduce((s,g)=>s+g.duration,0),4);
});
test('writing on another staff does not move or overwrite the first voice',()=>{
  const d=edit(blank());d.place(0,0,2,{pitch:C4,staff:'2',voice:'2'});
  assert.deepEqual(d.inspect().groups.map(g=>[g.staff,g.beat,g.duration,g.rest]),[['1',0,4,true],['2',0,2,true],['2',2,1,false]]);
  d.place(0,0,0,{pitch:{step:'G',octave:3,alter:0},staff:'2',voice:'2'});
  assert.equal(d.inspect().groups[0].duration,4);
  assert.deepEqual(d.playback(0,'2','2').events.map(n=>[n.beat,n.midi]),[[0,55],[2,60]]);
  assert.equal(d.playback(0,'1','1').events.length,0);
});
test('bulk deletion spans measures, preserves other voices and undoes as one edit',()=>{
  const d=edit(blank());d.place(0,0,0,{pitch:C4});d.place(0,0,1,{pitch:{step:'D',octave:4,alter:0}});
  d.addTone(0,0,1,{step:'F',octave:4,alter:0});d.place(0,0,0,{pitch:{step:'G',octave:3,alter:0},staff:'2',voice:'2'});
  d.addMeasure(0);d.place(0,1,0,{pitch:{step:'E',octave:4,alter:0}});
  const original=d.xml(),other=d.playback(0,'2','2');
  d.removeMany(0,[{measure:0,index:0},{measure:0,index:1},{measure:1,index:0},{measure:0,index:0}]);
  assert.equal(d.playback().events.length,0);assert.deepEqual(d.playback(0,'2','2').events.map(({index,...event})=>event),other.events.map(({index,...event})=>event));
  d.undo();assert.equal(d.xml(),original);d.redo();assert.equal(d.playback().events.length,0);
  const before=d.xml();assert.throws(()=>d.removeMany(0,[{measure:0,index:0},{measure:10,index:0}]),/existing measure/);assert.equal(d.xml(),before);
});
test('preview preserves rests, ties, chord duration and instrument transposition',()=>{
  const source=blank().replace('<clef>','<transpose><chromatic>-2</chromatic></transpose><clef>').replace('<note><rest/><duration>64</duration><type>whole</type></note>',
    '<note><pitch><step>C</step><octave>4</octave></pitch><duration>64</duration><tie type="start"/><type>whole</type></note>')
    .replace('</part>','<measure number="2"><note><pitch><step>C</step><octave>4</octave></pitch><duration>16</duration><tie type="stop"/><type>quarter</type></note><note><rest/><duration>16</duration><type>quarter</type></note><note><pitch><step>E</step><octave>4</octave></pitch><duration>32</duration><type>half</type></note></measure></part>');
  const d=edit(source),p=d.playback();assert.equal(p.duration,8);
  assert.deepEqual(p.events.map(e=>[e.beat,e.duration,e.midi]),[[0,5,58],[6,2,62]]);
  d.addTone(0,1,2,{step:'G',octave:4,alter:0});assert.deepEqual(d.playback().events.map(e=>e.midi),[58,62,65]);
});
test('selection playback starts at the first selected note and preserves gaps and simultaneous staves',()=>{
  const d=edit(template('piano'));
  d.place(0,1,1,{pitch:C4});d.addTone(0,1,1,{step:'E',octave:4,alter:0});
  d.place(0,1,1,{staff:'2',voice:'2',pitch:{step:'C',octave:3,alter:0}});
  d.place(0,2,2,{pitch:{step:'G',octave:4,alter:0},type:'half'});
  const refs=[{measure:1,index:1,tone:1},{measure:1,index:d.inspect(0,1).groups.find(g=>g.staff==='2'&&!g.rest).index,tone:0},{measure:2,index:1,tone:0}];
  const before=d.xml(),selected=d.playbackSelection(0,refs);
  assert.deepEqual(selected.events.map(e=>[e.midi,e.beat,e.duration]),[[64,0,1],[48,0,1],[67,5,2]]);assert.equal(selected.duration,7);
  assert.deepEqual(d.playbackSelection(0,[refs[0]]).events.map(e=>e.midi),[64]);assert.deepEqual(d.playbackSelection(0,[]),{events:[],duration:0});assert.equal(d.xml(),before);
});
test('selection playback clips ties to selected notes and never joins different voices',()=>{
  const notes=Array.from({length:4},(_,i)=>`<note><pitch><step>C</step><octave>4</octave></pitch><duration>16</duration><voice>1</voice><type>quarter</type>${i>0?'<tie type="stop"/>':''}${i<3?'<tie type="start"/>':''}</note>`).join('');
  const d=edit(blank().replace('<note><rest/><duration>64</duration><type>whole</type></note>',notes));
  const select=indices=>d.playbackSelection(0,indices.map(index=>({measure:0,index,tone:0})));
  assert.deepEqual(select([2]).events.map(e=>[e.beat,e.duration]),[[0,1]]);
  assert.deepEqual(select([1,2]).events.map(e=>[e.beat,e.duration]),[[0,2]]);
  assert.deepEqual(select([0,2,3]).events.map(e=>[e.beat,e.duration]),[[0,1],[2,2]]);
  const other=d.xml().replace('</measure>','<backup><duration>64</duration></backup>'+notes.replaceAll('<voice>1</voice>','<voice>2</voice>')+'</measure>');
  const both=edit(other).playback(0,null,null);assert.equal(both.events.length,2);assert.deepEqual(both.events.map(e=>[e.beat,e.duration]),[[0,4],[0,4]]);
});
test('audio preview schedules piano notes and stops pending/resuming sessions',async t=>{
  let resolveResume,closed=false;const notes=[];
  const context={currentTime:0,destination:{},resume:()=>Promise.resolve(),close(){closed=true;},
    createGain(){return{gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};},
    createOscillator(){const n={frequency:{value:0},connect(){},disconnect(){},start(at){this.at=at;},stop(at){this.stopAt=at;}};notes.push(n);return n;}};
  const p=player({makeContext:()=>context,loadInstrument:async()=>({play(midi,at,duration){const n=context.createOscillator();n.frequency.value=440*2**((midi-69)/12);n.start(at);n.stop(at+duration+.26);return n;}})});await p.start({events:[{beat:0,duration:1,midi:69}],duration:1},60);
  t.after(()=>p.close());
  assert.equal(notes[0].frequency.value,440);assert.equal(notes[0].at,.05);assert.ok(Math.abs(notes[0].stopAt-1.31)<1e-8);
  p.stop();assert.equal(p.active,false);assert.equal(notes[0].stopAt,undefined);
  context.resume=()=>new Promise(resolve=>resolveResume=resolve);const pending=p.start({events:[{beat:0,duration:1,midi:60}],duration:1},120);
  p.stop();resolveResume();await pending;assert.equal(notes.length,1);p.close();assert.equal(closed,true);
});
