/* ─────────────────────────────────────────────────────────
   STAGE 0 · PRELOADER
   Phaser's "load everything first, then start" trick. Images are fetched
   and DECODED ahead of time (img.decode()), so when a map or sector opens
   the bitmap is already ready — no blank frame, no pop-in, no main-thread
   decode hitch in the middle of a camera move.

   Two tiers so the boot screen is never held hostage by 40MB of art:
     critical  → must finish before the deploy buckle unlocks
     secondary → warmed quietly in the background, 2 at a time
   A missing/broken file NEVER blocks boot — it is just reported.
───────────────────────────────────────────────────────── */

const cache = new Map();            // src -> Promise<{ ok, img }>
export const report = { total: 0, done: 0, failed: [] };

function loadOne(src) {
  if (cache.has(src)) return cache.get(src);
  report.total++;
  const p = new Promise(resolve => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      const fin = () => { report.done++; resolve({ ok: true, img }); };
      // decode() moves the expensive PNG/WebP decode off the main thread.
      (img.decode ? img.decode().then(fin, fin) : fin());
    };
    img.onerror = () => {
      report.done++;
      report.failed.push(src);
      console.warn(`[PRELOAD] missing asset: ${src}`);
      resolve({ ok: false, img: null });
    };
    img.src = src;
  });
  cache.set(src, p);
  return p;
}

/** Resolves when `src` is decoded (instantly if already warm). Never rejects. */
export function ensure(src) { return loadOne(src); }

/**
 * @param {string[]} critical   blocks the returned promise
 * @param {string[]} secondary  warmed in the background afterwards
 * @param {(done:number,total:number)=>void} onProgress  called as critical assets land
 */
export function preload({ critical = [], secondary = [], onProgress = () => {} }) {
  const crit = [...new Set(critical)];
  let done = 0;
  const gate = Promise.all(crit.map(src =>
    loadOne(src).then(() => { onProgress(++done, crit.length); })
  ));
  if (!crit.length) onProgress(0, 0);

  gate.then(() => {
    const queue = [...new Set(secondary)].filter(s => !cache.has(s));
    const worker = async () => {
      while (queue.length) {
        await loadOne(queue.shift());
        await new Promise(r => (window.requestIdleCallback ? window.requestIdleCallback(() => r()) : setTimeout(r, 50)));
      }
    };
    worker(); worker();               // two lanes keeps the main connection free
  });

  return gate;
}
