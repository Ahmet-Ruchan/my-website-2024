---
name: projects-research-section
description: >
  A complete blueprint for building a "Projects & Research" hub on a personal portfolio website.
  Use this skill whenever the user wants to add, extend, or refactor a section that showcases
  projects, research papers, blog posts, or talks — including content architecture, URL structure,
  filtering systems, detail pages, blog rendering, and CMS strategy. Trigger this skill when the
  user says things like "add a projects page", "I want to show my research", "build a blog section",
  "create a portfolio hub", or "integrate project cards into my site".
---

# Projects & Research Section Skill

This skill covers everything needed to design and implement a production-grade "Projects & Research"
hub inside an existing personal portfolio website. It is framework-agnostic in principle but includes
opinionated recommendations for Next.js / React stacks, which is the most common setup for this type
of site. Adapt where necessary.

---

## 1. Content Architecture: Four Content Types

All content in this hub falls into one of four distinct types. These must be modeled as separate
types from day one — mixing them into a single flat list creates UX and maintenance debt.

**Projects** are built software artifacts. Examples: a SaaS product, an open-source library, a
competition entry, an internal tool. Each project has a clear status (active / completed / archived),
a tech stack, and ideally a measurable impact metric.

**Research & Articles** are more formal written outputs — academic papers, technical reports,
preprints, or conference papers. They may be peer-reviewed or not, but they carry a different reading
contract than a blog post.

**Blog Posts** are freeform, opinionated, tutorial-style, or reflective writing. They can link to
projects or research but stand alone as content pieces.

**Talks & Appearances** are conference presentations, competition participations, poster sessions,
or podcast appearances. They often have slides, video recordings, or event links attached.

Each content item shares a common base schema and extends it per type (see Section 3).

---

## 2. URL & Routing Structure

All content lives under a single `/projects` route namespace. Do not create separate `/research`,
`/blog`, `/talks` top-level routes — this fragments SEO and navigation. Use a flat slug approach
with type differentiation via metadata.

```
/projects                     → Hub page (filterable grid of all content)
/projects/[slug]              → Universal detail page (renders differently based on type)
/projects?type=research       → Filtered view (URL-persistent, shareable)
/projects?type=blog
/projects?type=talks
/projects?tag=machine-learning
```

RSS feed should live at `/projects/feed.xml` and include only blog posts by default (with an
optional `/projects/feed-all.xml` for everything).

---

## 3. Data Schema

Define a unified content schema. If using a file-based CMS (markdown + frontmatter), every content
file must include these fields. If using a headless CMS (Sanity, Notion, Contentful), define this
as the base document type.

### Base fields (required on all types)
```yaml
title: string
slug: string                  # URL-safe identifier, e.g. "detecthub"
type: project | research | blog | talk
date: ISO 8601 date
description: string           # 1-2 sentence summary for cards
tags: string[]                # max 5 recommended
featured: boolean             # surfaces on homepage or top of hub
status: active | completed | archived | draft
```

### Project-specific fields
```yaml
techStack: string[]
impactMetric: string          # e.g. "500+ users", "95% F1 score"
demoUrl: string?
repoUrl: string?
paperUrl: string?
coverImage: string?           # path or URL to thumbnail
gallery: string[]?            # additional images for lightbox
```

### Research-specific fields
```yaml
venue: string?                # conference, journal, or "preprint"
pdfUrl: string?
doi: string?
abstract: string              # longer than description, shown on detail page
coauthors: string[]?
```

### Blog-specific fields
```yaml
readingTimeMinutes: number    # auto-calculated from word count (words / 200)
seriesName: string?           # e.g. "MCP Development"
seriesOrder: number?
```

### Talk-specific fields
```yaml
event: string                 # e.g. "TEKNOFEST 2024"
location: string?
slidesUrl: string?
videoUrl: string?
```

---

## 4. Hub Page (/projects)

The hub page is a filterable, paginated grid. Its responsibilities are discoverability and
first impression — it must answer "what has this person built?" within 5 seconds.

### Layout structure (top to bottom)

**Intro block**: A 2–3 sentence paragraph about your work philosophy or research interests.
Keep it short. This is not a bio — the about page handles that.

**Filter bar**: Horizontally scrollable pill buttons: `All`, `Projects`, `Research`, `Blog`,
`Talks`. Clicking a pill updates the URL (`?type=...`) and filters the grid without page reload.
Below the pills, add a tag filter system — a collapsible multi-select of all unique tags.

**Featured row** (optional): Before the main grid, highlight 1–3 `featured: true` items in a
wider card format or a horizontal scroll strip. These are your "above the fold" showcase pieces.

**Content grid**: 3-column card grid on desktop, 2-column on tablet, 1-column on mobile.
Cards must show: type badge (color-coded), title, 2-line truncated description, date, and up
to 3 tags. Show cover image as thumbnail if available; otherwise use a category-based icon or
a consistent color block derived from the type.

**Empty state**: When filters return no results, show a friendly message with a "Clear filters"
link. Never show a blank white area.

**Loading state**: Use skeleton cards (same dimensions as real cards) while content loads.
Never use a spinner overlay on the whole page.

### Filtering behavior rules

Filters must be combinable: type + tag simultaneously. URL must reflect the current filter state
so users can share filtered views. On first load, parse URL params and apply filters before render.
Implement client-side filtering if content count is under ~200 items; switch to server-side/search
index if above that.

---

## 5. Detail Page (/projects/[slug])

The detail page is where the real value lives. Each content type renders a different layout, but
they share a common shell.

### Common shell (all types)

**Back navigation**: A `← All Projects` link at the top left. Never rely solely on browser back.

**Hero section**: Title, type badge, date, status badge (for projects), and the impact metric or
venue (type-dependent). This metadata cluster should be immediately scannable.

**Link cluster**: Grouped icon+label buttons for all relevant external links (GitHub, live demo,
PDF, slides, video, DOI). Group them visually, not as plain text links.

**Tags**: Displayed as clickable pills that navigate back to the hub with that tag filter applied.

**Footer navigation**: Previous / Next content item links (same type preferred, any type as fallback).

**Related content**: 2–3 items algorithmically suggested by shared tags. Show as small horizontal
cards, not a full grid.

### Project detail layout

Structure the body as a narrative arc with three mandatory sections:

1. **Problem** — What gap or pain point motivated this project? Why didn't existing solutions work?
2. **Approach** — What is the technical architecture? Key decisions made and why.
3. **Impact** — What changed? Who uses it? What are the measurable outcomes?

After the narrative, add a **Media Gallery** section: a grid of screenshots or architecture diagrams
that open in a lightbox on click. Do not embed images inline mid-text — group them in the gallery.

Finally, add a **Tech Stack** section rendered as icon+label chips, not a bullet list.

### Research detail layout

Show the **abstract** prominently at the top (styled differently from body text — slightly larger
or with a left border accent). Follow with a **BibTeX citation block** (copy button included) for
easy citing. Then the body content (methodology, findings, conclusions). If a PDF is linked, embed
a PDF preview iframe with a fallback download link.

### Blog post detail layout

The blog layout must include: **reading time** at the top, a **sticky Table of Contents** (right
sidebar on desktop, collapsible drawer on mobile) that auto-generates from `h2` and `h3` headings
and highlights the current section on scroll. Body content must have proper **syntax highlighting**
on all code blocks with a copy-to-clipboard button on each block. If the post belongs to a series,
show a **series navigator** component below the post body (all parts of the series listed, current
one highlighted).

### Talk detail layout

Show event name, date, location. Embed a **YouTube/video player** if `videoUrl` is present, with
a graceful fallback if the URL is unavailable. Show a **slides embed** (Google Slides iframe or
a PDF viewer) if `slidesUrl` is present. Add an event description block.

---

## 6. Content Management Strategy

Choose one of two approaches before writing any code. This decision is hard to reverse.

**Option A: File-based (Git CMS)**
Markdown files with YAML frontmatter, colocated with the codebase. Writing workflow: edit `.md`
file locally (or via Obsidian), commit and push, CI deploys. Best for: developers who are
comfortable in their editor and want zero external dependencies. Use `gray-matter` for frontmatter
parsing and `remark` / `rehype` pipeline for markdown rendering.

**Option B: Headless CMS**
External service (Sanity recommended for developers; Notion API if you already live in Notion)
with a clean writing UI. Best for: content that changes frequently, or if you want to write on
mobile. Fetch content at build time (SSG) with an ISR (Incremental Static Regeneration) strategy
so new posts go live within minutes without a full rebuild.

Regardless of choice, content and presentation must be fully decoupled. Never hardcode content
in React components.

---

## 7. Search

Implement client-side full-text search with `Fuse.js`. Index: title, description, tags, and
content body (truncated). Expose search via a `/projects?q=...` URL param. Show results as a
filtered version of the hub grid — do not create a separate search results page. Debounce the
search input by 300ms.

---

## 8. SEO & Social Sharing

Every detail page must have unique `<title>`, `<meta description>`, and Open Graph tags. Generate
dynamic OG images (1200×630px) for each content item — either using a serverless function
(`@vercel/og` or `satori`) or pre-generated at build time. The OG image should show: title,
type badge, your name/logo, and optionally the cover image. This is critical for LinkedIn and
Twitter shares.

The hub page itself should have a canonical URL and a `robots` meta tag allowing indexing. Draft
content (`status: draft`) must be excluded from all sitemaps and must return a 404 or redirect.

RSS feed at `/projects/feed.xml` must be valid RSS 2.0 with `<item>` entries for each blog post
including full content (not just a summary).

---

## 9. Performance Considerations

All images must go through an image optimization pipeline (`next/image` or equivalent). Cover
images should be lazy-loaded on the hub page. Gallery images in lightbox should load on demand.
The hub page grid should implement virtual scrolling or pagination (20 items per page recommended)
once content count exceeds 30 items. Avoid loading all markdown content at once on the hub page —
load only frontmatter metadata for cards.

---

## 10. "Wow" Features (Implement After Core is Stable)

These are differentiating features that should only be built after the core hub is working:

**Activity Timeline**: A GitHub-contribution-graph-style visualization showing which months had
project activity. Built from content `date` fields.

**Impact Dashboard**: A small stats block on the hub page — total projects, total research papers,
GitHub stars across repos. Fetched at build time from GitHub API.

**"Currently Working On" Banner**: A single manually-updated field in a config file that renders
as a highlighted banner at the top of the hub. Simple to implement, high signal value.

**Print Stylesheet**: A `@media print` CSS block on research detail pages that hides navigation,
sidebar, and buttons, and shows a clean article layout. Researchers occasionally print papers.

---

## Implementation Order

Follow this sequence to avoid rework:

1. Define and validate the full data schema (frontmatter or CMS schema).
2. Build the content pipeline (parsing, type checking, slug generation).
3. Build the hub page with static data (hardcode 3–5 test items).
4. Build the detail page shell (common layout, navigation, tags).
5. Build type-specific detail page variants (project, blog, research, talk).
6. Connect real content, implement filtering and search.
7. Add SEO, OG images, RSS feed.
8. Add skeleton states, empty states, error states.
9. Add "wow" features one by one.