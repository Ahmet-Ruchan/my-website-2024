---
name: new-page
description: Create a new HTML page for the portfolio site with correct nav, footer, and styling conventions.
argument-hint: "[page-name]"
allowed-tools: Read, Write, Edit
---

# Create New Page

Scaffold a new HTML page that matches the site's design system.

## Steps

1. Read `index.html` to extract the current nav and footer markup verbatim
2. Create `$0.html` with:
   - Same `<head>` setup: charset, viewport, favicon, Tailwind CDN, Font Awesome CDN
   - Appropriate `<title>` and `<meta>` description/OG tags
   - Nav copied exactly from `index.html` — but prefix anchor-only links with `index.html#` (e.g., `href="index.html#about"`)
   - A `<main>` section for the page content
   - Footer copied exactly from `index.html`
   - Mobile nav toggle script
3. Include the shared CSS classes in an embedded `<style>` block: `.gradient-text`, `.nav-link`, `.section-title`, and any others used by nav/footer
4. If the page needs content from `data.js`, add `<script src="content/data.js"></script>` in `<head>`

## Conventions

- Color palette: blue `#3b82f6`, purple `#8b5cf6`, orange `#f97316`, yellow `#eab308`
- Use Tailwind utilities for layout; embedded `<style>` for animations/gradients
- All external links: `target="_blank" rel="noopener noreferrer"`
- Update `sitemap.xml` with the new page URL
