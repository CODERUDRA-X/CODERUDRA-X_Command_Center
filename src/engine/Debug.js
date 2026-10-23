/* ─────────────────────────────────────────────────────────
   STAGE 0 · DEBUG HUD + SHIP ROUTE RECORDER
   Press ` (backtick) or open the site with ?debug.
     • live FPS / frame-time / quality level / asset report
     • R  → record a ship route: click along open water on the map
            1 cargo · 2 tanker · 3 patrol · C open/closed loop
            Enter = finish (copies the route, previews it live)
            Backspace = undo last point · Esc = cancel
───────────────────────────────────────────────────────── */
import { store } from '../context/StateStore.js';
import { clock, onFrame, subscriberCount } from './Loop.js';
import { report } from './Preloader.js';
import { recorder, addShip, _worlds } from './World.js';

const TYPES = ['cargo', 'tanker', 'patrol'];
let panel, open = false, typeIdx = 0, closed = false, note = '', noteUntil = 0, acc = 0;

function activeMap() {
  const sectorUp = document.getElementById('sector-screen')?.classList.contains('on');
  if (sectorUp && store.sectorMap) return { map: store.sectorMap, id: store.activeSectorId };
  if (store.leafMap) return { map: store.leafMap, id: 'global' };
  return null;
}

/** Call once per Leaflet map so recorder clicks land on it. */
export function attachDebug(map, mapId) {
  map.on('click', e => {
    if (!recorder.active || recorder.mapId !== mapId) return;
    recorder.points.push([Math.round(e.latlng.lat), Math.round(e.latlng.lng)]);
  });
}

function flash(msg) { note = msg; noteUntil = performance.now() + 5000; }

function finish() {
  if (recorder.points.length < 2) return flash('NEED AT LEAST 2 POINTS');
  const route = { type: TYPES[typeIdx], closed, points: recorder.points.slice() };
  const text = `{ type: '${route.type}', closed: ${closed}, points: ${JSON.stringify(route.points)} },`;
  console.log(`[ROUTE ${recorder.mapId}]\n${text}`);
  navigator.clipboard?.writeText(text).catch(() => {});
  addShip(recorder.mapId, route);
  flash(`COPIED → ROUTES.${recorder.mapId} (preview sailing)`);
  stopRec();
}
function stopRec() { recorder.active = false; recorder.points = []; document.body.classList.remove('rec'); }

function onKey(e) {
  if (e.key === '`') { toggle(); return; }
  if (!open) return;
  const k = e.key.toLowerCase();
  if (k === 'r') {
    if (recorder.active) return stopRec();
    const a = activeMap(); if (!a) return;
    recorder.active = true; recorder.mapId = a.id; recorder.points = [];
    document.body.classList.add('rec');
  } else if (!recorder.active) return;
  else if (k === 'enter') finish();
  else if (k === 'backspace') recorder.points.pop();
  else if (k === 'escape') stopRec();
  else if (k === 'c') closed = !closed;
  else if (k >= '1' && k <= '3') typeIdx = +k - 1;
}

function toggle(force) {
  open = force ?? !open;
  panel.style.display = open ? 'block' : 'none';
  if (!open) stopRec();
}

function update(dt) {
  if (!open) return;
  acc += dt; if (acc < 0.25) return; acc = 0;
  const a = activeMap();
  const lines = [
    `FPS ${clock.fps.toFixed(0)}  ·  ${(clock.dt * 1000).toFixed(1)}ms  ·  Q${clock.quality}  ·  FX ${clock.fxMs.toFixed(2)}ms`,
    `LOOP SUBS ${subscriberCount()}  ·  MAP ${a ? a.id : '-'}`,
    `ASSETS ${report.done}/${report.total}${report.failed.length ? `  ·  MISSING ${report.failed.length}` : ''}`,
  ];
  report.failed.slice(0, 4).forEach(f => lines.push(`  ✕ ${f}`));
  if (recorder.active) {
    lines.push(`● REC ${recorder.mapId}: ${recorder.points.length} pts  [${TYPES[typeIdx]} · ${closed ? 'loop' : 'there-and-back'}]`);
    lines.push('  click water · 1/2/3 type · C loop · ⏎ finish · ⌫ undo · Esc cancel');
  } else lines.push('R = record ship route');
  if (performance.now() < noteUntil) lines.push(note);
  panel.textContent = lines.join('\n');
}

export function initDebug() {
  panel = document.createElement('pre');
  panel.id = 'dbg';
  document.body.appendChild(panel);
  window.addEventListener('keydown', onKey);
  onFrame(update, { id: 'debug', order: 99 });
  if (new URLSearchParams(location.search).has('debug')) { toggle(true); window.__CX = { store, clock, worlds: _worlds }; }
  else panel.style.display = 'none';
}
