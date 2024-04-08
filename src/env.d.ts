/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    config: {
      /** blog title */
      title: string;
      /** your name */
      author: string;
      /** website description */
      desc: string;
      /** your deployed domain */
      website: string;
      /** your locale */
      locale: string;
      /** theme style */
      themeStyle: 'light' | 'auto' | 'dark';
      /** your socials */
      socials: Array<{
        name: string;
        href: string;
      }>,
      /** your header info */
      header: Object<{
        twitter: String;
      }>,
      /** your navigation links */
      navs: Array<{
        name: string;
        href: string;
      }>,
      /** category mapping */
      category_map: Array<{
        name: string;
        path: string;
      }>,
      /** comments */
      comments?: {
        disqus?: {
          shortname: string;
        },
        giscus?: {
          repo: import('giscus').Repo;
          repoId?: string;
          category?: string;
          categoryId?: string;
          mapping?: import('giscus').Mapping;
          term?: string;
          strict: import('giscus').BooleanString;
          reactionsEnabled: import('giscus').BooleanString;
          emitMetadata: import('giscus').BooleanString;
          inputPosition: import('giscus').InputPosition;
          theme: import('giscus').Theme;
          lang: import('giscus').AvailableLanguage;
          loading: import('giscus').Loading;
        },
        twikoo?: {
          envId: string;
          region?: string;
          lang?: string;
        }
      }
    }
    translate: (key: string, param?: string | number) => string;
  }
}
