# astro-theme-Typography

This work is rewrite from [hexo-theme-Typography](https://github.com/sumimakito/hexo-theme-typography).

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)

## Live Demo
https://blog.moeyua.com/

https://astro-theme-typography.vercel.app/

## Pagespeed Score

[![Pagespeed Score](https://github.com/moeyua/astro-theme-typography/assets/45156493/2272f576-d6ff-49ef-a294-5c2acf365907)](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)

## Deploy

You can instantly clone this to your GitHub and deploy the site by clicking the below buttons to deploy to your chosen providers!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmoeyua%2Fastro-theme-typography)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fmoeyua%2Fastro-theme-typography)

also, you can deploy it by create a repo from this template.

## TODO
- [x] archive
- [x] category
- [x] pagination
- [x] config file
- [x] responsive
- [x] seo
- [x] i18n
- [x] robots.txt
- [x] sitemap
- [x] rss
  - [ ] WebSub
- [ ] new post command
- [ ] dark mode
- [ ] comment
- [ ] search
- [ ] analytics

## Config
You can config the theme in [src/theme.config.ts](src/theme.config.ts)

```ts
export const THEME_CONFIG: App.Locals['config'] = {
  /** your blog title */
  title: "Typography",
  /** your name */
  author: "Moeyua",
  /** website description */
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  /** your deployed domain, you should also change the site in astro.config.ts */
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

```

## i18n
You can add language in [src/i18n](src/i18n.ts)

```ts
export const LANGUAGES = {
  'en-us': {
    Home: 'Home',
    Posts: 'Posts',
    Categories: 'Categories',
    ...,
  },
  'zh-cn': {
    Home: '首页',
    Posts: '文章',
    Categories: '分类',
    ...,
  },
  ...,
}
```

## Update
You can update the theme by running the following command in your project root directory.

```shell
pnpm update-template
```

and then, fix the conflicts.

## Customize

If you want deep customization, see [Astro docs](https://docs.astro.build/).

