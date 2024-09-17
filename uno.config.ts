import transformerDirectives from "@unocss/transformer-directives";
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
} from "unocss";
import { themeConfig } from "./src/.config";

const { theme, colorsDark, colorsLight, fonts } = themeConfig.appearance;

const colors = theme === "dark" ? colorsDark : colorsLight;

const cssExtend = {
	":root": {
		"--un-prose-borders": "#eee",
	},

	"code::before,code::after": {
		content: "none",
	},

	":where(:not(pre):not(a) > code)": {
		padding: "2px 4px",
		color: "#c7254e",
		"font-size": "90%",
		"background-color": "#f9f2f4",
		"border-radius": "4px",
	},
};

export default defineConfig({
	presets: [
		presetUno(),
		presetTypography({ cssExtend }),
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
