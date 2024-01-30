
import { defineCollection } from "astro:content";
import { rssSchema } from '@astrojs/rss';

const posts = defineCollection({
  schema: rssSchema
});

export const collections = {
  posts,
};
