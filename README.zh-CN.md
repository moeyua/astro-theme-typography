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

- 使用 **Astro**、**TypeScript** 和 **UnoCSS** 构建。
- **快速**:100% [Pagespeed Score](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)。
- **排版**: 根据流行的中文排版规范派生出的排版，旨在为网站访客提供更佳的阅读体验。
- **响应式**: 响应式设计，适用于所有屏幕尺寸。
- **易访问**: 深思熟虑的语义和易访问内容。
- **SEO 友好**: 支持 **Open Graph** 和 **Twitter Cards**，提供更好的社交分享体验。
- 为搜索引擎提供 **站点地图** 和 **RSS** 订阅。
- 支持 i18n 国际化。
- 支持 Disqus、Giscus、Twikoo 作为评论服务。
- 支持暗色模式。

## Demo

> 提交一个 PR 来添加你的博客 Demo。

- [Live Demo](https://astro-theme-typography.vercel.app/)
- [My Blog](https://blog.moeyua.com/)
- [Julyfun's Blog (用 `bun` 光速搭建这样一个带域名博客)](https://julyfun.fun/posts/%E5%85%89%E9%80%9F%E6%90%AD%E5%BB%BA%E8%BF%99%E6%A0%B7%E4%B8%80%E4%B8%AA%E5%8D%9A%E5%AE%A2/)
- [Jinx's Blog](https://blog.mytest.cc/)
- [不那么正经的读书笔记](https://books.beyondxin.top/)

## 开始使用

这是一个轻巧、响应式设计且对 SEO 友好的 Astro 博客主题。本指南将帮助您开始一个新项目。

### 快速开始

您可以通过点击右上角的 Fork 按钮，将仓库克隆到你的账号下，点击下面的按钮，选择你刚刚 Fork 的仓库，点击 Import 按钮，即可进入到项目配置页面。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

或者你也可以参考[Astro](https://docs.astro.build/zh-cn/guides/deploy/)的文档，部署到你喜欢的平台。

### 添加文章

您可以通过在 `src/content/posts`中创建一个新的文件来添加内容。该文件需要前面的元数据，如下所示：

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
pnpm theme:create
```

## 更新主题

您只需在自己 Fork 的项目上 [`Sync Fork`](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) 即可（不要点击 Discard Changes，否则会丢失你自己的更改）。

## 定制化

「活版印字」主题是高度可定制的。默认配置文件为 [src/.config/default.ts](src/.config/default.ts)，您可以根据需要在 [src/.config/user.ts](src/.config/user.ts) 中覆盖默认配置。

### 社交链接

「活版印字」主题内置支持通过配置文件中的社交选项将指向您的社交媒体帐户的链接添加到网站：

```ts
socials: [
  {
    name: 'github',
    href: 'https://github.com/moeyua/astro-theme-typography'
  }
]
```

字段 `name` 是 [Material Design Icons](https://pictogrammers.com/library/mdi/) 中的图标名称，将自动生成为图标。

> 请注意，您需要重新启动开发服务器才能看到更改。

### 导航链接

默认情况下，导航是「文章」、「归档」、「分类」和「关于」。您可以在配置文件中添加更多内容：

```ts
navs: [
  {
    name: 'Categories',
    href: '/categories'
  }
]
```

然后在`src/page`中添加相应的页面，在 [Astro Pages](https://docs.astro.build/en/core-concepts/astro-pages/)中查看更多

### 黑暗模式

「活版印字」主题支持深色模式。您可以在配置文件中更改它：

```ts
themeStyle: 'dark' // 'light' | 'dark' | 'system'
```

### 国际化 (i18n)

「活版印字」主题为多语言站点提供内置支持。默认情况下，语言为'en-us'，您可以在配置文件中更改它：

```ts
locale: 'zh-cn'
```

目前，「活版印字」主题支持以下语言：

- `en-us`
- `zh-cn`
- `zh-tw`
- `ja-jp`

您可以在[src/i18n.ts](src/i18n.ts)中查看所有支持的语言，并根据需要添加更多。

### 评论

「活版印字」主题支持多种评论服务，目前支持 [Disqus](https://disqus.com/)、[Giscus](https://giscus.app/) 和 [Twikoo](https://twikoo.js.org/)。

通过添加配置文件来启用对应的评论服务，填写多个评论服务时，只会按照顺序显示第一个服务。

#### Disqus

在配置文件中添加您的 [Disqus](https://disqus.com/) Shortname：

```ts
{
  comments: {
    disqus: {
      shortname: 'your-disqus-shortname'
    }
  }
}
```

### Giscus

基于 [Giscus web component](https://github.com/giscus/giscus-component?tab=readme-ov-file#using-the-web-component) 实现。

属性名称与 [giscus 网站](https://giscus.app/) 上显示的 data- 属性相同，但以小写形式编写，并删除了 data- 前缀并删除了破折号。

在配置文件中添加您的 [Giscus](https://giscus.app/) 配置：

```ts
{
  comments: {
    giscus: {
      repo: 'moeyua/astro-theme-typography'
      repoId: 'R_kgDOKy9HOQ'
      category: 'General'
      categoryId: 'DIC_kwDOKy9HOc4CegmW'
      mapping: 'title'
      strict: '0'
      reactionsEnabled: '1'
      emitMetadata: '1'
      inputPosition: 'top'
      theme: 'light'
      lang: 'zh-CN'
      loading: 'lazy'
    }
  }
}
```

#### Twikoo

在配置文件中添加您的 [Twikoo](https://twikoo.js.org/) 配置：

```ts
comments: {
  twikoo: {
    envId: 'your-env-id'
  }
}
```

## Pagespeed 分数

[![Pagespeed Score](https://github.com/moeyua/astro-theme-typography/assets/45156493/2272f576-d6ff-49ef-a294-5c2acf365907)](https://pagespeed.web.dev/analysis/https-astro-theme-typography-vercel-app/j34nq9tx0s?form_factor=desktop)

## TODO

- [ ] WebSub
- [x] comment
- [ ] search
- [ ] analytics
