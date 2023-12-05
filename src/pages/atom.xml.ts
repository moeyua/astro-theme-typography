import rss from '@astrojs/rss';
import { getPosts } from '~/utils';
import { THEME_CONFIG } from "~/theme.config";
import type { APIContext } from 'astro';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

const { title, desc, website } = THEME_CONFIG


export async function GET(context: APIContext) {
  const posts = await getPosts()
  return rss({
    title: title,
    description: desc,
    site: website,
    items: posts.map((post) => ({
      link: `/posts/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
      ...post.data
    })),
    stylesheet: '/pretty-feed-v3.xsl',
  });
}
