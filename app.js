/* ═══════════════════════════════════════════════
   CODERUDRA-X :: EXPANDED TACTICAL MAP ENGINE
   ═══════════════════════════════════════════════ */

const PROJECTS = {
  indra: {
    tag:'MISSION ALPHA · PRIORITY ONE', title:'PROJECT INDRA-AI', status:'active', statusLabel:'ACTIVE DEPLOYMENT',
    body:`<strong style="color:#f0a500">OBJECTIVE:</strong> AI-powered transmission line damage detection using drone imagery & computer vision.<br><br>Assigned by Empyrean Robotic Technologies. Real-time AI vision workflows integrated with backend and monitoring systems using FastAPI and PostgreSQL.`,
    stats:[{v:'CV',l:'DOMAIN'},{v:'UAV',l:'PLATFORM'},{v:'LIVE',l:'STATUS'}], tags:['YOLOv8','OpenCV','Python','FastAPI','PostgreSQL']
  },
  flowsync: {
    tag:'MISSION BRAVO · SMART INFRASTRUCTURE', title:'FLOWSYNC-AI', status:'complete', statusLabel:'DEPLOYED',
    body:`<strong style="color:#f0a500">OBJECTIVE:</strong> Real-time AI traffic signal management utilizing YOLOv8 vision, Multi-Agent PPO RL, and SUMO simulation.<br><br>Features area-based density tracking and emergency vehicle preemption for Indian urban environments.`,
    stats:[{v:'PPO',l:'RL ALGO'},{v:'87%',l:'mAP'},{v:'PROD',l:'STAGE'}], tags:['YOLOv8n','Multi-Agent PPO','Python','SUMO Simulation']
  },
  avatar: {
    tag:'MISSION CHARLIE · EDGE OPS', title:'A.V.A.T.A.R', status:'active', statusLabel:'ONGOING R&D',
    body:`<strong style="color:#f0a500">OBJECTIVE:</strong> Advanced Virtual Augmentation & Tracking Response. Real-time 3D kinematic pipeline mapping human biology to a digital rig at 60FPS.<br><br>Utilizes Edge-AI and WebAssembly. Foundation layer for gesture-based drone command research.`,
    stats:[{v:'EDGE',l:'DEPLOY'},{v:'60',l:'FPS'},{v:'LOW',l:'LATENCY'}], tags:['Edge-AI','JavaScript','WebAssembly','Kinematics']
  },
  sentinel: {
    tag:'MISSION DELTA · DATA GOVERNANCE', title:'VIDYUTNETRA AI', status:'complete', statusLabel:'OPERATIONAL',
    body:`<strong style="color:#f0a500">OBJECTIVE:</strong> Intelligent Data Dictionary Agent. An AI-powered data governance engine that automatically extracts schema metadata, detects PII fields, and computes transparent Data Health Scores via API integration.`,
    stats:[{v:'INFRA',l:'DOMAIN'},{v:'RT',l:'MODE'},{v:'AI',l:'ENGINE'}], tags:['CSS/AI','Data Governance','Gemini API','Anomaly Detection']
  },
  maya: {
    tag:'MISSION ECHO · BEHAVIORAL SIM', title:'MAYA PROTOCOL', status:'active', statusLabel:'SYSTEM LIVE',
    body:`<strong style="color:#f0a500">OBJECTIVE:</strong> Cross-platform gamified simulation application visualizing the real-world consequences of dopamine traps.<br><br>Tracks Health vs. Willpower in real-time. High-stakes consequence simulator where wrong decisions permanently crash the system.`,
    stats:[{v:'BEH',l:'AI TYPE'},{v:'SIM',l:'MODE'},{v:'C++',l:'CORE'}], tags:['Flutter','Dart','C++ (Native)','Behavioral AI']
  },
  vyuha: {
    tag:'CLASSIFIED DIRECTIVE', title:'PROJECT VYUHA', status:'classify', statusLabel:'STEALTH MODE',
    body:`<strong style="color:#ff3333">RESTRICTED ACCESS:</strong> Highly classified. Foundation for decentralized AI-driven drone swarm logic.<br><br>Bridging the gap between deep mathematical engineering and real-world autonomous defense applications.`,
    stats:[{v:'UAV',l:'SWARM'},{v:'MATH',l:'LOGIC'},{v:'⚠',l:'ACCESS'}], tags:['Defense-Tech','Autonomous Systems','C++','Swarm AI']
  },
  promptly: {
    tag:'STRATEGIC R&D', title:'PROMPTLY AI INTELLIGENCE', status:'complete', statusLabel:'AUDIT COMPLETE',
    body:`<strong style="color:#f0a500">OBJECTIVE:</strong> Established a 3-Phase Research Protocol for AI tool evaluation. Conducted Legal Liability Audits on high-risk tools and identified a 6x Cost Moat advantage.<br><br>Built a real-time Price Watch Bot and structured research dossiers on API integrations.`,
    stats:[{v:'R&D',l:'STRATEGY'},{v:'6x',l:'MOAT'},{v:'BOT',l:'LIVE'}], tags:['Market Intelligence','Risk Mitigation','API Audits']
  },
  archive: {
    tag:'INTEL REPOSITORY', title:'DEFENSE AI ARCHIVE', status:'active', statusLabel:'PRIVATE NETWORK',
    body:`<strong style="color:#f0a500">OBJECTIVE:</strong> Automated CI/CD pipeline aggregating daily research papers on Defense-Tech, Drone Swarms, and AI. Peak commit activity center for military-grade conceptual research.`,
    stats:[{v:'CI/CD',l:'PIPELINE'},{v:'DAILY',l:'SYNC'},{v:'SEC',l:'PRIVATE'}], tags:['Python','Automation','Defense Research']
  }
};

/* BOOT SYSTEM TIMERS */
const BOOT_LINES = [
  '> CODERUDRA-X MAINFRAME BOOTING...', '> DECRYPTING VYUHA PROTOCOLS...', '> AI SWARM LOGIC: ONLINE',
  '> TERRAIN DATABASE: SYNCHRONIZED', '> DROP ZONE: COORDINATES LOCKED', '> AWAITING OPERATIVE DEPLOYMENT...'
];
let bootIdx = 0;
const bootLog = document.getElementById('boot-log');

function nextBootLine() {
  if (bootIdx >= BOOT_LINES.length) return;
  const d = document.createElement('div'); d.className = 'line'; d.textContent = BOOT_LINES[bootIdx++];
  bootLog.appendChild(d);
  if (bootIdx < BOOT_LINES.length) setTimeout(nextBootLine, 400);
}
setTimeout(nextBootLine, 500);

/* DROP BACKGROUND GENERATION */
const SF = document.getElementById('starfield');
for (let i = 0; i < 60; i++) {
  const s = document.createElement('div'); s.className = 'star';
  s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${Math.random()*2+1}px;height:${Math.random()*2+1}px;`;
  SF.appendChild(s);
}

/* DEPLOYMENT TRIGGER */
document.getElementById('belt-prompt').addEventListener('click', () => {
  document.getElementById('belt-wrap').classList.add('belt-open');
  setTimeout(() => {
    document.getElementById('boot-screen').classList.add('fade-out');
    document.getElementById('drop-screen').classList.add('active');
    let alt = 8800; const altEl = document.getElementById('alt-num');
    const ti = setInterval(() => {
      alt -= Math.floor(Math.random() * 500 + 200);
      if (alt <= 0) { alt = 0; clearInterval(ti); }
      altEl.textContent = alt.toLocaleString();
    }, 100);
    setTimeout(() => document.getElementById('land-flash').classList.add('fire'), 3400);
    setTimeout(initLeafletMap, 3900);
  }, 650);
});

/* LEAFLET GEOLOCATION ENGINE */
function initLeafletMap() {
  document.getElementById('drop-screen').style.display = 'none';
  document.getElementById('portfolio').classList.add('active');

  const map = L.map('map', { crs: L.CRS.Simple, minZoom: -1, maxZoom: 1, zoomControl: false });
  const bounds = [[0, 0], [1080, 1920]];
  
  // Custom image hook
  L.imageOverlay('cinematic-map.png', bounds).addTo(map);
  map.fitBounds(bounds);

  const radarIcon = L.divIcon({ className: 'custom-icon', html: '<div class="radar-marker"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });
  const alertIcon = L.divIcon({ className: 'custom-icon', html: '<div class="radar-marker" style="background-color:#ff3333; box-shadow:0 0 12px #ff3333;"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });

  // Map markers mapping based on your custom scenic map positions
  // I have added coordinates for the new expanded nodes. Adjust them if they overlap on your specific image.
  const markersData = [
    { coords: [540, 960], action: 'about', label: 'THE CITADEL' },
    { coords: [820, 180], action: 'project', id: 'indra', label: 'INDRA-AI' },
    { coords: [320, 240], action: 'project', id: 'maya', label: 'MAYA PROTOCOL' },
    { coords: [780, 1650], action: 'project', id: 'flowsync', label: 'FLOWSYNC-AI' },
    { coords: [280, 1550], action: 'project', id: 'sentinel', label: 'VIDYUTNETRA AI' },
    { coords: [450, 960], action: 'project', id: 'avatar', label: 'A.V.A.T.A.R' },
    { coords: [850, 1300], action: 'project', id: 'vyuha', label: 'PROJECT VYUHA (STEALTH)', icon: alertIcon },
    { coords: [650, 400], action: 'project', id: 'promptly', label: 'PROMPTLY AI R&D' },
    { coords: [200, 700], action: 'project', id: 'archive', label: 'DEFENSE ARCHIVE' }
  ];

  markersData.forEach(m => {
    const selectedIcon = m.icon ? m.icon : radarIcon;
    const marker = L.marker(m.coords, { icon: selectedIcon }).addTo(map);
    marker.on('click', () => {
      if (m.action === 'project') openSidePanel(m.id);
      else openAbout();
    });
  });
}

/* INTERACTION DRAWERS */
function closeAll() {
  document.getElementById('side-panel').classList.remove('open');
  document.getElementById('about-panel').classList.remove('open');
  document.getElementById('intel-panel').classList.remove('open');
}
function openSidePanel(key) {
  closeAll(); const p = PROJECTS[key]; if (!p) return;
  const sc = { active:'ms-active', complete:'ms-complete', classify:'ms-classify' }[p.status];
  document.getElementById('panel-body').innerHTML = `
    <div class="p-tag">// ${p.tag}</div><div class="p-title">${p.title}</div>
    <span class="m-status ${sc}">${p.statusLabel}</span><div class="p-divider"></div>
    <div class="p-body">${p.body}</div><div class="stat-row">
    ${p.stats.map(s=>`<div class="stat-box"><span class="v">${s.v}</span><span class="l">${s.l}</span></div>`).join('')}
    </div><div class="p-divider"></div><div class="p-tag">// TECH STACK</div>
    <div style="margin-top:8px">${p.tags.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div>`;
  document.getElementById('side-panel').classList.add('open');
}
function openAbout() { closeAll(); document.getElementById('about-panel').classList.add('open'); }
function openIntel() { closeAll(); document.getElementById('intel-panel').classList.add('open'); }
function copyEmail() {
  navigator.clipboard.writeText('harshgroups247@gmail.com').then(() => {
    document.getElementById('email-lbl').textContent = '✓ SECURED';
    setTimeout(()=> document.getElementById('email-lbl').textContent='COPY ADDRESS', 2000);
  });
}