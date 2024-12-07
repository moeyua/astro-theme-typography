import { defineMiddleware } from 'astro:middleware'
import { themeConfig } from '~/.config'
import { LANGUAGES } from '~/i18n.ts'

export const onRequest = defineMiddleware(async (context, next) => {
  const locale = themeConfig.appearance.locale

  const localeTranslate = LANGUAGES[locale]

  function validateKey(key: string): key is keyof typeof localeTranslate {
    return key in localeTranslate
  }

  context.locals.translate = (key, param) => {
    if (!validateKey(key))
      return key
    if (!param)
      return localeTranslate[key]
    return localeTranslate[key].replace('%d', param.toString())
  }
  return next()
})
