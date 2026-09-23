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
  const player=win.SheetPlayer.mount();player.load(xml);
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
test('invalid tempo and canceled audio startup never schedule notes',async t=>{
  const a=fixture(t);a.$('tempo').value='500';a.$('play').click();await flush();
  assert.equal(a.audio.contexts,0);assert.match(a.$('play-status').textContent,/30 to 240/);
  let resume;a.audio.resume=()=>new Promise(resolve=>resume=resolve);a.$('tempo').value='120';
  a.$('play').click();assert.equal(a.$('play').textContent,'■ Stop');a.$('play').click();resume();await flush();
  assert.deepEqual(a.audio.starts,[]);assert.equal(a.$('play').textContent,'▶ Play sheet');
});
