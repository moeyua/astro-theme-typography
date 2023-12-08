import { getCollection } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

export async function getCategories() {
  const posts = await getPosts()

  const categories = new Map<string, Post[]>()

  posts.forEach((post) => {
    if (post.data.categories) {
      post.data.categories.forEach((c) => {
        const posts = categories.get(c) || []
        posts.push(post)
        categories.set(c, posts)
      })
    }
  })

  return categories
}

export async function getPosts() {
  const posts = await getCollection('posts')
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
  return posts
}

const parser = new MarkdownIt()

export function getPostDescription(post: Post) {
  if (post.data.description) {
    return post.data.description
  }

  const html = parser.render(post.body)
  const sanitized = sanitizeHtml(html, { allowedTags: [] })
  return sanitized.slice(0, 400)
}
