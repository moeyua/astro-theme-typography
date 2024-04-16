export const THEME_CONFIG: App.Locals["config"] = {
  /** blog title */
  title: "分布式代码",
  /** your name */
  author: "LR.Snow",
  /** website description */
  desc: "记录我的无聊生活",
  /** your deployed domain */
  website: "https://distributed.codes/",
  /** your locale */
  locale: "zh-cn",
  /** theme style */
  themeStyle: "light",
  /** your socials */
  socials: [
    {
      name: "github",
      href: "https://github.com/lrsnowx",
    },
    {
      name: "twitter",
      href: "https://x.com/lrsnowx",
    },
    {
      name: "rss",
      href: "/atom.xml",
    },
  ],
  /** your header info */
  header: {
    twitter: "@lrsnowx",
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
      href: "/categories",
    },
    {
      name: "About",
      href: "/about",
    },
  ],
  /** your category name mapping, which the `path` will be shown in the url */
  category_map: [{ name: "生活", path: "sheng-huo" }],
  /** your comment provider */
  comments: {
    // disqus: {
    //   shortname: "typography-astro",
    // },
    giscus: {
      repo: 'lrsnowx/lrsnowx.github.io',
      repoId: 'R_kgDOLqrttA',
      category: 'General',
      categoryId: 'DIC_kwDOLqrttM4Cef6d',
      mapping: 'og:title',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '1',
      inputPosition: 'top',
      theme: 'light_protanopia',
      lang: 'zh-CN',
      loading: 'lazy',
    },
    // twikoo: {
    //   envId: "https://twikoo-tau-flame.vercel.app",
    // }
  },
};
