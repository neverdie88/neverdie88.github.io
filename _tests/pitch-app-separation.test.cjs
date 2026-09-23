const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
for(const app of ['pitch-visualizer','sheet-music'])test(`${app} boots its complete actual controller stack with no media request`,()=>{
  const dir=path.join(__dirname,'..',app),html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
  const dom=new JSDOM(html,{url:`http://localhost/${app}/`,runScripts:'outside-only',pretendToBeVisual:true});
  const win=dom.window,doc=win.document,errors=[];let requests=0;
  win.addEventListener('error',event=>errors.push(event.message));
  Object.defineProperty(win.navigator,'mediaDevices',{value:{getUserMedia:async()=>{requests++;throw Error('Unexpected media request');}}});
  win.ResizeObserver=class{observe(){}disconnect(){}};
  win.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  win.HTMLDialogElement.prototype.close=function(){this.open=false;};
  for(const tag of doc.querySelectorAll('script[src]')){
    const file=path.resolve(dir,tag.getAttribute('src').split('?')[0]);
    win.eval(fs.readFileSync(file,'utf8'));
  }
  if(app==='pitch-visualizer'){
    assert.equal(doc.getElementById('vp-sheet-input'),null);assert.equal(doc.getElementById('vp-editor-dialog'),null);
    assert.equal(win.ScoreEditor,undefined);assert.equal(win.SheetPlayer,undefined);
    doc.getElementById('vp-staff').dispatchEvent(new win.MouseEvent('click'));
    assert.equal(doc.getElementById('vp-clef').value,'bass');
    assert.ok(doc.querySelector('#vp-staff .vp-staff-line'));
  }else{
    assert.equal(doc.getElementById('vp-mic'),null);assert.equal(doc.getElementById('vp-trail-toggle'),null);
    assert.equal(doc.getElementById('vp-score-empty').hidden,false);
    doc.getElementById('vp-score-new').click();
    assert.equal(doc.getElementById('vp-editor-dialog').open,true);
    assert.ok(doc.querySelector('[data-composer-measure="0"]'));
    doc.getElementById('vp-editor-cancel').click();
    assert.equal(doc.getElementById('vp-editor-dialog').open,false);
  }
  assert.equal(requests,0);assert.deepEqual(errors,[]);dom.window.close();
});
