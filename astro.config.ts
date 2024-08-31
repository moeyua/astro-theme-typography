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
          // 不再合并所有 JS 文件为一个文件
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor';
              if (id.includes('@astro')) return 'astro-vendor';
              return 'vendor';
            }
          },
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.css$/.test(name ?? '')) {
              return 'css/[name].[hash][extname]';
            }
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name ?? '')) {
              return 'images/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          },
        },
      },
      // 启用 minification 和 tree-shaking
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    // 启用构建时优化
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  },
  
  // 考虑添加图片优化集成
  // import image from '@astrojs/image';
  // integrations: [
  //   // ... existing integrations ...
  //   image(),
  // ],
});
