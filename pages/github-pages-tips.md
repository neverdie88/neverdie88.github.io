---
layout: guide
title: "GitHub Pages: Tips and Troubleshooting"
permalink: /guide/tips/
---

# GitHub Pages: Tips and Troubleshooting

This page summarizes practical tips and common fixes when creating and maintaining a GitHub Pages (Jekyll) site.

---

## Repository conventions and page scaffolding (this repo)

Use these conventions so new pages are consistent with the existing style and layouts in this repository.

- Layouts
  - _layouts/default.html
    - Global header with nav, centered container, footer
    - Inline CSS variables and typography, “Latest posts” on the home page (index.html)
    - Favicon via inline SVG in the head
  - _layouts/guide.html
    - Full-width main content, sticky sidebar “On this page”
    - Auto-generated table of contents from h2/h3 headings (no hardcoded section names)
    - Supports draggable, resizable floating text boxes created by dragging TOC items into the page
    - Same favicon and base style as default layout

- Pages
  - Location: pages/
  - Front matter includes layout, title, and optional permalink
  - For guide-like docs, prefer layout: guide and a permalink under /guide/<slug>/
  - Conventions for headings:
    - Use h2/h3 (## / ###) for sections so the guide sidebar builds links automatically
    - You can add explicit anchors with {#custom-id} if you want stable links
  - Example (new guide page):
    ```markdown
    ---
    layout: guide
    title: "Your Guide Title"
    permalink: /guide/your-slug/
    ---

    # Your Guide Title

    ## Section one
    Content...

    ## Section two {#custom-anchor}
    More content...
    ```

- Posts (time-indexed entries)
  - Location: _posts/
  - Filename: YYYY-MM-DD-your-title.md
  - Front matter includes layout, title, and date
  - Appears in the index.html “Latest posts” list automatically
  - Example:
    ```markdown
    ---
    layout: default
    title: "Your Post Title"
    date: 2025-11-07 09:00:00 +1100
    ---

    Short content or a link to your main page at /guide/your-slug/
    ```

- Navigation and linking
  - The default layout’s nav includes:
    - Home → /
    - Guide → /guide/github-pages/
    - Tips  → /guide/tips/
  - To add a new top-level page to the nav, edit _layouts/default.html <nav> and append:
    ```html
    <a href="{{ '/guide/your-slug/' | relative_url }}">Your Guide</a>
    ```
  - The home page callout link can be edited in index.html’s hero section.

- Styling
  - This site uses inline CSS inside _layouts/*.html with theme variables defined in :root
  - For page-specific tweaks, add minimal styles within the page body or consider updating the layout style blocks to keep consistency
  - Use relative_url when linking to assets: {{ "/assets/..." | relative_url }}

- Favicon
  - Already added as an inline SVG link in both layouts. You can replace the inline SVG if you need a different icon.

- Contribution checklist for new pages
  1) Decide page type:
     - Guide page (layout: guide, permalink under /guide/)
     - Blog post (in _posts/, time-indexed)
  2) Create the Markdown file:
     - pages/your-new-page.md for a guide (use the template above)
     - _posts/YYYY-MM-DD-your-title.md for a post (use the post template)
  3) Headings and anchors:
     - Use ## (h2) and ### (h3) to populate the sidebar automatically
     - Optionally add anchors: ## Section {#anchor-name}
  4) Navigation:
     - If you want a top-level nav link, edit _layouts/default.html <nav> and add your link
     - Optionally add a hero link in index.html
  5) Verify links:
     - Use | relative_url for internal links so they work with or without baseurl
  6) Local test:
     - bundle exec jekyll serve --livereload and check /guide/your-slug/

---

## Quick checklist

- Repository name (for user site) is exactly `<username>.github.io`
- Gemfile uses `github-pages` to match GitHub build environment
- Install gems locally (no sudo): `bundle config set --local path 'vendor/bundle' && bundle install`
- Serve locally with: `bundle exec jekyll serve --livereload`
- Commit only source files (not `_site/`)
- Push to `main` (user site) or configured Pages branch (project site)
- Check Pages build logs: Repo → Actions → “pages-build-deployment” and Settings → Pages

---

## Common setup pitfalls

- User site repo name must match your account exactly: `<username>.github.io`
- Project sites need a configured Pages source:
  - Settings → Pages → Source (branch + folder) or GitHub Actions
- Custom domain:
  - Add domain in Settings → Pages → Custom domain
  - Create DNS CNAME → `<username>.github.io`
  - Commit a `CNAME` file at repo root with your domain
- HTTPS:
  - Enable “Enforce HTTPS” in Settings → Pages (after domain resolves)
- Give it time:
  - Builds can take a minute or two after each push

---

## Local environment tips (macOS)

Install and use Homebrew Ruby to avoid system Ruby permission issues:
```bash
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
```

Local Bundler install (no sudo):
```bash
/opt/homebrew/opt/ruby/bin/gem install bundler --no-document
/opt/homebrew/opt/ruby/bin/bundle config set --local path 'vendor/bundle'
/opt/homebrew/opt/ruby/bin/bundle install
/opt/homebrew/opt/ruby/bin/bundle exec jekyll serve --livereload
```

Native gems failing to compile (e.g., `commonmarker`):
```bash
xcode-select --install
```

---

## Gemfile guidance

Use the `github-pages` gem so your local environment matches GitHub’s build:
```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "webrick", "~> 1.8" # for Ruby 3+
```

Notes:
- Avoid manually bumping individual gems when using `github-pages`; versions are curated by GitHub Pages.
- `bundle update` is generally unnecessary; rely on `github-pages` updates.

---

## Jekyll build errors (local)

- Clean rebuild:
  ```bash
  rm -rf _site .jekyll-cache
  bundle exec jekyll serve --trace
  ```
- Liquid errors:
  - Check front matter (`---` at top)
  - Ensure includes/layouts exist and paths are correct
- Liquid in code blocks:
  - Wrap in raw tags:
    {% raw %}
    ```liquid
    {{ site.title }}
    ```
    {% endraw %}

---

## GitHub Pages build failures

- Where to look:
  - Repo → Actions → “pages-build-deployment” logs
  - Repo → Settings → Pages (errors / URL)
- Plugins:
  - GitHub Pages allows only a safe plugin set. Custom/unlisted plugins won’t build on GitHub. Use `github-pages` gem’s allowed set.
- Theme differences:
  - Remote themes require `jekyll-remote-theme` (allowed) and proper `theme` in `_config.yml`.
- Missing Gemfile:
  - Not strictly required, but recommended for local development parity.

---

## GitHub Actions: Jekyll build for Pages (recommended)

When using GitHub Actions to build and deploy Jekyll to Pages, use a supported workflow. Avoid non-existent actions like `actions/jekyll-build`.

Example (known-good) workflow:
```yaml
name: Deploy Jekyll site to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3' # If native gem issues, try '3.2'
          bundler-cache: true

      - name: Build with Jekyll
        run: bundle exec jekyll build -d ./_site --trace

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./_site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Troubleshooting: "Unable to resolve action actions/jekyll-build"
- Symptom: GitHub Actions fails with “Unable to resolve action actions/jekyll-build, repository not found”.
- Cause: `actions/jekyll-build` is not a valid GitHub Action.
- Fix:
  - Replace that step with:
    - `ruby/setup-ruby@v1` to install Ruby and cache gems
    - `bundle exec jekyll build -d ./_site` to build the site
    - Keep `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`
- Also check:
  - Repo Settings → Pages → Build and deployment → Source = “GitHub Actions”
  - Gemfile contains either:
    - `gem "github-pages", group: :jekyll_plugins` (parity with GitHub Pages environment), or
    - `gem "jekyll"` plus any plugins you need (Actions builds are not restricted by the Pages plugin allowlist)
  - If bundler/gems fail on Actions, try `ruby-version: '3.2'` as a fallback for native extensions.

---

## Navigation updates across layouts

If you add a new guide page (e.g., `/guide/deepwiki/`), update the top nav in both layouts for consistency:
- `_layouts/default.html` (site-wide pages)
- `_layouts/guide.html` (guide pages with sidebar)

Use `relative_url` so links work with or without a `baseurl`.

{% raw %}
```html
<nav>
  <a href="{{ '/' | relative_url }}">Home</a>
  <a href="{{ '/guide/latexml-builder/' | relative_url }}">LaTeXML Builder</a>
  <a href="{{ '/guide/deepwiki/' | relative_url }}">DeepWiki</a>
</nav>
```
{% endraw %}

---

## Mermaid diagrams on GitHub Pages (optional)

Mermaid in Markdown code fences renders as plain text by default. For in-browser rendering, include a client-side script:

```html
<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
  mermaid.initialize({ startOnLoad: true, theme: "default" });
</script>
```

Notes:
- Inline scripts are allowed on GitHub Pages (no special plugin needed).
- If you use a strict Content Security Policy (CSP), adjust it to permit the CDN or self-host Mermaid.

---

## URLs and baseurl gotchas

- For user sites (`<username>.github.io`), `baseurl` is often empty.
- For project sites, set `baseurl: "/your-repo"` in `_config.yml`.
- Always generate links with filters:
  - `{{ "/your/path/" | relative_url }}`
  - `{{ "/your/path/" | absolute_url }}`

This prevents broken links when `baseurl` changes.

---

## Assets and 404s

- Favicon 404:
  - Add a `favicon.ico` to repo root or add a `<link rel="icon">` tag in your layout head.
  - You can generate an `.ico` from a PNG or SVG with an online tool.
- Missing CSS/JS:
  - Use `{{ "/assets/..." | relative_url }}` to ensure correct paths under a `baseurl`.

---

## Markdown / Kramdown quirks

- Definition lists:
  - A list item ending with a colon followed by an indented block can render as a definition list (term appears bold).
  - Fix by fencing the block:
    ```yaml
    ---
    layout: default
    title: "About"
    ---
    ```
- Escaping Liquid in code:
  - Use `{% raw %}...{% endraw %}` around code blocks containing `{{ ... }}`.

---

## Permalinks and navigation

- Pages can set a friendly URL:
  ```yaml
  ---
  layout: default
  title: "About"
  permalink: /about/
  ---
  ```
- Update your layout navigation to include important sections (e.g., Guide, Tips).

---

## Posts, dates, and timezones

- Post filenames: `YYYY-MM-DD-your-title.md`
- Front matter `date:` controls ordering if needed
- Timezone:
  - Set `timezone:` in `_config.yml` if you need build-time conversion

---

## Cache busting

- If CSS or JS changes aren’t reflected:
  - Hard refresh browser or add a querystring (`app.css?v=1`)
  - Consider fingerprinting assets during a build step (not provided by default Jekyll)

---

## Quick commands reference

```bash
# First-time setup
/opt/homebrew/opt/ruby/bin/gem install bundler --no-document
/opt/homebrew/opt/ruby/bin/bundle config set --local path 'vendor/bundle'
/opt/homebrew/opt/ruby/bin/bundle install

# Serve locally
/opt/homebrew/opt/ruby/bin/bundle exec jekyll serve --livereload

# Clean build
rm -rf _site .jekyll-cache
bundle exec jekyll serve --trace

# Publish (user site)
git add .
git commit -m "Update site"
git push origin main
```

If you hit an issue not covered here, add it to this page so it becomes your running playbook.
