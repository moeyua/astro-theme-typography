/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    translate: (key: string, param?: string | number) => string
  }
}
