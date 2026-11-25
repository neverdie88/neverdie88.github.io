/**
 * Rich Markdown + Offline KaTeX Renderer for GCP Study Hub
 * Safely renders:
 * - Display LaTeX: $$...$$ and \[...\] (including live half-streamed trailing $$... during SSE)
 * - Smart Inline LaTeX: \(...\) and $...$ (with strict currency guard so "$100 to $200" stays literal $)
 * - Escaped dollars: \$100 -> $100
 * - Markdown inside <details><summary>...</summary>...</details>
 * - GitHub-Flavored Alerts: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
 * - Preserves fenced ```mermaid blocks untouched for Mermaid SVG rendering
 */
(function () {
  'use strict';

  function injectRichMarkdownStyles() {
    if (document.getElementById('rich-markdown-styles')) return;
    const style = document.createElement('style');
    style.id = 'rich-markdown-styles';
    style.textContent = `
      .katex-display-wrap {
        overflow-x: auto;
        overflow-y: hidden;
        padding: 8px 10px;
        margin: 8px 0;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
      }
      .katex-display-wrap .katex-display {
        margin: 0.25em 0;
      }
      .msg-md .katex {
        font-size: 1.04em;
      }
      .msg-md table {
        border-collapse: collapse;
        width: 100%;
        margin: 10px 0;
        font-size: 12.8px;
        display: block;
        overflow-x: auto;
      }
      .msg-md th, .msg-md td {
        border: 1px solid #cbd5e1;
        padding: 6px 10px;
        text-align: left;
      }
      .msg-md th {
        background: #f1f5f9;
        font-weight: 700;
      }
      .msg-md details {
        margin: 10px 0;
        padding: 10px 12px;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        background: #f8fafc;
      }
      .msg-md details > summary {
        cursor: pointer;
        font-weight: 700;
        color: #1e40af;
        user-select: none;
      }
      .msg-md details[open] > summary {
        margin-bottom: 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid #e2e8f0;
      }
      .gh-alert {
        margin: 10px 0;
        padding: 10px 12px;
        border-radius: 8px;
        border-left: 4px solid #3b82f6;
        background: #eff6ff;
        font-size: 13px;
      }
      .gh-alert-title {
        font-weight: 800;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .gh-alert.note { border-left-color: #2563eb; background: #eff6ff; color: #1e3a8a; }
      .gh-alert.tip { border-left-color: #16a34a; background: #f0fdf4; color: #14532d; }
      .gh-alert.important { border-left-color: #7c3aed; background: #f5f3ff; color: #4c1d95; }
      .gh-alert.warning { border-left-color: #d97706; background: #fffbeb; color: #78350f; }
      .gh-alert.caution { border-left-color: #dc2626; background: #fef2f2; color: #7f1d1d; }
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function fallbackMathHtml(tex, displayMode) {
    // Clean readable fallback if KaTeX hasn't loaded yet
    const readable = String(tex || '')
      .replace(/\\text\{([^}]*)\}/g, '$1')
      .replace(/\\textbf\{([^}]*)\}/g, '$1')
      .replace(/\\rightarrow|\\to\b/g, ' → ')
      .replace(/\\leftarrow/g, ' ← ')
      .replace(/\\leftrightarrow/g, ' ↔ ')
      .replace(/\\Rightarrow|\\implies\b/g, ' ⇒ ')
      .replace(/\\dots|\\ldots|\\cdots/g, '…')
      .replace(/\\times/g, ' × ')
      .replace(/\\cdot/g, ' · ')
      .replace(/\\le\b|\\leq\b/g, ' ≤ ')
      .replace(/\\ge\b|\\geq\b/g, ' ≥ ')
      .replace(/\\ne\b|\\neq\b/g, ' ≠ ')
      .replace(/\\approx/g, ' ≈ ')
      .replace(/\\%/g, '%');
    return displayMode
      ? `<div class="katex-display-wrap"><code>${escapeHtml(readable)}</code></div>`
      : `<code>${escapeHtml(readable)}</code>`;
  }

  function renderTex(tex, displayMode) {
    const cleanTex = String(tex || '').trim();
    if (!cleanTex) return '';
    if (window.katex && typeof window.katex.renderToString === 'function') {
      try {
        const html = window.katex.renderToString(cleanTex, {
          displayMode: Boolean(displayMode),
          throwOnError: false,
          strict: false,
          trust: false,
        });
        return displayMode ? `<div class="katex-display-wrap">${html}</div>` : html;
      } catch {
        return fallbackMathHtml(cleanTex, displayMode);
      }
    }
    return fallbackMathHtml(cleanTex, displayMode);
  }

  function looksLikeRealInlineMath(expr) {
    const t = expr.trim();
    if (!t || t.length > 260) return false;
    // If it starts with a number like "$100 ... $200", reject unless it clearly contains LaTeX / math operators
    if (/^\d/.test(t)) {
      if (/\b(?:to|and|or|per|month|hour|day|year|million|thousand|gb|tb|usd)\b/i.test(t)) return false;
      return /[\\^_=<>]|\\times|\\cdot|\\frac|\\div|\*\*/.test(t);
    }
    // Reject obvious currency-spanning prose with many spaces and no math tokens
    const words = t.split(/\s+/);
    if (words.length > 6 && !/[\\^_=<>+\-*/{}]/.test(t)) return false;
    return true;
  }

  const ALERT_META = {
    NOTE: { cls: 'note', icon: 'ℹ️', label: 'Note' },
    TIP: { cls: 'tip', icon: '💡', label: 'Tip' },
    IMPORTANT: { cls: 'important', icon: '📌', label: 'Important' },
    WARNING: { cls: 'warning', icon: '⚠️', label: 'Warning' },
    CAUTION: { cls: 'caution', icon: '🚨', label: 'Caution' },
  };

  function upgradeGithubAlertsHtml(html) {
    return html.replace(/<blockquote>\s*<p>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(?:<br\s*\/?>|\n)?([\s\S]*?)<\/blockquote>/gi, (_, kind, rest) => {
      const meta = ALERT_META[String(kind).toUpperCase()] || ALERT_META.NOTE;
      return `<div class="gh-alert ${meta.cls}"><div class="gh-alert-title"><span>${meta.icon}</span><span>${meta.label}</span></div><p>${rest}</div>`;
    });
  }

  function renderRichMarkdown(rawMd, opts = {}) {
    injectRichMarkdownStyles();
    if (!rawMd) return '';
    let src = String(rawMd);

    if (opts.stripToc !== false) {
      src = src
        .replace(/\n##\s+Table of Contents[\s\S]*?(?=\n##\s+(?!Table of Contents)|$)/i, '\n')
        .replace(/\n---\s*\n---\s*\n/g, '\n---\n');
    }

    // 1. Temporarily shield fenced code blocks & inline code spans so math regexes never touch code!
    const codeShields = [];
    const shieldCode = match => {
      const idx = codeShields.length;
      codeShields.push(match);
      return `CODESHIELDTOKEN${idx}END`;
    };
    // Shield closed fenced blocks, unclosed streaming fenced blocks at EOF, and inline code spans
    src = src.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, shieldCode);
    src = src.replace(/```[^\n]*\n[\s\S]*$/g, shieldCode);
    src = src.replace(/`[^`\n]+`/g, shieldCode);

    // 2. Recursively parse Markdown inside <details><summary>...</summary>...</details>
    const detailsBlocks = [];
    src = src.replace(/<details(\s[^>]*)?>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi, (_, attrs, summaryHtml, innerMd) => {
      // Restore any code shields inside innerMd before recursive call
      const restoredInner = innerMd.replace(/CODESHIELDTOKEN(\d+)END/g, (__, i) => codeShields[Number(i)] || '');
      const renderedInner = renderRichMarkdown(restoredInner, { stripToc: false });
      const dIdx = detailsBlocks.length;
      detailsBlocks.push(`<details${attrs || ''}><summary>${summaryHtml.trim()}</summary><div class="details-body">${renderedInner}</div></details>`);
      return `\n\nDETAILSBLOCKTOKEN${dIdx}END\n\n`;
    });

    // 3. Shield escaped literal \$ so it renders as plain '$' instead of opening inline math
    src = src.replace(/\\\$/g, 'ESCAPEDDOLLARTOKENEND');

    // 4. Extract Display Math ($$...$$ and \[...\], plus live unclosed trailing $$... at stream tail)
    const mathBlocks = [];
    const pushMath = (tex, displayMode) => {
      const idx = mathBlocks.length;
      mathBlocks.push({ tex, displayMode });
      return displayMode ? `\n\nKATEXMATHBLOCK${idx}END\n\n` : `KATEXMATHINLINE${idx}END`;
    };

    src = src.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => pushMath(tex, true));
    src = src.replace(/\\\[([\s\S]+?)\\\]/g, (_, tex) => pushMath(tex, true));
    // Handle live half-streamed trailing $$... at very end of streaming message
    src = src.replace(/\$\$([^$]{2,400})$/g, (m, tex) => (tex.trim() ? pushMath(tex, true) : m));

    // 5. Extract Inline Math (\(...\) and smart single-line $...$ scanner that never swallows later $ on currency!)
    src = src.replace(/\\\(([\s\S]+?)\\\)/g, (_, tex) => pushMath(tex, false));
    src = src
      .split('\n')
      .map(line => {
        if (!line.includes('$')) return line;
        let res = '';
        let i = 0;
        while (i < line.length) {
          const dPos = line.indexOf('$', i);
          if (dPos === -1) {
            res += line.slice(i);
            break;
          }
          res += line.slice(i, dPos);
          const prevCh = dPos > 0 ? line[dPos - 1] : '';
          const nextCh = dPos + 1 < line.length ? line[dPos + 1] : '';
          // Opening '$' must not follow backslash/alphanumeric/$ and must not be followed by space or '$'
          if (/[\\a-zA-Z0-9$]/.test(prevCh) || !nextCh || /\s|\$/.test(nextCh)) {
            res += '$';
            i = dPos + 1;
            continue;
          }
          const closePos = line.indexOf('$', dPos + 1);
          if (closePos === -1) {
            res += line.slice(dPos);
            break;
          }
          const beforeClose = line[closePos - 1];
          const afterClose = closePos + 1 < line.length ? line[closePos + 1] : '';
          const expr = line.slice(dPos + 1, closePos);
          if (!/\s/.test(beforeClose) && !/[0-9]/.test(afterClose) && looksLikeRealInlineMath(expr)) {
            res += pushMath(expr, false);
            i = closePos + 1;
          } else {
            // Not valid math (e.g. "$100"): emit literal '$' and advance by ONLY 1 so closePos can still open real math!
            res += '$';
            i = dPos + 1;
          }
        }
        return res;
      })
      .join('\n');

    // 6. Restore code shields BEFORE marked.parse so marked natively renders ```mermaid and code blocks
    src = src.replace(/CODESHIELDTOKEN(\d+)END/g, (_, i) => codeShields[Number(i)] || '');
    src = src.replace(/ESCAPEDDOLLARTOKENEND/g, '$');

    // 7. Parse Markdown via marked
    let html = window.marked && window.marked.parse
      ? window.marked.parse(src, { breaks: true, gfm: true })
      : `<pre style="white-space:pre-wrap">${escapeHtml(src)}</pre>`;

    // 8. Upgrade GitHub-Flavored Alerts
    html = upgradeGithubAlertsHtml(html);

    // 9. Restore <details> blocks and KaTeX Display & Inline Math
    html = html.replace(/<p>\s*DETAILSBLOCKTOKEN(\d+)END\s*<\/p>/g, (_, i) => detailsBlocks[Number(i)] || '');
    html = html.replace(/DETAILSBLOCKTOKEN(\d+)END/g, (_, i) => detailsBlocks[Number(i)] || '');

    html = html.replace(/<p>\s*KATEXMATHBLOCK(\d+)END\s*<\/p>/g, (_, i) => {
      const item = mathBlocks[Number(i)];
      return item ? renderTex(item.tex, true) : '';
    });
    html = html.replace(/KATEXMATHBLOCK(\d+)END/g, (_, i) => {
      const item = mathBlocks[Number(i)];
      return item ? renderTex(item.tex, true) : '';
    });
    html = html.replace(/KATEXMATHINLINE(\d+)END/g, (_, i) => {
      const item = mathBlocks[Number(i)];
      return item ? renderTex(item.tex, false) : '';
    });

    return html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectRichMarkdownStyles);
  } else {
    injectRichMarkdownStyles();
  }

  window.renderRichMarkdown = renderRichMarkdown;
})();
