import transformerDirectives from "@unocss/transformer-directives";
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
} from "unocss";
import { config } from "./src/.config";

const { socials, themeStyle } = config;

let foreground = "#2e405b";
let background = "#ffffff";

if (themeStyle === "dark") {
	foreground = "#ffffff";
	background = "#2e405b";
}

export default defineConfig({
	presets: [
		presetUno({
			dark: themeStyle === "auto" ? "media" : "class",
		}),
		presetAttributify({ nonValuedAttribute: true }),
		presetIcons({
			scale: 1.2,
			warn: true,
		}),
	],
	theme: {
		colors: {
			foreground,
			background,
		},
		fontFamily: {
			sans: '"Source Sans Pro","Roboto","Helvetica","Helvetica Neue","Source Han Sans SC","Source Han Sans TC","PingFang SC","PingFang HK","PingFang TC",sans-serif',
			serif:
				'"HiraMinProN-W6","Source Han Serif CN","Source Han Serif SC","Source Han Serif TC",serif',
		},
		animation: {
			keyframes: {
				"fadein-down":
					"{from {opacity: 0.1;transform: translateY(-20px);}to {opacity: 1;transform: translateY(0);}}",
				"fadein-left":
					"{from {opacity: 0.1;transform: translateX(20px);}to {opacity: 1;transform: translateX(0);}}",
			},
		},
	},
	shortcuts: [
		["icon", "inline-block "],
		["post-title", "text-5 font-bold lh-7.5 m-0"],
	],
	transformers: [transformerDirectives()],
	safelist: [
		...socials.map((social) => `i-mdi-${social.name}`),
		"i-mdi-content-copy",
		"i-mdi-check",
	],
});
