# neverdie88.github.io

## Site layout

The homepage lists **Blogs** and `/tools/` lists the published apps. Both use
`_layouts/workspace.html` and `assets/css/workspace.css`: the Reader workspace
sidebar, blue accents and LinkedIn icon selected from the local Tools preview.
Shared navigation is in `_includes/navigation-links.html`; tools and concise
blog descriptions are in `_data/tools.yml` and `_data/blog_summaries.yml`.
Tools are grouped in order into Productivity, Music and Games using each entry's
`category` field. The motion games are standalone static bundles, listed below.
`/blogs/` redirects to the homepage. Existing article URLs and content remain
in place, with shared styles under `assets/css/`.

## Motion games

All six games are linked from `/tools/#category-games` and support 1–4 local
players. Camera tracking runs on the player's device; GitHub Pages supplies
HTTPS for camera access. Keyboard, mouse or touch alternatives are available
within each game.

| Game | Published path | Source project in Playground |
| --- | --- | --- |
| Fruit Ninja | `/fruit-ninja/` | `fruit-ninja/` |
| Dragon Race | `/dragon-race/` | `dragon-race/` |
| Ice Bump Rally | `/ice-bump-rally/` | `ice-race/` |
| Flappy Birds | `/flappy-birds/` | `flappy-birds/` |
| Star Sentinel | `/star-sentinel/` | `star-sentinel/` |
| Mole Mayhem | `/mole-mayhem/` | `whack-a-mole/` |

To update a game, run `npm test` and `npm run build` in its source project, then
copy the contents of `dist/` to its published directory. Copy `THIRD_PARTY.md`
when supplied. Keep the bundled `vendor/` directory, tracking model, both WASM
variants, fonts and license notices. The `.gitignore` exceptions ensure each
game's runtime libraries are committed alongside its code.

Build the complete Jekyll site before publishing and confirm the game bundles
are unchanged in `_site/`. After the Pages deployment, verify all six routes,
the Games list and the runtime assets. Automated tests cover simulated motion;
they do not replace a physical-camera playtest.

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
  piano/treble/bass templates, keyboard note entry, sampled grand piano playback
  of all parts or a selected staff/voice, save/print and fullscreen.
- `/music-shared/`: theme, theory/detector helpers, licensed glyphs and fullscreen.

Keep all three directories together. Each app README documents its source and
behavior. The pitch app does not load the editor, score renderer or OMR models.
Run `npm ci --prefix _tests` and `node --test _tests/pitch-*.test.cjs`, then the
normal Jekyll build. The browser harnesses in `_tests` are excluded from Pages.
