# Stage 0 — World Depth Foundation

Drop-in patch over `CODERUDRA-X_Command_Center-main`. Extract over the project (it overwrites
`src/`, `index.html`, `package.json`; your `public/assets` is untouched), then `npm run dev`.

## What changed

| Part | Where | What it does |
|---|---|---|
| Master loop | `src/engine/Loop.js` | ONE rAF for the whole site, `dt`-based. Radar sweep, dashed lines, boot neural net now run at the same speed on 30/60/144 Hz. FPS governor lowers effect quality on slow devices. |
| Preloader | `src/engine/Preloader.js` | Cinematic map + fonts are decoded before the deploy buckle unlocks; sector art/holo images warm up quietly in the background. Missing files are reported, never block. |
| Continuous travel | `src/engine/Travel.js`, `SectorDrillDown.js` | No black cut: camera dives into the island while the sector dissolves in. RTB lifts the camera back out. New **◄ / ►** buttons hop island→island (lift → fly over water → dive). |
| Parallax depth | `src/engine/Depth.js`, `World.js` | Markers float above the art with the mouse; two cloud layers + ground shadows separate as you pan/zoom. |
| Living world | `src/engine/World.js`, `src/constants/ambientConfig.js` | Ships with wakes sail spline routes. Simulation lives outside the maps, so they keep sailing while you're inside a sector. |
| Perf fixes | `RadarMap.js`, `BootEngine.js` | Hex grid cached (was ~1000 strokes/frame); boot neural loop is stopped once the map shows (it ran forever before). |
| Debug | `src/engine/Debug.js` | Press `` ` `` (or `?debug`): FPS, FX cost, asset report, **ship-route recorder**. `?quality=0/1/2` pins effect level. |
| Image optimiser | `scripts/optimize-images.mjs` | `npm i -D sharp && npm run optimize:images -- --rewrite` → WebP, usually 85-95 % smaller. |

## Place ship routes on real water
1. `npm run dev`, press `` ` ``, press **R**.
2. Click along open water. `1/2/3` ship type, `C` loop/there-and-back, `Backspace` undo.
3. **Enter** → route copied + a preview ship starts sailing. Paste into `ROUTES` in `ambientConfig.js`
   (`global` = main map, or a mission id like `citadel`).

The default `global` lanes are placeholders along the map edges — written without the final art.

## Tuning
`ambientConfig.js`: cloud count/alpha/parallax/wind, `mouseDepthPx`, ship types & speeds, `enabled` switches.
Everything is skipped under `prefers-reduced-motion`.

## Known limits
- Ships already painted into your PNGs stay static; the new ones are extra (paint the old ones out if it bothers you).
- `missionsConfig.js` references ~18 hologram `.jpg` files that aren't in `public/assets`; those hologram
  images fall back to the cinematic map. The debug panel lists them.
