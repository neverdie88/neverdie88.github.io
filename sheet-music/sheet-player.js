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
  function mount({onRangeChange=()=>{}}={}) {
    const $ = id => document.getElementById('vp-score-' + id);
    let model = null, lanes = [];
    function stopped() { $('play').textContent = '▶ Play sheet'; $('play-status').textContent = ''; }
    const player = ScorePlayback.create({
      onLoading(count, total) { $('play-status').textContent = total ? `Loading grand piano… ${Math.round(count / total * 100)}%` : 'Playing…'; },
      onStep(event) { $('play-status').textContent = `Measure ${event.measure + 1}`; },
      onStop: stopped
    });
    const refreshRange=()=>onRangeChange(playbackRange.snapshot());
    const rangeChanged=()=>{player.stop();refreshRange();};
    const playbackRange=ScorePlayback.mountRange({start:$('play-start'),end:$('play-end'),all:$('play-all'),status:$('play-range-status'),onChange:rangeChanged,onArm:rangeChanged});
    $('render').addEventListener('click',event=>{const target=event.target.closest('[data-playback-measure]');if(target)playbackRange.choose(Number(target.dataset.playbackMeasure));});
    $('render').addEventListener('keydown',event=>{
      if(!playbackRange.setting)return;
      if(event.key==='Escape'){event.preventDefault();playbackRange.cancel();return;}
      const target=event.target.closest('[data-playback-measure]');
      if(target&&['Enter',' '].includes(event.key)){event.preventDefault();playbackRange.choose(Number(target.dataset.playbackMeasure));$('play').focus();}
    });
    $('play-start').parentElement.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();playbackRange.cancel();}});
    $('play').addEventListener('click', async () => {
      if (player.active) { player.stop(); return; }
      if (!model) return;
      playbackRange.cancel(false);refreshRange();
      const bpm = Number($('tempo').value);
      if (!Number.isFinite(bpm) || bpm < 30 || bpm > 240) {
        $('play-status').textContent = 'Choose a tempo from 30 to 240 BPM.';
        return;
      }
      let score;
      try { score = sequence(model, lanes, $('listen').value,playbackRange.read()); }
      catch(error){$('play-status').textContent=error.message;return;}
      if (!score.events.length) { $('play-status').textContent = 'This selection contains no playable notes.'; return; }
      try {
        const starting = player.start(score, bpm);
        $('play').textContent = '■ Stop';
        $('play-status').textContent = 'Playing…';
        await starting;
      } catch (error) {
        stopped();
        $('play-status').textContent = error.message || 'Audio could not start. Please try again.';
      }
    });
    $('listen').addEventListener('change', () => player.stop());
    $('tempo').addEventListener('change', () => player.stop());
    document.addEventListener('visibilitychange', () => { if (document.hidden) player.stop(); });
    window.addEventListener('pagehide', () => player.close());
    return {
      stop: () => player.stop(),
      refreshRange,
      clear() { player.stop(); model = null; lanes = [];playbackRange.reset([]);refreshRange(); $('play').disabled = true; },
      load(xml) {
        const next = ScoreEditorModel.create(xml), nextLanes = tracks(next);
        player.stop(); model = next; lanes = nextLanes;
        playbackRange.reset(next.inspect().parts.reduce((longest,part)=>part.measures.length>longest.length?part.measures:longest,[]));
        $('listen').replaceChildren(...[{ label: 'All parts', value: 'all' }, ...lanes.map((lane, index) => ({ label: lane.label, value: String(index) }))].map(item => {
          const option = document.createElement('option'); option.value = item.value; option.textContent = item.label; return option;
        }));
        $('listen').value = 'all'; $('play').disabled = false;
        refreshRange();
      }
    };
  }
  return { tracks, sequence, mount };
});
