import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import { THEME_CONFIG } from "./src/theme.config";


import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: THEME_CONFIG.website,
  redirects: {
    '/': '/home/1',
    '/home': '/home/1'
  },
  integrations: [
    UnoCSS({
      injectReset: true
    }),
    robotsTxt()
  ]
});
