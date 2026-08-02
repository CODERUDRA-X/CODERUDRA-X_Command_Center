import 'leaflet/dist/leaflet.css';
import './assets/style.css';

import { initBoot } from './components/BootEngine.js';
import { closeHoloPopup } from './components/Hologram.js';
import {
  closeModal,
  openDossier, closeDossier,
  openIntel, closeIntel,
  copyEmailIntel,
} from './components/Modals.js';
import { enterSector, exitSector } from './components/SectorDrillDown.js';

/* ─────────────────────────────────────────────────────────
   WINDOW BINDINGS
   index.html still uses plain inline `onclick="..."` handlers (kept
   deliberately — rewriting them to addEventListener wiring is out of
   scope per the "don't alter behavior" guardrail, and inline handlers
   are also what the dynamically-injected hologram/dossier markup
   relies on). Exposing the functions on `window` is what lets those
   attributes keep resolving under the new ES-module structure, where
   nothing is a global by default anymore.
───────────────────────────────────────────────────────── */
window.closeHoloPopup  = closeHoloPopup;
window.closeModal      = closeModal;
window.openDossier     = openDossier;
window.closeDossier    = closeDossier;
window.openIntel       = openIntel;
window.closeIntel      = closeIntel;
window.copyEmailIntel  = copyEmailIntel;
window.enterSector     = enterSector;
window.exitSector      = exitSector;

/* ─────────────────────────────────────────────────────────
   BOOT
   Kicks off the neural-radar canvas, starfield/cloud atmosphere, and
   the boot-log typewriter sequence — same entry point the original
   monolith ran automatically at the bottom of app.js.
───────────────────────────────────────────────────────── */
initBoot();
