---
layout: guide
title: "GitHub Pages: Setup, Local Testing, and Publishing"
date: 2025-11-03
---

# GitHub Pages: Setup, Local Testing, and Publishing

This guide shows how to:
- Create a GitHub Pages site (user/organization or project)
- Run and test locally with Jekyll
- Publish updates to GitHub Pages

Quick start option: start from an existing GitHub Pages repository. You can fork or use a template such as https://github.com/<username>/<username>.github.io and then customize it. 

For example, to reuse the style of https://github.com/neverdie88/neverdie88.github.io, fork it (or click “Use this template”) to your account and edit.

---

## 1) Create a GitHub Pages repository {#create-repo}

There are two types of GitHub Pages sites:

- User/Organization site: one site per GitHub account, named exactly `<your-username>.github.io`
- Project site: a site for a specific repository

User/Organization site (recommended for a personal homepage):
1. Create a new repository named exactly `<your-username>.github.io`.
2. Optionally initialize it with a README.
3. Clone it locally.

Project site:
1. Use any repository name (e.g., `my-project`).
2. You can publish from a `gh-pages` branch or via GitHub Actions.

---

## 2) Clone your repository {#clone}

```bash
# Replace with your repo URL
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

For a user/organization site, the repository name must be `<your-username>.github.io`.  
Example: if your GitHub account is `neverdie88`, your user site repository is `neverdie88.github.io`.

---

## 3) Run locally (macOS, no sudo) {#run-locally}

This setup matches GitHub Pages by using Bundler and the `github-pages` gem. Use the Homebrew Ruby toolchain to avoid system Ruby permission issues.

One-time Homebrew Ruby install:
```bash
brew install ruby
# Optional: add Ruby to your PATH for new shells
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
```

Create a file named Gemfile in your repository root:
```ruby
source "https://rubygems.org"

# Use GitHub Pages to match the environment used on github.io
gem "github-pages", group: :jekyll_plugins

# Needed when running Jekyll on Ruby 3+ (harmless on older Rubies)
gem "webrick", "~> 1.8"
```

Install dependencies locally (into `vendor/bundle`) and serve:
```bash
# Install Bundler using Homebrew Ruby
/opt/homebrew/opt/ruby/bin/gem install bundler --no-document

# Install gems into ./vendor/bundle (no sudo)
/opt/homebrew/opt/ruby/bin/bundle config set --local path 'vendor/bundle'
/opt/homebrew/opt/ruby/bin/bundle install

# Run the site locally with livereload
/opt/homebrew/opt/ruby/bin/bundle exec jekyll serve --livereload
```

Open:
- http://127.0.0.1:4000/

Tip: If you added Ruby to your PATH in `~/.zshrc`, you can omit the long paths:
```bash
bundle install
bundle exec jekyll serve --livereload
```

---

## 4) Add content {#add-content}

Pages:
- Place standalone pages in `pages/` (Markdown or HTML).
- Example (Markdown):
```markdown
---
layout: default
title: "About"
permalink: /about/
---
# About
Write your page content here.
```

Posts (optional blog):
- Create files in `_posts/` named `YYYY-MM-DD-your-title.md`.
- Example (safe default layout is `default` if your theme has no `post` layout):
```markdown
---
layout: default
title: "My First Post"
date: 2025-11-05 10:00:00 +1100
---
This is my first blog post!
```

Preview changes locally with `bundle exec jekyll serve`, then commit and push.

---

## 5) Publish to GitHub Pages {#publish}

User/Organization site:
- Push to the default branch (usually `main`).
- GitHub Pages auto-builds and deploys.
- Visit: `https://<your-username>.github.io/`.

Project site:
- In your repo: Settings → Pages
  - Choose a source: “Deploy from a branch” (often `gh-pages`) or set up GitHub Actions.
  - Follow the on-screen instructions.

Standard Git workflow:
```bash
git add .
git commit -m "Add content"
git push origin main
```

Check deployment:
- Repository → Actions → “pages-build-deployment”
- Repository → Settings → Pages → confirm the URL

---

## 6) Troubleshooting {#troubleshooting}

- Permission denied installing gems:
  - Use Homebrew Ruby + local bundle path (`vendor/bundle`) as shown above.

- Native extension build errors (e.g., `commonmarker`):
  - Use Homebrew Ruby (`brew install ruby`). Ensure Xcode Command Line Tools:
    ```bash
    xcode-select --install
    ```

- Faraday “retry middleware” message:
  - Informational; not required for local serving.

- Missing `/favicon.ico` log line:
  - Add a `favicon.ico` at the repo root to silence.

- Ignore build artifacts:
  - `.gitignore` should include:
    ```
    _site/
    .jekyll-cache/
    .jekyll-metadata
    .bundle/
    vendor/
    vendor/bundle/
    ```

---

## 7) Quick command reference {#quick-reference}

```bash
# First-time setup (macOS)
/opt/homebrew/opt/ruby/bin/gem install bundler --no-document
/opt/homebrew/opt/ruby/bin/bundle config set --local path 'vendor/bundle'
/opt/homebrew/opt/ruby/bin/bundle install

# Serve locally
/opt/homebrew/opt/ruby/bin/bundle exec jekyll serve --livereload

# Publish
git add .
git commit -m "Update site"
git push origin main
```

---


## 8) Repository structure {#repo-structure}

A typical GitHub Pages (Jekyll) repository contains configuration, layouts, content, and generated output. Here’s a quick map of common files and folders:

```text
.
├── _config.yml            # Site-wide configuration (title, description, plugins, baseurl)
├── Gemfile                # Ruby gems (uses github-pages for GitHub Pages parity)
├── index.html             # Home page (uses a layout and Liquid to render content)
├── _layouts/              # HTML layouts wrapping page/post content via {{ "{{ content " }}}}
│   ├── default.html       # Main site layout (header/nav/footer)
│   └── guide.html         # Custom layout with sidebar for the guide
├── _includes/             # Reusable partial snippets (optional)
├── _posts/                # Blog posts named YYYY-MM-DD-your-title.md
├── pages/                 # Standalone pages (e.g., About, Guides)
├── assets/                # CSS/JS/images (optional; structure is up to you)
├── _site/                 # Generated output (DO NOT EDIT; ignored by git)
├── .jekyll-cache/         # Build cache (ignored)
├── .jekyll-metadata       # Build metadata (ignored)
├── vendor/                # Local gem installs when bundling to vendor/bundle
└── .gitignore             # Ignore build outputs and local artifacts
```

Key directories and files:
- _config.yml
  - Central config for your site (title/description/author/permalinks/plugins).
  - GitHub Pages loads a safe set of plugins. Using the github-pages gem locally aligns versions.
- _layouts/
  - HTML templates that wrap page/post content via the Liquid variable {{ "{{ content " }}}}.
  - Example: default.html provides header/nav/footer; guide.html adds a sticky sidebar.
- _includes/ (optional)
  - Reusable partials included with {% raw %}{% include file.html %}{% endraw %}.
- _posts/
  - Blog posts named `YYYY-MM-DD-your-title.md` with front matter:
    ```yaml
    ---
    layout: default
    title: "My Post"
    date: 2025-11-05 10:00:00 +1100
    ---
    ```
  - Jekyll auto-indexes posts by date in site.posts.
- pages/
  - Standalone pages. Each needs front matter with a layout and optional permalink:
    ```yaml
    ---
    layout: default
    title: "About"
    permalink: /about/
    ---
    ```
- assets/ (optional)
  - Static files (CSS/JS/images). Reference with {{ "{{ '/assets/...' | relative_url " }}}}.
- index.html
  - Your homepage; usually uses a layout and may loop site.posts.
- _site/
  - The built site output. Never edit; it’s regenerated on each build and should be in .gitignore.
- Gemfile
  - Declares gems. Using gem "github-pages" ensures local versions match GitHub Pages’ build environment.
- vendor/ and .bundle/
  - Where gems are installed locally when using Bundler’s path config (keeps system Ruby untouched).

Tips:
- Use relative_url and absolute_url filters to generate correct links with or without baseurl.
- Always commit source files (not _site/) and let GitHub Pages build your site.
