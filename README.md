<div align="center">
  
# CODERUDRA-X — Command Center 🛰️

**A Military-Grade Interactive Portfolio.** Not a scrolling résumé — a full tactical command center: hold-to-deploy boot sequence, free-fall drop into a live Leaflet radar map, six mission "islands" with drill-down sector recon, and a holographic HUD for every project.

  <img src="https://github.com/CODERUDRA-X/CODERUDRA-X_Command_Center/blob/main/public/assets/wow.png?raw=true" alt="NAAD Logo" width="200"/>

[![Live Site](https://img.shields.io/badge/LIVE-coderudrax.xyz-00ff88?style=for-the-badge)](https://coderudrax.xyz)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/github/license/CODERUDRA-X/CODERUDRA-X_Command_Center?style=for-the-badge)](LICENSE)

<!--
  Drop a screen-recording GIF here once you have one — this is the single
  biggest thing that makes a repo README "pop" the way Kuber's does.
  ![demo](public/assets/demo.gif)
-->
</div>
---

## ✨ What's inside

- **Hold-to-deploy boot sequence** — press-and-hold buckle interaction (Web Audio-synthesized clank + wind, no audio assets), neural-radar canvas background, decrypt-style boot log
- **Free-fall drop cinematic** — parachute descent HUD with live altitude/rate/drift telemetry before the map resolves
- **Live tactical radar map** (Leaflet, `CRS.Simple`) — 6 main "mission islands" connected by animated dashed circuit lines over a hex-grid HUD overlay
- **Sector drill-down engine** — zoom into any island to a sub-map with a rotating recon sweep that "decloaks" each project node in real time (`Math.atan2` angle-matching against a live sweep beam)
- **Holographic project HUD** — space-aware popup positioning (always picks the side with the most room, hard-clamped to viewport)
- **Fully data-driven** — every mission, sector zone, and dossier paragraph lives in `src/constants/` / `src/data/`, not hardcoded in markup

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| Build | Vite 5 (Vanilla ES6 modules, no framework) |
| Mapping | Leaflet.js (`CRS.Simple` for a non-geographic pixel-space map) |
| Rendering | Canvas 2D (HUD overlays, recon-FX, neural-radar bg) + CSS 3D transforms |
| Audio | Web Audio API (synthesized SFX, zero audio assets) |
| Deployment | GitHub Actions → GitHub Pages |

## 📂 Architecture

```
src/
├── constants/    # MISSIONS, ticker/boot text — pure data
├── data/         # Dossier/profile lore
├── context/      # StateStore — shared app state
├── components/   # BootEngine, RadarMap, SectorDrillDown, Hologram, Modals
└── main.js       # Orchestrator
```

## 🚀 Getting Started

```bash
git clone https://github.com/CODERUDRA-X/CODERUDRA-X_Command_Center.git
cd CODERUDRA-X_Command_Center
npm install
npm run dev        # http://localhost:5173
npm run build       # production build -> dist/
```

## 🌐 Deployment

Pushes to `main` auto-deploy via `.github/workflows/deploy.yml` → GitHub Pages.
Live at **[coderudrax.xyz](https://coderudrax.xyz)**.

## 👤 About

Built by **Shreyansh Srivastava** ([CODERUDRA-X](https://github.com/CODERUDRA-X)) — AI/ML Engineer & Systems Architect, B.Tech CSE (Data Science) @ UIT Prayagraj. Building safety-critical AI vision systems for indigenous defense infrastructure (`#build4bharat`).

- GitHub: [github.com/CODERUDRA-X](https://github.com/CODERUDRA-X)
- LinkedIn: [linkedin.com/in/shreyansh-srivastava-9a83b9291](https://linkedin.com/in/shreyansh-srivastava-9a83b9291)

---

*॥ HAR HAR MAHADEV ॥*
