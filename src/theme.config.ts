export const THEME_CONFIG: App.Locals['config'] = {
  /** blog title */
  title: "Typography",
  /** your name */
  author: "Moeyua",
  /** website description */
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  /** your deployed domain */
  website: "https://astro-theme-typography.vercel.app/",
  /** your locale */
  locale: "zh-cn",
  /** your socials */
  socials: [
    {
      name: "github",
      href: "https://github.com/moeyua/astro-theme-typography",
    },
    {
      name: "rss",
      href: "/atom.xml",
    },
    {
      name: "twitter",
      href: "https://github.com/moeyua/astro-theme-typography",
    },
    {
      name: "mastodon",
      href: "https://github.com/moeyua/astro-theme-typography",
    }
  ],
  /** your navigation links */
  navs: [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "Archive",
      href: "/archive",
    },
    {
      name: "Categories",
      href: "/categories"
    },
    {
      name: "About",
      href: "/about",
    },
  ]
}

export const LANGUAGES = {
  'zh-cn': {
    share: '分享到',
    prev: '上一页',
    next: '下一页',
    prev_post: '上一篇',
    next_post: '下一篇',
    Home: '首页',
    Albums: '相册',
    Categories: '分类',
    Archive: '归档',
    Tags: '标签',
    About: '关于',
    Links: '链接',
    Comments: '评论',
    posted_at: '发布于',
    TagCount: '%d 篇',
    ArchiveCount: '%d 篇',
    CategoriesCount: '%d 篇',
    PageCount: '共 %d 页',
    PageNumber: '第 %d 页',
  },
  'en-us': {
    share: 'Share',
    prev: 'Previous',
    next: 'Next',
    prev_post: 'Previous post',
    next_post: 'Next post',
    Home: 'Home',
    Albums: 'Albums',
    Categories: 'Categories',
    Archive: 'Archive',
    Tags: 'Tags',
    About: 'About',
    Links: 'Links',
    Comments: 'Comments',
    posted_at: 'Posted at',
    TagCount: '%d tags',
    ArchiveCount: '%d post',
    CategoriesCount: '%d post',
    PageCount: '%d',
    PageNumber: 'Page %d',
  }
}

