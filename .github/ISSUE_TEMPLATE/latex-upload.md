---
name: LaTeX upload (LaTeXML build)
about: Upload a .tex or .zip/.tar(.gz) LaTeX project to convert to HTML via LaTeXML and get a downloadable artifact
title: "[LaTeX] "
labels: ["latex-upload"]
assignees: []
---

Provide the details below, then drag-and-drop your LaTeX source (.tex) or archive (.zip/.tar/.tar.gz) into this issue before submitting.

This will trigger the "LaTeX to HTML (LaTeXML)" GitHub Action and produce a downloadable artifact (contains index.html and assets). The Action will add a comment to this issue with a link to the workflow run; download the artifact from the run’s Artifacts section.

Required
- output_slug: my-paper-slug

Optional
- main_tex: main.tex
- archive_url: https://example.com/my-paper.zip

Notes
- If you attach a file here, GitHub will include the uploaded asset URL in the issue body; the Action will detect and use it automatically.
- Set main_tex if your entry-point TeX file is not main.tex (e.g., src/paper.tex).
- If both an attachment and archive_url are present, either will work; the Action picks the first URL in the body.

Paste/edit fields
output_slug:
main_tex:
archive_url:

Attach your file below (drag-and-drop .tex/.zip/.tar/.tar.gz):
