---
name: add-blog-post
description: Write and add a new blog post with markdown body to data.js, and update the RSS feed.
argument-hint: "[title]"
allowed-tools: Read, Edit, Grep
---

# Add Blog Post

Create a full blog post entry in `content/data.js` and update `feed.xml`.

## Steps

1. Read `content/data.js` to see existing blog entries and their format
2. Generate a URL-safe `slug` from the title
3. Ask the user for:
   - Tags (array of strings, no commas within tags)
   - Series name and order (if part of a series), or `null`
   - Whether it should be `published` or `draft`
4. Write the blog post body as a markdown string in a template literal. Structure:
   - `## Introduction` — hook the reader
   - Middle sections with `##` headers
   - `## Conclusion` — key takeaways
   - Include code blocks with language hints where relevant
5. Insert the new entry into the `CONTENT` array in `data.js`
6. If status is `published`, add an `<item>` to `feed.xml` with:
   - `<title>`, `<description>`, `<link>` (to `project-detail.html?slug=...`), `<pubDate>` (RFC 822), `<guid>`

## Rules

- Use today's date for `date` field (YYYY-MM-DD format)
- The `body` field uses template literal backticks — escape any backticks in code blocks with `\`\``
- Match the voice and style of existing blog entries in `data.js`
