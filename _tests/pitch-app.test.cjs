const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const fragment = fs.readFileSync(`${__dirname}/../pitch-visualizer/index.html`, 'utf8');
const scripts = [...fragment.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]).filter(script => script.trim());
const core = vm.createContext({});
vm.runInContext(scripts[0], core);
const P = core.ViolinPitch;

class Element {
  constructor(tag) { this.tag = tag; this.attributes = {}; this.children = []; this.listeners = {}; this.value = ''; this.textContent = ''; }
  append(...items) { this.children.push(...items); }
  appendChild(item) { this.append(item); return item; }
  replaceChildren(...items) { this.children = items; }
  setAttribute(key, value) { this.attributes[key] = String(value); }
  addEventListener(name, callback) { this.listeners[name] = callback; }
}
const descendants = (element) => [element, ...element.children.flatMap(descendants)];

// Drive the real app with synthetic microphone samples, a minimal DOM and a
// controllable animation clock; no browser permission or physical mic required.
function fixture(width = 736) {
  const events = [];
  const elements = {};
  for (const [_, tag, attrs] of fragment.matchAll(/<([a-z0-9]+)\b([^>]*)>/g)) {
    const id = attrs.match(/\bid="(vp-[^"]+)"/)?.[1];
    if (!id) continue;
    const element = new Element(tag);
    element.value = attrs.match(/\bvalue="([^"]*)"/)?.[1] ?? '';
    elements[id.slice(3)] = element;
  }
  let now = 0, inputHz = 442, stopped = false, frameId = 0, chordCallbacks;
  const frames = new Map(), windowEvents = {};
  const track = { stop() { stopped = true; }, addEventListener() {} };
  const stream = { getTracks: () => [track], getAudioTracks: () => [track] };
  class AudioContext {
    state = 'running';
    sampleRate = 48000;
    createMediaStreamSource() { return { connect() {}, disconnect() {} }; }
    createAnalyser() {
      return { disconnect() {}, getFloatTimeDomainData(samples) {
        for (let i = 0; i < samples.length; i++) samples[i] = inputHz ? 0.3 * Math.sin(2 * Math.PI * inputHz * i / 48000) : 0;
      } };
    }
    close() { this.state = 'closed'; }
  }
  const root = { clientWidth: width, querySelector(selector) { assert.ok(elements[selector.slice(4)], selector); return elements[selector.slice(4)]; } };
  const context = vm.createContext({
    document: { getElementById: () => root, createElement: tag => new Element(tag), createElementNS: (_, tag) => new Element(tag), addEventListener() {} },
    window: { AudioContext, matchMedia:()=>({matches:true}), addEventListener(type,fn) { (windowEvents[type] ||= []).push(fn); }, dispatchEvent(event) { events.push(event); for(const fn of windowEvents[event.type] || []) fn(event); } },
    performance: { now: () => now },
    CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } },
    navigator: { mediaDevices: { getUserMedia: async () => stream } },
    // This suite isolates UI/audio routing. Recorded-audio inference and the
    // actual worker lifecycle are covered by pitch-chords and browser checks.
    ChordListener: { create(callbacks) { chordCallbacks = callbacks; return { start(){}, stop(){}, reset(){}, submit(){} }; } },
    ResizeObserver: class { observe() {} },
    requestAnimationFrame(callback) { frames.set(++frameId,callback); return frameId; },
    cancelAnimationFrame(id) { frames.delete(id); }
  });
  vm.runInContext(fs.readFileSync(`${__dirname}/../pitch-visualizer/practice-staff.js`, 'utf8'), context);
  for (const script of scripts) vm.runInContext(script, context);
  return {
    events,
    dispatch: (type, detail) => context.window.dispatchEvent(new context.CustomEvent(type, {detail})),
    on: (type, fn) => context.window.addEventListener(type, fn),
    chordFrames: frames => chordCallbacks.onFrames(frames),
    nodes: () => descendants(elements.staff),
    elements,
    start: () => elements.mic.listeners.click(),
    stop: () => elements.mic.listeners.click(),
    setA4(value) { elements.a4.value = String(value); elements.a4.listeners.input(); },
    setClef(value) { elements.clef.value = value; elements.clef.listeners.change(); },
    play(hz, duration = 300) { inputHz = hz; for (let elapsed = 0; elapsed < duration; elapsed += 50) { now += 50; assert.ok(frames.size); const callbacks=[...frames.values()]; frames.clear(); callbacks.forEach(callback=>callback(now)); } },
    paths: () => descendants(elements.staff).filter(node => node.attributes['data-pitch-trace']).map(node => node.attributes.d).join('|'),
    pitchY: () => Number(descendants(elements.staff).find(node => node.attributes.class === 'vp-live-dot')?.attributes.cy),
    noteY: () => {
      const note = descendants(elements.staff).find(node => node.attributes['data-event-id'] === 'current');
      const head = descendants(note).filter(node => node.attributes.class === 'vp-note-glyph').at(-1);
      return Number(head.attributes.transform.match(/translate\([^ ]+ ([^)]+)\)/)[1]);
    },
    get stopped() { return stopped; }
  };
}

test('starts with an empty staff, tuning controls, and sheet-photo inputs', () => {
  const app = fixture();
  assert.equal(app.elements.note.textContent, '—');
  assert.equal(app.paths(), '');
  assert.equal(app.elements.a4.value, '440');
  assert.equal(app.elements.clef.value, 'treble');
  assert.ok(app.elements['sheet-upload']);
  assert.ok(app.elements['sheet-camera']);
  assert.doesNotMatch(fragment, /Demo|Detune|Open strings|Play reference|Played pitch|Written notes/);
});

test('only fresh microphone samples drive practice, with silence releasing repeated notes', async () => {
  const { createFollower } = require('../pitch-visualizer/music-score.js');
  const app = fixture();
  const follower = createFollower([{midi:69},{midi:69},{midi:71}]);
  await app.start();
  assert.ok(app.events.some(e => e.type === 'vp:microphone' && e.detail.active));
  app.play(440,350);
  let cursor = 0;
  const consume = () => { for (;cursor<app.events.length;cursor++) { const e=app.events[cursor]; if(e.type==='vp:pitch') follower.update(e.detail.pitch,e.detail.at); } };
  consume(); assert.equal(follower.current().index,1);
  const count=app.events.length;
  app.setA4(442); app.setA4(440); app.setClef('bass');
  assert.equal(app.events.length,count,'redrawing old samples must never count as practice');
  app.play(440,500); consume(); assert.equal(follower.current().index,1);
  app.play(0,200); app.play(440,350); consume(); assert.equal(follower.current().index,2);
  app.play(P.frequency(71),350); consume(); assert.equal(follower.current().complete,true);
  await app.stop(); assert.equal(app.events.at(-1).detail.active,false);
});

test('calibration updates note names and retained trace without changing measured frequency', async () => {
  const app = fixture();
  await app.start();
  app.play(442);
  assert.ok(app.pitchY() < app.noteY());
  const announcement = app.elements.announcement.textContent, original = app.paths();
  app.setA4(442);
  assert.equal(app.elements.note.textContent, 'A4');
  assert.ok(Math.abs(app.pitchY() - app.noteY()) < 0.1);
  assert.equal(app.elements.announcement.textContent, announcement);
  assert.notEqual(app.paths(), original);
  app.setA4(415);
  assert.equal(app.elements.note.textContent, 'A♯4');
  app.setA4(440);
  assert.equal(app.paths(), original);
  app.setA4(442);
  app.play(442);
  assert.ok(Math.abs(app.pitchY() - app.noteY()) < 0.1);
  await app.stop();
  const stopped = app.paths();
  app.setA4(432);
  assert.notEqual(app.paths(), stopped);
  assert.equal(app.elements.note.textContent, '—');
  assert.ok(app.stopped);
});

test('invalid A4 values keep the last valid calibration and show an inline error', async () => {
  const app = fixture();
  await app.start();
  app.play(442);
  app.setA4(442);
  for (const value of ['', 399, 481, 'abc', 'Infinity', 440.05]) {
    const trace = app.paths();
    app.setA4(value);
    assert.equal(app.elements.a4.attributes['aria-invalid'], 'true');
    assert.equal(app.elements['calibration-error'].hidden, false);
    assert.ok(Math.abs(app.pitchY() - app.noteY()) < 0.1);
    assert.equal(app.paths(), trace);
  }
  app.setA4(442.5);
  assert.equal(app.elements.a4.attributes['aria-invalid'], 'false');
  assert.equal(app.elements['calibration-error'].hidden, true);
  assert.ok(app.pitchY() > app.noteY());
});

test('A0 and C8 remain visible in both clefs across A4 calibrations and screen sizes', async () => {
  for (const width of [320, 736, 1052]) {
    const app = fixture(width);
    await app.start();
    for (const a4 of [400, 480]) {
      app.setA4(a4);
      for (const clef of ['treble', 'bass']) {
        app.setClef(clef);
        for (const midi of [21, 108]) {
          app.play(P.frequency(midi, a4));
          assert.equal(app.elements.note.textContent, P.name(midi));
          assert.ok(Math.abs(app.pitchY() - app.noteY()) < 0.3);
          const nodes = descendants(app.elements.staff);
          const playhead = nodes.find(node => node.attributes['data-playhead']);
          assert.equal(playhead.attributes.x1, String(width / 2));
          const clip = nodes.find(node => node.tag === 'rect');
          assert.ok(app.pitchY() > Number(clip.attributes.y));
          assert.ok(app.pitchY() < Number(clip.attributes.y) + Number(clip.attributes.height));
          for (const path of nodes.filter(node => node.attributes['data-pitch-trace'])) for (const [_, x, y] of path.attributes.d.matchAll(/[ML]([\d.]+),([\d.]+)/g)) {
            assert.ok(Number(y) >= Number(clip.attributes.y));
            assert.ok(Number(y) <= Number(clip.attributes.y) + Number(clip.attributes.height));
          }
        }
      }
    }
    await app.stop();
  }
});
test('changing clef redraws existing music without changing notes, input or timing', async () => {
  const app = fixture();
  await app.start();
  app.play(P.frequency(48));
  const original = app.paths(), announcement = app.elements.announcement.textContent;
  const originalHeight = Number(app.elements.staff.attributes.height);
  app.setClef('bass');
  assert.equal(app.elements.note.textContent, 'C3');
  assert.equal(app.elements.announcement.textContent, announcement);
  assert.notEqual(app.paths(), original);
  assert.ok(Number(app.elements.staff.attributes.height) < originalHeight);
  assert.match(app.elements.staff.attributes['aria-label'], /bass clef/);
  assert.equal(app.stopped, false);
  app.setClef('treble');
  assert.equal(app.paths(), original);
  await app.stop();
  app.setClef('bass');
  assert.equal(app.elements.note.textContent, '—');
  assert.notEqual(app.paths(), '');
});

test('the staff uses its own width when a photo shares the practice area', async () => {
  const app = fixture(1052);
  app.elements.staff.clientWidth = 460;
  app.setClef('treble');
  assert.match(app.elements.staff.attributes.viewBox, /^0 0 460 /);
  await app.start();
  app.play(440);
  assert.equal(app.elements.note.textContent, 'A4');
  assert.ok(Math.abs(app.pitchY() - app.noteY()) < 0.1);
  await app.stop();
});

test('sheet practice draws only a trace and pending targets, fades chord tones, then shifts left', async () => {
  const { DOMParser } = require('@xmldom/xmldom');
  const { parse, createFollower } = require('../pitch-visualizer/music-score.js');
  const lane=parse(fs.readFileSync(`${__dirname}/../pitch-visualizer/samples/notes-and-chords.musicxml`,'utf8'),DOMParser).lanes[0];
  const follower=createFollower(lane.events), app=fixture(800);
  const publish=(result,reset=false)=>app.dispatch('vp:practice',{sequence:lane.events,index:result.index,matchedPitches:result.matchedPitches,clef:'treble',fifths:0,reset});
  publish(follower.current(),true);
  app.on('vp:pitch',({detail})=>publish(follower.update(detail.pitch,detail.at)));
  app.on('vp:chords',({detail})=>{ for(const frame of detail.frames) publish(follower.update(frame.pitches,frame.time)); });
  await app.start(); app.play(440,350); app.play(P.frequency(71),350);
  assert.equal(follower.current().index,2);
  let targets=app.nodes().filter(n=>n.attributes['data-practice-event']);
  assert.equal(targets[0].attributes['data-event-index'],'2');
  assert.equal(Number(targets[0].attributes['data-event-x']),400);
  assert.ok(targets.slice(1).every(n=>Number(n.attributes['data-event-x'])>400));
  app.play(P.frequency(76),350);
  app.chordFrames(Array.from({length:7},(_,i)=>({time:750+i*50,pitches:[{midi:76,cents:0,hz:P.frequency(76)}]})));
  assert.equal(follower.current().index,2);
  const tones=descendants(app.nodes().find(n=>n.attributes['data-event-index']==='2')).filter(n=>n.attributes['data-target-midi']);
  assert.equal(tones.find(n=>n.attributes['data-target-midi']==='76').attributes['data-matched'],'true');
  assert.match(tones.find(n=>n.attributes['data-target-midi']==='76').attributes.class,/is-matched/);
  assert.equal(tones.find(n=>n.attributes['data-target-midi']==='72').attributes['data-matched'],'false');
  assert.ok(app.paths()); assert.equal(app.elements.note.textContent,'');
  assert.equal(app.nodes().some(n=>n.attributes['data-event-id'] || n.attributes.class==='vp-live-dot'),false);
  app.play(P.frequency(72),350);
  app.chordFrames(Array.from({length:7},(_,i)=>({time:1100+i*50,pitches:[{midi:72,cents:0,hz:P.frequency(72)}]})));
  assert.equal(follower.current().index,3);
  targets=app.nodes().filter(n=>n.attributes['data-practice-event']);
  assert.equal(targets[0].attributes['data-event-index'],'3');
  assert.equal(Number(targets[0].attributes['data-event-x']),400);
  assert.equal(targets.some(n=>n.attributes['data-event-index']==='2'),false);
  await app.stop();
});
