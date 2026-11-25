/* Static Theme Toggle (Dark/Light) & Browser SpeechSynthesis Helper for GitHub Pages */
(function () {
  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
  function applyTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('pca_hub_theme', 'dark'); } catch (e) {}
    } else {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem('pca_hub_theme', 'light'); } catch (e) {}
    }
    document.querySelectorAll('.theme-toggle-btn').forEach(function (btn) {
      btn.textContent = dark ? '☀️ Light' : '🌙 Dark';
      btn.title = dark ? 'Switch to Light Mode (Option+D)' : 'Switch to Dark Mode (Option+D)';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var rightBar = document.querySelector('.topbar-right');
    if (rightBar && !rightBar.querySelector('.theme-toggle-btn')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'top-btn theme-toggle-btn';
      btn.addEventListener('click', function () { applyTheme(!isDark()); });
      rightBar.appendChild(btn);
    }
    applyTheme(isDark());
  });

  window.addEventListener('keydown', function (e) {
    if (e.altKey && (e.code === 'KeyD' || e.key === '∂' || e.key === 'd' || e.key === 'D')) {
      e.preventDefault();
      applyTheme(!isDark());
    }
  });

  var activeKey = null;
  var activeBtn = null;
  var activeDefaultLabel = '';

  function resetActiveBtn() {
    if (activeBtn) {
      activeBtn.textContent = activeDefaultLabel || '🔊 Speak';
      activeBtn.classList.remove('playing');
    }
    activeKey = null;
    activeBtn = null;
  }

  function speakText(text, opts) {
    opts = opts || {};
    if (!('speechSynthesis' in window)) return;
    if (activeKey && activeKey === opts.targetKey) {
      window.speechSynthesis.cancel();
      resetActiveBtn();
      return;
    }
    window.speechSynthesis.cancel();
    resetActiveBtn();
    var clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    var u = new SpeechSynthesisUtterance(clean.slice(0, 6000));
    u.rate = 1.05;
    activeKey = opts.targetKey || 'tts';
    activeBtn = opts.anchorBtn || null;
    activeDefaultLabel = opts.defaultBtnText || (activeBtn ? activeBtn.textContent : '🔊 Speak');
    if (activeBtn) {
      activeBtn.textContent = '⏹ Stop';
      activeBtn.classList.add('playing');
    }
    u.onend = resetActiveBtn;
    u.onerror = resetActiveBtn;
    window.speechSynthesis.speak(u);
  }

  window.GeminiReader = {
    readPlainText: function (text, opts) { speakText(text, opts); },
    readElement: function (el, opts) {
      if (!el) return;
      var clone = el.cloneNode(true);
      clone.querySelectorAll('.gemini-reader-ignore').forEach(function (n) { n.remove(); });
      speakText(clone.innerText || clone.textContent || '', opts);
    },
    stop: function () {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      resetActiveBtn();
    }
  };
})();
