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
<<<<<<< HEAD
    // disqus: {
    //   shortname: "typography-astro",
=======
    disqus: {
      // please change this to your disqus shortname
      shortname: "typography-astro",
    },
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
>>>>>>> e521601dd92f1328d6e6ab2b8bac44187eb0c884
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
