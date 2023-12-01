import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

type Post = CollectionEntry<'posts'>

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
  return posts
}
