/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    translate: (key: string, param?: string | number) => string
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_GOOGLE_ANALYTICS_ID: string
  readonly PUBLIC_UMAMI_ANALYTICS_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
