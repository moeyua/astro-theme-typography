import type { UserConfig } from '~/types'

export const userConfig: Partial<UserConfig> = {
  // Override the default config here
  site: {
    title: 'Panda Home',
    subtitle: '苟利国家生死以，岂因祸福避趋之',
    author: 'OldPanda',
    // description: '苟利国家生死以，岂因祸福避趋之',
    website: 'https://old-panda.com/',
    pageSize: 5,
    socialLinks: [
      {
        name: 'rss',
        href: '/atom.xml',
      },
      {
        name: 'github',
        href: 'https://github.com/OldPanda',
      },
      {
        name: 'twitter',
        href: 'https://x.com/OldPanda',
      },
      {
        name: 'mastodon',
        href: 'https://mastodon.social/@oldpanda',
      },
      {
        name: 'sinaweibo',
        href: 'https://weibo.com/u/1199303274',
      },
      {
        name: 'xiaohongshu',
        href: 'https://www.xiaohongshu.com/user/profile/61c8ec33000000001000be5c',
      },
      {
        name: 'bluesky',
        href: 'https://bsky.app/profile/oldpanda.bsky.social',
      }
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
      {
        name: 'Links',
        href: '/links',
      },
    ],
    categoryMap: [{ name: '胡适', path: 'hu-shi' }],
    footer: [
      '© %year <a target="_blank" href="%website">%author</a>',
      'Theme <a target="_blank" href="https://github.com/Moeyua/astro-theme-typography">Typography</a> by <a target="_blank" href="https://moeyua.com">Moeyua</a>',
      'Proudly published with <a target="_blank" href="https://astro.build/">Astro</a>',
    ],
  },
  seo: { twitter: "@OldPanda" },
}
