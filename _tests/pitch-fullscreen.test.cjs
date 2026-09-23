const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync(`${__dirname}/../pitch-visualizer/index.html`, 'utf8');
const source = fs.readFileSync(`${__dirname}/../music-shared/fullscreen.js`, 'utf8');
const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
function fixture(native = true, reject = false, app = 'pitch-visualizer') {
  const page = fs.readFileSync(`${__dirname}/../${app}/index.html`, 'utf8');
  const dom = new JSDOM(page, { runScripts: 'outside-only' });
  const w = dom.window, d = w.document;
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new w.Event('close')); };
  if (native) {
    w.HTMLElement.prototype.requestFullscreen = async function () {
      if (reject) throw Error('Fullscreen unavailable');
      d.fullscreenElement = this;
      d.dispatchEvent(new w.Event('fullscreenchange'));
    };
    d.exitFullscreen = async () => { d.fullscreenElement = null; d.dispatchEvent(new w.Event('fullscreenchange')); };
  }
  w.eval(source);
  return { dom, d, w, button: id => d.querySelector(`[data-vp-fullscreen="${id}"]`) };
}
test('fullscreen buttons enter and exit each sheet, and reflect Escape exits', async () => {
  for (const id of ['vp-live-sheet', 'vp-digital-panel', 'vp-sheet-panel']) {
    const a = fixture(true, false, id === 'vp-live-sheet' ? 'pitch-visualizer' : 'sheet-music');
    const button = a.button(id);
    button.click(); await flush();
    assert.equal(a.d.fullscreenElement.id, id);
    assert.equal(button.getAttribute('aria-pressed'), 'true');
    assert.match(button.getAttribute('aria-label'), /^Exit fullscreen/);
    button.click(); await flush();
    assert.equal(a.d.fullscreenElement, null);
    assert.equal(button.getAttribute('aria-pressed'), 'false');
    button.click(); await flush(); await a.d.exitFullscreen();
    assert.equal(button.getAttribute('aria-pressed'), 'false');
    a.dom.window.close();
  }
});
test('unsupported or rejected fullscreen uses a closable dialog and restores the same sheet', async () => {
  for (const native of [false, true]) {
    const a = fixture(native, true), button = a.button('vp-live-sheet');
    const sheet = a.d.getElementById('vp-live-sheet'), parent = sheet.parentElement;
    const toggle = a.d.getElementById('vp-trail-toggle'); toggle.checked = false;
    a.d.body.style.overflow = 'clip';
    button.click(); await flush();
    const dialog = a.d.querySelector('.vp-fullscreen-dialog');
    assert.ok(dialog.open); assert.equal(sheet.parentElement, dialog);
    assert.equal(button.getAttribute('aria-pressed'), 'true');
    dialog.close(); await flush();
    assert.equal(sheet.parentElement, parent);
    assert.equal(a.d.getElementById('vp-trail-toggle'), toggle);
    assert.equal(toggle.checked, false);
    assert.equal(a.d.body.style.overflow, 'clip');
    assert.equal(a.d.activeElement, button);
    assert.equal(button.getAttribute('aria-pressed'), 'false');
    a.dom.window.close();
  }
});
test('closing or editing a sheet exits expanded view before the next action', async () => {
  for (const native of [true, false]) {
    const a = fixture(native, false, 'sheet-music');
    a.button('vp-digital-panel').click(); await flush();
    a.d.getElementById('vp-score-edit').click(); await flush();
    assert.ok(!a.d.fullscreenElement);
    assert.equal(a.d.querySelector('.vp-fullscreen-dialog'), null);
    assert.equal(a.button('vp-digital-panel').getAttribute('aria-pressed'), 'false');
    a.dom.window.close();
  }
});
