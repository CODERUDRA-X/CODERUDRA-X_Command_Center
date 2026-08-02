/* ─────────────────────────────────────────────────────────
   PROFILE / DOSSIER DATA
   Extracted verbatim (text unchanged) from the static markup that used
   to live inline inside #dossier-modal in index.html. Modals.js renders
   this into the DOM so the dossier is data-driven instead of hardcoded
   HTML — visual output is identical to the original.
───────────────────────────────────────────────────────── */

export const PROFILE = {
  name: 'Shreyansh Srivastava',
  handle: '// CODERUDRA-X',
  portraitImg: 'assets/pic.png',
  status: 'Stealth Mode',
  base: 'Prayagraj, India',
  mission: '#build4bharat',

  paragraphs: [
    `Hey! I'm an AI/ML Engineer & Systems Architect from Prayagraj, India.`,

    `I'm studying Computer Science & Data Science at UIT, primarily working on high-reliability Computer Vision, Edge AI, and production-ready inference pipelines @ Promptly AI and Empyrean Robotics.`,

    `In 2019, severe medical adversity triggered what I call "Operation Rebirth". I transitioned directly into builder mode. Today, the <span style="color: var(--amber)">"Tier-3 to CEO"</span> mindset fuels my drive to build for India's strategic defense and infrastructure (#build4bharat).`,

    `I've built and shipped complex architectures—from decentralized drone swarm logic (Project VYUHA) to hardware-free adaptive traffic systems (FlowSync AI). I'm an AI generalist, but to see the architectures I usually build, check the map sectors.`,

    `I also grind computational mathematics; I'm rated 1700+ in CP, have solved 840+ DSA problems, and recently won the ICUB8 2025 national hackathon.`,

    `Previously: Logistics & Ops Head for Google Student Ambassadors (Pan-India), managing automated operations for 110+ campus leads.`,

    `At my core, I love building fault-tolerant infrastructure and safety-critical systems. If you're building something ambitious, let's talk!`,
  ],

  links: {
    github: 'https://github.com/CODERUDRA-X',
    linkedin: 'https://linkedin.com/in/shreyansh-srivastava-9a83b9291',
  },
};

// Intel Vault card data — also extracted from static HTML for the same
// reason (single source of truth, easy to update without touching markup).
export const INTEL_CARDS = {
  resumeHref: 'assets/Shreyansh_Resume_Final.pdf',
  githubHref: 'https://github.com/CODERUDRA-X',
  linkedinHref: 'https://linkedin.com/in/shreyansh-srivastava-9a83b9291',
  email: 'harshgroups247@gmail.com',
};
