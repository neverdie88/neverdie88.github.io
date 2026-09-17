# neverdie88.github.io

## Markup Studio

[Open Markup Studio](https://neverdie88.github.io/markup-studio/).

A browser-based editor for Markdown and HTML documents, with rich-text editing,
tables, expandable sections, Mermaid/PlantUML diagrams, and source-aware copying
for agent context.

The complete static app source is in `markup-studio/`: `index.html`,
`viewer.html`, `browser_file.mjs`, `selection_menu.mjs`,
`selection_context.mjs`, and `selection_menu.css`. Keep these files together.
The editor requires no Python server or separate build step.

Open `/markup-studio/` to enter static mode. Files are opened and edited in the
browser; saving to an opened file depends on browser support and permission.
Rendering libraries load from CDNs, so this is not an offline bundle. Open only
documents you trust.

Pushes to `main` build this site with the existing Jekyll workflow and deploy it
to GitHub Pages.
