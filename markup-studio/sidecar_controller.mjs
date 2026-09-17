import { checkpointReview, createReviewHistory, reviewChanges } from "./sidecar_history.mjs";
import { chooseMetadataDestination, loadSidecarFile, matchesBoundDocument, metadataTypes, saveSidecarFile } from "./sidecar_file.mjs";

// The viewer owns the current document and disk-save state. This controller owns
// automatic document history and explicitly selected companion-file handles.
export function createSidecarController({ host, getState, setBusy, restoreDraft }) {
    const doc = host.document;
    const element = (id) => doc.getElementById(id);
    const button = element("sidecarMetadataButton"), dialog = element("sidecarDialog");
    const saveHistoryOption = element("saveHistoryOption"), saveHistoryInput = element("saveHistoryInput");
    const note = element("sidecarNote");
    const info = element("sidecarInfo"), notice = element("sidecarNotice");
    const revisions = element("sidecarRevisions"), preview = element("sidecarPreview");
    const save = element("sidecarSave"), saveAs = element("sidecarSaveAs");
    const load = element("sidecarLoad"), restore = element("sidecarRestore");
    const restart = element("sidecarRestart"), close = element("sidecarClose");
    const input = element("sidecarFileInput");
    let history = null, binding = null, dirty = false, message = "", generation = 0;
    let saveHistory = false;

    function announce(text) {
        message = text;
        notice.textContent = text;
        notice.hidden = !text;
        update();
    }

    function update() {
        const state = getState();
        button.hidden = !state.staticMode || !state.opened;
        button.disabled = state.busy || !state.opened || state.diagramOpen;
        button.textContent = "Metadata…";
        button.title = "View document history, restore checkpoints, or save metadata";
        saveHistoryOption.hidden = !state.staticMode;
        saveHistoryInput.checked = saveHistory;
        saveHistoryInput.disabled = state.busy || !history || !state.opened || state.diagramOpen;
        saveHistoryOption.title = binding
            ? `${saveHistory ? "Updating" : "Updates paused for"} ${binding.handle.name}. Includes original and deleted text.`
            : "Choose an .edit-history.json companion when enabling. Includes original and deleted text. Without a save picker, history is downloaded separately.";
        load.disabled = state.busy || !state.opened;
        note.disabled = state.busy || !history;
        save.disabled = saveAs.disabled = state.busy || !history;
        restart.disabled = state.busy || !state.opened;
        restore.disabled = state.busy || !history?.revisions.length;
        close.disabled = state.busy;
        saveAs.hidden = !binding;
        save.textContent = binding ? "Save metadata" : "Save metadata as…";
        const pendingDraft = history && state.current !== history.revisions.at(-1).source;
        const target = binding ? `Linked metadata: ${binding.handle.name}.` : "No metadata file linked yet.";
        info.textContent = history
            ? `${history?.revisions.length || 0} checkpoint(s). ${target} ${dirty || pendingDraft ? "Metadata has pending changes." : "Metadata is current for its recorded snapshot."}${message ? ` ${message}` : ""}`
            : message || "Open a document to start its history automatically.";
    }

    function refreshDialog() {
        update();
        revisions.replaceChildren();
        if (!history) { preview.textContent = "No document history is available yet."; return; }
        for (const revision of history.revisions) {
            const option = doc.createElement("option");
            option.value = String(revision.revision);
            option.textContent = `${revision.revision}. ${revision.at} · ${revision.kind} · ${revision.file_state}${revision.note ? ` · ${revision.note}` : ""}`;
            revisions.appendChild(option);
        }
        revisions.value = String(history.revisions.at(-1).revision);
        const state = getState();
        preview.textContent = reviewChanges(history.revisions[0].source, state.current, state.opened.name).unified_diff || "No changes from the review baseline.";
    }

    function reset() {
        generation += 1;
        history = binding = null;
        saveHistory = false;
        dirty = false;
        note.value = message = "";
        notice.textContent = "";
        notice.hidden = true;
        if (dialog.open) dialog.close();
        update();
    }

    async function opened(document) {
        reset();
        if (!getState().staticMode || !document) return;
        const currentGeneration = generation;
        try {
            const baseline = await createReviewHistory({ name: document.name, source: document.source,
                path: document.contextPath || "", fileState: document.handle ? "saved" : "snapshot" });
            if (generation !== currentGeneration || getState().opened !== document) return;
            history = baseline;
            // Merely reading a file must not create an unsaved-history warning
            // or prompt for filesystem permissions. Only real history changes do.
            refreshDialog();
        } catch (error) {
            if (generation === currentGeneration && getState().opened === document) {
                announce(`Document opened, but history could not be started: ${error.message || error}`);
            }
        }
    }

    async function rebound(opened) {
        if (!binding) return;
        let matches = false;
        try { matches = await matchesBoundDocument(binding, opened); }
        catch { /* If identity cannot be established, detach rather than overwrite. */ }
        if (matches) return;
        binding = null;
        saveHistory = false;
        dirty = true;
        announce("Document saved/rebound at a different location. Check Save edit history to choose a companion for this destination; the previous sidecar was left unchanged.");
    }

    function contextChanged(previous, opened) {
        // Called only by the viewer's context-path setter. Changing an annotation
        // must not detach a snapshot's explicitly selected metadata handle.
        if (binding?.document === previous) binding = { ...binding, document: opened };
        if (history && (history.document.path || "") !== (opened.contextPath || "")) dirty = true;
        update();
    }

    async function record(source, kind, opened, persist, fileState = opened.handle ? "saved" : "snapshot") {
        if (!history) return;
        try {
            const previous = history;
            history = await checkpointReview(history, {
                source, kind, name: opened.name, path: opened.contextPath || "",
                fileState, note: note.value,
            });
            dirty ||= history.revisions !== previous.revisions || history.document.name !== previous.document.name ||
                (history.document.path || "") !== (previous.document.path || "");
            note.value = "";
            const previousBinding = binding;
            await rebound(opened);
            if (previousBinding && !binding) return;
            if (!dirty) { update(); return; }
            if (saveHistory && persist && (binding || typeof host.showSaveFilePicker !== "function")) {
                const snapshot = history;
                const result = await saveSidecarFile({ history, opened, binding, host,
                    verifyCurrent: () => history === snapshot && getState().opened === opened });
                binding = result.binding;
                dirty = result.kind !== "saved";
                announce(result.kind !== "saved"
                    ? "History download started. Place the .edit-history.json beside your document; the browser cannot confirm either download's location or completion."
                    : kind === "export"
                        ? `${binding.handle.name} updated for the exported draft. The document download is not a confirmed disk save.`
                        : `Document and ${binding.handle.name} saved. ${getState().current !== source ? "Newer edits remain in the draft." : "The review baseline is unchanged."}`);
            } else if (kind === "external_refresh") {
                announce("An external file version was recorded separately in history. Refresh did not write metadata; save metadata when ready.");
            } else if (saveHistory) {
                announce("Document saved. Check Save edit history again to choose a companion, or use Metadata below the document.");
            } else {
                announce("");
            }
        } catch (error) {
            // The document may already be committed. Never report its successful
            // save as a failed/rolled-back document write because the sidecar failed.
            dirty = true;
            announce(`Document saved/loaded, but metadata was not saved: ${error.message || error} Use Metadata below the document to retry or choose a new file.`);
        }
        if (dialog.open) refreshDialog();
        else update();
    }

    async function saveMetadata({ as = false } = {}) {
        const state = getState();
        if (state.busy || !history || !state.opened || state.diagramOpen) return false;
        const previous = history, capturedNote = note.value;
        let destination;
        // Pick or request permission before awaiting hashes, preserving the click.
        try {
            destination = as || !binding ? chooseMetadataDestination(state.opened, host)
                : binding.handle.requestPermission?.({ mode: "readwrite" });
        } catch (error) { announce(`Could not choose metadata destination: ${error.message || error}`); return false; }
        setBusy(true);
        try {
            const picked = await destination;
            if (!as && binding && picked !== undefined && picked !== "granted") throw new Error("Metadata write permission was not granted.");
            const handle = as || !binding ? picked : binding.handle;
            const candidate = await checkpointReview(previous, {
                source: state.current, name: state.opened.name, path: state.opened.contextPath || "", kind: "export",
                fileState: state.current !== state.saved ? "draft" : state.opened.handle ? "saved" : "snapshot", note: capturedNote,
            });
            const result = await saveSidecarFile({ history: candidate, opened: state.opened, binding, handle, host,
                verifyCurrent: () => history === previous && getState().opened === state.opened });
            history = candidate;
            saveHistory = true;
            if (result.kind === "saved") binding = result.binding;
            dirty = result.kind !== "saved" || getState().current !== state.current || note.value !== capturedNote;
            if (note.value === capturedNote) note.value = "";
            announce(result.kind === "saved"
                ? `${binding.handle.name} saved. ${candidate.current.file_state === "draft" ? "It describes an unsaved draft, not the file on disk." : "An agent can verify the recorded document hash."}`
                : "Metadata export started. Place the JSON beside the document; this browser cannot confirm the download location or completion. The recorded file state distinguishes a draft from a saved file.");
            return true;
        } catch (error) {
            announce(error.name === "AbortError" ? "Metadata save cancelled. Document and history are unchanged."
                : `Metadata was not saved: ${error.message || error}`);
            return false;
        } finally { setBusy(false); refreshDialog(); }
    }

    async function loadMetadata(file = null) {
        const state = getState();
        if (state.busy || !state.opened || state.diagramOpen) return;
        if (!file && typeof host.showOpenFilePicker !== "function") {
            input.value = "";
            input.click();
            return;
        }
        setBusy(true);
        try {
            const handle = file ? null : (await host.showOpenFilePicker({ multiple: false, types: metadataTypes, excludeAcceptAllOption: true }))[0];
            if (!file && !handle) return;
            const loaded = await loadSidecarFile(file || await handle.getFile(), {
                opened: state.opened, sources: [state.current, state.saved], handle,
            });
            if (history && dirty && !host.confirm("Replace the in-memory review with this matching metadata? Document edits and existing files will remain unchanged.")) return;
            history = loaded.history;
            binding = loaded.binding;
            saveHistory = Boolean(binding);
            dirty = false;
            note.value = "";
            announce(`Loaded ${history.revisions.length} hash-checked checkpoint(s). The document was not changed. Imported paths are not used to open or save files.`);
        } catch (error) { announce(`Could not load metadata: ${error.message || error}`); }
        finally { setBusy(false); refreshDialog(); }
    }

    function restoreRevision(value = revisions.value) {
        if (getState().busy || !history) return;
        const revision = history.revisions.find((item) => String(item.revision) === String(value));
        if (!revision) return;
        if (!host.confirm(`Restore checkpoint ${revision.revision} into the draft? This replaces current in-memory edits but does not write the document or metadata.`)) return;
        try {
            restoreDraft(revision.source);
            dirty = true;
            announce(`Checkpoint ${revision.revision} restored into the draft. Save the document to write it; the review baseline and previous checkpoints remain available.`);
            dialog.close();
        } catch (error) { announce(`Could not restore the draft: ${error.message || error}`); }
    }

    async function startNewReview() {
        const state = getState();
        if (state.busy || !state.opened) return;
        if (!host.confirm("Start a new review from the saved/loaded file snapshot? Old checkpoints will be removed from memory and replaced in the linked sidecar on its next save. Save metadata as a separate backup first if you want to retain them. The document is unchanged.")) return;
        setBusy(true);
        try {
            history = await createReviewHistory({ name: state.opened.name, source: state.saved, path: state.opened.contextPath || "" });
            dirty = true;
            note.value = "";
            announce("New review baseline created. No file has been written yet.");
        } catch (error) { announce(`Could not start a review: ${error.message || error}`); }
        finally { setBusy(false); refreshDialog(); }
    }

    button.addEventListener("click", () => {
        if (getState().busy || !getState().opened || getState().diagramOpen) return;
        refreshDialog();
        dialog.showModal();
    });
    saveHistoryInput.addEventListener("change", async () => {
        const state = getState();
        if (state.busy || !history || !state.opened || state.diagramOpen) { update(); return; }
        saveHistory = saveHistoryInput.checked;
        if (!saveHistory) {
            announce("History saving is off. Existing metadata is unchanged; edits are still tracked in this tab.");
            return;
        }
        // The explicit checkbox gesture grants a chance to pick/request access.
        // Do not open a second picker after an asynchronous document Save.
        if (!await saveMetadata()) saveHistory = false;
        update();
    });
    note.addEventListener("input", () => { if (history && !getState().busy) { dirty = true; update(); } });
    save.addEventListener("click", () => saveMetadata());
    saveAs.addEventListener("click", () => saveMetadata({ as: true }));
    load.addEventListener("click", () => loadMetadata());
    restore.addEventListener("click", () => restoreRevision());
    restart.addEventListener("click", startNewReview);
    close.addEventListener("click", () => { if (!getState().busy) dialog.close(); });
    dialog.addEventListener("cancel", (event) => { if (getState().busy) event.preventDefault(); });
    input.addEventListener("change", () => { if (input.files?.[0]) loadMetadata(input.files[0]); });
    update();

    return {
        update, reset, opened, rebound, contextChanged, saveMetadata, loadMetadata, restoreRevision, startNewReview,
        saved: (source, kind, opened) => record(source, kind, opened, true),
        downloaded: (source, opened) => saveHistory
            ? record(source, "export", opened, true,
                source !== getState().saved ? "draft" : opened.handle ? "saved" : "snapshot") : undefined,
        external: (source, opened) => record(source, "external_refresh", opened, false),
        hasUnsavedMetadata: () => Boolean(saveHistory && history && dirty),
        confirmLeave: () => !saveHistory || !history || !dirty || host.confirm("This document has history that has not been saved to a metadata file. Open another file and discard its in-memory history? Existing files are unchanged."),
        isOpen: () => dialog.open,
        state: () => ({ dirty, history, binding, message, saveHistory }),
    };
}
