/* Fullscreen sheet controls, with an expanded dialog when the API is unavailable. */
(function () {
  'use strict';
  const root = document.querySelector('[data-music-app]');
  const buttons = [...root.querySelectorAll('[data-vp-fullscreen]')];
  let expanded = null, busy = false;
  const nativeElement = () => document.fullscreenElement || document.webkitFullscreenElement;
  const activeElement = () => nativeElement() || expanded?.target;

  function sync() {
    const active = activeElement();
    for (const button of buttons) {
      const on = active?.id === button.dataset.vpFullscreen;
      const action = on ? 'Exit fullscreen' : 'Enter fullscreen';
      button.setAttribute('aria-pressed', String(on));
      button.setAttribute('aria-label', `${action}: ${button.dataset.fullscreenLabel}`);
      button.title = action;
    }
  }
  function expand(target) {
    const dialog = document.createElement('dialog');
    dialog.className = 'vp-fullscreen-dialog';
    dialog.setAttribute('aria-label', target.getAttribute('aria-label') || 'Live pitch staff');
    const marker = document.createComment('Expanded sheet');
    target.before(marker);
    root.append(dialog);
    dialog.append(target);
    target.classList.add('vp-expanded-sheet');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    expanded = { target, dialog };
    dialog.addEventListener('close', () => {
      marker.replaceWith(target);
      target.classList.remove('vp-expanded-sheet');
      dialog.remove();
      document.body.style.overflow = previousOverflow;
      expanded = null;
      sync();
      buttons.find(button => button.dataset.vpFullscreen === target.id)?.focus();
    }, { once: true });
    dialog.showModal();
    sync();
  }
  async function exit() {
    if (expanded) expanded.dialog.close();
    else if (nativeElement()) {
      const leave = document.exitFullscreen || document.webkitExitFullscreen;
      await leave?.call(document);
    }
    sync();
  }
  for (const button of buttons) button.addEventListener('click', async () => {
    if (busy) return;
    busy = true;
    try {
      if (activeElement()) await exit();
      else {
        const target = document.getElementById(button.dataset.vpFullscreen);
        const request = target.requestFullscreen || target.webkitRequestFullscreen;
        if (request) {
          try { await request.call(target); }
          catch { expand(target); }
        } else expand(target);
        sync();
        button.focus();
      }
    } finally { busy = false; }
  });
  // Close an expanded sheet before hiding it or opening the editor's own dialog.
  for (const id of ['vp-score-remove', 'vp-sheet-remove', 'vp-score-edit']) {
    document.getElementById(id)?.addEventListener('click', () => { void exit(); });
  }
  document.addEventListener('fullscreenchange', sync);
  document.addEventListener('webkitfullscreenchange', sync);
  sync();
})();
