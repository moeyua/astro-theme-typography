import type { ThemeConfig } from "~/types";

// export const configDefault: ThemeConfig = {
// 	title: "活版印字",
// 	author: "Typography",
// 	desc: "Rediscory the beauty of typography",
// 	website: "https://astro-theme-typography.vercel.app/",
// 	locale: "en-us",
// 	themeStyle: "light",
// 	socials: [
// 		{
// 			name: "github",
// 			href: "https://github.com/moeyua/astro-theme-typography",
// 		},
// 		{
// 			name: "rss",
// 			href: "/atom.xml",
// 		},
// 		{
// 			name: "twitter",
// 			href: "https://github.com/moeyua/astro-theme-typography",
// 		},
// 		{
// 			name: "mastodon",
// 			href: "https://github.com/moeyua/astro-theme-typography",
// 		},
// 	],
// 	header: {
// 		twitter: "@moeyua13",
// 	},
// 	navs: [
// 		{
// 			name: "Posts",
// 			href: "/posts/page/1",
// 		},
// 		{
// 			name: "Archive",
// 			href: "/archive",
// 		},
// 		{
// 			name: "Categories",
// 			href: "/categories",
// 		},
// 		{
// 			name: "About",
// 			href: "/about",
// 		},
// 	],
// 	category_map: [{ name: "胡适", path: "hu-shi" }],
// 	comments: {
// 		disqus: {
// 			shortname: "typography-astro",
// 		},
// 	},
// };

export const defaultConfig: ThemeConfig = {
	site: {
		title: "活版印字",
		subtitle: "Typography",
		author: "Typography",
		description: "Rediscory the beauty of typography",
		website: "https://astro-theme-typography.vercel.app/",
		socialLinks: [
			{
				name: "github",
				href: "https://github.com/moeyua/astro-theme-typography",
			},
			{
				name: "rss",
				href: "/atom.xml",
			},
			{
				name: "twitter",
				href: "https://github.com/moeyua/astro-theme-typography",
			},
			{
				name: "mastodon",
				href: "https://github.com/moeyua/astro-theme-typography",
			},
		],
		navLinks: [
			{
				name: "Posts",
				href: "/posts/page/1",
			},
			{
				name: "Archive",
				href: "/archive",
			},
			{
				name: "Categories",
				href: "/categories",
			},
			{
				name: "About",
				href: "/about",
			},
		],
		categoryMap: [{ name: "胡适", path: "hu-shi" }],
	},
	appearance: {
		theme: "light",
		locale: "zh-cn",
	},
	seo: {
		twitter: "@moeyua13",
	},
	comment: {
		disqus: {
			shortname: "typography-astro",
		},
	},
	rss: {},
};
