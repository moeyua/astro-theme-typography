export const THEME_CONFIG: App.Locals['config'] = {
  /** blog title */
  title: "喵墨 - 猫爪摹渺生",
  /** your name */
  author: "Nekoink",
  /** website description */
  desc: "Writing Stories with Ink on Cat’s Claws.",
  /** your deployed domain */
  website: "https://nekoneko.ink/",
  /** your locale */
  locale: "zh-cn",
  /** theme style */
  themeStyle: "dark",
  /** your socials */
  socials: [
    {
      name: "github",
      href: "https://github.com/W-Boat",
    },
    {
      name: "rss",
      href: "/atom.xml",
    }
  ],
  /** your header info */
  header: {
    twitter: "@whiteboatx",
  },
  /** your navigation links */
  navs: [
    {
      name: "Posts",
      href: "/posts/page/1",
    },
    {
      name: "丝竹",
      href: "https://music.nekoneko.ink",
    },
    {
      name: "Archive",
      href: "/archive",
    },
    {
      name: "Categories",
      href: "/categories"
    },
  ],
  /** your category name mapping, which the `path` will be shown in the url */
  category_map: [
    { name: "白舟", path: "boat" },
  ],
  /** your comment provider */
  comments: {
    disqus: {
      // please change this to your disqus shortname
      shortname: "nekoink",
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
    // },
    // twikoo: {
    //   envId: "https://twikoo-tau-flame.vercel.app",
    // }
  }
}

