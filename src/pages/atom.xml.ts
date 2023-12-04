import rss from '@astrojs/rss';
import { getPosts } from '~/utils';
import { SITE } from "~/config";
import type { APIContext } from 'astro';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getPosts()
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: posts.map((post) => ({
      link: `/posts/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
      ...post.data
    })),
    stylesheet: '/pretty-feed-v3.xsl',
  });
}
