(function () {
  'use strict';
  const root = document.getElementById('violin-pitch');
  const P = globalThis.ViolinPitch;
  const find = (id) => root.querySelector('#vp-' + id);
  const ui = Object.fromEntries(['mic', 'error', 'key', 'clef', 'a4', 'calibration-error', 'note', 'staff', 'score-caption', 'announcement', 'trail-toggle'].map((id) => [id, find(id)]));
  const state = { showPitchLines: true, mode: 'idle', a4: 440, pitch: null, key: P.KEYS[0], clef: 'treble', staffTopStep: 12, staffBottomStep: -5, stream: null, context: null, source: null, analyser: null, frame: 0, request: 0, trail: P.createNoteTrail(), trace: P.createPitchTrace(), recent: [], lastSeen: 0, lastSample: 0, lastNote: '' };
  const makeDetector = () => P.createDetector({ minHz: P.frequency(P.RANGE.minMidi - 0.5, state.a4), maxHz: P.frequency(P.RANGE.maxMidi + 0.5, state.a4) });
  let detect = makeDetector();

  for (const mode of ['major', 'minor']) {
    const group = document.createElement('optgroup');
    group.label = mode === 'major' ? 'Major keys' : 'Minor keys';
    for (const key of P.KEYS.filter((key) => key.mode === mode)) {
      const option = document.createElement('option');
      option.value = key.id;
      option.textContent = key.name;
      group.append(option);
    }
    ui.key.append(group);
  }
  ui.key.value = state.key.id;
  ui.clef.value = state.clef;

  function svgElement(tag, attributes = {}, content = '') {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
    if (content) node.textContent = content;
    return node;
  }
  function canvas(element, height, title) {
    const width = Math.max(250, element.clientWidth || root.clientWidth);
    element.setAttribute('viewBox', `0 0 ${width} ${height}`);
    element.replaceChildren(svgElement('title', {}, title));
    return { width, add: (tag, attrs, content) => element.appendChild(svgElement(tag, attrs, content)) };
  }
  function drawStaff() {
    const gap = (ui.staff.clientWidth || root.clientWidth) < 480 ? 22 : 28;
    const clef = P.CLEFS[state.clef];
    const segments = P.traceSegments(state.trace.points, state.key.fifths, state.clef);
    // Add space only when a pitch outside the current extent is present. Keep it
    // until the next session so the staff does not jump as old notes scroll out.
    function include(step) {
      state.staffTopStep = Math.max(state.staffTopStep, Math.ceil(step));
      state.staffBottomStep = Math.min(state.staffBottomStep, Math.floor(step));
    }
    for (const segment of segments) for (const point of segment) include(point.step);
    if (state.pitch) include(P.notation(state.pitch.midi, state.key.fifths, state.clef).step);
    const plotTop = 22, bottom = plotTop + (state.staffTopStep + 2) * gap / 2;
    const plotBottom = bottom - (state.staffBottomStep - 2) * gap / 2, height = plotBottom + 12;
    ui.staff.setAttribute('height', height);
    const { width, add } = canvas(ui.staff, height, `Live notes on a ${clef.name}-clef staff in ${state.key.name}`);
    const signature = P.keySignature(state.key.fifths, state.clef);
    const glyphs = globalThis.ViolinMusicGlyphs;
    const right = width - 16, clefLeft = 12;
    const signatureLeft = clefLeft + glyphs[clef.glyph].width * gap / glyphs.staffSpace + 12;
    const signatureSize = gap * 0.8, signatureSpacing = gap * 0.7;
    const signatureEnd = signatureLeft + signature.length * signatureSpacing;
    // Keep the current note centered while its history moves to the left.
    const playhead = width / 2;
    // If a long signature would crowd the history on a narrow screen, engrave
    // accidentals on each note instead. The clef always shares the note staff.
    const showSignature = signature.length > 0 && playhead - signatureEnd >= 108;
    const plotLeft = (showSignature ? signatureEnd : signatureLeft) + 16;
    const end = state.trace.endTime, start = end - state.trace.windowMs;
    const x = (time) => plotLeft + (time - start) / state.trace.windowMs * (playhead - plotLeft);
    const y = (step) => bottom - step * gap / 2;
    const label = `Notes over eight seconds, blue pitch lines ${state.showPitchLines ? "shown" : "hidden"}, ${clef.name} clef, ${state.key.name}, A4 = ${state.a4} Hz. Switch to ${state.clef === "treble" ? "bass" : "treble"} staff. ` + (state.pitch ? 'Current note ' + P.notation(state.pitch.midi, state.key.fifths, state.clef).name : 'No current note.');
    ui.staff.setAttribute('aria-label', label);
    ui['score-caption'].textContent = state.key.name;
    function glyph(key, gx, baseline, className, parent = ui.staff, size = gap) {
      const scale = size / glyphs.staffSpace;
      parent.appendChild(svgElement('path', { d: glyphs[key].path, transform: `translate(${gx} ${baseline}) scale(${scale} ${-scale})`, class: className }));
    }
    for (let line = 0; line <= 8; line += 2) add('line', { x1: clefLeft, x2: right, y1: y(line), y2: y(line), class: 'vp-staff-line' });
    glyph(clef.glyph, clefLeft, y(clef.anchorStep), 'vp-clef');
    if (showSignature) signature.forEach((mark, index) => glyph(mark.glyph, signatureLeft + index * signatureSpacing, y(mark.step), 'vp-clef', ui.staff, signatureSize));
    add('line', { x1: playhead, x2: playhead, y1: plotTop, y2: plotBottom, class: 'vp-playhead', 'data-playhead': 'now' });
    const definitions = add('defs');
    const clip = svgElement('clipPath', { id: 'vp-pitch-clip' });
    clip.appendChild(svgElement('rect', { x: plotLeft, y: plotTop, width: right - plotLeft, height: plotBottom - plotTop }));
    definitions.appendChild(clip);
    const plot = add('g', { 'clip-path': 'url(#vp-pitch-clip)' });

    // At high playing speeds, retain every trace sample and thin only the
    // engraved annotations, preventing overlapping heads and accidentals.
    const entries = [];
    let nextX = state.pitch ? playhead : Infinity;
    for (const entry of [...state.trail.entries].reverse()) {
      if (entry.endedAt <= start || entry.startedAt > end) continue;
      if (state.pitch && entry.id === state.trail.activeId && entry.midi === state.pitch.midi) continue;
      const cx = x(entry.startedAt);
      if (cx < plotLeft + 26) continue;
      if (nextX - cx < 50) continue;
      entries.unshift({ ...entry, cx });
      nextX = cx;
    }
    if (state.pitch) entries.push({ id: 'current', midi: state.pitch.midi, cx: playhead });
    const printedAlterations = new Map();
    const notes = P.spellTrail(entries.map((entry) => entry.midi), state.key.fifths, state.clef).map((note) => {
      if (showSignature || !signature.length) return note;
      const identity = `${note.letter}:${note.octave}`;
      const previous = printedAlterations.get(identity) ?? 0;
      printedAlterations.set(identity, note.alteration);
      return { ...note, accidental: note.alteration === 1 ? 'accidentalSharp' : note.alteration === -1 ? 'accidentalFlat' : previous !== 0 ? 'accidentalNatural' : null };
    });
    const noteSize = gap * 0.7;
    const noteWidth = glyphs.noteheadBlack.width * noteSize / glyphs.staffSpace;
    notes.forEach((note, index) => {
      const cx = entries[index].cx, noteLeft = cx - noteWidth / 2;
      const group = svgElement('g', { class: 'vp-score-note', opacity: entries[index].id === 'current' ? 1 : 0.7, 'data-note': note.name, 'data-event-id': entries[index].id });
      plot.appendChild(group);
      group.appendChild(svgElement('title', {}, note.name));
      for (const step of note.ledgerSteps) group.appendChild(svgElement('line', { x1: noteLeft - 6, x2: noteLeft + noteWidth + 6, y1: y(step), y2: y(step), class: 'vp-ledger' }));
      if (note.accidental) glyph(note.accidental, noteLeft - 20, y(note.step), 'vp-note-glyph', group, noteSize);
      glyph('noteheadBlack', noteLeft, y(note.step), 'vp-note-glyph', group, noteSize);
      const stemX = note.stemDown ? noteLeft + 0.8 : noteLeft + noteWidth - 0.8;
      group.appendChild(svgElement('line', { x1: stemX, x2: stemX, y1: y(note.step), y2: y(note.step) + (note.stemDown ? 1 : -1) * noteSize * 3.5, class: 'vp-note-stem' }));
      // Keep the name close to its notehead, on the side opposite the stem.
      add('text', { x: cx, y: y(note.step) + (note.stemDown ? -18 : 24), 'text-anchor': 'middle', class: 'vp-note-label', 'data-note-label': entries[index].id }, note.name);
    });
    for (const segment of (state.showPitchLines ? segments : [])) {
      const path = segment.map((point, i) => `${i ? 'L' : 'M'}${x(point.time).toFixed(2)},${y(point.step).toFixed(2)}`).join(' ');
      plot.appendChild(svgElement('path', { d: path, class: 'vp-trace', 'data-pitch-trace': 'true' }));
    }
    const latest = state.trace.points.at(-1);
    const livePitch = latest?.pitch;
    if (livePitch && state.pitch) {
      const step = P.notation(livePitch.midi, state.key.fifths, state.clef).step + livePitch.cents / 100;
      add('circle', { cx: x(latest.time), cy: y(step), r: 5, class: 'vp-live-dot' });
    }
  }
  function renderReadout() {
    const p = state.pitch;
    const noteName = p ? P.notation(p.midi, state.key.fifths, state.clef).name : null;
    ui.note.textContent = noteName || '—';
    if (p && noteName !== state.lastNote) {
      state.lastNote = noteName;
      ui.announcement.textContent = `${noteName}, ${p.hz.toFixed(1)} hertz`;
    }
    drawStaff();
  }
  function trackPitch(hz, now) {
    let instant = null;
    if (hz) {
      const nextMidi = P.midi(hz, state.a4);
      if (state.recent.length && Math.abs(nextMidi - state.recent.at(-1)) > 0.6) state.recent = [];
      state.recent.push(nextMidi);
      if (state.recent.length > 3) state.recent.shift();
      const sorted = [...state.recent].sort((a, b) => a - b);
      instant = P.describe(P.frequency(sorted[Math.floor(sorted.length / 2)], state.a4), state.a4);
      state.pitch = instant;
      state.lastSeen = now;
    } else {
      state.recent = [];
      if (now - state.lastSeen > 250) state.pitch = null;
    }
    state.trail.update(instant?.midi ?? null, now);
    state.trace.push(hz ? P.describe(hz, state.a4) : null, now);
  }

  function changeTuning() {
    const a4 = Number(ui.a4.value);
    const valid = ui.a4.value.trim() !== '' && Number.isFinite(a4) && a4 >= 400 && a4 <= 480 && Math.abs(a4 * 10 - Math.round(a4 * 10)) < 1e-8;
    ui.a4.setAttribute('aria-invalid', String(!valid));
    ui['calibration-error'].hidden = valid;
    ui['calibration-error'].textContent = valid ? '' : `Enter 400–480 Hz in steps of 0.1. A4 is still set to ${state.a4} Hz.`;
    if (!valid || a4 === state.a4) return;
    state.a4 = a4;
    detect = makeDetector();
    // Replay retained measured frequencies through the same smoothing and note
    // tracking as live input. Calibration must never change the source Hz/time.
    const points = [...state.trace.points];
    state.trace.reset();
    state.trail.reset();
    state.recent = [];
    state.pitch = null;
    state.lastSeen = 0;
    state.lastNote = '';
    points.forEach((point) => trackPitch(point.pitch?.hz ?? null, point.time));
    if (state.mode !== 'mic') { state.pitch = null; state.trail.release(); }
    renderReadout();
  }
  function showError(message) {
    ui.error.textContent = message;
    ui.error.hidden = !message;
  }
  function stopInput() {
    state.request++;
    cancelAnimationFrame(state.frame);
    state.stream?.getTracks().forEach((track) => track.stop());
    state.source?.disconnect();
    state.analyser?.disconnect();
    state.stream = state.source = state.analyser = null;
    state.recent = [];
    state.lastNote = '';
  }
  function stopMic() {
    stopInput();
    state.mode = 'stopped';
    state.pitch = null;
    state.trail.release();
    ui.mic.textContent = 'Start microphone';
    renderReadout();
    window.dispatchEvent?.(new CustomEvent('vp:microphone', { detail: { active: false } }));
  }
  async function context() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) throw new Error('Audio is unavailable in this browser.');
    if (!state.context || state.context.state === 'closed') state.context = new Audio();
    if (state.context.state === 'suspended') await state.context.resume();
    return state.context;
  }
  async function startMic() {
    if (state.mode === 'mic' || state.mode === 'requesting') { stopMic(); return; }
    showError('');
    stopInput();
    if (!navigator.mediaDevices?.getUserMedia) {
      showError('Microphone access is unavailable here. Open this file on localhost or HTTPS in a browser.');
      window.dispatchEvent?.(new CustomEvent('vp:microphone', { detail: { active: false } }));
      return;
    }
    const request = state.request;
    state.mode = 'requesting';
    ui.mic.textContent = 'Cancel microphone';
    renderReadout();
    try {
      const audio = await context();
      if (request !== state.request) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }, video: false });
      if (request !== state.request) { stream.getTracks().forEach((track) => track.stop()); return; }
      state.stream = stream;
      state.source = audio.createMediaStreamSource(stream);
      state.analyser = audio.createAnalyser();
      // Reserve enough audio for the lowest supported A4 calibration so changing
      // tuning while listening never shortens the low-note analysis window.
      state.analyser.fftSize = P.sampleSize(audio.sampleRate, P.frequency(P.RANGE.minMidi - 0.5, 400));
      state.analyser.smoothingTimeConstant = 0;
      state.source.connect(state.analyser);
      // Never connect the microphone to speakers.
      state.mode = 'mic';
      state.pitch = null;
      state.trail.reset();
      state.trace.reset();
      state.staffTopStep = 12;
      state.staffBottomStep = -5;
      state.lastSeen = state.lastSample = 0;
      ui.mic.textContent = 'Stop microphone';
      window.dispatchEvent?.(new CustomEvent('vp:microphone', { detail: { active: true } }));
      stream.getAudioTracks().forEach((track) => track.addEventListener('ended', () => {
        if (state.stream === stream) { stopMic(); showError('The microphone disconnected. Reconnect it and start again.'); }
      }, { once: true }));
      const samples = new Float32Array(state.analyser.fftSize);
      renderReadout();
      function frame(now) {
        if (state.mode !== 'mic') return;
        if (now - state.lastSample >= 50) {
          state.lastSample = now;
          state.analyser.getFloatTimeDomainData(samples);
          const result = detect(samples, audio.sampleRate);
          trackPitch(result?.hz ?? null, now);
          renderReadout();
          window.dispatchEvent?.(new CustomEvent('vp:pitch', { detail: { pitch: result ? state.pitch : null, at: now } }));
        }
        state.frame = requestAnimationFrame(frame);
      }
      state.frame = requestAnimationFrame(frame);
    } catch (error) {
      if (request !== state.request) return;
      stopMic();
      const messages = {
        NotAllowedError: 'Microphone permission was denied or blocked. Allow microphone access in your browser, then try again.',
        NotFoundError: 'No microphone was found. Connect a microphone and try again.',
        NotReadableError: 'The microphone could not be opened. Check your device and browser permissions, then try again.'
      };
      showError(messages[error.name] || error.message || 'The microphone could not start.');
    }
  }
  ui.mic.addEventListener('click', startMic);
  ui.key.addEventListener('change', () => {
    state.key = P.KEYS.find((key) => key.id === ui.key.value);
    renderReadout();
  });
  ui.a4.addEventListener('input', changeTuning);
  function setClef(clef) {
    state.clef = clef;
    ui.clef.value = clef;
    state.staffTopStep = 12;
    state.staffBottomStep = -5;
    renderReadout();
  }
  ui.clef.addEventListener('change', () => setClef(ui.clef.value));
  const switchStaff = () => setClef(state.clef === 'treble' ? 'bass' : 'treble');
  ui.staff.addEventListener('click', switchStaff);
  ui.staff.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!event.repeat) switchStaff();
    }
  });
  ui['trail-toggle'].addEventListener('change', () => {
    // This is only a visibility control for the blue curves. Preserve notes,
    // timing and staff layout, and continue recording the current window.
    state.showPitchLines = ui['trail-toggle'].checked;
    renderReadout();
  });
  let observedStaffWidth = 0, resizeFrame = 0;
  new ResizeObserver(entries => {
    const width = entries[0].contentRect.width;
    if (width <= 0 || width === observedStaffWidth) return;
    observedStaffWidth = width;
    cancelAnimationFrame(resizeFrame);
    // Drawing changes the SVG height. Defer it so the observer cannot trigger
    // another layout change during the same resize notification cycle.
    resizeFrame = requestAnimationFrame(drawStaff);
  }).observe(ui.staff.parentElement || root);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (state.mode === 'mic' || state.mode === 'requesting') stopMic();
    }
  });
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(resizeFrame);
    stopInput(); if (state.context?.state !== 'closed') state.context?.close();
  });
  renderReadout();
})();
