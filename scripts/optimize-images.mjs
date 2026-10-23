/* ─────────────────────────────────────────────────────────
   STAGE 0 · IMAGE OPTIMISER
   Your map/sector art is 2.5–5 MB PNG each (~43 MB total). The browser
   has to download AND decode all of that — it is the #1 reason a page
   hitches. WebP at q82 looks the same and is typically 85–95% smaller.

   Usage (one time, locally):
     npm i -D sharp
     node scripts/optimize-images.mjs            # makes .webp next to each PNG/JPG
     node scripts/optimize-images.mjs --rewrite  # ...and updates src/ + index.html to use them

   Originals are kept — delete them yourself once you're happy.
───────────────────────────────────────────────────────── */
import fs from 'node:fs';
import path from 'node:path';

let sharp;
try { sharp = (await import('sharp')).default; }
catch { console.error('sharp is not installed →  npm i -D sharp'); process.exit(1); }

const ASSETS = 'public/assets';
const REWRITE = process.argv.includes('--rewrite');
const MIN_BYTES = 300 * 1024;        // leave small files (ascii-art.png etc.) alone
const MAX_WIDTH = 2560;              // maps are laid out at 1920 wide; 2560 covers retina zoom

const converted = [];
let before = 0, after = 0;

for (const file of fs.readdirSync(ASSETS)) {
  const ext = path.extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
  const src = path.join(ASSETS, file);
  const size = fs.statSync(src).size;
  if (size < MIN_BYTES) continue;
  const out = path.join(ASSETS, path.basename(file, ext) + '.webp');
  await sharp(src).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(out);
  const outSize = fs.statSync(out).size;
  before += size; after += outSize;
  converted.push(file);
  console.log(`${file.padEnd(24)} ${(size / 1048576).toFixed(2)} MB → ${(outSize / 1048576).toFixed(2)} MB`);
}
console.log(`\nTOTAL ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB  (${before ? Math.round((1 - after / before) * 100) : 0}% smaller)`);

if (REWRITE && converted.length) {
  const targets = [];
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (/\.(js|css|html)$/.test(e.name)) targets.push(p);
  });
  walk('src'); targets.push('index.html');
  for (const t of targets) {
    let txt = fs.readFileSync(t, 'utf8'), changed = txt;
    for (const f of converted) {
      const base = path.basename(f, path.extname(f));
      changed = changed.replaceAll(new RegExp(`(assets/${base})\\.(png|jpe?g)`, 'g'), '$1.webp');
    }
    if (changed !== txt) { fs.writeFileSync(t, changed); console.log('rewrote', t); }
  }
}
