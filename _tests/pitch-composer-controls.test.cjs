const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const html=fs.readFileSync(`${__dirname}/../sheet-music/index.html`,'utf8');
const shared = name => fs.readFileSync(`${__dirname}/../music-shared/${name}`, 'utf8');
async function fixture(width=900,xml,height=500){
  const dom=new JSDOM(html,{runScripts:'outside-only',url:'http://localhost/sheet-music/'}),win=dom.window,doc=win.document;
  const $=id=>doc.getElementById('vp-editor-'+id),errors=[];let saved;
  win.addEventListener('error',e=>errors.push(e.error));
  require('./engraving-fixture.cjs').install(win);
  win.eval(shared('pitch-core.js'));win.eval(shared('music-glyphs.js'));
  for(const file of ['music-score.js','score-editor-model.js','composer-staff.js','score-engraver.js','score-playback.js','composer-controller.js','score-editor.js'])win.eval(fs.readFileSync(`${__dirname}/../sheet-music/${file}`,'utf8'));
  $('dialog').showModal=function(){this.open=true;};$('dialog').close=function(){this.open=false;};
  Object.defineProperty($('canvas-scroll'),'clientWidth',{get:()=>width});Object.defineProperty($('canvas-scroll'),'clientHeight',{value:height});
  const svg=$('canvas');svg.setPointerCapture=()=>{};svg.getScreenCTM=()=>({inverse:()=>({})});svg.createSVGPoint=()=>({x:0,y:0,matrixTransform(){return{x:this.x,y:this.y};}});
  const editor=win.ScoreEditor.mount({apply:async xml=>{saved=xml;}});editor.open(xml);await editor.ready();
  const tool=async value=>{doc.querySelector(`[data-composer-tool="${value}"]`).click();await editor.ready();};
  const length=async value=>{doc.querySelector(`[data-length="${value}"]`).click();await editor.ready();};
  const change=async(id,value)=>{$(id).value=String(value);$(id).dispatchEvent(new win.Event('change',{bubbles:true}));await editor.ready();};
  const note=(measure,index,tone=0)=>svg.querySelector(`[data-composer-note="${measure}:${index}:${tone}"]`);
  const point=n=>({x:Number(n.dataset.x),y:Number(n.dataset.y)});
  const pos=(measure,beat,step,staff='1')=>{
    const bar=svg.querySelector(`[data-composer-measure="${measure}"][data-composer-staff="${staff}"]`);
    return {x:win.ScoreEngraver.xAt({points:JSON.parse(bar.dataset.beatPoints)},beat),y:+bar.dataset.bottom-step*+bar.dataset.halfGap};
  };
  const pointer=(type,p,mods={})=>{const e=new win.MouseEvent(type,{bubbles:true,button:0,clientX:p.x,clientY:p.y,...mods});Object.defineProperty(e,'pointerId',{value:1});svg.dispatchEvent(e);};
  const tap=async(p,mods)=>{await editor.ready();pointer('pointerdown',p,mods);pointer('pointerup',p,mods);await editor.ready();};
  const pick=async(m,i,t=0,mods)=>tap(point(note(m,i,t)),mods);
  const groups=()=>new Set([...svg.querySelectorAll('[data-composer-note]')].map(n=>n.dataset.composerNote.split(':').slice(0,2).join(':')));
  const click=async id=>{$(id).click();await editor.ready();};
  const apply=async()=>{await editor.ready();$('apply').click();for(let i=0;i<8;i++)await Promise.resolve();assert.equal($('dialog').open,false,$('error').textContent);assert.deepEqual(errors,[]);return win.ScoreEditorModel.create(saved);};
  return {dom,win,doc,$,svg,editor,click,tool,length,change,note,point,pos,pointer,tap,pick,groups,apply,errors};
}
async function press(app,key,mods={},target=app.svg){target.dispatchEvent(new app.win.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true,...mods}));await app.editor.ready();}
test('keyboard note entry advances beats, appends a measure, and undoes it in one step',async()=>{
  const a=await fixture();await press(a,'n');await press(a,'5');for(const note of ['c','d','e','f','g'])await press(a,note);
  assert.ok(a.svg.querySelector('[data-input-cursor]'));assert.equal(a.$('error').hidden,true,a.$('error').textContent);
  await a.click('undo');assert.equal(a.$('measure').options.length,1);
  await a.click('redo');const d=await a.apply();
  assert.deepEqual(Array.from(d.playback().events,e=>[e.midi,e.beat]),[[60,0],[62,1],[64,2],[65,3],[67,4]]);a.dom.window.close();
});
test('keyboard duration, dots, rests, chord tones and Escape keep the current draft',async()=>{
  const a=await fixture();await press(a,'n');await press(a,'4');await press(a,'.');await press(a,'c');await press(a,'E',{shiftKey:true});await press(a,'0');await press(a,'.');await press(a,'.');await press(a,'5');await press(a,'d');
  await press(a,'Escape');assert.equal(a.$('dialog').open,true);assert.equal(a.svg.querySelector('[data-input-cursor]'),null);
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,e=>[e.midi,e.beat,e.duration]),[[60,0,.75],[64,0,.75],[62,1.5,1]]);a.dom.window.close();
});
test('piano template keyboard input edits the selected staff and ignores form typing',async()=>{
  const model=require('../sheet-music/score-editor-model.js'),a=await fixture(900,model.template('piano'));
  await a.change('lane',1);await press(a,'n');await press(a,'c');await press(a,'ArrowUp',{ctrlKey:true});
  const count=a.groups().size;await press(a,'a',{},a.$('title'));assert.equal(a.groups().size,count);
  const d=await a.apply();assert.equal(d.playback(0,'1','1').events.length,0);assert.equal(d.playback(0,'2','2').events[0].midi,60);assert.equal(d.context(0,0,'2').clef,'bass');a.dom.window.close();
});
test('clicking and dragging on the engraved bass staff edits that staff only',async()=>{
  const model=require('../sheet-music/score-editor-model.js'),a=await fixture(900,model.template('piano'));
  await a.tool('note');await a.length('quarter');await a.tap(a.pos(0,0,3,'2'));
  assert.equal(a.$('lane').value,'1');
  await a.tool('select');const p=a.point(a.note(0,1)),up={x:p.x,y:p.y-5};
  a.pointer('pointerdown',p);a.pointer('pointermove',up);a.pointer('pointerup',up);await a.editor.ready();
  const d=await a.apply();assert.equal(d.playback(0,'1','1').events.length,0);
  assert.deepEqual(Array.from(d.playback(0,'2','2').events,e=>e.midi),[50]);a.dom.window.close();
});
test('the clef control switches at the chosen note and back, with correct dragging and export',async()=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  for(let beat=0;beat<4;beat++)original.place(0,0,beat,{pitch:{step:'C',octave:4,alter:0}});
  const a=await fixture(900,original.xml());
  await a.pick(0,1);await a.change('clef','bass');assert.match(a.$('clef-position').textContent,/measure 1, beat 2 · staff 1/);
  await a.pick(0,3);await a.change('clef','treble');
  await a.pick(0,0);assert.equal(a.$('clef').value,'treble');
  await a.pick(0,1);assert.equal(a.$('clef').value,'bass');await press(a,'ArrowUp');
  const p=a.point(a.note(0,1));a.pointer('pointerdown',p);a.pointer('pointermove',{x:p.x,y:p.y-5});a.pointer('pointerup',{x:p.x,y:p.y-5});await a.editor.ready();
  // Measure navigation chooses the start of the measure for a clef change.
  await a.change('measure',1);await a.change('clef','bass');
  await a.change('measure',2);await a.change('clef','treble');
  const d=await a.apply();
  assert.deepEqual(Array.from(d.playback(0,'1','1').events,e=>e.midi),[60,64,60,60]);
  assert.equal(d.context(0,0,'2').clef,'bass');assert.equal(d.playback(0,'2','2').events.length,0);
  assert.equal(d.context(0,1,'1',0).clef,'bass');assert.equal(d.context(0,2,'1',0).clef,'treble');
  a.editor.open(d.xml());await a.editor.ready();await a.pick(0,1);assert.equal(a.$('clef').value,'bass');
  await a.pick(0,3);assert.equal(a.$('clef').value,'treble');a.dom.window.close();
});
test('staff and voice switching survives stopping playback and edits only the chosen lane',async()=>{
  const {DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const d=require('../sheet-music/score-editor-model.js').create(undefined,DOMParser,XMLSerializer);
  d.place(0,0,0,{pitch:{step:'C',alter:0,octave:4}});
  d.place(0,0,0,{staff:'2',voice:'2',pitch:{step:'G',alter:0,octave:3}});
  d.settings(0,0,{clef:'bass',staff:'2'});
  const a=await fixture(900,d.xml());await a.pick(0,0);await a.change('lane',1);
  assert.equal(a.$('lane').value,'1');assert.equal(a.$('clef').value,'bass');
  await a.change('key','major:-2');await a.pick(0,2);await a.change('accidental',1);const result=await a.apply();
  assert.equal(result.context(0,0,'1').fifths,0);assert.equal(result.context(0,0,'2').fifths,-2);
  assert.equal(result.playback(0,'1','1').events[0].midi,60);
  assert.equal(result.playback(0,'2','2').events[0].midi,56);a.dom.window.close();
});
test('in-key input stays key-aware across natural and altered notes and chord tones',async()=>{
  const a=await fixture();await a.change('key','major:1');await a.tool('note');await a.length('quarter');await a.change('accidental','key');
  await a.tap(a.pos(0,0,-2));await a.tap(a.pos(0,1,1));await a.tap(a.pos(0,2,2));
  await a.tool('chord');await a.tap(a.pos(0,0,1));await a.tap(a.pos(0,0,2));
  const d=await a.apply();assert.deepEqual(Array.from(d.inspect().groups.slice(0,3),g=>Array.from(g.notes,n=>[n.step,n.alter])),[[['C',0],['F',1],['G',0]],[['F',1]],[['G',0]]]);a.dom.window.close();
});
test('adding a measure reveals its row and the composer can return to the first row',async()=>{
  const a=await fixture(350,undefined,120);for(let i=0;i<5;i++)await a.click('add-measure');
  assert.ok(a.$('canvas-scroll').scrollTop>0);
  await a.change('measure',0);assert.ok(a.$('canvas-scroll').scrollTop<=a.pos(0,0,8).y,'first staff is visible');a.dom.window.close();
});
test('Add line reveals a new grand-staff row, supports editing both staves, and survives apply/reopen',async()=>{
  const model=require('../sheet-music/score-editor-model.js'),a=await fixture(900,model.template('piano'),220);
  const rows=()=>new Set([...a.svg.querySelectorAll('[data-composer-row]')].map(n=>n.dataset.composerRow));
  assert.equal(rows().size,2);await a.click('add-line');
  assert.equal(a.$('measure').value,'8');assert.equal(a.$('measure').options.length,12);assert.equal(rows().size,3);
  assert.ok(a.$('canvas-scroll').scrollTop>0);
  await a.click('undo');assert.equal(a.$('measure').options.length,8);assert.equal(rows().size,2);
  await a.click('redo');assert.equal(a.$('measure').options.length,12);
  await a.tool('note');await a.length('quarter');await a.tap(a.pos(8,0,-2,'1'));await a.tap(a.pos(8,0,3,'2'));
  const d=await a.apply();
  assert.deepEqual(Array.from(d.playback(0,'1','1').events,e=>[e.midi,e.beat]),[[60,32]]);
  assert.deepEqual(Array.from(d.playback(0,'2','2').events,e=>[e.midi,e.beat]),[[48,32]]);
  a.editor.open(d.xml());await a.editor.ready();assert.equal(rows().size,3);
  assert.ok(a.note(8,0));assert.ok(a.note(8,2));a.dom.window.close();
});
test('half rests sit above the middle staff line',async()=>{
  const a=await fixture();await a.tool('rest');await a.length('half');await a.tap(a.pos(0,0,4));
  assert.ok(a.svg.querySelector('[data-engraved-note="0:0:0"] path'));assert.equal(a.svg.dataset.engraver,'osmd');a.dom.window.close();
});
test('a natural sign cancels a previous accidental on the same pitch within a measure',async()=>{
  const a=await fixture();await a.tool('note');await a.length('quarter');await a.change('accidental','1');await a.tap(a.pos(0,0,-2));
  await a.tool('note');await a.change('accidental','0');await a.tap(a.pos(0,1,-2));await a.tap(a.pos(0,2,-2));
  assert.ok(a.svg.querySelector('.vf-modifiers path'),'engraved accidental is present');
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,e=>e.midi),[61,60,60]);a.dom.window.close();
});
test('a pending audio preview can be stopped and a failed start can be retried',async()=>{
  const a=await fixture();await a.length('quarter');await a.tap(a.pos(0,0,-2));let resolve,reject,starts=0;
  a.win.AudioContext=class{resume(){starts++;return new Promise((yes,no)=>{resolve=yes;reject=no;});}close(){return Promise.resolve();}};
  await a.click('play');assert.equal(a.$('play').textContent,'■ Stop preview');await a.click('play');resolve();
  for(let i=0;i<8;i++)await Promise.resolve();assert.equal(starts,1);assert.equal(a.$('play').textContent,'▶ Play preview');
  await a.click('play');reject(Error('Audio unavailable'));for(let i=0;i<8;i++)await Promise.resolve();
  assert.equal(a.$('error').textContent,'Audio unavailable');assert.equal(a.$('play').textContent,'▶ Play preview');
  await a.click('play');assert.equal(starts,3);await a.click('cancel');resolve();for(let i=0;i<8;i++)await Promise.resolve();
  assert.equal(a.$('dialog').open,false);assert.deepEqual(a.errors,[]);a.dom.window.close();
});
test('actual palette edits selected chord duration, dots and only the selected accidental',async()=>{
  const a=await fixture();await a.length('whole');await a.tap(a.pos(0,0,-2));await a.tool('chord');await a.tap(a.pos(0,0,0));await a.tool('select');await a.pick(0,0,0);
  await a.change('accidental','1');assert.match(a.note(0,0,0).getAttribute('aria-label'),/^C sharp4/);assert.match(a.note(0,0,1).getAttribute('aria-label'),/^E4/);
  await a.length('eighth');assert.ok(a.svg.querySelector('.vf-flag path'));
  await a.change('input-dots',1);await a.pick(0,0,1);await a.change('accidental','-1');
  await a.click('undo');assert.match(a.note(0,0,1).getAttribute('aria-label'),/^E4/);await a.click('redo');assert.match(a.note(0,0,1).getAttribute('aria-label'),/^E flat4/);
  const d=await a.apply(),g=d.inspect().groups[0];assert.equal(g.type,'eighth');assert.equal(g.duration,.75);assert.equal(g.dots,1);assert.deepEqual(Array.from(g.notes,n=>n.alter),[1,-1]);
  assert.deepEqual(Array.from(d.playback().events,n=>[n.midi,n.duration]),[[61,.75],[63,.75]]);a.dom.window.close();
});
test('new-note mode keeps its input settings while replacing a rest and allows continuous entry',async()=>{
  const a=await fixture(350);await a.tool('note');await a.length('quarter');await a.change('accidental','1');await a.tap(a.pos(0,0,-2));await a.tap(a.pos(0,1,0));
  assert.match(a.note(0,0).getAttribute('aria-label'),/^C sharp4/);assert.match(a.note(0,1).getAttribute('aria-label'),/^E sharp4/);
  await a.tool('note');await a.length('eighth');await a.change('accidental','0');await a.tap(a.pos(0,2,2));
  const d=await a.apply();assert.deepEqual(Array.from(d.inspect().groups.slice(0,3),g=>[g.type,g.duration]),[['quarter',1],['quarter',1],['eighth',.5]]);a.dom.window.close();
});
test('visible staff and scale controls affect later rows, selected notes, and saved MusicXML',async()=>{
  const a=await fixture(350);await a.length('quarter');await a.tap(a.pos(0,0,-2));
  for(let m=1;m<4;m++)await a.click('add-measure');
  await a.change('clef','bass');await a.change('key','major:1');await a.tool('note');await a.change('accidental','key');await a.length('quarter');await a.tap(a.pos(3,0,6));
  assert.match(a.note(3,0).getAttribute('aria-label'),/^F sharp3/);
  assert.ok(new Set([...a.svg.querySelectorAll('[data-composer-row]')].map(n=>n.dataset.composerRow)).size>1);
  assert.equal(a.$('clef').closest('details'),null);assert.equal(a.$('key').closest('details'),null);
  await a.tool('select');await a.pick(3,0);await a.change('accidental',0);await a.length('eighth');
  const d=await a.apply();assert.equal(d.context(0,0).clef,'treble');assert.equal(d.context(0,3).clef,'bass');assert.equal(d.context(0,3).fifths,1);assert.equal(d.inspect(0,3).groups[0].duration,.5);assert.equal(d.inspect(0,3).groups[0].notes[0].alter,0);a.dom.window.close();
});
test('tap, range and drag selection delete whole groups across rows with one undo',async()=>{
  const a=await fixture(350);await a.length('quarter');await a.tap(a.pos(0,0,-2));await a.tool('chord');await a.tap(a.pos(0,0,0));
  await a.click('add-measure');await a.tool('note');await a.length('quarter');await a.tap(a.pos(1,0,2));await a.tap(a.pos(1,1,4));
  const before=a.groups();await a.click('clear-selection');await a.tool('multi');await a.pick(0,0);await a.pick(1,1);
  assert.equal(a.$('selection-status').textContent,'2 groups selected');assert.equal(a.doc.querySelectorAll('[data-composer-note][aria-pressed="true"]').length,3);
  await a.click('delete-selected');assert.equal(a.groups().size,before.size-2);await a.click('undo');assert.deepEqual(a.groups(),before);
  await a.pick(0,0);await a.pick(1,1,0,{shiftKey:true});assert.equal(a.$('selection-status').textContent,'4 groups selected');
  await press(a,'Delete');assert.equal(a.groups().size,before.size-4);await a.click('undo');assert.deepEqual(a.groups(),before);
  await a.tool('select');await a.pick(0,0);await a.pick(1,1,0,{shiftKey:true});assert.equal(a.$('selection-status').textContent,'4 groups selected');await a.click('clear-selection');
  const p=a.point(a.note(0,0)),q=a.point(a.note(1,1));a.pointer('pointerdown',{x:p.x-20,y:p.y-30});a.pointer('pointermove',{x:q.x+20,y:q.y+30});
  assert.ok(a.svg.querySelector('[data-composer-box]'));a.pointer('pointerup',{x:q.x+20,y:q.y+30});assert.ok(parseInt(a.$('selection-status').textContent)>=3);
  const count=a.$('selection-status').textContent;a.pointer('pointerdown',p);a.pointer('pointermove',q);a.pointer('pointercancel',q);assert.equal(a.$('selection-status').textContent,count);
  await a.click('delete-selected');await a.click('undo');assert.deepEqual(a.groups(),before);
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,n=>n.midi),[60,64,67,71]);a.dom.window.close();
});
