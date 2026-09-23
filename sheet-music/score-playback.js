/* Short-lookahead Web Audio preview. Nothing is recorded or uploaded. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ScorePlayback=api;})(globalThis,function(){
  function create({makeContext=()=>new (globalThis.AudioContext||globalThis.webkitAudioContext)(),onStep=()=>{},onStop=()=>{}}={}) {
    let context,nodes=new Set(),timer,run=0,active=false;
    function stop(){run++;active=false;clearTimeout(timer);for(const node of nodes){try{node.stop();}catch{}}nodes.clear();onStop();}
    function tone(midi,at,duration) {
      const oscillator=context.createOscillator(),gain=context.createGain();oscillator.type='triangle';oscillator.frequency.value=440*2**((midi-69)/12);
      gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(.075,at+.008);gain.gain.exponentialRampToValueAtTime(.02,at+Math.max(.02,duration*.8));gain.gain.linearRampToValueAtTime(0,at+duration);
      oscillator.connect(gain);gain.connect(context.destination);nodes.add(oscillator);
      oscillator.onended=()=>{nodes.delete(oscillator);oscillator.disconnect();gain.disconnect();};oscillator.start(at);oscillator.stop(at+duration+.02);
    }
    async function start(score,bpm=120) {
      stop();if(!Number.isFinite(bpm)||bpm<30||bpm>240)throw new Error('Choose a preview tempo from 30 to 240 BPM.');
      const token=run;active=true;
      try{context ||= makeContext();await context.resume();}
      catch(error){if(token!==run)return;stop();throw error;}
      if(token!==run)return;
      let index=0,highlight=-1;const seconds=60/bpm,start=context.currentTime+.05,events=[...score.events].sort((a,b)=>a.beat-b.beat);
      function tick(){
        if(token!==run)return;
        const now=context.currentTime;
        while(index<events.length&&start+events[index].beat*seconds<now+.12){const e=events[index++];tone(e.midi,Math.max(now,start+e.beat*seconds),Math.max(.04,e.duration*seconds*.95));}
        let current=-1;for(let i=0;i<index;i++)if(start+events[i].beat*seconds<=now)current=i;
        if(current!==highlight){highlight=current;if(current>=0)onStep(events[current]);}
        if(now>=start+score.duration*seconds+.05){stop();return;}timer=setTimeout(tick,25);
      }
      tick();
    }
    return {start,stop,get active(){return active;},close(){stop();context?.close();context=null;}};
  }
  return {create};
});
