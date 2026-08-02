# CODERUDRA-X — Command Center

Modular Vite + Vanilla ES6 rebuild of the original single-file monolith.
Visual output, DOM IDs, math (Leaflet CRS.Simple math, canvas trig,
CSS 3D transforms, `requestAnimationFrame` loops) are unchanged — only
the code organization changed.

## Setup

```bash
npm install
npm run dev       # local dev server, http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## ⚠️ One thing you must do before it looks right: move your images in

The original flat files (`cinematic-map.png`, `main.png`, `pic.png`,
`Shreyansh_Resume_Final.pdf`, all the `*.jpg` zone thumbnails, etc.)
lived next to `index.html`/`app.js` at the project root. Vite's
convention is that anything that should be served as-is (not processed
by the bundler) goes in `public/`, so every one of those files now
needs to be copied into:

```
public/assets/
```

`src/constants/missionsConfig.js` and `src/data/profile.js` already
reference them as `assets/<filename>` — that's the only change made to
the original data (paths, not values/logic). Drop the actual image/PDF
files into `public/assets/` and everything resolves automatically, in
both `npm run dev` and the production build.

## Architecture

- **`src/constants/`** — static config data (`MISSIONS`, ticker/boot
  text). No logic, no DOM access.
- **`src/data/`** — the dossier's lore/profile copy, extracted out of
  what used to be hardcoded HTML.
- **`src/context/StateStore.js`** — single shared mutable object
  replacing the old file's pile of top-level `let` variables
  (`activeMissionId`, `sectorFxActive`, `leafMap`, etc.) now that the
  code is split across modules.
- **`src/components/`** — one file per subsystem (boot sequence, main
  radar map, sector drill-down + recon-FX, hologram popup, modals).
- **`src/main.js`** — orchestrator. Wires `window.*` bindings for the
  inline `onclick="..."` handlers still used in `index.html` and in
  dynamically-injected markup (hologram popup, etc.), then kicks off
  `initBoot()`.

## Deployment

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub
Pages on every push to `main`. If this repo is a **project** page
(`https://<user>.github.io/<repo>/`, not a user/org root page), set
`base: '/<repo>/'` in `vite.config.js` instead of `'./'`.

## Note on `index.html`'s location

The target structure in the original spec put `index.html` under
`public/`. Vite specifically requires the entry HTML file at the
**project root** — it's the file Vite parses to find `<script
type="module">` and build the dependency graph from; anything in
`public/` is copied verbatim without being processed. `index.html` was
moved to the project root for this reason; `public/` is used only for
true static passthrough assets. Everything else matches the requested
layout as specified.
