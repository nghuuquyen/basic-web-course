/**
 * rehype-base-path.mjs
 *
 * Rewrites absolute internal links and image sources to include the site base
 * path, so that content files (.md / .mdx) can use clean paths like `/labs/foo`
 * regardless of where the site is deployed.
 *
 * Example: base = '/basic-web-course'
 *   /labs/foo  →  /basic-web-course/labs/foo     (rewritten)
 *   https://…  →  unchanged                       (external)
 *   ./relative →  unchanged                       (relative)
 *   /basic-web-course/labs/foo → unchanged        (already has base)
 *
 * Usage in astro.config.mjs:
 *   import rehypeBasePath from './src/plugins/rehype-base-path.mjs';
 *   markdown: { rehypePlugins: [[rehypeBasePath, { base: '/basic-web-course' }]] }
 */

import { visit } from 'unist-util-visit';

/** @param {{ base?: string }} options */
export default function rehypeBasePath({ base = '' } = {}) {
  // Normalise: strip trailing slash so we never get double slashes.
  const normalizedBase = base.replace(/\/$/, '');

  /**
   * Returns the rewritten URL, or the original if no rewrite is needed.
   * @param {string} url
   */
  function rewrite(url) {
    if (typeof url !== 'string') return url;
    // Leave external URLs, mailto:, tel:, anchors, and relative paths alone.
    if (!url.startsWith('/')) return url;
    // Already contains the base prefix — leave alone.
    if (normalizedBase && (url === normalizedBase || url.startsWith(normalizedBase + '/'))) {
      return url;
    }
    return normalizedBase + url;
  }

  return (tree) => {
    visit(tree, 'element', (node) => {
      const props = node.properties;
      if (!props) return;

      // <a href>, <link href>
      if (typeof props.href === 'string') {
        props.href = rewrite(props.href);
      }
      // <img src>, <source src>, <script src>
      if (typeof props.src === 'string') {
        props.src = rewrite(props.src);
      }
      // <source srcset> — comma-separated list of "url [descriptor]"
      if (typeof props.srcSet === 'string') {
        props.srcSet = props.srcSet
          .split(',')
          .map((entry) => {
            const [url, ...rest] = entry.trim().split(/\s+/);
            return [rewrite(url), ...rest].join(' ');
          })
          .join(', ');
      }
    });
  };
}
