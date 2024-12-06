import type { APIContext } from 'astro'
import type { Post } from '~/types'
import rss from '@astrojs/rss'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
import { themeConfig } from '~/.config'
import { getPosts } from '~/utils'

const parser = new MarkdownIt()
const { title, description, website, author } = themeConfig.site
const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img'])

export async function GET(_context: APIContext) {
  const posts = await getPosts()
  return rss({
    title,
    description,
    site: website,
    items: posts.map(getPostItem),
    customData: getCustomData(),
  })
}

function getCustomData() {
  const follow = themeConfig.rss.follow
  if (!follow)
    return ''
  const { feedId, userId } = follow
  return `<follow_challenge><feedId>${feedId}</feedId><userId>${userId}</userId></follow_challenge>`
}

function getPostItem(post: Post) {
  const postItem = {
    link: `/posts/${post.id}/`,
    author: post.data.author ?? author,
    content: getPostContent(post),
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.description,
    customData: post.data.customData,
    categories: post.data.categories,
    commentsUrl: post.data.commentsUrl,
    source: post.data.source,
    enclosure: post.data.enclosure,
  }

  return postItem
}

function getPostContent(post: Post) {
  const isFullText = themeConfig.rss.fullText
  if (!isFullText)
    return post.data.description
  return sanitizeHtml(parser.render(post.body || ''), { allowedTags })
}
