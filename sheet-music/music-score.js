/* MusicXML attack groups and self-paced single-note/polyphonic practice. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PitchScore = api;
})(globalThis, function () {
  'use strict';
  const children = (node, tag) => Array.from(node?.childNodes || []).filter(child => child.nodeType === 1 && (!tag || child.localName === tag));
  const child = (node, tag) => children(node, tag)[0];
  const value = (node, tag, fallback = '') => child(node, tag)?.textContent?.trim() || fallback;
  const number = (node, tag, fallback = 0) => {
    const result = Number(value(node, tag, String(fallback)));
    return Number.isFinite(result) ? result : fallback;
  };
  const NATURAL = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  function noteName(midi) {
    return ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'][((midi % 12) + 12) % 12] + (Math.floor(midi / 12) - 1);
  }
  function parse(xml, Parser = globalThis.DOMParser) {
    if (typeof xml !== 'string' || xml.length > 10 * 1024 * 1024) throw new Error('Choose a MusicXML score smaller than 10 MB.');
    if (/<!ENTITY\b/i.test(xml)) throw new Error('MusicXML entity declarations are not supported.');
    const doc = new Parser().parseFromString(xml, 'application/xml');
    if (doc.getElementsByTagName('parsererror').length || doc.documentElement?.localName !== 'score-partwise') {
      throw new Error('This is not a supported MusicXML score. Export it as partwise MusicXML and try again.');
    }
    const score = doc.documentElement;
    const title = value(score, 'movement-title') || value(child(score, 'work'), 'work-title') || 'Untitled score';
    const names = new Map(children(child(score, 'part-list'), 'score-part').map(part => [part.getAttribute('id'), value(part, 'part-name', 'Part')]));
    const lanes = [], warnings = new Set();
    children(score, 'part').forEach((part, partIndex) => {
      const laneMap = new Map(), clefs = new Map(), keys = new Map(), transpositions = new Map();
      let divisions = 1;
      function setStaffAttribute(map,node,value){
        const staff=node.getAttribute('number');
        if(!staff)map.clear();
        map.set(staff||'*',value);
      }
      children(part, 'measure').forEach((measure, measureIndex) => {
        let position = 0, previousStart = 0;
        for (const item of children(measure)) {
          if (item.localName === 'attributes') {
            divisions = Math.max(1, number(item, 'divisions', divisions));
            for(const key of children(item,'key'))setStaffAttribute(keys,key,number(key,'fifths'));
            for (const clef of children(item, 'clef')) clefs.set(clef.getAttribute('number') || '1', value(clef, 'sign') === 'F' ? 'bass' : 'treble');
            for(const transpose of children(item,'transpose'))setStaffAttribute(transpositions,transpose,number(transpose,'chromatic')+12*number(transpose,'octave-change'));
          }
          if (item.localName === 'backup') position -= number(item, 'duration') / divisions;
          if (item.localName === 'forward') position += number(item, 'duration') / divisions;
          if (item.localName !== 'note') continue;
          const duration = number(item, 'duration') / divisions;
          const chord = !!child(item, 'chord');
          const start = chord ? previousStart : position;
          if (!chord) { previousStart = position; position += duration; }
          if (child(item, 'grace')) { warnings.add('Grace notes are shown but skipped during practice.'); continue; }
          if (child(item, 'rest')) continue;
          const pitch = child(item, 'pitch');
          if (!pitch) { warnings.add('Unpitched percussion is skipped during practice.'); continue; }
          const staff = value(item, 'staff', '1'), voice = value(item, 'voice', '1');
          const fifths=keys.get(staff)??keys.get('*')??0,transpose=transpositions.get(staff)??transpositions.get('*')??0;
          const step = value(pitch, 'step'), alter = number(pitch, 'alter'), octave = number(pitch, 'octave', 4);
          const writtenMidi = NATURAL[step] + alter + 12 * (octave + 1);
          const midi = writtenMidi + transpose;
          if (!Number.isFinite(midi) || !Number.isInteger(midi) || midi < 21 || midi > 108) {
            warnings.add('Notes outside A0–C8 or using microtones are skipped during practice.');
            continue;
          }
          const id = `${partIndex}:${staff}`;
          if (!laneMap.has(id)) laneMap.set(id, {
            id, partIndex, staff, fifths, clef: clefs.get(staff) || 'treble',
            name: `${names.get(part.getAttribute('id')) || 'Part ' + (partIndex + 1)} · staff ${staff}`,
            events: [], attacks: new Map()
          });
          const lane = laneMap.get(id);
          const ties = children(item, 'tie').concat(children(child(item, 'notations'), 'tied'));
          const tieStop = ties.some(tie => tie.getAttribute('type') === 'stop');
          // Tie continuations are one sustained pitch, not a new attack.
          if (tieStop) continue;
          const note = {
            midi, writtenMidi, step, alter, octave, voice,
            name: step + (alter === 1 ? '♯' : alter === -1 ? '♭' : alter === 2 ? '𝄪' : alter === -2 ? '𝄫' : '') + octave,
            soundingName: noteName(midi), measureIndex, measure: measure.getAttribute('number') || String(measureIndex + 1),
            beat: Math.max(0, start), duration, type: value(item, 'type', 'quarter'), dots: children(item, 'dot').length
          };
          // A backup can introduce a different voice at the same attack. Keep
          // every distinct pitch on this staff together, regardless of XML order.
          const attackId = `${measureIndex}:${note.beat.toFixed(6)}`;
          if (!lane.attacks.has(attackId)) {
            const attack = { id: `${id}:${attackId}`, measureIndex, measure: note.measure, beat: note.beat, fifths, clef: clefs.get(staff) || 'treble', notes: [] };
            lane.attacks.set(attackId, attack); lane.events.push(attack);
          }
          const attack = lane.attacks.get(attackId);
          if (!attack.notes.some(existing => existing.midi === midi)) attack.notes.push(note);
          if (transpose) warnings.add('Transposing parts are matched to their sounding pitch.');
        }
      });
      for (const lane of laneMap.values()) {
        lane.events.sort((a, b) => a.measureIndex - b.measureIndex || a.beat - b.beat);
        lane.events.forEach(event => event.notes.sort((a, b) => a.writtenMidi - b.writtenMidi));
        delete lane.attacks;
        if (lane.events.length) lanes.push(lane);
      }
    });
    if (doc.getElementsByTagName('repeat').length || doc.getElementsByTagName('segno').length || doc.getElementsByTagName('coda').length) {
      warnings.add('Practice follows the written order once, without repeat jumps.');
    }
    if (!lanes.length) throw new Error('No playable pitched notes were found in this score.');
    return { title, lanes, warnings: [...warnings] };
  }
  function createFollower(events, { holdMs = 250, releaseMs = 120, tolerance = 35 } = {}) {
    const pitches = event => event ? (event.notes || [event]).map(note => note.midi) : [];
    let index = 0, lastTime = null;
    let matched = 0, notesMatched = 0, skipped = 0, done = new Set(), lastPitches = new Set();
    const candidates = new Map(), blocked = new Map();
    const snapshot = (feedback = 'waiting') => ({ index, total: events.length, target: events[index] || null, matched, notesMatched, matchedPitches: [...done], skipped, complete: index >= events.length, feedback });
    function advance(wasMatched) {
      index++; candidates.clear(); done = new Set(); blocked.clear();
      // Every held common tone needs a release before the next attack, including
      // repeated chords. A single held chord cannot clear the rest of a score.
      for (const midi of pitches(events[index])) if (lastPitches.has(midi)) blocked.set(midi, null);
      if (wasMatched) matched++; else skipped++;
      return snapshot(index >= events.length ? 'complete' : 'advanced');
    }
    return {
      current: () => snapshot(),
      reset() { index = matched = notesMatched = skipped = 0; lastTime = null; candidates.clear(); blocked.clear(); lastPitches.clear(); done.clear(); return snapshot(); },
      pause() { candidates.clear(); lastTime = null; for (const midi of blocked.keys()) blocked.set(midi, null); },
      skip() { return index < events.length ? advance(false) : snapshot('complete'); },
      update(input, time) {
        if (index >= events.length) return snapshot('complete');
        if (!Number.isFinite(time)) return snapshot();
        if (lastTime !== null && time <= lastTime) return snapshot();
        if (lastTime !== null && time - lastTime > 200) { candidates.clear(); for (const midi of blocked.keys()) blocked.set(midi, null); }
        lastTime = time;
        const heard = new Map((Array.isArray(input) ? input : input ? [input] : []).filter(p => Number.isInteger(p.midi) && Number.isFinite(p.cents)).map(p => [p.midi, p]));
        lastPitches = new Set(heard.keys());
        const required = pitches(events[index]);
        for (const [midi, releasedAt] of blocked) {
          if (heard.has(midi)) blocked.set(midi, null);
          else if (releasedAt === null) blocked.set(midi, time);
          else if (time - releasedAt >= releaseMs) blocked.delete(midi);
        }
        let feedback = heard.size ? 'wrong' : 'waiting', added = false;
        for (const midi of required) {
          const pitch = heard.get(midi);
          if (!pitch || blocked.has(midi) || Math.abs(pitch.cents) > tolerance || done.has(midi)) {
            candidates.delete(midi);
            if (pitch) feedback = blocked.has(midi) ? 'release' : done.has(midi) ? 'note-matched' : pitch.cents > 0 ? 'sharp' : 'flat';
            continue;
          }
          if (!candidates.has(midi)) candidates.set(midi, time);
          feedback = 'holding';
          if (time - candidates.get(midi) >= holdMs) { done.add(midi); notesMatched++; candidates.delete(midi); added = true; }
        }
        if (required.every(midi => done.has(midi))) return advance(true);
        return snapshot(added ? 'note-matched' : feedback);
      }
    };
  }
  return { parse, noteName, createFollower };
});
