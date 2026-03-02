# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for Ahmet Ruçhan Avcı (ML Engineer). A single-page static website — all content lives in `index.html` with embedded CSS and JavaScript. No build pipeline or framework; Tailwind CSS is loaded via CDN.

## Development

**Local development:** Open `index.html` in a browser, or use VS Code Live Server on port 5501.

**Dependencies** (Tailwind + PostCSS toolchain, not currently used in a build step):
```
npm install
```

There are no npm scripts, no build step, and no test suite. Editing `index.html` directly changes the site.

## Architecture

### Single file structure
Everything is in `index.html`:
- `<style>` block — custom CSS (animations, layout, color variables)
- Tailwind CDN — utility classes used throughout HTML
- `<script>` block at the bottom — all JavaScript

### Sections (anchor nav)
`#about` → `#experience` → `#projects` → `#contact`

Navigation is anchor-based with smooth scroll; mobile has a hamburger toggle (`toggleMenu()` function).

### Key JavaScript subsystems
1. **Neural network canvas animation** — fills the hero background; responsive node/layer count by viewport width; draws animated edges and overlays ML math formulas.
2. **Contact form** — `fetch` POST to FormSubmit.co (`aruchanavci01@gmail.com`); shows a loading state then a success notification that auto-dismisses after 3 s.
3. **Scroll shadow** — adds a shadow class to the navbar on scroll.

### Assets
Static files only — images and CV PDF in `/assets/`. No asset pipeline.

### AWS Amplify (`/amplify/`)
Backend is configured (email auth + a Todo data model) but **not integrated** into the frontend. The `amplify/` directory is gitignored.

## Conventions
- Use Tailwind utility classes for layout/spacing; use the custom `<style>` block for animations, gradients, and anything Tailwind can't handle cleanly.
- The color palette: blue `#3b82f6`, purple `#8b5cf6`, orange `#f97316`, yellow `#eab308`.
- Section IDs must match both the nav `href` anchors and the smooth-scroll logic.
