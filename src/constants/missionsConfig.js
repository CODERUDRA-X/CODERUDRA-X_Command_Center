/* ═══════════════════════════════════════════════════════════
   MISSIONS CONFIG
   Extracted verbatim from the original monolithic app.js.
   Values are untouched except asset filenames, which now point at
   /assets/ (served from public/assets/ by Vite) instead of living
   next to index.html as flat files.
═══════════════════════════════════════════════════════════ */

export const MISSIONS = [
  {
    id: 'citadel', type: 'citadel', lat: 672, lng: 932,
    tag: '// SECTION 01 · IDENTITY NEXUS', title: 'THE CITADEL (ABOUT)', sc: 'act', sl: 'COMMAND ACTIVE',
    body: `<div class="hn-section"><span class="hn-label">[ IDENTITY ]</span> Shreyansh Srivastava. B.Tech CSE (Data Science) @ UIT Prayagraj (Batch '28). Operating under the "Tier-3 to CEO" and "One Man Army" ethos.</div>
    <div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> Born from "Operation Rebirth" (2019). Architecting safety-critical AI vision systems for indigenous defense infrastructure (#build4bharat).</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 840+ DSA Solved | 1700+ CP Rating | 35+ Repos</div>`,
    stats: [{v:'CS',l:'MAJOR'},{v:'DS',l:'SPEC'},{v:'GSA',l:'ALUMNI'}],
    tags: ['AI Defense','UIT Prayagraj','Data Science','CODERUDRA-X'],
    sectorImage: 'assets/main.png',
    sectorZones: [
      { lat: 500, lng: 960, label: 'DATA SCIENCE CORE', tag:'// ACADEMIC NODE', holo: {
        title: 'DATA SCIENCE CORE', tag: '// ACADEMIC NODE',
        img: 'assets/ds_core.jpg', why: 'Master computational mathematics and foundational CS principles.',
        arch: 'B.Tech CSE (Data Science) academic core. Independent study in Linear Algebra and AI foundations via MIT OCW.',
        metrics: '<span style="color:#f0a500">SGPA:</span> 8.3/10<br><span style="color:#f0a500">Rank:</span> Top 100 GfG',
        git: 'https://github.com/CODERUDRA-X', live: 'https://linkedin.com/in/shreyansh-srivastava-9a83b9291'
      }},
      { lat: 700, lng: 1400, label: 'ELITE CODERS RELAY', tag:'// LEADERSHIP', holo: {
        title: 'ELITE CODERS RELAY', tag: '// LEADERSHIP',
        img: 'assets/elite.jpg', why: 'Scale developer ecosystems and deploy robust credentialing across India.',
        arch: 'Engineered automated credentialing (TruScholar) and event operations using n8n for massive developer clusters.',
        metrics: '<span style="color:#f0a500">Impact:</span> 5000+ Devs<br><span style="color:#f0a500">Role:</span> Pan-India Ops Head',
        git: '', live: 'https://www.geeksforgeeks.org/profile/saitejareddy05'
      }}
    ]
  },

  {
    id: 'deployments', type: 'hud', lat: 872, lng: 1708,
    tag: '// SECTION 02 · CORE ENGINEERING', title: 'TACTICAL DEPLOYMENTS', sc: 'cmp', sl: 'SYSTEMS ONLINE',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> A showcase of production-ready inference pipelines and autonomous systems.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Bypassing cloud-dependency in favor of robust edge-computing, strict risk thresholds, and human-in-the-loop oversight.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 4 Major Ops | Edge-Focus | Production State</div>`,
    stats: [{v:'4',l:'MAJOR OPS'},{v:'EDGE',l:'FOCUS'},{v:'PROD',l:'STATE'}],
    tags: ['Computer Vision','Multi-Agent RL','Data Governance','FastAPI'],
    sectorImage: 'assets/rightest.png',
    sectorZones: [
      { lat: 700, lng: 400, label: 'PROJECT INDRA-AI', tag:'// UAV VISION', holo: {
        title: 'PROJECT INDRA-AI', tag: '// UAV VISION',
        img: 'assets/indra.jpg', why: 'Automate fatal manual inspections of transmission lines for predictive grid maintenance.',
        arch: 'YOLOv8 pipeline → fault detection → damage classification. Real-time edge inference on drone footage.',
        metrics: '<span style="color:#f0a500">Precision:</span> 94% mAP<br><span style="color:#f0a500">Risk Matrix:</span> 5 Levels',
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 400, lng: 1000, label: 'FLOWSYNC-AI', tag:'// URBAN TRAFFIC', holo: {
        title: 'FLOWSYNC-AI', tag: '// URBAN TRAFFIC',
        img: 'assets/flowsync.jpg', why: 'Eradicate emergency vehicle delays caused by static timers.',
        arch: 'Multi-Agent PPO Reinforcement Learning paired with YOLOv8n object detection for area-based density calculation.',
        metrics: '<span style="color:#f0a500">Wait Reduction:</span> Proven<br><span style="color:#f0a500">Override:</span> 100% Success',
        git: 'https://github.com/CODERUDRA-X/CODERUDRAX-FlowSync-AI', live: ''
      }},
      { lat: 600, lng: 1300, label: 'DATASENTINEL AI', tag:'// DATA GOVERNANCE', holo: {
        title: 'DATASENTINEL AI', tag: '// DATA GOVERNANCE',
        img: 'assets/datasentinel.jpg', why: 'Prevent silent schema failures and compliance risks in enterprise databases.',
        arch: 'FastAPI & PostgreSQL extraction integrated with Google Gemini API for PII detection and semantic duplicate flagging.',
        metrics: '<span style="color:#f0a500">Health Score:</span> Custom Algo<br><span style="color:#f0a500">Latency:</span> Sub-second',
        git: 'https://github.com/CODERUDRA-X/intelligent-data-dictionary-agent', live: 'https://www.commudle.com/builds/datasentinal-ai-an-intelligent-data-dictionary-agent'
      }},
      { lat: 800, lng: 900, label: 'FIX-IT-NOW AI', tag:'// CIVIC OPS', holo: {
        title: 'FIX-IT-NOW AI', tag: '// CIVIC OPS',
        img: 'assets/fixit.jpg', why: 'Manual civic grievance routing causes critical public infrastructure response delays.',
        arch: 'AI-driven classification engine parsing natural language to route city infrastructure complaints instantly.',
        metrics: '<span style="color:#f0a500">Load:</span> High-Volume<br><span style="color:#f0a500">Routing:</span> Real-Time',
        git: 'https://github.com/CODERUDRA-X/fix-it-now-ai', live: ''
      }}
    ]
  },

  {
    id: 'service', type: 'hud', lat: 954, lng: 1111,
    tag: '// SECTION 03 · PROFESSIONAL TENURE', title: 'SERVICE RECORD', sc: 'act', sl: 'ACTIVE DUTY',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> Enterprise alliances established across leading organizations and strategic tech startups.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Professional deployments integrating AI safety audits, scalable backend infrastructure, and national-level logistics automation.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 3 Major Alliances | 6x Cost Moat | 70% Process Optimization</div>`,
    stats: [{v:'3',l:'ALLIANCES'},{v:'6x',l:'COST MOAT'},{v:'70%',l:'OPT'}],
    tags: ['Enterprise Audits','Backend Integrations','Automation','AI Safety'],
    sectorImage: 'assets/tower.png',
    sectorZones: [
      { lat: 600, lng: 500, label: 'PROMPTLY AI PVT LTD', tag:'// AI RESEARCH INTERN', holo: {
        title: 'PROMPTLY AI AUDITS', tag: '// AI RESEARCH INTERN',
        img: 'assets/promptly.jpg', why: 'Evaluate B2B AI tools and mitigate enterprise legal liability.',
        arch: 'Designed a 3-phase LLM-assisted audit system. Built Python NLP pipelines tracking ₹8 Crore+ ecosystem investments.',
        metrics: '<span style="color:#f0a500">Throughput:</span> 3x Faster<br><span style="color:#f0a500">Cost Moat:</span> 6x Identified',
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 400, lng: 1100, label: 'EMPYREAN ROBOTICS', tag:'// SDE AI/ML INTERN', holo: {
        title: 'EMPYREAN INFRASTRUCTURE', tag: '// SDE AI/ML INTERN',
        img: 'assets/empyrean.jpg', why: 'Develop real-world computer vision monitoring infrastructure.',
        arch: 'Built scalable inference pipelines leveraging Python, FastAPI, and PostgreSQL for backend workflows.',
        metrics: '<span style="color:#f0a500">Focus:</span> Reliability<br><span style="color:#f0a500">State:</span> Active Deployment',
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 800, lng: 900, label: 'GOOGLE GSA', tag:'// PAN-INDIA OPS HEAD', holo: {
        title: 'GSA AUTOMATION', tag: '// PAN-INDIA OPS HEAD',
        img: 'assets/google.jpg', why: 'Automate manual coordination for 110+ campus leads globally.',
        arch: 'Engineered deep webhook automations via n8n and Python scripts to run community analytics dashboards.',
        metrics: '<span style="color:#f0a500">Manual Work:</span> -70%<br><span style="color:#f0a500">Scale:</span> National',
        git: 'https://github.com/CODERUDRA-X', live: ''
      }}
    ]
  },

  {
    id: 'armory', type: 'hud', lat: 249, lng: 533,
    tag: '// SECTION 04 · CAPABILITY MATRIX', title: 'THE ARMORY (SKILLS)', sc: 'act', sl: 'WEAPONS HOT',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> A deliberately selected technology stack to build high-reliability systems.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Bridging the fatal gap between theoretical machine learning research and production-grade, low-latency software engineering.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Edge Focus | C++ Native | Mathematics Base</div>`,
    stats: [{v:'AI',l:'CORE'},{v:'EDGE',l:'FOCUS'},{v:'MATH',l:'BASE'}],
    tags: ['Python','C++','PyTorch','WebAssembly','Docker','PostgreSQL'],
    sectorImage: 'assets/many.png',
    sectorZones: [
      { lat: 500, lng: 600, label: 'CORE & MATHEMATICS', tag:'// THE BRAIN', holo: {
        title: 'CORE DATA STRUCTURES', tag: '// THE BRAIN',
        img: 'assets/math.jpg', why: 'Provide robust logic and low-level memory management.',
        arch: 'C++ for deep DSA and native integrations. Python for ML ecosystems. SQL for data structuring.',
        metrics: '<span style="color:#f0a500">Algorithms:</span> 840+ Solved<br><span style="color:#f0a500">Math:</span> Linear Algebra',
        git: '', live: ''
      }},
      { lat: 700, lng: 1200, label: 'AI & PERCEPTION', tag:'// THE EYES', holo: {
        title: 'PERCEPTION ENGINES', tag: '// THE EYES',
        img: 'assets/vision.jpg', why: 'Enable high-fidelity spatial and contextual awareness.',
        arch: 'YOLOv8/v11 for object detection. Multi-Agent PPO for Reinforcement Learning. NLP/LLMs for semantic parsing.',
        metrics: '<span style="color:#f0a500">Focus:</span> Low-latency<br><span style="color:#f0a500">Frameworks:</span> PyTorch, OpenCV',
        git: '', live: ''
      }},
      { lat: 400, lng: 1400, label: 'EDGE INFRASTRUCTURE', tag:'// THE SPINE', holo: {
        title: 'DEPLOYMENT INFRA', tag: '// THE SPINE',
        img: 'assets/infra.jpg', why: 'Ensure zero-downtime, cloud-independent execution.',
        arch: 'WebAssembly for browser edge AI. Docker for containerization. FastAPI & PostgreSQL for backend routing.',
        metrics: '<span style="color:#f0a500">Export:</span> ONNX, TFLite<br><span style="color:#f0a500">OS:</span> Linux/Bash',
        git: '', live: ''
      }}
    ]
  },

  {
    id: 'blacksite', type: 'amber', lat: 322, lng: 1275,
    tag: '// SECTION 05 · CLASSIFIED R&D', title: 'BLACK SITE (LABS)', sc: 'cls', sl: 'STEALTH MODE',
    body: `<div class="hn-section"><span class="hn-label">[ ⚠ RESTRICTED ACCESS ]</span> The underground laboratory for highly experimental architectures.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Focus areas include decentralized drone swarm coordination, 60FPS edge kinematics, and permanent-consequence behavioral modeling.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> Zero Cloud Ping | Stealth Mode | Experimental Engine</div>`,
    stats: [{v:'C++',l:'SWARMS'},{v:'WASM',l:'EDGE'},{v:'🔒',l:'CLASSIFIED'}],
    tags: ['Swarm AI','Kinematics','Behavioral Sim','Decentralized'],
    sectorImage: 'assets/mount.png',
    sectorZones: [
      { lat: 400, lng: 600, label: 'PROJECT VYUHA', tag:'// CLASSIFIED SWARM', holo: {
        title: 'PROJECT VYUHA', tag: '// CLASSIFIED SWARM',
        img: 'assets/vyuha.jpg', why: 'Eliminate Single Point of Failure (SPOF) in drone swarms.',
        arch: 'Decentralized multi-agent coordination built in C++. Nodes use emergent logic inspired by Mahabharat Vyuha military formations.',
        metrics: '<span style="color:#f0a500">Status:</span> Stealth Mode<br><span style="color:#f0a500">Comms:</span> O(log N) Overhead',
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 700, lng: 1100, label: 'A.V.A.T.A.R', tag:'// 60FPS KINEMATICS', holo: {
        title: 'PROJECT A.V.A.T.A.R', tag: '// 60FPS KINEMATICS',
        img: 'assets/avatar.jpg', why: 'Real-time spatial mapping without cloud ping.',
        arch: 'Python-to-WebAssembly compiler running MediaPipe. Uses LERP-based smoothing and 3D Euclidean Z-axis correction.',
        metrics: '<span style="color:#f0a500">Latency:</span> Zero Cloud Ping<br><span style="color:#f0a500">Target:</span> Defense-grade',
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 600, lng: 1500, label: 'MAYA PROTOCOL', tag:'// BEHAVIORAL SIM', holo: {
        title: 'MAYA PROTOCOL', tag: '// BEHAVIORAL SIM',
        img: 'assets/maya.jpg', why: 'Model physiological consequences of dopamine choices.',
        arch: 'C++ native engine executing permadeath mechanics based on System Integrity vs. Willpower trade-offs.',
        metrics: '<span style="color:#f0a500">State:</span> Shipped<br><span style="color:#f0a500">Platform:</span> Cross-platform',
        git: 'https://github.com/CODERUDRA-X/maya_protocol', live: ''
      }},
      { lat: 800, lng: 400, label: 'NAAD PROTOCOL', tag:'// DATA STREAMING', holo: {
        title: 'NAAD PROTOCOL', tag: '// DATA STREAMING',
        img: 'assets/naad.jpg', why: 'Traditional waveform streaming wastes network bandwidth.',
        arch: '"Streaming Meaning, Not Waveforms" utilizing advanced semantic JS encoding for extreme compression.',
        metrics: '<span style="color:#f0a500">Audio Rep:</span> Sub-kbps<br><span style="color:#f0a500">Engine:</span> Experimental',
        git: 'https://github.com/CODERUDRA-X/naad', live: ''
      }}
    ]
  },

  {
    id: 'vault', type: 'hud', lat: 320, lng: 680,
    tag: '// SECTION 06 · COMMS & ARCHIVE', title: 'INTEL VAULT', sc: 'act', sl: 'TRANSMITTING',
    body: `<div class="hn-section"><span class="hn-label">[ DIRECTIVE ]</span> UPLINK ESTABLISHED. Central repository for open-source codebase contributions.</div>
    <div class="hn-section"><span class="hn-label">[ ARCHITECTURE ]</span> Daily CI/CD intelligence pipelines and secure communication channels for strategic alliances.</div>
    <div class="hn-section"><span class="hn-label">[ METRICS ]</span> 35+ Repos | 1K+ Annual Commits | Live Uplink</div>`,
    stats: [{v:'35+',l:'REPOS'},{v:'1K+',l:'COMMITS'},{v:'LIVE',l:'UPLINK'}],
    tags: ['GitHub','CI/CD','Intelligence','Open Source'],
    sectorImage: 'assets/lefti.png',
    sectorZones: [
      { lat: 400, lng: 800, label: 'DEFENSE AI ARCHIVE', tag:'// AUTOMATION', holo: {
        title: 'DEFENSE AI ARCHIVE', tag: '// AUTOMATION',
        img: 'assets/archive.jpg', why: 'Aggregate global defense-tech and swarm publications.',
        arch: 'Python-driven CI/CD pipeline that scrapes, synthesizes, and securely catalogs petabyte-scale data natively.',
        metrics: '<span style="color:#f0a500">Sync:</span> 24hr Automated<br><span style="color:#f0a500">Mode:</span> Hands-free',
        git: 'https://github.com/CODERUDRA-X', live: ''
      }},
      { lat: 700, lng: 1200, label: 'GCB-HUB DEPLOYMENT', tag:'// WEB PIPELINE', holo: {
        title: 'GCB-HUB ARCHITECTURE', tag: '// WEB PIPELINE',
        img: 'assets/gcb.jpg', why: 'Deploy petabyte-scale genetic models (BLISS) for global access.',
        arch: 'Engineered the frontend data pipeline to transform dense statistical pQTL data into an intuitive platform.',
        metrics: '<span style="color:#f0a500">Scale:</span> Petabyte Ready<br><span style="color:#f0a500">Scope:</span> 5,779+ Models',
        git: 'https://github.com/gcb-hub/BLISS', live: 'https://www.gcbhub.org/'
      }}
    ]
  }
];

// Shared fallback image used by the main radar map, sector map, and the
// hologram popup's onerror handler — same behaviour as the hardcoded
// 'cinematic-map.png' literal in the original monolith, just centralized.
export const CINEMATIC_MAP_IMAGE = 'assets/cinematic-map.png';
