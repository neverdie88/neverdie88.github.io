const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '../pitch-visualizer/sheet-photo.js'), 'utf8');
const html = fs.readFileSync(path.join(__dirname, '../pitch-visualizer/index.html'), 'utf8');
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};

// Exercise real event handlers, with controllable image decoding and camera
// permission promises. This catches late grants/replacements without hardware.
function fixture({ camera, decode, nativeOnly = false } = {}) {
  const elements = {}, windowEvents = {}, documentEvents = {};
  const urls = new Map(), revoked = [], canvases = [], requests = [];
  let nextURL = 0;
  const track = { stopped: false, listeners: {}, stop() { this.stopped = true; }, addEventListener(type, fn) { this.listeners[type] = fn; } };
  const stream = { getTracks: () => [track], getVideoTracks: () => [track] };
  for (const [, id] of html.matchAll(/\bid="vp-([^"]+)"/g)) {
    elements[id] = {
      id, hidden: true, disabled: false, textContent: '', value: '', style: {}, files: [], open: false,
      listeners: {}, classes: new Set(), clicks: 0, scrollTop: 0, scrollLeft: 0,
      classList: { add(name) { elements[id].classes.add(name); }, remove(name) { elements[id].classes.delete(name); } },
      addEventListener(type, fn) { this.listeners[type] = fn; },
      fire(type, event = {}) { return this.listeners[type]?.(event); },
      click() { this.clicks++; return this.fire('click'); },
      focus() { this.focused = true; },
      removeAttribute(name) { delete this[name]; },
      showModal() { this.open = true; },
      close() { this.open = false; this.fire('close'); },
      videoWidth: 2560, videoHeight: 1920,
      async play() { this.fire('loadeddata'); }
    };
  }
  const document = {
    hidden: false,
    getElementById: id => elements[id.slice(3)],
    addEventListener(type, fn) { documentEvents[type] = fn; },
    createElement(tag) {
      assert.equal(tag, 'canvas');
      const drawing = { width: 0, height: 0, operations: [] };
      drawing.getContext = () => Object.fromEntries(['fillRect', 'translate', 'rotate', 'drawImage'].map(name => [name, (...args) => drawing.operations.push([name, ...args])]));
      drawing.toBlob = fn => fn({ type: 'image/jpeg', size: 1000, width: drawing.width, height: drawing.height });
      canvases.push(drawing);
      return drawing;
    }
  };
  const context = vm.createContext({
    document,
    window: { addEventListener(type, fn) { windowEvents[type] = fn; } },
    navigator: { mediaDevices: nativeOnly ? undefined : { async getUserMedia(options) {
      requests.push(options);
      return camera ? camera() : stream;
    } } },
    URL: {
      createObjectURL(blob) { const url = `blob:test/${++nextURL}`; urls.set(url, blob); return url; },
      revokeObjectURL(url) { revoked.push(url); }
    },
    Image: class {
      async decode() {
        const file = urls.get(this.src);
        if (decode) await decode(file);
        if (file.corrupt) throw new Error('Invalid image');
        this.naturalWidth = file.width || 2400;
        this.naturalHeight = file.height || 3200;
      }
    },
    File: class { constructor(parts, name, options) { Object.assign(this, parts[0], options, { name }); } }
  });
  vm.runInContext(source, context);
  return {
    elements, track, stream, urls, revoked, canvases, requests,
    click: id => elements[id].click(),
    async upload(file, id = 'sheet-file') { elements[id].files = file ? [file] : []; elements[id].value = file?.name || ''; await elements[id].fire('change'); },
    background() { document.hidden = true; documentEvents.visibilitychange(); },
    leave() { windowEvents.pagehide(); }
  };
}
const photo = (name = 'Sheet.jpg', extra = {}) => ({ name, type: 'image/jpeg', size: 1000, ...extra });

test('upload opens a local reference, supports zoom/rotation, and releases removed images', async () => {
  const app = fixture();
  app.click('sheet-upload');
  assert.equal(app.elements['sheet-file'].clicks, 1);
  await app.upload(photo('Practice.jpg', { width: 5000, height: 6000 }));
  assert.equal(app.elements['sheet-panel'].hidden, false);
  assert.equal(app.elements['sheet-file'].value, '');
  assert.equal(app.elements['sheet-name'].textContent, 'Practice.jpg');
  assert.ok(app.elements.practice.classes.has('vp-has-sheet'));
  assert.equal(app.canvases[0].height, 4096);
  for (let i = 0; i < 12; i++) app.click('sheet-zoom-in');
  assert.equal(app.elements['sheet-image'].style.width, '300%');
  assert.equal(app.elements['sheet-zoom-in'].disabled, true);
  app.click('sheet-fit');
  assert.equal(app.elements['sheet-image'].style.width, '100%');
  assert.equal(app.elements['sheet-zoom-out'].disabled, true);
  const previous = app.elements['sheet-image'].src;
  await app.click('sheet-rotate');
  assert.equal(app.canvases[1].width, app.canvases[0].height);
  assert.equal(app.canvases[1].height, app.canvases[0].width);
  assert.ok(app.revoked.includes(previous));
  const latest = app.elements['sheet-image'].src;
  app.click('sheet-remove');
  assert.equal(app.elements['sheet-panel'].hidden, true);
  assert.equal(app.elements['sheet-image'].src, undefined);
  assert.ok(app.revoked.includes(latest));
  assert.ok(app.elements['sheet-upload'].focused);
  assert.equal(app.requests.length, 0);
});

test('invalid, oversized, corrupt, and canceled selections preserve the existing sheet', async () => {
  const app = fixture();
  await app.upload(photo());
  const original = app.elements['sheet-image'].src;
  for (const invalid of [photo('score.pdf', { type: 'application/pdf' }), photo('huge.jpg', { size: 31 * 1024 * 1024 }), photo('broken.jpg', { corrupt: true })]) {
    await app.upload(invalid);
    assert.equal(app.elements['sheet-image'].src, original);
    assert.equal(app.elements['sheet-error'].hidden, false);
    assert.equal(app.elements['sheet-status'].hidden, true);
  }
  await app.upload(null);
  assert.equal(app.elements['sheet-image'].src, original);
});

test('a late image decode cannot replace a newer selection or restore a removed sheet', async () => {
  const pending = deferred();
  const app = fixture({ decode: file => file.name === 'slow.jpg' ? pending.promise : undefined });
  const slow = app.upload(photo('slow.jpg'));
  await app.upload(photo('latest.jpg'));
  pending.resolve();
  await slow;
  assert.equal(app.elements['sheet-name'].textContent, 'latest.jpg');
  const waiting = deferred();
  const other = fixture({ decode: () => waiting.promise });
  const opening = other.upload(photo());
  other.click('sheet-remove');
  waiting.resolve();
  await opening;
  assert.equal(other.elements['sheet-panel'].hidden, true);
  assert.equal(other.elements['sheet-image'].src, undefined);
});

test('camera uses rear-facing video without audio, captures a photo, and stops tracks', async () => {
  const app = fixture();
  await app.click('sheet-camera');
  assert.equal(app.requests[0].audio, false);
  assert.equal(app.requests[0].video.facingMode.ideal, 'environment');
  assert.equal(app.elements['camera-dialog'].open, true);
  assert.equal(app.elements['camera-shutter'].disabled, false);
  await app.click('camera-shutter');
  assert.equal(app.elements['camera-dialog'].open, false);
  assert.equal(app.elements['camera-video'].srcObject, null);
  assert.ok(app.track.stopped);
  assert.equal(app.elements['sheet-name'].textContent, 'Camera photo.jpg');
  assert.equal(app.elements['sheet-panel'].hidden, false);
});

test('canceling a pending permission request stops a late stream and does not reopen the camera', async () => {
  const pending = deferred();
  const app = fixture({ camera: () => pending.promise });
  const opening = app.click('sheet-camera');
  app.click('camera-close');
  pending.resolve(app.stream);
  await opening;
  assert.equal(app.elements['camera-dialog'].open, false);
  assert.equal(app.elements['camera-video'].srcObject, null);
  assert.ok(app.track.stopped);
});

test('camera failures explain denied permission and missing hardware', async () => {
  for (const [name, text] of [['NotAllowedError', /denied/], ['NotFoundError', /No camera/], ['NotReadableError', /could not open/]]) {
    const app = fixture({ camera: async () => { throw Object.assign(new Error(), { name }); } });
    await app.click('sheet-camera');
    assert.match(app.elements['camera-error'].textContent, text);
    assert.equal(app.elements['camera-shutter'].disabled, true);
    assert.equal(app.elements['camera-status'].hidden, true);
  }
});

test('Escape, backgrounding, navigation, and camera disconnection release the video stream', async () => {
  for (const close of [app => app.elements['camera-dialog'].fire('cancel', { preventDefault() {} }), app => app.background(), app => app.leave()]) {
    const app = fixture();
    await app.click('sheet-camera');
    close(app);
    assert.ok(app.track.stopped);
    assert.equal(app.elements['camera-dialog'].open, false);
    assert.equal(app.elements['camera-video'].srcObject, null);
  }
  const app = fixture();
  await app.click('sheet-camera');
  app.track.listeners.ended();
  assert.equal(app.elements['camera-shutter'].disabled, true);
  assert.match(app.elements['camera-error'].textContent, /disconnected/);
});

test('mobile native capture fallback loads its photo through the same path', async () => {
  const app = fixture({ nativeOnly: true });
  await app.click('sheet-camera');
  assert.equal(app.elements['sheet-capture-file'].clicks, 1);
  assert.equal(app.elements['camera-dialog'].open, false);
  await app.upload(photo('Phone.jpg'), 'sheet-capture-file');
  assert.equal(app.elements['sheet-name'].textContent, 'Phone.jpg');
  const live = fixture();
  await live.click('sheet-camera');
  live.click('camera-native');
  assert.ok(live.track.stopped);
  assert.equal(live.elements['sheet-capture-file'].clicks, 1);
});
