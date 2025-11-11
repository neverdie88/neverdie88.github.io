---
name: LaTeX upload (LaTeXML build)
about: Upload a LaTeX project (.zip/.tar/.tar.gz) or provide an arXiv ID to build HTML via LaTeXML and publish under /latexml/<slug>/
title: "[LaTeX] "
labels: ["latex-upload"]
assignees: []
---

Provide the details below, then drag-and-drop your LaTeX archive into this issue before submitting.

This will trigger the "LaTeXML build" GitHub Action and publish the generated HTML to:
https://{YOUR_USER}.github.io/{YOUR_REPO}/latexml/<output_slug>/

Required
- output_slug: my-paper-slug
- main_tex: main.tex

Optional (choose one source method)
- arxiv_id: 2508.12631v2
- OR archive_url: https://example.com/my-paper.zip

Notes
- If you’re uploading the archive here, just drag-and-drop the .zip/.tar(.gz) below. GitHub will turn it into a downloadable link included in the issue body.
- If the main TeX file isn’t main.tex, set main_tex accordingly (e.g., src/paper.tex).
- If both arxiv_id and archive_url are provided, arXiv takes precedence in the workflow.

Paste/edit fields
output_slug:
main_tex:
arxiv_id:
archive_url:

Attach your archive below (drag-and-drop .zip/.tar/.tar.gz):
