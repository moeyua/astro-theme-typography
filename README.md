# Typography

<p align='center'>
  <img src='./public/typograph-og.jpg' alt='Typography' width='600'/>
</p>

<h6 align='center'>
<a href="https://astro-theme-typography.vercel.app/">Live Demo</a>
</h6>

<h5 align='center'>
<b>This work is rewrite from <a href="https://github.com/sumimakito/hexo-theme-typography">hexo-theme-Typography</a></b>
</h5>

<p align='center'>
English | <b><a href="./README.zh-CN.md">简体中文</a></b>
</p>

## Features

- Build with **TypeScript** and **UnoCSS**
- **Fast**. 100% [Pagespeed Score](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop).
- **Typography** Derived from prevalent Chinese typographic norms and aims to provide an enhanced reading experience for website visitors.
- **Responsive**. Responsive and works well on all screen sizes.
- **Accessible**. A well thought out semantic and accessible content.
- **SEO friendly**.Open Graph and Twitter Cards support for a better social sharing experience.
- **Sitemap** and **RSS feed** for search engines.
- i18n support.
- Dark mode support.

## Demo

- [Live Demo](https://astro-theme-typography.vercel.app/)
- [My Blog](https://blog.moeyua.com/)

## Getting Started

Typography is a minimal, responsive and SEO-friendly Astro blog theme. This guide will help you get started with a new project. 

### Quick Start

You can easily create a new project by licking the below button.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmoeyua%2Fastro-theme-typography)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fmoeyua%2Fastro-theme-typography)

Or, you can deploy it by create a repo from this template.

[Click here to create a repo from this template on GitHub.](https://github.com/new?template_name=astro-theme-typography&template_owner=moeyua)

### Add content

You can add content by creating a new markdown file in `src/content/posts`. The file need metadata in the frontmatter, like this:

```md
---
title: title
pubDate: 2021-08-01
categories: ['article']
description: 'description'
---
```

Or, you can use the following command in your terminal to create a new post:

```bash
pnpm new-post
```

## Updating the theme

You can update the theme by running by running the following command in your terminal:
  
```bash
pnpm update-theme
```

## Customization

Typography is highly customizable. The config file is in [src/theme.config.ts](src/theme.config.ts)

### Social links

Typography has built-in support for adding links to your social media accounts to the site via the social option in the config file:

```ts
export const THEME_CONFIG: App.Locals['config'] = {
  socials: [
    {
      name: "github",
      href: "https://github.com/moeyua/astro-theme-typography"
    }
    ...
  ]
}
```

The name is the icon name in [Material Design Icons](https://pictogrammers.com/library/mdi/),
which will be automatically generated as the icon.

### Navigation links

By default, the navigation are `Posts`, `Archive`, `Categories` and `About`. You can add more in the config file:

```ts
export const THEME_CONFIG: App.Locals['config'] = {
  navs: [
    {
      name: "Categories",
      href: "/categories"
    }
    ...
  ]
}
```

And then add the corresponding page in `src/pages`, see more in [Astro Pages](https://docs.astro.build/en/core-concepts/astro-pages/)

### Dark mode

Typography supports dark mode. You can change it in the config file:

```ts
export const THEME_CONFIG: App.Locals['config'] = {
  themeStyle: 'dart' // 'light' | 'dark'
}
```


### Internationalization (i18n)

Typography provides built-in support for multilingual sites. By default, the language is `en-us`, you can change it in the config file:

```ts
export const THEME_CONFIG: App.Locals['config'] = {
  locale: "zh-cn"
}
```

For now, Typography supports below languages:

- `en-us`
- `zh-cn`
- `zh-tw`
- `ja-jp`

You can see all supported languages in [src/i18n.ts](src/i18n.ts), and add more if you need.

## Pagespeed Score

[![Pagespeed Score](https://github.com/moeyua/astro-theme-typography/assets/45156493/2272f576-d6ff-49ef-a294-5c2acf365907)](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)

## TODO 

- [ ] WebSub
- [ ] comment
- [ ] search
- [ ] analytics
