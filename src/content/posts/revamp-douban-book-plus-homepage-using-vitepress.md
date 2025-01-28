---
title: 用 VitePress 重写 Douban Book+ 主页
pubDate: 2023-08-27 20:12 PST
categories: ["聊聊技术"]
tags: Vue.js, VitePress, Douban Book+, 插件
heroImage: /images/blog/douban-book-plus-homepage.png
---

> 新地址： [https://doubanbook.plus/](https://doubanbook.plus/)
>
> 项目已开源： [https://github.com/OldPanda/douban-book-plus-homepage](https://github.com/OldPanda/douban-book-plus-homepage)

虽然之前已经用 [Bootstrap 库](https://getbootstrap.com/)为 Douban Book+ 插件写了一个简单的 HTML 页面，放在了这个博客域名下 `https://old-panda.com/douban-book-plus.html` ，但总觉得还是比较草台班子。最近了解到了 [VitePress](https://vitepress.dev/) 这个项目，就决定趁这个周末重新造一个。

在重写的过程中，由于 VitePress 自带默认主题无法完全满足我的需求，同时也因为自身前端知识储备不足，因此在页面的设计编写上花费了不少工夫，比如自定义字体，首页布局的内容扩展，甚至寻找好看的 SVG 图案等等，写这篇文章的主要目的是记录这些过程和结果，便于以后查找。

<figure>

<table><tbody><tr><td><strong>内容</strong></td><td><strong>相关资料</strong></td><td><strong>代码示例</strong></td></tr><tr><td>自定义字体</td><td><a href="https://vitepress.dev/guide/extending-default-theme#using-different-fonts" target="_blank" rel="noopener" title="">官网文档</a></td><td><a href="https://github.com/OldPanda/douban-book-plus-homepage/blob/master/docs/.vitepress/theme/custom.css" target="_blank" rel="noopener" title="">CSS 部分</a><br><a href="https://github.com/OldPanda/douban-book-plus-homepage/blob/master/docs/.vitepress/config.mts#L40-L47" target="_blank" rel="noopener" title="">字体资源部分</a></td></tr><tr><td>自定义顶端图片大小及渐变效果</td><td><a href="https://vitepress.dev/guide/extending-default-theme#layout-slots" target="_blank" rel="noopener" title="">官网文档</a></td><td><a href="https://github.com/OldPanda/douban-book-plus-homepage/blob/master/docs/.vitepress/theme/DoubanBookPlusLayout.vue" target="_blank" rel="noopener" title="">Layout 定义</a><br><a href="https://github.com/OldPanda/douban-book-plus-homepage/blob/master/docs/.vitepress/theme/index.ts#L10" target="_blank" rel="noopener" title="">自定义 Layout 的使用</a></td></tr><tr><td>Chrome ， Edge ，火狐浏览器 SVG 格式 logo 的收集</td><td><a href="https://simpleicons.org/" target="_blank" rel="noopener" title="">Simple Icon</a></td><td></td></tr><tr><td>默认主题主页布局的扩展</td><td></td><td><a href="https://github.com/OldPanda/douban-book-plus-homepage/tree/master/docs/.vitepress/theme/components" target="_blank" rel="noopener" title="">自定义 Vue 组件的声明</a><br><a href="https://github.com/OldPanda/douban-book-plus-homepage/blob/master/docs/.vitepress/theme/index.ts#L11-L15" target="_blank" rel="noopener" title="">自定义 Vue 组件的注册</a><br><a href="https://github.com/OldPanda/douban-book-plus-homepage/blob/master/docs/index.md?plain=1#L31-L33" target="_blank" rel="noopener" title="">自定义 Vue 组件的使用</a></td></tr><tr><td>适配不同浏览器窗口大小</td><td><a href="https://www.w3schools.com/cssref/css3_pr_mediaquery.php" target="_blank" rel="noopener" title="">W3School</a></td><td><a href="https://github.com/OldPanda/douban-book-plus-homepage/blob/master/docs/.vitepress/theme/components/Vendors.vue#L59" target="_blank" rel="noopener" title="">CSS 代码</a></td></tr><tr><td>关闭黑暗模式</td><td><a href="https://vitepress.dev/reference/site-config#appearance" target="_blank" rel="noopener" title="">官网文档</a></td><td><a href="https://github.com/OldPanda/douban-book-plus-homepage/blob/master/docs/.vitepress/config.mts#L37" target="_blank" rel="noopener" title="">设置文件</a></td></tr></tbody></table>

<figcaption>

比较花力气的活

</figcaption>



</figure>

项目部署在了 [Cloudflare Pages](https://pages.cloudflare.com/) 上，主要是图一个方便省心。

最后一点儿辞旧迎新的工作是把旧的页面自动跳转到新的主页上，这通过一行 HTML 很容易做到，

```html
<meta http-equiv="Refresh" content="0; url='https://douban-book-plus-homepage.pages.dev'" />
```

具体可以参考[这里](https://www.w3docs.com/snippets/html/how-to-redirect-a-web-page-in-html.html)。
