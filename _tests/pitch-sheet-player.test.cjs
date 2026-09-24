const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const {DOMParser,XMLSerializer}=require('@xmldom/xmldom');
const Model=require('../sheet-music/score-editor-model.js');
const Player=require('../sheet-music/sheet-player.js');
const xml=`<score-partwise><part-list><score-part id="P1"><part-name>Melody</part-name></score-part><score-part id="P2"><part-name>Bass</part-name></score-part></part-list>
<part id="P1"><measure number="1"><attributes><divisions>1</divisions><time><beats>4</beats><beat-type>4</beat-type></time></attributes><note><pitch><step>C</step><octave>4</octave></pitch><duration>4</duration><tie type="start"/><type>whole</type></note></measure><measure number="2"><note><pitch><step>C</step><octave>4</octave></pitch><duration>2</duration><tie type="stop"/><type>half</type></note><note><rest/><duration>2</duration><type>half</type></note></measure></part>
<part id="P2"><measure number="1"><attributes><divisions>1</divisions><time><beats>4</beats><beat-type>4</beat-type></time></attributes><note><pitch><step>G</step><octave>3</octave></pitch><duration>4</duration><type>whole</type></note></measure><measure number="2"><note><pitch><step>A</step><octave>3</octave></pitch><duration>4</duration><type>whole</type></note></measure></part></score-partwise>`;
test('whole-sheet playback combines parts with simultaneous starts and preserves rests and ties',()=>{
  const model=Model.create(xml,DOMParser,XMLSerializer),tracks=Player.tracks(model);
  assert.equal(tracks.length,2);assert.match(tracks[1].label,/Bass/);
  const all=Player.sequence(model,tracks);
  assert.deepEqual(all.events.map(n=>[n.beat,n.midi,n.duration]),[[0,60,6],[0,55,4],[4,57,4]]);
  assert.equal(all.duration,8);
  assert.deepEqual(Player.sequence(model,tracks,'1').events.map(n=>n.midi),[55,57]);
});
test('inclusive measure ranges reattack incoming ties, cut outgoing ties and keep both parts aligned',()=>{
  const model=Model.create(xml,DOMParser,XMLSerializer),tracks=Player.tracks(model),before=model.xml();
  const first=Player.sequence(model,tracks,'all',{start:0,end:0});
  assert.deepEqual(first.events.map(n=>[n.measure,n.beat,n.midi,n.duration]),[[0,0,60,4],[0,0,55,4]]);assert.equal(first.duration,4);
  const second=Player.sequence(model,tracks,'all',{start:1,end:1});
  assert.deepEqual(second.events.map(n=>[n.measure,n.beat,n.midi,n.duration]),[[1,0,60,2],[1,0,57,4]]);assert.equal(second.duration,4);
  assert.deepEqual(Player.sequence(model,tracks,'1',{start:1,end:1}).events.map(n=>n.midi),[57]);
  assert.equal(model.xml(),before);assert.equal(model.canUndo,false);
  for(const range of [{start:-1,end:0},{start:1,end:0},{start:0,end:2},{start:.5,end:1}])assert.throws(()=>model.playback(0,null,null,null,range),/start and end measure/);
});
test('ranges preserve leading rests and changing meters after a pickup, including shorter parts',()=>{
  const quarter='<note><pitch><step>D</step><octave>4</octave></pitch><duration>1</duration><type>quarter</type></note>';
  const source=`<score-partwise><part-list><score-part id="P1"><part-name>Piano</part-name></score-part><score-part id="P2"><part-name>Shorter part</part-name></score-part></part-list><part id="P1"><measure number="0" implicit="yes"><attributes><divisions>1</divisions><time><beats>4</beats><beat-type>4</beat-type></time></attributes>${quarter}</measure><measure number="1"><attributes><time><beats>3</beats><beat-type>4</beat-type></time></attributes><note><rest/><duration>1</duration><type>quarter</type></note>${quarter}</measure><measure number="2"><attributes><time><beats>6</beats><beat-type>8</beat-type></time></attributes>${quarter}</measure></part><part id="P2"><measure number="0" implicit="yes">${quarter}</measure></part></score-partwise>`;
  const model=Model.create(source,DOMParser,XMLSerializer),tracks=Player.tracks(model);
  const middle=Player.sequence(model,tracks,'all',{start:1,end:2});
  assert.deepEqual(middle.events.map(e=>[e.measure,e.beat,e.duration]),[[1,1,1],[2,3,1]]);assert.equal(middle.duration,6);
  assert.deepEqual(Player.sequence(model,tracks,'1',{start:1,end:2}),{events:[],duration:0});
  const pickup=Player.sequence(model,tracks,'all',{start:0,end:0});assert.equal(pickup.duration,1);
});
const flush=async()=>{for(let i=0;i<10;i++)await Promise.resolve();};
function fixture(t){
  const dom=new JSDOM(fs.readFileSync(`${__dirname}/../sheet-music/index.html`,'utf8'),{runScripts:'outside-only'}),win=dom.window,doc=win.document;
  const audio={starts:[],stops:0,contexts:0,resume:async()=>{}};
  win.AudioContext=class{
    constructor(){audio.contexts++;this.currentTime=0;this.destination={};}
    resume(){return audio.resume();}close(){}
    createOscillator(){const node={frequency:{value:0},connect(){},disconnect(){},start(at){audio.starts.push([node.frequency.value,at]);},stop(){audio.stops++;}};return node;}
    createGain(){return {gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};}
  };
  win.PianoSamples={load:async()=>({play(midi,at){audio.starts.push([440*2**((midi-69)/12),at]);return {stop(){audio.stops++;}};}})};
  for(const file of ['score-editor-model.js','score-playback.js','sheet-player.js'])win.eval(fs.readFileSync(`${__dirname}/../sheet-music/${file}`,'utf8'));
  const player=win.SheetPlayer.mount({onRangeChange(range){
    const host=doc.getElementById('vp-score-render');host.replaceChildren();
    // UI fixture targets; the actual engraved positions are covered by the
    // engraving tests and the browser playback-range check.
    if(range.setting)for(let i=0;i<2;i++){const bar=doc.createElement('button');bar.dataset.playbackMeasure=String(i);host.append(bar);}
  }});player.load(xml);
  t.after(()=>{player.clear();dom.window.close();});
  const $=id=>doc.getElementById('vp-score-'+id);
  return {win,doc,player,audio,$};
}
test('sheet app plays both parts without microphone access and changing selection stops playback',async t=>{
  const a=fixture(t);assert.equal(a.doc.getElementById('vp-mic'),null);assert.equal(a.audio.contexts,0);
  a.$('play').click();await flush();
  assert.equal(a.$('play').textContent,'■ Stop');assert.equal(a.audio.starts.length,2);
  assert.ok(Math.abs(a.audio.starts[0][0]-261.625565)<.001);
  assert.ok(Math.abs(a.audio.starts[1][0]-195.997718)<.001);
  a.$('listen').value='1';a.$('listen').dispatchEvent(new a.win.Event('change'));
  assert.equal(a.$('play').textContent,'▶ Play sheet');assert.ok(a.audio.stops>=2);
  a.audio.starts=[];a.$('play').click();await flush();assert.equal(a.audio.starts.length,1);
  a.player.clear();assert.equal(a.$('play').disabled,true);
});
test('main-player boundary buttons accept score clicks and reset or cancel without changing audio selection',async t=>{
  const a=fixture(t),choose=(kind,m)=>{a.$('play-'+kind).click();a.$('render').querySelector(`[data-playback-measure="${m}"]`).click();};
  assert.equal(a.$('play-range-status').textContent,'Whole sheet');
  choose('start',1);choose('end',1);a.$('play').click();await flush();
  assert.equal(a.$('play').textContent,'■ Stop');assert.equal(a.audio.starts.length,2);
  assert.ok(Math.abs(a.audio.starts[1][0]-220)<.001,'measure 2 starts on A3, not the first-bar G3');
  choose('end',0);assert.equal(a.$('play-range-status').textContent,'Measures 1–1');assert.equal(a.$('play').textContent,'▶ Play sheet');
  a.audio.starts=[];a.$('play').click();await flush();assert.ok(Math.abs(a.audio.starts[1][0]-195.997718)<.001);
  a.$('play-start').click();a.$('render').dispatchEvent(new a.win.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(a.$('render').children.length,0);assert.equal(a.$('play-range-status').textContent,'Measures 1–1');
  a.$('play-end').click();a.$('render').querySelector('[data-playback-measure="1"]').dispatchEvent(new a.win.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.equal(a.$('play-range-status').textContent,'Measures 1–2');
  a.$('play-all').click();assert.equal(a.$('play-range-status').textContent,'Whole sheet');
  choose('start',1);a.player.load(xml);assert.equal(a.$('play-range-status').textContent,'Whole sheet');
  a.player.clear();assert.equal(a.$('play-start').disabled,true);assert.equal(a.$('play-end').disabled,true);
});
test('invalid tempo and canceled audio startup never schedule notes',async t=>{
  const a=fixture(t);a.$('tempo').value='500';a.$('play').click();await flush();
  assert.equal(a.audio.contexts,0);assert.match(a.$('play-status').textContent,/30 to 240/);
  let resume;a.audio.resume=()=>new Promise(resolve=>resume=resolve);a.$('tempo').value='120';
  a.$('play').click();assert.equal(a.$('play').textContent,'■ Stop');a.$('play').click();resume();await flush();
  assert.deepEqual(a.audio.starts,[]);assert.equal(a.$('play').textContent,'▶ Play sheet');
});
