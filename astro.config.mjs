// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.rondpoint.lu',
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
