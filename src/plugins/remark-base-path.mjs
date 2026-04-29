/**
 * remark-base-path.mjs
 *
 * Rewrites absolute internal links in the remark (markdown) AST so that
 * content files can use clean paths like `/labs/foo` regardless of the
 * deploy base path.
 *
 * Handles two node types:
 *   - `link`                  — standard markdown links [text](/path)
 *   - `mdxJsxFlowElement` /   — MDX component props  <LinkCard href="/path">
 *     `mdxJsxTextElement`
 *
 * Note: HTML <a href> elements that are rendered from .md files are handled
 * by the companion rehype-base-path plugin.
 */

import { visit } from 'unist-util-visit';

/** @param {{ base?: string }} options */
export default function remarkBasePath({ base = '' } = {}) {
  const normalizedBase = base.replace(/\/$/, '');

  function rewrite(url) {
    if (typeof url !== 'string') return url;
    if (!url.startsWith('/')) return url; // external / relative / anchor
    if (normalizedBase && (url === normalizedBase || url.startsWith(normalizedBase + '/'))) {
      return url; // already contains base
    }
    return normalizedBase + url;
  }

  return (tree) => {
    // 1. Markdown text links: [text](/path)
    visit(tree, 'link', (node) => {
      node.url = rewrite(node.url);
    });

    // 2. MDX JSX element props: <Component href="/path" />
    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      if (!Array.isArray(node.attributes)) return;
      for (const attr of node.attributes) {
        if (
          attr.type === 'mdxJsxAttribute' &&
          attr.name === 'href' &&
          typeof attr.value === 'string'
        ) {
          attr.value = rewrite(attr.value);
        }
      }
    });
  };
}
