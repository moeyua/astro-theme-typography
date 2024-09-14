import transformerDirectives from "@unocss/transformer-directives";
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
} from "unocss";
import { themeConfig } from "./src/.config";

const { theme, colorsDark, colorsLight, fonts } = themeConfig.appearance;

const colors = theme === "dark" ? colorsDark : colorsLight;

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify({ nonValuedAttribute: true }),
		presetIcons({ scale: 1.2, warn: true }),
	],
	theme: {
		colors,
		fontFamily: fonts,
	},
	shortcuts: [
		["icon", "inline-block "],
		["post-title", "text-5 font-bold lh-7.5 m-0"],
	],
	transformers: [transformerDirectives()],
	safelist: [
		...themeConfig.site.socialLinks.map((social) => `i-mdi-${social.name}`),
		"i-mdi-content-copy",
		"i-mdi-check",
	],
});
