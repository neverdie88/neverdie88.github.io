// User-authorized companion files only. Metadata never chooses a filesystem path.
import { parseSidecar, serializeSidecar, sidecarName } from "./sidecar_history.mjs";
import { downloadBrowserFile, readBrowserFileUpdate } from "./browser_file.mjs";

export const metadataTypes = [{ description: "Markup Studio edit history", accept: { "application/json": [".json"] } }];

export async function readSidecarText(file) {
    if (!file || typeof file.arrayBuffer !== "function") throw new Error("Choose a metadata JSON file.");
    try { return new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(await file.arrayBuffer()); }
    catch { throw new Error("Metadata must be valid UTF-8 JSON."); }
}

export async function sameFile(left, right) {
    if (!left || !right) return false;
    if (left === right) return true;
    const result = typeof left.isSameEntry === "function" ? await left.isSameEntry(right)
        : typeof right.isSameEntry === "function" ? await right.isSameEntry(left) : undefined;
    if (typeof result !== "boolean") throw new Error("This browser cannot verify file identity. Nothing was overwritten.");
    return result;
}

export async function matchesBoundDocument(binding, opened) {
    if (binding.document === opened) return true;
    return sameFile(binding.documentHandle, opened.handle);
}

export function chooseMetadataDestination(opened, host) {
    // Invoke synchronously from the click, before hashing or any other await.
    if (typeof host.showSaveFilePicker !== "function") return null;
    const options = { suggestedName: sidecarName(opened.name), types: metadataTypes, excludeAcceptAllOption: true };
    if (opened.handle) options.startIn = opened.handle;
    return host.showSaveFilePicker(options);
}

export async function loadSidecarFile(file, { opened, sources, handle = null }) {
    const source = await readSidecarText(file);
    const history = await parseSidecar(source, { name: opened.name, sources });
    if (handle && opened.handle && await sameFile(handle, opened.handle)) throw new Error("The metadata file must not be the document itself.");
    return { history, binding: handle ? { handle, source, documentHandle: opened.handle, document: opened } : null };
}

export async function saveSidecarFile({ history, opened, binding = null, handle = binding?.handle, host, verifyCurrent = () => true }) {
    if (history.document.name !== opened.name) throw new Error("The metadata document name does not match the open document.");
    const source = serializeSidecar(history);
    const verifyDocument = async () => {
        if (!verifyCurrent()) throw new Error("The document or review changed while metadata was being saved. Retry for the current version.");
        if (history.current.file_state === "saved") {
            const latest = await readBrowserFileUpdate(opened);
            if (latest.source !== history.revisions.at(-1).source) throw new Error("The document changed after saving. Metadata was not committed for a different file version.");
        }
    };
    if (!handle) {
        await verifyDocument();
        const result = downloadBrowserFile({ name: sidecarName(opened.name) }, source, host);
        return { kind: result.kind, source, binding: null };
    }
    if (typeof handle.name !== "string" || !/\.json$/i.test(handle.name)) throw new Error("Choose a separate .json metadata file. The document was not overwritten.");
    if (opened.handle && await sameFile(handle, opened.handle)) throw new Error("The metadata destination is the document itself. Nothing was overwritten.");
    if (handle.name === opened.name) throw new Error("Choose a metadata filename different from the document.");
    const matchedBinding = binding && await sameFile(handle, binding.handle) ? binding : null;
    if (matchedBinding && !await matchesBoundDocument(matchedBinding, opened)) {
        throw new Error("This metadata is linked to a different document location. Choose a new metadata file or load matching metadata for this document. The previous sidecar was left unchanged.");
    }
    const expected = matchedBinding ? matchedBinding.source : await readSidecarText(await handle.getFile());
    // An arbitrary existing file is never adopted and overwritten by Save as.
    // Load validated metadata first, or select a new/empty destination.
    if (!matchedBinding && expected.length) throw new Error("That metadata file already exists. Use Load metadata to resume it, or choose a new filename. Nothing was overwritten.");
    if (handle.requestPermission && await handle.requestPermission({ mode: "readwrite" }) !== "granted") {
        throw new Error("Metadata write permission was not granted. The document is unchanged by this metadata operation.");
    }
    const verify = async () => {
        await verifyDocument();
        const current = await readSidecarText(await handle.getFile());
        if (current !== expected) throw new Error("The metadata file changed outside this editor. Nothing was overwritten; load its latest version or save metadata under a new name.");
    };
    await verify();
    const writable = await handle.createWritable({ mode: "exclusive" });
    try {
        await verify();
        await writable.write(source);
        await verify();
        await writable.close();
    } catch (error) {
        try { await writable.abort(); } catch { /* Retain the original error. */ }
        throw error;
    }
    return { kind: "saved", source, binding: { handle, source, documentHandle: opened.handle, document: opened } };
}
