import { defineMiddleware } from 'astro:middleware';
import { THEME_CONFIG } from "~/theme.config.ts";
import { LANGUAGES } from "~/i18n.ts";

export const onRequest = defineMiddleware(async (context, next) => {
  // Adding properties in env.d.ts
  context.locals.config = THEME_CONFIG;
  const locale = context.locals.config.locale;
  context.locals.translate = (key, param) => {
    // @ts-ignore
    if (!LANGUAGES[locale]) {
      return key;
    }
    if (param) {
      // @ts-ignore
      return LANGUAGES[locale][key].replace('%d', param.toString());
    }
    // @ts-ignore
    return LANGUAGES[locale][key];
  }
  return next();
});
