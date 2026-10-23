import { store } from '../context/StateStore.js';
import { MISSIONS } from '../constants/missionsConfig.js';
import { PROFILE, INTEL_CARDS } from '../data/profile.js';
import { closeHoloPopup } from './Hologram.js';

/* ─────────────────────────────────────────────────────────
   MISSION BRIEFING MODAL
   Logic identical to the original openMissionBriefing/animateStats/
   closeModal in app.js.
───────────────────────────────────────────────────────── */
export function openMissionBriefing(id) {
  const m = MISSIONS.find(x => x.id === id);
  if (!m) return;
  store.activeMissionId = id;
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

export function closeModal() {
  document.getElementById('mission-modal').classList.remove('open');
}

/* ─────────────────────────────────────────────────────────
   DOSSIER MODAL (data-driven from src/data/profile.js)
   Markup below is the exact structure that used to be hardcoded in
   index.html — only the text now comes from PROFILE instead of being
   typed directly into the template string.
───────────────────────────────────────────────────────── */
function renderDossier() {
  const body = document.getElementById('dossier-body');
  if (!body) return;

  const paragraphsHtml = PROFILE.paragraphs.map(p => `<p>${p}</p>`).join('\n         ');

  body.innerHTML = `
      <!-- Left Sidebar: Name & ASCII Art -->
      <div style="flex: 1; min-width: 200px; max-width: 280px; display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h1 style="color: var(--khaki); font-family: 'Share Tech Mono', monospace; font-size: clamp(2rem, 3vw, 2.5rem); line-height: 1.1; margin-bottom: 5px;">${PROFILE.name}</h1>
          <h3 style="color: var(--hud); font-family: 'Share Tech Mono', monospace; font-size: 1rem; letter-spacing: 0.1em;">${PROFILE.handle}</h3>
        </div>
        
        <div style="width: 100%; border: 1px solid rgba(0,255,136,0.2); border-radius: 4px; overflow: hidden; background: #000; box-shadow: inset 0 0 20px rgba(0,255,136,0.05);">
          <img src="${PROFILE.portraitImg}" alt="ASCII Portrait" style="width: 100%; height: auto; display: block; filter: contrast(1.5) drop-shadow(0 0 2px rgba(0,255,136,0.5)); opacity: 0.85;">
        </div>
        
        <div style="font-size: 0.75rem; color: #888; font-family: 'Share Tech Mono', monospace; line-height: 1.8;">
          <strong style="color:var(--amber)">STATUS:</strong> ${PROFILE.status}<br>
          <strong style="color:var(--amber)">BASE:</strong> ${PROFILE.base}<br>
          <strong style="color:var(--amber)">MISSION:</strong> ${PROFILE.mission}
        </div>
      </div>

      <!-- Right Content: The Story Narrative -->
      <div style="flex: 2; min-width: 300px; font-family: 'Share Tech Mono', monospace; font-size: clamp(0.85rem, 1.5vw, 0.95rem); line-height: 1.8; color: #d0d0d0; display: flex; flex-direction: column; gap: 15px;">
         ${paragraphsHtml}
         
         <div style="margin-top: 10px; font-style: italic; color: #888;">
           Type <a href="${PROFILE.links.github}" target="_blank" style="color: var(--hud); text-decoration: none;">github</a>, <a href="${PROFILE.links.linkedin}" target="_blank" style="color: var(--hud); text-decoration: none;">linkedin</a>, or <a href="#" onclick="copyEmailIntel()" style="color: var(--hud); text-decoration: none;">email</a> to connect with me.
         </div>
      </div>
  `;
}

export function openDossier() {
  closeAllModals();
  renderDossier();
  document.getElementById('dossier-modal').classList.add('open');
  document.querySelector('[data-nav="op"]').classList.add('lit');
}
export function closeDossier() {
  document.getElementById('dossier-modal').classList.remove('open');
  document.querySelector('[data-nav="op"]')?.classList.remove('lit');
}

/* ─────────────────────────────────────────────────────────
   INTEL VAULT MODAL (data-driven from src/data/profile.js)
───────────────────────────────────────────────────────── */
function renderIntel() {
  const grid = document.getElementById('intel-grid');
  if (!grid) return;

  grid.innerHTML = `
      <a class="icard resume-card" href="${INTEL_CARDS.resumeHref}" target="_blank" rel="noopener">
        <div class="ii" style="color:#000;">📄</div>
        <span class="in" style="color:#000;">DOWNLOAD DOSSIER</span>
        <span class="id2" style="color:#111;">PDF Resume / CV</span>
        <div class="im-arrow" style="color:#000; border-top-color:#333;">→ INITIATE DOWNLOAD</div>
      </a>
      <a class="icard" href="${INTEL_CARDS.githubHref}" target="_blank" rel="noopener">
        <div class="ii">⬡</div><span class="in">GITHUB</span><span class="id2">CODERUDRA-X</span>
        <div class="im-arrow">→ OPEN CHANNEL</div>
      </a>
      <a class="icard" href="${INTEL_CARDS.linkedinHref}" target="_blank" rel="noopener">
        <div class="ii">🔗</div><span class="in">LINKEDIN</span><span class="id2">/in/shreyansh-srivastava</span>
        <div class="im-arrow">→ OPEN CHANNEL</div>
      </a>
      <div class="icard" onclick="copyEmailIntel()">
        <div class="ii">📡</div><span class="in">EMAIL COMMS</span><span class="id2" id="elbl">${INTEL_CARDS.email}</span>
        <div class="im-arrow" id="email-copy-status">→ CLICK TO COPY</div>
      </div>
  `;
}

export function openIntel() {
  closeAllModals();
  renderIntel();
  document.getElementById('intel-modal').classList.add('open');
  document.querySelector('[data-nav="in"]').classList.add('lit');
}
export function closeIntel() {
  document.getElementById('intel-modal').classList.remove('open');
  document.querySelector('[data-nav="in"]')?.classList.remove('lit');
}

export function closeAllModals() {
  closeModal();
  closeHoloPopup();
  closeDossier();
  closeIntel();
}

// Copy Action Handling
export function copyEmailIntel() {
  navigator.clipboard.writeText(INTEL_CARDS.email).then(() => {
    const el = document.getElementById('email-copy-status');
    if (el) { el.textContent = '✓ SECURE COMMS LINK COPIED'; el.style.color = '#00ff88'; }
    setTimeout(() => { if(el){el.textContent='→ CLICK TO COPY';el.style.color='';} }, 2500);
  });
}
