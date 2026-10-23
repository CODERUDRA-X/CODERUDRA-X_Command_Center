import L from 'leaflet';
import { store } from '../context/StateStore.js';
import { MISSIONS, CINEMATIC_MAP_IMAGE } from '../constants/missionsConfig.js';
import { openHoloPopup, closeHoloPopup } from './Hologram.js';
import { closeModal } from './Modals.js';
import { onFrame, offFrame } from '../engine/Loop.js';
import { ensure } from '../engine/Preloader.js';
import { createFxLayer } from '../engine/World.js';
import { markerShift } from '../engine/Depth.js';
import { attachDebug } from '../engine/Debug.js';
import { D, sleep, cameraTo, showToast, hideToast } from '../engine/Travel.js';

/* ─────────────────────────────────────────────────────────
   SUB-MAP SYSTEM (SECTOR DRILL-DOWN ENGINE)
   All Math.atan2 trigonometry, bounding-box math, and the recon-FX
   rAF loop are byte-for-byte identical to the original app.js. Only
   the bare module-level `let`s (sectorMap, sectorZoneMarkers,
   sectorSweepAngle, sectorFxActive, sectorCentroid,
   sectorResizeBound, activeSectorId) have moved onto `store`.
───────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────
   STAGE 0 · CONTINUOUS TRAVEL
   No more black-screen cuts. The global map camera physically dives into
   the island while the sector view dissolves in underneath it, and leaving
   (or hopping to another island) lifts the camera back out and flies it
   across the water. All sequences are async so the order is readable.
───────────────────────────────────────────────────────── */
const GLOBAL_BOUNDS = [[0,0],[1080,1920]];
const GLOBAL_CENTER = [540, 960];
const DIVE_ZOOM_DELTA = 1.5;     // how far the global camera dives into an island
const CRUISE_ZOOM_DELTA = 0.8;   // altitude used while flying between islands
let sectorToken = 0;             // invalidates stale setTimeouts after a sector closes

const fitZoom = () => store.leafMap.getBoundsZoom(GLOBAL_BOUNDS);
const sectorList = () => MISSIONS.filter(m => m.sectorImage || (m.sectorZones && m.sectorZones.length));
const setTransit = on => document.body.classList.toggle('in-transit', on);

export async function enterSector() {
  const mission = MISSIONS.find(m => m.id === store.activeMissionId);
  if (!mission || store.traveling) return;
  store.traveling = true; setTransit(true);
  closeModal();
  showToast('◈ ACCESSING SYSTEM CORE', mission.title);
  await diveInto(mission);
  hideToast(); setTransit(false); store.traveling = false;
}

// Camera dives on the global map; sector fades in over the last half of the dive.
async function diveInto(mission) {
  store.activeSectorId = mission.id;
  store.activeMissionId = mission.id;
  const gmap = store.leafMap;
  const imgReady = ensure(mission.sectorImage || CINEMATIC_MAP_IMAGE);   // already decoded in most cases

  gmap.setMaxBounds(null);                       // otherwise Leaflet snaps the dive back inside the bounds
  const dive = cameraTo(gmap, [mission.lat, mission.lng], fitZoom() + DIVE_ZOOM_DELTA, D(1.15));

  await sleep(D(0.65));
  await imgReady;
  showSectorScreen(mission);                     // CSS sector-in fades it in (0.5s) over the still-diving map
  await dive;
  await sleep(D(0.4));
  store.sectorSolid = true;                      // fully covered → global map stops drawing
}

function showSectorScreen(mission) {
  document.getElementById('sector-screen').classList.add('on');
  document.getElementById('sector-name').textContent = mission.title;
  document.getElementById('sector-sys').textContent  = `SECTOR: ${mission.id.toUpperCase()}`;
  updateHopButtons(mission);
  initSectorMap(mission);
}

function updateHopButtons(mission) {
  const list = sectorList();
  const i = list.findIndex(m => m.id === mission.id);
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  const hop = document.getElementById('sector-hop');
  if (!hop) return;
  hop.style.display = list.length > 1 ? 'flex' : 'none';
  document.getElementById('hop-prev-name').textContent = prev.title.replace(/\s*\(.*\)/, '');
  document.getElementById('hop-next-name').textContent = next.title.replace(/\s*\(.*\)/, '');
}

// Fade the sector screen out (Web Animations API composes over the CSS
// entrance animation, which `forwards` would otherwise pin at opacity 1).
async function fadeOutSector() {
  const ss = document.getElementById('sector-screen');
  const anim = ss.animate([{ opacity: 1 }, { opacity: 0 }], { duration: D(0.6) * 1000, easing: 'ease-in', fill: 'forwards' });
  try { await anim.finished; } catch (e) { /* cancelled */ }
  return () => anim.cancel();
}

function teardownSector() {
  sectorToken++;
  closeHoloPopup();
  store.sectorFxActive = false;
  offFrame('sector-fx');
  if (store.sectorFx) { store.sectorFx.destroy(); store.sectorFx = null; }
  store.sectorZoneMarkers = [];
  store.sectorCentroid    = null;
  if (store.sectorMap) { store.sectorMap.remove(); store.sectorMap = null; }
  document.getElementById('sector-screen').classList.remove('on');
}

export async function exitSector() {
  if (store.traveling) return;
  store.traveling = true; setTransit(true);
  closeHoloPopup();
  showToast('◄ RETURNING TO GLOBAL RADAR');
  const gmap = store.leafMap;
  store.sectorSolid = false;                     // global map resumes drawing under the fade

  const lift = cameraTo(gmap, GLOBAL_CENTER, fitZoom(), D(1.25));
  const release = await fadeOutSector();
  teardownSector();
  release();
  await lift;

  gmap.setMinZoom(fitZoom());                    // restore the boundary lock lifted for the dive
  gmap.setMaxBounds(GLOBAL_BOUNDS);
  hideToast(); setTransit(false); store.traveling = false;
}

// Island → island without ever touching the menu: lift off, fly over open
// water (ambient ships pass underneath), dive into the next sector.
export async function hopSector(dir) {
  if (store.traveling) return;
  const list = sectorList();
  const i = list.findIndex(m => m.id === store.activeSectorId);
  if (i < 0 || list.length < 2) return;
  const cur = list[i];
  const next = list[(i + dir + list.length) % list.length];

  store.traveling = true; setTransit(true);
  closeHoloPopup();
  showToast('◈ REPOSITIONING', `${cur.title.replace(/\s*\(.*\)/, '')}  ►  ${next.title.replace(/\s*\(.*\)/, '')}`);
  const gmap = store.leafMap;
  const cruise = fitZoom() + CRUISE_ZOOM_DELTA;
  store.sectorSolid = false;

  const lift = cameraTo(gmap, [cur.lat, cur.lng], cruise, D(0.9));
  const release = await fadeOutSector();
  teardownSector();
  release();
  await lift;

  const dist = Math.hypot(next.lat - cur.lat, next.lng - cur.lng);
  await cameraTo(gmap, [next.lat, next.lng], cruise, D(Math.min(3.2, Math.max(1.5, dist / 420))),
    { bump: -0.35, minZoom: fitZoom() });   // slight rise mid-flight, never past the map edge

  showToast('◈ ACCESSING SYSTEM CORE', next.title);
  await diveInto(next);
  hideToast(); setTransit(false); store.traveling = false;
}

export function initSectorMap(mission) {
  if (store.sectorMap) { store.sectorMap.remove(); store.sectorMap = null; }

  const bounds = [[0,0],[1080,1920]];
  store.sectorMap = L.map('sector-map', {
    crs: L.CRS.Simple, attributionControl: false, zoomControl: false,
    zoomSnap: 0.1, zoomDelta: 0.5, maxBoundsViscosity: 1.0,
  });

  const imgSrc = mission.sectorImage || CINEMATIC_MAP_IMAGE;
  L.imageOverlay(imgSrc, bounds, {opacity:1, interactive:false}).addTo(store.sectorMap);

  store.sectorMap.fitBounds(bounds);
  const targetZoom   = store.sectorMap.getZoom();
  const targetCenter = store.sectorMap.getCenter();

  // Loosen min-zoom slightly so we can start "pulled back" for the descent
  store.sectorMap.setMinZoom(targetZoom - 1.2);
  store.sectorMap.setMaxBounds(bounds);

  store.sectorCanvas = document.getElementById('sector-canvas');
  store.sectorCtx    = store.sectorCanvas.getContext('2d');
  store.sectorCanvas.width  = window.innerWidth;
  store.sectorCanvas.height = window.innerHeight;

  // Keep the recon-overlay canvas in sync with viewport changes while a
  // sector is open. Bound once (guarded by sectorResizeBound) so repeated
  // sector visits never stack up duplicate listeners.
  if (!store.sectorResizeBound) {
    window.addEventListener('resize', () => {
      const ss = document.getElementById('sector-screen');
      if (store.sectorCanvas && ss && ss.classList.contains('on')) {
        store.sectorCanvas.width  = window.innerWidth;
        store.sectorCanvas.height = window.innerHeight;
      }
    });
    store.sectorResizeBound = true;
  }

  // ── RECON DESCENT: start zoomed-out + offset, then fly into position ──
  const offsetX = (Math.random() > 0.5 ? 1 : -1) * 240;
  const offsetY = (Math.random() > 0.5 ? 1 : -1) * 160;
  const startPt = store.sectorMap.project(targetCenter, targetZoom).add([offsetX, offsetY]);
  const startLatLng = store.sectorMap.unproject(startPt, targetZoom);

  store.sectorMap.setView(startLatLng, targetZoom - 1.2, { animate: false });

  // Stage 0: ships + parallax clouds for this island (state persists in World.js)
  store.sectorFx = createFxLayer(store.sectorMap, mission.id);
  attachDebug(store.sectorMap, mission.id);
  const token = ++sectorToken;

  setTimeout(() => {
    if (token !== sectorToken || !store.sectorMap) return;
    store.sectorMap.flyTo(targetCenter, targetZoom, { duration: 1.3, easeLinearity: 0.15 });
    setTimeout(() => { if (token === sectorToken && store.sectorMap) store.sectorMap.setMinZoom(targetZoom); }, 1300);
  }, 150);

  // ── Reset recon-FX state for this sector ──────────────────────────────
  // The sweep radiates from the ACTUAL CENTER OF THE ISLAND IMAGE (same
  // bounds used for the imageOverlay above), not the average position of
  // this sector's zones — that keeps the sweep visually centered on the
  // island itself no matter how the zones happen to be clustered on it.
  store.sectorZoneMarkers = [];
  store.sectorSweepAngle  = 0;
  store.sectorCentroid    = {
    lat: (bounds[0][0] + bounds[1][0]) / 2,
    lng: (bounds[0][1] + bounds[1][1]) / 2,
  };
  store.sectorFxActive    = true;
  onFrame(sectorFxLoop, { id: 'sector-fx', order: 10 }); // fixed id → can never double-subscribe

  const zoneDelay = 150 + 1300;
  if (mission.sectorZones && mission.sectorZones.length > 0) {
    mission.sectorZones.forEach((zone, i) => {
      setTimeout(() => { if (token === sectorToken && store.sectorMap) addSectorZone(zone, mission.type); }, zoneDelay + i * 150);
    });
  }

  store.sectorMap.on('click', () => closeHoloPopup()); // Close hologram if background clicked
}

function addSectorZone(zone, missionType) {
  // BLACK SITE-tier zones (mission.type === 'amber') read as a hazard,
  // not a normal op — see the .classified styling block in style.css.
  const classified = missionType === 'amber';

  // Nodes spawn "cloaked" (dim core, brackets/label withheld) until the
  // recon sweep in sectorFxLoop() rotates past them — see revealZone().
  // The bracket + leader-stem markup replaces the old bare dot with a
  // "this has been annotated" recon-photo look once detected.
  const html = `<div class="sz-wrap ${classified ? 'classified' : ''} sz-cloaked" style="animation:sup .4s ease both">
    <div class="sz-beam"></div>
    <div class="sz-ring sz-r1"></div><div class="sz-ring sz-r2"></div>
    <div class="sz-ping"></div>
    <div class="sz-bracket sz-bl"></div><div class="sz-bracket sz-br"></div>
    <div class="sz-core"></div>
    <div class="sz-leader"></div>
    <div class="sz-label">${zone.label}</div>
  </div>`;
  const icon = L.divIcon({ className:'', html, iconSize:[44,44], iconAnchor:[22,22] });
  const marker = L.marker([zone.lat, zone.lng], { icon }).addTo(store.sectorMap);

  marker.on('click', e => {
    L.DomEvent.stopPropagation(e);
    // GET POINT FROM THE SECTOR MAP (NOT MAIN LEAFMAP)
    const sh = markerShift();
    const pt = store.sectorMap.latLngToContainerPoint([zone.lat, zone.lng]).add([sh.x, sh.y]);
    openHoloPopup(zone, pt);
  });

  // Register with the recon-FX system. The cloak is purely cosmetic —
  // clicking always works underneath it — so a missed sweep frame can
  // never block someone from opening a briefing. `pinging` tracks whether
  // the sweep beam is CURRENTLY sitting on this node, so sectorFxLoop()
  // can fire exactly one ripple burst per pass instead of one per frame.
  const entry = { marker, el: null, zone, revealed: false, pinging: false };
  store.sectorZoneMarkers.push(entry);

  // getElement() only resolves once Leaflet has painted the marker —
  // defer one frame so entry.el is guaranteed to be attached. Leaflet's
  // divIcon wraps our html in its OWN outer container, so .getElement()
  // alone returns that wrapper, not our .sz-wrap div — every class we
  // toggle (cloak/detect/pinging) needs to land on .sz-wrap itself, so
  // we drill into it explicitly here.
  requestAnimationFrame(() => { entry.el = marker.getElement()?.querySelector('.sz-wrap') || marker.getElement(); });

  // Safety-net reveal: guarantees every node eventually surfaces even if
  // the sweep's angle math never lines up with it (e.g. user is mid-drag).
  const tk = sectorToken;
  setTimeout(() => { if (tk === sectorToken) revealZone(entry); }, 2600);
}

// Decloaks a sector node: swaps its dim/hidden state for the "detected"
// look and runs a brief decrypt-style scramble on its label instead of
// the text just popping into place.
function revealZone(entry) {
  if (!entry || entry.revealed) return;
  entry.revealed = true;
  if (!entry.el) entry.el = entry.marker.getElement()?.querySelector('.sz-wrap') || entry.marker.getElement();
  if (!entry.el) return; // marker was already torn down (sector closed) before this fired
  entry.el.classList.remove('sz-cloaked');
  entry.el.classList.add('sz-detected');
  const labelEl = entry.el.querySelector('.sz-label');
  if (labelEl) scrambleReveal(labelEl, entry.zone.label);
}

// Cheap "matrix decrypt" text effect: cycles random glyphs, then locks
// each character in left-to-right as `duration` elapses.
export function scrambleReveal(el, finalText, duration = 360) {
  const glyphs = '!<>-_\\/[]{}=+*^?#';
  const start = Date.now();
  const tick = () => {
    const p = Math.min((Date.now() - start) / duration, 1);
    const lockedChars = Math.floor(p * finalText.length);
    let out = '';
    for (let i = 0; i < finalText.length; i++) {
      out += i < lockedChars ? finalText[i] : glyphs[Math.floor(Math.random() * glyphs.length)];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(tick); else el.textContent = finalText;
  };
  tick();
}

// ─────────────────────────────────────────────────────────
// SECTOR RECON OVERLAY (circuit-trace + rotating sweep)
// Draws directly on #sector-canvas — the same pointer-events:none,
// painted-above-markers pattern the main map's hudLoop() already uses
// for its hex grid and dashed mission lines, so nodes stay fully
// clickable underneath it. All positions are recomputed every frame
// via latLngToContainerPoint, so panning/zooming the sector never
// desyncs the overlay.
// ─────────────────────────────────────────────────────────
export function sectorFxLoop(dt) {
  if (!store.sectorFxActive || !store.sectorMap || !store.sectorCtx) return; // stopped in teardownSector()
  const sectorCtx = store.sectorCtx, sectorCanvas = store.sectorCanvas, sectorMap = store.sectorMap;
  sectorCtx.clearRect(0, 0, sectorCanvas.width, sectorCanvas.height);

  if (store.sectorCentroid) {
    const hub = sectorMap.latLngToContainerPoint(L.latLng(store.sectorCentroid.lat, store.sectorCentroid.lng));

    store.sectorZoneMarkers.forEach(entry => {
      const sh = markerShift();   // markers float a few px above the art (Depth.js)
      const p = sectorMap.latLngToContainerPoint(L.latLng(entry.zone.lat, entry.zone.lng)).add([sh.x, sh.y]);
      const classified = entry.el && entry.el.classList.contains('classified');
      const [r, g, b] = classified ? [240, 80, 40] : [0, 255, 136];

      // Smart loot-beam height: capped to whatever vertical room is
      // actually free above this node on screen RIGHT NOW (p.y is the
      // node's distance from the top edge), with a small margin and a
      // sensible max/min — this is what stops the beam from ever
      // shooting past the visible top of the island, no matter how many
      // nodes there are or where they land, and it re-evaluates every
      // frame so panning/zooming never breaks it.
      if (entry.el) {
        const availableAbove = p.y - 14;
        const beamH = Math.max(14, Math.min(64, availableAbove));
        entry.el.style.setProperty('--beam-h', beamH + 'px');
      }

      // Circuit-trace: hub-and-spoke link to this zone — reads as "one
      // connected system", not a handful of scattered, unrelated pins.
      sectorCtx.save();
      sectorCtx.beginPath(); sectorCtx.moveTo(hub.x, hub.y); sectorCtx.lineTo(p.x, p.y);
      sectorCtx.strokeStyle = `rgba(${r},${g},${b},.28)`;
      sectorCtx.lineWidth = 1;
      sectorCtx.setLineDash([6, 5]); sectorCtx.lineDashOffset = -store.sectorSweepAngle * 2;
      sectorCtx.stroke();
      sectorCtx.restore();

      // Live screen-space angle of this node relative to the hub —
      // recomputed every frame (not cached) so it stays correct through
      // pan/zoom instead of drifting stale.
      const liveAngle = (Math.atan2(p.y - hub.y, p.x - hub.x) * 180 / Math.PI + 360) % 360;
      const diff = Math.min(Math.abs(store.sectorSweepAngle - liveAngle), 360 - Math.abs(store.sectorSweepAngle - liveAngle));
      const withinBeam = diff < 4;

      if (withinBeam && !entry.pinging) {
        // The beam has just landed on this node — fire a one-shot ripple
        // burst (see .sz-ping / sz-ping-burst in style.css). First pass
        // ever also permanently decloaks the node; every later revolution
        // just re-fires the ripple, same speed, same beam, every lap.
        entry.pinging = true;
        if (entry.el) {
          entry.el.classList.add('pinging');
          setTimeout(() => { if (entry.el) entry.el.classList.remove('pinging'); }, 560);
        }
        if (!entry.revealed) revealZone(entry);
      } else if (!withinBeam && entry.pinging) {
        entry.pinging = false; // beam has moved off — armed again for the next lap
      }
    });

    // Hub marker
    sectorCtx.save();
    sectorCtx.beginPath(); sectorCtx.arc(hub.x, hub.y, 3, 0, Math.PI * 2);
    sectorCtx.fillStyle = 'rgba(0,255,136,.7)'; sectorCtx.fill();
    sectorCtx.restore();

    // Rotating recon sweep — a soft directional beam from the hub, same
    // spirit as the corner radar widget but drawn in-canvas so its angle
    // can be geometrically compared against each node above.
    const rad = store.sectorSweepAngle * Math.PI / 180;
    const sweepLen = Math.max(sectorCanvas.width, sectorCanvas.height);
    sectorCtx.save();
    const grad = sectorCtx.createLinearGradient(hub.x, hub.y,
      hub.x + Math.cos(rad) * sweepLen, hub.y + Math.sin(rad) * sweepLen);
    grad.addColorStop(0, 'rgba(0,255,136,.35)');
    grad.addColorStop(1, 'rgba(0,255,136,0)');
    sectorCtx.beginPath(); sectorCtx.moveTo(hub.x, hub.y);
    sectorCtx.lineTo(hub.x + Math.cos(rad) * sweepLen, hub.y + Math.sin(rad) * sweepLen);
    sectorCtx.strokeStyle = grad; sectorCtx.lineWidth = 2; sectorCtx.stroke();
    sectorCtx.restore();

    store.sectorSweepAngle = (store.sectorSweepAngle + 96 * dt) % 360;   // 1.6°/frame @60fps → 96°/s
  }
}
