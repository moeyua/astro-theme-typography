import { defineMiddleware } from "astro:middleware";
import { config } from "~/.config";
import { LANGUAGES } from "~/i18n.ts";

export const onRequest = defineMiddleware(async (context, next) => {
	const locale = config.locale;

	const localeTranslate = LANGUAGES[locale];

	function validateKey(key: string): key is keyof typeof localeTranslate {
		return key in localeTranslate;
	}

	context.locals.translate = (key, param) => {
		if (!validateKey(key)) return key;
		if (!param) return localeTranslate[key];
		return localeTranslate[key].replace("%d", param.toString());
	};
	return next();
});
