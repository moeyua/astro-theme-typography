import type { ThemeConfig } from '~/types'

// This is the default configuration for the template, please do not modify it directly.
// You can override this configuration in the `.config/user.ts` file.

export const defaultConfig: ThemeConfig = {
  site: {
    title: '深霧遠東通訊所',
    subtitle: 'DeepFog Blog',
    author: '焘',
    description: 'The best way to predict the future is to create it.',
    website: 'https://deepfog.top/',
    pageSize: 5,
    socialLinks: [
      {
        name: 'github',
        href: 'https://github.com/DeepFog-ORG',
      },
      {
        name: 'email-fast',
        href: 'mailto:deepf0g@icloud.com',
      },
      {
        name: 'rss',
        href: '/atom.xml',
      },
      //{
        //name: 'twitter',
        //href: 'https://github.com/moeyua/astro-theme-typography',
      //},
      //{
        //name: 'mastodon',
        //href: 'https://github.com/moeyua/astro-theme-typography',
      //},
    ],
    navLinks: [
      {
        name: 'Posts',
        href: '/',
      },
      {
        name: 'Archive',
        href: '/archive',
      },
      {
        name: 'Categories',
        href: '/categories',
      },
      {
        name: 'About',
        href: '/about',
      },
    ],
    categoryMap: [{ name: '胡适', path: 'hu-shi' }],
    footer: [
      '© %year <a target="_blank" href="%website">%author</a>',
      'Theme <a target="_blank" href="https://github.com/Moeyua/astro-theme-typography">Typography</a> by <a target="_blank" href="https://moeyua.com">Moeyua</a>',
      'Proudly published with <a target="_blank" href="https://astro.build/">Astro</a>',
    ],
  },
  appearance: {
    theme: 'system',
    locale: 'zh-cn',
    colorsLight: {
      primary: '#2e405b',
      background: '#ffffff',
    },
    colorsDark: {
      primary: '#FFFFFF',
      background: '#232222',
    },
    fonts: {
      header:
        '"HiraMinProN-W6","Source Han Serif CN","Source Han Serif SC","Source Han Serif TC",serif',
      ui: '"Source Sans Pro","Roboto","Helvetica","Helvetica Neue","Source Han Sans SC","Source Han Sans TC","PingFang SC","PingFang HK","PingFang TC",sans-serif',
    },
  },
  seo: {
    twitter: ['@deepfog'],
    meta: [
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { name: 'revisit-after', content: '7 days' },
      { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'bingbot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    ],
    link: [
      { rel: 'sitemap', href: '/sitemap-index.xml', type: 'application/xml' },
      { rel: 'canonical', href: 'https://deepfog.top/' },
    ],
    jsonLd: [
      // 网站信息的结构化数据
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '深霧遠東通訊所',
        url: 'https://deepfog.top/',
        description: 'The best way to predict the future is to create it.',
        inLanguage: 'zh-CN',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://deepfog.top/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      // 组织/个人信息的结构化数据
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: '焘',
        url: 'https://deepfog.top/',
        sameAs: [
          'https://github.com/DeepFog-ORG'
        ]
      },
      // 博客信息的结构化数据
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: '深霧遠東通訊所',
        url: 'https://deepfog.top/',
        description: 'The best way to predict the future is to create it.',
        publisher: {
          '@type': 'Person',
          name: '焘',
          url: 'https://deepfog.top/'
        }
      }
    ],
  },
  rss: {
    fullText: true,
  },
  comment: {
    // disqus: { shortname: "typography-astro" },
  },
  analytics: {
    googleAnalyticsId: '',
    umamiAnalyticsId: '',
  },
  latex: {
    katex: true,
  },
}
