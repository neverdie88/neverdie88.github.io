// Build dynamic sidebar TOC from article headings (h2/h3)
document.addEventListener('DOMContentLoaded', function () {
  const article = document.querySelector('.guide-content');
  const toc = document.querySelector('.guide-toc');
  if (!article || !toc) return;

  // Track the current dragged section id as a fallback when DataTransfer is blocked
  let currentDragId = null;

  // CSS.escape polyfill (for older browsers)
  if (!window.CSS || !CSS.escape) {
    window.CSS = window.CSS || {};
    CSS.escape = function (s) {
      return String(s).replace(/[^a-zA-Z0-9_\-]/g, '\\$&');
    };
  }

  const headings = article.querySelectorAll('h2, h3');
  if (!headings.length) {
    toc.innerHTML = '<li class="muted">No sections</li>';
    return;
  }

  const slugify = (s) =>
    s.toLowerCase()
     .trim()
     .replace(/[^\w\s-]/g, '')
     .replace(/\s+/g, '-');

  const used = new Set();

  headings.forEach((h) => {
    let id = h.getAttribute('id');
    if (!id) {
      const base = slugify(h.textContent || h.innerText || '');
      let unique = base || 'section';
      let i = 2;
      while (used.has(unique) || document.getElementById(unique)) {
        unique = base + '-' + i++;
      }
      id = unique;
      h.id = id;
    }
    used.add(id);

    const li = document.createElement('li');
    if (h.tagName === 'H3') {
      li.style.marginLeft = '1rem'; // indent second level
    }
    const a = document.createElement('a');
    a.href = '#' + id;
    a.textContent = h.textContent || h.innerText || id;

    // Make TOC entries draggable
    a.dataset.sectionId = id;
    a.setAttribute('draggable', 'true');
    a.addEventListener('dragstart', (e) => {
      currentDragId = id;
      try { e.dataTransfer.setData('text/plain', id); } catch (_) {}
      e.dataTransfer.effectAllowed = 'copy';
    });

    li.appendChild(a);
    toc.appendChild(li);
  });

  // Floating box drop: create a text box where user drops
  const dropTarget = document.body;
  const highlightOn = () => dropTarget.classList.add('drop-target');
  const highlightOff = () => dropTarget.classList.remove('drop-target');

  let zCounter = 20;

  dropTarget.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    highlightOn();
  });

  dropTarget.addEventListener('dragleave', () => { highlightOff(); });

  dropTarget.addEventListener('drop', (e) => {
    e.preventDefault();
    highlightOff();

    let id = '';
    try { id = e.dataTransfer.getData('text/plain'); } catch (_) {}
    if (!id) { id = currentDragId; }
    currentDragId = null;
    if (!id) return;

    const content = collectSectionNodes(id);
    if (!content) return;

    const box = createFloatBox(content.title, content.nodes);
    dropTarget.appendChild(box);

    // Initial size
    const defaultW = Math.min(420, document.documentElement.clientWidth);
    const defaultH = Math.min(300, document.documentElement.clientHeight);

    // Position box centered at drop point (viewport coordinates), clamped to viewport
    const viewportW = document.documentElement.clientWidth;
    const viewportH = document.documentElement.clientHeight;

    let left = e.clientX - defaultW / 2;
    let top  = e.clientY - 40; // account for header/title height

    const minLeft = 0;
    const maxLeft = viewportW - defaultW;
    const minTop  = 0;
    const maxTop  = viewportH - defaultH;

    left = Math.max(minLeft, Math.min(left, maxLeft));
    top  = Math.max(minTop,  Math.min(top,  maxTop));

    box.style.left = left + 'px';
    box.style.top  = top  + 'px';
    box.style.width  = defaultW + 'px';
    box.style.height = defaultH + 'px';
    box.style.zIndex = (++zCounter).toString();
  });

  function createFloatBox(title, nodes) {
    const box = document.createElement('div');
    box.className = 'float-box';
    box.style.left = '0px';
    box.style.top = '0px';

    const header = document.createElement('div');
    header.className = 'float-header';

    const titleEl = document.createElement('div');
    titleEl.className = 'float-title';
    titleEl.textContent = title;

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'float-close';
    close.textContent = 'Close';
    close.addEventListener('click', () => box.remove());

    header.appendChild(titleEl);
    header.appendChild(close);

    const body = document.createElement('div');
    body.className = 'float-body';
    nodes.forEach(n => body.appendChild(n));

    box.appendChild(header);
    box.appendChild(body);

    // Drag-move behavior via header
    enableDragMove(box, header);
    // Add visible resize handles on edges and corners
    addResizeHandles(box);

    // Bring to front on mousedown
    box.addEventListener('mousedown', () => box.style.zIndex = (++zCounter).toString());

    return box;
  }

  function enableDragMove(box, handle) {
    let dragging = false;
    let startX = 0, startY = 0, startLeft = 0, startTop = 0;

    const onMouseDown = (e) => {
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseFloat(box.style.left || '0');
      startTop  = parseFloat(box.style.top  || '0');
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!dragging) return;

      const viewportW = document.documentElement.clientWidth;
      const viewportH = document.documentElement.clientHeight;
      const boxRect = box.getBoundingClientRect();

      let newLeft = startLeft + (e.clientX - startX);
      let newTop  = startTop  + (e.clientY - startY);

      // Clamp within current viewport (position: fixed uses viewport coords)
      const minLeft = 0;
      const maxLeft = viewportW - boxRect.width;
      const minTop  = 0;
      const maxTop  = viewportH - boxRect.height;

      newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
      newTop  = Math.max(minTop,  Math.min(newTop,  maxTop));

      box.style.left = newLeft + 'px';
      box.style.top  = newTop  + 'px';
    };

    const onMouseUp = () => {
      dragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    handle.addEventListener('mousedown', onMouseDown);
  }

  function addResizeHandles(box) {
    const handles = ['n','s','e','w','ne','nw','se','sw'];
    handles.forEach(dir => {
      const h = document.createElement('div');
      h.className = 'resizer ' + dir;
      box.appendChild(h);
    });

    const minW = 240;
    const minH = 160;

    function startResize(e, dir) {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const rect = box.getBoundingClientRect();
      const startLeft = rect.left;
      const startTop  = rect.top;
      const startW = rect.width;
      const startH = rect.height;

      const onMove = (ev) => {
        ev.preventDefault();
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;

        let newLeft = startLeft;
        let newTop  = startTop;
        let newW = startW;
        let newH = startH;

        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;

        const applyClamp = () => {
          // clamp sizes
          newW = Math.max(minW, Math.min(newW, vw));
          newH = Math.max(minH, Math.min(newH, vh));
          // clamp positions so box stays in viewport
          newLeft = Math.max(0, Math.min(newLeft, vw - newW));
          newTop  = Math.max(0, Math.min(newTop,  vh - newH));
        };

        // Horizontal adjustments
        if (dir.includes('e')) {
          newW = startW + dx;
        }
        if (dir.includes('w')) {
          newW = startW - dx;
          newLeft = startLeft + dx;
        }
        // Vertical adjustments
        if (dir.includes('s')) {
          newH = startH + dy;
        }
        if (dir.includes('n')) {
          newH = startH - dy;
          newTop = startTop + dy;
        }

        applyClamp();
        box.style.left = newLeft + 'px';
        box.style.top  = newTop  + 'px';
        box.style.width  = newW + 'px';
        box.style.height = newH + 'px';
      };

      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    }

    // attach events
    box.querySelectorAll('.resizer').forEach(h => {
      const dir = Array.from(h.classList).find(c => ['n','s','e','w','ne','nw','se','sw'].includes(c));
      h.addEventListener('mousedown', (e) => startResize(e, dir || 'e'));
    });
  }

  function collectSectionNodes(id) {
    const heading = article.querySelector('#' + CSS.escape(id));
    if (!heading) return null;
    const nodes = [];
    nodes.push(heading.cloneNode(true));
    let node = heading.nextElementSibling;
    while (node && !/^H2$/i.test(node.tagName)) {
      nodes.push(node.cloneNode(true));
      node = node.nextElementSibling;
    }
    return { title: heading.textContent || heading.innerText || 'Section', nodes };
  }

});
