import type { CollectionEntry } from "astro:content";

export * from "./themeConfig.ts";
export type Post = CollectionEntry<"posts">;
