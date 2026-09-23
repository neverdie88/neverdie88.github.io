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
  function sequence(model, lanes, selected = 'all') {
    const chosen = selected === 'all' ? lanes : [lanes[Number(selected)]].filter(Boolean);
    const scores = chosen.map(lane => model.playback(lane.part, lane.staff, lane.voice));
    return {
      events: scores.flatMap(score => score.events).filter(event => Number.isFinite(event.midi) && event.duration > 0).sort((a, b) => a.beat - b.beat),
      duration: Math.max(0, ...scores.map(score => score.duration))
    };
  }
  function mount() {
    const $ = id => document.getElementById('vp-score-' + id);
    let model = null, lanes = [];
    function stopped() { $('play').textContent = '▶ Play sheet'; $('play-status').textContent = ''; }
    const player = ScorePlayback.create({
      onStep(event) { $('play-status').textContent = `Measure ${event.measure + 1}`; },
      onStop: stopped
    });
    $('play').addEventListener('click', async () => {
      if (player.active) { player.stop(); return; }
      if (!model) return;
      const bpm = Number($('tempo').value);
      if (!Number.isFinite(bpm) || bpm < 30 || bpm > 240) {
        $('play-status').textContent = 'Choose a tempo from 30 to 240 BPM.';
        return;
      }
      const score = sequence(model, lanes, $('listen').value);
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
      clear() { player.stop(); model = null; lanes = []; $('play').disabled = true; },
      load(xml) {
        const next = ScoreEditorModel.create(xml), nextLanes = tracks(next);
        player.stop(); model = next; lanes = nextLanes;
        $('listen').replaceChildren(...[{ label: 'All parts', value: 'all' }, ...lanes.map((lane, index) => ({ label: lane.label, value: String(index) }))].map(item => {
          const option = document.createElement('option'); option.value = item.value; option.textContent = item.label; return option;
        }));
        $('listen').value = 'all'; $('play').disabled = false;
      }
    };
  }
  return { tracks, sequence, mount };
});
