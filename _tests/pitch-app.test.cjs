const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const fragment = fs.readFileSync(`${__dirname}/../pitch-visualizer/index.html`, 'utf8');
const scripts = ['music-shared/pitch-core.js', 'music-shared/music-glyphs.js', 'pitch-visualizer/app.js'].map(name => fs.readFileSync(`${__dirname}/../${name}`, 'utf8'));
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
  let now = 0, inputHz = 442, stopped = false, frameId = 0;
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
    ResizeObserver: class { observe() {} },
    requestAnimationFrame(callback) { frames.set(++frameId,callback); return frameId; },
    cancelAnimationFrame(id) { frames.delete(id); }
  });
  for (const script of scripts) vm.runInContext(script, context);
  return {
    events,
    dispatch: (type, detail) => context.window.dispatchEvent(new context.CustomEvent(type, {detail})),
    on: (type, fn) => context.window.addEventListener(type, fn),
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

test('starts with an empty staff and tuning controls without sheet import or editing', () => {
  const app = fixture();
  assert.equal(app.elements.note.textContent, '—');
  assert.equal(app.paths(), '');
  assert.equal(app.elements.a4.value, '440');
  assert.equal(app.elements.clef.value, 'treble');
  assert.equal(app.elements['sheet-upload'], undefined);
  assert.equal(app.elements['sheet-camera'], undefined);
  assert.doesNotMatch(fragment, /Upload sheet photo|Take photo|Open MusicXML|Load sample sheet|New sheet|photo conversion|100 MB|sheet-controller|composer-controller|omr-worker/);
  assert.doesNotMatch(fragment, /Demo|Detune|Open strings|Play reference|Played pitch|Written notes/);
});

test('only fresh microphone samples emit pitch events, with silence reported separately', async () => {
  const app = fixture();
  await app.start(); app.play(440, 350);
  assert.ok(app.events.some(e => e.type === 'vp:pitch' && e.detail.pitch?.midi === 69));
  const count = app.events.length;
  app.setA4(442); app.setA4(440); app.setClef('bass');
  assert.equal(app.events.length, count);
  app.play(0, 300);
  assert.equal(app.events.filter(e => e.type === 'vp:pitch').at(-1).detail.pitch, null);
  await app.stop(); assert.equal(app.events.at(-1).detail.active, false);
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

test('pitch trace toggle only hides the curves while note history, tuning and live input continue', async () => {
  const app = fixture(); await app.start(); app.play(440, 2000); app.play(P.frequency(72), 2000);
  const notes = () => app.nodes().filter(n => n.attributes['data-event-id']);
  const visibleNotes = JSON.stringify(notes());
  const originalTrace = app.paths(), originalHeight = app.elements.staff.attributes.height;
  const originalPitchY = app.pitchY();
  assert.ok(app.paths());
  assert.ok(notes().some(n => n.attributes['data-event-id'] !== 'current'));
  app.elements['trail-toggle'].checked = false;
  app.elements['trail-toggle'].listeners.change();
  assert.equal(app.paths(), '');
  assert.equal(JSON.stringify(notes()), visibleNotes, 'existing notes and their positions remain unchanged');
  assert.equal(app.elements.staff.attributes.height, originalHeight);
  assert.equal(app.pitchY(), originalPitchY);
  app.play(442, 1800);
  assert.equal(app.paths(), ''); assert.equal(app.elements.note.textContent, 'A4');
  assert.ok(notes().some(n => n.attributes['data-note'] === 'C5'), 'new history keeps appearing while lines are hidden');
  assert.notEqual(JSON.stringify(notes()), visibleNotes, 'notes keep scrolling');
  assert.ok(Number.isFinite(app.pitchY()), 'the current pitch marker remains visible');
  app.setA4(415); assert.equal(app.elements.note.textContent, 'A♯4'); assert.equal(app.paths(), '');
  assert.ok(Number.isFinite(app.pitchY()));
  app.setA4(440);
  const continuedNotes = JSON.stringify(notes());
  app.elements['trail-toggle'].checked = true;
  app.elements['trail-toggle'].listeners.change();
  assert.ok(app.paths(), 'turning lines on immediately shows the current recorded window');
  assert.notEqual(app.paths(), originalTrace);
  assert.equal(JSON.stringify(notes()), continuedNotes, 'turning lines on preserves all notes');
  assert.equal(app.stopped, false);
  app.play(440, 8500);
  assert.equal(notes().some(n => n.attributes['data-note'] === 'C5'), false, 'old notes still expire normally');
  await app.stop();
});

test('click, Enter and Space switch staff without restarting the mic or changing the pitch', async () => {
  const app = fixture(); await app.start(); app.play(P.frequency(48));
  app.elements.staff.listeners.click();
  assert.equal(app.elements.clef.value, 'bass'); assert.equal(app.elements.note.textContent, 'C3');
  assert.match(app.elements.staff.attributes['aria-label'], /Switch to treble staff/);
  let prevented = 0;
  app.elements.staff.listeners.keydown({ key: 'Enter', preventDefault() { prevented++; } });
  assert.equal(app.elements.clef.value, 'treble');
  app.elements.staff.listeners.keydown({ key: ' ', preventDefault() { prevented++; } });
  assert.equal(app.elements.clef.value, 'bass'); assert.equal(prevented, 2);
  app.elements.staff.listeners.keydown({ key: ' ', repeat: true, preventDefault() {} });
  assert.equal(app.elements.clef.value, 'bass');
  assert.equal(app.stopped, false); assert.equal(app.elements.note.textContent, 'C3');
  assert.doesNotMatch(fragment, /vp-mode-sheet|vp-follow-toggle|practice-staff\.js|chord-listener\.js/);
});
