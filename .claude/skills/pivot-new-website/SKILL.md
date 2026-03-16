# Personal Website Skill — Ahmet Ruçhan Avcı

## Goal
Build a clean, editorial personal website. No frameworks, no build tools. Pure HTML + CSS + vanilla JS.
Reference aesthetic: karpathy.ai + anilozturk.net. Content first, design second.

---

## Stack
- Pure HTML5 / CSS3 / Vanilla JS
- No React, Vue, Next.js, Tailwind, Bootstrap — nothing
- Google Fonts only (preconnect in head)
- Single repo: one `index.html` + one `style.css` + one `main.js`
- All pages rendered in one HTML file, toggled via JS (SPA-style, no server needed)

---

## Typography
- **Display / Headings:** `Instrument Serif` — elegant, editorial
- **Body:** `EB Garamond` — readable serif, 1.1rem, line-height 1.75
- **Labels / Monospace / Nav:** `DM Mono` — technical, understated
- Google Fonts import: `Instrument Serif:ital@0;1`, `EB+Garamond:ital,wght@0,400;0,500;0,600;1,400`, `DM+Mono:wght@400;500`
- NEVER use: Inter, Roboto, Arial, system-ui, or any sans-serif for primary text

---

## Color Palette (CSS Variables)
```css
:root {
  --bg: #fafaf8;
  --sidebar-bg: #ffffff;
  --text: #1a1a18;
  --text-muted: #787870;
  --text-light: #a0a098;
  --border: #e4e4de;
  --link: #2c4a8a;
  --sidebar-w: 230px;
}
```
- No gradients. No shadows (except subtle `box-shadow` for cards if needed).
- No animations except simple `transition: color 0.15s` on links.
- Dark mode: optional, implement only if explicitly asked.

---

## Layout — Multi-page Sidebar SPA

```
[sidebar 230px fixed] | [main content, margin-left: 230px, max-width: 820px, padding: 4rem 5rem]
```

### Sidebar
- Fixed left, full height, white background, 1px right border `#e4e4de`
- Top: Name in Instrument Serif (clickable → About page), role in DM Mono uppercase small
- Nav links: DM Mono, 0.72rem, uppercase, letter-spacing 0.06em, muted color
- Active nav item: left border `2px solid var(--text)`, text color `var(--text)`
- Bottom: social links (GitHub, LinkedIn, email) in tiny DM Mono uppercase

### Page switching
- All `.page` divs hidden by default: `display: none`
- Active page: `.page.active { display: block }`
- JS: `nav links → remove all .active → add .active to clicked link + matching page`
- Hash routing: `window.location.hash` to support direct links and back button

---

## Pages & Content

### 1. About (`#about`) — DEFAULT page
- Small circular photo (placeholder or real URL)
- h1: "Ahmet Ruçhan Avcı" in Instrument Serif
- Italic lead: "Jr. AI Engineer · Co-Founder · Builder"
- 2–3 short bio paragraphs:
  - Who he is: AI Engineer at Hisar Hospital Intercontinental, Co-Founder & CTO of Ablacım
  - What he builds: clinical automation (FastAPI, OCR, Speech-to-Text, RAG), AI-powered product platforms
  - Background: graduated 1st in class from Beykent University CS, TÜBİTAK intern, aikido black belt, competitive robotics (TEKNOFEST, European Rover Challenge)
- Quick facts row (DM Mono, small): Location: Istanbul · Available for: open source, collaborations

### 2. Experience (`#experience`)
- Section heading: "Experience" — h2 style
- Timeline grid layout: `[date col 120px right-aligned] | [content col]`
- Items (newest first):

**Hisar Hospital Intercontinental** — Jr. AI Engineer
Period: Jul 2025 – Present · Üsküdar, Istanbul
Description: Design and delivery of production AI features. OCR pipeline (≥300 docs/day), Speech-to-Text workflow (≥5 doctors/day), end-to-end RAG system (LangChain/LangGraph, Vector DB). Backend with PostgreSQL, MongoDB, Redis. Containerized deployment on Kubernetes.
Tags: FastAPI · Python · RAG · LangChain · Docker · Kubernetes · PostgreSQL · MongoDB · Redis

**TÜBİTAK BİLGEM** — ML Engineer Intern
Period: Jun–Sep 2023 · Gebze, Kocaeli
Description: B3LAB (Cloud Computing & Big Data Research Lab). Contributed to EU-funded STORAIGE project. Built anomaly detection systems (supervised + unsupervised). Processed 10,000+ datasets. Achieved 15% error reduction, 25% operational efficiency improvement.
Tags: Python · Scikit-learn · Anomaly Detection · Data Pipelines · EU STORAIGE

### 3. Projects (`#projects`)
- 2-column card grid (on mobile: 1 column)
- Each card: project name (Instrument Serif), type tag (DM Mono), 2-line description, links (GitHub / Live)

**DetectHub**
Type: Computer Vision Platform
Desc: Object detection platform for researchers and developers. Supports custom model training, dataset management, and inference APIs.
Links: GitHub

**Ablacım**
Type: AI Product · Co-Founder & CTO
Desc: Turkish AI-powered personal discovery platform. Multimodal vision analysis, RAG-based knowledge generation, payment integration.
Links: Live (if available)

**Dikte**
Type: Speech-to-Text Service
Desc: FastAPI-based STT backend for clinical use. SMB network share integration, async audio processing, deployed on Kubernetes.
Links: Internal

**OCR Pipeline**
Type: Clinical Automation
Desc: Document processing system for Turkish medical records. ≥300 docs/day, insurance detection, Redis/ARQ async queuing.
Links: Internal

**Autonomous Rover**
Type: Robotics · TEKNOFEST
Desc: Self-navigating robotic vehicle built for competitive robotics. ROS-based, deployed on Jetson hardware.
Links: GitHub

**SUT Price Calculator**
Type: Healthcare Tool
Desc: SGK healthcare billing calculator implementing complex SUT pricing rules across multiple datasets. NLP-based code matching.
Links: Internal

### 4. Blog (`#blog`)
- Simple list of posts (no cards, no images — pure text list like karpathy.ai)
- Format: `[Date in DM Mono] — [Title as link] — [1-line teaser in italic muted text]`
- Placeholder posts (3–4 items, clearly marked as "coming soon" or left as structure):
  - "On building RAG systems for clinical environments"
  - "vLLM vs TGI: inference benchmarking on RTX 5090"
  - "What I learned at the AWS Kiro & Agentic AI conference"
  - "MCP (Model Context Protocol): what it is and why it matters"
- Note at top: "Writing occasionally. More soon."

### 5. Publications (`#publications`)
- Plain academic list, like karpathy.ai publications section
- Currently empty but structured. Add placeholder:
  - "Research in progress. Publications will appear here."
- Format when populated: `[Title] · [Venue, Year] · [Authors] · [PDF link]`

### 6. Contact (`#contact`)
- No form. Just clean links.
- Email: aruchanavci01@gmail.com
- LinkedIn: linkedin.com/in/ahmet-ruchana
- GitHub: github.com/Ahmet-Ruchan
- Note: "I read every message. Response time: a few days."

---

## Component Specs

### h1 — Page title
```css
font-family: 'Instrument Serif', serif;
font-size: 2.5rem;
font-weight: 400;
letter-spacing: -0.02em;
line-height: 1.15;
```

### h2 — Section header
```css
font-family: 'EB Garamond', serif;
font-size: 1.05rem;
font-weight: 500;
letter-spacing: 0.06em;
text-transform: uppercase;
color: var(--text-muted);
border-bottom: 1px solid var(--border);
padding-bottom: 0.5rem;
margin: 3rem 0 1.25rem;
```

### Experience — Vertical Timeline
Experience page layout: vertical timeline.
A thin vertical line (1px, var(--border)) runs top to bottom on the left side.
Each experience item has a filled circle dot (11px, background: var(--text), 2px border var(--bg))
positioned on the line. Between dots: the line continues unbroken.
Layout per item: `[dot on line | date + title + org + description + tags]`
Use `position: relative` on the container (`.vtimeline`) and `position: absolute` for the line (`::before`) and dots (`.vtimeline-dot`).
Container has `padding-left: 28px`. Line is at `left: 5px`. Dots are at `left: -28px`.

### Tag pill
```css
font-family: 'DM Mono', monospace;
font-size: 0.62rem;
text-transform: uppercase;
letter-spacing: 0.04em;
padding: 0.2rem 0.55rem;
border: 1px solid var(--border);
border-radius: 3px;
color: var(--text-muted);
```

### Project card
```css
border: 1px solid var(--border);
border-radius: 6px;
padding: 1.5rem;
background: var(--sidebar-bg);
transition: border-color 0.2s;
```

---

## Navigation JS Logic
```js
function navigate(hash) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  const page = document.querySelector(hash);
  const link = document.querySelector(`nav a[href="${hash}"]`);
  if (page) page.classList.add('active');
  if (link) link.classList.add('active');
  window.location.hash = hash;
}

// On load
const hash = window.location.hash || '#about';
navigate(hash);

// Nav clicks
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    navigate(a.getAttribute('href'));
  });
});
```

---

## Mobile Responsive
- Below 768px: sidebar collapses to top bar (hamburger or just inline links)
- Main content: padding reduces to `2rem 1.5rem`
- Timeline: single column (hide date col, show above title)
- Projects: 1 column

---

## Rules — DO NOT
- No placeholder lorem ipsum text — use real content from this skill
- No stock photos except a photo placeholder circle for About
- No hero sections with background images
- No animated gradient text, no glassmorphism, no card hover lift effects
- No cookie banners, no modals, no popups
- No unnecessary JS — if CSS can do it, use CSS
- No comments in production code (clean output)

---

## File Structure
```
/
├── index.html       (all pages, sidebar, nav)
├── style.css        (all styles, CSS variables at top)
└── main.js          (navigation logic only, ~30 lines)
```

---

## Quality Checklist Before Done
- [ ] All 6 pages render correctly
- [ ] Active nav state works on every page
- [ ] Hash routing works (reload on /index.html#experience lands on experience)
- [ ] Mobile responsive (test at 375px and 768px)
- [ ] No broken links
- [ ] Photo placeholder loads (use a gray circle if no real photo)
- [ ] All content from this skill file is present
- [ ] Typography renders correctly (check font loading)
- [ ] No console errors