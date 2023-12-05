import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
import { THEME_CONFIG } from "./src/theme.config";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({ nonValuedAttribute: true }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    // presetTypography({
    //   cssExtend: {
    //     ":not(pre) > code": {
    //       color: "#c7254e",
    //       padding: "2px 4px",
    //       "white-space": "pre-wrap !important",
    //       "background-color": "#f9f2f4 !important",
    //       "border-radius": "4px",
    //     },
    //     ":not(pre) > code::before": {
    //       content: "none",
    //     },
    //     ":not(pre) > code::after": {
    //       content: "none",
    //     },
    //     a: {
    //       "text-decoration": "none",
    //     },
    //   },
    // }),
  ],
  theme: {
    colors: {
      primary: "#2e405b",
      secondary: "#ffffff",
    },
    fontFamily: {
      sans: '"Source Sans Pro","Roboto","Helvetica","Helvetica Neue","Source Han Sans SC","Source Han Sans TC","PingFang SC","PingFang HK","PingFang TC",sans-serif',
      serif: '"HiraMinProN-W6","Source Han Serif CN","Source Han Serif SC","Source Han Serif TC",serif',
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
    ['icon', 'inline-block '],
    ['post-title', 'text-5 font-bold lh-7.5 m-0'],
  ],
  transformers: [
    transformerDirectives(),
  ],
  safelist: [
    ...THEME_CONFIG.socials.map((social) => `i-mdi-${social.name}`),
  ],
})
