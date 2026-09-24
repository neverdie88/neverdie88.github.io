const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const html=fs.readFileSync(`${__dirname}/../sheet-music/index.html`,'utf8');
const shared = name => fs.readFileSync(`${__dirname}/../music-shared/${name}`, 'utf8');
async function fixture(width=900,xml,height=500,recordPlayback=false){
  const dom=new JSDOM(html,{runScripts:'outside-only',url:'http://localhost/sheet-music/'}),win=dom.window,doc=win.document;
  const $=id=>doc.getElementById('vp-editor-'+id),errors=[];let saved;
  win.addEventListener('error',e=>errors.push(e.error));
  require('./engraving-fixture.cjs').install(win);
  win.eval(shared('pitch-core.js'));win.eval(shared('music-glyphs.js'));
  for(const file of ['music-score.js','score-editor-model.js','composer-staff.js','score-engraver.js','score-playback.js','composer-controller.js','score-editor.js'])win.eval(fs.readFileSync(`${__dirname}/../sheet-music/${file}`,'utf8'));
  let preview;if(recordPlayback)win.ScorePlayback.create=callbacks=>preview={active:false,score:null,showNotes(events){callbacks.onNotes(events);},async start(score){this.score=score;this.active=true;this.showNotes(score.events.filter(e=>e.beat===score.events[0].beat));},stop(){this.active=false;callbacks.onStop();},close(){this.stop();}};
  $('dialog').showModal=function(){this.open=true;};$('dialog').close=function(){this.open=false;};
  Object.defineProperty($('canvas-scroll'),'clientWidth',{get:()=>width});Object.defineProperty($('canvas-scroll'),'clientHeight',{value:height});
  const svg=$('canvas');svg.setPointerCapture=()=>{};svg.getScreenCTM=()=>({inverse:()=>({})});svg.createSVGPoint=()=>({x:0,y:0,matrixTransform(){return{x:this.x,y:this.y};}});
  let controller,composer;const mount=win.ScoreComposer.mount;win.ScoreComposer.mount=options=>{controller=options;return composer=mount(options);};
  const editor=win.ScoreEditor.mount({apply:async xml=>{saved=xml;}});editor.open(xml);await editor.ready();
  const tool=async value=>{doc.querySelector(`[data-composer-tool="${value}"]`).click();await editor.ready();};
  const length=async value=>{doc.querySelector(`[data-length="${value}"]`).click();await editor.ready();};
  const change=async(id,value)=>{$(id).value=String(value);$(id).dispatchEvent(new win.Event('change',{bubbles:true}));await editor.ready();};
  const property=async(kind,value)=>{
    assert.equal($('note-properties').hidden,false,'Select a note before editing its properties');
    const button=$('note-properties').querySelector(`[data-${kind}="${value}"]`);assert.ok(button);assert.equal(button.disabled,false);
    button.click();await editor.ready();
  };
  const note=(measure,index,tone=0)=>svg.querySelector(`[data-composer-note="${measure}:${index}:${tone}"]`);
  const point=n=>({x:Number(n.dataset.x),y:Number(n.dataset.y)});
  const pos=(measure,beat,step,staff='1')=>{
    const bar=svg.querySelector(`[data-composer-measure="${measure}"][data-composer-staff="${staff}"]`);
    return {x:win.ScoreEngraver.xAt({points:JSON.parse(bar.dataset.beatPoints)},beat),y:+bar.dataset.bottom-step*+bar.dataset.halfGap};
  };
  const pointer=(type,p,mods={})=>{const e=new win.MouseEvent(type,{bubbles:true,button:0,clientX:p.x,clientY:p.y,...mods});Object.defineProperty(e,'pointerId',{value:mods.pointerId||1});Object.defineProperty(e,'pointerType',{value:mods.pointerType||'mouse'});svg.dispatchEvent(e);};
  const tap=async(p,mods)=>{await editor.ready();pointer('pointerdown',p,mods);pointer('pointerup',p,mods);await editor.ready();};
  const pick=async(m,i,t=0,mods)=>tap(point(note(m,i,t)),mods);
  const groups=()=>new Set([...svg.querySelectorAll('[data-composer-note]')].map(n=>n.dataset.composerNote.split(':').slice(0,2).join(':')));
  const click=async id=>{$(id).click();await editor.ready();};
  const apply=async()=>{await editor.ready();$('apply').click();for(let i=0;i<8;i++)await Promise.resolve();assert.equal($('dialog').open,false,$('error').textContent);assert.deepEqual(errors,[]);return win.ScoreEditorModel.create(saved);};
  const selection=()=>controller.getSelection(),draft=()=>controller.getDraft(),lane=()=>composer.currentLane();
  const selectFirst=async(value,staff)=>{await tool('select');const g=draft().inspect(selection().part,value).groups.find(g=>g.staff===staff);assert.ok(g,'a note or rest is available');await pick(value,g.index);};
  const measure=async value=>selectFirst(value,lane().staff);
  const staff=async value=>selectFirst(selection().measure,draft().lanes(selection().part)[value].staff);
  const clefValue=()=>{const s=selection(),g=draft().inspect(s.part,s.measure).groups[s.index];return draft().context(s.part,s.measure,g?.staff||lane().staff,g?.beat||0).clef;};
  const clef=async value=>{const s=selection(),g=draft().inspect(s.part,s.measure).groups[s.index],staff=lane().staff;await tool('clef-'+value);if(g)note(s.measure,s.index,s.tone).dispatchEvent(new win.MouseEvent('click',{bubbles:true,detail:0}));else{const box=svg.querySelector(`[data-composer-measure-area="${s.measure}:${staff}"]`);await tap({x:+box.getAttribute('x')+2,y:+box.getAttribute('y')+20});}await editor.ready();await tool('select');};
  const measureCount=()=>draft().inspect().parts[selection().part].measures.length;
  return {preview,selection,draft,lane,measure,staff,clef,clefValue,measureCount,dom,win,doc,$,svg,editor,click,tool,length,change,property,note,point,pos,pointer,tap,pick,groups,apply,errors};
}
async function press(app,key,mods={},target=app.svg){target.dispatchEvent(new app.win.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true,...mods}));await app.editor.ready();}
test('direct score controls replace staff/measure navigation and the sidebar clef selector',async t=>{
  const a=await fixture();t.after(()=>a.dom.window.close());
  for(const id of ['lane','lane-picker','measure','previous','next','add-measure','clef','clef-position'])assert.equal(a.$(id),null,id);
  assert.ok(a.$('add-line'));assert.ok(a.$('palette').querySelector('[data-composer-tool="clef-treble"] svg path'));
  assert.ok(a.$('palette').querySelector('[data-composer-tool="clef-bass"] svg path'));
});
test('unmodified rectangle selection chooses individual chord tones and Play keeps exactly that selection',async t=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  original.place(0,0,1,{pitch:{step:'C',octave:4,alter:0}});original.addTone(0,0,1,{step:'E',octave:4,alter:0});
  original.place(0,0,1,{staff:'2',voice:'2',pitch:{step:'C',octave:3,alter:0}});
  original.place(0,4,2,{pitch:{step:'G',octave:4,alter:0}});
  const a=await fixture(900,original.xml(),500,true),originalDraft=a.draft().xml();t.after(()=>a.dom.window.close());await a.tool('select');
  const pitch=a.point(a.note(0,1,1)),from={x:pitch.x-18,y:pitch.y-3},to={x:pitch.x+12,y:pitch.y+3};
  a.pointer('pointerdown',from);a.pointer('pointermove',to);
  assert.equal(a.svg.querySelectorAll('[data-select-note]').length,1);assert.equal(a.$('selection-status').textContent,'1 note to select');
  a.pointer('pointerup',to);await a.editor.ready();
  assert.equal(a.svg.querySelectorAll('[data-composer-note][aria-pressed="true"]').length,1);assert.equal(a.note(0,1,1).getAttribute('aria-pressed'),'true');
  await a.click('play');assert.deepEqual(Array.from(a.preview.score.events,e=>[e.midi,e.beat,e.duration]),[[64,0,1]]);
  assert.equal(a.note(0,1,1).getAttribute('aria-pressed'),'true','playback highlighting preserves selection');await a.click('play');
  assert.equal(a.$('selection-status').textContent,'1 note selected');assert.equal(a.$('play').textContent,'▶ Play selection');
  // A normal drag can span both piano staves and later rows, with rests omitted.
  const [, ,width,height]=a.svg.getAttribute('viewBox').split(' ').map(Number);
  a.pointer('pointerdown',{x:1,y:1},{pointerType:'touch'});a.pointer('pointermove',{x:width-1,y:height-1},{pointerType:'touch'});a.pointer('pointerup',{x:width-1,y:height-1},{pointerType:'touch'});await a.editor.ready();
  assert.equal(a.$('selection-status').textContent,'4 notes selected');await a.click('play');
  assert.deepEqual(Array.from(a.preview.score.events,e=>[e.midi,e.beat]),[[60,0],[64,0],[48,0],[67,17]]);
  assert.equal(a.preview.score.duration,18);await a.click('play');
  const before=a.$('selection-status').textContent;a.pointer('pointerdown',from);a.pointer('pointermove',to);a.pointer('pointercancel',to);assert.equal(a.$('selection-status').textContent,before);
  await a.pick(0,1,0);await a.click('play');assert.deepEqual(Array.from(a.preview.score.events,e=>e.midi),[60]);await a.click('play');
  await a.click('clear-selection');await a.click('play');assert.equal(a.preview.score.events.length,4);assert.equal(a.preview.score.events[0].beat,1,'full score keeps its opening rest');
  assert.equal(a.draft().xml(),originalDraft,'selection and playback do not edit the score');
});
test('full-part playback colors all sounding notes on both staves and restores selection after Stop',async t=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  original.place(0,0,0,{type:'half',pitch:{step:'C',octave:4,alter:0}});original.addTone(0,0,0,{step:'E',octave:4,alter:0});
  original.place(0,0,0,{staff:'2',voice:'2',pitch:{step:'C',octave:3,alter:0}});
  original.place(0,0,1,{staff:'2',voice:'2',pitch:{step:'D',octave:3,alter:0}});
  const a=await fixture(900,original.xml(),500,true);t.after(()=>a.dom.window.close());
  const colored=color=>Array.from(a.svg.querySelectorAll('[data-engraved-note]')).filter(n=>n.querySelector(`path[fill="${color}"]`)).map(n=>n.dataset.engravedNote).sort();
  const ids=events=>Array.from(events,e=>`${e.measure}:${e.index}:${e.tone}`).sort();
  await a.click('clear-selection');await a.click('play');const events=a.preview.score.events;
  assert.deepEqual(colored('#15803d'),ids(events.filter(e=>e.beat===0)),'both top chord tones and the bass note turn green');
  assert.equal(colored('#15803d').length,3);assert.equal(a.svg.querySelectorAll('[aria-pressed="true"][data-composer-note]').length,0);
  a.preview.showNotes(events.filter(e=>e.beat<=1&&e.beat+e.duration>1));await a.editor.ready();
  assert.deepEqual(colored('#15803d'),ids(events.filter(e=>[60,64,50].includes(e.midi))),'held upper notes stay green when the lower note changes');
  a.preview.showNotes([]);await a.editor.ready();assert.deepEqual(colored('#15803d'),[],'rest clears green notes');
  await a.click('play');assert.deepEqual(colored('#15803d'),[]);
  await a.pick(0,0,1);await a.click('play');assert.deepEqual(colored('#15803d'),['0:0:1']);
  await a.click('play');assert.deepEqual(colored('#15803d'),[]);assert.deepEqual(colored('#2563eb'),['0:0:1']);
});
test('Transpose minus/plus move the whole score per click, stop playback, undo and save playable notes',async t=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  original.place(0,0,0,{pitch:{step:'C',octave:4,alter:0}});original.addTone(0,0,0,{step:'E',octave:4,alter:-1});
  original.place(0,0,0,{staff:'2',voice:'2',pitch:{step:'B',octave:2,alter:0}});
  const a=await fixture(900,original.xml(),500,true);t.after(()=>a.dom.window.close());
  const pitches=()=>Array.from(a.draft().playback(0,null,null).events,e=>e.midi),before=a.draft().xml();
  assert.equal(a.$('pitch-up'),null);assert.equal(a.$('pitch-down'),null);assert.equal(a.$('transpose-panel'),null);
  await a.pick(0,0,1);await a.click('play');await a.click('transpose-up');
  assert.equal(a.preview.active,false);assert.deepEqual(pitches(),[61,64,48]);
  assert.equal(a.draft().context(0,0).fifths,-5);assert.equal(a.draft().context(0,0,'2').fifths,-5);
  assert.equal(a.svg.querySelectorAll('[data-composer-note][aria-pressed="true"]').length,0);
  const firstStep=a.draft().xml();await a.click('transpose-up');assert.deepEqual(pitches(),[62,65,49]);
  await a.click('undo');assert.equal(a.draft().xml(),firstStep);await a.click('undo');assert.equal(a.draft().xml(),before);assert.equal(a.draft().canUndo,false);
  await a.click('redo');assert.equal(a.draft().xml(),firstStep);
  await a.click('transpose-down');assert.deepEqual(pitches(),[60,63,47]);assert.equal(a.draft().context(0,0).fifths,0);
  await a.click('transpose-down');assert.deepEqual(pitches(),[59,62,46]);assert.equal(a.draft().context(0,0).fifths,5);
  await a.click('play');assert.deepEqual(Array.from(a.preview.score.events,e=>e.midi),[59,62,46]);await a.click('play');
  const saved=await a.apply();assert.deepEqual(Array.from(saved.playback(0,null,null).events,e=>e.midi),[59,62,46]);
  a.editor.open(saved.xml());await a.editor.ready();assert.equal(a.$('error').hidden,true);
});
test('Select toggles visible clefs and the palette inserts clefs on either staff without moving notes',async t=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  for(const staff of ['1','2'])for(let beat=0;beat<4;beat++)original.place(0,0,beat,{staff,voice:staff,pitch:{step:'C',octave:staff==='1'?4:3,alter:0}});
  const a=await fixture(900,original.xml());t.after(()=>a.dom.window.close());
  const tapClef=async id=>{const el=a.svg.querySelector(`[data-composer-symbol="${id}"]`);assert.ok(el,id);await a.tap({x:+el.getAttribute('x')+Number(el.getAttribute('width'))/2,y:+el.getAttribute('y')+Number(el.getAttribute('height'))/2});};
  await tapClef('clef:0:2:0');assert.equal(a.draft().context(0,0,'2',0).clef,'treble');assert.equal(a.draft().context(0,0,'1',0).clef,'treble');
  await tapClef('clef:0:2:0');assert.equal(a.draft().context(0,0,'2',0).clef,'bass');
  await a.change('zoom','1.6');await a.tool('clef-treble');const lower=original.inspect().groups.find(g=>g.staff==='2'&&g.beat===2);
  await a.pick(0,lower.index);assert.equal(a.draft().context(0,0,'2',1).clef,'bass');assert.equal(a.draft().context(0,0,'2',2).clef,'treble');
  await a.tool('select');await tapClef('clef:0:2:2');assert.equal(a.draft().context(0,0,'2',2).clef,'bass');
  await a.click('undo');assert.equal(a.draft().context(0,0,'2',2).clef,'treble');
  await a.tool('clef-bass');await a.tap(a.pos(1,0,4,'2'));assert.equal(a.draft().context(0,1,'2',0).clef,'bass');
  await a.tool('select');await tapClef('clef:4:2:0');assert.equal(a.draft().context(0,4,'2',0).clef,'treble','a repeated row clef can become a local change');
  const saved=await a.apply();for(const staff of ['1','2'])assert.deepEqual(JSON.parse(JSON.stringify(saved.playback(0,staff,staff))),original.playback(0,staff,staff));
  a.editor.open(saved.xml());await a.editor.ready();assert.equal(a.draft().context(0,0,'2',2).clef,'treble');assert.equal(a.draft().context(0,4,'2',0).clef,'treble');
});
test('keyboard note entry advances beats, appends a measure, and undoes it in one step',async()=>{
  const a=await fixture();await press(a,'n');await press(a,'5');for(const note of ['c','d','e','f','g'])await press(a,note);
  assert.ok(a.svg.querySelector('[data-input-cursor]'));assert.equal(a.$('error').hidden,true,a.$('error').textContent);
  await a.click('undo');assert.equal(a.measureCount(),1);
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
  await a.staff(1);await press(a,'n');await press(a,'c');await press(a,'ArrowUp',{ctrlKey:true});
  const count=a.groups().size;await press(a,'a',{},a.$('title'));assert.equal(a.groups().size,count);
  const d=await a.apply();assert.equal(d.playback(0,'1','1').events.length,0);assert.equal(d.playback(0,'2','2').events[0].midi,60);assert.equal(d.context(0,0,'2').clef,'bass');a.dom.window.close();
});
test('clicking and dragging on the engraved bass staff edits that staff only',async()=>{
  const model=require('../sheet-music/score-editor-model.js'),a=await fixture(900,model.template('piano'));
  await a.tool('note');await a.length('quarter');await a.tap(a.pos(0,0,3,'2'));
  assert.equal(String(a.draft().lanes(a.selection().part).findIndex(l=>l.staff===a.lane().staff&&l.voice===a.lane().voice)),'1');
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
  await a.pick(0,1);await a.clef('bass');assert.equal(a.draft().context(0,0,'1',1).clef,'bass');
  await a.pick(0,3);await a.clef('treble');
  await a.pick(0,0);assert.equal(a.clefValue(),'treble');
  await a.pick(0,1);assert.equal(a.clefValue(),'bass');await press(a,'ArrowUp');
  const p=a.point(a.note(0,1));a.pointer('pointerdown',p);a.pointer('pointermove',{x:p.x,y:p.y-5});a.pointer('pointerup',{x:p.x,y:p.y-5});await a.editor.ready();
  // Select the first note/rest in a measure for a clef change.
  await a.measure(1);await a.clef('bass');
  await a.measure(2);await a.clef('treble');
  const d=await a.apply();
  assert.deepEqual(Array.from(d.playback(0,'1','1').events,e=>e.midi),[60,64,60,60]);
  assert.equal(d.context(0,0,'2').clef,'bass');assert.equal(d.playback(0,'2','2').events.length,0);
  assert.equal(d.context(0,1,'1',0).clef,'bass');assert.equal(d.context(0,2,'1',0).clef,'treble');
  a.editor.open(d.xml());await a.editor.ready();await a.pick(0,1);assert.equal(a.clefValue(),'bass');
  await a.pick(0,3);assert.equal(a.clefValue(),'treble');a.dom.window.close();
});
test('staff and voice switching survives stopping playback and edits only the chosen lane',async()=>{
  const {DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const d=require('../sheet-music/score-editor-model.js').create(undefined,DOMParser,XMLSerializer);
  d.place(0,0,0,{pitch:{step:'C',alter:0,octave:4}});
  d.place(0,0,0,{staff:'2',voice:'2',pitch:{step:'G',alter:0,octave:3}});
  d.settings(0,0,{clef:'bass',staff:'2'});
  const a=await fixture(900,d.xml());await a.pick(0,0);await a.staff(1);
  assert.equal(String(a.draft().lanes(a.selection().part).findIndex(l=>l.staff===a.lane().staff&&l.voice===a.lane().voice)),'1');assert.equal(a.clefValue(),'bass');
  await a.change('key','major:-2');await a.pick(0,2);await a.property('accidental',1);const result=await a.apply();
  assert.equal(result.context(0,0,'1').fifths,0);assert.equal(result.context(0,0,'2').fifths,-2);
  assert.equal(result.playback(0,'1','1').events[0].midi,60);
  assert.equal(result.playback(0,'2','2').events[0].midi,56);a.dom.window.close();
});
test('changing either piano clef keeps Staff 2 voice 2 selectable and correctly engraved',async t=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  for(let measure=0;measure<3;measure++)for(let beat=0;beat<4;beat++)for(const staff of ['1','2'])
    original.place(0,measure,beat,{staff,voice:staff,pitch:{step:'C',octave:staff==='1'?4:3,alter:0}});
  const a=await fixture(900,original.xml());t.after(()=>a.dom.window.close());
  function inkMatches(staff,measure,beat,clef){
    const group=original.inspect(0,measure).groups.find(g=>g.staff===staff&&g.beat===beat),head=a.note(measure,group.index);
    const bar=a.svg.querySelector(`[data-composer-measure="${measure}"][data-composer-staff="${staff}"]`);
    const expected=+bar.dataset.bottom-a.win.ComposerStaff.stepOf(group.notes[0],clef)*+bar.dataset.halfGap;
    assert.ok(Math.abs(+head.dataset.y-expected)<1,`Staff ${staff}, measure ${measure+1}, beat ${beat+1} must use ${clef}`);
  }
  await a.clef('bass');inkMatches('1',0,0,'bass');inkMatches('2',0,0,'bass');
  await a.staff(1);await a.clef('treble');
  assert.match(`Staff ${a.lane().staff} · voice ${a.lane().voice}`,/Staff 2 · voice 2/);
  assert.equal(a.clefValue(),'treble');inkMatches('1',0,0,'bass');inkMatches('2',0,0,'treble');
  await a.click('undo');inkMatches('2',0,0,'bass');await a.click('redo');inkMatches('2',0,0,'treble');
  await a.measure(1);await a.clef('bass');inkMatches('2',1,0,'bass');
  const selected=original.inspect(0,1).groups.find(g=>g.staff==='2'&&g.beat===2);
  await a.pick(1,selected.index);await a.clef('treble');
  inkMatches('2',1,1,'bass');inkMatches('2',1,2,'treble');inkMatches('1',1,2,'bass');
  await a.measure(2);await a.clef('bass');inkMatches('2',2,0,'bass');
  const saved=await a.apply();
  for(const staff of ['1','2'])assert.deepEqual(JSON.parse(JSON.stringify(saved.playback(0,staff,staff))),original.playback(0,staff,staff));
  a.editor.open(saved.xml());await a.editor.ready();await a.staff(1);
  assert.equal(a.clefValue(),'treble');inkMatches('2',0,0,'treble');inkMatches('2',1,2,'treble');inkMatches('2',2,0,'bass');
});
test('blank-space taps clear notes without selecting a measure or changing staff, including touch and zoom',async t=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom'),original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  original.place(0,0,0,{pitch:{step:'C',octave:4,alter:0}});
  const a=await fixture(900,original.xml());t.after(()=>a.dom.window.close());const before=a.draft().xml();
  for(const zoom of [.8,1.6]){
    await a.change('zoom',zoom);await a.pick(0,0);
    await a.tap(a.pos(1,2,10,'2'),{pointerType:'touch'});
    assert.equal(a.selection().measure,0);assert.equal(a.lane().staff,'1');
    assert.equal(a.$('delete-selected').disabled,true);assert.equal(a.svg.querySelector('[data-composer-note][aria-pressed="true"]'),null);
    assert.equal(a.svg.querySelector('[data-measure-selection]'),null);
    assert.equal(a.svg.querySelector('[aria-label^="Select measure"]'),null);
  }
  a.svg.querySelector('[data-composer-measure-area="2:1"]').dispatchEvent(new a.win.MouseEvent('click',{bubbles:true,detail:0}));await a.editor.ready();
  assert.equal(a.selection().measure,0);assert.equal(a.draft().xml(),before);
});
test('clicking Start and End measures plays the inclusive range on both staves without editing notes',async t=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom'),original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  for(let m=0;m<4;m++)original.place(0,m,m===1?1:0,{pitch:{step:'CDEFG'[m],octave:4,alter:0}});
  original.addTone(0,1,1,{step:'F',octave:4,alter:0});
  original.place(0,1,0,{staff:'2',voice:'2',pitch:{step:'C',octave:3,alter:0}});
  const a=await fixture(900,original.xml(),500,true);t.after(()=>a.dom.window.close());const before=a.draft().xml();
  const target=(m,staff='1')=>a.svg.querySelector(`[data-playback-measure="${m}"][aria-label$="staff ${staff}"]`);
  const center=n=>({x:+n.getAttribute('x')+Number(n.getAttribute('width'))/2,y:+n.getAttribute('y')+Number(n.getAttribute('height'))/2});
  const marker=boundary=>a.svg.querySelector(`[data-playback-boundary="${boundary}"]`)?.dataset.measure;
  const boundary=async(kind,m,staff='1')=>{await a.click('play-'+kind);await a.tap(center(target(m,staff)),{pointerType:'touch'});};
  assert.equal(a.$('play-from'),null);assert.equal(a.$('play-to'),null);assert.equal(a.$('play-range-status').textContent,'Whole sheet');
  await a.pick(0,0);await a.click('play');await a.click('play-start');assert.equal(a.preview.active,false);assert.equal(a.$('play-start').getAttribute('aria-pressed'),'true');
  await a.tap(center(target(1,'2')),{pointerType:'touch'});await a.click('play-end');await a.tap(a.point(a.note(2,0)));
  assert.equal(marker('start'),'1');assert.equal(marker('end'),'2');assert.equal(a.$('play').textContent,'▶ Play range');
  assert.equal(a.svg.querySelectorAll('[aria-pressed="true"][data-composer-note]').length,0);
  await a.click('play');assert.deepEqual(Array.from(a.preview.score.events,e=>[e.measure,e.midi,e.beat]),[[1,62,1],[1,65,1],[1,48,0],[2,64,4]]);assert.equal(a.preview.score.duration,8);
  await boundary('end',1);assert.equal(a.preview.active,false);await a.click('play');assert.equal(a.preview.score.duration,4);assert.ok(a.preview.score.events.every(e=>e.measure===1));await a.click('play');
  await a.pick(0,0);await a.click('play');assert.deepEqual(Array.from(a.preview.score.events,e=>e.midi),[60],'selected notes still play alone outside the range');await a.click('play');
  await boundary('start',3);assert.equal(marker('end'),'3','start beyond end moves the end forward');
  await a.click('play-end');await press(a,'Enter',{},target(2));assert.equal(marker('start'),'2','end before start moves the start back');
  await a.click('play-start');await press(a,'n',{},a.$('play-start'));assert.equal(a.draft().xml(),before,'typing while choosing a boundary cannot enter a note');
  await press(a,'Escape');assert.equal(a.svg.querySelector('[data-playback-measure]'),null);assert.equal(marker('start'),'2');
  await a.click('play-end');await a.click('play-end');assert.equal(a.$('play-end').getAttribute('aria-pressed'),'false');
  await a.change('zoom',1.6);await a.click('play-start');const p=center(target(6)),q={x:p.x+25,y:p.y};
  a.pointer('pointerdown',p);a.pointer('pointermove',q);a.pointer('pointerup',q);await a.editor.ready();assert.equal(marker('start'),'2','dragging does not commit a boundary');
  assert.equal(a.$('play-start').getAttribute('aria-pressed'),'true');await a.tool('note');assert.equal(a.$('play-start').getAttribute('aria-pressed'),'false');await a.tool('select');
  await a.click('play-all');assert.equal(a.svg.querySelector('[data-playback-boundary]'),null);await a.click('play');assert.equal(a.preview.score.events.length,6);await a.click('play');
  assert.equal(a.draft().xml(),before,'choosing boundaries preserves MusicXML and Undo');assert.equal(a.draft().canUndo,false);
  await boundary('start',7);await a.click('add-line');assert.equal(a.$('play-range-status').textContent,'Measures 8–Last');
  await boundary('end',11);await a.click('undo');assert.equal(marker('end'),'7','undoing the added row clamps its end boundary');
  a.editor.open(before);await a.editor.ready();assert.equal(a.$('play-range-status').textContent,'Whole sheet');assert.equal(a.svg.querySelector('[data-playback-boundary]'),null);
});
test('Eraser removes lower-staff clef changes by their visible symbol and Undo restores them',async t=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  for(let beat=0;beat<4;beat++)original.place(0,1,beat,{staff:'2',voice:'2',pitch:{step:'C',octave:3,alter:0}});
  original.changeClef(0,1,'2',0,'treble');original.changeClef(0,1,'2',2,'bass');
  const a=await fixture(900,original.xml());t.after(()=>a.dom.window.close());await a.tool('erase');
  const tapSymbol=async id=>{const el=a.svg.querySelector(`[data-composer-symbol="${id}"]`);assert.ok(el,id);await a.tap({x:+el.getAttribute('x')+Number(el.getAttribute('width'))/2,y:+el.getAttribute('y')+Number(el.getAttribute('height'))/2},{pointerType:'touch'});};
  await tapSymbol('clef:1:2:0');assert.equal(a.clefValue(),'bass');assert.equal(a.svg.querySelector('[data-composer-symbol="clef:1:2:0"]'),null);
  await a.click('undo');assert.ok(a.svg.querySelector('[data-composer-symbol="clef:1:2:0"]'));
  await tapSymbol('clef:1:2:2');assert.equal(a.svg.querySelector('[data-composer-symbol="clef:1:2:2"]'),null);
  await tapSymbol('clef:0:2:0');assert.match(a.$('error').textContent,/first clef is required/);
  assert.ok(a.svg.querySelector('[data-composer-symbol="clef:0:2:0"]'));
  const saved=await a.apply();assert.equal(saved.context(0,1,'2',3).clef,'treble');assert.equal(saved.context(0,1,'1',0).clef,'treble');
  assert.deepEqual(JSON.parse(JSON.stringify(saved.playback(0,'2','2'))),original.playback(0,'2','2'));
});
test('Eraser taps accidental signs without deleting notes and restores the preceding pitch spelling',async t=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  for(let beat=0;beat<3;beat++)original.place(0,0,beat,{staff:'2',voice:'2',pitch:{step:'C',octave:3,alter:beat===1?1:0}});
  const a=await fixture(900,original.xml());t.after(()=>a.dom.window.close());await a.tool('erase');
  const index=beat=>original.inspect().groups.find(g=>g.staff==='2'&&g.beat===beat).index;
  const tapSign=async beat=>{const sign=a.svg.querySelector(`[data-composer-symbol="accidental:0:${index(beat)}:0"]`);assert.ok(sign);await a.tap({x:+sign.getAttribute('x')+Number(sign.getAttribute('width'))/2,y:+sign.getAttribute('y')+Number(sign.getAttribute('height'))/2});};
  await tapSign(1);assert.ok(a.note(0,index(1)).getAttribute('aria-label').startsWith('C3'));assert.equal(a.svg.querySelectorAll('[data-composer-symbol^="accidental:"]').length,0);
  await a.click('undo');await tapSign(2);assert.ok(a.note(0,index(2)).getAttribute('aria-label').startsWith('C sharp3'));
  const saved=await a.apply();assert.deepEqual(Array.from(saved.playback(0,'2','2').events,e=>[e.midi,e.beat,e.duration]),[[48,0,1],[49,1,1],[49,2,1]]);
  assert.equal(saved.playback(0,'1','1').events.length,0);
});
test('in-key input stays key-aware across natural and altered notes and chord tones',async()=>{
  const a=await fixture();await a.change('key','major:1');await a.tool('note');await a.length('quarter');
  await a.tap(a.pos(0,0,-2));await a.tap(a.pos(0,1,1));await a.tap(a.pos(0,2,2));
  await a.tool('chord');await a.tap(a.pos(0,0,1));await a.tap(a.pos(0,0,2));
  const d=await a.apply();assert.deepEqual(Array.from(d.inspect().groups.slice(0,3),g=>Array.from(g.notes,n=>[n.step,n.alter])),[[['C',0],['F',1],['G',0]],[['F',1]],[['G',0]]]);a.dom.window.close();
});
test('adding a line reveals its row and keyboard note navigation returns to the first row',async()=>{
  const a=await fixture(350,undefined,120);await a.click('add-line');
  assert.ok(a.$('canvas-scroll').scrollTop>0);
  await press(a,'ArrowRight');assert.ok(a.$('canvas-scroll').scrollTop<=a.pos(0,0,8).y,'first staff is visible');a.dom.window.close();
});
test('Add line reveals a new grand-staff row, supports editing both staves, and survives apply/reopen',async()=>{
  const model=require('../sheet-music/score-editor-model.js'),a=await fixture(900,model.template('piano'),220);
  const rows=()=>new Set([...a.svg.querySelectorAll('[data-composer-row]')].map(n=>n.dataset.composerRow));
  assert.equal(rows().size,2);await a.click('add-line');
  assert.equal(String(a.selection().measure),'8');assert.equal(a.measureCount(),12);assert.equal(rows().size,3);
  assert.ok(a.$('canvas-scroll').scrollTop>0);
  await a.click('undo');assert.equal(a.measureCount(),8);assert.equal(rows().size,2);
  await a.click('redo');assert.equal(a.measureCount(),12);
  await a.tool('note');await a.length('quarter');await a.tap(a.pos(8,0,-2,'1'));await a.tap(a.pos(8,0,3,'2'));
  const d=await a.apply();
  assert.deepEqual(Array.from(d.playback(0,'1','1').events,e=>[e.midi,e.beat]),[[60,32]]);
  assert.deepEqual(Array.from(d.playback(0,'2','2').events,e=>[e.midi,e.beat]),[[48,32]]);
  a.editor.open(d.xml());await a.editor.ready();assert.equal(rows().size,3);
  assert.ok(a.note(8,0));assert.ok(a.note(8,2));a.dom.window.close();
});
test('half rests sit above the middle staff line',async()=>{
  const a=await fixture();await a.tool('rest');await a.length('half');await a.tap(a.pos(0,0,4));
  assert.ok(a.svg.querySelector('[data-engraved-note="0:0:0"] path'));assert.equal(a.svg.dataset.engraver,'osmd');
  await a.tool('select');await a.pick(0,0);assert.equal(a.$('selection-status').textContent,'Rest selected');
  assert.equal(a.$('delete-selected').disabled,false);assert.equal(a.$('clear-selection').disabled,false);
  await a.click('play');assert.equal(a.$('error').textContent,'Select a pitched note to play.');
  await a.click('clear-selection');assert.equal(a.$('play').textContent,'▶ Play');a.dom.window.close();
});
test('a natural sign cancels a previous accidental on the same pitch within a measure',async()=>{
  const a=await fixture();await a.tool('note');await a.length('quarter');await a.tap(a.pos(0,0,-2));await a.property('accidental','1');
  await a.tool('note');await a.tap(a.pos(0,1,-2));await a.property('accidental','0');await a.tap(a.pos(0,2,-2));
  assert.ok(a.svg.querySelector('.vf-modifiers path'),'engraved accidental is present');
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,e=>e.midi),[61,60,60]);a.dom.window.close();
});
test('a pending audio preview can be stopped and a failed start can be retried',async()=>{
  const a=await fixture();await a.length('quarter');await a.tap(a.pos(0,0,-2));let resolve,reject,starts=0;
  a.win.AudioContext=class{resume(){starts++;return new Promise((yes,no)=>{resolve=yes;reject=no;});}close(){return Promise.resolve();}};
  await a.click('play');assert.equal(a.$('play').textContent,'■ Stop');await a.click('play');resolve();
  for(let i=0;i<8;i++)await Promise.resolve();assert.equal(starts,1);assert.equal(a.$('play').textContent,'▶ Play selection');
  await a.click('play');reject(Error('Audio unavailable'));for(let i=0;i<8;i++)await Promise.resolve();
  assert.equal(a.$('error').textContent,'Audio unavailable');assert.equal(a.$('play').textContent,'▶ Play selection');
  await a.click('play');assert.equal(starts,3);await a.click('cancel');resolve();for(let i=0;i<8;i++)await Promise.resolve();
  assert.equal(a.$('dialog').open,false);assert.deepEqual(a.errors,[]);a.dom.window.close();
});
test('actual palette edits selected chord duration, dots and only the selected accidental',async()=>{
  const a=await fixture();await a.length('whole');await a.tap(a.pos(0,0,-2));await a.tool('chord');await a.tap(a.pos(0,0,0));await a.tool('select');await a.pick(0,0,0);
  await a.property('accidental','1');assert.match(a.note(0,0,0).getAttribute('aria-label'),/^C sharp4/);assert.match(a.note(0,0,1).getAttribute('aria-label'),/^E4/);
  await a.length('eighth');assert.ok(a.svg.querySelector('.vf-flag path'));
  await a.property('dots',1);await a.pick(0,0,1);await a.property('accidental','-1');
  await a.click('undo');assert.match(a.note(0,0,1).getAttribute('aria-label'),/^E4/);await a.click('redo');assert.match(a.note(0,0,1).getAttribute('aria-label'),/^E flat4/);
  const d=await a.apply(),g=d.inspect().groups[0];assert.equal(g.type,'eighth');assert.equal(g.duration,.75);assert.equal(g.dots,1);assert.deepEqual(Array.from(g.notes,n=>n.alter),[1,-1]);
  assert.deepEqual(Array.from(d.playback().events,n=>[n.midi,n.duration]),[[61,.75],[63,.75]]);a.dom.window.close();
});
test('note entry keeps the chosen accidental for continuous input and resets it on a new note tool session',async()=>{
  const a=await fixture(350);await a.tool('note');await a.length('quarter');await a.tap(a.pos(0,0,-2));await a.property('accidental','1');await a.tap(a.pos(0,1,0));
  assert.match(a.note(0,0).getAttribute('aria-label'),/^C sharp4/);assert.match(a.note(0,1).getAttribute('aria-label'),/^E sharp4/);
  await a.tool('note');await a.length('eighth');await a.tap(a.pos(0,2,2));await a.property('accidental','0');
  const d=await a.apply();assert.deepEqual(Array.from(d.inspect().groups.slice(0,3),g=>[g.type,g.duration]),[['quarter',1],['quarter',1],['eighth',.5]]);a.dom.window.close();
});
test('selected-note symbols replace sidebar properties, handle every accidental and restore the key signature',async t=>{
  const a=await fixture();t.after(()=>a.dom.window.close());
  const row=a.$('note-properties'),button=(kind,value)=>row.querySelector(`[data-${kind}="${value}"]`);
  assert.equal(row.hidden,true);
  assert.equal(row.previousElementSibling.querySelector('#vp-editor-palette'),a.$('palette'));
  assert.equal(a.$('input-dots'),null);assert.equal(a.$('accidental'),null);
  assert.equal(a.doc.querySelector('.editor-property-group,.editor-shortcuts'),null);
  await a.change('key','major:1');await a.length('quarter');await a.tap(a.pos(0,0,1));
  await a.tool('chord');await a.tap(a.pos(0,0,3));await a.tool('select');await a.pick(0,0,0);
  assert.equal(row.hidden,false);assert.equal(button('accidental',1).getAttribute('aria-pressed'),'true');
  for(const value of [0,-1,2,-2,1,'key']){
    await a.property('accidental',value);const notes=a.draft().inspect().groups[0].notes;
    assert.deepEqual(Array.from(notes,n=>[n.step,n.alter]),[['F',value==='key'?1:value],['A',0]]);
    assert.equal(button('accidental',value==='key'?1:value).getAttribute('aria-pressed'),'true');
  }
  for(const value of [1,2,0]){
    await a.property('dots',value);const group=a.draft().inspect().groups[0];
    assert.equal(group.dots,value);assert.equal(group.duration,2-2**(-value));
    assert.equal(button('dots',value).getAttribute('aria-pressed'),'true');
  }
  await a.click('undo');assert.equal(a.draft().inspect().groups[0].dots,2);await a.pick(0,0);
  assert.equal(button('dots',2).getAttribute('aria-pressed'),'true');
  await a.click('clear-selection');assert.equal(row.hidden,true);
  // A tap must not insert a new toolbar row while the pointer is still down.
  const p=a.point(a.note(0,0));a.pointer('pointerdown',p);assert.equal(row.hidden,true);
  a.pointer('pointerup',p);await a.editor.ready();assert.equal(row.hidden,false);
  assert.equal(a.draft().inspect().groups[0].notes[0].step,'F');
  const keyEvent=new a.win.KeyboardEvent('keydown',{key:' ',bubbles:true,cancelable:true});
  button('dots',1).dispatchEvent(keyEvent);assert.equal(keyEvent.defaultPrevented,false,'Space activates the focused property button');
});
test('one rectangle-selected tone exposes its properties; several notes hide them; rests allow dots only',async t=>{
  const a=await fixture();t.after(()=>a.dom.window.close());
  await a.length('quarter');await a.tap(a.pos(0,0,-2));await a.tool('chord');await a.tap(a.pos(0,0,0));await a.tool('select');await a.click('clear-selection');
  const e=a.point(a.note(0,0,1));a.pointer('pointerdown',{x:e.x-18,y:e.y-3});a.pointer('pointermove',{x:e.x+12,y:e.y+3});a.pointer('pointerup',{x:e.x+12,y:e.y+3});await a.editor.ready();
  assert.equal(a.$('selection-status').textContent,'1 note selected');await a.property('accidental',-1);
  assert.deepEqual(Array.from(a.draft().inspect().groups[0].notes,n=>n.alter),[0,-1]);
  await a.property('dots',1);assert.equal(a.draft().inspect().groups[0].duration,1.5);
  await a.pick(0,0,0,{ctrlKey:true});assert.equal(a.$('selection-status').textContent,'2 notes selected');assert.equal(a.$('note-properties').hidden,true);
  await a.click('clear-selection');await a.pick(0,1);
  assert.equal(a.$('selection-status').textContent,'Rest selected');assert.equal(a.$('note-properties').hidden,false);
  assert.ok([...a.$('accidentals').querySelectorAll('button')].every(b=>b.disabled));
  await a.length('eighth');await a.property('dots',2);assert.equal(a.draft().inspect().groups[1].duration,.875);
});
test('visible staff and scale controls affect later rows, selected notes, and saved MusicXML',async()=>{
  const a=await fixture(350);await a.length('quarter');await a.tap(a.pos(0,0,-2));
  await a.click('add-line');await a.measure(3);
  await a.clef('bass');await a.change('key','major:1');await a.tool('note');await a.length('quarter');await a.tap(a.pos(3,0,6));
  assert.match(a.note(3,0).getAttribute('aria-label'),/^F sharp3/);
  assert.ok(new Set([...a.svg.querySelectorAll('[data-composer-row]')].map(n=>n.dataset.composerRow)).size>1);
  assert.equal(a.$('clef'),null);assert.ok(a.doc.querySelector('[data-composer-tool="clef-bass"]'));assert.equal(a.$('key').closest('details'),null);
  await a.tool('select');await a.pick(3,0);await a.property('accidental',0);await a.length('eighth');
  const d=await a.apply();assert.equal(d.context(0,0).clef,'treble');assert.equal(d.context(0,3).clef,'bass');assert.equal(d.context(0,3).fifths,1);assert.equal(d.inspect(0,3).groups[0].duration,.5);assert.equal(d.inspect(0,3).groups[0].notes[0].alter,0);a.dom.window.close();
});
test('tap, range and drag selection erase just selected tones across rows with one undo',async()=>{
  const a=await fixture(350);await a.length('quarter');await a.tap(a.pos(0,0,-2));await a.tool('chord');await a.tap(a.pos(0,0,0));
  await a.click('add-line');await a.measure(1);await a.tool('note');await a.length('quarter');await a.tap(a.pos(1,0,2));await a.tap(a.pos(1,1,4));
  const before=a.groups();await a.click('clear-selection');await a.tool('select');await a.pick(0,0,0,{ctrlKey:true});await a.pick(1,1,0,{ctrlKey:true});
  assert.equal(a.$('selection-status').textContent,'2 notes selected');assert.equal(a.doc.querySelectorAll('[data-composer-note][aria-pressed="true"]').length,2);
  await a.click('delete-selected');assert.deepEqual(Array.from(a.draft().playback().events,n=>n.midi),[64,67]);await a.click('undo');assert.deepEqual(a.groups(),before);
  await a.pick(0,0);await a.pick(1,1,0,{shiftKey:true});assert.equal(a.$('selection-status').textContent,'4 notes selected');
  await press(a,'Delete');assert.equal(a.draft().playback().events.length,0);await a.click('undo');assert.deepEqual(a.groups(),before);
  await a.tool('select');await a.pick(0,0);await a.pick(1,1,0,{shiftKey:true});assert.equal(a.$('selection-status').textContent,'4 notes selected');await a.click('clear-selection');
  const p=a.point(a.note(0,0)),q=a.point(a.note(1,1));a.pointer('pointerdown',{x:p.x-20,y:p.y-30},{shiftKey:true});a.pointer('pointermove',{x:q.x+20,y:q.y+30});
  assert.ok(a.svg.querySelector('[data-composer-box]'));a.pointer('pointerup',{x:q.x+20,y:q.y+30});assert.ok(parseInt(a.$('selection-status').textContent)>=3);
  const count=a.$('selection-status').textContent;a.pointer('pointerdown',p,{ctrlKey:true});a.pointer('pointermove',q);a.pointer('pointercancel',q);assert.equal(a.$('selection-status').textContent,count);
  await a.click('delete-selected');await a.click('undo');assert.deepEqual(a.groups(),before);
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,n=>n.midi),[60,64,67,71]);a.dom.window.close();
});
test('Eraser replaces Select multiple and taps erase individual chord tones without shifting beats',async()=>{
  const a=await fixture();await press(a,'n');await press(a,'c');await press(a,'E',{shiftKey:true});await press(a,'g');
  assert.equal(a.doc.querySelector('[data-composer-tool="multi"]'),null);
  await a.tool('erase');await a.pick(0,0,1);
  assert.equal(a.note(0,0,1),null);assert.match(a.note(0,0).getAttribute('aria-label'),/^C4/);
  await a.click('undo');assert.match(a.note(0,0,1).getAttribute('aria-label'),/^E4/);
  await a.click('redo');await a.pick(0,0);
  assert.match(a.note(0,0).getAttribute('aria-label'),/^Rest/);
  await a.pick(0,0);await a.tap({x:5,y:5});
  // Tapping an existing rest or blank space is a no-op, including undo history.
  await a.click('undo');assert.match(a.note(0,0).getAttribute('aria-label'),/^C4/);
  await a.click('redo');assert.equal(a.svg.dataset.tool,'erase');
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,n=>[n.midi,n.beat]),[[67,1]]);
  assert.equal(d.inspect().groups[0].duration,1);a.dom.window.close();
});
test('an eraser rectangle previews notes across grand-staff rows and erases on release with one undo',async()=>{
  const model=require('../sheet-music/score-editor-model.js'),{DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const original=model.create(model.template('piano'),DOMParser,XMLSerializer);
  for(const measure of [0,4]){
    original.place(0,measure,0,{pitch:{step:'C',octave:4,alter:0}});
    original.addTone(0,measure,0,{step:'E',octave:4,alter:0});
    original.place(0,measure,2,{pitch:{step:'G',octave:4,alter:0}});
    original.place(0,measure,0,{staff:'2',voice:'2',pitch:{step:'C',octave:3,alter:0}});
  }
  const a=await fixture(900,original.xml()),sounding=()=>[...a.svg.querySelectorAll('[data-composer-note]')].filter(n=>!n.getAttribute('aria-label').startsWith('Rest'));
  const before=sounding().map(n=>n.getAttribute('aria-label'));
  const chosen=sounding().filter(n=>/beat 1$/.test(n.getAttribute('aria-label'))).map(a.point);
  const start={x:Math.min(...chosen.map(p=>p.x))-3,y:Math.min(...chosen.map(p=>p.y))-10},end={x:Math.max(...chosen.map(p=>p.x))+3,y:Math.max(...chosen.map(p=>p.y))+10};
  await a.tool('erase');a.pointer('pointerdown',start);a.pointer('pointermove',end);
  assert.equal(a.svg.querySelectorAll('[data-erase-note]').length,6);
  assert.equal(a.$('selection-status').textContent,'6 notes to erase');assert.equal(sounding().length,8,'dragging only previews deletion');
  a.pointer('pointerup',end);await a.editor.ready();
  assert.equal(a.svg.querySelector('[data-composer-box]'),null);assert.equal(sounding().length,2);
  await a.click('undo');assert.deepEqual(sounding().map(n=>n.getAttribute('aria-label')),before);
  await a.click('redo');assert.equal(sounding().length,2);
  const d=await a.apply();assert.deepEqual(Array.from(d.playback(0,'1','1').events,n=>[n.midi,n.beat]),[[67,2],[67,18]]);
  assert.equal(d.playback(0,'2','2').events.length,0);
  a.editor.open(d.xml());await a.editor.ready();assert.equal(sounding().length,2);a.dom.window.close();
});
test('a reverse eraser rectangle removes only the enclosed chord tone, including touch input at zoom',async()=>{
  const a=await fixture();await press(a,'n');await press(a,'c');await press(a,'E',{shiftKey:true});
  await a.change('zoom',1.6);await a.tool('erase');
  // Convert screen coordinates to the score coordinates used by the real SVG.
  a.svg.createSVGPoint=()=>({x:0,y:0,matrixTransform(){return {x:(this.x-30)/1.6,y:(this.y-50)/1.6};}});
  const p=a.point(a.note(0,0,1)),screen=p=>({x:p.x*1.6+30,y:p.y*1.6+50});
  const start=screen({x:p.x+8,y:p.y+3}),end=screen({x:p.x-8,y:p.y-3}),touch={pointerType:'touch'};
  a.pointer('pointerdown',start,touch);a.pointer('pointermove',end,touch);
  assert.equal(a.svg.querySelectorAll('[data-erase-note]').length,1);
  a.pointer('pointerup',end,touch);await a.editor.ready();
  assert.match(a.note(0,0).getAttribute('aria-label'),/^C4/);assert.equal(a.note(0,0,1),null);
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,n=>n.midi),[60]);a.dom.window.close();
});
test('eraser rectangles cancel safely, ignore other pointers and work outside staff bounds',async()=>{
  const a=await fixture();await press(a,'n');await press(a,'c');await press(a,'d');await a.tool('erase');
  const p=a.point(a.note(0,0)),end={x:899,y:499},start={x:1,y:1};
  for(const interruption of ['pointercancel','lostpointercapture','Escape']){
    a.pointer('pointerdown',start);a.pointer('pointermove',end);assert.equal(a.svg.querySelectorAll('[data-erase-note]').length,2);
    if(interruption==='Escape')await press(a,'Escape');else a.pointer(interruption,end);
    a.pointer('pointerup',end);await a.editor.ready();
    assert.equal(a.svg.querySelector('[data-composer-box]'),null);assert.match(a.note(0,0).getAttribute('aria-label'),/^C4/);await a.tool('erase');
  }
  a.pointer('pointerdown',start);a.pointer('pointerup',{x:20,y:20});await a.editor.ready();
  assert.match(a.note(0,0).getAttribute('aria-label'),/^C4/,'an empty rectangle leaves the notes unchanged');
  a.pointer('pointerdown',start);a.pointer('pointermove',end);await press(a,'z',{ctrlKey:true});
  a.pointer('pointerup',end);await a.editor.ready();assert.match(a.note(0,0).getAttribute('aria-label'),/^C4/,'Undo cancels the unfinished eraser gesture');
  await a.click('redo');assert.match(a.note(0,1).getAttribute('aria-label'),/^D4/);
  a.pointer('pointerdown',start);a.pointer('pointerdown',p,{pointerId:2});a.pointer('pointermove',p,{pointerId:2});a.pointer('pointerup',p,{pointerId:2});
  // A release at a new point also works when the browser coalesces move events.
  a.pointer('pointerup',end);await a.editor.ready();assert.match(a.note(0,0).getAttribute('aria-label'),/^Rest/);
  await a.click('undo');assert.match(a.note(0,0).getAttribute('aria-label'),/^C4/);
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,n=>n.midi),[60,62]);a.dom.window.close();
});
