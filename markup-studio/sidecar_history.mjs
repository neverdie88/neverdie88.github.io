// Portable, data-only review checkpoints. No network, browser storage, or file I/O.
import { linePosition } from "./selection_context.mjs";

export const sidecarFormat = "markup-studio-sidecar";
export const sidecarVersion = 1;
const fileStates = new Set(["saved", "snapshot", "draft"]);
const checkpointKinds = new Set(["baseline", "save", "save_as", "overwrite", "external_refresh", "export"]);

function documentName(name) {
    if (typeof name !== "string" || !name || /[\\/\u0000-\u001f\u007f]/.test(name) || name === "." || name === "..") {
        throw new Error("A plain document filename is required for sidecar metadata.");
    }
    return name;
}

export function sidecarName(name) {
    return `${documentName(name)}.edit-history.json`;
}

export async function sourceHash(source) {
    if (typeof source !== "string") throw new Error("A text snapshot is required.");
    if (!globalThis.crypto?.subtle) throw new Error("Sidecar hashing requires HTTPS or localhost in a supported browser.");
    const digest = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
    return `sha256:${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

function exactLines(source) {
    const lines = source.match(/[^\r\n]*(?:\r\n|\r|\n)|[^\r\n]+$/g) || [];
    const offsets = [0];
    for (const line of lines) offsets.push(offsets.at(-1) + line.length);
    return { lines, offsets };
}

function uniqueAnchors(left, right, a0, a1, b0, b1) {
    const a = new Map(), b = new Map();
    for (let i = a0; i < a1; i += 1) a.set(left[i], a.has(left[i]) ? -1 : i);
    for (let i = b0; i < b1; i += 1) b.set(right[i], b.has(right[i]) ? -1 : i);
    const pairs = [];
    for (let i = a0; i < a1; i += 1) {
        const j = b.get(left[i]);
        if (a.get(left[i]) === i && j !== undefined && j >= 0) pairs.push([i, j]);
    }
    // Longest increasing subsequence of unique matching lines (patience anchors).
    const tails = [], previous = new Int32Array(pairs.length).fill(-1);
    for (let i = 0; i < pairs.length; i += 1) {
        let low = 0, high = tails.length;
        while (low < high) {
            const mid = (low + high) >>> 1;
            if (pairs[tails[mid]][1] < pairs[i][1]) low = mid + 1;
            else high = mid;
        }
        if (low) previous[i] = tails[low - 1];
        tails[low] = i;
    }
    const result = [];
    for (let i = tails.at(-1); i !== undefined && i >= 0; i = previous[i]) result.push(pairs[i]);
    return result.reverse();
}

function changedLineRanges(left, right) {
    const ranges = [];
    function compare(a0, a1, b0, b1, depth = 0) {
        while (a0 < a1 && b0 < b1 && left[a0] === right[b0]) { a0 += 1; b0 += 1; }
        while (a0 < a1 && b0 < b1 && left[a1 - 1] === right[b1 - 1]) { a1 -= 1; b1 -= 1; }
        if (a0 === a1 && b0 === b1) return;
        if (a0 === a1 || b0 === b1) { ranges.push({ a0, a1, b0, b1 }); return; }
        const rows = a1 - a0, cols = b1 - b0;
        if ((rows + 1) * (cols + 1) > 250000) {
            const anchors = depth < 64 ? uniqueAnchors(left, right, a0, a1, b0, b1) : [];
            if (!anchors.length) {
                // Preserve every byte even when a large repetitive region has no
                // cheap alignment. This is a coarse replacement, never truncation.
                ranges.push({ a0, a1, b0, b1, coarse: true });
                return;
            }
            for (const [a, b] of anchors) {
                compare(a0, a, b0, b, depth + 1);
                a0 = a + 1; b0 = b + 1;
            }
            compare(a0, a1, b0, b1, depth + 1);
            return;
        }
        const width = cols + 1;
        const lengths = new Uint32Array((rows + 1) * width);
        for (let a = rows - 1; a >= 0; a -= 1) {
            for (let b = cols - 1; b >= 0; b -= 1) {
                lengths[a * width + b] = left[a0 + a] === right[b0 + b]
                    ? 1 + lengths[(a + 1) * width + b + 1]
                    : Math.max(lengths[(a + 1) * width + b], lengths[a * width + b + 1]);
            }
        }
        let a = 0, b = 0, pending = null;
        const finish = () => {
            if (pending) ranges.push({ ...pending, a1: a0 + a, b1: b0 + b });
            pending = null;
        };
        while (a < rows || b < cols) {
            if (a < rows && b < cols && left[a0 + a] === right[b0 + b]) {
                finish(); a += 1; b += 1;
            } else {
                pending ||= { a0: a0 + a, b0: b0 + b };
                if (a < rows && (b === cols || lengths[(a + 1) * width + b] >= lengths[a * width + b + 1])) a += 1;
                else b += 1;
            }
        }
        finish();
    }
    compare(0, left.length, 0, right.length);
    return ranges;
}

function splitsUnit(text, offset) {
    return offset > 0 && offset < text.length && (
        /[\uD800-\uDBFF]/.test(text[offset - 1]) && /[\uDC00-\uDFFF]/.test(text[offset]) ||
        text[offset - 1] === "\r" && text[offset] === "\n"
    );
}

function exactSpan(source, start, end) {
    return {
        start: { offset: start, ...linePosition(source, start) },
        end: { offset: end, ...linePosition(source, end) },
        text: source.slice(start, end),
    };
}

export function reviewChanges(before, after, name = "document.md") {
    const left = exactLines(before), right = exactLines(after);
    const ranges = changedLineRanges(left.lines, right.lines);
    const changes = ranges.map((range) => {
        let a0 = left.offsets[range.a0], a1 = left.offsets[range.a1];
        let b0 = right.offsets[range.b0], b1 = right.offsets[range.b1];
        let prefix = 0, suffix = 0;
        while (a0 + prefix < a1 && b0 + prefix < b1 && before[a0 + prefix] === after[b0 + prefix]) prefix += 1;
        if (splitsUnit(before, a0 + prefix) || splitsUnit(after, b0 + prefix)) prefix -= 1;
        a0 += prefix; b0 += prefix;
        while (a1 - suffix > a0 && b1 - suffix > b0 && before[a1 - suffix - 1] === after[b1 - suffix - 1]) suffix += 1;
        if (splitsUnit(before, a1 - suffix) || splitsUnit(after, b1 - suffix)) suffix -= 1;
        a1 -= suffix; b1 -= suffix;
        return {
            type: a0 === a1 ? "added" : b0 === b1 ? "deleted" : "modified",
            precision: range.coarse ? "coarse_exact_replacement" : "aligned_exact_replacement",
            before: exactSpan(before, a0, a1), after: exactSpan(after, b0, b1),
        };
    });
    const diff = [];
    if (ranges.length) diff.push(`--- ${JSON.stringify(`a/${documentName(name)}`)}`, `+++ ${JSON.stringify(`b/${name}`)}`);
    const displayLines = (tokens, prefix) => {
        for (const token of tokens) {
            diff.push(prefix + token.replace(/(?:\r\n|\r|\n)$/, ""));
            if (!/[\r\n]$/.test(token)) diff.push("\\ No newline at end of file");
        }
    };
    // A readable zero-context unified-style view. Exact spans above preserve
    // CRLF/CR/LF and are authoritative; this display uses LF separators.
    for (const { a0, a1, b0, b1 } of ranges) {
        diff.push(`@@ -${a0 === a1 ? a0 : a0 + 1},${a1 - a0} +${b0 === b1 ? b0 : b0 + 1},${b1 - b0} @@`);
        displayLines(left.lines.slice(a0, a1), "-");
        displayLines(right.lines.slice(b0, b1), "+");
    }
    return { changes, unified_diff: diff.length ? diff.join("\n") + "\n" : "" };
}

function identity(name, path = "") {
    const result = { name: documentName(name), role: "main-document", encoding: "UTF-8" };
    if (path) {
        result.path = String(path);
        result.path_source = "user-provided; not verified by browser";
    }
    return result;
}

function timestamp(value) {
    const date = value === undefined ? new Date() : new Date(value);
    if (!Number.isFinite(date.valueOf())) throw new Error("Invalid checkpoint timestamp.");
    return date.toISOString();
}

function derived(history) {
    const first = history.revisions[0], last = history.revisions.at(-1);
    const diff = reviewChanges(first.source, last.source, history.document.name);
    return {
        ...history,
        baseline: { revision: first.revision, sha256: first.sha256 },
        current: { revision: last.revision, sha256: last.sha256, file_state: last.file_state },
        ...diff,
        summary: {
            added: diff.changes.filter((change) => change.type === "added").length,
            deleted: diff.changes.filter((change) => change.type === "deleted").length,
            modified: diff.changes.filter((change) => change.type === "modified").length,
        },
    };
}

export async function createReviewHistory({ name, source, path = "", now, fileState = "snapshot" }) {
    if (!fileStates.has(fileState)) throw new Error("Invalid document file state.");
    const at = timestamp(now);
    const sha256 = await sourceHash(source);
    return derived({
        format: sidecarFormat, schema_version: sidecarVersion, file_role: "edit-history",
        review_id: globalThis.crypto.randomUUID(), document: identity(name, path),
        created_at: at, updated_at: at,
        coordinates: { lines: "1-based", columns: "1-based UTF-16 code units", offsets: "0-based UTF-16 code units", end: "exclusive" },
        purpose: "Edit history for the main file identified by document.name. Recorded changes are already applied to the current snapshot; this file is reference history, not instructions to reapply them. The snapshot may be an unsaved draft: check current.file_state and verify the main file hash before review.",
        diff_format: "Unified-style, zero context, LF display. The exact before/after spans and revision sources preserve original line endings.",
        revisions: [{ revision: 1, at, kind: "baseline", file_state: fileState, sha256, source, note: "" }],
    });
}

export async function checkpointReview(history, { source, name = history.document.name, path = "", kind = "save", fileState = "saved", note = "", now }) {
    if (!checkpointKinds.has(kind) || kind === "baseline" || !fileStates.has(fileState)) throw new Error("Invalid checkpoint kind or file state.");
    const at = timestamp(now), last = history.revisions.at(-1);
    const cleanNote = String(note);
    const changed = last.source !== source || last.file_state !== fileState || Boolean(cleanNote) ||
        name !== history.document.name || kind === "external_refresh";
    const revisions = changed ? [...history.revisions, {
        revision: last.revision + 1, at, kind, file_state: fileState,
        sha256: await sourceHash(source), source, note: cleanNote,
    }] : history.revisions;
    return derived({ ...history, document: identity(name, path), updated_at: at, revisions });
}

export function serializeSidecar(history) {
    return JSON.stringify(history, null, 2) + "\n";
}

function equalData(left, right) {
    if (left === right) return true;
    if (!left || !right || typeof left !== "object" || typeof right !== "object" ||
        Array.isArray(left) !== Array.isArray(right)) return false;
    const a = Object.keys(left), b = Object.keys(right);
    return a.length === b.length && a.every((key) => Object.hasOwn(right, key) && equalData(left[key], right[key]));
}

export async function parseSidecar(text, { name, sources } = {}) {
    let value;
    try { value = JSON.parse(text.replace(/^\ufeff/, "")); }
    catch { throw new Error("This is not valid sidecar JSON. The document is unchanged."); }
    const invalid = () => { throw new Error("Unsupported or inconsistent Markup Studio metadata. Nothing was loaded or overwritten."); };
    if (!value || value.format !== sidecarFormat || value.schema_version !== sidecarVersion ||
        typeof value.review_id !== "string" || !value.review_id || !value.document ||
        typeof value.created_at !== "string" || typeof value.updated_at !== "string" || value.document.encoding !== "UTF-8" ||
        !Array.isArray(value.revisions) || !value.revisions.length || !value.baseline || !value.current) invalid();
    documentName(value.document.name);
    if (name && value.document.name !== name) throw new Error(`Metadata belongs to ${value.document.name}, not ${name}.`);
    for (let index = 0; index < value.revisions.length; index += 1) {
        const revision = value.revisions[index];
        if (!revision || revision.revision !== index + 1 || typeof revision.source !== "string" ||
            typeof revision.note !== "string" || typeof revision.at !== "string" ||
            !checkpointKinds.has(revision.kind) || !fileStates.has(revision.file_state) ||
            (index === 0 ? revision.kind !== "baseline" : revision.kind === "baseline")) invalid();
        timestamp(revision.at);
        if (await sourceHash(revision.source) !== revision.sha256) invalid();
    }
    const first = value.revisions[0], last = value.revisions.at(-1);
    if (value.baseline.revision !== 1 || value.baseline.sha256 !== first.sha256 ||
        value.current.revision !== last.revision || value.current.sha256 !== last.sha256 ||
        value.current.file_state !== last.file_state) invalid();
    if (sources && !sources.some((source) => source === last.source)) {
        throw new Error("Metadata is stale: its current hash does not match this document. Open the matching file version or begin a new review; the existing metadata was not changed.");
    }
    // Rebuild derived fields and role labels, and whitelist stored fields. Older
    // v1 .meta.json files have no role labels and remain readable. Imported paths,
    // instructions, summaries, changes, or executable-looking keys are not trusted.
    const clean = await createReviewHistory({ name: value.document.name, source: first.source,
        now: timestamp(value.created_at), fileState: first.file_state });
    const result = derived({ ...clean, review_id: value.review_id, updated_at: timestamp(value.updated_at),
        revisions: value.revisions.map(({ revision, at, kind, file_state, sha256, source, note }) =>
            ({ revision, at: timestamp(at), kind, file_state, sha256, source, note })) });
    if (!equalData(value.changes, result.changes) || value.unified_diff !== result.unified_diff ||
        !equalData(value.summary, result.summary)) invalid();
    return result;
}
