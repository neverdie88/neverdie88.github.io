/* One staff: pitch history on the left, pending score attacks on the right. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PracticeStaff = api;
})(globalThis, function () {
  'use strict';
  const spacing = width => Math.max(68, Math.min(112, width * .15));
  function writtenStep(note, clef, P) {
    return /^[A-G]$/.test(note.step) && Number.isFinite(note.octave)
      ? 7 * (note.octave - 4) + 'CDEFGAB'.indexOf(note.step) - 2 + P.CLEFS[clef].stepOffset
      : P.notation(note.writtenMidi ?? note.midi, 0, clef).step;
  }
  function draw({ svg, width, practice, trace, P, glyphs, fallbackClef = 'treble', offset = 0 }) {
    const doc = svg.ownerDocument || document;
    const make = (tag, attrs = {}, text = '') => {
      const element = doc.createElementNS('http://www.w3.org/2000/svg', tag);
      for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, String(value));
      if (text) element.textContent = text;
      return element;
    };
    const append = (parent, tag, attrs, text) => parent.appendChild(make(tag, attrs, text));
    const sequence = practice.sequence, current = sequence[practice.index];
    const clef = current?.clef || practice.clef || fallbackClef;
    const fifths = current?.fifths ?? practice.fifths ?? 0;
    const gap = width < 480 ? 22 : 28, center = width / 2, stepX = spacing(width);
    const upcoming = sequence.slice(practice.index, practice.index + Math.ceil(center / stepX) + 1);
    const transposition = current?.notes[0] ? current.notes[0].writtenMidi - current.notes[0].midi : 0;
    const traceStep = pitch => {
      const scoreNote = current?.notes.find(note => note.midi === pitch.midi);
      return (scoreNote ? writtenStep(scoreNote, clef, P) : P.notation(pitch.midi + transposition, fifths, clef).step) + pitch.cents / 100;
    };
    const steps = upcoming.flatMap(event => event.notes.map(note => writtenStep(note, clef, P)));
    for (const point of trace.points) for (const pitch of point.pitches || (point.pitch ? [point.pitch] : [])) steps.push(traceStep(pitch));
    // Keep bounds fixed for the whole score so completing a chord cannot move
    // the staff vertically. Include trace excursions while they are visible.
    const bounds = practice.bounds?.[clef] || { top: 12, bottom: -5 };
    const top = Math.max(12, bounds.top, ...steps), bottomStep = Math.min(-5, bounds.bottom, ...steps);
    const staffBottom = 24 + (top + 2) * gap / 2, height = staffBottom - (bottomStep - 2) * gap / 2 + 12;
    const y = step => staffBottom - step * gap / 2;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`); svg.setAttribute('height', height);
    const remaining = current?.notes.filter(note => !practice.matchedPitches.includes(note.midi)).map(note => note.name).join(', ');
    const title = current ? `Play ${remaining} at the center. ${practice.index + 1} of ${sequence.length}.` : 'Sheet complete.';
    svg.setAttribute('aria-label', title);
    svg.replaceChildren(make('title', {}, title));
    for (let step = 0; step <= 8; step += 2) append(svg, 'line', { x1: 12, x2: width - 12, y1: y(step), y2: y(step), class: 'vp-staff-line' });
    const glyph = (parent, key, x, baseline, size = gap) => {
      const scale = size / glyphs.staffSpace;
      return append(parent, 'path', { d: glyphs[key].path, transform: `translate(${x} ${baseline}) scale(${scale} ${-scale})`, class: 'vp-note-glyph' });
    };
    glyph(svg, P.CLEFS[clef].glyph, 12, y(P.CLEFS[clef].anchorStep));
    append(svg, 'line', { x1: center, x2: center, y1: 16, y2: height - 12, class: 'vp-playhead', 'data-playhead': 'now' });
    const defs = append(svg, 'defs');
    const targetsClip = append(defs, 'clipPath', { id: 'vp-practice-target-clip' });
    append(targetsClip, 'rect', { x: center - 55, y: 0, width: center + 43, height });
    const targets = append(svg, 'g', { 'clip-path': 'url(#vp-practice-target-clip)' });
    const size = gap * .7, headWidth = glyphs.noteheadBlack.width * size / glyphs.staffSpace;
    upcoming.forEach((event, eventOffset) => {
      const index = practice.index + eventOffset, x = center + eventOffset * stepX + offset;
      const group = append(targets, 'g', { 'data-practice-event': event.id || index, 'data-event-index': index, 'data-event-x': x, class: eventOffset ? 'vp-upcoming-target' : 'vp-current-target' });
      const notes = event.notes.map(note => ({ ...note, staffStep: writtenStep(note, clef, P) })).sort((a, b) => a.staffStep - b.staffStep);
      const stemDown = notes.reduce((sum, note) => sum + note.staffStep, 0) / notes.length >= 4;
      let previousStep = -Infinity, displaced = false;
      notes.forEach(note => {
        const matched = eventOffset === 0 && practice.matchedPitches.includes(note.midi);
        displaced = note.staffStep - previousStep === 1 ? !displaced : false;
        previousStep = note.staffStep;
        const noteX = x + (displaced ? (stemDown ? headWidth : -headWidth) * .85 : 0), left = noteX - headWidth / 2, baseline = y(note.staffStep);
        const target = append(group, 'g', { class: `vp-target-note${matched ? ' is-matched' : ''}`, 'data-target-midi': note.midi, 'data-matched': matched });
        append(target, 'title', {}, `${note.name}${matched ? ' matched' : ''}`);
        for (let step = -2; step >= note.staffStep; step -= 2) append(target, 'line', { x1: left - 6, x2: left + headWidth + 6, y1: y(step), y2: y(step), class: 'vp-ledger' });
        for (let step = 10; step <= note.staffStep; step += 2) append(target, 'line', { x1: left - 6, x2: left + headWidth + 6, y1: y(step), y2: y(step), class: 'vp-ledger' });
        const alter = note.alter ?? 0;
        const inKey = (event.fifths < 0 ? 'BEADGCF' : 'FCGDAEB').slice(0, Math.abs(event.fifths || 0)).includes(note.step);
        if (alter || inKey) {
          const mark = alter > 0 ? 'accidentalSharp' : alter < 0 ? 'accidentalFlat' : 'accidentalNatural';
          glyph(target, mark, left - 20 - (notes.length > 1 ? (note.staffStep % 2 + 2) % 2 * 13 : 0), baseline, size);
          if (Math.abs(alter) === 2) glyph(target, mark, left - 32, baseline, size);
        }
        if (note.type === 'half' || note.type === 'whole') append(target, 'ellipse', { cx: noteX, cy: baseline, rx: headWidth / 2, ry: size * .45, transform: `rotate(-20 ${noteX} ${baseline})`, class: 'vp-hollow-head' });
        else glyph(target, 'noteheadBlack', left, baseline, size);
        if (note.type !== 'whole' && note.type !== 'breve') {
          const stemX = stemDown ? left + .8 : left + headWidth - .8, end = baseline + (stemDown ? 1 : -1) * size * 3.5;
          append(target, 'line', { x1: stemX, x2: stemX, y1: baseline, y2: end, class: 'vp-note-stem' });
          const flags = ['eighth', '16th', '32nd', '64th', '128th'].indexOf(note.type) + 1;
          for (let f = 0; f < flags; f++) {
            const fy = end + (stemDown ? -1 : 1) * f * 6;
            append(target, 'path', { d: `M${stemX},${fy}q${size * 1.1},${stemDown ? -size : size} 1,${stemDown ? -size * 2 : size * 2}`, class: 'vp-note-flag' });
          }
        }
        for (let dot = 0; dot < (note.dots || 0); dot++) append(target, 'circle', { cx: left + headWidth + 7 + dot * 6, cy: baseline - (note.staffStep % 2 === 0 ? gap / 4 : 0), r: 2, fill: 'currentColor' });
      });
    });
    const traceLeft = Math.min(center - 16, 30 + glyphs[P.CLEFS[clef].glyph].width * gap / glyphs.staffSpace);
    const traceClip = append(defs, 'clipPath', { id: 'vp-practice-trace-clip' });
    append(traceClip, 'rect', { x: traceLeft, y: 0, width: center - traceLeft + 2, height });
    const traceLayer = append(svg, 'g', { 'clip-path': 'url(#vp-practice-trace-clip)' });
    const start = trace.endTime - trace.windowMs;
    const segments = new Map();
    function flush(key) {
      const segment = segments.get(key);
      if (segment?.length) append(traceLayer, 'path', { d: segment.join(' '), class: 'vp-trace', 'data-pitch-trace': 'true', 'data-trace-voice': key });
      segments.delete(key);
    }
    let previousTime = -Infinity;
    for (const point of trace.points) {
      const pitches = point.pitches || (point.pitch ? [point.pitch] : []);
      const keys = new Set(pitches.map(p => point.pitches ? p.midi : 'single'));
      for (const key of segments.keys()) if (!keys.has(key) || point.time - previousTime > 200) flush(key);
      const x = traceLeft + (point.time - start) / trace.windowMs * (center - traceLeft);
      for (const pitch of pitches) {
        const key = point.pitches ? pitch.midi : 'single', segment = segments.get(key) || [];
        segment.push(`${segment.length ? 'L' : 'M'}${x.toFixed(2)},${y(traceStep(pitch)).toFixed(2)}`);
        segments.set(key, segment);
      }
      previousTime = point.time;
    }
    for (const key of segments.keys()) flush(key);
    return { center, spacing: stepX, height };
  }
  return { draw, spacing, writtenStep };
});
