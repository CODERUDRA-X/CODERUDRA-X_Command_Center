import { CINEMATIC_MAP_IMAGE } from '../constants/missionsConfig.js';

/* ─────────────────────────────────────────────────────────
   HOLOGRAM POPUP (zone detail HUD shown inside sector drill-down)
   Logic, markup, and inline styling are unchanged from the original
   app.js — only the module boundary and the CINEMATIC_MAP_IMAGE import
   are new.
───────────────────────────────────────────────────────── */

export const buildHoloHUD = (zone) => {
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
      <img src="${h.img || CINEMATIC_MAP_IMAGE}" onerror="this.src='${CINEMATIC_MAP_IMAGE}'" alt="SYS_ASSET" style="width:100%; height:100%; object-fit:cover; opacity:0.8; filter:grayscale(50%) contrast(1.3) sepia(40%) hue-rotate(90deg);">
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
   SMART HOLOGRAPHIC POPUP LOGIC (SPACE-AWARE EMISSION)
───────────────────────────────────────────────────────── */
export function openHoloPopup(zone, pt) {
  const popup = document.getElementById('holo-popup');
  const content = document.getElementById('hp-content');

  // Inject Hardcore HUD Data from the Zone
  content.innerHTML = buildHoloHUD(zone); // Changed this line to pass only the zone object

  // Briefly show to calculate dimensions
  popup.style.display = 'block';
  popup.style.opacity = '0';

  // Usable screen rectangle. The top is kept clear of the sector title bar,
  // the bottom of the HUD strip; EXTRA covers the 3D tilt (the lower edge
  // swells ~4% under rotateX/perspective) and the pedestal under the box.
  const vv = window.visualViewport;
  const vw = Math.round(vv ? vv.width  : window.innerWidth);
  const vh = Math.round(vv ? vv.height : window.innerHeight);
  const padX = 12, padTop = 66, padBot = 34, gap = 28;

  // A tall briefing must never be taller than the usable area: cap the
  // scrolling content box FIRST, then measure.
  // (rotateX(16deg) + perspective makes the near edge ~12% bigger, so cap with that in mind)
  content.style.maxHeight = Math.max(220, (vh - padTop - padBot) / 1.14 - 20) + 'px';
  const popW = popup.offsetWidth;
  const popH = popup.offsetHeight * 1.12 + 18;

  // Prefer sitting BESIDE the node (side with more room), vertically centred
  // on it, so the panel stays visually tied to its point. Only on narrow
  // screens, where neither side fits, does it go above/below instead.
  const roomR = vw - pt.x - gap - padX;
  const roomL = pt.x - gap - padX;
  let left, top, originX, originY;

  if (roomR >= popW || roomL >= popW) {
    const right = roomR >= popW && (roomR >= roomL || roomL < popW);
    left = right ? pt.x + gap : pt.x - popW - gap;
    originX = right ? 'left' : 'right';
    top = pt.y - popH * 0.42;
  } else {
    left = pt.x - popW / 2;
    originX = 'center';
    const below = vh - pt.y >= pt.y;
    top = below ? pt.y + gap : pt.y - popH - gap;
  }

  // Hard clamp: whatever happened above, the whole box (tilt + pedestal
  // included) lands inside the usable rectangle.
  left = Math.min(Math.max(left, padX), Math.max(padX, vw - popW - padX));
  top  = Math.min(Math.max(top,  padTop), Math.max(padTop, vh - popH - padBot));
  originY = Math.round(Math.min(100, Math.max(0, ((pt.y - top) / popH) * 100))) + '%';

  popup.style.left = left + 'px';
  popup.style.top = top + 'px';
  popup.style.transformOrigin = `${originX} ${originY}`;

  // Trigger Hologram Physics Animation
  popup.classList.remove('holo-anim');
  void popup.offsetWidth; // Force Reflow
  popup.style.opacity = '1';
  popup.classList.add('holo-anim');

  // Safety net: after the entrance animation, check the REAL rendered box
  // (transforms included) and nudge it inside the screen if it still spills.
  setTimeout(() => {
    if (popup.style.display === 'none') return;
    const r = popup.getBoundingClientRect();
    let dy = 0, dx = 0;
    if (r.bottom > vh - 10) dy = (vh - 10) - r.bottom;
    if (r.top + dy < padTop - 10) dy = (padTop - 10) - r.top;
    if (r.left < padX) dx = padX - r.left;
    else if (r.right > vw - padX) dx = (vw - padX) - r.right;
    if (dx || dy) {
      popup.style.transition = 'left .25s ease, top .25s ease';
      popup.style.left = (parseFloat(popup.style.left) + dx) + 'px';
      popup.style.top  = (parseFloat(popup.style.top)  + dy) + 'px';
      setTimeout(() => { popup.style.transition = ''; }, 300);
    }
  }, 520);
}

export function closeHoloPopup() {
  const popup = document.getElementById('holo-popup');
  if (popup) {
    popup.classList.remove('holo-anim');
    popup.style.display = 'none';
  }
}
