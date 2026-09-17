import {
    formatContextPacket,
    isTextBoundaryTag,
    linePosition,
    locateDiagramSelection,
    locateRenderedSelection,
    normalizedText,
} from "./selection_context.mjs";

const blockSelector = "p, h1, h2, h3, h4, h5, h6, pre, li, td, th, blockquote, figcaption";
const peerSelector = `${blockSelector}, div, ul, ol, table, thead, tbody, tfoot, tr, section, article, figure, details, summary`;
const ignoredText = "button, input, textarea, select, script, style, .table-column-resizer, .mermaid, .plantuml";
const elementOf = (node) => node?.nodeType === 1 ? node : node?.parentElement;

export function projectRenderedText(root, selectionRange = null) {
    const chunks = [];
    const separators = new Set();
    let length = 0;
    let start = null;
    let end = null;
    const preformatted = root.tagName?.toLowerCase() === "pre";
    const append = (text) => { chunks.push(text); length += text.length; };
    const separate = () => { separators.add(length); append("\n"); };
    const boundary = (node, offset) => {
        if (selectionRange?.startContainer === node && selectionRange.startOffset === offset) start = length;
        if (selectionRange?.endContainer === node && selectionRange.endOffset === offset) end = length;
    };
    function visit(node) {
        if (node.nodeType === 3) {
            const text = node.data;
            const valid = (offset) => Number.isInteger(offset) && offset >= 0 && offset <= text.length;
            if (selectionRange?.startContainer === node && valid(selectionRange.startOffset)) start = length + selectionRange.startOffset;
            if (selectionRange?.endContainer === node && valid(selectionRange.endOffset)) end = length + selectionRange.endOffset;
            append(text);
            return;
        }
        if (node.nodeType !== 1 && node.nodeType !== 11) return;
        if (node.nodeType === 1 && node.matches(ignoredText)) return;
        const block = node.nodeType === 1 && isTextBoundaryTag(node.tagName)
            && (!preformatted || node.tagName.toLowerCase() === "br");
        if (block) separate();
        boundary(node, 0);
        Array.from(node.childNodes).forEach((child, index) => {
            visit(child);
            boundary(node, index + 1);
        });
        if (block && node.tagName.toLowerCase() !== "br") separate();
    }
    visit(root);
    // Read both endpoints in one traversal: separately cloned Range fragments
    // invent opening/closing block breaks that shift partial selections.
    if (start !== null && end !== null) {
        // Block breaks separate matching text, but must not pull unselected
        // wrappers into an anchor at an element/child boundary. Real whitespace
        // from text nodes is not trimmed.
        while (start < end && separators.has(start)) start += 1;
        while (end > start && separators.has(end - 1)) end -= 1;
    }
    return { text: chunks.join(""), range: start !== null && end !== null && end > start ? { start, end } : null };
}

const cleanText = (node) => projectRenderedText(node).text;

export function locateRenderedRange({ content, range, source, decode }) {
    if (!range || !content.contains(range.startContainer) || !content.contains(range.endContainer)) return null;
    const common = elementOf(range.commonAncestorContainer);
    const candidate = common?.closest(blockSelector);
    const block = candidate && content.contains(candidate) ? candidate : common;
    if (!block || !content.contains(block)) return null;
    const { text: localSource, range: localRange } = projectRenderedText(block, range);
    if (!localRange || localRange.end <= localRange.start) return null;
    const normalizedBlock = normalizedText(localSource);
    const equivalent = Array.from(content.querySelectorAll(`${peerSelector}, ${block.tagName.toLowerCase()}`))
        .filter((peer) => !peer.closest(ignoredText) && normalizedText(cleanText(peer)) === normalizedBlock);
    // An expand frame, its body, and sometimes the editor root expose the same
    // text nodes. They are one occurrence, not separate copies in the source.
    // Keep disjoint matching subtrees in document order; genuinely repeated
    // passages still have to match the source occurrence count below.
    const equivalentSet = new Set(equivalent);
    const distinct = equivalent.filter((peer) => {
        for (let parent = peer.parentElement; parent && parent !== content; parent = parent.parentElement) {
            if (equivalentSet.has(parent)) return false;
        }
        return true;
    });
    const occurrence = distinct.findIndex((peer) => peer.contains(block));
    const location = occurrence >= 0 ? locateRenderedSelection({
        source, blockText: localSource, ...localRange,
        occurrence, occurrenceCount: distinct.length, decode, preserveWhitespace: block.tagName.toLowerCase() === "pre",
    }) : null;
    return { block, localSource, localRange, location };
}

function sectionAt(content, target) {
    const stack = [];
    for (const heading of content.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
        if (heading !== target && !heading.contains(target)
            && !(heading.compareDocumentPosition(target) & 4)) continue;
        const depth = Number(heading.tagName.slice(1));
        while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
        stack.push({ depth, text: normalizedText(heading.textContent) });
    }
    return stack.map((heading) => heading.text).join(" > ");
}

function blockName(content, block) {
    if (block.matches("td, th")) {
        const table = block.closest("table");
        const index = Array.from(content.querySelectorAll("table")).indexOf(table) + 1;
        return `Table ${index}, row ${block.parentElement.rowIndex + 1}, cell ${block.cellIndex + 1}`;
    }
    const peers = Array.from(content.querySelectorAll(block.tagName.toLowerCase()));
    return `${block.tagName.toLowerCase()} block ${Math.max(1, peers.indexOf(block) + 1)}`;
}

export async function writeClipboardText(text, document, host = document.body) {
    let clipboardError;
    const clipboard = document.defaultView.navigator.clipboard;
    if (clipboard?.writeText) {
        try {
            // Called directly from the menu click: keep browser user activation.
            await clipboard.writeText(text);
            return;
        } catch (error) { clipboardError = error; }
    }
    const input = document.createElement("textarea");
    input.value = text;
    input.readOnly = true;
    input.setAttribute("aria-label", "Copy selection fallback");
    input.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none";
    host.appendChild(input);
    try {
        input.focus({ preventScroll: true });
        input.select();
        if (!document.execCommand?.("copy")) throw clipboardError || new Error("Clipboard access unavailable");
    } finally {
        input.remove();
    }
}

export function createSelectionMenu({ content, sourceInput, sourceDialog, getState, onStatus = () => {} }) {
    const document = content.ownerDocument;
    const window = document.defaultView;
    const decoder = document.createElement("textarea");
    const decode = (entity) => {
        decoder.innerHTML = entity;
        return decoder.value;
    };
    const menu = document.createElement("div");
    menu.id = "selectionContextMenu";
    menu.className = "selection-context-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", "Copy selected text");
    menu.hidden = true;
    const buttons = [
        ["text", "Copy text"],
        ["context", "Copy text with context for agent"],
    ].map(([action, label]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.copyAction = action;
        button.setAttribute("role", "menuitem");
        button.textContent = label;
        menu.appendChild(button);
        return button;
    });
    const hint = document.createElement("div");
    hint.className = "selection-context-hint";
    hint.setAttribute("role", "status");
    menu.appendChild(hint);
    document.body.appendChild(menu);
    let active = null;
    let copying = false;

    function restore(snapshot) {
        if (!snapshot || !isCurrent(snapshot)) return;
        if (snapshot.input?.isConnected) {
            const scroll = snapshot.input.scrollTop;
            const scrollLeft = snapshot.input.scrollLeft;
            snapshot.input.focus({ preventScroll: true });
            snapshot.input.setSelectionRange(snapshot.start, snapshot.end, snapshot.direction);
            snapshot.input.scrollTop = scroll;
            snapshot.input.scrollLeft = scrollLeft;
        } else if (snapshot.range?.startContainer.isConnected && snapshot.range?.endContainer.isConnected) {
            snapshot.focus?.focus?.({ preventScroll: true });
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(snapshot.range);
        }
    }

    function close(restoreSelection = false) {
        const previous = active;
        active = null;
        menu.hidden = true;
        hint.textContent = "";
        if (restoreSelection) restore(previous);
        if (menu.parentElement !== document.body) document.body.appendChild(menu);
    }

    function isCurrent(snapshot) {
        const state = getState();
        return snapshot.path === state.path && snapshot.pathSource === state.pathSource && snapshot.source === state.source
            && (!snapshot.input || (snapshot.input.value === snapshot.inputValue && sourceDialog.open));
    }

    function diagramSnapshot(state, block, code, localRange, text, node = "", edited = false) {
        const nodes = Array.from(content.querySelectorAll(".mermaid, .plantuml"));
        const diagrams = nodes.map((diagram) => ({
            language: diagram.classList.contains("plantuml") ? "plantuml" : "mermaid",
            source: diagram.classList.contains("plantuml") ? diagram.dataset.plantumlSource || "" : diagram.dataset.mermaidSource || "",
        }));
        const index = nodes.indexOf(block);
        const language = diagrams[index]?.language || state.pendingLanguage || "mermaid";
        const diagramDraft = edited || index < 0;
        const location = localRange && !diagramDraft ? locateDiagramSelection({
            source: state.source, diagrams, index, code, ...localRange, decode,
        }) : null;
        return {
            path: state.path, pathSource: state.pathSource, source: state.source, draft: state.source !== state.savedSource,
            section: block ? sectionAt(content, block) : "New diagram",
            block: `${language} diagram ${index >= 0 ? index + 1 : "(new)"}`,
            text, location, localSource: code, localRange, diagram: true, diagramDraft, node,
        };
    }

    function capture(target) {
        const state = getState();
        if (!state.path) return null;
        if (target === sourceInput && sourceDialog.open) {
            const start = sourceInput.selectionStart;
            const end = sourceInput.selectionEnd;
            if (end <= start) return null;
            const block = state.sourceBlock;
            const stored = block?.classList.contains("plantuml") ? block.dataset.plantumlSource || "" : block?.dataset.mermaidSource || "";
            const edited = sourceInput.value.replace(/\r\n?/g, "\n") !== stored.replace(/\r\n?/g, "\n");
            return {
                ...diagramSnapshot(state, block, sourceInput.value, { start, end }, sourceInput.value.slice(start, end), "", edited),
                input: sourceInput, inputValue: sourceInput.value, start, end, direction: sourceInput.selectionDirection,
                focus: sourceInput,
            };
        }
        if (!content.contains(target) || target.closest("button, input, textarea, select")) return null;
        const selection = window.getSelection();
        if (!selection?.rangeCount || selection.isCollapsed || !selection.toString()) return null;
        const range = selection.getRangeAt(0);
        if (!content.contains(range.startContainer) || !content.contains(range.endContainer)) return null;
        try { if (!range.intersectsNode(target)) return null; } catch { return null; }
        const text = selection.toString();
        const origin = elementOf(range.startContainer);
        const diagram = origin?.closest(".mermaid, .plantuml");
        if (diagram && diagram.contains(range.endContainer)) {
            const code = diagram.classList.contains("plantuml") ? diagram.dataset.plantumlSource || "" : diagram.dataset.mermaidSource || "";
            const start = code.indexOf(text);
            const unique = start >= 0 && code.indexOf(text, start + 1) < 0;
            const node = origin.closest("[data-entity], [id^='flowchart-']");
            return {
                ...diagramSnapshot(state, diagram, code, unique ? { start, end: start + text.length } : null, text,
                    node?.getAttribute("data-entity") || node?.id || ""),
                range: range.cloneRange(), focus: document.activeElement,
            };
        }
        const mapped = locateRenderedRange({ content, range, source: state.source, decode });
        if (!mapped) return null;
        const { block, localSource, localRange, location } = mapped;
        return {
            path: state.path, pathSource: state.pathSource, source: state.source, draft: state.source !== state.savedSource,
            text, localSource, localRange, location,
            section: sectionAt(content, origin), block: blockName(content, block),
            range: range.cloneRange(), focus: document.activeElement,
        };
    }

    function show(event, snapshot, keyboard = false) {
        active = snapshot;
        const host = elementOf(event.target)?.closest("dialog[open]") || document.fullscreenElement || document.body;
        host.appendChild(menu);
        menu.hidden = false;
        menu.style.left = "0px";
        menu.style.top = "0px";
        const position = snapshot.location ? linePosition(snapshot.source, snapshot.location.start) : null;
        hint.textContent = position
            ? `${snapshot.draft ? "Draft" : "File"} line ${position.line} · ${snapshot.block}`
            : `${snapshot.diagramDraft ? "Unsaved diagram" : "Local selection"} · ${snapshot.block}`;
        const bounds = menu.getBoundingClientRect();
        const anchor = snapshot.input?.getBoundingClientRect() || snapshot.range?.getBoundingClientRect();
        const x = keyboard || (!event.clientX && !event.clientY) ? anchor?.left ?? 8 : event.clientX;
        const y = keyboard || (!event.clientX && !event.clientY) ? anchor?.bottom ?? 8 : event.clientY;
        menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - bounds.width - 8))}px`;
        menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - bounds.height - 8))}px`;
        // Mouse menus must not blur the editor: a textarea loses its visible
        // selection when a menu button takes focus. Keyboard menus still focus
        // their first action for accessible navigation.
        if (keyboard) buttons[0].focus({ preventScroll: true });
        else restore(snapshot);
    }

    const onContextMenu = (event) => {
        const target = elementOf(event.target);
        if (!target || menu.contains(target)) return;
        const snapshot = capture(target);
        if (!snapshot) { close(); return; }
        event.preventDefault();
        show(event, snapshot);
    };
    const onKeyDown = (event) => {
        if (!menu.hidden) {
            if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                close(true);
            } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
                event.preventDefault();
                const index = buttons.indexOf(document.activeElement);
                const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1
                    : index < 0 ? (event.key === "ArrowDown" ? 0 : buttons.length - 1)
                    : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
                buttons[next].focus({ preventScroll: true });
            } else if (event.key === "Enter" || event.key === " ") {
                // A mouse-opened menu leaves focus in the editor. Activate the
                // default action instead of inserting text over the selection.
                event.preventDefault();
                event.stopPropagation();
                const index = buttons.indexOf(document.activeElement);
                buttons[Math.max(0, index)].click();
            } else if (event.key === "Tab") close(true);
            return;
        }
        if (event.key === "ContextMenu" || (event.key === "F10" && event.shiftKey)) {
            const snapshot = capture(elementOf(event.target));
            if (snapshot) { event.preventDefault(); show(event, snapshot, true); }
        }
    };
    const onPointerDown = (event) => { if (!menu.contains(event.target)) close(); };
    const onInput = (event) => { if (content.contains(event.target) || event.target === sourceInput) close(); };
    const onScroll = (event) => { if (!menu.contains(event.target)) close(); };
    const onResize = () => close();
    const onDialogClose = () => close();

    menu.addEventListener("mousedown", (event) => event.preventDefault());
    buttons.forEach((button) => button.addEventListener("click", async () => {
        const snapshot = active;
        if (!snapshot || copying) return;
        if (!isCurrent(snapshot)) { close(); return; }
        copying = true;
        try {
            const text = button.dataset.copyAction === "text" ? snapshot.text : formatContextPacket(snapshot);
            await writeClipboardText(text, document, menu.parentElement);
            if (active === snapshot) close(true);
            if (isCurrent(snapshot)) onStatus(button.dataset.copyAction === "text"
                ? "Copied selected text." : "Copied text with source context. Paste it into your agent; nothing was sent automatically.");
        } catch {
            if (active === snapshot) {
                restore(snapshot);
                hint.textContent = "Copy failed: clipboard access is unavailable. Your selection has been kept.";
            }
        } finally {
            copying = false;
        }
    }));
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("input", onInput);
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    sourceDialog.addEventListener("close", onDialogClose);

    return {
        close,
        destroy() {
            close();
            document.removeEventListener("contextmenu", onContextMenu);
            document.removeEventListener("keydown", onKeyDown, true);
            document.removeEventListener("pointerdown", onPointerDown, true);
            document.removeEventListener("input", onInput);
            document.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", onResize);
            sourceDialog.removeEventListener("close", onDialogClose);
            menu.remove();
        },
    };
}
