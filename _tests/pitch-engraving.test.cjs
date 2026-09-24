const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const {Path2D}=require('@napi-rs/canvas');
const model=require('../sheet-music/score-editor-model.js');
const root=`${__dirname}/../sheet-music/`;
async function fixture(t,xml=model.blank(),width=900){
  const dom=new JSDOM(`<div style="width:${width}px"><svg xmlns="http://www.w3.org/2000/svg"></svg></div>`,{runScripts:'outside-only'}),win=dom.window;
  require('./engraving-fixture.cjs').install(win);
  for(const f of ['score-editor-model.js','composer-staff.js','score-engraver.js'])win.eval(fs.readFileSync(root+f,'utf8'));
  const draft=win.ScoreEditorModel.create(xml),svg=win.document.querySelector('svg'),errors=[];let geometry;
  const editor=win.ScoreEngraver.createEditor(svg,{onReady:g=>geometry=g,onError:e=>errors.push(e)});
  const state={staff:'1',measure:0,selected:-1,tone:0,selectedNotes:new Set(),playing:null,cursor:null};
  const draw=()=>editor.draw(draft,0,width,1,state);
  const ready=async()=>{await editor.ready();assert.deepEqual(errors,[]);};
  t.after(()=>{editor.close();dom.window.close();});draw();await ready();
  return {win,svg,draft,editor,state,draw,ready,get geometry(){return geometry;}};
}
test('edit and applied views use identical engraving, with beams and two piano staves',async t=>{
  const a=await fixture(t,model.template('piano'));
  for(let i=0;i<8;i++)a.draft.place(0,0,i/2,{type:'eighth',pitch:{step:'CDEFGABC'[i],octave:i===7?5:4,alter:0}});
  a.draw();await a.ready();
  assert.equal(a.geometry.bars.length,16,'empty measures remain individually editable');
  assert.ok(a.svg.querySelector('.vf-beam'));
  assert.equal(a.svg.querySelectorAll('.vf-modifiers path').length,0,'natural pitches do not get redundant natural signs');
  const host=a.win.document.createElement('div');a.win.document.body.append(host);
  const renderer=a.win.ScoreEngraver.create(host);await renderer.load(new a.win.DOMParser().parseFromString(a.draft.xml(),'application/xml'));renderer.render();
  const paths=el=>Array.from(el.querySelectorAll('path'),p=>p.getAttribute('d'));
  assert.deepEqual(paths(a.svg),paths(host),'the editor copies the same engraved paths as the score display');
  const applied=host.innerHTML;
  a.draft.place(0,1,0,{pitch:{step:'C',octave:4,alter:0}});a.draw();await a.ready();
  assert.equal(host.innerHTML,applied,'editor SVG ids never interfere with the applied score');
  renderer.clear();
});
test('new grand-staff scores have two rows and an added line stays separate at wide widths',async t=>{
  const a=await fixture(t,model.template('piano'),1600);
  assert.equal(new Set(a.geometry.bars.map(b=>b.row)).size,2);
  a.draft.addLine(0);a.draw();await a.ready();
  assert.equal(new Set(a.geometry.bars.map(b=>b.row)).size,3);
  for(let row=0;row<3;row++){
    const bars=a.geometry.bars.filter(b=>b.row===row);
    assert.equal(bars.length,8);assert.deepEqual([...new Set(bars.map(b=>b.staff))].sort(),['1','2']);
    for(let m=row*4;m<row*4+4;m++)assert.equal(bars.filter(b=>b.measure===m).length,2);
  }
});
test('the applied score reflows at the container width on phones, tablets and desktop',async t=>{
  const a=await fixture(t,model.template('piano'));
  for(let beat=0;beat<4;beat++)a.draft.place(0,0,beat,{pitch:{step:'CDEF'[beat],octave:5,alter:0}});
  const host=a.win.document.createElement('div');a.win.document.body.append(host);
  const renderer=a.win.ScoreEngraver.create(host);t.after(()=>renderer.clear());
  await renderer.load(new a.win.DOMParser().parseFromString(a.draft.xml(),'application/xml'));
  for(const [width,zoom]of [[1000,1],[700,.72],[390,.55],[1200,1]]){
    host.style.width=width+'px';a.win.ScoreEngraver.fitToWidth(renderer,width);
    assert.equal(renderer.Zoom,zoom);
    const svg=host.querySelector('svg');assert.ok(svg);assert.ok(Number(svg.getAttribute('width'))<=width);
    assert.equal(renderer.Sheet.Instruments[0].Staves.length,2);
    assert.ok(host.querySelectorAll('path').length>10,'reflow retains engraved notation');
  }
});
test('clickable playback boundaries align with engraved measures across staves, rows and responsive reflows',async t=>{
  const a=await fixture(t,model.template('piano')),host=a.win.document.createElement('div');a.win.document.body.append(host);
  const renderer=a.win.ScoreEngraver.create(host);t.after(()=>renderer.clear());await renderer.load(new a.win.DOMParser().parseFromString(a.draft.xml(),'application/xml'));
  const range={start:1,end:5,markedStart:true,markedEnd:true,custom:true,setting:'end'};
  for(const width of [1000,390,700]){
    host.style.width=width+'px';a.win.ScoreEngraver.fitToWidth(renderer,width);
    const paths=Array.from(host.querySelectorAll('path'),n=>n.getAttribute('d'));
    a.win.ScoreEngraver.markPlaybackRange(renderer,host,range);
    assert.equal(host.querySelectorAll('[data-playback-measure]').length,16,'both staves of every measure can set a boundary');
    for(const [measure,staves]of renderer.GraphicSheet.MeasureList.entries())for(const graphical of staves){
      const v=graphical.getVFStave(),staff=graphical.ParentStaff.Id;
      const target=host.querySelector(`[data-playback-measure="${measure}"][aria-label$="staff ${staff}"]`);
      assert.equal(target.ownerSVGElement,v.context.svg,'target uses the same page and viewBox as the engraving');
      assert.ok(+target.getAttribute('x')<=v.getNoteStartX());assert.ok(+target.getAttribute('x')+Number(target.getAttribute('width'))>v.getNoteStartX());
      assert.ok(+target.getAttribute('y')<v.getYForLine(0));assert.ok(+target.getAttribute('y')+Number(target.getAttribute('height'))>v.getYForLine(4));
    }
    assert.equal(host.querySelector('[data-playback-boundary="start"]').dataset.measure,'1');assert.equal(host.querySelector('[data-playback-boundary="end"]').dataset.measure,'5');
    a.win.ScoreEngraver.markPlaybackRange(renderer,host,{...range,setting:null});
    assert.equal(host.querySelector('[data-playback-measure]'),null,'ordinary score clicks have no measure target');
    assert.deepEqual(Array.from(host.querySelectorAll('path'),n=>n.getAttribute('d')),paths,'markers do not change the printed notes');
    a.win.ScoreEngraver.markPlaybackRange(renderer,host,{...range,markedStart:false,markedEnd:false,setting:null});assert.equal(host.querySelector('[data-playback-boundary]'),null);
  }
});
test('each displaced chord head is clickable at its actual ink position',async t=>{
  const a=await fixture(t),index=a.draft.place(0,0,0,{pitch:{step:'G',octave:4,alter:0},type:'eighth'});
  for(const [step,octave]of [['C',4],['F',4],['A',4],['C',5]])a.draft.addTone(0,0,index,{step,octave,alter:0});
  for(const raise of [false,true]){
    if(raise)for(const [tone,note]of a.draft.inspect().groups[0].notes.entries())a.draft.pitch(0,0,0,tone,{...note,octave:note.octave+1});
    a.draw();await a.ready();
    const notes=a.geometry.hits.filter(h=>!h.rest);
    assert.equal(notes.length,5);
    assert.ok(new Set(notes.map(n=>n.x)).size>1,'adjacent chord heads are displaced');
    for(const note of notes){
      const head=a.svg.querySelector(`[data-engraved-note="${note.measure}:${note.index}:${note.tone}"] path`);
      const [left,top,right,bottom]=new Path2D(head.getAttribute('d')).computeTightBounds();
      assert.ok(Math.abs(note.x-(left+right)/2)<2,'hit target follows the actual notehead');
      assert.ok(Math.abs(note.y-(top+bottom)/2)<1);
      assert.equal(a.win.ComposerStaff.hit(a.geometry,note.x,note.y).tone,note.tone);
    }
  }
});
test('notes and input targets follow treble-bass-treble clefs within one measure',async t=>{
  const a=await fixture(t);
  for(let beat=0;beat<4;beat++)a.draft.place(0,0,beat,{pitch:{step:'C',octave:4,alter:0}});
  a.draft.changeClef(0,0,'1',1,'bass');a.draft.changeClef(0,0,'1',3,'treble');a.draw();await a.ready();
  const notes=a.geometry.hits.filter(h=>!h.rest);
  for(const [index,hit] of notes.entries()){
    const clef=index===1||index===2?'bass':'treble';
    assert.equal(hit.ctx.clef,clef);
    assert.ok(Math.abs(hit.y-(hit.bar.bottom-a.win.ComposerStaff.stepOf(hit.note,clef)*hit.bar.halfGap))<1);
    const target=a.win.ComposerStaff.target(a.geometry,hit.x,hit.y);
    assert.equal(target.ctx.clef,clef);assert.equal(target.pitch.midi,60);
    assert.equal(a.win.ComposerStaff.pitchAt(hit.y-5,hit.bar,a.geometry,'key',hit.group.beat).midi,62);
  }
});
test('wrapped systems map clicks and box selection to engraved measures and bass pitches',async t=>{
  const a=await fixture(t,model.template('piano'),350);
  for(let m=0;m<4;m++)a.draft.place(0,m,0,{pitch:{step:'C',octave:3,alter:0},staff:'2',voice:'2'});
  a.draw();await a.ready();
  assert.ok(new Set(a.geometry.bars.map(b=>b.row)).size>1);
  for(const hit of a.geometry.hits.filter(h=>!h.rest)){
    const target=a.win.ComposerStaff.target(a.geometry,hit.x,hit.y);
    assert.equal(target.measure,hit.measure);assert.equal(target.bar.staff,'2');assert.equal(target.pitch.midi,48);
  }
  const refs=a.win.ComposerStaff.groupsInRect(a.geometry,{x:0,y:0},{x:350,y:a.geometry.height});
  assert.ok(refs.some(r=>r.measure===0));assert.ok(refs.some(r=>r.measure===3));
  assert.equal(a.svg.querySelector('[stroke-dasharray="3 5"]'),null,'no beat grid is drawn');
});
test('previously edited MusicXML with an unnumbered first clef renders both staves correctly',async t=>{
  const {DOMParser,XMLSerializer}=require('@xmldom/xmldom'),original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  for(const staff of ['1','2'])original.place(0,0,0,{staff,voice:staff,pitch:{step:'C',octave:staff==='1'?4:3,alter:0}});
  // Older edits appended the first staff's clef after the numbered second
  // clef. MusicXML defaults an omitted number to staff 1; OSMD needs it explicit.
  const xml=original.xml().replace(/<clef number="1">.*?<\/clef>/,'').replace(/(<clef number="2">.*?<\/clef>)/,'$1<clef><sign>F</sign><line>4</line></clef>');
  const a=await fixture(t,xml),before=a.draft.xml();
  for(const hit of a.geometry.hits.filter(h=>!h.rest)){
    assert.equal(hit.ctx.clef,'bass');
    assert.ok(Math.abs(hit.y-(hit.bar.bottom-a.win.ComposerStaff.stepOf(hit.note,'bass')*hit.bar.halfGap))<1,`Staff ${hit.staff} must render its own bass clef`);
  }
  const host=a.win.document.createElement('div');a.win.document.body.append(host);
  const renderer=a.win.ScoreEngraver.create(host);t.after(()=>renderer.clear());
  const source=new a.win.DOMParser().parseFromString(xml,'application/xml'),sourceBefore=new a.win.XMLSerializer().serializeToString(source);
  await a.win.ScoreEngraver.loadScore(renderer,source);renderer.render();
  assert.equal(new a.win.XMLSerializer().serializeToString(source),sourceBefore,'render preparation leaves imported XML intact');
  const paths=el=>Array.from(el.querySelectorAll('path'),p=>p.getAttribute('d'));
  assert.deepEqual(paths(a.svg),paths(host),'applied and editable scores use the same staff clefs');
  assert.equal(a.draft.xml(),before);assert.equal(a.draft.dirty,false);
});
test('measure-start clefs and their erase targets are inside the affected measure on either staff',async t=>{
  for(const width of [420,1100]){
    const a=await fixture(t,model.template('piano'),width);
    for(const staff of ['1','2'])for(let measure=0;measure<3;measure++)a.draft.place(0,measure,0,{staff,voice:staff,pitch:{step:'C',octave:staff==='1'?4:3,alter:0}});
    a.draft.changeClef(0,1,'1',0,'bass');a.draft.changeClef(0,1,'2',0,'treble');
    a.draft.changeClef(0,2,'1',0,'treble');a.draft.changeClef(0,2,'2',0,'bass');a.draw();await a.ready();
    const bounds=Array.from(a.svg.querySelectorAll('.vf-clef path'),p=>new Path2D(p.getAttribute('d')).computeTightBounds());
    for(const symbol of a.geometry.symbols.filter(s=>s.kind==='clef'&&s.measure>0&&!s.inherited)){
      assert.ok(symbol.x>symbol.bar.left,`clef must follow the barline at width ${width}`);
      assert.ok(symbol.x+symbol.width<symbol.bar.points[0].x,'clef must precede the first note');
      assert.ok(bounds.some(b=>Math.abs(b[0]-symbol.x)<1&&Math.abs(b[1]-symbol.y)<1&&Math.abs(b[2]-symbol.x-symbol.width)<1&&Math.abs(b[3]-symbol.y-symbol.height)<1),'erase target follows the actual clef ink');
    }
    assert.equal(a.geometry.symbols.filter(s=>s.kind==='clef'&&s.measure>0&&!s.inherited).length,4);
  }
});
test('accidental cancellation and half rests use engraved symbols',async t=>{
  const a=await fixture(t);
  for(let beat=0;beat<3;beat++)a.draft.place(0,0,beat,{pitch:{step:'C',octave:4,alter:beat===0?1:0}});
  a.draw();await a.ready();assert.equal(a.svg.querySelectorAll('.vf-modifiers path').length,2);
  a.draft.addMeasure(0);a.draft.place(0,1,0,{type:'half'});a.draw();await a.ready();
  const hit=a.geometry.hits.find(n=>n.measure===1&&n.group.type==='half');
  const path=a.svg.querySelector(`[data-engraved-note="1:${hit.index}:0"] path`);
  const bounds=new Path2D(path.getAttribute('d')).computeTightBounds();
  assert.ok(Math.abs(bounds[3]-(hit.bar.bottom-4*hit.bar.halfGap))<1,'half rest sits above the middle staff line');
});
test('rapid edits keep the newest layout and closing cancels a pending engraving',async t=>{
  const a=await fixture(t),prototype=a.win.opensheetmusicdisplay.OpenSheetMusicDisplay.prototype,original=prototype.load;let release;
  prototype.load=async function(xml){await new Promise(resolve=>release=resolve);return original.call(this,xml);};
  t.after(()=>{prototype.load=original;});
  const started=async()=>{for(let i=0;i<20&&!release;i++)await Promise.resolve();assert.equal(typeof release,'function');};
  a.draft.place(0,0,0,{pitch:{step:'C',octave:4,alter:0}});a.draw();
  await started();
  a.draft.undo();a.draw();release();await a.ready();
  assert.equal(a.geometry.hits.filter(h=>!h.rest).length,0,'old render cannot replace an undo');
  release=null;a.draft.redo();a.draw();await started();
  a.editor.close();release();await a.ready();assert.equal(a.svg.children.length,0,'closed drafts never reappear');
});
