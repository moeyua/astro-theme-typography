/// <reference types="../../.astro/types" />
/// <reference types="astro" />

type Post = import('astro:content').CollectionEntry<'posts'>

type Page = import("astro").Page<Post>

