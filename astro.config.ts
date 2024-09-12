import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import { themeConfig } from "./src/.config";

// https://astro.build/config
export default defineConfig({
	site: themeConfig.site.website,
	prefetch: true,
	markdown: {
		shikiConfig: {
			theme: "one-dark-pro",
			langs: [],
			wrap: true,
		},
	},
	integrations: [
		UnoCSS({
			injectReset: true,
		}),
		robotsTxt(),
		sitemap(),
		mdx(),
	],
});
