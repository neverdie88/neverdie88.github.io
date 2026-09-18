const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const { DOMParser } = require('@xmldom/xmldom');
const source = fs.readFileSync(`${__dirname}/../pitch-visualizer/score-practice.js`,'utf8');
const html = fs.readFileSync(`${__dirname}/../pitch-visualizer/index.html`,'utf8');
const xml = title => `<score-partwise><work><work-title>${title}</work-title></work><part-list><score-part id="P"><part-name>Violin</part-name></score-part></part-list><part id="P"><measure number="1"><attributes><divisions>1</divisions></attributes><note><pitch><step>A</step><octave>4</octave></pitch><duration>1</duration></note><note><pitch><step>B</step><octave>4</octave></pitch><duration>1</duration></note></measure></part></score-partwise>`;
const flush = async () => { for(let i=0;i<12;i++) await Promise.resolve(); };
function fixture() {
  const events={}, docEvents={}, workers=[], elements={}, loads=[], published=[], editor={};
  const element = tag => ({tag,hidden:true,value:'',textContent:'',listeners:{},children:[],classList:{add(){},remove(){}},
    addEventListener(type,fn){this.listeners[type]=fn;},click(){return this.listeners.click?.();},
    replaceChildren(...children){this.children=children;if(this.tag==='select')this.value=String(children[0]?.value||'');},
    setAttribute(key,value){this[key]=value;},append(){},remove(){}});
  for(const [,tag,id] of html.matchAll(/<([a-z]+)[^>]*\bid="vp-([^"]+)"/g)) elements[id]=element(tag);
  elements.root=element('div');
  elements['recognition-line'].value='all';elements.mic.textContent='Start microphone';
  class Renderer {
    constructor(){this.cursor={Iterator:{EndReached:false,CurrentMeasureIndex:0,CurrentRelativeInMeasureTimestamp:{RealValue:0}},reset(){this.Iterator.CurrentRelativeInMeasureTimestamp.RealValue=0;},next(){this.Iterator.CurrentRelativeInMeasureTimestamp.RealValue+=.25;},show(){},hide(){}};}
    setLogLevel(){} async load(value){loads.push(value);} render(){if(editor.failRender)throw Error('render failed');} clear(){}
  }
  const score=require('../pitch-visualizer/music-score.js');
  const context=vm.createContext({
    document:{getElementById:id=>id==='violin-pitch'?elements.root:elements[id.slice(3)],addEventListener:(t,fn)=>{docEvents[t]=fn;},
      head:{append(script){queueMicrotask(()=>script.onload());}},body:{append(){}},
      createElement(tag){if(tag==='canvas')return {getContext:()=>({drawImage(){},getImageData:()=>({data:new Uint8Array(16),width:2,height:2})})};return element(tag);}},
    window:{addEventListener:(t,fn)=>{events[t]=fn;},dispatchEvent:event=>published.push(event)},
    CustomEvent:class{constructor(type,init){this.type=type;this.detail=init.detail;}},
    PracticeStaff:require('../pitch-visualizer/practice-staff.js'),
    fetch:async()=>({ok:true,text:async()=>fs.readFileSync(`${__dirname}/../pitch-visualizer/samples/notes-and-chords.musicxml`,'utf8')}),
    PitchScore:{...score,parse:value=>score.parse(value,DOMParser)},
    ScoreEditor:{mount(options){Object.assign(editor,options);return{open(xml){editor.opened=xml;editor.opens=(editor.opens||0)+1;}};}},
    opensheetmusicdisplay:{OpenSheetMusicDisplay:Renderer},
    Worker:class {constructor(){workers.push(this);}postMessage(data){this.sent=data;}terminate(){this.stopped=true;}},
    createImageBitmap:async()=>({width:2,height:2,close(){}}),
    Option:class{constructor(text,value){this.textContent=text;this.value=value;}},
    ResizeObserver:class{observe(){}},requestAnimationFrame:()=>1,cancelAnimationFrame(){},
    queueMicrotask,Blob,URL,setTimeout
  });
  vm.runInContext([...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)][0][1], context);
  vm.runInContext(source,context);
  return {elements,workers,loads,editor,published, get practice(){return published.filter(e=>e.type==='vp:practice').at(-1)?.detail;},
    async photo(){events['vp:photo']({detail:{blob:new Blob(),name:'Camera.jpg'}});await flush();},
    async open(title){elements['score-file'].files=[{size:200,text:async()=>xml(title)}];await elements['score-file'].listeners.change();},
    emit(type,detail){events[type]({detail});},
    async result(worker,title){await worker.onmessage({data:{type:'result',xml:xml(title),warnings:[]}});await flush();}
  };
}
test('canceled conversion and late worker responses cannot replace a newer score', async () => {
  const app=fixture();await app.photo();const old=app.workers[0];
  app.elements['recognition-cancel'].click();assert.equal(old.stopped,true);
  await app.open('My current score');assert.equal(app.elements['score-title'].textContent,'My current score');
  await app.result(old,'Canceled photo');assert.equal(app.elements['score-title'].textContent,'My current score');
  await app.photo();const newest=app.workers[1];await app.result(newest,'New photo');
  assert.equal(app.elements['score-title'].textContent,'New photo');assert.equal(app.elements['digital-panel'].hidden,false);
});
test('failed or canceled photo conversion preserves the current edited sheet and practice position',async()=>{
  const app=fixture();await app.open('My edited sheet');app.elements['follow-skip'].click();
  await app.photo();assert.equal(app.elements['digital-panel'].hidden,false);assert.equal(app.practice.index,1);
  app.workers[0].onmessage({data:{type:'error',message:'No staff found'}});
  assert.equal(app.elements['score-error'].textContent,'No staff found');app.elements['score-edit'].click();assert.match(app.editor.opened,/My edited sheet/);
  await app.photo();app.elements['recognition-cancel'].click();assert.equal(app.practice.index,1);
  await app.result(app.workers[1],'Canceled');assert.equal(app.elements['score-title'].textContent,'My edited sheet');
  await app.photo();app.editor.failRender=true;await app.result(app.workers[2],'Bad rendering');
  assert.equal(app.practice.index,1);assert.equal(app.elements['digital-panel'].hidden,false);
  app.editor.failRender=false;await app.photo();await app.result(app.workers[3],'Recognized');
  assert.equal(app.elements['score-title'].textContent,'Recognized');assert.equal(app.practice.index,0);
});
test('practice controls pause correctly, select a target, and advance only on live matching events', async () => {
  const app=fixture();await app.open('Practice');
  app.emit('vp:microphone',{active:true});app.elements['follow-toggle'].click();
  assert.equal(app.practice.sequence[app.practice.index].notes[0].name,'A4');
  for(let t=0;t<=250;t+=50)app.emit('vp:pitch',{pitch:{midi:69,cents:0},at:t});
  assert.equal(app.practice.sequence[app.practice.index].notes[0].name,'B4');
  app.elements['follow-toggle'].click();
  for(let t=300;t<=700;t+=50)app.emit('vp:pitch',{pitch:{midi:71,cents:0},at:t});
  assert.equal(app.practice.sequence[app.practice.index].notes[0].name,'B4');
  app.elements['follow-toggle'].click();
  for(let t=750;t<=1000;t+=50)app.emit('vp:pitch',{pitch:{midi:71,cents:0},at:t});
  assert.equal(app.practice.index,2);assert.match(app.elements['follow-feedback'].textContent,/2 notes matched/);
  app.elements['follow-restart'].click();assert.equal(app.practice.sequence[app.practice.index].notes[0].name,'A4');
});
test('canceling practice cancels only a microphone request started by practice', async () => {
  const app=fixture();await app.open('Practice');
  let clicks=0;app.elements.mic.listeners.click=()=>{clicks++;app.elements.mic.textContent=clicks===1?'Cancel microphone':'Start microphone';};
  app.elements['follow-toggle'].click();assert.equal(clicks,1);
  app.elements['follow-toggle'].click();assert.equal(clicks,2);
  app.elements.mic.textContent='Cancel microphone';
  app.elements['follow-toggle'].click();app.elements['follow-toggle'].click();assert.equal(clicks,2);
});

test('sample opens directly into practice and full-sheet visibility is restored after printing', async () => {
  const app=fixture();await app.elements['score-sample'].click();
  assert.equal(app.practice.sequence.length,11);
  assert.equal(app.elements['score-title'].textContent,'Single notes & chords');
  assert.equal(app.elements['score-scroll'].hidden,true);
  assert.equal(app.elements.mic.hidden,true);
  assert.equal(app.elements['readout-panel'].hidden,true);
  assert.equal(app.elements['play-mode'],undefined);
  app.emit('beforeprint');assert.equal(app.elements['score-scroll'].hidden,false);
  app.emit('afterprint');assert.equal(app.elements['score-scroll'].hidden,true);
  app.elements['score-view'].click();assert.equal(app.elements['score-scroll'].hidden,false);
  app.elements['score-remove'].click();assert.equal(app.practice,null);
  assert.equal(app.elements.mic.hidden,false);
});

test('chord audio batches advance atomically and stale or paused batches cannot match', async () => {
  const app=fixture();await app.elements['score-sample'].click();
  app.emit('vp:microphone',{active:true});app.elements['follow-toggle'].click();
  app.elements['follow-skip'].click();app.elements['follow-skip'].click();
  assert.equal(app.practice.index,2);
  const frames=Array.from({length:15},(_,i)=>({time:i*50,pitches:[72,76,74].map(midi=>({midi,cents:0}))}));
  app.emit('vp:chords',{index:1,frames});assert.equal(app.practice.index,2);
  app.emit('vp:chords',{index:2,frames});assert.equal(app.practice.index,3,'remaining old audio must not also match D5');
  app.elements['follow-toggle'].click();
  app.emit('vp:chords',{index:3,frames:frames.map(frame=>({...frame,time:frame.time+800}))});assert.equal(app.practice.index,3);
});

test('Free play restores live controls and preserves paused sheet progress without repeated trace resets', async () => {
  const app=fixture();
  assert.equal(app.elements.root['data-mode'],'free');
  assert.equal(app.elements['notation-controls'].hidden,false);
  assert.equal(app.elements['readout-panel'].hidden,false);
  assert.equal(app.elements['sheet-input'].hidden,true);
  await app.open('Kept score');app.emit('vp:microphone',{active:true});app.elements['follow-toggle'].click();
  app.elements['follow-skip'].click();assert.equal(app.practice.index,1);
  app.elements['mode-free'].click();assert.equal(app.practice,null);
  assert.equal(app.elements.mic.hidden,false);assert.equal(app.elements['digital-panel'].hidden,true);
  assert.equal(app.elements['notation-controls'].hidden,false);
  const count=app.published.length;
  app.emit('vp:microphone',{active:false});app.emit('vp:microphone',{active:true});
  for(let t=0;t<=500;t+=50)app.emit('vp:pitch',{pitch:{midi:71,cents:0},at:t});
  app.elements['mode-free'].click();assert.equal(app.published.length,count);
  app.elements['mode-sheet'].click();assert.equal(app.practice.index,1);assert.equal(app.practice.active,false);
  assert.equal(app.elements['notation-controls'].hidden,true);assert.equal(app.elements['readout-panel'].hidden,true);
  assert.equal(app.elements['score-title'].textContent,'Kept score');
});

test('editor opens an isolated draft, applies changed pitches, and retains the old score if rendering fails', async () => {
  const app=fixture();await app.open('Original');app.emit('vp:microphone',{active:true});app.elements['follow-toggle'].click();
  app.elements['follow-skip'].click();app.elements['score-edit'].click();
  assert.match(app.editor.opened,/Original/);assert.equal(app.practice.index,1);assert.equal(app.practice.active,false);
  assert.equal(app.elements['score-title'].textContent,'Original','opening/canceling does not replace the score');
  app.editor.failRender=true;await assert.rejects(app.editor.apply(xml('Failed edit')),/could not be rendered/);
  assert.equal(app.elements['score-title'].textContent,'Original');assert.equal(app.practice.index,1);
  app.editor.failRender=false;
  await app.editor.apply(xml('Edited').replace('<step>A</step>','<step>C</step>'));
  assert.equal(app.practice.index,0);assert.equal(app.practice.sequence[0].notes[0].midi,60);
  app.elements['score-edit'].click();assert.match(app.editor.opened,/Edited/);assert.match(app.editor.opened,/<step>C<\/step>/);
  app.elements['score-new'].click();assert.equal(app.editor.opened,undefined);
  assert.equal(app.elements['score-title'].textContent,'Edited','a new draft preserves the existing sheet until applied');
});

test('a score finishing loading in the background does not switch away from Free play', async () => {
  const app=fixture();const opening=app.open('Background score');app.elements['mode-free'].click();await opening;
  assert.equal(app.elements.root['data-mode'],'free');assert.equal(app.elements['digital-panel'].hidden,true);
  app.elements['mode-sheet'].click();assert.equal(app.elements['score-title'].textContent,'Background score');
  assert.equal(app.practice.index,0);
});
