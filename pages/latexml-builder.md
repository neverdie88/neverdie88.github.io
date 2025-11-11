---
layout: guide
title: "LaTeXML Builder"
permalink: /guide/latexml-builder/
---

# LaTeXML Builder

Convert a LaTeX project to HTML using LaTeXML on GitHub Actions and publish the result to this site under /latexml/<slug>/.

This supports two ways to provide sources:
- arXiv ID (e.g. 2508.12631 or 2508.12631v2) — the workflow fetches the source from arXiv automatically
- Archive URL — a link to your .zip/.tar(.gz) containing the LaTeX project
- Or attach an archive to a GitHub Issue via drag-and-drop (see below)

The result will be published at:
- https://{{ site.github.owner_name | default: site.author.github | default: "USERNAME" }}.github.io/{{ site.github.repository_name | default: site.title | default: "REPO" }}/latexml/<output_slug>/

<div class="hero">
  <h3>Create a build request (GitHub Issue)</h3>
  <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:flex-end">
    <label style="display:flex; flex-direction:column; min-width:240px;">
      <span>Output slug (required)</span>
      <input id="slug" placeholder="e.g. 2508.12631v2" />
    </label>

    <label style="display:flex; flex-direction:column; min-width:240px;">
      <span>Main TeX path (default: main.tex)</span>
      <input id="mainTex" placeholder="main.tex" />
    </label>

    <label style="display:flex; flex-direction:column; min-width:240px;">
      <span>arXiv ID (optional)</span>
      <input id="arxivId" placeholder="e.g. 2508.12631v2" />
    </label>

    <label style="display:flex; flex-direction:column; min-width:360px; flex:1;">
      <span>Archive URL (optional)</span>
      <input id="archiveUrl" placeholder="https://example.com/my-paper.zip (or .tar/.tar.gz/.tgz)" />
    </label>

    <button id="openIssueBtn" type="button" style="appearance:none; border:1px solid var(--border); background:#fff; border-radius:8px; padding:0.6rem 0.9rem; cursor:pointer;">
      Create GitHub Issue
    </button>
  </div>

  <p class="muted" style="margin-top:0.5rem;">
    Tip: You can also drag-and-drop your LaTeX archive directly into the Issue page after it opens. The issue template is already configured with the required label to trigger the build automatically.
  </p>
</div>

## How it works

- This site repository contains a GitHub Actions workflow that:
  - Accepts an arXiv ID or archive URL (or an attached file in the Issue)
  - Runs LaTeXML inside Docker to convert the LaTeX to HTML
  - Commits the generated HTML under latexml/<output_slug>/
  - The page becomes available at /latexml/<output_slug>/ once the Action completes

- You can also manually start the workflow from the Actions tab with “Run workflow” and fill the inputs (arXiv ID / Archive URL / Main TeX / Output slug).

## Steps

1) Fill the form above (Output slug is required).
2) Click “Create GitHub Issue” — a new browser tab opens with the Issue template pre-filled.
3) Optionally drag-and-drop your .zip or .tar(.gz) LaTeX archive into the Issue body.
4) Submit the Issue — the Action will trigger and publish the result.
5) Open the published HTML at:
   - /latexml/<output_slug>/

## Load a built HTML into this site’s viewer (optional)

If you want to preview the generated HTML inside the in-browser viewer instead of navigating to the standalone URL:
- Go to the LaTeX Viewer: /guide/latex-viewer/
- Use the “Load LaTeXML build” slug feature (if present), or just open the URL: /latexml/<slug>/

<script>
(function () {
  // Configure your repo here (owner/repo)
  const repo = "{{ site.github.repository_nwo | default: 'neverdie88/neverdie88.github.io' }}";
  const slugEl = document.getElementById('slug');
  const mainEl = document.getElementById('mainTex');
  const arxivEl = document.getElementById('arxivId');
  const urlEl = document.getElementById('archiveUrl');
  const btn = document.getElementById('openIssueBtn');

  function buildIssueBody(slug, mainTex, arxivId, archiveUrl) {
    const lines = [];
    lines.push("output_slug: " + (slug || ""));
    lines.push("main_tex: " + (mainTex || "main.tex"));
    lines.push("arxiv_id: " + (arxivId || ""));
    lines.push("archive_url: " + (archiveUrl || ""));
    lines.push("");
    lines.push("Attach your archive below (drag-and-drop .zip/.tar/.tar.gz):");
    return lines.join("\n");
  }

  function openIssue() {
    const slug = (slugEl && slugEl.value || "").trim();
    const mainTex = (mainEl && mainEl.value || "").trim() || "main.tex";
    const arxivId = (arxivEl && arxivEl.value || "").trim();
    const archiveUrl = (urlEl && urlEl.value || "").trim();

    if (!slug) {
      alert("Please enter an output slug.");
      return;
    }

    const title = "[LaTeX] " + slug;
    const body = buildIssueBody(slug, mainTex, arxivId, archiveUrl);

    // Build new issue URL using template; include title and body
    const base = "https://github.com/" + repo + "/issues/new";
    const params = new URLSearchParams();
    params.set("template", "latex-upload.md");
    params.set("title", title);
    params.set("body", body);

    const url = base + "?" + params.toString();
    window.open(url, "_blank", "noopener");
  }

  if (btn) btn.addEventListener('click', openIssue);
})();
</script>
