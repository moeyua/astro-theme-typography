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
      themeStyle: 'light'|'auto'|'dark';
      /** your socials */
      socials: Array<{
        name: string;
        href: string;
      }>,
      /** your navigation links */
      navs: Array<{
        name: string;
        href: string;
      }>
    }
    translate: (key: string, param?: string | number) => string;
  }
}
