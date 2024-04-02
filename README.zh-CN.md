# 活版印字

<p align='center'>
  <img src='./public/typograph-og.jpg' alt='Typography' width='600'/>
</p>
<h6 align='center'>
<a href="https://astro-theme-typography.vercel.app/">在线预览</a>
</h6>
<h5 align='center'>
<b>此主题系 Hexo 主题 <a href="https://github.com/sumimakito/hexo-theme-typography">活版印字</a> 在 Astro 平台上的移植版本</b>
</h5>

<p align='center'>
<a href="./README.md">English</a> |<b>简体中文</b>
</p>

## 特性

- 使用 :**TypeScript** 和 **UnoCSS** 构建。
- **快速**:100% [Pagespeed Score](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)。
- **排版**: 根据流行的中文排版规范派生出的排版，旨在为网站访客提供更佳的阅读体验。
- **响应式**: 响应式设计，适用于所有屏幕尺寸。
- **易访问**:深思熟虑的语义和易访问内容。
- **SEO 友好**:支持 Open Graph 和 Twitter Cards，提供更好的社交分享体验。
- 为搜索引擎提供 站点地图 和 RSS 订阅。
- 支持 i18n 国际化。
- 支持暗色模式。

## Demo

> 提交一个 PR 来添加你的博客 Demo。

- [Live Demo](https://astro-theme-typography.vercel.app/)
- [My Blog](https://blog.moeyua.com/)

## 开始使用

这是一个轻巧、响应式设计且对 SEO 友好的 Astro 博客主题。本指南将帮助您开始一个新项目。

### 快速开始


您可以通过点击下面的按钮轻松创建一个新项目。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmoeyua%2Fastro-theme-typography)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fmoeyua%2Fastro-theme-typography)

或者，您可以通过从这个模板创建一个仓库来部署它。

[Click here to create a repo from this template on GitHub.](https://github.com/new?template_name=astro-theme-typography&template_owner=moeyua)

### 添加文章

您可以通过在 `src/content/posts`中创建一个新的降价文件来添加内容。该文件需要前面的元数据，如下所示：

```md
---
title: title
pubDate: 2021-08-01
categories: ['article']
description: 'description'
---
```

或者，您可以在终端中使用以下命令创建新帖子：

```bash
pnpm new-post
```

## 更新主题

您可以通过在终端中运行以下命令来更新主题：

```bash
pnpm update-theme
```

## 定制化

「活版印字」主题是高度可定制的。配置文件在[src/theme.config.ts](src/theme.config.ts)

### 社交链接

「活版印字」主题内置支持通过配置文件中的社交选项将指向您的社交媒体帐户的链接添加到网站：

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

name字段填写对应的社交平台名称，参考 [Material Design Icons](https://pictogrammers.com/library/mdi/),
这将自动生成为图标。

### 导航链接

默认情况下，导航是「文章」、「归档」、「分类」和「关于」。您可以在配置文件中添加更多内容：

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

然后在`src/page`中添加相应的页面，在 [Astro Pages](https://docs.astro.build/en/core-concepts/astro-pages/)中查看更多

### 黑暗模式

「活版印字」主题支持深色模式。您可以在配置文件中更改它：

```ts
export const THEME_CONFIG: App.Locals['config'] = {
  themeStyle: 'dart' // 'light' | 'dark'
}
```


### 国际化 (i18n)

「活版印字」主题为多语言站点提供内置支持。默认情况下，语言为'en-us'，您可以在配置文件中更改它：

```ts
export const THEME_CONFIG: App.Locals['config'] = {
  locale: "zh-cn"
}
```

目前，「活版印字」主题支持以下语言：
- `en-us`
- `zh-cn`
- `zh-tw`
- `ja-jp`

您可以在[src/i18n.ts](src/i18n.ts)中查看所有支持的语言，并根据需要添加更多。

## Pagespeed 分数

[![Pagespeed Score](https://github.com/moeyua/astro-theme-typography/assets/45156493/2272f576-d6ff-49ef-a294-5c2acf365907)](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)

## TODO 

- [ ] WebSub
- [ ] comment
- [ ] search
- [ ] analytics
