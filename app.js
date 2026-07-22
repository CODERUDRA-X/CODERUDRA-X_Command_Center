/* ═══════════════════════════════════════════════════════════
   CODERUDRA-X COMMAND CENTER · ENGINE v11.1 (BUG FIXES)
═══════════════════════════════════════════════════════════ */

const buildHoloHUD = (zone) => {
  const h = zone.holo || {}; // Extract holo object
  return `
<div style="clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%); background: rgba(4,10,6,0.95); border: 1px solid rgba(0,255,136,0.5); box-shadow: inset 0 0 40px rgba(0,255,136,0.1), 0 0 30px rgba(0,0,0,0.8); position:relative;">
  
  <!-- Cyberpunk Header -->
  <div class="hp-header" style="background: repeating-linear-gradient(45deg, rgba(0,255,136,0.05) 0px, rgba(0,255,136,0.05) 2px, transparent 2px, transparent 4px); border-bottom: 1px solid var(--hud); padding: 12px 18px;">
    <div>
      <div style="color:var(--amber); font-size:0.55rem; letter-spacing:0.3em; text-transform:uppercase; margin-bottom:2px;">${zone.tag || '// SYSTEM NODE'}</div>
      <div style="color:var(--hud); font-size:1.25rem; font-weight:900; font-family:'Orbitron', monospace; letter-spacing:0.15em; text-shadow:0 0 15px rgba(0,255,136,0.5); text-transform:uppercase;">${zone.label || 'UNKNOWN'}</div>
    </div>
    <div class="hp-close" onclick="closeHoloPopup()" style="color:var(--amber); text-shadow: 0 0 10px var(--amber); font-size: 1.2rem; cursor:pointer;">✕</div>
  </div>
  
  <div style="padding: 18px;">
    <!-- Asset Viewer with CRT / Night Vision Tint -->
    <div style="width:100%; height:150px; border: 1px solid rgba(0,255,136,0.4); margin-bottom:15px; position:relative; overflow:hidden;">
      <div style="position:absolute; inset:0; background:linear-gradient(180deg, transparent, rgba(0,255,136,0.15)); z-index:2; mix-blend-mode: screen; pointer-events:none;"></div>
      <img src="${h.img || 'cinematic-map.png'}" onerror="this.src='cinematic-map.png'" alt="SYS_ASSET" style="width:100%; height:100%; object-fit:cover; opacity:0.8; filter:grayscale(50%) contrast(1.3) sepia(40%) hue-rotate(90deg);">
      <div class="scan-line-horizontal" style="height:2px; background:var(--hud); box-shadow: 0 0 15px var(--hud); opacity:0.8;"></div>
      
      <!-- Tech Corners -->
      <div style="position:absolute; top:0; left:0; width:12px; height:12px; border-top:2px solid var(--hud); border-left:2px solid var(--hud); z-index:3;"></div>
      <div style="position:absolute; bottom:0; right:0; width:12px; height:12px; border-bottom:2px solid var(--hud); border-right:2px solid var(--hud); z-index:3;"></div>
    </div>

    <!-- Hardcore Directive Output -->
    <div style="border-left: 3px solid #00ff88; padding: 10px 12px; margin-bottom: 15px; background: rgba(0,255,136,0.06); box-shadow: inset 0 0 15px rgba(0,255,136,0.02);">
      <span style="color:#e0e0e0; font-family:'Share Tech Mono', monospace; font-size:0.8rem; line-height: 1.5;"><span style="color:#00ff88; font-weight:bold; letter-spacing:0.1em;">[>] DIRECTIVE:</span> ${h.why || 'No directive found.'}</span>
    </div>

    <!-- Engineering Data Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-family:'Share Tech Mono', monospace; font-size: 0.75rem; margin-bottom:20px;">
      
      <!-- Architecture Block -->
      <div style="border: 1px solid rgba(0,255,136,0.3); padding: 12px; background: rgba(0,10,5,0.8); position:relative;">
        <div style="position:absolute; top:-2px; left:-2px; width:6px; height:6px; background:var(--hud);"></div>
        <div style="color:#00ff88; border-bottom: 1px dashed rgba(0,255,136,0.4); padding-bottom:6px; margin-bottom:8px; letter-spacing:0.15em; font-weight:bold;">// ARCHITECTURE</div>
        <div style="color:#a9b7c6; line-height:1.6;">${h.arch || 'System data corrupted.'}</div>
      </div>
      
      <!-- Telemetry Block -->
      <div style="border: 1px solid rgba(240,165,0,0.3); padding: 12px; background: rgba(10,8,0,0.8); position:relative;">
        <div style="position:absolute; top:-2px; left:-2px; width:6px; height:6px; background:var(--amber);"></div>
        <div style="color:#f0a500; border-bottom: 1px dashed rgba(240,165,0,0.4); padding-bottom:6px; margin-bottom:8px; letter-spacing:0.15em; font-weight:bold;">// TELEMETRY</div>
        <div style="color:#d0c0a0; line-height:1.6;">${h.metrics || 'Awaiting signal...'}</div>
      </div>
    </div>

    <!-- Action Triggers -->
    <div style="display:flex; gap:12px;">
      <a href="${h.git || '#'}" target="_blank" class="holo-btn" style="border-radius: 2px; text-shadow: 0 0 5px rgba(0,255,136,0.5);">[ GITHUB_UPLINK ]</a>
      <a href="${h.live || '#'}" target="_blank" class="holo-btn amber-btn" style="border-radius: 2px; text-shadow: 0 0 5px rgba(240,165,0,0.5); ${!h.live ? 'opacity:0.2; pointer-events:none; filter:grayscale(100%);' : ''}">[ DEPLOYED_NODE ]</a>
    </div>
  </div>
</div>
  `;
};

/* ─────────────────────────────────────────────────────────
   PORTFOLIO SECTIONS (6 MAIN HQ ISLANDS -> DEEP SUB-NODES)
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
    sectorZones: [
      { lat: 500, lng: 960, label: 'DATA SCIENCE CORE', tag:'// ACADEMIC NODE', holo: {
        title: 'DATA SCIENCE CORE', tag: '// ACADEMIC NODE',
        img: 'ds_core.jpg', why: 'Master computational mathematics and foundational CS principles[cite: 3].', 
        arch: 'B.Tech CSE (Data Science) academic core. Independent study in Linear Algebra and AI foundations via MIT OCW[cite: 3].', 
        metrics: '<span style="color:#f0a500">SGPA:</span> 8.3/10<br><span style="color:#f0a500">Rank:</span> Top 100 GfG[cite: 3]', 
        git: 'https://github.com/CODERUDRA-X', live: 'https://linkedin.com/in/shreyansh-srivastava-9a83b9291'
      }},
      { lat: 700, lng: 1400, label: 'ELITE CODERS RELAY', tag:'// LEADERSHIP', holo: {
        title: 'ELITE CODERS RELAY', tag: '// LEADERSHIP',
        img: 'elite.jpg', why: 'Scale developer ecosystems and deploy robust credentialing across India[cite: 4].', 
        arch: 'Engineered automated credentialing (TruScholar) and event operations using n8n for massive developer clusters[cite: 4].', 
        metrics: '<span style="color:#f0a500">Impact:</span> 5000+ Devs<br><span style="color:#f0a500">Role:</span> Pan-India Ops Head[cite: 3, 4]', 
        git: '', live: 'https://www.geeksforgeeks.org/profile/saitejareddy05'
      }}
    ]
  },
  
  {
    id: 'deployments', type: 'hud', lat: 872, lng: 1708,
    tag: '// SECTION 02 · CORE ENGINEERING', title: 'TACTICAL DEPLOYMENTS', sc: 'cmp', sl: 'SYSTEMS ONLINE',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> A showcase of production-ready inference pipelines and autonomous systems[cite: 3].</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Bypassing cloud-dependency in favor of robust edge-computing, strict risk thresholds, and human-in-the-loop oversight[cite: 3, 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 4 Major Ops | Edge-Focus | Production State</div>`,
    stats: [{v:'4',l:'MAJOR OPS'},{v:'EDGE',l:'FOCUS'},{v:'PROD',l:'STATE'}],
    tags: ['Computer Vision','Multi-Agent RL','Data Governance','FastAPI'],
    sectorImage: 'rightest.png',
    sectorZones: [
      { lat: 700, lng: 400, label: 'PROJECT INDRA-AI', tag:'// UAV VISION', holo: {
        title: 'PROJECT INDRA-AI', tag: '// UAV VISION',
        img: 'indra.jpg', why: 'Automate fatal manual inspections of transmission lines for predictive grid maintenance[cite: 3].', 
        arch: 'YOLOv8 pipeline → fault detection → damage classification. Real-time edge inference on drone footage[cite: 3].', 
        metrics: '<span style="color:#f0a500">Precision:</span> 94% mAP<br><span style="color:#f0a500">Risk Matrix:</span> 5 Levels[cite: 3]', 
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 400, lng: 1000, label: 'FLOWSYNC-AI', tag:'// URBAN TRAFFIC', holo: {
        title: 'FLOWSYNC-AI', tag: '// URBAN TRAFFIC',
        img: 'flowsync.jpg', why: 'Eradicate emergency vehicle delays caused by static timers[cite: 3].', 
        arch: 'Multi-Agent PPO Reinforcement Learning paired with YOLOv8n object detection for area-based density calculation[cite: 3, 4].', 
        metrics: '<span style="color:#f0a500">Wait Reduction:</span> Proven<br><span style="color:#f0a500">Override:</span> 100% Success[cite: 3]', 
        git: 'https://github.com/CODERUDRA-X/CODERUDRAX-FlowSync-AI', live: ''
      }},
      { lat: 600, lng: 1300, label: 'DATASENTINEL AI', tag:'// DATA GOVERNANCE', holo: {
        title: 'DATASENTINEL AI', tag: '// DATA GOVERNANCE',
        img: 'datasentinel.jpg', why: 'Prevent silent schema failures and compliance risks in enterprise databases[cite: 4].', 
        arch: 'FastAPI & PostgreSQL extraction integrated with Google Gemini API for PII detection and semantic duplicate flagging[cite: 4].', 
        metrics: '<span style="color:#f0a500">Health Score:</span> Custom Algo<br><span style="color:#f0a500">Latency:</span> Sub-second[cite: 3, 4]', 
        git: 'https://github.com/CODERUDRA-X/intelligent-data-dictionary-agent', live: 'https://www.commudle.com/builds/datasentinal-ai-an-intelligent-data-dictionary-agent'
      }},
      { lat: 800, lng: 900, label: 'FIX-IT-NOW AI', tag:'// CIVIC OPS', holo: {
        title: 'FIX-IT-NOW AI', tag: '// CIVIC OPS',
        img: 'fixit.jpg', why: 'Manual civic grievance routing causes critical public infrastructure response delays[cite: 3].', 
        arch: 'AI-driven classification engine parsing natural language to route city infrastructure complaints instantly[cite: 3].', 
        metrics: '<span style="color:#f0a500">Load:</span> High-Volume<br><span style="color:#f0a500">Routing:</span> Real-Time', 
        git: 'https://github.com/CODERUDRA-X/fix-it-now-ai', live: ''
      }}
    ]
  },

  {
    id: 'service', type: 'hud', lat: 954, lng: 1111,
    tag: '// SECTION 03 · PROFESSIONAL TENURE', title: 'SERVICE RECORD', sc: 'act', sl: 'ACTIVE DUTY',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> Enterprise alliances established across leading organizations and strategic tech startups[cite: 3].</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Professional deployments integrating AI safety audits, scalable backend infrastructure, and national-level logistics automation[cite: 3, 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 3 Major Alliances | 6x Cost Moat | 70% Process Optimization[cite: 3, 4]</div>`,
    stats: [{v:'3',l:'ALLIANCES'},{v:'6x',l:'COST MOAT'},{v:'70%',l:'OPT'}],
    tags: ['Enterprise Audits','Backend Integrations','Automation','AI Safety'],
    sectorImage: 'tower.png',
    sectorZones: [
      { lat: 600, lng: 500, label: 'PROMPTLY AI PVT LTD', tag:'// AI RESEARCH INTERN', holo: {
        title: 'PROMPTLY AI AUDITS', tag: '// AI RESEARCH INTERN',
        img: 'promptly.jpg', why: 'Evaluate B2B AI tools and mitigate enterprise legal liability[cite: 3].', 
        arch: 'Designed a 3-phase LLM-assisted audit system. Built Python NLP pipelines tracking ₹8 Crore+ ecosystem investments[cite: 3, 4].', 
        metrics: '<span style="color:#f0a500">Throughput:</span> 3x Faster<br><span style="color:#f0a500">Cost Moat:</span> 6x Identified[cite: 3]', 
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 400, lng: 1100, label: 'EMPYREAN ROBOTICS', tag:'// SDE AI/ML INTERN', holo: {
        title: 'EMPYREAN INFRASTRUCTURE', tag: '// SDE AI/ML INTERN',
        img: 'empyrean.jpg', why: 'Develop real-world computer vision monitoring infrastructure[cite: 3, 4].', 
        arch: 'Built scalable inference pipelines leveraging Python, FastAPI, and PostgreSQL for backend workflows[cite: 3, 4].', 
        metrics: '<span style="color:#f0a500">Focus:</span> Reliability<br><span style="color:#f0a500">State:</span> Active Deployment[cite: 3]', 
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 800, lng: 900, label: 'GOOGLE GSA', tag:'// PAN-INDIA OPS HEAD', holo: {
        title: 'GSA AUTOMATION', tag: '// PAN-INDIA OPS HEAD',
        img: 'google.jpg', why: 'Automate manual coordination for 110+ campus leads globally[cite: 3, 4].', 
        arch: 'Engineered deep webhook automations via n8n and Python scripts to run community analytics dashboards[cite: 3, 4].', 
        metrics: '<span style="color:#f0a500">Manual Work:</span> -70%<br><span style="color:#f0a500">Scale:</span> National[cite: 3]', 
        git: 'https://github.com/CODERUDRA-X', live: ''
      }}
    ]
  },

  {
    id: 'armory', type: 'hud', lat: 249, lng: 533,
    tag: '// SECTION 04 · CAPABILITY MATRIX', title: 'THE ARMORY (SKILLS)', sc: 'act', sl: 'WEAPONS HOT',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> A deliberately selected technology stack to build high-reliability systems[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Bridging the fatal gap between theoretical machine learning research and production-grade, low-latency software engineering[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Edge Focus | C++ Native | Mathematics Base</div>`,
    stats: [{v:'AI',l:'CORE'},{v:'EDGE',l:'FOCUS'},{v:'MATH',l:'BASE'}],
    tags: ['Python','C++','PyTorch','WebAssembly','Docker','PostgreSQL'],
    sectorImage: 'many.png',
    sectorZones: [
      { lat: 500, lng: 600, label: 'CORE & MATHEMATICS', tag:'// THE BRAIN', holo: {
        title: 'CORE DATA STRUCTURES', tag: '// THE BRAIN',
        img: 'math.jpg', why: 'Provide robust logic and low-level memory management[cite: 4].', 
        arch: 'C++ for deep DSA and native integrations. Python for ML ecosystems. SQL for data structuring[cite: 3, 4].', 
        metrics: '<span style="color:#f0a500">Algorithms:</span> 840+ Solved<br><span style="color:#f0a500">Math:</span> Linear Algebra[cite: 3, 4]', 
        git: '', live: ''
      }},
      { lat: 700, lng: 1200, label: 'AI & PERCEPTION', tag:'// THE EYES', holo: {
        title: 'PERCEPTION ENGINES', tag: '// THE EYES',
        img: 'vision.jpg', why: 'Enable high-fidelity spatial and contextual awareness[cite: 4].', 
        arch: 'YOLOv8/v11 for object detection. Multi-Agent PPO for Reinforcement Learning. NLP/LLMs for semantic parsing[cite: 3, 4].', 
        metrics: '<span style="color:#f0a500">Focus:</span> Low-latency<br><span style="color:#f0a500">Frameworks:</span> PyTorch, OpenCV[cite: 3]', 
        git: '', live: ''
      }},
      { lat: 400, lng: 1400, label: 'EDGE INFRASTRUCTURE', tag:'// THE SPINE', holo: {
        title: 'DEPLOYMENT INFRA', tag: '// THE SPINE',
        img: 'infra.jpg', why: 'Ensure zero-downtime, cloud-independent execution[cite: 4].', 
        arch: 'WebAssembly for browser edge AI. Docker for containerization. FastAPI & PostgreSQL for backend routing[cite: 3, 4].', 
        metrics: '<span style="color:#f0a500">Export:</span> ONNX, TFLite<br><span style="color:#f0a500">OS:</span> Linux/Bash[cite: 3]', 
        git: '', live: ''
      }}
    ]
  },

  {
    id: 'blacksite', type: 'amber', lat: 322, lng: 1275,
    tag: '// SECTION 05 · CLASSIFIED R&D', title: 'BLACK SITE (LABS)', sc: 'cls', sl: 'STEALTH MODE',
    body: `<div class="hn-section"><span class="hn-label">[ ⚠ RESTRICTED ACCESS ]</span> The underground laboratory for highly experimental architectures[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Focus areas include decentralized drone swarm coordination, 60FPS edge kinematics, and permanent-consequence behavioral modeling[cite: 3, 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Zero Cloud Ping | Stealth Mode | Experimental Engine</div>`,
    stats: [{v:'C++',l:'SWARMS'},{v:'WASM',l:'EDGE'},{v:'🔒',l:'CLASSIFIED'}],
    tags: ['Swarm AI','Kinematics','Behavioral Sim','Decentralized'],
    sectorImage: 'mount.png',
    sectorZones: [
      { lat: 400, lng: 600, label: 'PROJECT VYUHA', tag:'// CLASSIFIED SWARM', holo: {
        title: 'PROJECT VYUHA', tag: '// CLASSIFIED SWARM',
        img: 'vyuha.jpg', why: 'Eliminate Single Point of Failure (SPOF) in drone swarms[cite: 4].', 
        arch: 'Decentralized multi-agent coordination built in C++. Nodes use emergent logic inspired by Mahabharat Vyuha military formations[cite: 4].', 
        metrics: '<span style="color:#f0a500">Status:</span> Stealth Mode<br><span style="color:#f0a500">Comms:</span> O(log N) Overhead[cite: 4]', 
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 700, lng: 1100, label: 'A.V.A.T.A.R', tag:'// 60FPS KINEMATICS', holo: {
        title: 'PROJECT A.V.A.T.A.R', tag: '// 60FPS KINEMATICS',
        img: 'avatar.jpg', why: 'Real-time spatial mapping without cloud ping[cite: 4].', 
        arch: 'Python-to-WebAssembly compiler running MediaPipe. Uses LERP-based smoothing and 3D Euclidean Z-axis correction[cite: 3, 4].', 
        metrics: '<span style="color:#f0a500">Latency:</span> Zero Cloud Ping<br><span style="color:#f0a500">Target:</span> Defense-grade[cite: 3]', 
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 600, lng: 1500, label: 'MAYA PROTOCOL', tag:'// BEHAVIORAL SIM', holo: {
        title: 'MAYA PROTOCOL', tag: '// BEHAVIORAL SIM',
        img: 'maya.jpg', why: 'Model physiological consequences of dopamine choices[cite: 3, 4].', 
        arch: 'C++ native engine executing permadeath mechanics based on System Integrity vs. Willpower trade-offs[cite: 3, 4].', 
        metrics: '<span style="color:#f0a500">State:</span> Shipped<br><span style="color:#f0a500">Platform:</span> Cross-platform[cite: 3]', 
        git: 'https://github.com/CODERUDRA-X/maya_protocol', live: ''
      }},
      { lat: 800, lng: 400, label: 'NAAD PROTOCOL', tag:'// DATA STREAMING', holo: {
        title: 'NAAD PROTOCOL', tag: '// DATA STREAMING',
        img: 'naad.jpg', why: 'Traditional waveform streaming wastes network bandwidth[cite: 4].', 
        arch: '"Streaming Meaning, Not Waveforms" utilizing advanced semantic JS encoding for extreme compression[cite: 4].', 
        metrics: '<span style="color:#f0a500">Audio Rep:</span> Sub-kbps<br><span style="color:#f0a500">Engine:</span> Experimental[cite: 4]', 
        git: 'https://github.com/CODERUDRA-X/naad', live: ''
      }}
    ]
  },

  {
    id: 'vault', type: 'hud', lat: 320, lng: 680,
    tag: '// SECTION 06 · COMMS & ARCHIVE', title: 'INTEL VAULT', sc: 'act', sl: 'TRANSMITTING',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> UPLINK ESTABLISHED. Central repository for open-source codebase contributions[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Daily CI/CD intelligence pipelines and secure communication channels for strategic alliances[cite: 4].</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 35+ Repos | 1K+ Annual Commits | Live Uplink[cite: 4]</div>`,
    stats: [{v:'35+',l:'REPOS'},{v:'1K+',l:'COMMITS'},{v:'LIVE',l:'UPLINK'}],
    tags: ['GitHub','CI/CD','Intelligence','Open Source'],
    sectorImage: 'lefti.png',
    sectorZones: [
      { lat: 400, lng: 800, label: 'DEFENSE AI ARCHIVE', tag:'// AUTOMATION', holo: {
        title: 'DEFENSE AI ARCHIVE', tag: '// AUTOMATION',
        img: 'archive.jpg', why: 'Aggregate global defense-tech and swarm publications[cite: 4].', 
        arch: 'Python-driven CI/CD pipeline that scrapes, synthesizes, and securely catalogs petabyte-scale data natively[cite: 4].', 
        metrics: '<span style="color:#f0a500">Sync:</span> 24hr Automated<br><span style="color:#f0a500">Mode:</span> Hands-free[cite: 4]', 
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 700, lng: 1200, label: 'GCB-HUB DEPLOYMENT', tag:'// WEB PIPELINE', holo: {
        title: 'GCB-HUB ARCHITECTURE', tag: '// WEB PIPELINE',
        img: 'gcb.jpg', why: 'Deploy petabyte-scale genetic models (BLISS) for global access[cite: 4].', 
        arch: 'Engineered the frontend data pipeline to transform dense statistical pQTL data into an intuitive platform[cite: 4].', 
        metrics: '<span style="color:#f0a500">Scale:</span> Petabyte Ready<br><span style="color:#f0a500">Scope:</span> 5,779+ Models[cite: 4]', 
        git: 'https://github.com/gcb-hub/BLISS', live: 'https://www.gcbhub.org/'
      }}
    ]
  }
];

/* ─────────────────────────────────────────────────────────
   TICKER MESSAGES
───────────────────────────────────────────────────────── */
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

// Background Starfield & Speed Particles
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

// Map Deployment Initialization
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

// Clock and Ticker Utilities
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

// Leaflet Engine & Boundary Lock
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
        !e.originalEvent.target.closest('#intel-modal')) {
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

// Canvas HUD Overlay Loop
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

// ─────────────────────────────────────────────────────────
// MODAL HUD CONTROLLERS (MISSION BRIEFING)
// ─────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────
// SUB-MAP SYSTEM (SECTOR DRILL-DOWN ENGINE)
// ─────────────────────────────────────────────────────────
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

/* ─────────────────────────────────────────────────────────
   SMART HOLOGRAPHIC POPUP LOGIC (SPACE-AWARE EMISSION)
───────────────────────────────────────────────────────── */
function openHoloPopup(zone, pt) {
  const popup = document.getElementById('holo-popup');
  const content = document.getElementById('hp-content');
  
// Inject Hardcore HUD Data from the Zone
  content.innerHTML = buildHoloHUD(zone); // Changed this line to pass only the zone object

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

function closeAllModals() {
  closeModal(); 
  closeHoloPopup();
  closeDossier(); 
  closeIntel();
}

// Copy Action Handling
function copyEmailIntel(card) {
  navigator.clipboard.writeText('harshgroups247@gmail.com').then(() => {
    const el = document.getElementById('email-copy-status');
    if (el) { el.textContent = '✓ SECURE COMMS LINK COPIED'; el.style.color = '#00ff88'; }
    setTimeout(() => { if(el){el.textContent='→ CLICK TO COPY';el.style.color='';} }, 2500);
  });
}