<<<<<<< HEAD
/* ═══════════════════════════════════════════════════════════
   CODERUDRA-X COMMAND CENTER · ENGINE v10.0 (THE MASTERPIECE)
   1. Main Map = 6 HQ Portfolio Sections (Clean & Badass)
   2. Sector Drill-Down = Retained (Goosebumps intro)
   3. Smart Hologram = Emits INSIDE the sub-map on node click
═══════════════════════════════════════════════════════════ */

// Hologram HTML Generator
const buildHoloHUD = (title, tag, h) => `
<div class="hp-header">
  <div>
    <div style="color:var(--amber); font-size:0.5rem; letter-spacing:0.2em;">${tag}</div>
    <div style="color:var(--hud); font-size:1.1rem; font-weight:900; font-family:'Orbitron', monospace; letter-spacing:0.1em; text-shadow:0 0 15px rgba(0,255,136,0.4); text-transform:uppercase;">${title}</div>
  </div>
  <div class="hp-close" onclick="closeHoloPopup()">✕</div>
</div>
<div style="padding:15px;">
  <div style="width:100%; height:140px; border:1px solid rgba(0,255,136,0.3); margin-bottom:15px; position:relative; overflow:hidden; box-shadow: inset 0 0 20px rgba(0,255,136,0.1);">
    <div style="position:absolute; inset:0; background:linear-gradient(0deg, rgba(0,255,136,0.25), transparent); z-index:2; mix-blend-mode: overlay;"></div>
    <img src="${h.img}" onerror="this.src='cinematic-map.png'" alt="SYS_ASSET" style="width:100%; height:100%; object-fit:cover; opacity:0.85; filter:grayscale(20%) contrast(1.2);">
    <div class="scan-line-horizontal"></div>
  </div>
  <div style="border-left: 2px solid #00ff88; padding-left: 10px; margin-bottom: 15px; background: rgba(0,255,136,0.05); padding: 10px; box-shadow: inset 0 0 10px rgba(0,255,136,0.02);">
    <span style="color:#a9b7c6; font-family:'Share Tech Mono', monospace; font-size:0.75rem; line-height: 1.4;">[>] DIRECTIVE: ${h.why}</span>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-family:'Share Tech Mono', monospace; font-size: 0.7rem; margin-bottom:15px;">
    <div style="border: 1px solid rgba(0,255,136,0.2); padding: 10px; background: rgba(5,10,7,0.8);">
      <div style="color:#00ff88; border-bottom: 1px dashed #333; padding-bottom:6px; margin-bottom:8px; letter-spacing:0.1em;">// ARCHITECTURE</div>
      <div style="color:#c0d0c0; line-height:1.5;">${h.arch}</div>
    </div>
    <div style="border: 1px solid rgba(240,165,0,0.2); padding: 10px; background: rgba(10,8,0,0.8);">
      <div style="color:#f0a500; border-bottom: 1px dashed #333; padding-bottom:6px; margin-bottom:8px; letter-spacing:0.1em;">// TELEMETRY</div>
      <div style="color:#e0e0e0; line-height:1.5;">${h.metrics}</div>
    </div>
  </div>
  <div style="display:flex; gap:10px;">
    <a href="${h.git || '#'}" target="_blank" class="holo-btn">[ GITHUB_UPLINK ]</a>
    <a href="${h.live || '#'}" target="_blank" class="holo-btn amber-btn" style="${!h.live ? 'opacity:0.3; pointer-events:none;' : ''}">[ DEPLOYED_NODE ]</a>
  </div>
</div>
`;

/* ─────────────────────────────────────────────────────────
   PORTFOLIO SECTIONS (6 MAIN HQ ISLANDS)
───────────────────────────────────────────────────────── */
const MISSIONS = [
  {
    id: 'citadel', type: 'citadel', lat: 672, lng: 932,
    tag: '// SECTION 01 · IDENTITY NEXUS', title: 'THE CITADEL (ABOUT)', sc: 'act', sl: 'COMMAND ACTIVE',
    body: `<div class="hn-section"><span class="hn-label">[ IDENTITY ]</span> Shreyansh Srivastava. B.Tech CSE (Data Science) @ UIT Prayagraj (Batch '28)[cite: 3]. Operating under the "Tier-3 to CEO" and "One Man Army" ethos[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> Born from "Operation Rebirth" (2019)[cite: 4]. Architecting safety-critical AI vision systems for indigenous defense infrastructure (#build4bharat)[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 840+ DSA Solved | 1700+ CP Rating | 35+ Repos[cite: 3, 4]</div>`,
    stats: [{v:'CS',l:'MAJOR'},{v:'DS',l:'SPEC'},{v:'GSA',l:'ALUMNI'}],
    tags: ['AI Defense','UIT Prayagraj','Data Science','CODERUDRA-X'],
    sectorImage: 'main.png', 
=======
// Engine v6.0 (Terminal + Drill-Down)
// Coderudra-X Command Center

// Mission Data & Drill-Down Config
const MISSIONS = [
  {
    id: 'citadel', type: 'citadel', lat: 672, lng: 932,
    tag: '// EXECUTIVE COMMAND · SECTOR ZERO', title: 'THE CITADEL', sc: 'act', sl: 'COMMAND ACTIVE',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Centralize distributed AI defense infrastructure into a single operative node.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> React and FastAPI aggregating telemetry from 35+ active repositories.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 1K+ Commits | 11 Ops | Zero Downtime</div>`,
    stats: [{v:'11',l:'OPS'},{v:'5',l:'ACTIVE'},{v:'CMD',l:'TIER'}],
    tags: ['AI Defense','Strategic Command','India','DRDO Vision','iDEX','#build4bharat'],
    sectorImage: 'main.png',
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
    sectorZones: [
      { lat: 500, lng: 960, label: 'DATA SCIENCE CORE', tag:'// ACADEMIC NODE', holo: {
        img: 'ds_core.jpg', why: 'Master computational mathematics and foundational CS principles[cite: 3].', arch: 'B.Tech CSE (Data Science) academic core. Independent study in Linear Algebra and AI foundations via MIT OCW[cite: 3].', metrics: '<span style="color:#f0a500">SGPA:</span> 8.3/10<br><span style="color:#f0a500">Rank:</span> Top 100 GfG[cite: 3]', git: 'https://github.com/CODERUDRA-X', live: 'https://linkedin.com/in/shreyansh-srivastava-9a83b9291'
      }},
      { lat: 700, lng: 1400, label: 'ELITE CODERS RELAY', tag:'// LEADERSHIP', holo: {
        img: 'elite.jpg', why: 'Scale developer ecosystems and deploy robust credentialing across India[cite: 4].', arch: 'Engineered automated credentialing (TruScholar) and event operations using n8n for massive developer clusters[cite: 4].', metrics: '<span style="color:#f0a500">Impact:</span> 5000+ Devs<br><span style="color:#f0a500">Role:</span> Pan-India Ops Head[cite: 3, 4]', git: '', live: 'https://www.geeksforgeeks.org/profile/saitejareddy05'
      }}
    ]
  },
  
  {
<<<<<<< HEAD
    id: 'deployments', type: 'hud', lat: 872, lng: 1708,
    tag: '// SECTION 02 · CORE ENGINEERING', title: 'TACTICAL DEPLOYMENTS', sc: 'cmp', sl: 'SYSTEMS ONLINE',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> A showcase of production-ready inference pipelines and autonomous systems[cite: 3].</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Bypassing cloud-dependency in favor of robust edge-computing, strict risk thresholds, and human-in-the-loop oversight[cite: 3, 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 4 Major Ops | Edge-Focus | Production State</div>`,
    stats: [{v:'4',l:'MAJOR OPS'},{v:'EDGE',l:'FOCUS'},{v:'PROD',l:'STATE'}],
    tags: ['Computer Vision','Multi-Agent RL','Data Governance','FastAPI'],
=======
    id: 'indra', type: 'hud', lat: 872, lng: 1708,
    tag: '// MISSION ALPHA · PRIORITY ONE', title: 'PROJECT INDRA-AI', sc: 'act', sl: 'ACTIVE DEPLOYMENT',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Automate fatal manual inspections of high-voltage transmission lines.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> YOLOv8 fault detection on drone imagery, integrated with a multi-factor risk scoring pipeline.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 94% Precision | 5 Severity Levels | Real-time Edge Processing</div>`,
    stats: [{v:'CV',l:'DOMAIN'},{v:'UAV',l:'PLATFORM'},{v:'LIVE',l:'STATUS'}],
    tags: ['YOLOv8','OpenCV','Python','Drone AI','Risk Scoring','Power Grid'],
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
    sectorImage: 'rightest.png',
    sectorZones: [
      { lat: 700, lng: 400, label: 'PROJECT INDRA-AI', tag:'// UAV VISION', holo: {
        img: 'indra.jpg', why: 'Automate fatal manual inspections of transmission lines for predictive grid maintenance[cite: 3].', arch: 'YOLOv8 pipeline → fault detection → damage classification. Real-time edge inference on drone footage[cite: 3].', metrics: '<span style="color:#f0a500">Precision:</span> 94% mAP<br><span style="color:#f0a500">Risk Matrix:</span> 5 Levels[cite: 3]', git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 400, lng: 1000, label: 'FLOWSYNC-AI', tag:'// URBAN TRAFFIC', holo: {
        img: 'flowsync.jpg', why: 'Eradicate emergency vehicle delays caused by static timers[cite: 3].', arch: 'Multi-Agent PPO Reinforcement Learning paired with YOLOv8n object detection for area-based density calculation[cite: 3, 4].', metrics: '<span style="color:#f0a500">Wait Reduction:</span> Proven<br><span style="color:#f0a500">Override:</span> 100% Success[cite: 3]', git: 'https://github.com/CODERUDRA-X/CODERUDRAX-FlowSync-AI', live: ''
      }},
      { lat: 600, lng: 1300, label: 'DATASENTINEL AI', tag:'// DATA GOVERNANCE', holo: {
        img: 'datasentinel.jpg', why: 'Prevent silent schema failures and compliance risks in enterprise databases[cite: 4].', arch: 'FastAPI & PostgreSQL extraction integrated with Google Gemini API for PII detection and semantic duplicate flagging[cite: 4].', metrics: '<span style="color:#f0a500">Health Score:</span> Custom Algo<br><span style="color:#f0a500">Latency:</span> Sub-second[cite: 3, 4]', git: 'https://github.com/CODERUDRA-X/intelligent-data-dictionary-agent', live: 'https://www.commudle.com/builds/datasentinal-ai-an-intelligent-data-dictionary-agent'
      }},
      { lat: 800, lng: 900, label: 'FIX-IT-NOW AI', tag:'// CIVIC OPS', holo: {
        img: 'fixit.jpg', why: 'Manual civic grievance routing causes critical public infrastructure response delays[cite: 3].', arch: 'AI-driven classification engine parsing natural language to route city infrastructure complaints instantly[cite: 3].', metrics: '<span style="color:#f0a500">Load:</span> High-Volume<br><span style="color:#f0a500">Routing:</span> Real-Time', git: 'https://github.com/CODERUDRA-X/fix-it-now-ai', live: ''
      }}
    ]
  },

  {
<<<<<<< HEAD
    id: 'service', type: 'hud', lat: 954, lng: 1111,
    tag: '// SECTION 03 · PROFESSIONAL TENURE', title: 'SERVICE RECORD', sc: 'act', sl: 'ACTIVE DUTY',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> Enterprise alliances established across leading organizations and strategic tech startups[cite: 3].</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Professional deployments integrating AI safety audits, scalable backend infrastructure, and national-level logistics automation[cite: 3, 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 3 Major Alliances | 6x Cost Moat | 70% Process Optimization[cite: 3, 4]</div>`,
    stats: [{v:'3',l:'ALLIANCES'},{v:'6x',l:'COST MOAT'},{v:'70%',l:'OPT'}],
    tags: ['Enterprise Audits','Backend Integrations','Automation','AI Safety'],
=======
    id: 'flowsync', type: 'hud', lat: 954, lng: 1111,
    tag: '// MISSION BRAVO · URBAN OPS', title: 'FLOWSYNC-AI', sc: 'cmp', sl: 'DEPLOYED · UHACK 4.0',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Eradicate emergency vehicle delays caused by static urban traffic timers.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Multi-Agent PPO RL paired with YOLOv8n object detection for adaptive, density-based signal control.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 34% Wait-Time Reduction | 12 Nodes Synced | 100% Ambulance Override Success</div>`,
    stats: [{v:'PPO',l:'RL ALGO'},{v:'87%',l:'mAP'},{v:'PROD',l:'STAGE'}],
    tags: ['YOLOv8n','Multi-Agent PPO','Flask','Indian Traffic','RL','Emergency Override'],
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
    sectorImage: 'tower.png',
    sectorZones: [
      { lat: 600, lng: 500, label: 'PROMPTLY AI PVT LTD', tag:'// AI RESEARCH INTERN', holo: {
        img: 'promptly.jpg', why: 'Evaluate B2B AI tools and mitigate enterprise legal liability[cite: 3].', arch: 'Designed a 3-phase LLM-assisted audit system. Built Python NLP pipelines tracking ₹8 Crore+ ecosystem investments[cite: 3, 4].', metrics: '<span style="color:#f0a500">Throughput:</span> 3x Faster<br><span style="color:#f0a500">Cost Moat:</span> 6x Identified[cite: 3]', git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 400, lng: 1100, label: 'EMPYREAN ROBOTICS', tag:'// SDE AI/ML INTERN', holo: {
        img: 'empyrean.jpg', why: 'Develop real-world computer vision monitoring infrastructure[cite: 3, 4].', arch: 'Built scalable inference pipelines leveraging Python, FastAPI, and PostgreSQL for backend workflows[cite: 3, 4].', metrics: '<span style="color:#f0a500">Focus:</span> Reliability<br><span style="color:#f0a500">State:</span> Active Deployment[cite: 3]', git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 800, lng: 900, label: 'GOOGLE GSA', tag:'// PAN-INDIA OPS HEAD', holo: {
        img: 'google.jpg', why: 'Automate manual coordination for 110+ campus leads globally[cite: 3, 4].', arch: 'Engineered deep webhook automations via n8n and Python scripts to run community analytics dashboards[cite: 3, 4].', metrics: '<span style="color:#f0a500">Manual Work:</span> -70%<br><span style="color:#f0a500">Scale:</span> National[cite: 3]', git: 'https://github.com/CODERUDRA-X', live: ''
      }}
    ]
  },

  {
<<<<<<< HEAD
    id: 'armory', type: 'hud', lat: 249, lng: 533,
    tag: '// SECTION 04 · CAPABILITY MATRIX', title: 'THE ARMORY (SKILLS)', sc: 'act', sl: 'WEAPONS HOT',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> A deliberately selected technology stack to build high-reliability systems[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Bridging the fatal gap between theoretical machine learning research and production-grade, low-latency software engineering[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Edge Focus | C++ Native | Mathematics Base</div>`,
    stats: [{v:'AI',l:'CORE'},{v:'EDGE',l:'FOCUS'},{v:'MATH',l:'BASE'}],
    tags: ['Python','C++','PyTorch','WebAssembly','Docker','PostgreSQL'],
=======
    id: 'avatar', type: 'hud', lat: 249, lng: 533,
    tag: '// MISSION CHARLIE · EDGE OPS', title: 'A.V.A.T.A.R', sc: 'act', sl: 'R&D · ONGOING',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Enable zero-latency gesture command systems without cloud dependency.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> 3D kinematic pipeline mapping 33 landmarks, compiled via WebAssembly for edge hardware execution.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Solid 60FPS | Zero Cloud Ping | Local Browser Execution</div>`,
    stats: [{v:'60',l:'FPS'},{v:'EDGE',l:'DEPLOY'},{v:'WASM',l:'ENGINE'}],
    tags: ['Edge-AI','WebAssembly','Kinematics','Digital Twin','60FPS','Defense-grade'],
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
    sectorImage: 'many.png',
    sectorZones: [
      { lat: 500, lng: 600, label: 'CORE & MATHEMATICS', tag:'// THE BRAIN', holo: {
        img: 'math.jpg', why: 'Provide robust logic and low-level memory management[cite: 4].', arch: 'C++ for deep DSA and native integrations. Python for ML ecosystems. SQL for data structuring[cite: 3, 4].', metrics: '<span style="color:#f0a500">Algorithms:</span> 840+ Solved<br><span style="color:#f0a500">Math:</span> Linear Algebra[cite: 3, 4]', git: '', live: ''
      }},
      { lat: 700, lng: 1200, label: 'AI & PERCEPTION', tag:'// THE EYES', holo: {
        img: 'vision.jpg', why: 'Enable high-fidelity spatial and contextual awareness[cite: 4].', arch: 'YOLOv8/v11 for object detection. Multi-Agent PPO for Reinforcement Learning. NLP/LLMs for semantic parsing[cite: 3, 4].', metrics: '<span style="color:#f0a500">Focus:</span> Low-latency<br><span style="color:#f0a500">Frameworks:</span> PyTorch, OpenCV[cite: 3]', git: '', live: ''
      }},
      { lat: 400, lng: 1400, label: 'EDGE INFRASTRUCTURE', tag:'// THE SPINE', holo: {
        img: 'infra.jpg', why: 'Ensure zero-downtime, cloud-independent execution[cite: 4].', arch: 'WebAssembly for browser edge AI. Docker for containerization. FastAPI & PostgreSQL for backend routing[cite: 3, 4].', metrics: '<span style="color:#f0a500">Export:</span> ONNX, TFLite<br><span style="color:#f0a500">OS:</span> Linux/Bash[cite: 3]', git: '', live: ''
      }}
    ]
  },

  {
<<<<<<< HEAD
    id: 'blacksite', type: 'amber', lat: 322, lng: 1275,
    tag: '// SECTION 05 · CLASSIFIED R&D', title: 'BLACK SITE (LABS)', sc: 'cls', sl: 'STEALTH MODE',
    body: `<div class="hn-section"><span class="hn-label">[ ⚠ RESTRICTED ACCESS ]</span> The underground laboratory for highly experimental architectures[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Focus areas include decentralized drone swarm coordination, 60FPS edge kinematics, and permanent-consequence behavioral modeling[cite: 3, 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Zero Cloud Ping | Stealth Mode | Experimental Engine</div>`,
    stats: [{v:'C++',l:'SWARMS'},{v:'WASM',l:'EDGE'},{v:'🔒',l:'CLASSIFIED'}],
    tags: ['Swarm AI','Kinematics','Behavioral Sim','Decentralized'],
    sectorImage: 'mount.png',
=======
    id: 'vidyutnetra', type: 'hud', lat: 398, lng: 180,
    tag: '// MISSION DELTA · DATA GOVERNANCE', title: 'VIDYUTNETRA AI', sc: 'cmp', sl: 'OPERATIONAL',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Unmonitored data pipelines lead to silent schema failures and compliance breaches.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Automated metadata tagging and anomaly detection via PostgreSQL and FastAPI integration.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Sub-second Flagging | 100% Pipeline Visibility | Real-time Data Health APIs</div>`,
    stats: [{v:'DG',l:'DOMAIN'},{v:'RT',l:'MODE'},{v:'AI',l:'ENGINE'}],
    tags: ['Data Governance','Anomaly Detection','PostgreSQL','FastAPI','ML Pipelines'],
    sectorImage: 'lefti.png',
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
    sectorZones: [
      { lat: 400, lng: 600, label: 'PROJECT VYUHA', tag:'// CLASSIFIED SWARM', holo: {
        img: 'vyuha.jpg', why: 'Eliminate Single Point of Failure (SPOF) in drone swarms[cite: 4].', arch: 'Decentralized multi-agent coordination built in C++. Nodes use emergent logic inspired by Mahabharat Vyuha military formations[cite: 4].', metrics: '<span style="color:#f0a500">Status:</span> Stealth Mode<br><span style="color:#f0a500">Comms:</span> O(log N) Overhead[cite: 4]', git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 700, lng: 1100, label: 'A.V.A.T.A.R', tag:'// 60FPS KINEMATICS', holo: {
        img: 'avatar.jpg', why: 'Real-time spatial mapping without cloud ping[cite: 4].', arch: 'Python-to-WebAssembly compiler running MediaPipe. Uses LERP-based smoothing and 3D Euclidean Z-axis correction[cite: 3, 4].', metrics: '<span style="color:#f0a500">Latency:</span> Zero Cloud Ping<br><span style="color:#f0a500">Target:</span> Defense-grade[cite: 3]', git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 600, lng: 1500, label: 'MAYA PROTOCOL', tag:'// BEHAVIORAL SIM', holo: {
        img: 'maya.jpg', why: 'Model physiological consequences of dopamine choices[cite: 3, 4].', arch: 'C++ native engine executing permadeath mechanics based on System Integrity vs. Willpower trade-offs[cite: 3, 4].', metrics: '<span style="color:#f0a500">State:</span> Shipped<br><span style="color:#f0a500">Platform:</span> Cross-platform[cite: 3]', git: 'https://github.com/CODERUDRA-X/maya_protocol', live: ''
      }},
      { lat: 800, lng: 400, label: 'NAAD PROTOCOL', tag:'// DATA STREAMING', holo: {
        img: 'naad.jpg', why: 'Traditional waveform streaming wastes network bandwidth[cite: 4].', arch: '"Streaming Meaning, Not Waveforms" utilizing advanced semantic JS encoding for extreme compression[cite: 4].', metrics: '<span style="color:#f0a500">Audio Rep:</span> Sub-kbps<br><span style="color:#f0a500">Engine:</span> Experimental[cite: 4]', git: 'https://github.com/CODERUDRA-X/naad', live: ''
      }}
    ]
  },

  {
<<<<<<< HEAD
    id: 'vault', type: 'hud', lat: 320, lng: 680,
    tag: '// SECTION 06 · COMMS & ARCHIVE', title: 'INTEL VAULT', sc: 'act', sl: 'TRANSMITTING',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> UPLINK ESTABLISHED. Central repository for open-source codebase contributions[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Daily CI/CD intelligence pipelines and secure communication channels for strategic alliances[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 35+ Repos | 1K+ Annual Commits | Live Uplink[cite: 4]</div>`,
    stats: [{v:'35+',l:'REPOS'},{v:'1K+',l:'COMMITS'},{v:'LIVE',l:'UPLINK'}],
    tags: ['GitHub','CI/CD','Intelligence','Open Source'],
    sectorImage: 'lefti.png',
=======
    id: 'maya', type: 'hud', lat: 952, lng: 212,
    tag: '// MISSION ECHO · BEHAVIORAL OPS', title: 'MAYA PROTOCOL', sc: 'cmp', sl: 'SHIPPED · CROSS-PLATFORM',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Modern gamification lacks severe, permanent consequences for behavioral study.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Cross-platform C++ engine enforcing strict dopamine limits where wrong decisions permanently crash the simulated ecosystem.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> High-stakes Processing | Permanent Permadeath States</div>`,
    stats: [{v:'C++',l:'CORE'},{v:'SIM',l:'MODE'},{v:'XP',l:'PLATFORM'}],
    tags: ['C++','Behavioral AI','Gamification','Dopamine Modeling','Simulation'],
    sectorImage: 'kona.png',
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
    sectorZones: [
      { lat: 400, lng: 800, label: 'DEFENSE AI ARCHIVE', tag:'// AUTOMATION', holo: {
        img: 'archive.jpg', why: 'Aggregate global defense-tech and swarm publications[cite: 4].', arch: 'Python-driven CI/CD pipeline that scrapes, synthesizes, and securely catalogs petabyte-scale data natively[cite: 4].', metrics: '<span style="color:#f0a500">Sync:</span> 24hr Automated<br><span style="color:#f0a500">Mode:</span> Hands-free[cite: 4]', git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 700, lng: 1200, label: 'GCB-HUB DEPLOYMENT', tag:'// WEB PIPELINE', holo: {
        img: 'gcb.jpg', why: 'Deploy petabyte-scale genetic models (BLISS) for global access[cite: 4].', arch: 'Engineered the frontend data pipeline to transform dense statistical pQTL data into an intuitive platform[cite: 4].', metrics: '<span style="color:#f0a500">Scale:</span> Petabyte Ready<br><span style="color:#f0a500">Scope:</span> 5,779+ Models[cite: 4]', git: 'https://github.com/gcb-hub/BLISS', live: 'https://www.gcbhub.org/'
      }}
    ]
<<<<<<< HEAD
  }
=======
  },
  {
    id: 'vyuha', type: 'amber', lat: 322, lng: 1275,
    tag: '// CLASSIFIED DIRECTIVE · STEALTH MODE', title: 'PROJECT VYUHA', sc: 'cls', sl: 'CLASSIFIED · STEALTH MODE',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Centralized drone swarms present a fatal Single Point of Failure (SPOF) in tactical zones.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Decentralized multi-agent swarm logic in C++, inspired by emergent Mahabharat Vyuha military formations.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Zero SPOF | O(log N) Comms | Emergent Swarm Intelligence</div>`,
    stats: [{v:'C++',l:'CORE'},{v:'SWARM',l:'TYPE'},{v:'🔒',l:'ACCESS'}],
    tags: ['C++','Swarm AI','Drone Swarms','Multi-Agent','Decentralized','[CLASSIFIED]'],
    sectorImage: 'mount.png',
    sectorZones: [
      { lat: 540, lng: 960, label: 'SWARM LOGIC CORE', tag:'// NEURAL NET', body: 'Highly restricted decentralized behavior testing arena. Emergent swarm logic active.' }
    ]
  },
  {
    id: 'promptly', type: 'hud', lat: 560, lng: 1660,
    tag: '// STRATEGIC R&D · AI SAFETY', title: 'PROMPTLY AI R&D', sc: 'act', sl: 'ACTIVE RESEARCH',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Rapid LLM deployments ignore Indian regulatory compliance and legal liabilities.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Developed automated intelligence bots and a 3-Phase audit protocol to track AI deployment risks.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Identified 6x Cost Moat | Multi-phase Liability Tracking</div>`,
    stats: [{v:'6x',l:'COST MOAT'},{v:'SAFE',l:'DOMAIN'},{v:'R&D',l:'STAGE'}],
    tags: ['AI Safety','Legal Liability','Audit AI','Compliance','India AI Policy'],
    sectorImage: 'image_b1bf78.jpg',
    sectorZones: [
      { lat: 650, lng: 800, label: 'COMPLIANCE AUDITOR', tag:'// LEGAL AI', body: 'Scanning AI outputs for liability gaps according to upcoming Indian regulatory frameworks.' }
    ]
  },
  {
    id: 'archive', type: 'hud', lat: 320, lng: 680,
    tag: '// INTEL REPOSITORY', title: 'DEFENSE AI ARCHIVE', sc: 'act', sl: 'CI/CD · DAILY UPDATE',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Defense-tech and swarm research is fragmented across unorganized global publications.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Python-driven CI/CD pipeline that scrapes, synthesizes, and catalogs daily AI defense repos.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 24hr Auto-Sync | 100% Hands-free Archiving</div>`,
    stats: [{v:'DAILY',l:'UPDATE'},{v:'CI/CD',l:'PIPELINE'},{v:'AUTO',l:'MODE'}],
    tags: ['Python','Automation','Defense Research','Swarm AI','CI/CD'],
    sectorImage: 'image_b1bfd1.png',
    sectorZones: [
      { lat: 450, lng: 550, label: 'DATA SYNTHESIZER', tag:'// AUTOMATION', body: 'Scraping and summarizing defense-tech publications globally.' },
      { lat: 750, lng: 1300, label: 'CI/CD REPOSITORY', tag:'// PIPELINE', body: 'Automated push to secure intelligence vaults every 24 hours.' }
    ]
  },
  {
    id: 'fixit', type: 'hud', lat: 150, lng: 900,
    tag: '// CIVIC INTELLIGENCE OPS', title: 'FIX-IT-NOW AI', sc: 'cmp', sl: 'PUBLIC DEPLOYMENT',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Manual civic grievance routing causes critical infrastructure response delays.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> AI-driven classification engine parsing natural language to route city infrastructure complaints instantly.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> High-Volume Categorization | Real-Time Routing</div>`,
    stats: [{v:'CIVIC',l:'DOMAIN'},{v:'LIVE',l:'STATUS'},{v:'AI',l:'ENGINE'}],
    tags: ['Python','Civic Tech','Public Infrastructure','AI Routing'],
    sectorImage: 'image_07b91a.jpg',
    sectorZones: [
      { lat: 600, lng: 800, label: 'URBAN ROUTER', tag:'// CIVIC AI', body: 'Mapping public grievances directly to municipal action nodes.' }
    ]
  },
  {
    id: 'naad', type: 'hud', lat: 850, lng: 1400,
    tag: '// STREAMING ARCHITECTURE R&D', title: 'NAAD PROTOCOL', sc: 'act', sl: 'EXPERIMENTAL',
    body: `<div class="hn-section"><span class="hn-label">[ THE WHY ]</span> Traditional waveform streaming wastes bandwidth by transmitting redundant sonic data.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> "Streaming Meaning, Not Waveforms" utilizing advanced semantic JS encoding for extreme compression.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Sub-kbps Audio Representation | Experimental Engine</div>`,
    stats: [{v:'JS',l:'CORE'},{v:'DATA',l:'STREAM'},{v:'R&D',l:'STAGE'}],
    tags: ['JavaScript','Data Streaming','Audio Architecture','Semantic Encoding'],
    sectorImage: 'image_07bd1a.jpg',
    sectorZones: [
      { lat: 500, lng: 1000, label: 'SEMANTIC ENCODER', tag:'// PROTOCOL', body: 'Compressing wave data into raw meaning for ultra-low bandwidth transmission.' }
    ]
  },
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
];

// Ticker Tape Data
const TICKER_MSGS = [
  'OPERATION REBIRTH: ACTIVE · TIER-3 TO CEO MINDSET ENGAGED',
  'PROJECT INDRA-AI: 94% CV PRECISION ON TRANSMISSION FAULTS',
  'FLOWSYNC-AI: 12 INTERSECTIONS OPTIMIZED · WAIT-TIME REDUCTION ACHIEVED',
  'VYUHA: CLASSIFIED DIRECTIVE · DECENTRALIZED SWARM LOGIC ACTIVE',
  'DEFENSE AI ARCHIVE: DAILY CI/CD COMPLETE · DATA PIPELINES NOMINAL',
  'A.V.A.T.A.R: EDGE-AI KINEMATIC PIPELINE · 60FPS TARGET · WASM: NOMINAL',
  'PROMPTLY AI: 3X THROUGHPUT OPTIMIZED · LIABILITY AUDIT: ACTIVE',
  'THREAT ASSESSMENT: ELEVATED · SWARM PROTOCOL ON STANDBY · CITADEL: SECURE',
  'ALL OPERATIVES CLEAR · HAR HAR MAHADEV · CODERUDRA-X: ACTIVE',
];

// Boot Sequence
const BLINES = [
  '> INITIALIZING COMMAND CENTER OS v10.0...',
  '> OPERATION REBIRTH: VERIFIED',
  '> DECRYPTING 6 MAIN PORTFOLIO SECTORS...',
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

<<<<<<< HEAD
// Background Starfield & Speed Particles
=======
// Background Starfield & Particles
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
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

<<<<<<< HEAD
// Map Deployment Initialization
=======
// Deployment Flow
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
document.getElementById('belt-area').addEventListener('click', startDeploy);

function startDeploy() {
  document.getElementById('belt-wrap').classList.add('open');
  setTimeout(() => {
    document.getElementById('boot').classList.add('out');
    document.getElementById('drop').classList.add('on');
    let alt = 8800;
    const ae = document.getElementById('anum');
    const ti = setInterval(() => {
      alt -= Math.floor(Math.random() * 600 + 200);
      if (alt <= 0) { alt = 0; clearInterval(ti); }
      ae.textContent = alt.toLocaleString();
    }, 85);
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

<<<<<<< HEAD
// Clock and Ticker Utilities
=======
// Global UI Tools
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
function startLiveClock() {
  const el = document.getElementById('live-clock');
  setInterval(() => {
    const n = new Date();
    el.textContent = `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')} IST`;
  }, 1000);
}

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

<<<<<<< HEAD
// Leaflet Engine & Boundary Lock
=======
// Leaflet Edge-Locked Main Map
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
let leafMap;
let hudCanvas, hudCtx, dashOffset = 0;
let mapReady = false;

function initLeafletMap() {
  const bounds = [[0,0],[1080,1920]];
  leafMap = L.map('map', {
    crs: L.CRS.Simple, attributionControl: false, zoomControl: false,
    zoomSnap: 0.1, zoomDelta: 0.5, maxBoundsViscosity: 1.0, 
  });

  L.imageOverlay('cinematic-map.png', bounds, {opacity:1, interactive:false}).addTo(leafMap);

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
        !e.originalEvent.target.closest('#intel-modal') &&
        !e.originalEvent.target.closest('#terminal-modal')) {
      closeAllModals();
    }
  });

  hudCanvas = document.getElementById('hud-canvas');
  hudCtx    = hudCanvas.getContext('2d');
  resizeHUD();
  
  window.addEventListener('resize', () => {
    resizeHUD();
    if (leafMap) {
      leafMap.setMinZoom(-5);
      leafMap.fitBounds(bounds);
      leafMap.setMinZoom(leafMap.getZoom());
    }
  });

  MISSIONS.forEach((m, i) => setTimeout(() => addMarker(m), 300 + i * 100));

  mapReady = true;
  hudLoop();
}

function resizeHUD() {
  if (hudCanvas) { 
    hudCanvas.width = window.innerWidth; 
    hudCanvas.height = window.innerHeight; 
  }
}

<<<<<<< HEAD
// Canvas HUD Overlay Loop
=======
// Canvas Rendering
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
function hudLoop() {
  if (!hudCtx || !mapReady) return requestAnimationFrame(hudLoop);
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

// Tactical Marker Paths 
function drawMissionLines() {
  if (!leafMap) return;
  const cit = MISSIONS.find(m => m.id === 'citadel');
  if(!cit) return;
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
  hudCtx.save();
  hudCtx.beginPath(); hudCtx.arc(cp.x, cp.y, 4, 0, Math.PI*2);
  hudCtx.fillStyle = 'rgba(0,255,136,0.8)'; hudCtx.fill();
  hudCtx.beginPath(); hudCtx.arc(cp.x, cp.y, 10, 0, Math.PI*2);
  hudCtx.strokeStyle = 'rgba(0,255,136,0.2)'; hudCtx.lineWidth = 1; hudCtx.stroke();
  hudCtx.restore();
}

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
    tipEl.textContent = `[ ${mission.title} ] — CLICK TO OPEN DOSSIER`;
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

<<<<<<< HEAD
// ─────────────────────────────────────────────────────────
// MODAL HUD CONTROLLERS (MISSION BRIEFING)
// ─────────────────────────────────────────────────────────
=======
// Modal System Operations
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
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
    deployBtn.textContent = `▶ ENTER SECTOR — DEEP DIVE`;
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

<<<<<<< HEAD
// ─────────────────────────────────────────────────────────
// SUB-MAP SYSTEM (SECTOR DRILL-DOWN ENGINE)
// ─────────────────────────────────────────────────────────
=======
// Sub-Map System (Drill-Down)
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
let sectorMap = null;
let sectorCanvas, sectorCtx;
let activeSectorId = null;

function enterSector() {
  const mission = MISSIONS.find(m => m.id === activeMissionId);
  if (!mission) return;
  activeSectorId = activeMissionId;
  closeModal();

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
      ◈ ACCESSING SYSTEM CORE
    </div>
    <div style="font-size:clamp(1rem,3vw,1.8rem);color:#00ff88;font-weight:900;
      letter-spacing:.3em;text-shadow:0 0 30px #00ff88">${mission.title}</div>
    <div style="width:200px;height:1px;background:rgba(0,255,136,.3);margin:16px 0;
      position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent,#00ff88,transparent);
        animation:scanbar 1s infinite"></div>
    </div>
    <div style="font-size:.52rem;color:rgba(0,255,136,.5);letter-spacing:.3em">CLEARANCE LEVEL 5 VERIFIED</div>
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

  sectorMap.on('click', () => closeHoloPopup()); // Close hologram if background clicked
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
    // GET POINT FROM THE SECTOR MAP (NOT MAIN LEAFMAP)
    const pt = sectorMap.latLngToContainerPoint([zone.lat, zone.lng]);
    openHoloPopup(zone, pt);
  });
}

function exitSector() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `position:fixed;inset:0;z-index:1500;background:#000;opacity:0;
    display:flex;align-items:center;justify-content:center;
    font-family:'Orbitron',monospace;transition:opacity .35s;`;
  overlay.innerHTML = `<div style="font-size:clamp(.7rem,2vw,1rem);color:#00ff88;letter-spacing:.4em;
    text-shadow:0 0 20px #00ff88">◄ RETURNING TO GLOBAL RADAR...</div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => { overlay.style.opacity = '1'; });

  setTimeout(() => {
    closeHoloPopup();
    if (sectorMap) { sectorMap.remove(); sectorMap = null; }
    document.getElementById('sector-screen').classList.remove('on');
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 350);
  }, 600);
}

<<<<<<< HEAD
/* ─────────────────────────────────────────────────────────
   SMART HOLOGRAPHIC POPUP LOGIC (SPACE-AWARE EMISSION)
───────────────────────────────────────────────────────── */
function openHoloPopup(zone, pt) {
  const popup = document.getElementById('holo-popup');
  const content = document.getElementById('hp-content');
  
  // Inject Hardcore HUD Data from the Zone
  content.innerHTML = buildHoloHUD(zone.label, zone.tag, zone.holo);

  // Briefly show to calculate dimensions
  popup.style.display = 'block';
  popup.style.opacity = '0';
  
  const popW = popup.offsetWidth;
  const popH = popup.offsetHeight;
  const gap = 25; // Distance from node
  
  let left = pt.x;
  let top = pt.y;
  let originX = 'center';
  let originY = 'bottom';

  // Smart X-Axis Positioning
  if (pt.x + popW + gap < window.innerWidth) {
    left = pt.x + gap; 
    originX = 'left';
  } else {
    left = pt.x - popW - gap;
    originX = 'right';
  }

  // Smart Y-Axis Positioning
  if (pt.y - popH - gap > 0) {
    top = pt.y - popH - gap; // Emits UPWARDS
    originY = 'bottom';
  } else {
    top = pt.y + gap; // Drops DOWNWARDS if near top edge
    originY = 'top';
  }

  // Apply Coordinates & Origin
  popup.style.left = left + 'px';
  popup.style.top = top + 'px';
  popup.style.transformOrigin = `${originX} ${originY}`;

  // Trigger Hologram Physics Animation
  popup.classList.remove('holo-anim');
  void popup.offsetWidth; // Force Reflow
  popup.style.opacity = '1';
  popup.classList.add('holo-anim');
}

function closeHoloPopup() {
  const popup = document.getElementById('holo-popup');
  if(popup) {
    popup.classList.remove('holo-anim');
    popup.style.display = 'none';
  }
}

// Side and Intel Modals Flow
=======
// Side/Overlay Modals Integration
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
function openDossier() {
  closeAllModals();
  document.getElementById('dossier-modal').classList.add('open');
  document.querySelector('[data-nav="op"]').classList.add('lit');
}
function closeDossier() {
  document.getElementById('dossier-modal').classList.remove('open');
  document.querySelector('[data-nav="op"]')?.classList.remove('lit');
}

function openIntel() {
  closeAllModals();
  document.getElementById('intel-modal').classList.add('open');
  document.querySelector('[data-nav="in"]').classList.add('lit');
}
function closeIntel() {
  document.getElementById('intel-modal').classList.remove('open');
  document.querySelector('[data-nav="in"]')?.classList.remove('lit');
}

// Terminal Logic Execution
const termModal = document.getElementById('terminal-modal');
const termInput = document.getElementById('term-input');
const termHistory = document.getElementById('term-history');

function openTerminal() {
  closeAllModals();
  if (termModal) {
    termModal.classList.add('open');
    setTimeout(() => termInput.focus(), 100);
  }
}

function closeTerminal() { 
  if (termModal) termModal.classList.remove('open'); 
}

if (termInput) {
  termInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const val = this.value.trim().toLowerCase();
      this.value = '';
      
      termHistory.innerHTML += `<div class="term-input-line"><span class="term-prompt">coderudra@profile:~$</span> ${val}</div>`;
      
      let response = '';
      switch(val) {
        case 'help':
          response = `Available Commands:<br>
            <span class="term-cmd">[who]</span> or <span class="term-cmd">[w]</span> - About me<br>
            <span class="term-cmd">[skills]</span> or <span class="term-cmd">[s]</span> - Tech stack<br>
            <span class="term-cmd">[resume]</span> or <span class="term-cmd">[cv]</span> - View PDF Resume<br>
            <span class="term-cmd">[github]</span> - Open Github<br>
            <span class="term-cmd">[clear]</span> - Clear terminal`;
          break;
        case 'who':
        case 'w':
          response = `Hey! I'm Shreyansh Srivastava.<br>
            Building safety-critical AI vision systems. Previously Logistics & Ops Head @ Google Student Ambassador.<br>
            I design edge-AI pipelines, optimize YOLO models, and build swarm logic in C++.`;
          break;
        case 'skills':
        case 's':
          response = `Core: Python, C++, SQL<br>
            Vision/AI: YOLOv8, OpenCV, PyTorch, Multi-Agent RL<br>
            Systems: WebAssembly, Linux, Docker, FastAPI`;
          break;
        case 'resume':
        case 'cv':
          response = `Opening secure dossier...`;
          window.open('YOUR_RESUME_PDF_LINK_HERE', '_blank'); // Make sure to replace this
          break;
        case 'github':
          window.open('https://github.com/CODERUDRA-X', '_blank');
          response = `Redirecting to Github...`;
          break;
        case 'clear':
          termHistory.innerHTML = '';
          return;
        case '':
          return;
        default:
          response = `Command not found: ${val}. Type 'help' for a list of commands.`;
      }
      
      termHistory.innerHTML += `<div class="term-line" style="margin: 10px 0; color: #fff;">${response}</div>`;
      document.getElementById('term-body').scrollTop = document.getElementById('term-body').scrollHeight;
    }
  });
}

function closeAllModals() {
<<<<<<< HEAD
  closeModal(); 
  closeHoloPopup();
  closeDossier(); 
  closeIntel();
=======
  closeModal(); closeDossier(); closeIntel(); closeTerminal();
>>>>>>> 5f044d5513e340c318809b6077e2887e3fe32c0e
}

// Copy Action Handling
function copyEmailIntel(card) {
  navigator.clipboard.writeText('harshgroups247@gmail.com').then(() => {
    const el = document.getElementById('email-copy-status');
    if (el) { el.textContent = '✓ SECURE COMMS LINK COPIED'; el.style.color = '#00ff88'; }
    setTimeout(() => { if(el){el.textContent='→ CLICK TO COPY';el.style.color='';} }, 2500);
  });
}