---
name: add-content
description: Add a new content item (project, research, blog, or talk) to content/data.js. Use when adding portfolio content.
argument-hint: "[type] [title]"
allowed-tools: Read, Edit, Grep
---

# Add Content Item

Add a new entry to the `CONTENT` array in `content/data.js`.

## Arguments

- `$0` — content type: `project`, `research`, `blog`, or `talk`
- `$1` — title (remaining arguments joined)

## Steps

1. Read `content/data.js` to see the current entries and schema
2. Generate a URL-safe `slug` from the title (lowercase, hyphens, no special chars)
3. Create the object with all required fields for the given type:

**All types require:** `slug`, `type`, `status: 'published'`, `featured: false`, `title`, `description`, `date` (YYYY-MM-DD), `tags` (array, no commas in tag names), `coverImage: null`, `body` (markdown string)

**Type-specific fields:**
- **project:** `techStack`, `impactMetric`, `repoUrl`, `demoUrl`, `projectStatus`, `gallery`
- **research:** `venue`, `doi`, `pdfUrl`, `abstract`, `coauthors`, `citations` (BibTeX string)
- **blog:** `seriesName`, `seriesOrder`
- **talk:** `event`, `location`, `videoUrl`, `slidesUrl`

4. Insert the new object at the end of the `CONTENT` array, before the closing `];`
5. Ask the user to fill in any placeholder values

## Rules

- Tags must NOT contain commas
- Use template literals for `body` and `abstract` fields
- Set `status: 'draft'` if the user says it's not ready yet
- Match the formatting style of existing entries in `data.js`
