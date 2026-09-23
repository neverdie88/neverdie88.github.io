const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const html=fs.readFileSync(`${__dirname}/../sheet-music/index.html`,'utf8');
const shared = name => fs.readFileSync(`${__dirname}/../music-shared/${name}`, 'utf8');
function fixture(width=900,xml){
  const dom=new JSDOM(html,{runScripts:'outside-only',url:'http://localhost/sheet-music/'}),win=dom.window,doc=win.document;
  const $=id=>doc.getElementById('vp-editor-'+id),errors=[];let saved;
  win.addEventListener('error',e=>errors.push(e.error));
  win.eval(shared('pitch-core.js'));win.eval(shared('music-glyphs.js'));
  for(const file of ['music-score.js','score-editor-model.js','composer-staff.js','score-playback.js','composer-controller.js','score-editor.js'])win.eval(fs.readFileSync(`${__dirname}/../sheet-music/${file}`,'utf8'));
  $('dialog').showModal=function(){this.open=true;};$('dialog').close=function(){this.open=false;};
  Object.defineProperty($('canvas-scroll'),'clientWidth',{get:()=>width});Object.defineProperty($('canvas-scroll'),'clientHeight',{value:500});
  const svg=$('canvas');svg.setPointerCapture=()=>{};svg.getScreenCTM=()=>({inverse:()=>({})});svg.createSVGPoint=()=>({x:0,y:0,matrixTransform(){return{x:this.x,y:this.y};}});
  const editor=win.ScoreEditor.mount({apply:async xml=>{saved=xml;}});editor.open(xml);
  const tool=value=>doc.querySelector(`[data-composer-tool="${value}"]`).click();
  const length=value=>doc.querySelector(`[data-length="${value}"]`).click();
  const change=(id,value)=>{$(id).value=String(value);$(id).dispatchEvent(new win.Event('change',{bubbles:true}));};
  const note=(measure,index,tone=0)=>svg.querySelector(`[data-composer-note="${measure}:${index}:${tone}"]`);
  const point=n=>({x:Number(n.dataset.x),y:Number(n.dataset.y)});
  const pos=(measure,beat,step)=>{
    const bar=svg.querySelector(`[data-composer-measure="${measure}"]`),beats=bar.querySelectorAll('line[stroke="#d4dce7"]'),lines=bar.querySelectorAll('line[stroke="#475569"]');
    return {x:+beats[0].getAttribute('x1')+beat*(+beats[1].getAttribute('x1')-+beats[0].getAttribute('x1')),y:+lines[0].getAttribute('y1')-step*11};
  };
  const pointer=(type,p,mods={})=>{const e=new win.MouseEvent(type,{bubbles:true,button:0,clientX:p.x,clientY:p.y,...mods});Object.defineProperty(e,'pointerId',{value:1});svg.dispatchEvent(e);};
  const tap=(p,mods)=>{pointer('pointerdown',p,mods);pointer('pointerup',p,mods);};
  const pick=(m,i,t=0,mods)=>tap(point(note(m,i,t)),mods);
  const groups=()=>new Set([...svg.querySelectorAll('[data-composer-note]')].map(n=>n.dataset.composerNote.split(':').slice(0,2).join(':')));
  const apply=async()=>{$('apply').click();for(let i=0;i<8;i++)await Promise.resolve();assert.equal($('dialog').open,false,$('error').textContent);assert.deepEqual(errors,[]);return win.ScoreEditorModel.create(saved);};
  return {dom,win,doc,$,svg,editor,tool,length,change,note,point,pos,pointer,tap,pick,groups,apply,errors};
}
function press(app,key,mods={},target=app.svg){target.dispatchEvent(new app.win.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true,...mods}));}
test('keyboard note entry advances beats, appends a measure, and undoes it in one step',async()=>{
  const a=fixture();press(a,'n');press(a,'5');for(const note of ['c','d','e','f','g'])press(a,note);
  assert.ok(a.svg.querySelector('[data-input-cursor]'));assert.equal(a.$('error').hidden,true,a.$('error').textContent);
  a.$('undo').click();assert.equal(a.$('measure').options.length,1);
  a.$('redo').click();const d=await a.apply();
  assert.deepEqual(Array.from(d.playback().events,e=>[e.midi,e.beat]),[[60,0],[62,1],[64,2],[65,3],[67,4]]);a.dom.window.close();
});
test('keyboard duration, dots, rests, chord tones and Escape keep the current draft',async()=>{
  const a=fixture();press(a,'n');press(a,'4');press(a,'.');press(a,'c');press(a,'E',{shiftKey:true});press(a,'0');press(a,'.');press(a,'.');press(a,'5');press(a,'d');
  press(a,'Escape');assert.equal(a.$('dialog').open,true);assert.equal(a.svg.querySelector('[data-input-cursor]'),null);
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,e=>[e.midi,e.beat,e.duration]),[[60,0,.75],[64,0,.75],[62,1.5,1]]);a.dom.window.close();
});
test('piano template keyboard input edits the selected staff and ignores form typing',async()=>{
  const model=require('../sheet-music/score-editor-model.js'),a=fixture(900,model.template('piano'));
  a.change('lane',1);press(a,'n');press(a,'c');press(a,'ArrowUp',{ctrlKey:true});
  const count=a.groups().size;press(a,'a',{},a.$('title'));assert.equal(a.groups().size,count);
  const d=await a.apply();assert.equal(d.playback(0,'1','1').events.length,0);assert.equal(d.playback(0,'2','2').events[0].midi,60);assert.equal(d.context(0,0,'2').clef,'bass');a.dom.window.close();
});
test('staff and voice switching survives stopping playback and edits only the chosen lane',async()=>{
  const {DOMParser,XMLSerializer}=require('@xmldom/xmldom');
  const d=require('../sheet-music/score-editor-model.js').create(undefined,DOMParser,XMLSerializer);
  d.place(0,0,0,{pitch:{step:'C',alter:0,octave:4}});
  d.place(0,0,0,{staff:'2',voice:'2',pitch:{step:'G',alter:0,octave:3}});
  d.settings(0,0,{clef:'bass',staff:'2'});
  const a=fixture(900,d.xml());a.pick(0,0);a.change('lane',1);
  assert.equal(a.$('lane').value,'1');assert.equal(a.$('clef').value,'bass');
  a.change('key','major:-2');a.pick(0,2);a.change('accidental',1);const result=await a.apply();
  assert.equal(result.context(0,0,'1').fifths,0);assert.equal(result.context(0,0,'2').fifths,-2);
  assert.equal(result.playback(0,'1','1').events[0].midi,60);
  assert.equal(result.playback(0,'2','2').events[0].midi,56);a.dom.window.close();
});
test('in-key input stays key-aware across natural and altered notes and chord tones',async()=>{
  const a=fixture();a.change('key','major:1');a.tool('note');a.length('quarter');a.change('accidental','key');
  a.tap(a.pos(0,0,-2));a.tap(a.pos(0,1,1));a.tap(a.pos(0,2,2));
  a.tool('chord');a.tap(a.pos(0,0,1));a.tap(a.pos(0,0,2));
  const d=await a.apply();assert.deepEqual(Array.from(d.inspect().groups.slice(0,3),g=>Array.from(g.notes,n=>[n.step,n.alter])),[[['C',0],['F',1],['G',0]],[['F',1]],[['G',0]]]);a.dom.window.close();
});
test('adding a measure reveals its row and the composer can return to the first row',()=>{
  const a=fixture(350);for(let i=0;i<5;i++)a.$('add-measure').click();
  assert.ok(a.$('canvas-scroll').scrollTop>500);
  a.change('measure',0);assert.equal(a.$('canvas-scroll').scrollTop,0);a.dom.window.close();
});
test('half rests sit above the middle staff line',()=>{
  const a=fixture();a.tool('rest');a.length('half');a.tap(a.pos(0,0,4));
  const rect=a.note(0,0).querySelector('rect'),middle=a.pos(0,0,4).y;
  assert.equal(+rect.getAttribute('y')+ +rect.getAttribute('height'),middle);a.dom.window.close();
});
test('a natural sign cancels a previous accidental on the same pitch within a measure',async()=>{
  const a=fixture();a.tool('note');a.length('quarter');a.change('accidental','1');a.tap(a.pos(0,0,-2));
  a.tool('note');a.change('accidental','0');a.tap(a.pos(0,1,-2));a.tap(a.pos(0,2,-2));
  const natural=a.win.ViolinMusicGlyphs.accidentalNatural.path;
  assert.ok([...a.note(0,1).querySelectorAll('path')].some(p=>p.getAttribute('d')===natural));
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,e=>e.midi),[61,60,60]);a.dom.window.close();
});
test('a pending audio preview can be stopped and a failed start can be retried',async()=>{
  const a=fixture();a.length('quarter');a.tap(a.pos(0,0,-2));let resolve,reject,starts=0;
  a.win.AudioContext=class{resume(){starts++;return new Promise((yes,no)=>{resolve=yes;reject=no;});}close(){return Promise.resolve();}};
  a.$('play').click();assert.equal(a.$('play').textContent,'■ Stop preview');a.$('play').click();resolve();
  for(let i=0;i<8;i++)await Promise.resolve();assert.equal(starts,1);assert.equal(a.$('play').textContent,'▶ Play preview');
  a.$('play').click();reject(Error('Audio unavailable'));for(let i=0;i<8;i++)await Promise.resolve();
  assert.equal(a.$('error').textContent,'Audio unavailable');assert.equal(a.$('play').textContent,'▶ Play preview');
  a.$('play').click();assert.equal(starts,3);a.$('cancel').click();resolve();for(let i=0;i<8;i++)await Promise.resolve();
  assert.equal(a.$('dialog').open,false);assert.deepEqual(a.errors,[]);a.dom.window.close();
});
test('actual palette edits selected chord duration, dots and only the selected accidental',async()=>{
  const a=fixture();a.length('whole');a.tap(a.pos(0,0,-2));a.tool('chord');a.tap(a.pos(0,0,0));a.tool('select');a.pick(0,0,0);
  a.change('accidental','1');assert.match(a.note(0,0,0).getAttribute('aria-label'),/^C sharp4/);assert.match(a.note(0,0,1).getAttribute('aria-label'),/^E4/);
  a.length('eighth');assert.equal(a.svg.querySelector('[data-composer-stem="0:0"]').querySelectorAll('path').length,1);
  a.change('input-dots',1);a.pick(0,0,1);a.change('accidental','-1');
  a.$('undo').click();assert.match(a.note(0,0,1).getAttribute('aria-label'),/^E4/);a.$('redo').click();assert.match(a.note(0,0,1).getAttribute('aria-label'),/^E flat4/);
  const d=await a.apply(),g=d.inspect().groups[0];assert.equal(g.type,'eighth');assert.equal(g.duration,.75);assert.equal(g.dots,1);assert.deepEqual(Array.from(g.notes,n=>n.alter),[1,-1]);
  assert.deepEqual(Array.from(d.playback().events,n=>[n.midi,n.duration]),[[61,.75],[63,.75]]);a.dom.window.close();
});
test('new-note mode keeps its input settings while replacing a rest and allows continuous entry',async()=>{
  const a=fixture(350);a.tool('note');a.length('quarter');a.change('accidental','1');a.tap(a.pos(0,0,-2));a.tap(a.pos(0,1,0));
  assert.match(a.note(0,0).getAttribute('aria-label'),/^C sharp4/);assert.match(a.note(0,1).getAttribute('aria-label'),/^E sharp4/);
  a.tool('note');a.length('eighth');a.change('accidental','0');a.tap(a.pos(0,2,2));
  const d=await a.apply();assert.deepEqual(Array.from(d.inspect().groups.slice(0,3),g=>[g.type,g.duration]),[['quarter',1],['quarter',1],['eighth',.5]]);a.dom.window.close();
});
test('visible staff and scale controls affect later rows, selected notes, and saved MusicXML',async()=>{
  const a=fixture(350);a.length('quarter');a.tap(a.pos(0,0,-2));
  for(let m=1;m<4;m++)a.$('add-measure').click();
  a.change('clef','bass');a.change('key','major:1');a.tool('note');a.change('accidental','key');a.length('quarter');a.tap(a.pos(3,0,6));
  assert.match(a.note(3,0).getAttribute('aria-label'),/^F sharp3/);
  assert.equal(new Set([...a.svg.querySelectorAll('[data-composer-row]')].map(n=>n.dataset.composerRow)).size,4);
  assert.equal(a.$('clef').closest('details'),null);assert.equal(a.$('key').closest('details'),null);
  a.tool('select');a.pick(3,0);a.change('accidental',0);a.length('eighth');
  const d=await a.apply();assert.equal(d.context(0,0).clef,'treble');assert.equal(d.context(0,3).clef,'bass');assert.equal(d.context(0,3).fifths,1);assert.equal(d.inspect(0,3).groups[0].duration,.5);assert.equal(d.inspect(0,3).groups[0].notes[0].alter,0);a.dom.window.close();
});
test('tap, range and drag selection delete whole groups across rows with one undo',async()=>{
  const a=fixture(350);a.length('quarter');a.tap(a.pos(0,0,-2));a.tool('chord');a.tap(a.pos(0,0,0));
  a.$('add-measure').click();a.tool('note');a.length('quarter');a.tap(a.pos(1,0,2));a.tap(a.pos(1,1,4));
  const before=a.groups();a.$('clear-selection').click();a.tool('multi');a.pick(0,0);a.pick(1,1);
  assert.equal(a.$('selection-status').textContent,'2 groups selected');assert.equal(a.doc.querySelectorAll('[data-composer-note][aria-pressed="true"]').length,3);
  a.$('delete-selected').click();assert.equal(a.groups().size,before.size-2);a.$('undo').click();assert.deepEqual(a.groups(),before);
  a.pick(0,0);a.pick(1,1,0,{shiftKey:true});assert.equal(a.$('selection-status').textContent,'4 groups selected');
  a.svg.dispatchEvent(new a.win.KeyboardEvent('keydown',{key:'Delete',bubbles:true}));assert.equal(a.groups().size,before.size-4);a.$('undo').click();assert.deepEqual(a.groups(),before);
  a.tool('select');a.pick(0,0);a.pick(1,1,0,{shiftKey:true});assert.equal(a.$('selection-status').textContent,'4 groups selected');a.$('clear-selection').click();
  const p=a.point(a.note(0,0)),q=a.point(a.note(1,1));a.pointer('pointerdown',{x:p.x-20,y:p.y-30});a.pointer('pointermove',{x:q.x+20,y:q.y+30});
  assert.ok(a.svg.querySelector('[data-composer-box]'));a.pointer('pointerup',{x:q.x+20,y:q.y+30});assert.ok(parseInt(a.$('selection-status').textContent)>=3);
  const count=a.$('selection-status').textContent;a.pointer('pointerdown',p);a.pointer('pointermove',q);a.pointer('pointercancel',q);assert.equal(a.$('selection-status').textContent,count);
  a.$('delete-selected').click();a.$('undo').click();assert.deepEqual(a.groups(),before);
  const d=await a.apply();assert.deepEqual(Array.from(d.playback().events,n=>n.midi),[60,64,67,71]);a.dom.window.close();
});
