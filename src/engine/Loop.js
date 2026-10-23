/* ─────────────────────────────────────────────────────────
   STAGE 0 · MASTER LOOP
   Phaser-style game loop for the whole site: ONE requestAnimationFrame,
   every animation subscribes to it and receives `dt` (seconds since the
   last frame). All speeds are expressed per-SECOND, not per-frame, so a
   60Hz laptop, a 144Hz monitor and a 30fps phone all see the same motion
   speed — the old `angle += 1.6` per-frame code ran 2.4x faster on 144Hz.

   Also owns the adaptive quality governor: if the average FPS stays low,
   `clock.quality` steps down (2 → 1 → 0) and the heavy cosmetic layers
   (clouds, wake trails) switch themselves off. It never steps back up, so
   it can't oscillate.
───────────────────────────────────────────────────────── */

export const clock = {
  dt: 1 / 60,      // seconds, clamped (a tab-switch hitch never "teleports" things)
  time: 0,         // total sim seconds
  fps: 60,         // smoothed
  quality: 2,      // 2 = full, 1 = no near-clouds, 0 = ships only
  frame: 0,
  fxMs: 0,         // smoothed cost of the world-fx render pass (World.js)
};

// ?quality=0|1|2 in the URL pins the level (handy for testing / screenshots).
const pinned = new URLSearchParams(location.search).get('quality');
if (pinned !== null) clock.quality = Math.max(0, Math.min(2, +pinned || 0));

const MAX_DT = 1 / 20;
const subs = [];       // { id, fn, order }
let rafId = 0;
let last = 0;
let slowFor = 0;       // seconds spent under the FPS threshold
let started = false;

export function onFrame(fn, { id = null, order = 0 } = {}) {
  if (id) {
    const existing = subs.find(s => s.id === id);
    if (existing) { existing.fn = fn; existing.order = order; return () => offFrame(id); }
  }
  const sub = { id: id || Symbol('sub'), fn, order };
  subs.push(sub);
  subs.sort((a, b) => a.order - b.order);
  if (!started) start();
  return () => offFrame(sub.id);
}

export function offFrame(id) {
  const i = subs.findIndex(s => s.id === id);
  if (i >= 0) subs.splice(i, 1);
}

export function subscriberCount() { return subs.length; }

function start() {
  started = true;
  last = performance.now();
  rafId = requestAnimationFrame(tick);
}

function tick(now) {
  rafId = requestAnimationFrame(tick);
  const rawDt = Math.max((now - last) / 1000, 0.0001);
  last = now;
  const dt = Math.min(rawDt, MAX_DT);

  clock.dt = dt;
  clock.time += dt;
  clock.frame++;
  clock.fps += (Math.min(1 / rawDt, 240) - clock.fps) * 0.06;

  // Quality governor — only counts frames where the tab is actually
  // active and we aren't in the first second (asset decode spikes).
  if (pinned === null && clock.time > 3 && clock.quality > 0) {
    if (clock.fps < 38) slowFor += dt; else slowFor = Math.max(0, slowFor - dt);
    if (slowFor > 4) {
      clock.quality--;
      slowFor = 0;
      console.info(`[LOOP] FPS ${clock.fps.toFixed(0)} — quality lowered to ${clock.quality}`);
    }
  }

  // Copy so subscribers can unsubscribe themselves mid-frame.
  const list = subs.slice();
  for (let i = 0; i < list.length; i++) {
    try { list[i].fn(dt, clock); }
    catch (err) { console.error('[LOOP] subscriber error', err); }
  }
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) last = performance.now();   // no giant dt after tab switch
});
