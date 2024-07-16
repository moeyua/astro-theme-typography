export interface ThemeColors {
  /** 整个博客中使用的主要颜色，用于标题和按钮等元素 */
  primary: string;
  /** 用于点缀和次级元素的副色 */
  secondary: string;
  /** 博客的背景色 */
  background: string;
}

/** 表示字体样式设置 */
export interface Fonts {
  /** 标题使用的字体 */
  headerFont: string;
  /** 正文使用的字体 */
  bodyFont: string;
  /** 文本的基础字体大小 */
  fontSize: string;
  /** 文本的行高 */
  lineHeight: string;
}

/** 博客外观的整体配置 */
export interface AppearanceConfig {
  /** 主题颜色配置 */
  themeColors: ThemeColors;
  /** 博客中使用的字体配置 */
  fonts: Fonts;
  /** 博客的布局类型，例如单栏、双栏或三栏 */
  layout: 'single-column' | 'double-column' | 'triple-column';
  /** 博客Logo图片的URL */
  logoUrl: string;
  /** 博客Favicon的URL */
  faviconUrl: string;
  /** 博客背景的URL或颜色 */
  backgroundImage: string;
}

/** 导航菜单项 */
export interface MenuItem {
  /** 菜单项的显示名称 */
  name: string;
  /** 菜单项指向的URL */
  url: string;
}

/** 博客头部和导航的配置 */
export interface HeaderConfig {
  /** 导航的菜单项列表 */
  menuItems: MenuItem[];
  /** 头部样式设置，包括布局和背景属性 */
  headerStyle: {
    layout: string;
    background: string;
  };
  /** 是否将头部固定在视口的顶部 */
  fixedHeader: boolean;
}

/** 文章和页面显示的配置 */
export interface ArticleConfig {
  /** 显示文章的模式，例如列表、网格 */
  displayMode: 'list' | 'grid' | 'card';
  /** 文章摘要的长度 */
  summaryLength: number;
  /** 是否显示发布日期 */
  showDate: boolean;
  /** 是否显示作者信息 */
  showAuthor: boolean;
  /** 启用的评论系统类型 */
  commentsSystem: 'disqus' | 'builtin' | 'none';
}

/** 侧边栏或页脚中的小部件 */
export interface Widget {
  /** 小部件的类型，例如最近文章、社交链接 */
  type: 'recentPosts' | 'popularPosts' | 'tagCloud' | 'socialLinks' | 'ad';
  /** 用于广告的内容 */
  content?: string;
}

/** 侧边栏的配置 */
export interface SidebarConfig {
  /** 侧边栏的位置，左侧、右侧或无 */
  position: 'left' | 'right' | 'none';
  /** 配置在侧边栏中的小部件列表 */
  widgets: Widget[];
}

/** 页脚设置 */
export interface FooterConfig {
  /** 页脚的内容，例如版权信息 */
  content: string;
  /** 页脚的布局，单栏或多栏 */
  layout: 'single-column' | 'multi-column';
  /** 页脚中的社交媒体链接 */
  socialMediaLinks: { name: string; url: string; }[];
}

/** SEO 和社交分享设置 */
export interface SEOConfig {
  /** 网站标题 */
  title: string;
  /** 网站描述 */
  description: string;
  /** 关键词列表 */
  keywords: string[];
  /** 社交分享按钮设置 */
  socialSharing: {
    enableButtons: boolean;
    openGraph: boolean;
    twitterCards: boolean;
  };
}

/** 性能优化设置 */
export interface PerformanceConfig {
  /** 图片懒加载 */
  lazyLoading: boolean;
  /** CSS 和 JS 的优化，压缩和合并 */
  optimizeCSSandJS: boolean;
  /** 页面缓存启用或禁用 */
  enableCaching: boolean;
}

/** 多语言支持设置 */
export interface MultilanguageConfig {
  /** 支持的语言列表 */
  languages: string[];
  /** 默认语言 */
  defaultLanguage: string;
  /** 翻译文件的路径，按语言分类 */
  translationFiles: { [key: string]: string };
}

/** 安全和隐私设置 */
export interface SecurityPrivacyConfig {
  /** SSL 支持启用或禁用 */
  sslEnabled: boolean;
  /** 隐私政策页面的链接 */
  privacyPolicyUrl: string;
  /** Cookie 通知条启用或禁用 */
  cookieNotice: boolean;
}

/** 备份和恢复设置 */
export interface BackupRestoreConfig {
  /** 是否启用主题设置备份 */
  backupThemeSettings: boolean;
  /** 恢复到默认主题设置 */
  restoreDefaults: boolean;
}

/** 博客主题的完整配置对象 */
export interface ThemeConfig {
  appearance: AppearanceConfig;
  header: HeaderConfig;
  articles: ArticleConfig;
  sidebar: SidebarConfig;
  footer: FooterConfig;
  seo: SEOConfig;
  performance: PerformanceConfig;
  multilanguage: MultilanguageConfig;
  securityPrivacy: SecurityPrivacyConfig;
  backupRestore: BackupRestoreConfig;
}
