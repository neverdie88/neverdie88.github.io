/* SPDX-License-Identifier: AGPL-3.0-only
 * MusicXML adapter for HOMR's symbol vocabulary. See models/README.md.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PitchOMRXML = api;
})(globalThis, function () {
  'use strict';
  const escape = value => String(value).replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]);
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  function duration(rhythm) {
    const match = /^(note|rest)_(\d+)(G?)(\.*)(m?)$/.exec(rhythm);
    if (!match) throw new Error('An unrecognized rhythm was found. Try a clearer photo.');
    const base = Number(match[2]), grace = !!match[3], dots = match[4].length;
    const normal = base ? 2 ** Math.floor(Math.log2(base)) : 1;
    const dotFactor = 2 - 1 / 2 ** dots;
    return { beats: grace ? 0 : 4 / (base || 1) * dotFactor, base, normal, grace, dots, multi: !!match[5], denominator: (base || 1) * 2 ** dots };
  }
  function group(symbols) {
    const groups = []; let chord = false;
    for (const symbol of symbols) {
      if (symbol.rhythm === 'chord') { chord = true; continue; }
      if (chord && groups.length && /^(note|rest)_/.test(symbol.rhythm) && /^(note|rest)_/.test(groups.at(-1)[0].rhythm)) groups.at(-1).push(symbol);
      else groups.push([symbol]);
      chord = false;
    }
    return groups;
  }
  function convert(lines, title = 'Scanned sheet') {
    const groups = lines.flatMap((symbols, i) => i ? [[{ rhythm: 'newline' }], ...group(symbols)] : group(symbols));
    let division = 1, length = 0;
    const lengths = [];
    for (const symbols of groups) {
      if (/^(note|rest)_/.test(symbols[0].rhythm)) {
        const values = symbols.map(s => duration(s.rhythm));
        for (const d of values) division = division / gcd(division, d.denominator) * d.denominator;
        length += Math.min(...values.map(d => d.beats));
      } else if (/barline|repeatEnd|newline/.test(symbols[0].rhythm) && length) { lengths.push(length); length = 0; }
    }
    if (length) lengths.push(length);
    if (!lengths.length) throw new Error('No notes were recognized. Try a closer photo of a printed staff.');
    lengths.sort((a, b) => a - b);
    const typicalBeats = lengths[Math.floor(lengths.length / 2)] || 4;
    // Quarter-note divisions are an integer multiple for every predicted tuplet.
    const types = { 1: 'whole', 2: 'half', 4: 'quarter', 8: 'eighth', 16: '16th', 32: '32nd', 64: '64th', 128: '128th' };
    const measures = [], warnings = new Set(['Photo recognition can be wrong. Check notes, accidentals, rhythm, and ties against the photo before practicing.', 'The time signature is estimated from the recognized measure lengths.']);
    let body = '', cursor = 0, position = 0, hasNotes = false, number = 1, noteCount = 0;
    let clef = 'G2', fifths = 0, meter = 4, first = true;
    function attributes(extra = '') {
      return `<attributes>${first ? `<divisions>${division}</divisions>` : ''}${extra}</attributes>`;
    }
    function flush() {
      if (!hasNotes) return;
      measures.push(`<measure number="${number++}">${body}</measure>`);
      body = ''; cursor = position = 0; hasNotes = false; first = false;
    }
    function move(to) {
      const delta = Math.round((to - cursor) * division);
      if (delta) body += `<${delta < 0 ? 'backup' : 'forward'}><duration>${Math.abs(delta)}</duration></${delta < 0 ? 'backup' : 'forward'}>`;
      cursor = to;
    }
    function makeNote(symbol, d, chord, voice) {
      const rest = symbol.rhythm.startsWith('rest');
      if (!rest && !/^[A-G][0-9]$/.test(symbol.pitch)) throw new Error('A note has no readable pitch. Try a sharper photo.');
      const alteration = ({ '#': 1, '##': 2, b: -1, bb: -2, N: 0, _: 0, '.': 0 })[symbol.lift];
      // HOMR lifts encode absolute pitch alteration, including key-signature notes.
      const pitch = rest ? '<rest/>' : `<pitch><step>${symbol.pitch[0]}</step><alter>${alteration ?? 0}</alter><octave>${symbol.pitch[1]}</octave></pitch>`;
      const tuple = d.base && d.base !== d.normal ? `<time-modification><actual-notes>${d.base / gcd(d.base, d.normal)}</actual-notes><normal-notes>${d.normal / gcd(d.base, d.normal)}</normal-notes></time-modification>` : '';
      const markings = [];
      if (symbol.slur?.includes('slurStop')) markings.push('<slur type="stop" number="1"/>');
      if (symbol.slur?.includes('slurStart')) markings.push('<slur type="start" number="1"/>');
      const articulations = [];
      for (const mark of (symbol.articulation || '').split('_')) {
        if (['accent', 'staccato', 'staccatissimo', 'tenuto'].includes(mark)) articulations.push(`<${mark}/>`);
        else if (mark === 'fermata' || mark === 'arpeggiate') markings.push(`<${mark}/>`);
        else if (mark === 'trill' || mark === 'turn') markings.push(`<ornaments><${mark === 'trill' ? 'trill-mark' : 'turn'}/></ornaments>`);
        else if (mark && mark !== '.') warnings.add('Some ornament details need manual correction in a notation editor.');
      }
      if (articulations.length) markings.push(`<articulations>${articulations.join('')}</articulations>`);
      return `<note>${chord ? '<chord/>' : ''}${d.grace ? '<grace/>' : ''}${pitch}${d.grace ? '' : `<duration>${Math.round(d.beats * division)}</duration>`}<voice>${voice}</voice><type>${types[d.normal] || 'quarter'}</type>${'<dot/>'.repeat(d.dots)}${tuple}${markings.length ? `<notations>${markings.join('')}</notations>` : ''}</note>`;
    }
    const firstSymbols = groups.slice(0, groups.findIndex(g => /^(note|rest)_/.test(g[0].rhythm))).flat();
    clef = firstSymbols.find(s => s.rhythm.startsWith('clef_'))?.rhythm.slice(5) || clef;
    fifths = Number(firstSymbols.find(s => s.rhythm.startsWith('keySignature_'))?.rhythm.split('_')[1] || 0);
    meter = Number(firstSymbols.find(s => s.rhythm.startsWith('timeSignature/'))?.rhythm.split('/')[1] || 4);
    if (!/^[GFC][1-5]$/.test(clef)) throw new Error('Tablature is not supported. Use a score with a five-line staff.');
    body = attributes(`<key><fifths>${fifths}</fifths></key><time><beats>${Math.max(1, Math.round(typicalBeats * meter / 4))}</beats><beat-type>${meter}</beat-type></time><clef><sign>${clef[0]}</sign><line>${clef[1]}</line></clef>`);
    for (const symbols of groups) {
      const rhythm = symbols[0].rhythm;
      if (/^(note|rest)_/.test(rhythm)) {
        const byDuration = new Map();
        for (const symbol of symbols) {
          const d = duration(symbol.rhythm);
          if (d.multi) throw new Error('Multi-measure rests need a notation editor. Crop a section without them or open MusicXML.');
          const key = `${d.beats}:${symbol.rhythm.startsWith('rest') ? 'rest' : 'note'}`;
          if (!byDuration.has(key)) byDuration.set(key, []);
          byDuration.get(key).push({ symbol, d });
        }
        let voice = 1;
        const layers = [...byDuration.values()].sort((a, b) => a[0].d.beats - b[0].d.beats);
        for (const notes of layers) {
          move(position);
          notes.forEach(({ symbol, d }, i) => { body += makeNote(symbol, d, i > 0, voice); if (symbol.rhythm.startsWith('note')) noteCount++; });
          cursor = position + notes[0].d.beats; voice++;
        }
        position += Math.min(...layers.map(notes => notes[0].d.beats));
        hasNotes = true;
      } else if (/barline|repeatEnd/.test(rhythm)) {
        if (hasNotes && rhythm !== 'barline') body += `<barline location="right"><bar-style>${rhythm === 'doublebarline' ? 'light-light' : 'light-heavy'}</bar-style>${rhythm.startsWith('repeat') ? '<repeat direction="backward"/>' : ''}</barline>`;
        flush();
        if (rhythm === 'repeatEndStart') body += '<barline location="left"><repeat direction="forward"/></barline>';
      } else if (rhythm === 'repeatStart') {
        if (hasNotes) flush();
        body += '<barline location="left"><repeat direction="forward"/></barline>';
      } else if (rhythm === 'newline') { flush(); body += '<print new-system="yes"/>'; }
      else if (rhythm.startsWith('clef_') && rhythm.slice(5) !== clef) {
        clef = rhythm.slice(5);
        if (!/^[GFC][1-5]$/.test(clef)) throw new Error('This clef is not supported. Open MusicXML for this score instead.');
        body += `<attributes><clef><sign>${clef[0]}</sign><line>${clef[1]}</line></clef></attributes>`;
      } else if (rhythm.startsWith('keySignature_') && Number(rhythm.split('_')[1]) !== fifths) {
        fifths = Number(rhythm.split('_')[1]); body += `<attributes><key><fifths>${fifths}</fifths></key></attributes>`;
      } else if (rhythm.startsWith('timeSignature/') && Number(rhythm.split('/')[1]) !== meter) {
        meter = Number(rhythm.split('/')[1]); body += `<attributes><time><beats>${Math.max(1, Math.round(typicalBeats * meter / 4))}</beats><beat-type>${meter}</beat-type></time></attributes>`;
      } else if (rhythm.startsWith('volta')) warnings.add('Repeat endings need manual correction in a notation editor.');
    }
    flush();
    if (!noteCount) throw new Error('No pitched notes were recognized. Try a clearer photo.');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<score-partwise version="4.0"><work><work-title>${escape(title)}</work-title></work><identification><encoding><software>Sheet Music Practice / HOMR</software></encoding></identification><part-list><score-part id="P1"><part-name>Scanned music</part-name></score-part></part-list><part id="P1">${measures.join('\n')}</part></score-partwise>`;
    return { xml, warnings: [...warnings], noteCount };
  }
  return { convert, duration, group };
});
