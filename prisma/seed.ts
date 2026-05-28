import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const prisma = new PrismaClient()
const BLOG_DIR = path.join(process.cwd(), 'content/blog')

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
    const { data, content } = matter(raw)
    const slug = (data.slug as string) ?? filename.replace(/\.md$/, '')

    await prisma.post.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: (data.title as string) ?? '',
        excerpt: (data.excerpt as string) ?? '',
        tags: (data.tags as string[]) ?? [],
        date: new Date(data.date as string),
        published: data.published !== false,
        content,
      },
    })

    console.log(`Seeded: ${slug}`)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
