// Browser-only file access. No requests to the local server, uploads, or stored handles.
export const documentFileAccept = ".md,.markdown,.mdown,.mkd,.txt,.mermaid,.plantuml,.puml,.html,.htm";

const documentTypes = [
    { description: "Markdown and text", accept: { "text/plain": [".md", ".markdown", ".mdown", ".mkd", ".txt", ".mermaid", ".plantuml", ".puml"] } },
    { description: "HTML document", accept: { "text/html": [".html", ".htm"] } },
];

export function isStaticMode(href) {
    return new URL(href).searchParams.get("mode") === "static";
}

export function staticViewerUrl(href) {
    const current = new URL(href);
    const target = new URL("./viewer.html", current);
    target.search = "?mode=static";
    target.hash = current.hash;
    return target.href;
}

export function isLocalDocumentLink(href) {
    const value = String(href || "").trim();
    if (!value || value.startsWith("#") || value.startsWith("//")) return false;
    return /^file:/i.test(value) || !/^[a-z][a-z\d+.-]*:/i.test(value);
}

export function browserFileCapabilities(host) {
    return {
        open: typeof host.showOpenFilePicker === "function",
        save: typeof host.showSaveFilePicker === "function",
    };
}

function fileName(value) {
    // A browser file has a name, not a verified absolute filesystem path.
    return String(value || "document.md").split(/[\\/]/).pop() || "document.md";
}

export function validateBrowserContextPath(value, name = "") {
    let path = String(value || "").trim();
    if ((path.startsWith('"') && path.endsWith('"')) || (path.startsWith("'") && path.endsWith("'"))) {
        path = path.slice(1, -1);
    }
    if (!path || (name && path === name)) return "";
    const windows = /^[a-z]:[\\/]/i.test(path) || /^\\\\[^\\]+\\[^\\]+\\/.test(path);
    if ((!path.startsWith("/") && !windows) || /[\\/]$/.test(path) || /[\u0000-\u001f\u007f]/.test(path)) {
        throw new Error("Paste an absolute file path, not a relative path or URL.");
    }
    if (/^[a-z]:[\\/]fakepath[\\/]/i.test(path)) {
        throw new Error("The browser's fakepath is not a real file path. Paste the path from your file manager.");
    }
    const basename = path.split(/[\\/]/).pop();
    if (name && (windows ? basename.toLowerCase() !== name.toLowerCase() : basename !== name)) {
        throw new Error(`The context path must end with the opened filename: ${name}`);
    }
    return path;
}

export function withBrowserContextPath(opened, value) {
    if (!opened) throw new Error("Open a document before attaching its context path.");
    const contextPath = validateBrowserContextPath(value, opened.name);
    const document = { ...opened };
    if (contextPath) document.contextPath = contextPath;
    else delete document.contextPath;
    return document;
}

export async function retainBrowserContextPath(opened, previous) {
    // A matching filename or matching bytes do not prove it is the same file.
    if (!previous?.contextPath || opened.name !== previous.name || !opened.handle || !previous.handle) return opened;
    try {
        const same = opened.handle === previous.handle || await opened.handle.isSameEntry?.(previous.handle);
        if (same) return withBrowserContextPath(opened, previous.contextPath);
    } catch { /* If identity cannot be checked, ask for the path again. */ }
    return opened;
}

async function fileText(file) {
    const bytes = await file.arrayBuffer();
    let source;
    try {
        // Preserve BOM, CRLF, and UTF-16 source columns. Reject invalid UTF-8
        // instead of silently replacing characters and later saving corruption.
        source = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
    } catch {
        throw new Error("This file is not UTF-8 text. Open a UTF-8 Markdown, HTML, or text document.");
    }
    if (source.includes("\0")) throw new Error("This looks like a binary file. Open a text document instead.");
    return source;
}

export async function readBrowserFile(file, handle = null) {
    if (!file || typeof file.arrayBuffer !== "function") throw new Error("Choose a file to open.");
    const name = fileName(file.name);
    if (!documentFileAccept.split(",").some((extension) => name.toLowerCase().endsWith(extension))) {
        throw new Error("Choose a Markdown, HTML, Mermaid, PlantUML, or text file.");
    }
    const source = await fileText(file);
    return { name, source, handle };
}

export async function pickBrowserFile(host) {
    const handles = await host.showOpenFilePicker({ multiple: false, types: documentTypes });
    const handle = handles[0];
    if (!handle) return null;
    return readBrowserFile(await handle.getFile(), handle);
}

export function compareFileVersions(savedSource, draftSource, diskSource) {
    if (diskSource === savedSource) return "unchanged";
    if (diskSource === draftSource) return "matching";
    if (draftSource === savedSource) return "updated";
    return "conflict";
}

export async function readBrowserFileUpdate(opened) {
    if (typeof opened?.handle?.getFile !== "function") {
        throw new Error("Choose the file again to refresh it; this browser only provided a file snapshot.");
    }
    // Always get a new File: an earlier File object is not a live disk view.
    // Reading never requests write permission or changes the saved baseline.
    const latest = await readBrowserFile(await opened.handle.getFile(), opened.handle);
    return retainBrowserContextPath(latest, opened);
}

function fileChangedError(latestDocument, message = "The file changed outside this viewer. Refresh to review it, or use Save as to save your draft to a different file.") {
    return Object.assign(new Error(message), { name: "FileChangedError", latestDocument });
}

export function downloadBrowserFile(opened, source, host) {
    if (!opened) throw new Error("Open a document before downloading.");
    const blob = new host.Blob([source], { type: "text/plain;charset=utf-8" });
    const url = host.URL.createObjectURL(blob);
    const link = host.document.createElement("a");
    link.href = url;
    link.download = fileName(opened.name);
    link.hidden = true;
    try {
        host.document.body.appendChild(link);
        link.click();
    } finally {
        link.remove();
        host.setTimeout(() => host.URL.revokeObjectURL(url), 1000);
    }
    // Starting a download is not confirmation that the original file was saved.
    return { kind: "downloaded", document: opened };
}

export async function saveBrowserFile(opened, source, host) {
    if (!opened) throw new Error("Open a document before saving.");
    const handle = opened.handle;
    if (!handle) return saveBrowserFileAs(opened, source, host);
    if (handle.requestPermission && await handle.requestPermission({ mode: "readwrite" }) !== "granted") {
        throw new Error("Write permission was not granted. Your draft is unchanged; use Save as to choose a different file.");
    }
    const latestDocument = await readBrowserFileUpdate(opened);
    if (latestDocument.source !== opened.source) {
        throw fileChangedError(latestDocument);
    }
    await writeBrowserFile(handle, source);
    return savedBrowserFile(opened, source, handle);
}

export async function saveBrowserFileAs(opened, source, host) {
    if (!opened) throw new Error("Open a document before saving.");
    if (!browserFileCapabilities(host).save) return downloadBrowserFile(opened, source, host);
    // Open the picker before any await so the Save as click retains activation.
    const options = { suggestedName: opened.name, types: documentTypes };
    if (opened.handle) options.startIn = opened.handle;
    const handle = await host.showSaveFilePicker(options);
    if (opened.handle) {
        let sameEntry = handle === opened.handle;
        if (!sameEntry) {
            if (typeof handle.isSameEntry !== "function") {
                throw new Error("The browser cannot verify the Save as destination against the opened file. Nothing was written.");
            }
            sameEntry = await handle.isSameEntry(opened.handle);
            if (typeof sameEntry !== "boolean") {
                throw new Error("The Save as destination could not be verified. Nothing was written.");
            }
        }
        // A picker can return another handle for the original file. Do not let
        // Save as bypass its external-change guard or lose a verified context path.
        if (sameEntry) return saveBrowserFile(opened, source, host);
    }
    await writeBrowserFile(handle, source);
    return savedBrowserFile(opened, source, handle);
}

export async function overwriteBrowserFile(opened, source, expectedDiskDocument, host) {
    const handle = opened?.handle;
    if (typeof handle?.getFile !== "function" || typeof handle.createWritable !== "function") {
        throw new Error("Direct overwrite requires an opened file handle. Refresh to reselect the file in a supported browser, or download your draft.");
    }
    // The expected disk version must be for this exact authorized handle, not
    // an unrelated same-named file or the original (now stale) saved baseline.
    if (expectedDiskDocument?.handle !== handle || expectedDiskDocument.name !== opened.name ||
        typeof expectedDiskDocument.source !== "string" || typeof source !== "string") {
        throw new Error("Refresh this file before overwriting; a matching disk snapshot is required.");
    }
    if (typeof host?.confirm !== "function") throw new Error("An explicit overwrite confirmation is required.");
    const expectedSource = expectedDiskDocument.source;
    const expectedName = expectedDiskDocument.name;
    // Request permission while still inside the Overwrite click. Permission is
    // not consent to replace the external version; confirm separately below.
    if (handle.requestPermission && await handle.requestPermission({ mode: "readwrite" }) !== "granted") {
        throw new Error("Write permission was not granted. Neither version was overwritten.");
    }
    const verifyDiskVersion = async () => {
        const latest = await readBrowserFileUpdate(opened);
        if (latest.source !== expectedSource || latest.name !== expectedName) {
            throw fileChangedError(latest, "The file changed again. Nothing was overwritten. Review the latest conflict before choosing Overwrite file again.");
        }
    };
    await verifyDiskVersion();
    if (host.confirm(`Overwrite "${opened.name}" on disk with your draft? This replaces the external changes. This viewer does not keep a backup of the overwritten version.`) !== true) {
        return { kind: "cancelled", document: opened };
    }
    // Another app can save while a confirmation or browser permission dialog
    // is open. Recheck that the user-approved disk version is still current.
    await verifyDiskVersion();
    await writeBrowserFile(handle, source, verifyDiskVersion);
    return savedBrowserFile(opened, source, handle);
}

async function writeBrowserFile(handle, source, verifyDiskVersion = null) {
    const writable = await handle.createWritable({ mode: "exclusive" });
    try {
        if (verifyDiskVersion) await verifyDiskVersion();
        await writable.write(source);
        // Writes are staged until close. Abort the staged write if an external
        // edit appeared meanwhile. This is not an OS-level compare-and-swap:
        // an external app can still race the final check and close.
        if (verifyDiskVersion) await verifyDiskVersion();
        await writable.close();
    } catch (error) {
        try { await writable.abort(); } catch { /* Retain the original write/close failure. */ }
        throw error;
    }
}

function savedBrowserFile(opened, source, handle) {
    const document = { name: fileName(handle.name || opened.name), source, handle };
    // Save as chooses an unknown destination, even if it has the same basename.
    // Only retain a supplied path when writing the original opened handle.
    if (handle === opened.handle && document.name === opened.name && opened.contextPath) {
        document.contextPath = opened.contextPath;
    }
    return { kind: "saved", document };
}
