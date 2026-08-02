import L from 'leaflet';
import { store } from '../context/StateStore.js';
import { MISSIONS, CINEMATIC_MAP_IMAGE } from '../constants/missionsConfig.js';
import { TICKER_MSGS } from '../constants/tickerConfig.js';
import { openMissionBriefing, closeAllModals } from './Modals.js';

/* ─────────────────────────────────────────────────────────
   Leaflet Engine & Boundary Lock
   All map math, canvas HUD drawing, and dashed-line rendering are
   unchanged from the original app.js.
───────────────────────────────────────────────────────── */
export function initLeafletMap() {
  const bounds = [[0,0],[1080,1920]];
  store.leafMap = L.map('map', {
    crs: L.CRS.Simple, attributionControl: false, zoomControl: false,
    zoomSnap: 0.1, zoomDelta: 0.5, maxBoundsViscosity: 1.0,
  });

  L.imageOverlay(CINEMATIC_MAP_IMAGE, bounds, {opacity:1, interactive:false}).addTo(store.leafMap);

  store.leafMap.fitBounds(bounds);
  store.leafMap.setMinZoom(store.leafMap.getZoom());
  store.leafMap.setMaxBounds(bounds);

  store.leafMap.on('zoomend', () => {
    const el = document.getElementById('zoom-lvl');
    if (el) el.textContent = `ZOOM: ${store.leafMap.getZoom().toFixed(2)}`;
  });

  store.leafMap.on('mousemove', e => {
    const el = document.getElementById('map-coords');
    if (el) el.innerHTML = `28°36'N 81°52'E<br>PRAYAGRAJ · INDIA<br><span style="opacity:.5">Y:${e.latlng.lat.toFixed(0)} X:${e.latlng.lng.toFixed(0)}</span>`;
  });

  store.leafMap.on('click', e => {
    if (!e.originalEvent.target.closest('#mission-modal') &&
        !e.originalEvent.target.closest('#dossier-modal') &&
        !e.originalEvent.target.closest('#intel-modal')) {
      closeAllModals();
    }
  });

  store.hudCanvas = document.getElementById('hud-canvas');
  store.hudCtx    = store.hudCanvas.getContext('2d');
  resizeHUD();

  window.addEventListener('resize', () => {
    resizeHUD();
    if (store.leafMap) {
      store.leafMap.setMinZoom(-5);
      store.leafMap.fitBounds(bounds);
      store.leafMap.setMinZoom(store.leafMap.getZoom());
    }
  });

  MISSIONS.forEach((m, i) => setTimeout(() => addMarker(m), 300 + i * 100));

  store.mapReady = true;
  hudLoop();
}

function resizeHUD() {
  if (store.hudCanvas) {
    store.hudCanvas.width  = window.innerWidth;
    store.hudCanvas.height = window.innerHeight;
  }
}

// Canvas HUD Overlay Loop
function hudLoop() {
  if (!store.hudCtx || !store.mapReady) return requestAnimationFrame(hudLoop);
  store.hudCtx.clearRect(0, 0, store.hudCanvas.width, store.hudCanvas.height);
  drawHexGrid();
  drawMissionLines();
  store.dashOffset -= 0.55;
  requestAnimationFrame(hudLoop);
}

function drawHexGrid() {
  const hudCtx = store.hudCtx, hudCanvas = store.hudCanvas;
  const sz = 38, W = hudCanvas.width, H = hudCanvas.height;
  const hH = Math.sqrt(3) * sz, hW = 2 * sz;
  hudCtx.save();
  hudCtx.strokeStyle = 'rgba(0,255,136,0.032)';
  hudCtx.lineWidth = 0.6;
  for (let col = -1; col * hW * 0.75 < W + hW; col++) {
    for (let row = -1; row * hH < H + hH; row++) {
      const cx = col * hW * 0.75;
      const cy = row * hH + (col % 2 === 0 ? 0 : hH / 2);
      hudCtx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i - Math.PI / 6;
        const x = cx + sz * Math.cos(a), y = cy + sz * Math.sin(a);
        i === 0 ? hudCtx.moveTo(x, y) : hudCtx.lineTo(x, y);
      }
      hudCtx.closePath(); hudCtx.stroke();
    }
  }
  hudCtx.restore();
}

// Tactical Marker Paths
function drawMissionLines() {
  if (!store.leafMap) return;
  const hudCtx = store.hudCtx;
  const cit = MISSIONS.find(m => m.id === 'citadel');
  if(!cit) return;
  const cp  = store.leafMap.latLngToContainerPoint(L.latLng(cit.lat, cit.lng));
  MISSIONS.forEach(m => {
    if (m.id === 'citadel') return;
    const mp = store.leafMap.latLngToContainerPoint(L.latLng(m.lat, m.lng));
    const amber = m.type === 'amber';
    const [r,g,b] = amber ? [240,165,0] : [0,255,136];
    hudCtx.save();
    hudCtx.beginPath(); hudCtx.moveTo(cp.x, cp.y); hudCtx.lineTo(mp.x, mp.y);
    hudCtx.strokeStyle = `rgba(${r},${g},${b},0.05)`; hudCtx.lineWidth = 7; hudCtx.setLineDash([]); hudCtx.stroke();
    hudCtx.beginPath(); hudCtx.moveTo(cp.x, cp.y); hudCtx.lineTo(mp.x, mp.y);
    hudCtx.strokeStyle = `rgba(${r},${g},${b},${amber?0.25:0.3})`; hudCtx.lineWidth = 1;
    hudCtx.setLineDash([9,6]); hudCtx.lineDashOffset = store.dashOffset; hudCtx.stroke();
    hudCtx.setLineDash([]);
    hudCtx.beginPath(); hudCtx.arc(mp.x, mp.y, 2.5, 0, Math.PI*2);
    hudCtx.fillStyle = `rgba(${r},${g},${b},0.6)`; hudCtx.fill();
    hudCtx.restore();
  });
  hudCtx.save();
  hudCtx.beginPath(); hudCtx.arc(cp.x, cp.y, 4, 0, Math.PI*2);
  hudCtx.fillStyle = 'rgba(0,255,136,0.8)'; hudCtx.fill();
  hudCtx.beginPath(); hudCtx.arc(cp.x, cp.y, 10, 0, Math.PI*2);
  hudCtx.strokeStyle = 'rgba(0,255,136,0.2)'; hudCtx.lineWidth = 1; hudCtx.stroke();
  hudCtx.restore();
}

function addMarker(mission) {
  const amber = mission.type === 'amber', citadel = mission.type === 'citadel';
  const cls = citadel ? 'citadel' : amber ? 'amber' : '';
  const rr3 = citadel ? '' : `<div class="rring rr3"></div>`;
  const html = `<div class="radar-wrap ${cls}" style="animation:sup .4s ease both">
    <div class="rring rr1"></div><div class="rring rr2"></div>${rr3}
    <div class="radar-core"></div>
    <div class="m-label">${mission.title}</div>
  </div>`;
  const icon = L.divIcon({ className: '', html, iconSize: [48,48], iconAnchor: [24,24] });
  const marker = L.marker([mission.lat, mission.lng], { icon }).addTo(store.leafMap);

  marker.on('click', e => {
    L.DomEvent.stopPropagation(e);
    const pt = store.leafMap.latLngToContainerPoint([mission.lat, mission.lng]);
    showReticle(pt.x, pt.y, amber, () => openMissionBriefing(mission.id));
  });

  const tipEl = document.getElementById('tip');
  marker.on('mouseover', e => {
    tipEl.textContent = `[ ${mission.title} ] — CLICK TO OPEN DOSSIER`;
    tipEl.style.left = (e.originalEvent.clientX + 16) + 'px';
    tipEl.style.top  = (e.originalEvent.clientY - 22) + 'px';
    tipEl.classList.add('show');
  });
  marker.on('mouseout',  () => tipEl.classList.remove('show'));
  marker.on('mousemove', e => {
    tipEl.style.left = (e.originalEvent.clientX + 16) + 'px';
    tipEl.style.top  = (e.originalEvent.clientY - 22) + 'px';
  });
}

function showReticle(x, y, amber, cb) {
  const rc = document.getElementById('reticle-container');
  const r  = document.createElement('div');
  r.className = `t-reticle${amber ? ' amber' : ''}`;
  r.style.cssText = `left:${x}px;top:${y}px;`;
  r.innerHTML = `<div class="tr-ring tr-r1"></div><div class="tr-ring tr-r2"></div>
    <div class="tr-cross-h"></div><div class="tr-cross-v"></div>
    <div class="tr-c tr-tl"></div><div class="tr-c tr-tr"></div>
    <div class="tr-c tr-bl"></div><div class="tr-c tr-br"></div>`;
  rc.appendChild(r);
  setTimeout(() => { r.style.transition = 'opacity .3s'; r.style.opacity = '0'; }, 380);
  setTimeout(() => { r.remove(); cb(); }, 520);
}

// Clock and Ticker Utilities
export function startLiveClock() {
  const el = document.getElementById('live-clock');
  setInterval(() => {
    const n = new Date();
    el.textContent = `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')} IST`;
  }, 1000);
}

export function startTicker() {
  const el = document.getElementById('ticker-content');
  const full = (TICKER_MSGS.join('   ◈   ') + '   ◈   ').repeat(2);
  el.textContent = full;
  const chars = full.length;
  const dur = chars * 0.11;
  const style = document.createElement('style');
  style.textContent = `@keyframes ticker-run{from{transform:translateX(100vw)}to{transform:translateX(-${chars*7}px)}}.ticker-content{animation:ticker-run ${dur}s linear infinite!important;}`;
  document.head.appendChild(style);
}
