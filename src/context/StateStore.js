/* ─────────────────────────────────────────────────────────
   STATE STORE
   The original monolith leaned on a pile of shared top-level `let`
   variables (activeMissionId, sectorFxActive, leafMap, etc.) that every
   function in the file could read/mutate directly. Splitting the file
   into ES modules means those variables need one shared home instead of
   being re-declared per-file — this object IS that home.

   Deliberately a plain mutable object, not a class with getters/setters
   or a pub-sub system: every consuming component mutates these fields
   exactly the way the original functions mutated their module-level
   variables (e.g. `store.activeMissionId = id`), so control flow and
   timing are byte-for-byte the same as before. This is intentionally a
   thin shared-state singleton, not a general-purpose state library.
───────────────────────────────────────────────────────── */

export const store = {
  // ── Boot sequence ──────────────────────────────────────────
  bi: 0,
  bootPct: 0,

  // ── Boot neural-radar background (canvas) ──────────────────
  bootNeuralCtx: null,
  bootNeuralNodes: [],
  bootNeuralEdges: [],
  bootNeuralActive: false,
  bootRadarAngle: 0,
  bootPulses: [],
  bootRadarBurst: 0,

  // ── Hold-to-deploy buckle ───────────────────────────────────
  audioCtx: null,
  holdStart: null,
  holdRAFId: null,
  holdDone: false,

  // ── Main radar map (Leaflet) ────────────────────────────────
  leafMap: null,
  hudCanvas: null,
  hudCtx: null,
  dashOffset: 0,
  mapReady: false,

  // ── Mission briefing modal ──────────────────────────────────
  activeMissionId: null,

  // ── Sector drill-down map + recon-FX overlay ────────────────
  sectorMap: null,
  sectorCanvas: null,
  sectorCtx: null,
  activeSectorId: null,
  sectorZoneMarkers: [],   // { marker, el, zone, revealed, pinging }
  sectorSweepAngle: 0,
  sectorFxActive: false,
  sectorCentroid: null,    // { lat, lng }
  sectorResizeBound: false,
};
