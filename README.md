# neverdie88.github.io

## Markup Studio

[Open Markup Studio](https://neverdie88.github.io/markup-studio/).

A browser-based editor for Markdown and HTML documents, with rich-text editing,
tables, expandable sections, Mermaid/PlantUML diagrams, and source-aware copying
for agent context.

The complete static app source is in `markup-studio/`: `index.html`,
`viewer.html`, `browser_file.mjs`, `selection_menu.mjs`,
`selection_context.mjs`, `selection_menu.css`, `sidecar_history.mjs`,
`sidecar_file.mjs`, and `sidecar_controller.mjs`. Keep these nine files together.
The editor requires no Python server or separate build step.

Open `/markup-studio/` to enter static mode. Files are opened and edited in the
browser; saving to an opened file depends on browser support and permission.
Rendering libraries load from CDNs, so this is not an offline bundle. Open only
documents you trust.

### Undo, redo, and edit history

Use **Undo** and **Redo** beside Save for rendered text and formatting. They work
without saving a history file and do not write to disk.

File-operation and history messages appear below the file controls in the header,
outside the document panel. They are not part of the saved document.

To retain edit history for another session or an agent:

1. Open a document, for example `report.md`, and check **Save edit history**.
2. Choose the suggested `report.md.edit-history.json` name and place it beside
   the document. This requires a separate browser file selection and permission.
3. Subsequent document saves update the selected history file while the checkbox
   is checked. Unticking stops history-file writes without deleting the file;
   changes continue to be tracked in memory until the tab closes.
4. After reopening, use **Metadata… → Load metadata…** below the document to
   resume its verified history. Existing `.meta.json` files still work and keep
   their chosen filename unless you explicitly save history under a new name.

The JSON identifies itself as `edit-history`, names its `main-document`, and
describes already-applied changes rather than instructions to apply a diff.
Check `current.file_state` and the main file hash: an exported snapshot may be
an unsaved draft, not the file on disk. Without a native save picker, exports
download separately; the browser cannot confirm their final location or save.
History includes original and deleted text. Keep documents and generated history
files private unless you intend to share them; they are not part of this site.

Pushes to `main` build this site with the existing Jekyll workflow and deploy it
to GitHub Pages.


## Music apps

- `/pitch-visualizer/`: microphone pitch display, optional pitch trace,
  tap/click treble/bass switching, tuning and fullscreen.
- `/sheet-music/`: separate MusicXML/photo import, recognition, composing,
  playback of all parts or a selected staff/voice, save/print and fullscreen.
- `/music-shared/`: theme, theory/detector helpers, licensed glyphs and fullscreen.

Keep all three directories together. Each app README documents its source and
behavior. The pitch app does not load the editor, score renderer or OMR models.
Run `npm ci --prefix _tests` and `node --test _tests/pitch-*.test.cjs`, then the
normal Jekyll build. The browser harnesses in `_tests` are excluded from Pages.
