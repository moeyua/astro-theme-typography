import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetTypography,
  presetIcons,
} from "unocss";
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({ nonValuedAttribute: true }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography({
      cssExtend: {
        ":not(pre) > code": {
          color: "#c7254e",
          padding: "2px 4px",
          "white-space": "pre-wrap !important",
          "background-color": "#f9f2f4 !important",
          "border-radius": "4px",
        },
        ":not(pre) > code::before": {
          content: "none",
        },
        ":not(pre) > code::after": {
          content: "none",
        },
        a: {
          "text-decoration": "none",
        },
      },
    }),
  ],
  theme: {
    color: {
      primary: "#2e405b",
    },
    fontFamily: {
      sans: '"Source Sans Pro","Roboto","Helvetica","Helvetica Neue","Source Han Sans SC","Source Han Sans TC","PingFang SC","PingFang HK","PingFang TC",sans-serif',
      serif: '"HiraMinProN-W6","Source Han Serif CN","Source Han Serif SC","Source Han Serif TC",serif',
    }
  },
  shortcuts: [
    ['icon', 'inline-block '],
  ],
  transformers: [
    transformerDirectives(),
  ],
})
