/* ═══════════════════════════════════════════════════════════
   CODERUDRA-X COMMAND CENTER · ENGINE v6.0 (ULTIMATE DRILL-DOWN)
   ─────────────────────────────────────────────────────────
   FEATURES:
   1. Boot sequence with progress bar
   2. Belt buckle → parachute drop → camera shake → landing
   3. Main Leaflet map with cinematic background
   4. Canvas overlay: hex grid + animated mission lines
   5. Marker click → targeting reticle → SECTOR TRANSITION
   6. Full-screen sector drill-down on ALL 11 MISSIONS
   7. Sector hotspots → intel decode popup
   8. Dossier modal & Intel modal
   9. Live clock, ticker
═══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────
   MISSION DATA & SECTOR DRILL-DOWN CONFIG
───────────────────────────────────────────────────────── */
const MISSIONS = [
  {
    id: 'citadel', type: 'citadel', lat: 672, lng: 932,
    tag: '// EXECUTIVE COMMAND · SECTOR ZERO',
    title: 'THE CITADEL',
    sc: 'act', sl: 'COMMAND ACTIVE',
    body: `<strong style="color:#f0a500">FUNCTION:</strong> Central Command Hub. All AI defense operations coordinated from here.<br><br>
Tracking <strong style="color:#00ff88">35+ repos</strong>, <strong style="color:#00ff88">1K+ commits</strong>, multiple live deployments.`,
    stats: [{v:'11',l:'OPS'},{v:'5',l:'ACTIVE'},{v:'CMD',l:'TIER'}],
    tags: ['AI Defense','Strategic Command','India','DRDO Vision','iDEX','#build4bharat'],
    sectorImage: 'main.png', // Citadel Interior Image
    sectorZones: [
      { lat: 500, lng: 960, label: 'MAINFRAME CORE', tag:'// SECTOR: ALPHA', body: 'Primary data node processing pan-India deployments.' },
      { lat: 700, lng: 1400, label: 'COMMS RELAY', tag:'// SECTOR: OMEGA', body: 'Encrypted global communication array.' }
    ]
  },
  {
    id: 'indra', type: 'hud', lat: 872, lng: 1708,
    tag: '// MISSION ALPHA · PRIORITY ONE',
    title: 'PROJECT INDRA-AI',
    sc: 'act', sl: 'ACTIVE DEPLOYMENT',
    body: `<strong style="color:#f0a500">OBJECTIVE:</strong> AI-powered transmission line damage detection via drone imagery & computer vision.<br><br>
YOLOv8 pipeline → fault detection → damage classification → risk scoring. Empyrean Robotic Technologies capability assessment.`,
    stats: [{v:'CV',l:'DOMAIN'},{v:'UAV',l:'PLATFORM'},{v:'LIVE',l:'STATUS'}],
    tags: ['YOLOv8','OpenCV','Python','Drone AI','Risk Scoring','Power Grid'],
    sectorImage: 'rightest.png', // Indra Facility Image
    sectorZones: [
      { lat: 700, lng: 400, label: 'DETECTION ENGINE', tag:'// SUBSYSTEM ALPHA', body: 'YOLOv8-based real-time fault detection on drone footage. Detects cracks, corrosion, and breaks at 94% precision.' },
      { lat: 400, lng: 900, label: 'RISK SCORER', tag:'// SUBSYSTEM BETA', body: 'Multi-factor risk scoring engine. Assigns severity levels 1-5. Triggers human-in-loop alerts.' },
      { lat: 600, lng: 600, label: 'DATA PIPELINE', tag:'// SUBSYSTEM GAMMA', body: 'End-to-end pipeline: Drone feed → OpenCV preprocessing → YOLOv8 inference → classification.' },
    ]
  },
  {
    id: 'flowsync', type: 'hud', lat: 954, lng: 1111,
    tag: '// MISSION BRAVO · URBAN OPS',
    title: 'FLOWSYNC-AI',
    sc: 'cmp', sl: 'DEPLOYED · UHACK 4.0',
    body: `<strong style="color:#f0a500">OBJECTIVE:</strong> Real-time AI traffic signal management using YOLOv8 + Multi-Agent PPO RL.<br><br>
Custom-trained on Indian ambulance data. IRC density calculation. Emergency vehicle preemption. Flask dashboard.`,
    stats: [{v:'PPO',l:'RL ALGO'},{v:'87%',l:'mAP'},{v:'PROD',l:'STAGE'}],
    tags: ['YOLOv8n','Multi-Agent PPO','Flask','Indian Traffic','RL','Emergency Override'],
    sectorImage: 'tower.png', // Flowsync Grid Image
    sectorZones: [
      { lat: 700, lng: 500, label: 'SIGNAL CONTROLLER', tag:'// CONTROL NODE', body: 'PPO-trained agent controls 12 intersections simultaneously with real-time density feedback.' },
      { lat: 400, lng: 1000, label: 'VISION MODULE', tag:'// DETECTION NODE', body: 'YOLOv8n trained on 8000+ Indian vehicle images including ambulances and emergency services.' },
    ]
  },
  {
    id: 'avatar', type: 'hud', lat: 249, lng: 533,
    tag: '// MISSION CHARLIE · EDGE OPS',
    title: 'A.V.A.T.A.R',
    sc: 'act', sl: 'R&D · ONGOING',
    body: `<strong style="color:#f0a500">OBJECTIVE:</strong> Real-time 3D kinematic pipeline mapping human biology to a digital rig at 60FPS using Edge-AI and WebAssembly.<br><br>
Zero cloud dependency. Gesture-based drone command foundation. Defense-grade hardware target.`,
    stats: [{v:'60',l:'FPS'},{v:'EDGE',l:'DEPLOY'},{v:'WASM',l:'ENGINE'}],
    tags: ['Edge-AI','WebAssembly','Kinematics','Digital Twin','60FPS','Defense-grade'],
    sectorImage: 'many.png', // Avatar Lab Image
    sectorZones: [
      { lat: 600, lng: 600, label: 'KINEMATIC ENGINE', tag:'// CORE SYSTEM', body: '60FPS skeletal tracking pipeline. Maps 33 human landmarks to 3D rig in real-time.' },
      { lat: 800, lng: 1200, label: 'WASM TRANSLATOR', tag:'// EDGE COMPILER', body: 'Compiling heavy kinematics models to WebAssembly for zero-latency browser execution.' }
    ]
  },
  {
    id: 'vidyutnetra', type: 'hud', lat: 398, lng: 180,
    tag: '// MISSION DELTA · DATA GOVERNANCE',
    title: 'VIDYUTNETRA AI',
    sc: 'cmp', sl: 'OPERATIONAL',
    body: `<strong style="color:#f0a500">OBJECTIVE:</strong> AI-powered data governance engine — metadata extraction, anomaly detection, compliance.<br><br>
Real-time pipeline monitoring. Automated metadata tagging. Data Health Score API.`,
    stats: [{v:'DG',l:'DOMAIN'},{v:'RT',l:'MODE'},{v:'AI',l:'ENGINE'}],
    tags: ['Data Governance','Anomaly Detection','PostgreSQL','FastAPI','ML Pipelines'],
    sectorImage: 'lefti.png', // Vidyutnetra Image
    sectorZones: [
      { lat: 500, lng: 900, label: 'ANOMALY DETECTOR', tag:'// AI ENGINE', body: 'Real-time flagging of data pipeline integrity violations.' },
      { lat: 750, lng: 1400, label: 'HEALTH SCORER', tag:'// API GATEWAY', body: 'Generates real-time compliance metrics for enterprise data streams.' }
    ]
  },
  {
    id: 'maya', type: 'hud', lat: 952, lng: 212,
    tag: '// MISSION ECHO · BEHAVIORAL OPS',
    title: 'MAYA PROTOCOL',
    sc: 'cmp', sl: 'SHIPPED · CROSS-PLATFORM',
    body: `<strong style="color:#f0a500">OBJECTIVE:</strong> Cross-platform gamified simulation visualizing dopamine consequences.<br><br>
High-stakes simulator: wrong decisions permanently crash the system. C++ core.`,
    stats: [{v:'C++',l:'CORE'},{v:'SIM',l:'MODE'},{v:'XP',l:'PLATFORM'}],
    tags: ['C++','Behavioral AI','Gamification','Dopamine Modeling','Simulation'],
    sectorImage: 'kona.png', // Maya Protocol Image
    sectorZones: [
      { lat: 400, lng: 600, label: 'SIMULATION ENGINE', tag:'// C++ CORE', body: 'Real-time dopamine consequence modeling arena.' },
      { lat: 800, lng: 1100, label: 'WILLPOWER METRICS', tag:'// DATA VIS.', body: 'Live tracking of user decision patterns and behavioral decay.' }
    ]
  },
  {
    id: 'vyuha', type: 'amber', lat: 322, lng: 1275,
    tag: '// CLASSIFIED DIRECTIVE · STEALTH MODE',
    title: 'PROJECT VYUHA',
    sc: 'cls', sl: 'CLASSIFIED · STEALTH MODE',
    body: `<strong style="color:#ff3333">⚠ RESTRICTED ACCESS</strong><br><br>
Decentralized AI-driven drone swarm logic. Multi-agent coordination via emergent swarm behavior — Mahabharat Vyuha doctrine.<br><br>
<em style="color:rgba(240,165,0,.7)">C++ · Swarm AI · Locked until public deployment.</em>`,
    stats: [{v:'C++',l:'CORE'},{v:'SWARM',l:'TYPE'},{v:'🔒',l:'ACCESS'}],
    tags: ['C++','Swarm AI','Drone Swarms','Multi-Agent','Decentralized','[CLASSIFIED]'],
    sectorImage: 'mount.png', // Vyuha Swarm Image
    sectorZones: [
      { lat: 540, lng: 960, label: 'SWARM LOGIC CORE', tag:'// NEURAL NET', body: 'Highly restricted decentralized behavior testing arena. Emergent swarm logic active.' }
    ]
  },
  {
    id: 'promptly', type: 'hud', lat: 560, lng: 1660,
    tag: '// STRATEGIC R&D · AI SAFETY',
    title: 'PROMPTLY AI R&D',
    sc: 'act', sl: 'ACTIVE RESEARCH',
    body: `<strong style="color:#f0a500">OBJECTIVE:</strong> Legal liability audits on high-risk AI with 6x cost moat advantage.<br><br>
3-Phase Research Protocol. Real-time intelligence bots. India AI regulatory compliance pipeline.`,
    stats: [{v:'6x',l:'COST MOAT'},{v:'SAFE',l:'DOMAIN'},{v:'R&D',l:'STAGE'}],
    tags: ['AI Safety','Legal Liability','Audit AI','Compliance','India AI Policy'],
    sectorImage: 'image_b1bf78.jpg', // Promptly R&D Image
    sectorZones: [
      { lat: 650, lng: 800, label: 'COMPLIANCE AUDITOR', tag:'// LEGAL AI', body: 'Scanning AI outputs for liability gaps according to upcoming Indian regulatory frameworks.' }
    ]
  },
  {
    id: 'archive', type: 'hud', lat: 320, lng: 680,
    tag: '// INTEL REPOSITORY',
    title: 'DEFENSE AI ARCHIVE',
    sc: 'act', sl: 'CI/CD · DAILY UPDATE',
    body: `<strong style="color:#f0a500">OBJECTIVE:</strong> Automated CI/CD pipeline aggregating daily defense-tech & swarm AI research.<br><br>
Daily pull → synthesize → categorize → archive. Strategic deployment intelligence.`,
    stats: [{v:'DAILY',l:'UPDATE'},{v:'CI/CD',l:'PIPELINE'},{v:'AUTO',l:'MODE'}],
    tags: ['Python','Automation','Defense Research','Swarm AI','CI/CD'],
    sectorImage: 'image_b1bfd1.png', // Archive Image
    sectorZones: [
      { lat: 450, lng: 550, label: 'DATA SYNTHESIZER', tag:'// AUTOMATION', body: 'Scraping and summarizing defense-tech publications globally.' },
      { lat: 750, lng: 1300, label: 'CI/CD REPOSITORY', tag:'// PIPELINE', body: 'Automated push to secure intelligence vaults every 24 hours.' }
    ]
  },
  {
    id: 'fixit', type: 'hud', lat: 150, lng: 900,
    tag: '// CIVIC INTELLIGENCE OPS',
    title: 'FIX-IT-NOW AI',
    sc: 'cmp', sl: 'PUBLIC DEPLOYMENT',
    body: `<strong style="color:#f0a500">OBJECTIVE:</strong> AI-powered municipal grievance system for Indian cities.<br><br>
Intelligent issue routing and categorization. Optimizes government response via AI prioritization.`,
    stats: [{v:'CIVIC',l:'DOMAIN'},{v:'LIVE',l:'STATUS'},{v:'AI',l:'ENGINE'}],
    tags: ['Python','Civic Tech','Public Infrastructure','AI Routing'],
    sectorImage: 'image_07b91a.jpg', // Fixit AI Image
    sectorZones: [
      { lat: 600, lng: 800, label: 'URBAN ROUTER', tag:'// CIVIC AI', body: 'Mapping public grievances directly to municipal action nodes.' }
    ]
  },
  {
    id: 'naad', type: 'hud', lat: 850, lng: 1400,
    tag: '// STREAMING ARCHITECTURE R&D',
    title: 'NAAD PROTOCOL',
    sc: 'act', sl: 'EXPERIMENTAL',
    body: `<strong style="color:#f0a500">OBJECTIVE:</strong> "Streaming Meaning, Not Waveforms" — next-gen semantic data transmission architecture.<br><br>
Advanced JS implementations for audio/data encoding at the semantic layer.`,
    stats: [{v:'JS',l:'CORE'},{v:'DATA',l:'STREAM'},{v:'R&D',l:'STAGE'}],
    tags: ['JavaScript','Data Streaming','Audio Architecture','Semantic Encoding'],
    sectorImage: 'image_07bd1a.jpg', // Naad Protocol Image
    sectorZones: [
      { lat: 500, lng: 1000, label: 'SEMANTIC ENCODER', tag:'// PROTOCOL', body: 'Compressing wave data into raw meaning for ultra-low bandwidth transmission.' }
    ]
  },
];

/* ─────────────────────────────────────────────────────────
   TICKER MESSAGES
───────────────────────────────────────────────────────── */
const TICKER_MSGS = [
  'PROJECT INDRA-AI: TRANSMISSION LINE ANALYSIS ACTIVE · 847 SEGMENTS SCANNED · RISK: NOMINAL',
  'FLOWSYNC-AI: 12 INTERSECTIONS OPTIMIZED · EMERGENCY VEHICLE OVERRIDE: ONLINE',
  'VYUHA: CLASSIFIED DIRECTIVE · STEALTH MODE ACTIVE · NO FURTHER INTEL',
  'DEFENSE AI ARCHIVE: DAILY CI/CD COMPLETE · 47 NEW PAPERS INGESTED',
  'MAYA PROTOCOL: BEHAVIORAL SIMULATION RUNNING · SYSTEM: STABLE',
  'A.V.A.T.A.R: EDGE-AI KINEMATIC PIPELINE · 60FPS TARGET · WASM: NOMINAL',
  'PROMPTLY AI: 6X COST MOAT IDENTIFIED · LIABILITY AUDIT: ACTIVE',
  'THREAT ASSESSMENT: ELEVATED · SWARM PROTOCOL ON STANDBY · CITADEL: SECURE',
  'ALL OPERATIVES CLEAR · HAR HAR MAHADEV · CODERUDRA-X: ACTIVE',
];

/* ═══════════════════════════════════════════════════════
   BOOT SEQUENCE
═══════════════════════════════════════════════════════ */
const BLINES = [
  '> INITIALIZING COMMAND CENTER OS v6.0...',
  '> DECRYPTING MISSION ARCHIVE... 11 OPS FOUND',
  '> AUTH: CLEARANCE LVL-5 GRANTED',
  '> AI SUBSYSTEMS: ALL NOMINAL',
  '> TERRAIN DATABASE: LOADED',
  '> SWARM PROTOCOL: STANDBY',
  '> HAR HAR MAHADEV — OPERATIVE VERIFIED ■',
  '> DROP ZONE LOCKED · AWAITING ORDER...',
];
let bi = 0, bootPct = 0;
const blogEl = document.getElementById('blog');
const bpbar  = document.getElementById('bpbar');
const bpctEl = document.getElementById('bpct');

function nextLine() {
  if (bi >= BLINES.length) return;
  const d = document.createElement('div'); d.className = 'ln';
  d.textContent = BLINES[bi++]; blogEl.appendChild(d);
  animateBootPct(Math.floor((bi / BLINES.length) * 100));
  if (bi < BLINES.length) setTimeout(nextLine, 420);
}
setTimeout(nextLine, 600);

function animateBootPct(target) {
  const step = () => {
    if (bootPct < target) {
      bootPct++;
      bpbar.style.width = bootPct + '%';
      bpctEl.textContent = bootPct + '%';
      if (bootPct < target) requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

// Stars, clouds, speed lines
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
const spdEl = document.getElementById('speed-lines');
for (let i = 0; i < 40; i++) {
  const l = document.createElement('div'); l.className = 'spd';
  const h = 80 + Math.random() * 260;
  l.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*55}%;height:${h}px;animation:sup ${(.5+Math.random()*1.3).toFixed(2)}s ease ${(Math.random()*3.8).toFixed(2)}s both;`;
  spdEl.appendChild(l);
}

/* ═══════════════════════════════════════════════════════
   BELT → DEPLOY → DROP → MAP
═══════════════════════════════════════════════════════ */
document.getElementById('belt-area').addEventListener('click', startDeploy);

function startDeploy() {
  document.getElementById('belt-wrap').classList.add('open');
  setTimeout(() => {
    document.getElementById('boot').classList.add('out');
    document.getElementById('drop').classList.add('on');
    // Altitude counter
    let alt = 8800;
    const ae = document.getElementById('anum');
    const ti = setInterval(() => {
      alt -= Math.floor(Math.random() * 600 + 200);
      if (alt <= 0) { alt = 0; clearInterval(ti); }
      ae.textContent = alt.toLocaleString();
    }, 85);
    // Camera shake + landing flash
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

/* ═══════════════════════════════════════════════════════
   LIVE CLOCK
═══════════════════════════════════════════════════════ */
function startLiveClock() {
  const el = document.getElementById('live-clock');
  setInterval(() => {
    const n = new Date();
    el.textContent = `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')} IST`;
  }, 1000);
}

/* ═══════════════════════════════════════════════════════
   TICKER
═══════════════════════════════════════════════════════ */
function startTicker() {
  const el = document.getElementById('ticker-content');
  const full = (TICKER_MSGS.join('   ◈   ') + '   ◈   ').repeat(2);
  el.textContent = full;
  const chars = full.length;
  const dur = chars * 0.11;
  const style = document.createElement('style');
  style.textContent = `@keyframes ticker-run{from{transform:translateX(100vw)}to{transform:translateX(-${chars*7}px)}}.ticker-content{animation:ticker-run ${dur}s linear infinite!important;}`;
  document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════════
   LEAFLET MAIN MAP (WITH EDGE LOCK)
═══════════════════════════════════════════════════════ */
let leafMap;
let hudCanvas, hudCtx, dashOffset = 0;
let mapReady = false;

function initLeafletMap() {
  const bounds = [[0,0],[1080,1920]];
  leafMap = L.map('map', {
    crs: L.CRS.Simple, attributionControl: false, zoomControl: false,
    zoomSnap: 0.1, zoomDelta: 0.5, maxBoundsViscosity: 1.0, // Hard bounce on edges
  });

  L.imageOverlay('cinematic-map.png', bounds, {opacity:1, interactive:false}).addTo(leafMap);

  // ── THE ZOOM & PAN LOCK FIX ──
  leafMap.fitBounds(bounds);
  leafMap.setMinZoom(leafMap.getZoom()); 
  leafMap.setMaxBounds(bounds);

  leafMap.on('zoomend', () => {
    const el = document.getElementById('zoom-lvl');
    if (el) el.textContent = `ZOOM: ${leafMap.getZoom().toFixed(2)}`;
  });
  
  leafMap.on('mousemove', e => {
    const el = document.getElementById('map-coords');
    if (el) el.innerHTML = `28°36'N 81°52'E<br>PRAYAGRAJ · INDIA<br><span style="opacity:.5">Y:${e.latlng.lat.toFixed(0)} X:${e.latlng.lng.toFixed(0)}</span>`;
  });
  
  leafMap.on('click', e => {
    if (!e.originalEvent.target.closest('#mission-modal') &&
        !e.originalEvent.target.closest('#dossier-modal') &&
        !e.originalEvent.target.closest('#intel-modal')) {
      closeAllModals();
    }
  });

  // HUD canvas
  hudCanvas = document.getElementById('hud-canvas');
  hudCtx    = hudCanvas.getContext('2d');
  resizeHUD();
  
  window.addEventListener('resize', () => {
    resizeHUD();
    // ── KEEP MAP LOCKED ON SCREEN RESIZE ──
    if (leafMap) {
      leafMap.setMinZoom(-5); // Reset temp min-zoom
      leafMap.fitBounds(bounds);
      leafMap.setMinZoom(leafMap.getZoom()); // Re-lock it
    }
  });

  // Add markers with stagger
  MISSIONS.forEach((m, i) => setTimeout(() => addMarker(m), 300 + i * 100));

  // Start canvas loop
  mapReady = true;
  hudLoop();
}

function resizeHUD() {
  if (hudCanvas) { 
    hudCanvas.width = window.innerWidth; 
    hudCanvas.height = window.innerHeight; 
  }
}

/* ─ HUD CANVAS LOOP ─ */
function hudLoop() {
  hudCtx.clearRect(0, 0, hudCanvas.width, hudCanvas.height);
  drawHexGrid();
  drawMissionLines();
  dashOffset -= 0.55;
  requestAnimationFrame(hudLoop);
}

function drawHexGrid() {
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

function drawMissionLines() {
  if (!leafMap) return;
  const cit = MISSIONS.find(m => m.id === 'citadel');
  const cp  = leafMap.latLngToContainerPoint(L.latLng(cit.lat, cit.lng));
  MISSIONS.forEach(m => {
    if (m.id === 'citadel') return;
    const mp = leafMap.latLngToContainerPoint(L.latLng(m.lat, m.lng));
    const amber = m.type === 'amber';
    const [r,g,b] = amber ? [240,165,0] : [0,255,136];
    hudCtx.save();
    hudCtx.beginPath(); hudCtx.moveTo(cp.x, cp.y); hudCtx.lineTo(mp.x, mp.y);
    hudCtx.strokeStyle = `rgba(${r},${g},${b},0.05)`; hudCtx.lineWidth = 7; hudCtx.setLineDash([]); hudCtx.stroke();
    hudCtx.beginPath(); hudCtx.moveTo(cp.x, cp.y); hudCtx.lineTo(mp.x, mp.y);
    hudCtx.strokeStyle = `rgba(${r},${g},${b},${amber?0.25:0.3})`; hudCtx.lineWidth = 1;
    hudCtx.setLineDash([9,6]); hudCtx.lineDashOffset = dashOffset; hudCtx.stroke();
    hudCtx.setLineDash([]);
    hudCtx.beginPath(); hudCtx.arc(mp.x, mp.y, 2.5, 0, Math.PI*2);
    hudCtx.fillStyle = `rgba(${r},${g},${b},0.6)`; hudCtx.fill();
    hudCtx.restore();
  });
  // Citadel dot
  hudCtx.save();
  hudCtx.beginPath(); hudCtx.arc(cp.x, cp.y, 4, 0, Math.PI*2);
  hudCtx.fillStyle = 'rgba(0,255,136,0.8)'; hudCtx.fill();
  hudCtx.beginPath(); hudCtx.arc(cp.x, cp.y, 10, 0, Math.PI*2);
  hudCtx.strokeStyle = 'rgba(0,255,136,0.2)'; hudCtx.lineWidth = 1; hudCtx.stroke();
  hudCtx.restore();
}

/* ─ MARKERS ─ */
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
  const marker = L.marker([mission.lat, mission.lng], { icon }).addTo(leafMap);

  marker.on('click', e => {
    L.DomEvent.stopPropagation(e);
    const pt = leafMap.latLngToContainerPoint([mission.lat, mission.lng]);
    showReticle(pt.x, pt.y, amber, () => openMissionBriefing(mission.id));
  });

  const tipEl = document.getElementById('tip');
  marker.on('mouseover', e => {
    tipEl.textContent = `[ ${mission.title} ] — CLICK FOR MISSION BRIEF`;
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

/* ─ TARGETING RETICLE ─ */
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

/* ═══════════════════════════════════════════════════════
   MISSION BRIEFING MODAL
═══════════════════════════════════════════════════════ */
let activeMissionId = null;

function openMissionBriefing(id) {
  const m = MISSIONS.find(x => x.id === id);
  if (!m) return;
  activeMissionId = id;
  closeAllModals();

  const scClass = {act:'act', cmp:'cmp', cls:'cls'}[m.sc] || 'act';

  const statsHtml = m.stats.map((s, i) => `
    <div class="mm-stat" style="animation:sup .3s ease ${.4+i*.07}s both;opacity:0;">
      <span class="v" data-target="${s.v}">${isNaN(parseInt(s.v)) ? s.v : '0'}</span>
      <span class="l">${s.l}</span>
    </div>`).join('');

  const tagsHtml = m.tags.map((t, i) =>
    `<span class="mm-ttag" style="animation-delay:${.55+i*.06}s">${t}</span>`
  ).join('');

  const hasImage = m.sectorImage;
  const rightHtml = hasImage
    ? `<div class="mm-right-visual" style="padding:0"><img class="mm-sector-preview" src="${m.sectorImage}" alt="sector" onerror="this.parentElement.innerHTML='<div class=mm-vis-label>// ERROR<br>IMAGE NOT FOUND</div>'"/></div>`
    : `<div class="mm-right-visual"><div class="mm-vis-label">// SECTOR IMAGERY<br>${m.sc === 'cls' ? '🔒 CLASSIFIED' : 'NO VISUAL DATA'}</div></div>`;

  // SHOW ENTER SECTOR BUTTON FOR ALL IF THEY HAVE AN IMAGE OR ZONES! (Bypassing the 'cls' block)
  const canEnterSector = hasImage || (m.sectorZones && m.sectorZones.length > 0);

  document.getElementById('mm-tag').textContent    = `// ${m.tag}`;
  document.getElementById('mm-title').textContent  = m.title;
  document.getElementById('mm-status').className   = `mm-status ${scClass}`;
  document.getElementById('mm-status').textContent = m.sl;
  document.getElementById('mm-objective').innerHTML= m.body;
  document.getElementById('mm-stats').innerHTML    = statsHtml;
  document.getElementById('mm-stack').innerHTML    = tagsHtml;
  document.getElementById('mm-right').innerHTML    = rightHtml;

  const deployBtn = document.getElementById('mm-deploy-btn');
  if (canEnterSector) {
    deployBtn.classList.remove('hidden');
    deployBtn.textContent = `▶ ENTER SECTOR — ${m.title}`;
  } else {
    deployBtn.classList.add('hidden');
  }

  const tl = document.querySelector('.mm-title-line');
  if (tl) { tl.style.transform = 'scaleX(0)'; setTimeout(() => tl.style.transform = '', 50); }

  document.getElementById('mission-modal').classList.add('open');
  setTimeout(animateStats, 500);
}

function animateStats() {
  document.querySelectorAll('#mm-stats .mm-stat .v[data-target]').forEach(el => {
    const raw = el.getAttribute('data-target');
    const num = parseInt(raw);
    if (isNaN(num)) { el.textContent = raw; return; }
    const sfx = raw.replace(/[0-9]/g, '');
    let start = 0; const dur = 700, t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now()-t0)/dur, 1);
      const e = 1 - Math.pow(1-p, 3);
      el.textContent = Math.floor(start + (num-start)*e) + sfx;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function closeModal() { document.getElementById('mission-modal').classList.remove('open'); }

/* ═══════════════════════════════════════════════════════
   SECTOR DRILL-DOWN (SUB-MAP ENGINE)
═══════════════════════════════════════════════════════ */
let sectorMap = null;
let sectorCanvas, sectorCtx;
let activeSectorId = null;

function enterSector() {
  const mission = MISSIONS.find(m => m.id === activeMissionId);
  if (!mission) return;
  activeSectorId = activeMissionId;
  closeModal();

  // Transition Animation
  const overlay = document.createElement('div');
  overlay.id = 'sector-transition';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:1500;background:#000;opacity:0;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    font-family:'Orbitron',monospace;transition:opacity .4s;
  `;
  overlay.innerHTML = `
    <div style="font-size:clamp(.7rem,2vw,1.1rem);color:#00ff88;letter-spacing:.4em;
      text-shadow:0 0 20px #00ff88;margin-bottom:12px;animation:blink 1s infinite">
      ◈ ENTERING SECTOR
    </div>
    <div style="font-size:clamp(1rem,3vw,1.8rem);color:#00ff88;font-weight:900;
      letter-spacing:.3em;text-shadow:0 0 30px #00ff88">${mission.title}</div>
    <div style="width:200px;height:1px;background:rgba(0,255,136,.3);margin:16px 0;
      position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent,#00ff88,transparent);
        animation:scanbar 1s infinite"></div>
    </div>
    <div style="font-size:.52rem;color:rgba(0,255,136,.5);letter-spacing:.3em">CLEARANCE VERIFIED</div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => { overlay.style.opacity = '1'; });

  setTimeout(() => {
    const ss = document.getElementById('sector-screen');
    ss.classList.add('on');
    document.getElementById('sector-name').textContent = mission.title;
    document.getElementById('sector-sys').textContent  = `SECTOR: ${mission.id.toUpperCase()}`;

    initSectorMap(mission);

    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 400);
  }, 1200);
}

function initSectorMap(mission) {
  if (sectorMap) { sectorMap.remove(); sectorMap = null; }

  const bounds = [[0,0],[1080,1920]];
  sectorMap = L.map('sector-map', {
    crs: L.CRS.Simple, attributionControl: false, zoomControl: false,
    zoomSnap: 0.1, zoomDelta: 0.5, maxBoundsViscosity: 1.0,
  });

  const imgSrc = mission.sectorImage || 'cinematic-map.png';
  L.imageOverlay(imgSrc, bounds, {opacity:1, interactive:false}).addTo(sectorMap);
  
  // ── SECTOR MAP ZOOM & PAN LOCK ──
  sectorMap.fitBounds(bounds);
  sectorMap.setMinZoom(sectorMap.getZoom());
  sectorMap.setMaxBounds(bounds);

  sectorCanvas = document.getElementById('sector-canvas');
  sectorCtx    = sectorCanvas.getContext('2d');
  sectorCanvas.width  = window.innerWidth;
  sectorCanvas.height = window.innerHeight;

  if (mission.sectorZones && mission.sectorZones.length > 0) {
    mission.sectorZones.forEach((zone, i) => {
      setTimeout(() => addSectorZone(zone), 400 + i * 150);
    });
  }

  sectorMap.on('click', () => closeSectorPopup());
}

function addSectorZone(zone) {
  const html = `<div class="sz-wrap" style="animation:sup .4s ease both">
    <div class="sz-ring sz-r1"></div><div class="sz-ring sz-r2"></div>
    <div class="sz-core"></div>
    <div class="sz-label">${zone.label}</div>
  </div>`;
  const icon = L.divIcon({ className:'', html, iconSize:[44,44], iconAnchor:[22,22] });
  const marker = L.marker([zone.lat, zone.lng], { icon }).addTo(sectorMap);

  marker.on('click', e => {
    L.DomEvent.stopPropagation(e);
    openSectorPopup(zone, e.containerPoint);
  });
}

function openSectorPopup(zone, pt) {
  const popup  = document.getElementById('sector-popup');
  const margin = 20;
  let left = pt.x + margin;
  const popupW = Math.min(360, window.innerWidth * 0.35);
  if (left + popupW > window.innerWidth - margin) left = pt.x - popupW - margin;
  let top = pt.y - 60;
  top = Math.max(70, Math.min(window.innerHeight - 280, top));

  popup.style.left = left + 'px';
  popup.style.top  = top  + 'px';
  popup.style.width = popupW + 'px';

  document.getElementById('sp-tag').textContent   = zone.tag || '// SECTOR INTEL';
  document.getElementById('sp-title').textContent = zone.label;
  document.getElementById('sp-body').innerHTML    = zone.body;

  popup.classList.add('show');
}

function closeSectorPopup() {
  document.getElementById('sector-popup').classList.remove('show');
}

function exitSector() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `position:fixed;inset:0;z-index:1500;background:#000;opacity:0;
    display:flex;align-items:center;justify-content:center;
    font-family:'Orbitron',monospace;transition:opacity .35s;`;
  overlay.innerHTML = `<div style="font-size:clamp(.7rem,2vw,1rem);color:#00ff88;letter-spacing:.4em;
    text-shadow:0 0 20px #00ff88">◄ RETURNING TO BASE...</div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => { overlay.style.opacity = '1'; });

  setTimeout(() => {
    closeSectorPopup();
    if (sectorMap) { sectorMap.remove(); sectorMap = null; }
    document.getElementById('sector-screen').classList.remove('on');
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 350);
  }, 600);
}

/* ═══════════════════════════════════════════════════════
   DOSSIER MODAL
═══════════════════════════════════════════════════════ */
function openDossier() {
  closeAllModals();
  document.getElementById('dossier-modal').classList.add('open');
  document.querySelector('[data-nav="op"]').classList.add('lit');
  document.querySelectorAll('#dossier-modal .skf').forEach(el => {
    el.style.animation = 'none'; el.offsetHeight; el.style.animation = '';
  });
}
function closeDossier() {
  document.getElementById('dossier-modal').classList.remove('open');
  document.querySelector('[data-nav="op"]')?.classList.remove('lit');
}

/* ═══════════════════════════════════════════════════════
   INTEL MODAL
═══════════════════════════════════════════════════════ */
function openIntel() {
  closeAllModals();
  document.getElementById('intel-modal').classList.add('open');
  document.querySelector('[data-nav="in"]').classList.add('lit');
}
function closeIntel() {
  document.getElementById('intel-modal').classList.remove('open');
  document.querySelector('[data-nav="in"]')?.classList.remove('lit');
}

function closeAllModals() {
  closeModal(); closeDossier(); closeIntel();
}

function copyEmailIntel(card) {
  navigator.clipboard.writeText('harshgroups247@gmail.com').then(() => {
    const el = document.getElementById('email-copy-status');
    if (el) { el.textContent = '✓ COPIED TO CLIPBOARD'; el.style.color = '#00ff88'; }
    setTimeout(() => { if(el){el.textContent='Click to copy address';el.style.color='';} }, 2500);
  });
}