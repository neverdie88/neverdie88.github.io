// Source locations are inferred only from verified text matches. A missing or
// ambiguous match is reported as unmapped, never replaced with a guessed line.
const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" };
const textBoundaryTags = new Set(["p", "h1", "h2", "h3", "h4", "h5", "h6", "div", "li", "tr", "td", "th", "br", "pre", "blockquote",
    "ul", "ol", "table", "thead", "tbody", "tfoot", "section", "article", "figure", "figcaption", "details", "summary"]);
const htmlTagPattern = /<\/?([a-zA-Z][\w:-]*)(?:\s+(?:[^>"']|"[^"]*"|'[^']*')*)?\s*\/?>/g;
const htmlTagAtStart = new RegExp(`^${htmlTagPattern.source}`);
const ignoredTags = new Set(["script", "style", "button", "input", "textarea", "select"]);

function classesOf(tag) {
    const attributes = /\s+([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    for (const match of tag.matchAll(attributes)) {
        if (match[1].toLowerCase() === "class") return (match[2] ?? match[3] ?? match[4] ?? "").split(/\s+/);
    }
    return [];
}

function ignoredRenderedElement(name, tag, following) {
    if (ignoredTags.has(name) || classesOf(tag).some((value) => ["mermaid", "plantuml", "table-column-resizer"].includes(value))) return true;
    if (name !== "pre") return false;
    const end = following.search(/<\/pre\s*>/i);
    for (const code of following.slice(0, end < 0 ? undefined : end).matchAll(htmlTagPattern)) {
        if (code[1].toLowerCase() !== "code" || code[0].startsWith("</")) continue;
        // Match the viewer's diagram upgrade, including language aliases. The
        // whole pre is replaced, so none of its text is a rendered-text peer.
        if (classesOf(code[0]).some((value) => value.includes("mermaid") || value.includes("plantuml"))) return true;
    }
    return false;
}

function afterElement(source, from, name) {
    if (["input", "br", "hr", "img", "wbr", "area", "base", "embed", "link", "meta", "param", "source", "track", "col"].includes(name)) return from;
    if (["script", "style", "textarea"].includes(name)) {
        const close = new RegExp(`</${name}\\s*>`, "ig");
        close.lastIndex = from;
        return close.exec(source) ? close.lastIndex : source.length;
    }
    const tags = new RegExp(`<!--[\\s\\S]*?-->|${htmlTagPattern.source}`, "g");
    tags.lastIndex = from;
    let depth = 1;
    let tag;
    while ((tag = tags.exec(source))) {
        if (!tag[1] || tag[1].toLowerCase() !== name) continue;
        if (tag[0].startsWith("</")) { if (--depth === 0) return tags.lastIndex; }
        else if (!tag[0].endsWith("/>")) depth += 1;
    }
    return source.length;
}

export function isTextBoundaryTag(name) {
    return textBoundaryTags.has(name.toLowerCase());
}

export function decodeEntity(value) {
    const name = value.slice(1, -1);
    if (name.startsWith("#")) {
        const hex = name[1]?.toLowerCase() === "x";
        const digits = name.slice(hex ? 2 : 1);
        if (!(hex ? /^[\da-f]+$/i : /^\d+$/).test(digits)) return value;
        const point = Number.parseInt(digits, hex ? 16 : 10);
        return point > 0 && point <= 0x10ffff && !(point >= 0xd800 && point <= 0xdfff)
            ? String.fromCodePoint(point) : "\ufffd";
    }
    return entities[name] ?? value;
}

function projection(source, { html = false, encoded = false, legacy = false, decode = decodeEntity, base = 0,
    preformatted = false, rendered = false } = {}) {
    const result = { text: "", starts: [], ends: [] };
    const characters = [];
    const append = (value, start, end) => {
        characters.push(value);
        for (let index = 0; index < value.length; index += 1) {
            result.starts.push(base + start);
            result.ends.push(base + end);
        }
    };
    let offset = 0;
    while (offset < source.length) {
        const rest = source.slice(offset);
        if (html || legacy) {
            const comment = rest.startsWith("<!--") ? rest.indexOf("-->", 4) : -1;
            if (comment >= 0) { offset += comment + 3; continue; }
            const tag = rest.match(htmlTagAtStart);
            if (tag) {
                const end = offset + tag[0].length;
                const name = tag[1].toLowerCase();
                const hidden = !tag[0].startsWith("</") && (rendered
                    ? ignoredRenderedElement(name, tag[0], source.slice(end)) : name === "script" || name === "style");
                if (hidden) {
                    offset = afterElement(source, end, name);
                    continue;
                }
                if (legacy ? /^<(?:br\b|\/p\s*>)/i.test(tag[0])
                    : isTextBoundaryTag(tag[1]) && (!preformatted || tag[1].toLowerCase() === "br")) {
                    append("\n", offset, end);
                }
                offset = end;
                continue;
            }
        }
        if (html || encoded || legacy) {
            const entity = rest.match(/^&(?:#[xX][\da-fA-F]+|#\d+|[a-zA-Z][\da-zA-Z]+);/);
            if (entity) {
                const decoded = decode(entity[0]);
                if (decoded !== entity[0]) {
                    append(legacy ? decoded.replace(/\u00a0/g, " ") : decoded, offset, offset + entity[0].length);
                    offset += entity[0].length;
                    continue;
                }
            }
        }
        if (source[offset] === "\r") {
            const end = offset + (source[offset + 1] === "\n" ? 2 : 1);
            append("\n", offset, end);
            offset = end;
        } else {
            append(source[offset], offset, offset + 1);
            offset += 1;
        }
    }
    result.text = characters.join("");
    return result;
}

function compact(projected) {
    const result = { text: "", starts: [], ends: [] };
    const characters = [];
    for (let index = 0; index < projected.text.length; index += 1) {
        const character = /\s/u.test(projected.text[index]) ? " " : projected.text[index];
        if (character === " " && (!characters.length || characters[characters.length - 1] === " ")) {
            if (characters.length) result.ends[result.ends.length - 1] = projected.ends[index];
            continue;
        }
        characters.push(character);
        result.starts.push(projected.starts[index]);
        result.ends.push(projected.ends[index]);
    }
    if (characters[characters.length - 1] === " ") {
        characters.pop();
        result.starts.pop();
        result.ends.pop();
    }
    result.text = characters.join("");
    return result;
}

export function normalizedText(text) {
    return text.replace(/\s+/gu, " ").trim();
}

function selectedProjectionRange(projected, start, end) {
    const first = projected.ends.findIndex((position) => position > start);
    let last = projected.starts.length - 1;
    while (last >= 0 && projected.starts[last] >= end) last -= 1;
    return first >= 0 && last >= first ? { start: first, end: last + 1 } : null;
}

// This is a conservative block index, not a second Markdown renderer. Unsupported
// syntax stays unmapped. A substring in another paragraph, code sample, link
// destination or attribute must never stand in for the selected rendered block.
function renderedSourceBlocks(source) {
    const blocks = [];
    const excluded = [];
    const opaque = [];
    const add = (start, end, options = {}) => { if (end > start) blocks.push({ start, end, html: true, ...options }); };
    const lines = sourceLines(source);
    for (let index = 0; index < lines.length; index += 1) {
        const opening = lines[index].text.match(/^ {0,3}(`{3,}|~{3,})([^\r\n]*)$/);
        if (!opening) continue;
        const closing = new RegExp(`^ {0,3}${opening[1][0]}{${opening[1].length},}[ \\t]*$`);
        let last = index + 1;
        while (last < lines.length && !closing.test(lines[last].text)) last += 1;
        const region = { start: lines[index].start, end: last < lines.length ? lines[last].next : source.length };
        opaque.push(region);
        excluded.push(region);
        if (!/mermaid|plantuml/i.test(opening[2].trim().split(/\s/)[0])) {
            add(lines[index].next, last < lines.length ? lines[last].start : source.length, { html: false, preformatted: true, fenced: true });
        }
        index = last;
    }
    // Do not interpret HTML-looking strings inside inline code or link targets
    // as real source blocks. Keep their unsupported Markdown syntax intact.
    for (const match of source.matchAll(/(`+)([\s\S]*?)\1(?!`)|\]\([^\r\n]*\)/g)) {
        opaque.push({ start: match.index, end: match.index + match[0].length });
    }
    opaque.sort((left, right) => left.start - right.start);
    let opaqueIndex = 0;
    const stack = [];
    const tags = new RegExp(`<!--[\\s\\S]*?-->|${htmlTagPattern.source}`, "g");
    let tag;
    while ((tag = tags.exec(source))) {
        while (opaqueIndex < opaque.length && opaque[opaqueIndex].end <= tag.index) opaqueIndex += 1;
        if (opaque[opaqueIndex]?.start <= tag.index) {
            tags.lastIndex = Math.max(tags.lastIndex, opaque[opaqueIndex].end);
            continue;
        }
        let escaped = 0;
        for (let at = tag.index - 1; at >= 0 && source[at] === "\\"; at -= 1) escaped += 1;
        if (!tag[1] || escaped % 2) continue;
        const name = tag[1].toLowerCase();
        if (!tag[0].startsWith("</") && ignoredRenderedElement(name, tag[0], source.slice(tags.lastIndex))) {
            tags.lastIndex = afterElement(source, tags.lastIndex, name);
            if (!stack.length) excluded.push({ start: tag.index, end: tags.lastIndex });
            continue;
        }
        if (!isTextBoundaryTag(name) || name === "br") continue;
        if (tag[0].startsWith("</")) {
            const at = stack.findLastIndex((item) => item.name === name);
            if (at < 0) continue;
            const opening = stack[at];
            stack.length = at;
            add(opening.content, tag.index, { preformatted: name === "pre" });
            if (!stack.length) excluded.push({ start: opening.start, end: tags.lastIndex });
        } else if (!tag[0].endsWith("/>")) {
            stack.push({ name, start: tag.index, content: tags.lastIndex });
        }
    }
    if (stack.length) excluded.push({ start: stack[0].start, end: source.length });
    // Recognize only complete top-level Markdown paragraphs/headings/list items.
    // Soft line breaks remain part of the same paragraph, never new candidates.
    const markdown = (start, end) => {
        const rows = sourceLines(source.slice(start, end));
        const cells = (row) => {
            const result = [];
            let from = 0;
            for (let at = 0; at < row.text.length; at += 1) {
                if (row.text[at] === "\\") { at += 1; continue; }
                if (row.text[at] !== "|") continue;
                result.push({ start: row.start + from, end: row.start + at, text: row.text.slice(from, at) });
                from = at + 1;
            }
            if (!result.length) return [];
            result.push({ start: row.start + from, end: row.start + row.text.length, text: row.text.slice(from) });
            if (!result[0].text.trim()) result.shift();
            if (result.length && !result.at(-1).text.trim()) result.pop();
            return result;
        };
        let pending = null;
        const flush = (until) => { if (pending !== null) add(start + pending, start + until); pending = null; };
        for (let index = 0; index < rows.length; index += 1) {
            const row = rows[index];
            if (!row.text.trim()) { flush(row.start); continue; }
            const header = cells(row);
            const divider = rows[index + 1] ? cells(rows[index + 1]) : [];
            if (header.length && header.length === divider.length && divider.every((cell) => /^\s*:?-+:?\s*$/.test(cell.text))) {
                flush(row.start);
                for (const cell of header) add(start + cell.start, start + cell.end);
                index += 1;
                while (rows[index + 1]?.text.trim() && cells(rows[index + 1]).length === header.length) {
                    index += 1;
                    for (const cell of cells(rows[index])) add(start + cell.start, start + cell.end);
                }
                continue;
            }
            if (rows[index + 1] && /^ {0,3}(?:=+|-+)[ \t]*$/.test(rows[index + 1].text)) {
                flush(row.start);
                add(start + row.start, start + row.start + row.text.length);
                index += 1;
                continue;
            }
            const heading = row.text.match(/^ {0,3}#{1,6}(?:[ \t]+|$)/);
            const item = row.text.match(/^ {0,3}(?:[-+*]|\d+[.)])[ \t]+/);
            if (heading) {
                flush(row.start);
                const tail = row.text.replace(/[ \t]+#+[ \t]*$/, "");
                add(start + row.start + heading[0].length, start + row.start + tail.length);
            } else if (/^ {0,3}>[ \t]?/.test(row.text) && !rows[index + 1]?.text.trim()) {
                flush(row.start);
                add(start + row.start + row.text.match(/^ {0,3}>[ \t]?/)[0].length, start + row.start + row.text.length);
            } else {
                if (item) flush(row.start);
                if (pending === null) pending = row.start + (item?.[0].length || 0);
            }
        }
        flush(end - start);
    };
    excluded.sort((left, right) => left.start - right.start);
    let offset = 0;
    for (const region of excluded) {
        if (region.start > offset) markdown(offset, region.start);
        offset = Math.max(offset, region.end);
    }
    if (offset < source.length) markdown(offset, source.length);
    // Selections spanning several HTML blocks can use the document/container.
    // A document containing Markdown fences cannot be HTML-projected safely.
    if (!blocks.some((block) => !block.html)) add(0, source.length);
    return blocks;
}

let renderedIndexCache = null;
function renderedSourceIndex(source, decode) {
    if (renderedIndexCache?.source === source && renderedIndexCache.decode === decode) return renderedIndexCache.blocks;
    const unique = new Map();
    for (const block of renderedSourceBlocks(source)) {
        const projected = projection(source.slice(block.start, block.end), { ...block, base: block.start, decode, rendered: true });
        const normalized = compact(projected);
        if (!normalized.text && !(block.preformatted && projected.text)) continue;
        const first = normalized.starts[0] ?? projected.starts[0];
        const last = normalized.ends.at(-1) ?? projected.ends.at(-1);
        const key = `${first}:${last}`;
        if (!unique.has(key) || block.preformatted) unique.set(key, { projected, normalized,
            preformatted: !!block.preformatted, fenced: !!block.fenced });
    }
    const blocks = Array.from(unique.values()).sort((left, right) => left.projected.starts[0] - right.projected.starts[0]);
    renderedIndexCache = { source, decode, blocks };
    return blocks;
}

export function locateRenderedSelection({ source, blockText, start, end, occurrence = 0, occurrenceCount = 1, decode,
    preserveWhitespace = false }) {
    if (start < 0 || end <= start || end > blockText.length) return null;
    const block = preserveWhitespace ? projection(blockText) : compact(projection(blockText));
    const range = selectedProjectionRange(block, start, end);
    if (!range || !block.text) return null;
    const candidates = renderedSourceIndex(source, decode)
        .filter((candidate) => candidate.normalized.text === normalizedText(block.text));
    // Matching the number of identical rendered blocks disambiguates repeated
    // paragraphs/cells without arbitrarily choosing the first source occurrence.
    if (candidates.length !== occurrenceCount || !Number.isInteger(occurrence)
        || occurrence < 0 || occurrence >= candidates.length) return null;
    const candidate = candidates[occurrence];
    // Normalization may identify a code block, but must not decide its exact
    // endpoints: one selected space/tab/newline is not the whole whitespace run.
    const exactCode = candidate.projected.text === block.text;
    // The fenced-code renderer emits a single final newline. Accept only an
    // exact source prefix with extra unrendered LF characters at the very end;
    // never trim indentation, spaces, tabs or a selected internal line break.
    const omittedFinalBreaks = candidate.fenced && block.text.endsWith("\n")
        && candidate.projected.text.startsWith(block.text)
        && /^\n+$/.test(candidate.projected.text.slice(block.text.length));
    if (preserveWhitespace && (!candidate.preformatted || (!exactCode && !omittedFinalBreaks))) return null;
    const document = preserveWhitespace ? candidate.projected : candidate.normalized;
    return {
        start: document.starts[range.start],
        end: document.ends[range.end - 1],
        blockStart: document.starts[0],
        blockEnd: document.ends[block.text.length - 1],
    };
}

function sourceLines(source) {
    const lines = [];
    let start = 0;
    for (const match of source.matchAll(/\r\n|\r|\n/g)) {
        lines.push({ text: source.slice(start, match.index), start, next: match.index + match[0].length });
        start = match.index + match[0].length;
    }
    lines.push({ text: source.slice(start), start, next: source.length });
    return lines;
}

export function linePosition(source, offset) {
    const position = Math.max(0, Math.min(source.length, offset));
    const lines = sourceLines(source);
    let index = lines.length - 1;
    while (index > 0 && lines[index].start > position) index -= 1;
    return { line: index + 1, column: position - lines[index].start + 1 };
}

export function findDiagramBlocks(source, decode = decodeEntity) {
    const blocks = [];
    const fences = [];
    const lines = sourceLines(source);
    for (let index = 0; index < lines.length; index += 1) {
        // Track all fences: a Mermaid-looking fence inside another code block
        // must not acquire a false source anchor.
        const opening = lines[index].text.match(/^ {0,3}(`{3,}|~{3,})([^\r\n]*)$/);
        if (!opening) continue;
        const language = opening[2].trim().split(/\s/)[0].toLowerCase();
        const closing = new RegExp(`^ {0,3}${opening[1][0]}{${opening[1].length},}[ \\t]*$`);
        let last = index + 1;
        while (last < lines.length && !closing.test(lines[last].text)) last += 1;
        fences.push({ start: lines[index].start, end: last < lines.length ? lines[last].next : source.length });
        if (language === "mermaid" || language === "plantuml") {
            const start = lines[index].next;
            const end = last < lines.length ? lines[last].start : source.length;
            blocks.push({ language, start, end, code: projection(source.slice(start, end), { base: start }) });
        }
        index = last;
    }
    const embedded = /<pre\b[^>]*>\s*<code\b([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi;
    for (const match of source.matchAll(embedded)) {
        const language = match[1].match(/\bclass\s*=\s*["'][^"']*\blanguage-(mermaid|plantuml)\b/i)?.[1]?.toLowerCase();
        if (!language) continue;
        const bodyOffset = match[0].indexOf(">", match[0].toLowerCase().indexOf("<code")) + 1;
        const start = match.index + bodyOffset;
        const end = start + match[2].length;
        if (fences.some((block) => start >= block.start && start < block.end)) continue;
        blocks.push({ language, start, end, code: projection(match[2], { encoded: true, decode, base: start }) });
    }
    const legacy = /&lt;!--\s*PlantUML source:\s*<br\s*\/?\s*>([\s\S]*?)<br\s*\/?\s*>--&gt;/gi;
    for (const match of source.matchAll(legacy)) {
        const start = match.index + match[0].indexOf(match[1]);
        const end = start + match[1].length;
        if (fences.some((block) => start >= block.start && start < block.end)) continue;
        blocks.push({ language: "plantuml", start, end,
            code: projection(match[1], { legacy: true, decode, base: start }) });
    }
    return blocks.sort((left, right) => left.start - right.start);
}

const normalizedCode = (text) => text.replace(/\r\n?/g, "\n").trim();

export function locateDiagramSelection({ source, diagrams, index, code, start, end, decode }) {
    if (start < 0 || end <= start || end > code.length || !diagrams[index]) return null;
    const blocks = findDiagramBlocks(source, decode);
    const same = (block, diagram) => block?.language === diagram.language
        && normalizedCode(block.code.text) === normalizedCode(diagram.source);
    let block = null;
    if (blocks.length === diagrams.length && blocks.every((item, at) => same(item, diagrams[at]))) {
        block = blocks[index];
    } else {
        const candidates = blocks.filter((item) => same(item, diagrams[index]));
        if (candidates.length === 1) block = candidates[0];
    }
    if (!block || normalizedCode(code) !== normalizedCode(diagrams[index].source)) return null;
    const editor = projection(code);
    const selected = selectedProjectionRange(editor, start, end);
    if (!selected) return null;
    let at = block.code.text.indexOf(editor.text);
    let shift = 0;
    if (at < 0) {
        const trimmed = editor.text.trim();
        shift = editor.text.indexOf(trimmed);
        at = block.code.text.indexOf(trimmed);
        if (!trimmed || selected.start < shift || selected.end > shift + trimmed.length) return null;
    }
    if (at < 0) return null;
    return {
        start: block.code.starts[at + selected.start - shift],
        end: block.code.ends[at + selected.end - shift - 1],
        blockStart: block.start,
        blockEnd: block.end,
    };
}

function fenced(text) {
    const longest = (character) => {
        let length = 0;
        for (const match of text.matchAll(new RegExp(`${character}+`, "g"))) length = Math.max(length, match[0].length);
        return length;
    };
    const character = longest("`") <= longest("~") ? "`" : "~";
    const fence = character.repeat(Math.max(3, longest(character) + 1));
    return `${fence}text\n${text}\n${fence}`;
}

export function formatSelectedLines(source, range) {
    if (!range || !Number.isInteger(range.start) || !Number.isInteger(range.end)
        || range.start < 0 || range.end <= range.start || range.end > source.length) return null;
    const lines = sourceLines(source);
    const first = linePosition(source, range.start).line - 1;
    const last = linePosition(source, range.end - 1).line - 1;
    const width = String(last + 1).length;
    // Keep only each line's intersection with the selection. File coordinates
    // identify omitted prefixes/suffixes; raw text is never decoded or trimmed.
    return lines.slice(first, last + 1)
        .map((line, index) => {
            const start = Math.max(0, range.start - line.start);
            const end = Math.min(line.text.length, range.end - line.start);
            return `${String(first + index + 1).padStart(width)} | ${line.text.slice(start, end)}`;
        })
        .join("\n");
}

function formatSelectionRange(source, range, { rawFile = true } = {}) {
    const start = linePosition(source, range.start);
    const end = linePosition(source, range.end);
    const annotation = `${rawFile ? "raw file; " : ""}1-based; UTF-16 columns; end exclusive`;
    return `L${start.line}:C${start.column}–L${end.line}:C${end.column} (${annotation})`;
}

const metadata = (value) => String(value || "").replace(/[\r\n\t]+/g, " ");

export function formatContextPacket({ path, pathSource = "", text, source, draft = false, location = null,
    localSource = "", localRange = null, diagramDraft = false }) {
    const output = [`File: ${metadata(path) || "(not saved to a file)"}`];
    if (pathSource === "user-provided") output.push("Path source: user-provided (not verified by browser)");
    if (diagramDraft || draft) output.push(`Source: unsaved ${diagramDraft ? "diagram" : "document"} draft`);
    const rawLines = diagramDraft ? null : formatSelectedLines(source, location);
    if (rawLines !== null) {
        const label = draft ? "Selection (unsaved draft, not raw file)" : "Selection";
        output.push(`${label}: ${formatSelectionRange(source, location, { rawFile: !draft })}`, "", fenced(rawLines));
    } else {
        output.push("Raw-file anchor: unavailable (no unambiguous saved-file mapping)");
        const draftLines = diagramDraft ? formatSelectedLines(localSource, localRange) : null;
        if (draftLines !== null) {
            output.push(`Selection (diagram draft, not raw file): ${formatSelectionRange(localSource, localRange, { rawFile: false })}`,
                "", fenced(draftLines));
        } else {
            output.push("", "Selected text:", fenced(text));
        }
    }
    return `${output.join("\n")}\n`;
}
