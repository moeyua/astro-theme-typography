export const THEME_CONFIG: App.Locals['config'] = {
  /** blog title */
  title: "梅花易博客",
  /** your name */
  author: "梅花易",
  /** website description */
  desc: "欢迎来到梅花易博客！这是一个个人博客，记录生活点滴与成长足迹，同时分享我对易经的热爱与研究心得。作为一名易学爱好者，我在这里探讨中华传统文化中的智慧与奥秘，提供深入浅出的易经解读和实用的生活建议。无论您是对易学感兴趣，还是希望了解我的生活故事，梅花易博客都将带给您丰富的内容与独特的视角。",
  /** your deployed domain */
  website: "https://astro-theme-typography-sage.vercel.app/",
  /** your locale */
  locale: "zh-cn",
  /** theme style */
  themeStyle: "auto",
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
  ],
  /** your header info */
  header: {
    // twitter: "@moeyua13",
  },
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
  ],
  /** your category name mapping, which the `path` will be shown in the url */
  category_map: [
    { name: "胡适", path: "hu-shi" },
  ],
  /** your comment provider */
  comments: {
    // disqus: {
    //   // please change this to your disqus shortname
    //   shortname: "typography-astro",
    // },
    // giscus: {
    //   repo: 'moeyua/astro-theme-typography',
    //   repoId: 'R_kgDOKy9HOQ',
    //   category: 'General',
    //   categoryId: 'DIC_kwDOKy9HOc4CegmW',
    //   mapping: 'title',
    //   strict: '0',
    //   reactionsEnabled: '1',
    //   emitMetadata: '1',
    //   inputPosition: 'top',
    //   theme: 'light',
    //   lang: 'zh-CN',
    //   loading: 'lazy',
    // },
    // twikoo: {
    //   envId: "https://twikoo-tau-flame.vercel.app",
    // }
  }
}

