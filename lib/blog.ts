import { prisma } from '@/lib/prisma'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  date: string
  published: boolean
  content: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
  })
  return posts.map(toPost)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post || !post.published) return null
  return toPost(post)
}

function toPost(p: {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  date: Date
  published: boolean
  content: string
}): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    tags: p.tags,
    date: p.date.toISOString().split('T')[0],
    published: p.published,
    content: p.content,
  }
}
