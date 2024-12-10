import type { Link, Meta } from 'astro-seo'
import type {
  AvailableLanguage,
  BooleanString,
  InputPosition,
  Loading,
  Mapping,
  Repo,
  Theme,
} from 'giscus'
import type { LANGUAGES } from '../i18n.ts'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
}

export interface ThemeConfig {
  site: ConfigSite
  appearance: ConfigAppearance
  seo: ConfigSEO
  comment: Partial<ConfigComment>
  rss: ConfigRSS
  analytics: ConfigAnalytics
  latex: ConfigLaTeX
}

export type UserConfig = DeepPartial<ThemeConfig>

export interface ConfigSite {
  title: string
  subtitle: string
  author: string
  description: string
  website: string
  pageSize: number
  socialLinks: { name: string, href: string }[]
  navLinks: { name: string, href: string }[]
  categoryMap: { name: string, path: string }[]
  footer: string[]
}

export interface ConfigAppearance {
  theme: 'light' | 'dark' | 'system'
  locale: keyof typeof LANGUAGES
  colorsDark: Colors
  colorsLight: Colors
  fonts: Fonts
}

export interface ConfigSEO {
  twitter: string
  meta: Partial<Meta>[]
  link: Partial<Link>[]
}

export interface ConfigComment {
  disqus: Disqus
  giscus: Giscus
  twikoo: Twikoo
}

export interface ConfigRSS {
  fullText?: boolean
  /** https://github.com/RSSNext/follow */
  follow?: { feedId: string, userId: string }
}

export interface ConfigAnalytics {
  /** google analytics */
  googleAnalyticsId: string
  umamiAnalyticsId: string
}

export interface ConfigLaTeX {
  katex: boolean
}

interface Colors {
  primary: string
  background: string
}

interface Fonts {
  header: string
  ui: string
  // TODO: 未实现
  _article?: string
  _code?: string
}

interface Twikoo {
  envId: string
  region?: string
  lang?: string
}

interface Disqus {
  shortname: string
}

interface Giscus {
  repo: Repo
  repoId?: string
  category?: string
  categoryId?: string
  mapping?: Mapping
  term?: string
  strict: BooleanString
  reactionsEnabled: BooleanString
  emitMetadata: BooleanString
  inputPosition: InputPosition
  theme: Theme
  lang: AvailableLanguage
  loading: Loading
}
