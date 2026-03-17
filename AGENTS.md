# AGENTS.md

## Learned User Preferences

- User communicates in Turkish; respond in Turkish unless code/technical output requires English.
- User regularly asks to start and stop the local dev server; use `python3 -m http.server 3000` run from the project root.
- When stopping the local server, find the PID with `lsof -nP -iTCP:3000 -sTCP:LISTEN` and kill it directly; do not use `pkill` patterns as they can silently fail.
- User iterates on visual/color choices through back-and-forth; apply each change immediately without over-engineering the first attempt.

## Learned Workspace Facts

- Project root: `/Users/ruch/Documents/GitHub/my-website-2024`
- Main entry point: `index.html` (static HTML/CSS/JS, no build step)
- Local dev server: `python3 -m http.server 3000` (preferred port: 3000)
- Stylesheet: `style.css`; JS: `main.js`
- CV asset: `assets/Ahmet-Ruchan-AVCI-CV.pdf`
- YouTube channel: `https://www.youtube.com/@ronin_ruch`
- LinkedIn: `https://www.linkedin.com/in/ahmet-ruchana/`
- GitHub: `https://github.com/Ahmet-Ruchan`
- Kaggle: `https://www.kaggle.com/ahmetruhanavc`
