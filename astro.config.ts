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
          // 强制所有的chunk使用相同的文件名
          manualChunks: null,
          entryFileNames: 'bundle.js',
          chunkFileNames: 'bundle.js',
          assetFileNames: 'bundle.[ext]',
        },
        // 禁用代码拆分
        inlineDynamicImports: true,
      },
    },
  }
});
