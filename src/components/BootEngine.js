import { store } from '../context/StateStore.js';
import { BLINES } from '../constants/tickerConfig.js';
import { scrambleReveal } from './SectorDrillDown.js';
import { initLeafletMap, startLiveClock, startTicker } from './RadarMap.js';

/* ── BOOT SCREEN: Neural-Radar background ────────────────────────────
   Sparse "neural net" (AI side) behind a huge, slow, near-invisible
   radar sweep (defense side). Both idle quietly — the payoff is that
   every boot-log line fires one random synapse, and 100% fires a
   radar burst, so it reads as "reacting to the boot", not decoration.
   Canvas math is unchanged from the original app.js. */
function initBootNeural() {
  const canvas = document.getElementById('boot-neural');
  if (!canvas) return;
  store.bootNeuralCtx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const n = 14;
  store.bootNeuralNodes = [];
  for (let i = 0; i < n; i++) {
    store.bootNeuralNodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
  }
  store.bootNeuralEdges = [];
  store.bootNeuralNodes.forEach((a, i) => {
    const nearest = store.bootNeuralNodes
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter(o => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2);
    nearest.forEach(o => store.bootNeuralEdges.push([i, o.j]));
  });

  store.bootNeuralActive = true;
  requestAnimationFrame(bootNeuralLoop);
}

function bootNeuralLoop() {
  if (!store.bootNeuralActive || !store.bootNeuralCtx) return;
  const ctx = store.bootNeuralCtx, canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2, cy = canvas.height / 2;

  store.bootRadarAngle += 0.15;
  const rad = store.bootRadarAngle * Math.PI / 180;
  const len = Math.max(canvas.width, canvas.height) * 0.6;
  ctx.save();
  const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(rad) * len, cy + Math.sin(rad) * len);
  grad.addColorStop(0, `rgba(0,255,136,${0.05 + (store.bootRadarBurst > 0 ? store.bootRadarBurst : 0)})`);
  grad.addColorStop(1, 'rgba(0,255,136,0)');
  ctx.beginPath(); ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(rad) * len, cy + Math.sin(rad) * len);
  ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();
  if (store.bootRadarBurst > 0) {
    ctx.beginPath(); ctx.arc(cx, cy, len * (1 - store.bootRadarBurst), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,255,136,${store.bootRadarBurst * 0.4})`;
    ctx.lineWidth = 1; ctx.stroke();
    store.bootRadarBurst -= 0.012;
  }
  ctx.restore();

  ctx.save();
  store.bootNeuralEdges.forEach(([i, j]) => {
    const a = store.bootNeuralNodes[i], b = store.bootNeuralNodes[j];
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = 'rgba(0,255,136,.05)'; ctx.lineWidth = 1; ctx.stroke();
  });
  store.bootNeuralNodes.forEach(node => {
    ctx.beginPath(); ctx.arc(node.x, node.y, 1.6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,255,136,.18)'; ctx.fill();
  });
  store.bootPulses = store.bootPulses.filter(p => p.t < 1);
  store.bootPulses.forEach(p => {
    p.t += 0.02;
    const a = store.bootNeuralNodes[p.i], b = store.bootNeuralNodes[p.j];
    const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
    const fade = Math.sin(p.t * Math.PI);
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(x, y);
    ctx.strokeStyle = `rgba(0,255,136,${fade * 0.7})`; ctx.lineWidth = 1.3; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,136,${fade})`; ctx.fill();
  });
  ctx.restore();

  requestAnimationFrame(bootNeuralLoop);
}

function fireBootSynapse() {
  if (!store.bootNeuralEdges.length) return;
  const [i, j] = store.bootNeuralEdges[Math.floor(Math.random() * store.bootNeuralEdges.length)];
  store.bootPulses.push({ i, j, t: 0 });
}

function fireBootRadarBurst() {
  store.bootRadarBurst = 1;
}

/* ── Background Starfield & Speed Particles ──────────────────────────
   Purely atmospheric DOM population, identical math/counts to the
   original app.js. Runs once at boot. */
function initAtmosphere() {
  const starsEl = document.getElementById('stars');
  for (let i = 0; i < 160; i++) {
    const s = document.createElement('div'); s.className = 'star';
    const sz = Math.random() * 2.5 + .4;
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${sz}px;height:${sz}px;opacity:${(.1+Math.random()*.9).toFixed(2)};`;
    starsEl.appendChild(s);
  }
  const cloudsEl = document.getElementById('clouds');
  for (let i = 0; i < 8; i++) {
    const c = document.createElement('div'); c.className = 'cloud';
    c.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*80}%;width:${150+Math.random()*280}px;height:${40+Math.random()*55}px;border-radius:50%;background:rgba(255,255,255,${(.02+Math.random()*.05).toFixed(3)});`;
    cloudsEl.appendChild(c);
  }
  // Far parallax layer: fewer, larger, dimmer, blurred, slower drift — gives
  // the fall real depth instead of one flat plane of shapes.
  const cloudsFarEl = document.getElementById('clouds-far');
  if (cloudsFarEl) {
    for (let i = 0; i < 5; i++) {
      const c = document.createElement('div'); c.className = 'cloud-far';
      c.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*70}%;width:${220+Math.random()*380}px;height:${60+Math.random()*70}px;border-radius:50%;background:rgba(255,255,255,${(.015+Math.random()*.03).toFixed(3)});filter:blur(2px);`;
      cloudsFarEl.appendChild(c);
    }
  }
  const spdEl = document.getElementById('speed-lines');
  for (let i = 0; i < 40; i++) {
    const l = document.createElement('div'); l.className = 'spd';
    const h = 80 + Math.random() * 260;
    l.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*55}%;height:${h}px;animation:sup ${(.5+Math.random()*1.3).toFixed(2)}s ease ${(Math.random()*3.8).toFixed(2)}s both;`;
    spdEl.appendChild(l);
  }
}

/* ── HOLD-TO-DEPLOY ──────────────────────────────────────────
   A deliberate press-and-hold (with a radial fill readout on the buckle)
   reads as a committed action, unlike a plain tap — matches the "hold to
   confirm launch" pattern from tactical/military-sim UIs. */
function ensureAudioCtx() {
  if (!store.audioCtx) {
    try { store.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { store.audioCtx = null; }
  }
  return store.audioCtx;
}

// Synthesized "mechanical clank + wind swell" — generated entirely via
// Web Audio oscillators/noise, so there's zero external audio asset or
// extra load time. The context is created inside holdBegin() (directly
// within the user's pointerdown gesture) so it's already unlocked by the
// time this actually plays, avoiding autoplay-policy blocks.
function playDeployClank() {
  const ctx = ensureAudioCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;

    const clank = ctx.createOscillator();
    const clankGain = ctx.createGain();
    clank.type = 'square';
    clank.frequency.setValueAtTime(180, now);
    clank.frequency.exponentialRampToValueAtTime(60, now + .12);
    clankGain.gain.setValueAtTime(.25, now);
    clankGain.gain.exponentialRampToValueAtTime(.001, now + .18);
    clank.connect(clankGain).connect(ctx.destination);
    clank.start(now); clank.stop(now + .2);

    const bufSize = ctx.sampleRate * 1.2;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const wind = ctx.createBufferSource(); wind.buffer = buf;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass'; windFilter.frequency.value = 500; windFilter.Q.value = .6;
    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0, now);
    windGain.gain.linearRampToValueAtTime(.12, now + .2);
    windGain.gain.linearRampToValueAtTime(0, now + 1.1);
    wind.connect(windFilter).connect(windGain).connect(ctx.destination);
    wind.start(now); wind.stop(now + 1.2);
  } catch (e) { /* Web Audio blocked/unsupported — fail silently, visuals still play */ }
}

const HOLD_MS = 750;

function holdTick(holdFillEl) {
  if (store.holdStart === null) return;
  const p = Math.min((Date.now() - store.holdStart) / HOLD_MS, 1) * 100;
  if (holdFillEl) holdFillEl.style.setProperty('--p', p.toFixed(1));
  if (p >= 100) {
    if (!store.holdDone) { store.holdDone = true; playDeployClank(); startDeploy(); }
    return;
  }
  store.holdRAFId = requestAnimationFrame(() => holdTick(holdFillEl));
}
function holdBegin(e, holdFillEl) {
  e.preventDefault();
  if (store.holdDone) return;
  ensureAudioCtx(); // unlock audio synchronously within this user gesture
  store.holdStart = Date.now();
  store.holdRAFId = requestAnimationFrame(() => holdTick(holdFillEl));
}
function holdCancel(holdFillEl) {
  if (store.holdDone) return;
  store.holdStart = null;
  if (store.holdRAFId) cancelAnimationFrame(store.holdRAFId);
  if (holdFillEl) holdFillEl.style.setProperty('--p', 0);
}

function startDeploy() {
  document.getElementById('belt-wrap').classList.add('open');
  setTimeout(() => {
    document.getElementById('boot').classList.add('out');
    document.getElementById('drop').classList.add('on');
    let alt = 8800;
    let lastTick = Date.now();
    let drift = 0;
    const ae      = document.getElementById('anum');
    const rateEl  = document.getElementById('descent-rate');
    const driftEl = document.getElementById('drift-stat');
    const ti = setInterval(() => {
      const dropAmt = Math.floor(Math.random() * 600 + 200);
      alt -= dropAmt;
      if (alt <= 0) { alt = 0; clearInterval(ti); }
      ae.textContent = alt.toLocaleString();

      // Derived telemetry: descent rate + a wandering drift figure, so the
      // HUD reads as continuously-measuring instrumentation rather than a
      // single number ticking down in isolation.
      const now = Date.now();
      const dt = (now - lastTick) / 1000;
      const rate = dt > 0 ? Math.round(dropAmt / dt) : 0;
      lastTick = now;
      drift += (Math.random() - .5) * 4;
      if (rateEl)  rateEl.textContent  = `RATE: ${rate} M/S`;
      if (driftEl) driftEl.textContent = `DRIFT: ${drift >= 0 ? '+' : ''}${drift.toFixed(1)}M`;
    }, 85);

    // Brief, semi-random telemetry glitch — reads as a live feed rather
    // than a scripted counter. Reuses scrambleReveal() from the sector
    // recon-FX system since it's a generic (el, text, duration) utility.
    setTimeout(() => {
      if (rateEl) scrambleReveal(rateEl, rateEl.textContent, 260);
    }, 1400 + Math.random() * 900);

    // Momentary "SIGNAL UNSTABLE" flash mid-fall — purely atmospheric,
    // reinforces this is a live recon feed, not a static overlay.
    setTimeout(() => {
      const sig = document.getElementById('signal-glitch');
      if (sig) { sig.classList.add('show'); setTimeout(() => sig.classList.remove('show'), 650); }
    }, 2000);

    setTimeout(() => {
      document.getElementById('drop').classList.add('shaking');
      document.getElementById('lflash').classList.add('fire');
    }, 3600);
    setTimeout(showMap, 4400);
  }, 680);
}

function showMap() {
  const d = document.getElementById('drop');
  d.style.transition = 'opacity .75s'; d.style.opacity = '0';
  setTimeout(() => {
    d.classList.remove('on');
    document.getElementById('port').classList.add('on');
    initLeafletMap();
    startLiveClock();
    startTicker();
  }, 800);
}

/* ─────────────────────────────────────────────────────────
   ORCHESTRATION ENTRY POINT
   Wires up DOM refs + listeners and kicks off the boot log, exactly
   mirroring what the original app.js did as top-level side effects on
   script load. Called once from main.js.
───────────────────────────────────────────────────────── */
export function initBoot() {
  const blogEl = document.getElementById('blog');
  const bpbar  = document.getElementById('bpbar');
  const bpctEl = document.getElementById('bpct');
  const beltAreaEl = document.getElementById('belt-area');
  const holdFillEl = document.getElementById('hold-fill');

  function nextLine() {
    if (store.bi >= BLINES.length) return;
    const d = document.createElement('div'); d.className = 'ln';
    d.textContent = BLINES[store.bi++]; blogEl.appendChild(d);
    animateBootPct(Math.floor((store.bi / BLINES.length) * 100));
    fireBootSynapse();
    if (store.bi >= BLINES.length) fireBootRadarBurst();
    if (store.bi < BLINES.length) setTimeout(nextLine, 420);
  }

  function animateBootPct(target) {
    const step = () => {
      if (store.bootPct < target) {
        store.bootPct++;
        bpbar.style.width = store.bootPct + '%';
        bpctEl.textContent = store.bootPct + '%';
        if (store.bootPct < target) requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  if (beltAreaEl) {
    beltAreaEl.addEventListener('pointerdown',   e => holdBegin(e, holdFillEl));
    beltAreaEl.addEventListener('pointerup',     () => holdCancel(holdFillEl));
    beltAreaEl.addEventListener('pointerleave',  () => holdCancel(holdFillEl));
    beltAreaEl.addEventListener('pointercancel', () => holdCancel(holdFillEl));
  }

  initAtmosphere();
  setTimeout(nextLine, 600);
  initBootNeural();
}
