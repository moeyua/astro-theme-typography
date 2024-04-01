export const THEME_CONFIG: App.Locals['config'] = {
  /** blog title */
  title: "人生現役",
  /** your name */
  author: "",
  /** website description */
  desc: "Rediscory the beauty of typography",
  /** your deployed domain */
  website: "https://astro-theme-typography.vercel.app/",
  /** your locale */
  locale: "zh-cn",
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
      href: "https://twitter.com/tianpeicool",
    }
  ],
  /** your header info */
  header: {
    twitter: "@tianpeicool",
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
    {name: "胡适", path: "hu-shi"},
  ],

}

