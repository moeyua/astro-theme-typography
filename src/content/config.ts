
import { defineCollection } from "astro:content";
import { rssSchema } from '@astrojs/rss';

const postsCollection = defineCollection({
  schema: rssSchema
});

export const collections = {
  posts: postsCollection,
};
