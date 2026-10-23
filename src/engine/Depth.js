/* ─────────────────────────────────────────────────────────
   STAGE 0 · DEPTH (pointer parallax)
   The map art is one flat image, so depth is faked the way 2D games do it:
   layers that are "closer" slide a little further than layers that are
   "farther" when the viewpoint moves. Here the viewpoint is the mouse —
   the marker layer drifts against the map art by a few pixels, and the
   cloud layers (World.js) drift even more.

   The pointer is smoothed with an exponential spring (frame-rate
   independent), so motion is silky instead of tracking raw mouse jitter.
───────────────────────────────────────────────────────────── */
import { store } from '../context/StateStore.js';
import { AMBIENT } from '../constants/ambientConfig.js';
import { onFrame } from './Loop.js';

const target = { x: 0, y: 0 };
const shift  = { x: 0, y: 0 };     // current marker-layer offset in px

/** Offset (px) currently applied to the marker pane — add it when you
 *  convert lat/lng → screen for anything that must line up with a marker. */
export function markerShift() { return shift; }

export function initDepth() {
  if (store.reduceMotion || !AMBIENT.mouseDepthPx) return;
  window.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    target.x = (e.clientX / window.innerWidth  - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => { target.x = 0; target.y = 0; });

  onFrame(dt => {
    const k = 1 - Math.exp(-dt * 6);                  // spring toward pointer
    store.depth.x += (target.x - store.depth.x) * k;
    store.depth.y += (target.y - store.depth.y) * k;

    shift.x = -store.depth.x * AMBIENT.mouseDepthPx;
    shift.y = -store.depth.y * AMBIENT.mouseDepthPx;

    for (const map of [store.leafMap, store.sectorMap]) {
      if (!map) continue;
      const pane = map.getPane('markerPane');
      if (pane) pane.style.translate = `${shift.x.toFixed(2)}px ${shift.y.toFixed(2)}px`;
    }
  }, { id: 'depth', order: 5 });
}
