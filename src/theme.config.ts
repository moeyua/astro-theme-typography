export const THEME_CONFIG: App.Locals['config'] = {
  /** blog title */
  title: "活版印字",
  /** your name */
  author: "Typography",
  /** website description */
  desc: "Rediscory the beauty of typography",
  /** your deployed domain */
  website: "https://astro-theme-typography.vercel.app/",
  /** your locale */
  locale: "en-us",
  /** theme style */
  themeStyle: "light",
  /** your socials */
  socials: [
    {
      name: "github",
      href: "https://github.com/suzulang",
    },
    {
      name: "rss",
      href: "/atom.xml",
    },
    {
      name: "twitter",
      href: "https://github.com/tianpeicool",
    }
  ],
  /** your header info */
  header: {
    twitter: "@moeyua13",
  },
  /** your navigation links */
  navs: [
    {
      name: "文章",
      href: "/posts/page/1",
    },
    {
      name: "归档",
      href: "/archive",
    },
    {
      name: "分类",
      href: "/categories"
    },
    {
      name: "关于",
      href: "/about",
    },
  ],
  /** your category name mapping, which the `path` will be shown in the url */
  category_map: [
    {name: "胡适", path: "hu-shi"},
  ]
}

