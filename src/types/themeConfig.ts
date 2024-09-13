import type {
	AvailableLanguage,
	BooleanString,
	InputPosition,
	Loading,
	Mapping,
	Repo,
	Theme,
} from "giscus";
import type { LANGUAGES } from "../i18n.ts";

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface ThemeConfig {
	site: ConfigSite;
	appearance: ConfigAppearance;
	seo: ConfigSEO;
	comment: Partial<ConfigComment>;
	rss: ConfigRSS;
}

export type UserConfig = DeepPartial<ThemeConfig>;

export interface ConfigSite {
	title: string;
	subtitle: string;
	author: string;
	description: string;
	website: string;
	socialLinks: { name: string; href: string }[];
	navLinks: { name: string; href: string }[];
	categoryMap: { name: string; path: string }[];
}

export interface ConfigAppearance {
	theme: "light" | "dark";
	locale: keyof typeof LANGUAGES;
	colorsDark: Colors;
	colorsLight: Colors;

	// TODO: 未实现
	_font?: Fonts;
	_animation?: boolean;
}

export interface ConfigSEO {
	twitter: string;
}

export interface ConfigComment {
	disqus: Disqus;
	giscus: Giscus;
	twikoo: Twikoo;
}

export interface ConfigRSS {
	// TODO: 未实现
	_fullText?: boolean;
	// https://github.com/RSSNext/follow
	_follow?: { feedId: string; userId: string };
}

interface Colors {
	foreground: string;
	background: string;
}

interface Fonts {
	header: string;
	article: string;
	code: string;
	ui: string;
}

interface Twikoo {
	envId: string;
	region?: string;
	lang?: string;
}

interface Disqus {
	shortname: string;
}

interface Giscus {
	repo: Repo;
	repoId?: string;
	category?: string;
	categoryId?: string;
	mapping?: Mapping;
	term?: string;
	strict: BooleanString;
	reactionsEnabled: BooleanString;
	emitMetadata: BooleanString;
	inputPosition: InputPosition;
	theme: Theme;
	lang: AvailableLanguage;
	loading: Loading;
}
