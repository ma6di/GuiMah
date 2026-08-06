import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Relative base so the build works on any host, including a GitHub Pages
  // subpath (user.github.io/repo) rather than only at a domain root.
  base: './',

  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Each HTML page needs an entry — Vite is single-page by default and would
      // otherwise build only the first input and silently drop the rest.
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        flewi: resolve(__dirname, 'flewi.html'),
        impressum: resolve(__dirname, 'impressum.html'),
        datenschutz: resolve(__dirname, 'datenschutz.html'),
      },
    },
  },
});
