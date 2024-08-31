import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import { THEME_CONFIG } from "./src/theme.config";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: THEME_CONFIG.website,
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
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          // 合并所有 JS 文件为一个文件
          manualChunks: undefined,
          entryFileNames: 'bundle.js',
          chunkFileNames: 'bundle.js',
          assetFileNames: ({ name }) => {
            if (/\.(js|css)$/.test(name ?? '')) {
              return 'bundle.[ext]';
            }
            return 'assets/[name][extname]';
          },
        },
      },
    },
  }
});
