---
name: deploy-check
description: Validate the site before deployment — check for broken links, missing assets, HTML issues.
allowed-tools: Read, Grep, Glob, Bash
---

# Pre-Deploy Check

Run a validation pass across the site before deploying.

## Checks

1. **Broken internal links** — grep all `.html` files for `href=` and `src=` values. Verify that referenced files exist (images in `assets/`, page links, `content/data.js`).
2. **Missing cover images** — read `content/data.js` and check that every non-null `coverImage` path exists in `assets/`.
3. **Draft content leak** — ensure no items with `status:'draft'` appear in `sitemap.xml` or `feed.xml`.
4. **Console errors** — scan `<script>` blocks for obvious issues (undefined variables, unclosed template literals).
5. **Nav consistency** — verify that nav links in `projects.html` and `project-detail.html` match the nav in `index.html`.
6. **Sitemap completeness** — confirm every `.html` file at the root is listed in `sitemap.xml`.
7. **OG meta tags** — check that each page has `og:title`, `og:description`, and `og:url` meta tags.

## Output

Report findings as a checklist. Mark each check as pass or fail with details.
