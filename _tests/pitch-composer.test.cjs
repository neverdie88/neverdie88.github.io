const {test}=require('node:test');
const assert=require('node:assert/strict');
const {DOMParser,XMLSerializer}=require('@xmldom/xmldom');
const {create,blank}=require('../sheet-music/score-editor-model.js');
const Staff=require('../sheet-music/composer-staff.js');
const {create:player}=require('../sheet-music/score-playback.js');
const edit=xml=>create(xml,DOMParser,XMLSerializer);
const C4={step:'C',octave:4,alter:0};
test('piano templates and appended measures preserve independent treble and bass timelines',()=>{
  const {template}=require('../sheet-music/score-editor-model.js'),d=edit(template('piano'));
  assert.equal(d.inspect().parts[0].measures.length,4);assert.equal(d.lanes().length,2);
  d.addMeasure(0);assert.deepEqual(d.inspect(0,4).groups.map(g=>[g.staff,g.voice,g.beat,g.duration]),[['1','1',0,4],['2','2',0,4]]);
  d.place(0,4,0,{pitch:C4,staff:'1',voice:'1'});d.place(0,4,0,{pitch:{step:'C',alter:0,octave:3},staff:'2',voice:'2'});
  assert.equal(d.playback(0,'1','1').events[0].beat,16);assert.equal(d.playback(0,'2','2').events[0].beat,16);
});
test('staff-only editor opens, cancels and applies edits without removed panel elements',async()=>{
  const fs=require('node:fs'),vm=require('node:vm');
  const html=fs.readFileSync(`${__dirname}/../sheet-music/index.html`,'utf8'),elements={},saved=[];
  const element=()=>({value:'',children:[],listeners:{},hidden:false,open:false,
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
test('wrapped rows target the right measure and pitch and allow selections across rows',()=>{
  const d=edit(blank());for(let m=0;m<6;m++){if(m)d.addMeasure(0);d.place(0,m,0,{pitch:{step:'C',octave:4,alter:0}});}
  const entries=Array.from({length:6},(_,measure)=>({measure,number:String(measure+1),ctx:d.context(0,measure),groups:d.inspect(0,measure).groups}));
  for(const width of [900,350]){
    const g=Staff.layout(entries,{width});assert.ok(g.rows.length>1);assert.ok(g.width<=width+1);
    for(const bar of g.bars){
      const target=Staff.target(g,bar.start,bar.bottom+2*g.halfGap);
      assert.equal(target.measure,bar.measure);assert.equal(target.pitch.midi,60);
      assert.equal(Staff.hit(g,bar.start,bar.bottom+2*g.halfGap).measure,bar.measure);
    }
    const first=g.hits.find(n=>!n.rest),last=g.hits.filter(n=>!n.rest).at(-1);
    const refs=Staff.groupsInRect(g,{x:0,y:first.y-10},{x:g.width,y:last.y+10});
    assert.ok(refs.some(n=>n.measure===0));assert.ok(refs.some(n=>n.measure===5));
  }
});
test('preview preserves rests, ties, chord duration and instrument transposition',()=>{
  const source=blank().replace('<clef>','<transpose><chromatic>-2</chromatic></transpose><clef>').replace('<note><rest/><duration>64</duration><type>whole</type></note>',
    '<note><pitch><step>C</step><octave>4</octave></pitch><duration>64</duration><tie type="start"/><type>whole</type></note>')
    .replace('</part>','<measure number="2"><note><pitch><step>C</step><octave>4</octave></pitch><duration>16</duration><tie type="stop"/><type>quarter</type></note><note><rest/><duration>16</duration><type>quarter</type></note><note><pitch><step>E</step><octave>4</octave></pitch><duration>32</duration><type>half</type></note></measure></part>');
  const d=edit(source),p=d.playback();assert.equal(p.duration,8);
  assert.deepEqual(p.events.map(e=>[e.beat,e.duration,e.midi]),[[0,5,58],[6,2,62]]);
  d.addTone(0,1,2,{step:'G',octave:4,alter:0});assert.deepEqual(d.playback().events.map(e=>e.midi),[58,62,65]);
});
test('staff hit testing distinguishes chord tones, measures, clefs and key accidentals',()=>{
  const d=edit(blank());const i=d.place(0,0,0,{pitch:C4});d.addTone(0,0,i,{step:'E',octave:4,alter:0});d.addMeasure(0);
  const entries=[0,1].map(measure=>({measure,number:String(measure+1),ctx:d.context(0,measure),groups:d.inspect(0,measure).groups}));
  const l=Staff.layout(entries),n=l.hits.find(n=>n.tone===1&&!n.rest);
  assert.equal(Staff.hit(l,n.x,n.y).tone,1);assert.equal(Staff.target(l,l.bars[1].start+64,l.bottom).measure,1);
  const bass={...l.bars[0],ctx:{...l.bars[0].ctx,clef:'bass',fifths:1}};
  const f=Staff.pitchAt(l.bottom-Staff.stepOf({step:'F',octave:3},'bass')*l.halfGap,bass,l);
  assert.deepEqual(f,{step:'F',octave:3,alter:1,midi:54});
  assert.equal(Staff.pitchAt(l.bottom,bass,l,'0').step,'G');
});
test('chords share a stem spanning every tone and seconds alternate without overlapping',()=>{
  const d=edit(blank()),i=d.place(0,0,1,{pitch:C4});
  for(const step of ['F','G','A'])d.addTone(0,0,i,{step,octave:4,alter:0});
  d.addTone(0,0,i,{step:'C',octave:5,alter:0});
  const geometry=()=>Staff.layout([{measure:0,number:'1',ctx:d.context(0,0),groups:d.inspect().groups}]);
  const l=geometry(),stem=l.stems[0],heads=l.hits.filter(n=>!n.rest),x=step=>heads.find(n=>n.note.step===step&&n.note.octave===4).x;
  assert.equal(l.stems.length,1);assert.equal(stem.down,false);
  assert.ok(stem.start>=Math.max(...heads.map(n=>n.y))-2);
  assert.ok(stem.end<=Math.min(...heads.map(n=>n.y))-7*l.halfGap);
  assert.ok(x('G')-x('F')>=16);assert.equal(x('F'),x('A'));
  for(const n of heads)assert.equal(Staff.hit(l,n.x,n.y).tone,n.tone,'every displaced tone remains selectable');
  for(const n of heads)d.pitch(0,0,i,n.tone,{...n.note,octave:n.note.octave+1});
  const high=geometry(),down=high.stems[0];assert.equal(down.down,true);
  assert.ok(down.end>=Math.max(...high.hits.filter(n=>!n.rest).map(n=>n.y))+7*high.halfGap);
  assert.ok(down.end<high.height,'long chord stem must fit inside the SVG');
  const highF=high.hits.find(n=>n.note?.step==='F'),highG=high.hits.find(n=>n.note?.step==='G');
  assert.ok(highG.x<highF.x,'downward seconds move to the left of the shared stem');
});
test('rendered chords have one stem and flag set; whole-note chords have no stem',()=>{
  class Element{
    constructor(tag,doc){this.tag=tag;this.ownerDocument=doc;this.children=[];this.attrs={};}
    setAttribute(k,v){this.attrs[k]=v;}replaceChildren(){this.children=[];}appendChild(n){this.children.push(n);return n;}
  }
  const doc={createElementNS(ns,tag){return new Element(tag,doc);}},svg=new Element('svg',doc);
  const P={CLEFS:{treble:{glyph:'gClef',anchorStep:2}},keySignature:()=>[]};
  const glyphs={staffSpace:250,gClef:{path:'M0 0',width:600},noteheadBlack:{path:'M0 0',width:295}};
  const d=edit(blank()),index=d.place(0,0,0,{pitch:C4,type:'eighth'});d.addTone(0,0,index,{step:'D',octave:4,alter:0});
  const draw=()=>{const g=Staff.layout([{measure:0,number:'1',ctx:d.context(0,0),groups:d.inspect().groups}]);Staff.draw(svg,g,{P,glyphs,measure:0,selected:-1});return svg.children.filter(n=>'data-composer-stem' in n.attrs);};
  let stems=draw();assert.equal(stems.length,1);assert.equal(stems[0].children.filter(n=>n.tag==='line').length,1);assert.equal(stems[0].children.filter(n=>n.tag==='path').length,1);
  d.length(0,0,index,'whole',0);stems=draw();assert.equal(stems.length,0);
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
