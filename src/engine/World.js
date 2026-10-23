/* ─────────────────────────────────────────────────────────
   STAGE 0 · LIVING WORLD
   The "persistent ambient world" + "parallax depth" parts of Stage 0.

   • SHIPS — sail spline routes (ambientConfig.js ROUTES) with wake trails.
     Their simulation lives in a module-level `worlds` table, NOT inside the
     map objects, so a ship keeps sailing while you are inside a sector and
     is exactly where it should be when you come back. Sector maps are
     destroyed/recreated on every visit; the world is not.

   • CLOUDS — two parallax layers + ground shadows. A cloud's screen
     position is  ground + (ground − viewCentre) × (parallax − 1), so when
     the camera pans or flies, high clouds slide faster than the map and
     separate from their own shadow. That separation is what reads as
     "height", with zero extra art.

   Everything is drawn on ONE canvas per map, inserted as a custom Leaflet
   pane between the map image and the markers (z 450), so markers and
   labels always stay above the effects and clicks pass straight through.
───────────────────────────────────────────────────────────── */
import L from 'leaflet';
import { store } from '../context/StateStore.js';
import { AMBIENT, SHIP_TYPES, ROUTES } from '../constants/ambientConfig.js';
import { onFrame, clock } from './Loop.js';

/* ── tiny helpers ───────────────────────────────────────── */
function rng(seed) { let s = seed >>> 0; return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296; }
function hashStr(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
const TAU = Math.PI * 2;
function angDiff(a, b) { let d = (b - a) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; return d; }

/* ── route → smooth path (Catmull-Rom, arc-length parameterised) ─── */
function catmull(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  const f = i => 0.5 * ((2 * p1[i]) + (-p0[i] + p2[i]) * t + (2 * p0[i] - 5 * p1[i] + 4 * p2[i] - p3[i]) * t2 + (-p0[i] + 3 * p1[i] - 3 * p2[i] + p3[i]) * t3);
  return [f(0), f(1)];
}
function buildPath(points, closed) {
  const n = points.length;
  if (n < 2) return null;
  const pts = [];
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = points[closed ? (i - 1 + n) % n : Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[closed ? (i + 1) % n : i + 1];
    const p3 = points[closed ? (i + 2) % n : Math.min(i + 2, n - 1)];
    for (let k = 0; k < 20; k++) pts.push(catmull(p0, p1, p2, p3, k / 20));
  }
  pts.push(closed ? pts[0] : points[n - 1]);
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, cum, len: cum[cum.length - 1] };
}
function sampleAt(path, s) {
  const { cum, pts } = path;
  let lo = 0, hi = cum.length - 1;
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (cum[mid] <= s) lo = mid; else hi = mid; }
  const seg = cum[hi] - cum[lo] || 1;
  const t = (s - cum[lo]) / seg;
  const a = pts[lo], b = pts[hi];
  return { lat: a[0] + (b[0] - a[0]) * t, lng: a[1] + (b[1] - a[1]) * t, dlat: b[0] - a[0], dlng: b[1] - a[1] };
}

/* ── world state (survives sector open/close) ───────────── */
const worlds = new Map();   // mapId -> { ships, clouds }
const layers = new Set();   // active fx layers (global map, current sector)
export const _worlds = worlds;   // exposed for ?debug inspection

/** Shared with Debug.js — points currently being recorded. */
export const recorder = { active: false, mapId: null, points: [] };

function makeShip(route, idx) {
  const T = SHIP_TYPES[route.type] || SHIP_TYPES.cargo;
  const closed = route.closed !== false;
  const path = buildPath(route.points, closed);
  if (!path) return null;
  const ship = {
    T, closed, path, speed: route.speed || T.speed,
    s: path.len * ((idx * 0.37) % 1), dir: 1,
    lat: 0, lng: 0, heading: null, trail: [], sinceTrail: 0, phase: Math.random() * 6,
  };
  stepShip(ship, 0);
  return ship;
}

function stepShip(sh, dt) {
  sh.s += sh.dir * sh.speed * dt;
  const len = sh.path.len;
  if (sh.closed) sh.s = ((sh.s % len) + len) % len;
  else if (sh.s >= len) { sh.s = len; sh.dir = -1; }
  else if (sh.s <= 0)   { sh.s = 0;   sh.dir = 1; }

  const p = sampleAt(sh.path, sh.s);
  const want = Math.atan2(-p.dlat * sh.dir, p.dlng * sh.dir);          // screen angle (y is flipped)
  sh.heading = sh.heading === null ? want : sh.heading + angDiff(sh.heading, want) * Math.min(1, dt * 3);
  const moved = Math.hypot(p.lat - sh.lat, p.lng - sh.lng);
  sh.lat = p.lat; sh.lng = p.lng;

  sh.sinceTrail += moved;
  if (sh.sinceTrail >= 3) {
    sh.sinceTrail = 0;
    sh.trail.unshift({ lat: sh.lat, lng: sh.lng });
  }
  const cap = clock.quality >= 2 ? 30 : clock.quality === 1 ? 14 : 0;
  if (sh.trail.length > cap) sh.trail.length = cap;
}

const WRAP = { lat0: -160, lat1: 1240, lng0: -260, lng1: 2180 };
function makeClouds(mapId) {
  const r = rng(hashStr(mapId) || 7);
  const out = [];
  const add = (layer, count) => {
    for (let i = 0; i < count; i++) {
      out.push({
        layer,
        lat: WRAP.lat0 + r() * (WRAP.lat1 - WRAP.lat0),
        lng: WRAP.lng0 + r() * (WRAP.lng1 - WRAP.lng0),
        variant: Math.floor(r() * 4), size: 0.7 + r() * 0.8, flip: r() < 0.5,
        speed: 0.75 + r() * 0.5,
      });
    }
  };
  add('far',  AMBIENT.clouds.far.count);
  add('near', AMBIENT.clouds.near.count);
  return out;
}

function world(mapId) {
  let w = worlds.get(mapId);
  if (!w) {
    const ships = AMBIENT.ships.enabled
      ? (ROUTES[mapId] || []).map(makeShip).filter(Boolean) : [];
    w = { ships, clouds: makeClouds(mapId) };
    worlds.set(mapId, w);
  }
  return w;
}

/** Used by the route recorder to preview a freshly recorded route live. */
export function addShip(mapId, route) {
  const sh = makeShip(route, world(mapId).ships.length);
  if (sh) world(mapId).ships.push(sh);
}

function simulate(dt) {
  const wind = AMBIENT.clouds.wind;
  worlds.forEach(w => {
    w.ships.forEach(sh => stepShip(sh, dt));
    w.clouds.forEach(c => {
      const k = (c.layer === 'near' ? 1.25 : 0.8) * c.speed;
      c.lng += wind.lng * k * dt;
      c.lat += wind.lat * k * dt;
      if (c.lng > WRAP.lng1) c.lng = WRAP.lng0;
      if (c.lat > WRAP.lat1) c.lat = WRAP.lat0;
    });
  });
}

/* ── cloud sprites (generated once, no image files) ─────── */
let SPR = null;
function sprites() {
  if (SPR) return SPR;
  const clouds = [], shadows = [];
  for (let v = 0; v < 4; v++) {
    const c = document.createElement('canvas'); c.width = 320; c.height = 160;
    const g = c.getContext('2d');
    const r = rng(1000 + v * 77);
    for (let i = 0; i < 12; i++) {
      const x = 55 + r() * 210, y = 42 + r() * 76, rad = 26 + r() * 46;
      const gr = g.createRadialGradient(x, y, 0, x, y, rad);
      gr.addColorStop(0, 'rgba(225,238,244,.55)');
      gr.addColorStop(1, 'rgba(225,238,244,0)');
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, TAU); g.fill();
    }
    const s = document.createElement('canvas'); s.width = 320; s.height = 160;
    const sg = s.getContext('2d');
    sg.drawImage(c, 0, 0);
    sg.globalCompositeOperation = 'source-in';
    sg.fillStyle = '#02080a'; sg.fillRect(0, 0, 320, 160);
    clouds.push(c); shadows.push(s);
  }
  return (SPR = { clouds, shadows });
}

/* ── drawing ────────────────────────────────────────────── */
function hullPath(ctx, L, hb) {
  ctx.beginPath();
  ctx.moveTo(.5 * L, 0);
  ctx.quadraticCurveTo(.36 * L, hb, .2 * L, hb);
  ctx.lineTo(-.46 * L, hb);
  ctx.lineTo(-.5 * L, hb * .75);
  ctx.lineTo(-.5 * L, -hb * .75);
  ctx.lineTo(-.46 * L, -hb);
  ctx.lineTo(.2 * L, -hb);
  ctx.quadraticCurveTo(.36 * L, -hb, .5 * L, 0);
  ctx.closePath();
}
const BOX_COLORS = ['#6b3b2e', '#2f4a5c', '#5c5a2f', '#35553f', '#59606a'];

function drawShip(ctx, sh, map, scale, t, w, h) {
  const p = map.latLngToContainerPoint([sh.lat, sh.lng]);
  const L = sh.T.length * scale;
  if (p.x < -L || p.y < -L || p.x > w + L || p.y > h + L) return;
  const hb = sh.T.beam * L / 2;

  // wake: fading, widening foam ribbon behind the stern
  const n = sh.trail.length;
  if (n > 1) {
    ctx.lineCap = 'round';
    let prev = p;
    for (let i = 0; i < n; i++) {
      const q = map.latLngToContainerPoint([sh.trail[i].lat, sh.trail[i].lng]);
      const age = (i + 1) / n;
      ctx.strokeStyle = `rgba(232,246,252,${(1 - age) * 0.34 * sh.T.wake})`;
      ctx.lineWidth = Math.max(0.6, L * (0.05 + 0.17 * age) * sh.T.wake);
      ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      prev = q;
    }
  }

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(sh.heading);

  ctx.save();                                   // drop shadow on the water
  ctx.translate(L * .04, L * .07);
  ctx.fillStyle = 'rgba(0,0,0,.30)';
  hullPath(ctx, L, hb); ctx.fill();
  ctx.restore();

  ctx.fillStyle = sh.T.hull; hullPath(ctx, L, hb); ctx.fill();
  ctx.save();                                   // deck plate
  ctx.scale(.9, .72); ctx.fillStyle = sh.T.deck; hullPath(ctx, L, hb); ctx.fill();
  ctx.restore();

  if (sh.T.containers) {
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = BOX_COLORS[(i + Math.floor(sh.phase)) % BOX_COLORS.length];
      ctx.fillRect(-.22 * L + i * .105 * L, -hb * .62, .09 * L, hb * 1.24);
    }
  }
  ctx.fillStyle = '#5b6b70';                    // bridge
  ctx.fillRect(-.40 * L, -hb * .55, .10 * L, hb * 1.1);

  if (L > 14) {                                 // nav lights
    const r = Math.max(.7, L * .014);
    ctx.fillStyle = '#35ff8a'; ctx.beginPath(); ctx.arc(.34 * L,  hb * .8, r, 0, TAU); ctx.fill();
    ctx.fillStyle = '#ff4a3a'; ctx.beginPath(); ctx.arc(.34 * L, -hb * .8, r, 0, TAU); ctx.fill();
    const blink = .35 + .65 * Math.max(0, Math.sin(t * 2.6 + sh.phase));
    ctx.fillStyle = `rgba(255,255,255,${blink})`;
    ctx.beginPath(); ctx.arc(-.36 * L, 0, r * 1.2, 0, TAU); ctx.fill();
  }
  ctx.restore();
}

function drawClouds(ctx, layer, kind, map, scale, w, h) {
  const cfg = AMBIENT.clouds[kind];
  const { clouds: cs } = sprites();
  const wld = world(layer.mapId);
  const cx = w / 2, cy = h / 2;
  const f = cfg.parallax;
  const mouse = AMBIENT.mouseDepthPx * (1 + (f - 1) * 4);
  const mx = -store.depth.x * mouse, my = -store.depth.y * mouse;
  ctx.globalAlpha = cfg.alpha;
  for (const c of wld.clouds) {
    if (c.layer !== kind) continue;
    const g = map.latLngToContainerPoint([c.lat, c.lng]);
    const x = g.x + (g.x - cx) * (f - 1) + mx;
    const y = g.y + (g.y - cy) * (f - 1) + my;
    const sw = cfg.size * c.size * scale * (1 + (f - 1) * .6), sh = sw / 2;
    if (x + sw / 2 < 0 || x - sw / 2 > w || y + sh / 2 < 0 || y - sh / 2 > h) continue;
    ctx.save(); ctx.translate(x, y); if (c.flip) ctx.scale(-1, 1);
    ctx.drawImage(cs[c.variant], -sw / 2, -sh / 2, sw, sh);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function drawShadows(ctx, layer, map, scale, w, h) {
  const { shadows } = sprites();
  const wld = world(layer.mapId);
  const off = AMBIENT.clouds.shadowOffset;
  ctx.globalAlpha = AMBIENT.clouds.shadowAlpha;
  for (const c of wld.clouds) {
    if (c.layer === 'near' && clock.quality < 2) continue;
    const cfg = AMBIENT.clouds[c.layer];
    const g = map.latLngToContainerPoint([c.lat, c.lng]);
    const sw = cfg.size * c.size * scale * 0.95, sh = sw / 2;
    const x = g.x + off.x * (1 + scale), y = g.y + off.y * (1 + scale);
    if (x + sw / 2 < 0 || x - sw / 2 > w || y + sh / 2 < 0 || y - sh / 2 > h) continue;
    ctx.save(); ctx.translate(x, y); if (c.flip) ctx.scale(-1, 1);
    ctx.drawImage(shadows[c.variant], -sw / 2, -sh / 2, sw, sh);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function drawRecorder(ctx, layer, map) {
  if (!recorder.active || recorder.mapId !== layer.mapId) return;
  const pts = recorder.points.map(p => map.latLngToContainerPoint(p));
  ctx.save();
  ctx.strokeStyle = 'rgba(240,165,0,.9)'; ctx.fillStyle = '#f0a500'; ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 5]);
  ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y))); ctx.stroke();
  ctx.setLineDash([]);
  pts.forEach((q, i) => {
    ctx.beginPath(); ctx.arc(q.x, q.y, 4, 0, TAU); ctx.fill();
    ctx.font = '10px "Share Tech Mono", monospace'; ctx.fillText(String(i + 1), q.x + 7, q.y - 7);
  });
  ctx.restore();
}

function renderAll() {
  const t0 = performance.now();
  const t = clock.time;
  layers.forEach(layer => {
    const show = layer.visible();
    layer.canvas.style.display = show ? '' : 'none';
    if (!show) return;
    const { map, ctx, w, h } = layer;
    if (!map._loaded) return;
    const scale = Math.pow(2, map.getZoom());
    ctx.setTransform(layer.dpr, 0, 0, layer.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const wld = world(layer.mapId);
    if (AMBIENT.clouds.enabled && clock.quality >= 1) drawShadows(ctx, layer, map, scale, w, h);
    wld.ships.forEach(sh => drawShip(ctx, sh, map, scale, t, w, h));
    drawRecorder(ctx, layer, map);
    if (AMBIENT.clouds.enabled && clock.quality >= 1) {
      drawClouds(ctx, layer, 'far', map, scale, w, h);
      if (clock.quality >= 2) drawClouds(ctx, layer, 'near', map, scale, w, h);
    }
  });
  clock.fxMs += (performance.now() - t0 - clock.fxMs) * 0.1;   // smoothed cost of the whole fx pass
}

/* ── public: attach the effects canvas to a Leaflet map ─── */
export function createFxLayer(map, mapId, { visible = () => true } = {}) {
  if (!AMBIENT.enabled || store.reduceMotion) return null;
  world(mapId);                                              // make sure sim state exists

  const pane = map.getPane('worldfx') || map.createPane('worldfx');
  pane.style.zIndex = 450;
  pane.style.pointerEvents = 'none';

  const canvas = document.createElement('canvas');
  canvas.className = 'world-fx';
  canvas.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none;';
  pane.appendChild(canvas);

  const layer = { map, mapId, canvas, ctx: canvas.getContext('2d'), w: 0, h: 0, dpr: 1, visible };

  const resize = () => {
    const s = map.getSize();
    layer.w = s.x; layer.h = s.y;
    layer.dpr = Math.min(window.devicePixelRatio || 1, clock.quality >= 2 ? 1.75 : 1);
    canvas.width = Math.round(s.x * layer.dpr);
    canvas.height = Math.round(s.y * layer.dpr);
    canvas.style.width = s.x + 'px';
    canvas.style.height = s.y + 'px';
  };
  // The pane lives inside Leaflet's moving map-pane; cancel its offset so
  // the canvas always covers the viewport, then draw in container pixels.
  const reposition = () => {
    const p = L.DomUtil.getPosition(map.getPane('mapPane')) || { x: 0, y: 0 };
    canvas.style.transform = `translate3d(${-p.x}px,${-p.y}px,0)`;
  };
  map.on('move zoom viewreset', reposition);
  map.on('resize', () => { resize(); reposition(); });
  resize(); reposition();

  layers.add(layer);
  layer.destroy = () => {
    layers.delete(layer);
    map.off('move zoom viewreset', reposition);
    canvas.remove();
  };
  return layer;
}

export function initWorld() {
  store.reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  onFrame(simulate,  { id: 'world-sim',    order: 1 });
  onFrame(renderAll, { id: 'world-render', order: 20 });
}
