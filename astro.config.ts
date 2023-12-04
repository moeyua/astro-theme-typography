import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-theme-typography.vercel.app',
  redirects: {
    '/': '/home/1',
    '/home': '/home/1'
  },
  integrations: [
    UnoCSS({
      injectReset: true
    }),
  ],
});
