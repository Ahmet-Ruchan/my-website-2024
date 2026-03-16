# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for Ahmet Ruçhan Avcı (ML Engineer). Static site with no build pipeline or framework — Tailwind CSS, Font Awesome, marked.js, and highlight.js are all loaded via CDN. No npm scripts, no test suite.

**Local development:** Open `index.html` in a browser, or use VS Code Live Server (port 5501).

## Architecture

### Pages

| File | Purpose |
|---|---|
| `index.html` | Main portfolio — single-page with `#about`, `#experience`, `#projects`, `#contact` anchor sections. All CSS in an embedded `<style>` block, all JS in a `<script>` block at the bottom. |
| `projects.html` | Projects & Research hub — filterable card grid. Loads `content/data.js`. |
| `project-detail.html` | Universal detail page, driven by `?slug=X` query param. Loads `content/data.js`, marked.js (v9), and highlight.js for markdown rendering. |
| `content/data.js` | All content as a `CONTENT` array of plain JS objects + helper functions. Loaded via `<script src>`, no module system. Items with `status:'draft'` are excluded by helpers. |

### Content schema (data.js)

Every item has: `slug`, `type` (project | research | blog | talk), `status`, `featured`, `title`, `description`, `date`, `tags`, `coverImage`, `body` (markdown string).

Type-specific fields:
- **project:** `techStack`, `impactMetric`, `repoUrl`, `demoUrl`, `projectStatus`, `gallery`
- **research:** `venue`, `doi`, `pdfUrl`, `abstract`, `coauthors`, `citations` (BibTeX)
- **blog:** `seriesName`, `seriesOrder`
- **talk:** `event`, `location`, `videoUrl`, `slidesUrl`

### Key JavaScript subsystems (index.html)
1. **Neural network canvas animation** — hero background; responsive node/layer count by viewport width; draws animated edges and overlays ML math formulas.
2. **Contact form** — `fetch` POST to FormSubmit.co (`aruchanavci01@gmail.com`); loading state then auto-dismissing success notification (3 s).
3. **Scroll shadow** — adds shadow class to navbar on scroll.
4. **Mobile nav** — hamburger toggle via `toggleMenu()`.

### Static files
Images and CV PDF in `/assets/`. `sitemap.xml` and `feed.xml` (RSS 2.0 for blog posts) at the root. No asset pipeline.

### AWS Amplify (`/amplify/`)
Backend is configured (email auth + Todo data model) but **not integrated** into the frontend. The `amplify/` directory is gitignored.

## Conventions

- **Tailwind utilities** for layout/spacing; embedded `<style>` block for animations, gradients, and anything Tailwind can't handle cleanly.
- **Color palette:** blue `#3b82f6`, purple `#8b5cf6`, orange `#f97316`, yellow `#eab308`.
- **New pages** must copy nav + footer from `index.html` verbatim; prefix anchor links with `index.html#`.
- **All external links:** `target="_blank" rel="noopener noreferrer"`.
- **Section IDs** must match both the nav `href` anchors and the smooth-scroll logic.
- **marked.js v9:** the `highlight` option was removed. Call `hljs.highlightElement(block)` manually on each `pre code` block after rendering markdown — do NOT use `marked.setOptions`.
- Tags in `data.js` must not contain commas (used as URL param separator).
