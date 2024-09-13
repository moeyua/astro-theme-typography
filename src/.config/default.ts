import type { ThemeConfig } from "~/types";

// This is the default configuration for the template, please do not modify it directly.
// You can override this configuration in the `.config/user.ts` file.

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
		colorsLight: {
			foreground: "#2e405b",
			background: "#ffffff",
		},
		colorsDark: {
			foreground: "#ffffff",
			background: "#2e405b",
		},
	},
	seo: {
		twitter: "@moeyua13",
	},
	comment: {
		disqus: { shortname: "typography-astro" },
	},
	rss: {},
};
