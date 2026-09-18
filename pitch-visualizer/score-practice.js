/* Digital score display, local recognition, downloads, and live pitch practice. */
(function () {
  'use strict';
  const $ = id => document.getElementById('vp-' + id);
  const state = { mode: 'free', photo: null, worker: null, revision: 0, score: null, xml: '', renderer: null, follower: null, active: false, microphone: false, pendingStart: false, requestedMic: false, lane: null, bounds: null, warnings: [] };
  let rendererLibrary, publishedSheet = false;
  function message(id, text) { $(id).textContent = text; $(id).hidden = !text; }
  function stopRecognition() {
    state.revision++;
    state.worker?.terminate(); state.worker = null;
    $('recognition-cancel').hidden = true;
    $('recognize').disabled = false;
  }
  function pause() {
    const cancelMic = state.pendingStart && state.requestedMic;
    state.active = state.pendingStart = false;
    state.requestedMic = false;
    if (cancelMic && $('mic').textContent === 'Cancel microphone') $('mic').click();
    state.follower?.pause();
    $('follow-toggle').textContent = state.follower?.current().index ? 'Resume practice' : 'Start practice';
  }
  function modeUI() {
    const sheet = state.mode === 'sheet', loaded = sheet && !!state.score;
    document.getElementById('violin-pitch').setAttribute('data-mode', state.mode);
    $('mode-free').setAttribute('aria-pressed', String(!sheet));
    $('mode-sheet').setAttribute('aria-pressed', String(sheet));
    $('sheet-input').hidden = !sheet;
    $('notation-controls').hidden = sheet;
    $('mic').hidden = loaded;
    $('readout-panel').hidden = sheet;
    $('live-panel').hidden = sheet && !state.score;
    $('digital-panel').hidden = !loaded;
    $('recognition').hidden = !sheet || !state.photo;
    $('sheet-panel').hidden = !sheet || !state.photo;
    $('practice').classList[loaded ? 'add' : 'remove']('vp-has-score');
    $('staff-label').textContent = loaded ? 'Practice with sheet' : 'Live pitch';
  }
  function setMode(mode) {
    if (mode !== state.mode) pause();
    state.mode = mode;
    modeUI();
    if (state.follower) displayProgress(); else publishPractice(null);
  }
  function clearScore() {
    pause();
    state.renderer?.clear();
    state.renderer = state.score = state.follower = null;
    state.xml = ''; state.lane = null;
    publishPractice(null);
    $('score-render').replaceChildren();
    modeUI();
  }
  function loadRendererLibrary() {
    if (!rendererLibrary) rendererLibrary = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = './lib/opensheetmusicdisplay.min.js';
      script.onload = resolve;
      script.onerror = () => { script.remove(); rendererLibrary = null; reject(new Error('The score display could not load. Check your connection and try again.')); };
      document.head.append(script);
    });
    return rendererLibrary;
  }
  function publishPractice(result, reset = false) {
    const detail = state.mode === 'sheet' && result && state.lane ? {
      sequence: state.lane.events, index: result.index, matchedPitches: result.matchedPitches,
      clef: state.lane.clef, fifths: state.lane.fifths, bounds: state.bounds, active: state.active, reset
    } : null;
    // A null snapshot resets live notation. Send it only when leaving a sheet,
    // so microphone and visibility updates cannot erase a free-play trace.
    if (!detail && !publishedSheet) return;
    publishedSheet = !!detail;
    window.dispatchEvent(new CustomEvent('vp:practice', { detail }));
  }
  function displayProgress(result = state.follower?.current(), reset = false) {
    if (!result) return;
    $('follow-progress').textContent = `${result.index} / ${result.total}${result.skipped ? ` · ${result.skipped} skipped` : ''}`;
    $('follow-skip').disabled = result.complete;
    const messages = {
      waiting: 'Play the note or chord in the middle.', release: 'Release, then play this note again.',
      sharp: 'A little sharp — lower the pitch.', flat: 'A little flat — raise the pitch.',
      wrong: 'Match a note in the middle.', holding: 'In tune — hold briefly…',
      'note-matched': 'Play the remaining notes in this chord.', advanced: 'Play the next note or chord.',
      complete: `Finished: ${result.notesMatched} notes matched${result.skipped ? `, ${result.skipped} groups skipped` : ''}.`
    };
    const text = result.complete ? messages.complete : state.active ? messages[result.feedback] || messages.waiting : 'Start practice and match the note or chord in the middle.';
    if ($('follow-feedback').textContent !== text) $('follow-feedback').textContent = text;
    if (result.complete) { pause(); $('follow-toggle').textContent = 'Play again'; }
    publishPractice(result, reset);
  }
  function selectPart() {
    pause();
    state.lane = state.score.lanes[Number($('score-part').value) || 0];
    state.follower = PitchScore.createFollower(state.lane.events);
    state.bounds = {};
    for (const clef of ['treble', 'bass']) {
      let top = 12, bottom = -5;
      for (const event of state.lane.events) for (const note of event.notes) {
        const step = PracticeStaff.writtenStep(note, clef, ViolinPitch);
        top = Math.max(top, step); bottom = Math.min(bottom, step);
      }
      state.bounds[clef] = { top, bottom };
    }
    displayProgress(undefined, true);
  }
  function showFullScore(show) {
    $('score-scroll').hidden = !show;
    $('score-view').textContent = show ? 'Hide full sheet' : 'View full sheet';
    $('score-view').setAttribute('aria-expanded', String(show));
    if (show && state.renderer) { state.renderer.render(); state.renderer.cursor.hide(); }
  }
  async function loadScore(xml, warnings, revision) {
    const parsed = PitchScore.parse(xml);
    await loadRendererLibrary();
    if (revision !== state.revision) return;
    const candidate = document.createElement('div');
    const renderer = new opensheetmusicdisplay.OpenSheetMusicDisplay(candidate, {
      backend: 'svg', autoResize: false, drawingParameters: 'compacttight', drawTitle: false,
      drawComposer: false, drawPartNames: false, drawPartAbbreviations: false,
      followCursor: false, cursorsOptions: [{ type: 0, color: '#43b581', alpha: .35, follow: false }]
    });
    renderer.setLogLevel('error');
    try { await renderer.load(xml); }
    catch { renderer.clear(); throw new Error('This score could not be displayed. Try exporting it as uncompressed MusicXML from a notation editor.'); }
    if (revision !== state.revision) { renderer.clear(); return; }
    // Finish rendering before replacing the current score. Failed edits leave
    // the previous score, export and practice position available.
    const stage = document.createElement('div');
    stage.setAttribute('style', `position:fixed;left:-100000px;top:0;visibility:hidden;width:${$('score-render').clientWidth || document.getElementById('violin-pitch').clientWidth || 900}px`);
    document.body.append(stage); stage.append(candidate);
    try { renderer.render(); }
    catch { renderer.clear(); stage.remove(); throw new Error('This score could not be rendered. Try another MusicXML file or a clearer photo.'); }
    clearScore();
    $('score-render').replaceChildren(candidate); stage.remove();
    state.renderer = renderer; state.score = parsed; state.xml = xml; state.warnings = [...warnings, ...parsed.warnings];
    $('score-title').textContent = parsed.title;
    $('score-part').replaceChildren(...parsed.lanes.map((lane, i) => {
      const option = document.createElement('option'); option.value = i; option.textContent = lane.name; return option;
    }));
    message('score-warnings', state.warnings.join(' '));
    showFullScore(false); modeUI(); selectPart();
    message('score-status', '');
    return true;
  }
  const editor = ScoreEditor.mount({
    async apply(xml) {
      stopRecognition();
      const applied = await loadScore(xml, [], state.revision);
      if (!applied) throw new Error('The sheet changed while applying. Open the editor again.');
      setMode('sheet');
      message('score-error', '');
    }
  });
  function openEditor(xml) {
    stopRecognition(); pause(); displayProgress(); message('score-status', '');
    try { editor.open(xml); }
    catch (error) { message('score-error', error.message); }
  }
  $('score-new').addEventListener('click', () => openEditor());
  $('score-edit').addEventListener('click', () => { if (state.xml) openEditor(state.xml); });
  async function convertPhoto() {
    if (!state.photo) return;
    stopRecognition(); pause(); displayProgress();
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
    if (state.photo) {
      setMode('sheet');
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
    setMode('sheet');
    stopRecognition(); pause(); const revision = state.revision;
    message('score-error', ''); message('score-status', 'Opening score…');
    try {
      if (file.size > 10 * 1024 * 1024) throw new Error('Choose a MusicXML score smaller than 10 MB.');
      await loadScore(await file.text(), [], revision);
    } catch (error) { if (revision === state.revision) { message('score-status', ''); message('score-error', error.message); } }
  });
  $('score-sample').addEventListener('click', async () => {
    setMode('sheet');
    stopRecognition(); pause(); const revision = state.revision;
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
  $('score-view').addEventListener('click', () => showFullScore($('score-scroll').hidden));
  let restorePreview = false;
  window.addEventListener('beforeprint', () => { restorePreview = $('score-scroll').hidden; showFullScore(true); });
  window.addEventListener('afterprint', () => { if (restorePreview) showFullScore(false); });
  $('score-print').addEventListener('click', () => window.print());
  $('score-remove').addEventListener('click', () => { stopRecognition(); clearScore(); message('score-status', ''); message('score-error', ''); });
  $('score-part').addEventListener('change', selectPart);
  $('follow-toggle').addEventListener('click', () => {
    if (!state.follower || state.mode !== 'sheet') return;
    if (state.active || state.pendingStart) { pause(); displayProgress(); return; }
    if (state.follower.current().complete) { state.follower.reset(); displayProgress(undefined, true); }
    if (!state.microphone) {
      state.pendingStart = true;
      $('follow-toggle').textContent = 'Cancel practice';
      $('follow-feedback').textContent = 'Waiting for microphone permission…';
      if ($('mic').textContent !== 'Cancel microphone') { state.requestedMic = true; $('mic').click(); }
    } else { state.active = true; $('follow-toggle').textContent = 'Pause practice'; displayProgress(); }
  });
  $('follow-restart').addEventListener('click', () => { pause(); state.follower?.reset(); displayProgress(undefined, true); });
  $('follow-skip').addEventListener('click', () => displayProgress(state.follower?.skip()));
  window.addEventListener('vp:microphone', ({ detail }) => {
    state.microphone = detail.active;
    if (!detail.active) { pause(); displayProgress(); }
    else if (state.pendingStart) { state.pendingStart = state.requestedMic = false; state.active = true; $('follow-toggle').textContent = 'Pause practice'; displayProgress(); }
  });
  window.addEventListener('vp:pitch', ({ detail }) => {
    if (state.active && state.follower) displayProgress(state.follower.update(detail.pitch, detail.at));
  });
  window.addEventListener('vp:chords', ({ detail }) => {
    if (!state.active || !state.follower) return;
    const index = state.follower.current().index;
    if (detail.index !== index) return;
    let result;
    for (const frame of detail.frames) {
      result = state.follower.update(frame.pitches, frame.time);
      // This audio was captured for the old target. Never spend the remainder
      // of a delayed inference batch on a newly displayed target.
      if (result.index !== index) break;
    }
    if (result) displayProgress(result);
  });
  window.addEventListener('vp:chord-status', ({ detail }) => {
    message('chord-status', detail.state === 'loading' ? 'Preparing chord listening…' : detail.state === 'error' ? detail.message : '');
    $('chord-retry').hidden = detail.state !== 'error';
  });
  $('chord-retry').addEventListener('click', () => window.dispatchEvent(new CustomEvent('vp:chord-retry')));
  $('mode-free').addEventListener('click', () => setMode('free'));
  $('mode-sheet').addEventListener('click', () => setMode('sheet'));
  modeUI();
  document.addEventListener('visibilitychange', () => { if (document.hidden) { pause(); displayProgress(); } });
  window.addEventListener('pagehide', () => { stopRecognition(); pause(); });
  let width = 0, resizeFrame;
  new ResizeObserver(entries => {
    const nextWidth = Math.round(entries[0].contentRect.width);
    if (!state.renderer || $('score-scroll').hidden || nextWidth === width || nextWidth < 1) return;
    width = nextWidth; cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => { if (state.renderer) { state.renderer.render(); state.renderer.cursor.hide(); } });
  }).observe($('score-render'));
})();
