import { defineConfig } from 'vite';

// NOTE: If deploying to https://<user>.github.io/<repo>/ (project page, not a
// user/org root page), set base to '/<repo>/' instead of './'. Using a
// relative base keeps local `vite preview` and most static hosts working
// out of the box without extra config.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: true,
  },
});
