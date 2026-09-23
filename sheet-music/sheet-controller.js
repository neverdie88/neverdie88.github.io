/* Digital sheet display, local recognition, editing, downloads, and print. */
(function () {
  'use strict';
  const $ = id => document.getElementById('vp-' + id);
  const state = { photo: null, worker: null, revision: 0, score: null, xml: '', renderer: null, warnings: [] };
  function message(id, text) { $(id).textContent = text; $(id).hidden = !text; }
  function stopRecognition() {
    state.revision++;
    state.worker?.terminate(); state.worker = null;
    $('recognition-cancel').hidden = true;
    $('recognize').disabled = false;
  }
  function displayUI() {
    $('digital-panel').hidden = !state.score;
    $('score-empty').hidden = !!state.score || !!state.photo;
    $('recognition').hidden = !state.photo;
    $('practice').classList[state.score ? 'add' : 'remove']('vp-has-score');
  }
  function clearScore() {
    player.clear();
    state.renderer?.clear();
    state.renderer = state.score = null;
    state.xml = '';
    $('score-render').replaceChildren();
    displayUI();
  }
  async function loadScore(xml, warnings, revision) {
    const parsed = PitchScore.parse(xml);
    await ScoreEngraver.loadLibrary();
    if (revision !== state.revision) return;
    const candidate = document.createElement('div');
    const renderer = ScoreEngraver.create(candidate);
    try { await renderer.load(new DOMParser().parseFromString(xml,'application/xml')); }
    catch { renderer.clear(); throw new Error('This score could not be displayed. Try exporting it as uncompressed MusicXML from a notation editor.'); }
    if (revision !== state.revision) { renderer.clear(); return; }
    // Finish rendering before replacing the current score. Failed edits leave
    // the previous score and export available.
    const stage = document.createElement('div');
    stage.setAttribute('style', `position:fixed;left:-100000px;top:0;visibility:hidden;width:${$('score-render').clientWidth || document.getElementById('sheet-music').clientWidth || 900}px`);
    document.body.append(stage); stage.append(candidate);
    try { renderer.render(); }
    catch { renderer.clear(); stage.remove(); throw new Error('This score could not be rendered. Try another MusicXML file or a clearer photo.'); }
    clearScore();
    $('score-render').replaceChildren(candidate); stage.remove();
    state.renderer = renderer; state.score = parsed; state.xml = xml; state.warnings = [...warnings, ...parsed.warnings];
    $('score-title').textContent = parsed.title;
    message('score-warnings', state.warnings.join(' '));
    player.load(xml);
    displayUI();
    message('score-status', '');
    return true;
  }
  const player = SheetPlayer.mount();
  const editor = ScoreEditor.mount({
    async apply(xml) {
      stopRecognition();
      const applied = await loadScore(xml, [], state.revision);
      if (!applied) throw new Error('The sheet changed while applying. Open the editor again.');
      message('score-error', '');
    }
  });
  function openEditor(xml) {
    player.stop();
    stopRecognition(); message('score-status', '');
    try { editor.open(xml); }
    catch (error) { message('score-error', error.message); }
  }
  $('score-new').addEventListener('click', () => {
    const kind=$('score-template')?.value;
    openEditor(kind&&kind!=='treble'?ScoreEditorModel.template(kind):undefined);
  });
  $('score-edit').addEventListener('click', () => { if (state.xml) openEditor(state.xml); });
  async function convertPhoto() {
    if (!state.photo) return;
    stopRecognition();
    const revision = state.revision, photo = state.photo;
    $('recognize').disabled = true; $('recognition-cancel').hidden = false;
    message('score-error', ''); message('score-status', 'Preparing photo…');
    try {
      const bitmap = await createImageBitmap(photo.blob);
      if (revision !== state.revision) { bitmap.close(); return; }
      const canvas = document.createElement('canvas'); canvas.width = bitmap.width; canvas.height = bitmap.height;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(bitmap, 0, 0); bitmap.close();
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      const worker = new Worker('./omr-worker.js'); state.worker = worker;
      const fail = text => { if (revision !== state.revision) return; stopRecognition(); message('score-status', ''); message('score-error', text); };
      worker.onerror = () => fail('Recognition could not start in this browser. Try a current browser, or open a MusicXML score.');
      worker.onmessage = async ({ data }) => {
        if (revision !== state.revision) return;
        if (data.type === 'progress') message('score-status', data.text);
        if (data.type === 'staves') {
          const value = $('recognition-line').value;
          $('recognition-line').replaceChildren(...Array.from({ length: data.count + 1 }, (_, i) => {
            const option = document.createElement('option'); option.value = i ? String(i - 1) : 'all'; option.textContent = i ? `Staff line ${i}` : 'All lines, top to bottom'; return option;
          }));
          $('recognition-line').value = value;
        }
        if (data.type === 'error') fail(data.message);
        if (data.type === 'result') {
          worker.terminate(); state.worker = null;
          message('score-status', 'Drawing the recognized score…');
          try { await loadScore(data.xml, data.warnings, revision); }
          catch (error) { fail(error.message); }
          if (revision === state.revision) { $('recognize').disabled = false; $('recognition-cancel').hidden = true; }
        }
      };
      worker.postMessage({ image: pixels, title: photo.name.replace(/\.[^.]+$/, ''), line: $('recognition-line').value || 'all' }, [pixels.data.buffer]);
    } catch (error) {
      if (revision !== state.revision) return;
      stopRecognition(); message('score-status', '');
      message('score-error', error.message || 'This photo could not be prepared for recognition.');
    }
  }
  window.addEventListener('vp:photo', event => {
    stopRecognition(); state.photo = event.detail;
    $('recognition').hidden = !state.photo;
    message('score-error', ''); message('score-status', '');
    displayUI();
    if (state.photo) {
      $('recognition-line').replaceChildren(new Option('All lines, top to bottom', 'all'));
      convertPhoto();
    }
  });
  $('recognize').addEventListener('click', convertPhoto);
  $('recognition-cancel').addEventListener('click', () => { stopRecognition(); message('score-status', 'Conversion canceled. Your photo is still available.'); });
  $('score-open').addEventListener('click', () => $('score-file').click());
  $('score-file').addEventListener('change', async () => {
    const file = $('score-file').files?.[0]; $('score-file').value = '';
    if (!file) return;
    stopRecognition(); const revision = state.revision;
    message('score-error', ''); message('score-status', 'Opening score…');
    try {
      if (file.size > 10 * 1024 * 1024) throw new Error('Choose a MusicXML score smaller than 10 MB.');
      await loadScore(await file.text(), [], revision);
    } catch (error) { if (revision === state.revision) { message('score-status', ''); message('score-error', error.message); } }
  });
  $('score-sample').addEventListener('click', async () => {
    stopRecognition(); const revision = state.revision;
    message('score-error', ''); message('score-status', 'Opening sample sheet…');
    try {
      const response = await fetch('./samples/notes-and-chords.musicxml');
      if (!response.ok) throw new Error('The sample sheet could not load. Please try again.');
      await loadScore(await response.text(), [], revision);
    } catch (error) { if (revision === state.revision) { message('score-status', ''); message('score-error', error.message); } }
  });
  $('score-save').addEventListener('click', () => {
    if (!state.xml) return;
    const url = URL.createObjectURL(new Blob([state.xml], { type: 'application/vnd.recordare.musicxml+xml' }));
    const link = document.createElement('a'); link.href = url; link.download = (state.score.title.replace(/[^\p{L}\p{N} _.-]/gu, '').slice(0, 100) || 'sheet-music') + '.musicxml';
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  });
  $('score-print').addEventListener('click', () => window.print());
  $('score-remove').addEventListener('click', () => { stopRecognition(); clearScore(); message('score-status', ''); message('score-error', ''); });
  displayUI();
  window.addEventListener('pagehide', stopRecognition);
  let width = 0, resizeFrame;
  new ResizeObserver(entries => {
    const nextWidth = Math.round(entries[0].contentRect.width);
    if (!state.renderer || $('score-scroll').hidden || nextWidth === width || nextWidth < 1) return;
    width = nextWidth; cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => { if (state.renderer) { state.renderer.render(); state.renderer.cursor.hide(); } });
  }).observe($('score-render'));
})();
