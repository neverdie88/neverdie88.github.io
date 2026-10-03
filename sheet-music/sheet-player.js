/* Playback of an applied sheet, independent of the editor's draft preview. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SheetPlayer = api;
})(globalThis, function () {
  function tracks(model) {
    return model.inspect().parts.flatMap((part, index) => model.lanes(index).map(lane => ({
      part: index, ...lane,
      label: `${part.name} · staff ${lane.staff} · voice ${lane.voice}`
    })));
  }
  function sequence(model, lanes, selected = 'all', range = null) {
    const chosen = selected === 'all' ? lanes : [lanes[Number(selected)]].filter(Boolean);
    const parts=model.inspect().parts;
    const scores = chosen.map(lane => {
      const count=parts[lane.part].measures.length;
      if(range&&range.start>=count)return {events:[],duration:0};
      return model.playback(lane.part,lane.staff,lane.voice,null,range?{...range,end:Math.min(range.end,count-1)}:null);
    });
    return {
      events: scores.flatMap(score => score.events).filter(event => Number.isFinite(event.midi) && event.duration > 0).sort((a, b) => a.beat - b.beat),
      duration: Math.max(0, ...scores.map(score => score.duration))
    };
  }
  function timeline(model) {
    const parts=model.inspect().parts.map((_,part)=>model.measureTimeline(part));
    let beat=0;
    return Array.from({length:Math.max(0,...parts.map(p=>p.length))},(_,measure)=>{
      const duration=Math.max(0,...parts.map(p=>p[measure]?.duration||0));
      const entry={measure,beat,duration};beat+=duration;return entry;
    });
  }
  function fromBeat(score,beat) {
    return {
      events:score.events.filter(e=>e.beat+e.duration>beat+1e-7).map(e=>({
        ...e,beat:Math.max(0,e.beat-beat),duration:e.beat+e.duration-Math.max(beat,e.beat)
      })),
      duration:Math.max(0,score.duration-beat)
    };
  }
  function mount({onRangeChange=()=>{},onPosition=()=>{},onLoad=()=>{}}={}) {
    const $ = id => document.getElementById('vp-score-' + id);
    let model = null, lanes = [], measures = [], labels = [], cursor = null, origin = 0;
    const absolute=position=>(measures[position?.measure]?.beat||0)+(position?.beat||0);
    function positionAt(beat) {
      const bar=measures.find(m=>beat<m.beat+m.duration-1e-7)||measures.at(-1);
      return bar?{measure:bar.measure,beat:Math.max(0,Math.min(bar.duration,beat-bar.beat))}:null;
    }
    function announce() {
      $('play-status').textContent=!cursor?'':cursor.beat>=measures[cursor.measure].duration-1e-7
        ?`End of measure ${labels[cursor.measure]}`:`Measure ${labels[cursor.measure]} · beat ${+(cursor.beat+1).toFixed(2)}`;
    }
    function paint(playing=false,follow=false) { onPosition(cursor?{...cursor,playing,follow}:null); }
    function stopped() { $('play').textContent = '▶ Play sheet'; announce();paint(); }
    const player = ScorePlayback.create({
      onLoading(count, total) { $('play-status').textContent = total ? `Loading grand piano… ${Math.round(count / total * 100)}%` : 'Playing…'; },
      onPosition(beat) {
        cursor=positionAt(origin+beat);paint(true,true);
        const text=cursor?`Measure ${labels[cursor.measure]}`:'';
        if($('play-status').textContent!==text)$('play-status').textContent=text;
      },
      onStop: stopped
    });
    const refreshRange=()=>onRangeChange(playbackRange.snapshot());
    const rangeChanged=()=>{player.stop();cursor=measures.length?{measure:playbackRange.snapshot().start,beat:0}:null;announce();paint();refreshRange();};
    const playbackRange=ScorePlayback.mountRange({start:$('play-start'),end:$('play-end'),all:$('play-all'),status:$('play-range-status'),onChange:rangeChanged,onArm:()=>{player.stop();refreshRange();}});
    function choose(event) {
      const boundary=event.target.closest('[data-playback-measure]');
      if(boundary&&playbackRange.setting){playbackRange.choose(Number(boundary.dataset.playbackMeasure));return true;}
      const target=event.target.closest('[data-playback-position]');
      if(!target||playbackRange.setting)return false;
      seek({measure:Number(target.dataset.measure),beat:Number(target.dataset.beat)});return true;
    }
    $('render').addEventListener('click',choose);
    $('render').addEventListener('keydown',event=>{
      if(event.key==='Escape'&&playbackRange.setting){event.preventDefault();playbackRange.cancel();return;}
      if(['Enter',' '].includes(event.key)&&choose(event)){event.preventDefault();$('play').focus();}
    });
    $('play-start').parentElement.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();playbackRange.cancel();}});
    async function play() {
      if (!model) return;
      playbackRange.cancel(false);refreshRange();
      const bpm = Number($('tempo').value);
      if (!Number.isFinite(bpm) || bpm < 30 || bpm > 240) {
        $('play-status').textContent = 'Choose a tempo from 30 to 240 BPM.';
        return;
      }
      let score;
      try {
        const range=playbackRange.read(),start=range?.start||0;
        score = sequence(model, lanes, $('listen').value,range);
        const rangeBeat=measures[start].beat;
        let offset=absolute(cursor)-rangeBeat;
        if(offset<0||offset>=score.duration-1e-7)offset=0;
        origin=rangeBeat+offset;cursor=positionAt(origin);paint();
        score=fromBeat(score,offset);
      }
      catch(error){$('play-status').textContent=error.message;return;}
      if (!score.duration) { $('play-status').textContent = 'This selection contains no playable notes.'; return; }
      try {
        const starting = player.start(score, bpm);
        $('play').textContent = '■ Stop';
        $('play-status').textContent = 'Playing…';
        await starting;
      } catch (error) {
        stopped();
        $('play-status').textContent = error.message || 'Audio could not start. Please try again.';
      }
    }
    function seek(position) {
      const bar=measures[position.measure],range=playbackRange.snapshot();
      if(!bar||!Number.isFinite(position.beat)||position.beat<0||position.beat>=bar.duration)return;
      if(position.measure<range.start||position.measure>range.end){$('play-status').textContent='Choose a position within the playback range.';return;}
      const resume=player.active;player.stop();
      cursor={measure:position.measure,beat:position.beat};announce();paint(false,true);
      if(resume)void play();
    }
    $('play').addEventListener('click',()=>{if(player.active)player.stop();else void play();});
    $('listen').addEventListener('change', () => player.stop());
    $('tempo').addEventListener('change', () => player.stop());
    document.addEventListener('visibilitychange', () => { if (document.hidden) player.stop(); });
    window.addEventListener('pagehide', () => player.close());
    return {
      stop: () => player.stop(),
      seek,
      refreshRange,
      clear() { player.stop(); model = null; lanes = [];measures=[];labels=[];cursor=null;onLoad([]);paint();announce();playbackRange.reset([]);refreshRange(); $('play').disabled = true; },
      load(xml) {
        const next = ScoreEditorModel.create(xml), nextLanes = tracks(next);
        player.stop(); model = next; lanes = nextLanes;
        measures=timeline(next);labels=next.inspect().parts.reduce((longest,part)=>part.measures.length>longest.length?part.measures:longest,[]);
        cursor=measures.length?{measure:0,beat:0}:null;onLoad(measures);paint();announce();
        playbackRange.reset(labels);
        $('listen').replaceChildren(...[{ label: 'All parts', value: 'all' }, ...lanes.map((lane, index) => ({ label: lane.label, value: String(index) }))].map(item => {
          const option = document.createElement('option'); option.value = item.value; option.textContent = item.label; return option;
        }));
        $('listen').value = 'all'; $('play').disabled = false;
        refreshRange();
      }
    };
  }
  return { tracks, sequence, timeline, fromBeat, mount };
});
