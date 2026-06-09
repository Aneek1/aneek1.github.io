# Portfolio — Aneek Chattopadhyay

A single-file static portfolio (`index.html`, no build step, no dependencies) in a dark,
minimal, terminal-tinged style. Hosted on **GitHub Pages**.

GitHub: **Aneek1** · Live site (after deploy): **https://aneek1.github.io**
*(GitHub Pages always lowercases the site URL, even though your username shows as `Aneek1`.)*

## Adding more projects later (the main thing)
Open `index.html`, scroll to the `PROJECTS` array near the bottom, and add one object:

```js
{ title:"My New Agent — What it does", status:"built",
  desc:`One or two sentences. You can <b>bold</b> key bits.`,
  tags:["Python","Claude API","Azure"] },
```

- The top of the array shows first.
- `status` → `"deployed"` (green) · `"uat"` (amber) · `"built"` / `"progress"` (blue),
  or add `statusLabel:"Custom text"` to override the badge wording.
- No HTML editing — the page renders the cards from that array.

## Links
At the very top of the `<script>`, the `CONFIG` block controls the GitHub/email/LinkedIn links:

```js
const CONFIG = {
  github:   "https://github.com/Aneek1",
  email:    "",   // add "you@example.com" when ready — blank hides it
  linkedin: ""    // add your LinkedIn URL later — blank hides it
};
```

Leave `email`/`linkedin` blank and those footer links simply don't appear (no dead links).
Add them whenever you like.

## Deploy to GitHub Pages
**User site (recommended) → `https://aneek1.github.io`:**
1. Create a repo named **exactly** `aneek1.github.io` (all lowercase).
2. Put `index.html` in the repo root and push:
   ```bash
   git init
   git add index.html
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/Aneek1/aneek1.github.io.git
   git push -u origin main
   ```
3. Live within a minute or two at **https://aneek1.github.io**.

*(You don't have to commit this README — only `index.html` is needed for the site.)*

## Before you publish
- The **employer line** ("SP Manufacturing") in the About section: keep, generalise, or remove.
- Everything else is written generically — no internal hostnames, IPs, keys, ERP instance names,
  or customer/vendor names are exposed.

## Customising the look
- Accent colour: edit `--accent` in `:root` (currently mint `#5eead4`).
- The page uses Google Fonts (Inter + JetBrains Mono) with system-font fallbacks.
