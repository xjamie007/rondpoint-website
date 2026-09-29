// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Auf GitHub Pages setzt der Workflow SITE_URL und BASE_PATH (z. B. /rondpoint-website).
// Ohne diese Variablen: eigene Domain, Website im Wurzelverzeichnis.
const SITE_URL = process.env.SITE_URL || 'https://www.rondpoint.lu';
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Alles CSS inline: keine render-blockierende Anfrage, schnelleres LCP am Handy
    inlineStylesheets: 'always',
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Fotos der Inserate werden beim Build von den Portalen geholt und in
    // AVIF/WebP umgerechnet. Keine Fotos im Repository (T2.10).
    domains: ['static.prd.luxauto.lu', 'prod.pictures.autoscout24.net'],
  },
  prefetch: false,
  devToolbar: { enabled: false },
});
