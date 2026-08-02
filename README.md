<div align="center">
  
# CODERUDRA-X — Command Center 🛰️

**A Military-Grade Interactive Portfolio.** Not a scrolling résumé — a full tactical command center: hold-to-deploy boot sequence, free-fall drop into a live Leaflet radar map, six mission "islands" with drill-down sector recon, and a holographic HUD for every project.

  <img src="https://github.com/CODERUDRA-X/CODERUDRA-X_Command_Center/blob/main/public/assets/wow.png?raw=true" alt="NAAD Logo" width="900"/>

[![Live Site](https://img.shields.io/badge/LIVE-coderudrax.xyz-00ff88?style=for-the-badge)](https://coderudrax.xyz)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/github/license/CODERUDRA-X/CODERUDRA-X_Command_Center?style=for-the-badge)](LICENSE)

<!--
  Drop a screen-recording GIF here once you have one — this is the single
  biggest thing that makes a repo README "pop" the way Kuber's does.
  ![demo](public/assets/demo.gif)
-->
</div>

## 👁️ The Interface Directive

Scrolling web pages don't do justice to edge-AI, drone swarms, and safety-critical infrastructure. Real-world defense tech operates on **spatial intelligence and telemetry**. 

I didn't want to build a standard portfolio. I built a live deployment simulation of the environments my code operates in. This repository replaces the traditional résumé with a fully modular, mathematically driven Leaflet radar map, spatial holograms, and trigonometric radar sweeps.

---

## ⚙️ Infrastructure Core (Technical Stack)

To ensure maximum frame-rate and zero bloat, heavy frameworks were bypassed in favor of a strict **Enterprise-Grade Modular Architecture** powered by raw **Vanilla ES6 Modules** and **Vite**.

| Layer | Technology Choice | Engineering Purpose |
| :--- | :--- | :--- |
| **Mapping Engine** | Leaflet.js (`CRS.Simple`) | Hijacked a geographic mapping library to render a custom Cartesian pixel-space environment without real-world coordinates. |
| **Rendering** | Canvas 2D + CSS3 3D | Math-driven hex grids, circuit traces, and `rotateX` volumetric holograms mapped precisely to live DOM nodes. |
| **Physics** | Trigonometry + `rAF` | Custom `Math.atan2` loops calculating real-time intersection angles between the radar sweep and active mission nodes. |
| **Audio** | Web Audio API | Zero audio files (`.mp3`/`.wav`) used. Mechanical clanks and wind swells are 100% mathematically synthesized via oscillators. |

---

## 🎯 System Capabilities

### 🗺️ Sector Drill-Down Architecture
Navigating into an island doesn't trigger a standard modal—it transitions into a localized Cartesian sub-map.
* Dynamically calculates bounding boxes for seamless spatial zooming.
* Renders animated Canvas 2D circuit-traces connecting sub-nodes to the sector's centroid.

### 📡 Trigonometric Radar Intersection
The radar sweep is fully functional, not a looped CSS background.
* A `requestAnimationFrame` loop tracks the exact angle of the sweep line.
* Uses `Math.atan2` to calculate the bearing of every DOM node relative to the screen's center.
* Triggers synchronized CSS ripple-bursts and "Loot Beam" flares the exact millisecond the radar angle crosses a node's coordinates.

### 🗜️ Space-Aware 3D Holograms
Clicking a node generates a floor-projected volumetric UI.
* **Collision Math:** An algorithm calculates viewport boundaries to ensure the panel never renders off-screen, shifting its anchor dynamically.
* **Perspective:** Uses `perspective(1000px)` and `rotateX()` to lay the UI flat against the isometric map floor while preserving text legibility.

---

## 🗂️ Systems Anatomy

The codebase follows a strict separation of concerns, decoupling static data from UI logic to maintain production-readiness:

```text
src/
 ├── constants/     # Static data, boot logs, and the modular MISSIONS JSON array
 ├── data/          # Profile metrics and operative history
 ├── context/       # StateStore.js (Global state management)
 ├── components/    # Isolated UI Logic:
 │    ├── BootEngine.js       (Neural-radar canvas & deployment logic)
 │    ├── RadarMap.js         (Leaflet init & Canvas 2D Hex-grid)
 │    ├── SectorDrillDown.js  (Sub-map routing & circuit-trace logic)
 │    ├── Hologram.js         (3D Projection math & bounding constraints)
 │    └── Modals.js           (Dossier & Intel routing)
 └── main.js        # The Central ES6 Orchestrator
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
