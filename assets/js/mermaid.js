import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
mermaid.initialize({ startOnLoad: false, theme: "default" });

// Render fenced ```mermaid code blocks produced by Jekyll/Kramdown
document.addEventListener('DOMContentLoaded', () => {
  const selectors = [
    'pre code.language-mermaid',
    'pre code.mermaid',
    'code.language-mermaid',
    'code.mermaid'
  ];
  const blocks = document.querySelectorAll(selectors.join(','));
  blocks.forEach(code => {
    const pre = code.closest('pre');
    const text = code.textContent;
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = text;
    if (pre) {
      pre.replaceWith(div);
    } else {
      code.replaceWith(div);
    }
  });
  mermaid.run({ querySelector: '.mermaid' });
});
