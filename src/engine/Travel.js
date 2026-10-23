/* ─────────────────────────────────────────────────────────
   STAGE 0 · TRAVEL HELPERS
   Small promise wrappers so the camera sequences in SectorDrillDown.js
   read top-to-bottom ("lift off → fly over water → dive") instead of
   being nested setTimeout pyramids.
───────────────────────────────────────────────────────── */
import L from 'leaflet';
import { store } from '../context/StateStore.js';
import { onFrame, offFrame } from './Loop.js';

/** Scale a duration (seconds) — collapses to ~0 for prefers-reduced-motion. */
export const D = s => (store.reduceMotion ? 0.01 : s);

export const sleep = s => new Promise(r => setTimeout(r, s * 1000));

const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Camera move as a promise, driven by the master loop (so it shares dt and
 * pauses cleanly). Unlike Leaflet's flyTo this never zooms out past the
 * map edge mid-flight (no black void), and zoom is interpolated linearly in
 * log-space = constant-speed zoom. `bump` adds a small altitude arc
 * (negative = lift higher) that is clamped to `minZoom`.
 */
export function cameraTo(map, latlng, zoom, seconds, { bump = 0, minZoom = -Infinity } = {}) {
  return new Promise(resolve => {
    if (!map) return resolve();
    const target = L.latLng(latlng);
    if (store.reduceMotion) { map.setView(target, zoom, { animate: false }); return resolve(); }

    const z0 = map.getZoom(), c0 = map.getCenter();
    const snap = map.options.zoomSnap;
    map.options.zoomSnap = 0;                       // otherwise zoom steps in 0.1 jumps = visible stutter
    let t = 0;
    const id = Symbol('camera');
    onFrame(dt => {
      t = Math.min(1, t + dt / seconds);
      const k = easeInOut(t);
      const z = Math.max(minZoom, z0 + (zoom - z0) * k + bump * Math.sin(Math.PI * k));
      map.setView([c0.lat + (target.lat - c0.lat) * k, c0.lng + (target.lng - c0.lng) * k], z, { animate: false });
      if (t >= 1) {
        offFrame(id);
        map.options.zoomSnap = snap;
        resolve();
      }
    }, { id, order: 2 });
  });
}

/** Cinematic caption shown while the camera is moving (non-blocking). */
let toastEl = null;
export function showToast(line1, line2 = '') {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'transit-toast';
    document.body.appendChild(toastEl);
  }
  toastEl.innerHTML = `<div class="tt-1">${line1}</div>${line2 ? `<div class="tt-2">${line2}</div>` : ''}`;
  requestAnimationFrame(() => toastEl.classList.add('on'));
}
export function hideToast() { toastEl?.classList.remove('on'); }
