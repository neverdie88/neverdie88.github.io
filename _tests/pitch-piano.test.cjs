const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const Piano=require('../sheet-music/piano-samples.js');
const Playback=require('../sheet-music/score-playback.js');
function audio(){
  const nodes=[],gains=[];
  return {nodes,gains,currentTime:0,destination:{},decoded:0,
    resume:async()=>{},close(){},
    async decodeAudioData(){this.decoded++;return {duration:8};},
    createBufferSource(){const node={playbackRate:{value:1},connect(){},disconnect(){this.disconnected=true;},start(at){this.started=at;},stop(at){this.stopped=at??0;}};nodes.push(node);return node;},
    createGain(){const values=[];gains.push(values);return {connect(){},disconnect(){},gain:{setValueAtTime:(...v)=>values.push(v),linearRampToValueAtTime:(...v)=>values.push(v)}};}
  };
}
test('all thirty bundled piano samples match the licensed package manifest',()=>{
  const folder=`${__dirname}/../sheet-music/samples/piano`,manifest=JSON.parse(fs.readFileSync(`${folder}/manifest.json`));
  assert.equal(manifest.license,'CC BY 3.0');assert.equal(manifest.files.length,30);
  for(const file of manifest.files){const bytes=fs.readFileSync(`${folder}/${file.file}`);assert.equal(bytes.length,file.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),file.sha256);}
  assert.deepEqual(Piano.anchors.map(Piano.file).sort(),manifest.files.map(f=>f.file).sort());
});
test('piano lazily loads once, reuses buffers, and plays pitch-shifted samples with a release',async()=>{
  const urls=[],loader=Piano.createLoader({baseURL:'/piano/',fetchSample:async url=>{urls.push(url);return {ok:true,arrayBuffer:async()=>new ArrayBuffer(8)};}}),ctx=audio();
  assert.equal(urls.length,0);
  const [a,b]=await Promise.all([loader.load(ctx),loader.load(ctx)]);
  assert.equal(urls.length,30);assert.equal(ctx.decoded,30);assert.ok(urls.some(u=>u.includes('D%231v6.mp3')));
  const exact=a.play(60,2,1),shifted=b.play(61,2,1);
  assert.equal(exact.playbackRate.value,1);assert.ok(Math.abs(shifted.playbackRate.value-2**(1/12))<1e-10);
  assert.equal(exact.started,2);assert.equal(exact.stopped,3.26);assert.deepEqual(ctx.gains[0].at(-1),[0,3.25]);
  exact.onended();assert.equal(exact.disconnected,true);
  const second=audio();await loader.load(second);assert.equal(urls.length,30);assert.equal(second.decoded,30);
});
test('a failed piano download can be retried without downloading successful notes again',async()=>{
  let fails=true,calls=0;
  const loader=Piano.createLoader({fetchSample:async url=>{calls++;return {ok:!(fails&&url.endsWith('A0v6.mp3')),arrayBuffer:async()=>new ArrayBuffer(4)};}}),ctx=audio();
  await assert.rejects(loader.load(ctx),/press Play to retry/);fails=false;await loader.load(ctx);
  assert.equal(calls,31);assert.equal(ctx.decoded,30);
});
test('stopping during piano loading suppresses late notes and progress; a new run still plays',async()=>{
  const ctx=audio(),progress=[],loads=[];
  const player=Playback.create({makeContext:()=>ctx,onLoading:(...v)=>progress.push(v),loadInstrument:(context,report)=>new Promise(resolve=>loads.push({resolve,report}))});
  const score={events:[{beat:0,duration:1,midi:60}],duration:1};
  const first=player.start(score);await Promise.resolve();assert.equal(loads.length,1);player.stop();
  loads[0].report(1,30);loads[0].resolve({play(){assert.fail('Canceled playback sounded');}});await first;
  assert.equal(progress.length,0);assert.equal(player.active,false);
  let played=0,stopped=0;const second=player.start(score);await Promise.resolve();
  loads[1].resolve({play(){played++;return {stop(){stopped++;}};}});await second;
  assert.equal(played,1);player.close();assert.equal(stopped,1);
});
test('playback highlights simultaneous and held notes on the audio clock, then clears rests and stop',async()=>{
  const vm=require('node:vm'),ctx=audio(),changes=[],played=[];let tick,stops=0;
  const runtime={PianoSamples:{},setTimeout(fn){tick=fn;return 1;},clearTimeout(){tick=null;}};
  vm.runInNewContext(fs.readFileSync(`${__dirname}/../sheet-music/score-playback.js`,'utf8'),runtime);
  const player=runtime.ScorePlayback.create({makeContext:()=>ctx,
    loadInstrument:async()=>({play(midi){played.push(midi);return {stop(){}};}}),
    onNotes:events=>changes.push(Array.from(events,e=>e.midi)),onStop(){stops++;}});
  const score={events:[
    {beat:0,duration:2,midi:60},{beat:0,duration:1,midi:64},{beat:0,duration:1,midi:48},
    {beat:1,duration:.5,midi:50},{beat:3,duration:1,midi:67}
  ],duration:4};
  await player.start(score,60);
  assert.deepEqual(played,[60,64,48]);assert.deepEqual(changes,[],'lookahead does not highlight before the notes start');
  const at=(time,expected)=>{ctx.currentTime=time;tick();assert.deepEqual(changes.at(-1),expected);};
  at(.06,[60,64,48]);at(1.06,[60,50]);at(1.56,[60]);at(2.06,[]);
  at(3.06,[67]);at(4.06,[]);at(4.4,[]);assert.equal(player.active,false);
  assert.deepEqual(changes,[[60,64,48],[60,50],[60],[],[67],[]]);
  assert.deepEqual(played,[60,64,48,50,67]);assert.equal(tick,null);
  await player.start(score,60);ctx.currentTime+=.06;tick();const pending=tick,count=changes.length;
  player.stop();ctx.currentTime+=1;pending();assert.equal(changes.length,count,'a stopped run cannot restore highlights');
  assert.equal(player.active,false);assert.equal(stops,4);
});
