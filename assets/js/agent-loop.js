import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs";

// Match Markup Studio's neutral theme and spacious flowchart rendering.
const mermaidConfig = (layout) => ({
  startOnLoad: false,
  theme: "neutral",
  htmlLabels: true,
  layout,
  elk: { mergeEdges: false, nodePlacementStrategy: "LINEAR_SEGMENTS" },
  flowchart: {
    useMaxWidth: false,
    nodeSpacing: 90,
    rankSpacing: 120,
    wrappingWidth: 140,
    curve: "linear",
    padding: 28,
  },
});

let renderQueue = Promise.resolve();
let renderNumber = 0;

function createDiagram(code) {
  const source = code.textContent;
  const container = document.createElement("div");
  container.className = "mermaid-document";
  container.innerHTML = `
    <div class="mermaid-zoom">
      <div class="mermaid-controls" role="group" aria-label="Diagram controls">
        <div class="mermaid-control-group">
          <label class="mermaid-control-field">Layout
            <select data-setting="layout">
              <option value="elk">Spacious (ELK)</option>
              <option value="dagre">Compact (Dagre)</option>
            </select>
          </label>
          <label class="mermaid-control-field">Direction
            <select data-setting="direction">
              <option value="source">Source default</option>
              <option value="TB">Top to bottom</option>
              <option value="LR">Left to right</option>
              <option value="BT">Bottom to top</option>
              <option value="RL">Right to left</option>
            </select>
          </label>
        </div>
        <div class="mermaid-control-group">
          <button type="button" data-action="out" aria-label="Zoom out">−</button>
          <button type="button" data-action="reset" title="Reset to actual size" aria-label="Reset zoom to 100 percent">100%</button>
          <button type="button" data-action="fit" aria-pressed="true">Fit</button>
          <button type="button" data-action="width" aria-pressed="false">Width</button>
          <button type="button" data-action="in" aria-label="Zoom in">+</button>
          <button type="button" data-action="expand" aria-label="Expand diagram to fullscreen">Expand</button>
        </div>
      </div>
      <div class="mermaid-canvas">
        <div class="mermaid-viewport" tabindex="0" role="region" aria-label="Complete control flow diagram; use arrow keys to pan">
          <div class="mermaid-stage"></div>
        </div>
        <button type="button" class="mermaid-overview" aria-label="Diagram overview: click to navigate" hidden>
          <span class="mermaid-overview-content">
            <img class="mermaid-overview-image" alt="" draggable="false">
            <span class="mermaid-overview-frame"></span>
          </span>
        </button>
      </div>
      <p class="mermaid-hint">Drag to pan · Scroll to zoom · Expand for a larger view</p>
      <p class="mermaid-message" role="status" hidden></p>
    </div>`;

  const fallback = code.parentElement.cloneNode(true);
  fallback.hidden = true;
  container.append(fallback);
  code.parentElement.replaceWith(container);

  const wrap = container.querySelector(".mermaid-zoom");
  const viewport = container.querySelector(".mermaid-viewport");
  const stage = container.querySelector(".mermaid-stage");
  const message = container.querySelector(".mermaid-message");
  const layout = container.querySelector('[data-setting="layout"]');
  const direction = container.querySelector('[data-setting="direction"]');
  const buttons = Object.fromEntries([...container.querySelectorAll("[data-action]")]
    .map((button) => [button.dataset.action, button]));
  const controls = container.querySelectorAll(".mermaid-controls button, .mermaid-controls select");
  const overview = container.querySelector(".mermaid-overview");
  const overviewImage = container.querySelector(".mermaid-overview-image");
  const overviewFrame = container.querySelector(".mermaid-overview-frame");

  let svg;
  let baseWidth = 1;
  let baseHeight = 1;
  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let mode = "fit";
  let successfulSettings = { layout: "elk", direction: "source" };
  let drag;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function updateOverview() {
    if (!svg) return;
    const show = stage.offsetWidth > viewport.clientWidth * 1.1 || stage.offsetHeight > viewport.clientHeight * 1.1;
    overview.hidden = !show;
    if (!show) return;
    const area = overview.firstElementChild;
    const ratio = Math.min(area.clientWidth / baseWidth, area.clientHeight / baseHeight);
    const left = (area.clientWidth - baseWidth * ratio) / 2;
    const top = (area.clientHeight - baseHeight * ratio) / 2;
    Object.assign(overviewImage.style, {
      width: `${baseWidth * ratio}px`, height: `${baseHeight * ratio}px`,
      left: `${left}px`, top: `${top}px`,
    });
    const x = clamp((viewport.scrollLeft - offsetX) / scale, 0, baseWidth);
    const y = clamp((viewport.scrollTop - offsetY) / scale, 0, baseHeight);
    const right = clamp((viewport.scrollLeft + viewport.clientWidth - offsetX) / scale, 0, baseWidth);
    const bottom = clamp((viewport.scrollTop + viewport.clientHeight - offsetY) / scale, 0, baseHeight);
    Object.assign(overviewFrame.style, {
      left: `${left + x * ratio}px`, top: `${top + y * ratio}px`,
      width: `${(right - x) * ratio}px`, height: `${(bottom - y) * ratio}px`,
    });
  }

  function applyScale(next, anchorX = viewport.clientWidth / 2, anchorY = viewport.clientHeight / 2) {
    if (!svg) return;
    const pointX = (viewport.scrollLeft + anchorX - offsetX) / scale;
    const pointY = (viewport.scrollTop + anchorY - offsetY) / scale;
    // Fit must accommodate this large graph even on a narrow phone screen.
    scale = clamp(next, 0.01, 8);
    const width = Math.max(baseWidth * scale, viewport.clientWidth);
    const height = Math.max(baseHeight * scale, viewport.clientHeight);
    offsetX = (width - baseWidth * scale) / 2;
    offsetY = (height - baseHeight * scale) / 2;
    Object.assign(stage.style, { width: `${width}px`, height: `${height}px` });
    Object.assign(svg.style, {
      width: `${baseWidth * scale}px`, height: `${baseHeight * scale}px`,
      left: `${offsetX}px`, top: `${offsetY}px`,
    });
    viewport.scrollLeft = pointX * scale + offsetX - anchorX;
    viewport.scrollTop = pointY * scale + offsetY - anchorY;
    buttons.reset.textContent = `${Math.round(scale * 100)}%`;
    buttons.fit.setAttribute("aria-pressed", String(mode === "fit"));
    buttons.width.setAttribute("aria-pressed", String(mode === "width"));
    updateOverview();
  }

  function fit() {
    const widthScale = Math.max(1, viewport.clientWidth - 48) / baseWidth;
    const heightScale = Math.max(1, viewport.clientHeight - 48) / baseHeight;
    applyScale(mode === "width" ? widthScale : Math.min(widthScale, heightScale));
    viewport.scrollLeft = (stage.offsetWidth - viewport.clientWidth) / 2;
    viewport.scrollTop = mode === "width" ? 0 : (stage.offsetHeight - viewport.clientHeight) / 2;
    updateOverview();
  }

  function render() {
    const settings = { layout: layout.value, direction: direction.value };
    controls.forEach((control) => { control.disabled = true; });
    message.hidden = false;
    message.textContent = "Rendering diagram…";
    viewport.setAttribute("aria-busy", "true");
    // Mermaid's configuration is global, so renders must run sequentially.
    renderQueue = renderQueue.then(async () => {
      try {
        mermaid.initialize(mermaidConfig(settings.layout));
        const directed = settings.direction === "source" ? source : source.replace(
          /^(\s*)(flowchart|graph)\s+(TB|TD|BT|LR|RL)\b/m, `$1$2 ${settings.direction}`,
        );
        const result = await mermaid.render(`agent-loop-diagram-${++renderNumber}`, directed);
        const rendered = document.createElement("div");
        rendered.innerHTML = result.svg;
        const nextSvg = rendered.querySelector("svg");
        const box = nextSvg?.viewBox.baseVal;
        if (!box?.width || !box.height) throw new Error("Missing diagram dimensions");
        baseWidth = box.width;
        baseHeight = box.height;
        svg = nextSvg;
        svg.removeAttribute("style");
        svg.setAttribute("aria-label", "Complete Codex agent control flow");
        stage.replaceChildren(svg);
        result.bindFunctions?.(stage);

        const thumbnail = svg.cloneNode(true);
        thumbnail.setAttribute("width", baseWidth);
        thumbnail.setAttribute("height", baseHeight);
        thumbnail.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        overviewImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(thumbnail))}`;
        successfulSettings = settings;
        mode = "fit";
        fallback.hidden = true;
        message.hidden = true;
        fit();
      } catch (error) {
        layout.value = successfulSettings.layout;
        direction.value = successfulSettings.direction;
        fallback.hidden = Boolean(svg);
        message.textContent = svg
          ? "This layout could not render. The previous diagram is still available."
          : "The diagram could not render. Its original source is shown below; reload to try again.";
        console.error("Could not render the agent loop diagram", error);
      } finally {
        controls.forEach((control) => { control.disabled = !svg && control.tagName === "BUTTON"; });
        buttons.expand.hidden = !document.fullscreenEnabled;
        viewport.setAttribute("aria-busy", "false");
      }
    });
  }

  layout.addEventListener("change", render);
  direction.addEventListener("change", render);
  buttons.fit.addEventListener("click", () => { mode = "fit"; fit(); });
  buttons.width.addEventListener("click", () => { mode = "width"; fit(); });
  buttons.reset.addEventListener("click", () => {
    mode = "free";
    applyScale(1);
    viewport.scrollLeft = (stage.offsetWidth - viewport.clientWidth) / 2;
    viewport.scrollTop = (stage.offsetHeight - viewport.clientHeight) / 2;
    updateOverview();
  });
  for (const [action, multiplier] of [["in", 1.15], ["out", 1 / 1.15]]) {
    buttons[action].addEventListener("click", () => { mode = "free"; applyScale(scale * multiplier); });
  }
  buttons.expand.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement === wrap) await document.exitFullscreen();
      else await wrap.requestFullscreen();
    } catch {
      message.hidden = false;
      message.textContent = "Fullscreen is unavailable in this browser. You can still zoom and pan here.";
    }
  });
  document.addEventListener("fullscreenchange", () => {
    const expanded = document.fullscreenElement === wrap;
    buttons.expand.textContent = expanded ? "Exit" : "Expand";
    buttons.expand.setAttribute("aria-label", expanded ? "Exit fullscreen" : "Expand diagram to fullscreen");
    mode = "fit";
    fit();
  });
  viewport.addEventListener("wheel", (event) => {
    if (!svg) return;
    event.preventDefault();
    const rect = viewport.getBoundingClientRect();
    const units = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1;
    mode = "free";
    applyScale(scale * Math.exp(-event.deltaY * units * 0.0015), event.clientX - rect.left, event.clientY - rect.top);
  }, { passive: false });
  viewport.addEventListener("pointerdown", (event) => {
    if (!svg || event.button !== 0 || event.pointerType === "touch") return;
    viewport.focus({ preventScroll: true });
    drag = { x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("dragging");
    event.preventDefault();
  });
  viewport.addEventListener("pointermove", (event) => {
    if (!drag) return;
    viewport.scrollLeft = drag.left - (event.clientX - drag.x);
    viewport.scrollTop = drag.top - (event.clientY - drag.y);
  });
  viewport.addEventListener("lostpointercapture", () => {
    drag = null;
    viewport.classList.remove("dragging");
  });
  viewport.addEventListener("scroll", updateOverview, { passive: true });
  viewport.addEventListener("keydown", (event) => {
    if (["+", "=", "-", "0"].includes(event.key)) {
      event.preventDefault();
      buttons[event.key === "0" ? "fit" : event.key === "-" ? "out" : "in"].click();
    }
  });
  overview.addEventListener("click", (event) => {
    if (!event.detail) { mode = "fit"; fit(); return; }
    const rect = overviewImage.getBoundingClientRect();
    viewport.scrollLeft = offsetX + clamp((event.clientX - rect.left) / rect.width, 0, 1) * baseWidth * scale - viewport.clientWidth / 2;
    viewport.scrollTop = offsetY + clamp((event.clientY - rect.top) / rect.height, 0, 1) * baseHeight * scale - viewport.clientHeight / 2;
  });
  new ResizeObserver(() => {
    if (!svg) return;
    if (mode === "free") applyScale(scale);
    else fit();
  }).observe(viewport);
  render();
}

document.querySelectorAll("pre code.language-mermaid").forEach(createDiagram);
