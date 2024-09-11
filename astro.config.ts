import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import { config } from "./src/.config";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: config.website,
  prefetch: true,
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      langs: [],
      wrap: true,
    },
  },
  integrations: [
    UnoCSS({
      injectReset: true
    }),
    robotsTxt(),
    sitemap(),
    mdx()
  ]
});
