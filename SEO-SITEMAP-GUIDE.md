# 网站地图与SEO优化指南

## 概述

本项目已集成自动生成网站地图(Sitemap)功能，用于优化搜索引擎索引和提高网站在搜索结果中的可见性。网站地图是一个XML文件，列出网站上的所有页面，帮助搜索引擎更有效地爬取网站内容。

## 已实现的功能

1. **自动生成网站地图**：使用`@astrojs/sitemap`插件自动生成网站地图
2. **自定义robots.txt**：使用`astro-robots-txt`插件生成robots.txt文件，指向网站地图
3. **SEO元标签优化**：在`themeConfig`中配置SEO相关设置

## 网站地图配置

网站地图配置位于`astro.config.ts`文件中：

```typescript
sitemap({
  filter: (page) => !page.includes('/private/'),  // 排除私有页面
  changefreq: 'weekly',                           // 页面更新频率
  priority: 0.7,                                  // 页面优先级
  lastmod: new Date(),                            // 最后修改日期
  customPages: [                                  // 自定义页面
    `${themeConfig.site.website}`,
    `${themeConfig.site.website}about`,
    `${themeConfig.site.website}archive`,
    `${themeConfig.site.website}categories`,
  ],
})
```

### 配置选项说明

- **filter**: 用于排除不需要包含在网站地图中的页面
- **changefreq**: 页面更新频率，可选值：`always`、`hourly`、`daily`、`weekly`、`monthly`、`yearly`、`never`
- **priority**: 页面优先级，范围0.0到1.0
- **lastmod**: 页面最后修改日期
- **customPages**: 添加自定义页面到网站地图

## robots.txt配置

```typescript
robotsTxt({
  sitemap: true,                                  // 自动添加网站地图链接
  policy: [
    {
      userAgent: '*',                             // 适用于所有搜索引擎
      allow: '/',                                // 允许爬取所有页面
      disallow: ['/admin', '/private'],          // 禁止爬取的页面
      crawlDelay: 10,                            // 爬虫延迟(秒)
    },
  ],
})
```

## SEO配置

SEO配置位于`src/.config/default.ts`文件中：

```typescript
seo: {
  twitter: [],
  meta: [
    { name: 'robots', content: 'index, follow' },  // 允许索引和跟踪链接
  ],
  link: [
    { rel: 'sitemap', href: '/sitemap-index.xml', type: 'application/xml' },  // 网站地图链接
  ],
}
```

## 验证网站地图

部署网站后，可以通过以下URL访问网站地图：

- 网站地图索引：`https://你的网站.com/sitemap-index.xml`
- robots.txt：`https://你的网站.com/robots.txt`

## 提交网站地图到搜索引擎

为了确保搜索引擎能够找到并使用你的网站地图，建议将网站地图提交到各大搜索引擎的站长工具：

1. **Google Search Console**: https://search.google.com/search-console
2. **Bing Webmaster Tools**: https://www.bing.com/webmasters
3. **百度站长平台**: https://ziyuan.baidu.com/site/
4. **搜狗站长平台**: https://zhanzhang.sogou.com/

## 最佳实践

1. 定期检查网站地图是否正确生成
2. 确保重要页面都包含在网站地图中
3. 在页面更新后更新网站地图
4. 使用Google Search Console等工具监控网站在搜索引擎中的表现