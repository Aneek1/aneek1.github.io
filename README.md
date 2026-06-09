# Portfolio — Aneek Chattopadhyay

React + Vite + **Framer Motion** portfolio with a dark/light theme toggle.
Live at **https://aneek1.github.io**.

## How it's deployed
- Source lives at the repo root (`src/`, `index.html`, `vite.config.js`).
- `npm run build` outputs the static site to **`docs/`**.
- GitHub Pages serves `main` › **`/docs`** at the domain root.

## Editing it
- **Add / edit a project** → `src/data.js` (the `PROJECTS` array). Each entry:
  `title`, `status` (`deployed`|`uat`|`built`|`progress`|`oss`), `desc` (card blurb),
  `detail` (in-depth HTML shown on click), `tags`, optional `link` (repo URL).
- **Contact links** → `CONFIG` at the top of `src/data.js` (blank `email`/`linkedin` hide).
- **Colours / theme** → CSS variables in `src/index.css` (`:root` = dark, `[data-theme="light"]` = light).
- **Animations** → Framer Motion in `src/App.jsx`.

## Build & publish
```bash
npm install            # first time only
npm run build          # -> docs/
git add -A && git commit -m "Update portfolio" && git push
```
GitHub Pages redeploys from `/docs` within a minute.

## Local preview
```bash
npm run dev            # http://localhost:5173
```
