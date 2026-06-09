import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Built output goes to /docs so GitHub Pages can serve it from `main` › /docs
// while the React source stays versioned at the repo root. base "/" because
// the site is a user site served at the domain root (aneek1.github.io).
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: { outDir: "docs", emptyOutDir: true },
});
