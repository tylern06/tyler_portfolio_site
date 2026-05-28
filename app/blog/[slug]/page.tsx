import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { Calendar, ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Tyler Nguyen`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          All posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-4">
            <Calendar size={12} />
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <h1 className="font-[var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-5">
            {post.title}
          </h1>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="skill-badge">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <hr className="border-[var(--border-subtle)] mb-12" />

        {/* Content */}
        <article className="prose-dark">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[var(--border-subtle)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent-cyan)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all posts
          </Link>
        </div>
      </div>
    </div>
  )
}
