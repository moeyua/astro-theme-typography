import type { DeepPartial, ThemeConfig } from '~/types'
import { defaultConfig } from './default'
import { userConfig } from './user'

export const themeConfig = deepMerge<ThemeConfig>(defaultConfig, userConfig)

function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  const output = { ...target }

  for (const [key, sourceValue] of Object.entries(source)) {
    const typedKey = key as keyof T
    const targetValue = output[typedKey]

    if (sourceValue !== undefined) {
      if (typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
        output[typedKey] = deepMerge(
          targetValue,
          sourceValue as DeepPartial<T[keyof T]>,
        )
      }
      else {
        output[typedKey] = sourceValue as T[keyof T]
      }
    }
  }

  return output
}
