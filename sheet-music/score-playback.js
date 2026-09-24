/* Short-lookahead sampled piano playback. Nothing is recorded or uploaded. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./piano-samples.js'):root.PianoSamples);if(typeof module==='object'&&module.exports)module.exports=api;else root.ScorePlayback=api;})(globalThis,function(samples){
  function create({makeContext=()=>new (globalThis.AudioContext||globalThis.webkitAudioContext)(),loadInstrument=(context,progress)=>samples.load(context,progress),onStep=()=>{},onNotes=()=>{},onStop=()=>{},onLoading=()=>{}}={}) {
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
      let index=0,highlight=-1,sounding=[];const seconds=60/bpm,start=context.currentTime+.05,events=[...score.events].sort((a,b)=>a.beat-b.beat);
      function tick(){
        if(token!==run)return;
        const now=context.currentTime;
        while(index<events.length&&start+events[index].beat*seconds<now+.12){const e=events[index++];tone(e.midi,Math.max(now,start+e.beat*seconds),Math.max(.04,e.duration*seconds));}
        let current=-1;const notes=[];
        for(let i=0;i<index;i++)if(start+events[i].beat*seconds<=now){
          current=i;
          if(now<start+(events[i].beat+events[i].duration)*seconds)notes.push(events[i]);
        }
        // Scheduling looks ahead, but color every sounding note only during its
        // written duration, including chords, overlapping voices and both staves.
        if(notes.length!==sounding.length||notes.some((note,i)=>note!==sounding[i])){sounding=notes;onNotes(notes);}
        if(current!==highlight){highlight=current;if(current>=0)onStep(events[current]);}
        if(now>=start+score.duration*seconds+.3){stop();return;}timer=setTimeout(tick,25);
      }
      tick();
    }
    return {start,stop,get active(){return active;},close(){stop();context?.close();context=null;instrument=null;}};
  }
  function mountRange({start,end,all,status,onChange,onArm}){
    let labels=[],signature='',from=0,to=null,markedStart=false,setting=null;
    const snapshot=()=>({start:from,end:to??labels.length-1,markedStart,markedEnd:to!==null,custom:markedStart||to!==null,setting});
    function render(){
      start.disabled=end.disabled=all.disabled=!labels.length;
      start.setAttribute('aria-pressed',String(setting==='start'));end.setAttribute('aria-pressed',String(setting==='end'));
      status.textContent=!labels.length?'':setting?`Click a measure to set the ${setting}. Esc cancels.`:markedStart||to!==null?`Measures ${labels[from]}–${to===null?'Last':labels[to]}`:'Whole sheet';
    }
    function update(next,reset=false){
      const key=JSON.stringify(next);if(!reset&&key===signature)return;
      labels=next;signature=key;
      if(reset){from=0;to=null;markedStart=false;setting=null;}
      else{from=Math.max(0,Math.min(from,labels.length-1));if(to!==null)to=Math.max(from,Math.min(to,labels.length-1));}
      render();
    }
    function read(){
      const last=to??labels.length-1;
      if(!labels.length||from<0||last<from||last>=labels.length)throw new Error('Choose a valid start and end measure.');
      return from===0&&last===labels.length-1?null:{start:from,end:last};
    }
    function cancel(notify=true){if(!setting)return;setting=null;render();if(notify)onArm?.();}
    function choose(measure){
      if(!setting||!Number.isInteger(measure)||measure<0||measure>=labels.length)return false;
      if(setting==='start'){from=measure;markedStart=true;if(to!==null&&to<from)to=from;}
      else{to=measure;if(from>to){from=to;markedStart=true;}}
      setting=null;render();onChange();return true;
    }
    for(const [button,boundary]of [[start,'start'],[end,'end']])button.addEventListener('click',()=>{
      if(!labels.length)return;setting=setting===boundary?null:boundary;render();onArm?.();
    });
    all.addEventListener('click',()=>{from=0;to=null;markedStart=false;setting=null;render();onChange();});
    return {update,read,snapshot,choose,cancel,get setting(){return setting;},reset(next){update(next,true);}};
  }
  return {create,mountRange};
});
