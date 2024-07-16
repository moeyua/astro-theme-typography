import type { ThemeConfig, AppearanceConfig, HeaderConfig, ArticleConfig, SidebarConfig, FooterConfig, SEOConfig, PerformanceConfig, MultilanguageConfig, SecurityPrivacyConfig, BackupRestoreConfig } from '../types/config';

const configAppearance: AppearanceConfig = {
  themeColors: {
    primary: '#0055a5',
    secondary: '#ffd700',
    background: '#ffffff'
  },
  fonts: {
    headerFont: 'Georgia',
    bodyFont: 'Arial',
    fontSize: '16px',
    lineHeight: '1.6'
  },
  layout: 'double-column',
  logoUrl: 'path/to/logo.png',
  faviconUrl: 'path/to/favicon.ico',
  backgroundImage: 'path/to/background.jpg'
};

const configHeader: HeaderConfig = {
  menuItems: [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ],
  headerStyle: {
    layout: 'full-width',
    background: 'path/to/header-bg.jpg'
  },
  fixedHeader: true
};

const configArticles: ArticleConfig = {
  displayMode: 'grid',
  summaryLength: 250,
  showDate: true,
  showAuthor: true,
  commentsSystem: 'disqus'
};

const configSidebar: SidebarConfig = {
  position: 'right',
  widgets: [
    { type: 'recentPosts' },
    { type: 'popularPosts' },
    { type: 'tagCloud' },
    {
      type: 'ad',
      content: 'path/to/ad.jpg'
    }
  ]
};

const configFooter: FooterConfig = {
  content: 'Copyright © 2024 Your Blog',
  layout: 'multi-column',
  socialMediaLinks: [
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'Twitter', url: 'https://twitter.com' }
  ]
};

const configSEO: SEOConfig = {
  title: 'My Awesome Blog',
  description: 'This is a blog about awesome things.',
  keywords: ['awesome', 'blog', 'topics'],
  socialSharing: {
    enableButtons: true,
    openGraph: true,
    twitterCards: true
  }
};

const configPerformance: PerformanceConfig = {
  lazyLoading: true,
  optimizeCSSandJS: true,
  enableCaching: true
};

const configMultilanguage: MultilanguageConfig = {
  languages: ['en', 'es', 'de'],
  defaultLanguage: 'en',
  translationFiles: {
    en: 'locales/en.json',
    es: 'locales/es.json',
    de: 'locales/de.json'
  }
};

const configSecurityPrivacy: SecurityPrivacyConfig = {
  sslEnabled: true,
  privacyPolicyUrl: 'https://yourblog.com/privacy-policy',
  cookieNotice: true
};

const configBackupRestore: BackupRestoreConfig = {
  backupThemeSettings: true,
  restoreDefaults: true
};

const config: ThemeConfig = {
  appearance: configAppearance,
  header: configHeader,
  articles: configArticles,
  sidebar: configSidebar,
  footer: configFooter,
  seo: configSEO,
  performance: configPerformance,
  multilanguage: configMultilanguage,
  securityPrivacy: configSecurityPrivacy,
  backupRestore: configBackupRestore,
};

export default config;
