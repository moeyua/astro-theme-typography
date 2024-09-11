import type { CollectionEntry } from "astro:content";
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

export type Post = CollectionEntry<"posts">;

export interface Config {
	title: string;
	author: string;
	desc: string;
	website: string;
	locale: keyof typeof LANGUAGES;
	themeStyle: "light" | "auto" | "dark";
	socials: Array<{
		name: string;
		href: string;
	}>;
	header: {
		twitter: string;
	};
	navs: Array<{
		name: string;
		href: string;
	}>;
	category_map: Array<{
		name: string;
		path: string;
	}>;
	comments?: {
		disqus?: Disqus;
		giscus?: Giscus;
		twikoo?: Twikoo;
	};
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
