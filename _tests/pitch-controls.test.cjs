const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');
const source = fs.readFileSync(`${__dirname}/../sheet-music/sheet-controller.js`,'utf8');
const html = fs.readFileSync(`${__dirname}/../sheet-music/index.html`,'utf8');
const xml = title => `<score-partwise><work><work-title>${title}</work-title></work><part-list><score-part id="P"><part-name>Violin</part-name></score-part></part-list><part id="P"><measure number="1"><attributes><divisions>1</divisions></attributes><note><pitch><step>A</step><octave>4</octave></pitch><duration>1</duration></note><note><pitch><step>B</step><octave>4</octave></pitch><duration>1</duration></note></measure></part></score-partwise>`;
const flush = async () => { for(let i=0;i<12;i++) await Promise.resolve(); };
function fixture() {
  const events={}, docEvents={}, workers=[], elements={}, loads=[], published=[], editor={};
  const element = tag => ({tag,hidden:false,value:'',textContent:'',listeners:{},children:[],classList:{add(){},remove(){}},
    addEventListener(type,fn){this.listeners[type]=fn;},click(){return this.listeners.click?.();},
    replaceChildren(...children){this.children=children;if(this.tag==='select')this.value=String(children[0]?.value||'');},
    setAttribute(key,value){this[key]=value;},append(){},remove(){}});
  for(const [,tag,id] of html.matchAll(/<([a-z]+)[^>]*\bid="vp-([^"]+)"/g)) elements[id]=element(tag);
  elements.root=element('div');
  elements['recognition-line'].value='all';
  class Renderer {
    constructor(){this.Sheet={Instruments:[],SourceMeasures:[]};this.cursor={Iterator:{EndReached:false,CurrentMeasureIndex:0,CurrentRelativeInMeasureTimestamp:{RealValue:0}},reset(){this.Iterator.CurrentRelativeInMeasureTimestamp.RealValue=0;},next(){this.Iterator.CurrentRelativeInMeasureTimestamp.RealValue+=.25;},show(){},hide(){}};}
    setLogLevel(){} async load(value){loads.push(value);} render(){if(editor.failRender)throw Error('render failed');} clear(){}
  }
  const score=require('../sheet-music/music-score.js');
  const context=vm.createContext({
    document:{getElementById:id=>id==='sheet-music'?elements.root:elements[id.slice(3)],addEventListener:(t,fn)=>{docEvents[t]=fn;},
      head:{append(script){queueMicrotask(()=>script.onload());}},body:{append(){}},
      createElement(tag){if(tag==='canvas')return {getContext:()=>({drawImage(){},getImageData:()=>({data:new Uint8Array(16),width:2,height:2})})};return element(tag);}},
    window:{addEventListener:(t,fn)=>{events[t]=fn;},dispatchEvent:event=>published.push(event)},
    CustomEvent:class{constructor(type,init){this.type=type;this.detail=init.detail;}},
    SheetPlayer:{mount:()=>({load(){},stop(){},clear(){}})},
    fetch:async()=>({ok:true,text:async()=>fs.readFileSync(`${__dirname}/../sheet-music/samples/notes-and-chords.musicxml`,'utf8')}),
    PitchScore:{...score,parse:value=>score.parse(value,DOMParser)},
    ScoreEditor:{mount(options){Object.assign(editor,options);return{open(xml){editor.opened=xml;editor.opens=(editor.opens||0)+1;}};}},
    opensheetmusicdisplay:{OpenSheetMusicDisplay:Renderer},
    Worker:class {constructor(){workers.push(this);}postMessage(data){this.sent=data;}terminate(){this.stopped=true;}},
    createImageBitmap:async()=>({width:2,height:2,close(){}}),
    Option:class{constructor(text,value){this.textContent=text;this.value=value;}},
    ResizeObserver:class{observe(){}},requestAnimationFrame:()=>1,cancelAnimationFrame(){},
    queueMicrotask,Blob,URL,setTimeout,DOMParser,XMLSerializer
  });
  vm.runInContext(fs.readFileSync(`${__dirname}/../music-shared/pitch-core.js`, 'utf8'), context);
  vm.runInContext(fs.readFileSync(`${__dirname}/../sheet-music/score-editor-model.js`, 'utf8'), context);
  vm.runInContext(fs.readFileSync(`${__dirname}/../sheet-music/score-engraver.js`,'utf8'),context);
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
test('photo recognition defaults to the complete score and retains explicit layout choices',async()=>{
  const app=fixture();await app.photo();const worker=app.workers[0];
  assert.equal(worker.sent.line,'all');await worker.onmessage({data:{type:'staves',count:4}});
  assert.deepEqual(app.elements['recognition-line'].children.map(o=>o.value),['all','grand','sequential','0','1','2','3']);
  app.elements['recognition-line'].value='grand';await app.elements.recognize.click();
  const paired=app.workers[1];assert.equal(paired.sent.line,'grand');await paired.onmessage({data:{type:'staves',count:4}});
  assert.equal(app.elements['recognition-line'].value,'grand');
  await paired.onmessage({data:{type:'result',xml:xml('Complete score'),warnings:[],summary:'Recognized 4 staves in 2 grand-staff rows.'}});
  assert.equal(app.elements['score-status'].textContent,'Recognized 4 staves in 2 grand-staff rows.');
  await app.photo();assert.equal(app.workers[2].sent.line,'all','a new photo resets a previously selected subset');
});
test('failed or canceled photo conversion preserves the current edited sheet', async () => {
  const app = fixture(); await app.open('My edited sheet');
  await app.photo(); assert.equal(app.elements['digital-panel'].hidden, false);
  app.workers[0].onmessage({data:{type:'error',message:'No staff found'}});
  assert.equal(app.elements['score-error'].textContent, 'No staff found');
  app.elements['score-edit'].click(); assert.match(app.editor.opened, /My edited sheet/);
  await app.photo(); app.elements['recognition-cancel'].click();
  await app.result(app.workers[1], 'Canceled'); assert.equal(app.elements['score-title'].textContent, 'My edited sheet');
  await app.photo(); app.editor.failRender = true; await app.result(app.workers[2], 'Bad rendering');
  assert.equal(app.elements['score-title'].textContent, 'My edited sheet');
  app.editor.failRender = false; await app.photo(); await app.result(app.workers[3], 'Recognized');
  assert.equal(app.elements['score-title'].textContent, 'Recognized');
});

test('sample shows the complete sheet in its own app without microphone controls', async () => {
  const app = fixture(); await app.elements['score-sample'].click();
  assert.equal(app.elements['score-title'].textContent, 'Single notes & chords');
  assert.equal(app.elements['score-scroll'].hidden, false);
  assert.equal(app.elements.mic, undefined);
  assert.equal(app.elements['notation-controls'], undefined);
  assert.equal(app.elements['readout-panel'], undefined);
  assert.equal(app.elements['sheet-input'].hidden, false);
  assert.equal(app.elements['follow-toggle'], undefined);
  assert.equal(app.published.length, 0);
  app.elements['score-remove'].click(); assert.equal(app.elements['digital-panel'].hidden, true);
  assert.equal(app.elements.mic, undefined);
});

test('editor preserves the original on rendering failure and applies a replacement sheet', async () => {
  const app = fixture(); await app.open('Original'); app.elements['score-edit'].click();
  assert.match(app.editor.opened, /Original/);
  app.editor.failRender = true; await assert.rejects(app.editor.apply(xml('Failed edit')), /could not be rendered/);
  assert.equal(app.elements['score-title'].textContent, 'Original');
  app.editor.failRender = false; await app.editor.apply(xml('Edited').replace('<step>A</step>', '<step>C</step>'));
  assert.equal(app.elements['score-title'].textContent, 'Edited');
  app.elements['score-edit'].click(); assert.match(app.editor.opened, /Edited/); assert.match(app.editor.opened, /<step>C<\/step>/);
  app.elements['score-new'].click(); assert.equal(app.editor.opened, undefined);
  assert.equal(app.elements['score-title'].textContent, 'Edited');
});
