---
layout: guide
title: "LaTeXML Builder"
permalink: /guide/latexml-builder/
---

# LaTeXML Builder

Convert your LaTeX project to HTML using LaTeXML on GitHub Actions and download the result as an artifact (a zip containing index.html and assets).

What you can upload
- A single .tex file (we’ll treat it as the main entry point)
- A .zip/.tar/.tar.gz/.tgz archive with your LaTeX project
- Or paste a direct URL to the .tex/.zip/.tar(.gz) file
- You can also drag-and-drop a file into the GitHub Issue created below

Output
- The workflow produces a downloadable artifact named: latexml-<output_slug>
- Download it from the workflow run’s “Artifacts” section (a link is posted back to your Issue automatically)

<div class="hero">
  <h3>Create a build request (GitHub Issue)</h3>
  <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:flex-end">
    <label style="display:flex; flex-direction:column; min-width:240px;">
      <span>Output slug (required)</span>
      <input id="slug" placeholder="e.g. my-paper" />
    </label>

    <label style="display:flex; flex-direction:column; min-width:240px;">
      <span>Main TeX path (default: main.tex)</span>
      <input id="mainTex" placeholder="main.tex" />
    </label>

    <label style="display:flex; flex-direction:column; min-width:360px; flex:1;">
      <span>Source URL (optional)</span>
      <input id="archiveUrl" placeholder="https://example.com/my-paper.tex or my-paper.zip/.tar.gz" />
    </label>

    <button id="openIssueBtn" type="button" style="appearance:none; border:1px solid var(--border); background:#fff; border-radius:8px; padding:0.6rem 0.9rem; cursor:pointer;">
      Create GitHub Issue
    </button>
  </div>

  <p class="muted" style="margin-top:0.5rem;">
    Tip: After the Issue opens, you can drag-and-drop your .tex/.zip/.tar(.gz) file into the Issue body. The workflow will automatically pick up the first URL in the Issue body (including uploaded attachments).
  </p>
</div>

## How it works

- This repository has a GitHub Actions workflow that:
  - Accepts either a direct URL to your .tex or archive, or uses your uploaded attachment in the Issue
  - Runs LaTeXML in Docker to convert to HTML
  - Publishes a downloadable artifact (latexml-<output_slug>) containing index.html and any assets
  - Posts a comment on your Issue with a link to the workflow run where you can download the artifact

- You can also manually start the workflow from the Actions tab:
  - “LaTeX to HTML (LaTeXML)” → Run workflow → enter Source URL (optional), Main TeX, Output slug

## Steps

1) Fill the form above (Output slug is required; Main TeX defaults to main.tex).
2) Click “Create GitHub Issue” — it opens with the correct template pre-filled.
3) Optionally drag-and-drop your .tex/.zip/.tar(.gz) file into the Issue body.
4) Submit the Issue — the Action triggers automatically.
5) When the Action finishes, open the link posted in the Issue comment to the workflow run and download the artifact “latexml-<slug>”.
6) Unzip the artifact locally; open index.html in your browser.

<script>
(function () {
  // Configure your repo here (owner/repo)
  const repo = "{{ site.github.repository_nwo | default: 'neverdie88/neverdie88.github.io' }}";
  const slugEl = document.getElementById('slug');
  const mainEl = document.getElementById('mainTex');
  const urlEl = document.getElementById('archiveUrl');
  const btn = document.getElementById('openIssueBtn');

  function buildIssueBody(slug, mainTex, archiveUrl) {
    const lines = [];
    lines.push("output_slug: " + (slug || ""));
    lines.push("main_tex: " + (mainTex || "main.tex"));
    lines.push("archive_url: " + (archiveUrl || ""));
    lines.push("");
    lines.push("Attach your file below (drag-and-drop .tex/.zip/.tar/.tar.gz):");
    return lines.join("\n");
  }

  function openIssue() {
    const slug = (slugEl && slugEl.value || "").trim();
    const mainTex = (mainEl && mainEl.value || "").trim() || "main.tex";
    const archiveUrl = (urlEl && urlEl.value || "").trim();

    if (!slug) {
      alert("Please enter an output slug.");
      return;
    }

    const title = "[LaTeX] " + slug;
    const body = buildIssueBody(slug, mainTex, archiveUrl);

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
