/* ═══════════════════════════════════════════════════════════
   AMBIENT WORLD CONFIG  (Stage 0)
   Everything the "living world" layer does is tuned from here.

   Map space = same Leaflet CRS.Simple space as MISSIONS:
     lat = vertical   (0 = bottom, 1080 = top)
     lng = horizontal (0 = left,  1920 = right)

   ► HOW TO PLACE REAL SHIP ROUTES (no guessing coordinates):
     1. npm run dev, open the site, press the  `  (backtick) key.
     2. Press R → click along open WATER where a ship should sail →
        Enter. The route is copied to your clipboard AND a preview ship
        starts sailing it immediately.
     3. Paste it into ROUTES below under the right map key
        ('global' = main radar map, or a mission id such as 'citadel').
   The default 'global' lanes are only placeholders along the map edges
   because they were written without seeing the final art.
═══════════════════════════════════════════════════════════ */

export const AMBIENT = {
  enabled: true,

  // Parallax: how many pixels the marker layer slides against the map art
  // at full mouse deflection (desktop only). 0 = off.
  mouseDepthPx: 9,

  clouds: {
    enabled: true,
    wind: { lat: 1.2, lng: 7 },            // world-units / second
    far:  { count: 7, parallax: 1.12, alpha: 0.10, size: 520 },
    near: { count: 5, parallax: 1.40, alpha: 0.13, size: 380 },
    shadowAlpha: 0.11,
    shadowOffset: { x: 26, y: 34 },        // px at scale 1 — sun from upper-left
  },

  ships: { enabled: true },
};

/** Ship archetypes. length is in world units; speed in world units / sec. */
export const SHIP_TYPES = {
  cargo:  { length: 46, beam: 0.20, speed: 9,  hull: '#1b2327', deck: '#2f3b3f', wake: 0.9, containers: true },
  tanker: { length: 54, beam: 0.22, speed: 7,  hull: '#251d1b', deck: '#3d3330', wake: 1.0, containers: false },
  patrol: { length: 26, beam: 0.24, speed: 24, hull: '#20292c', deck: '#3b484c', wake: 1.7, containers: false },
};

/**
 * ROUTES[mapId] = [{ type, closed, speed?, points: [[lat,lng], ...] }]
 *   closed:true  → ship sails the loop forever
 *   closed:false → ship sails there and back (ping-pong)
 */
export const ROUTES = {
  // Traced on the real cinematic-map art: every point (and the smoothed curve
  // between them) was checked to sit on open sea, clear of islands and of the
  // ships already painted into the image.
  global: [
    { type: 'cargo',  closed: false, points: [[822,57],[793,184],[701,224],[598,201],[529,161],[506,69]] },                                   // west sea, runs past the NW islands
    { type: 'patrol', closed: true,  points: [[481,172],[432,293],[363,308],[271,230],[271,126],[334,46],[426,44],[477,92]] },              // circles the SW island
    { type: 'cargo',  closed: false, points: [[1000,1642],[1009,1757],[990,1860]] },                                                         // north-east lane
    { type: 'patrol', closed: true,  points: [[730,1763],[650,1851],[566,1763],[650,1674]] },                                               // circles the east island
  ],
  // Sector maps start empty — record routes with the ` tool so ships only
  // ever sail on the real water of each island image.
  citadel: [], deployments: [], service: [], armory: [], blacksite: [], vault: [],
};
