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
  locale: "en-us",
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
      name: "Posts",
      href: "/posts/page/1",
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
    Home: '首页',
    Posts: '文章',
    Categories: '分类',
    Archive: '归档',
    Tags: '标签',
    About: '关于',
    Links: '链接',

    posted_at: '发布于',
    tag_count: '%d 篇',
    archive_count: '%d 篇',
    categories_count: '%d 篇',
    page_count: '共 %d 页',
    page_number: '第 %d 页',
    all_posts: '所有文章',
    comments: '评论',
    share: '分享到',
    prev: '上一页',
    next: '下一页',
    prev_post: '上一篇',
    next_post: '下一篇',
  },
  'en-us': {
    Home: 'Home',
    Posts: 'Posts',
    Categories: 'Categories',
    Archive: 'Archive',
    Tags: 'Tags',
    About: 'About',
    Links: 'Links',

    posted_at: 'Posted at',
    tag_count: '%d tags',
    archive_count: '%d post',
    categories_count: '%d post',
    page_count: '%d',
    page_number: 'Page %d',
    all_posts: 'All Posts',
    comments: 'comments',
    share: 'Share',
    prev: 'Previous',
    next: 'Next',
    prev_post: 'Previous post',
    next_post: 'Next post',
  }
}

