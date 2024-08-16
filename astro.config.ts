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
    UnoCSS(),
    robotsTxt(),
    sitemap(),
    mdx()
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          // 合并 JavaScript 为一个文件
          manualChunks: () => 'bundle.js',
          entryFileNames: 'index.js', // 這個設定可以改成任意名稱，但不一定能夠合并所有 JavaScript。
          chunkFileNames: false, // 如果設置為 `false`，則會將所有 JavaScript 合并到一個文件中
          assetFileNames: 'asset.[ext]',
        },
      },
    },
  }
});