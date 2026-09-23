/* Short-lookahead sampled piano playback. Nothing is recorded or uploaded. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./piano-samples.js'):root.PianoSamples);if(typeof module==='object'&&module.exports)module.exports=api;else root.ScorePlayback=api;})(globalThis,function(samples){
  function create({makeContext=()=>new (globalThis.AudioContext||globalThis.webkitAudioContext)(),loadInstrument=(context,progress)=>samples.load(context,progress),onStep=()=>{},onStop=()=>{},onLoading=()=>{}}={}) {
    let context,instrument,nodes=new Set(),timer,run=0,active=false;
    function stop(){run++;active=false;clearTimeout(timer);for(const node of nodes){try{node.stop();}catch{}}nodes.clear();onStop();}
    function tone(midi,at,duration) {
      nodes.add(instrument.play(midi,at,duration,node=>nodes.delete(node)));
    }
    async function start(score,bpm=120) {
      stop();if(!Number.isFinite(bpm)||bpm<30||bpm>240)throw new Error('Choose a preview tempo from 30 to 240 BPM.');
      const token=run;active=true;
      try{
        context ||= makeContext();await context.resume();
        if(token!==run)return;
        const loaded=await loadInstrument(context,(count,total)=>{if(token===run)onLoading(count,total);});
        if(token!==run)return;
        instrument=loaded;onLoading(0,0);
      }
      catch(error){if(token!==run)return;stop();throw error;}
      if(token!==run)return;
      let index=0,highlight=-1;const seconds=60/bpm,start=context.currentTime+.05,events=[...score.events].sort((a,b)=>a.beat-b.beat);
      function tick(){
        if(token!==run)return;
        const now=context.currentTime;
        while(index<events.length&&start+events[index].beat*seconds<now+.12){const e=events[index++];tone(e.midi,Math.max(now,start+e.beat*seconds),Math.max(.04,e.duration*seconds));}
        let current=-1;for(let i=0;i<index;i++)if(start+events[i].beat*seconds<=now)current=i;
        if(current!==highlight){highlight=current;if(current>=0)onStep(events[current]);}
        if(now>=start+score.duration*seconds+.3){stop();return;}timer=setTimeout(tick,25);
      }
      tick();
    }
    return {start,stop,get active(){return active;},close(){stop();context?.close();context=null;instrument=null;}};
  }
  return {create};
});
