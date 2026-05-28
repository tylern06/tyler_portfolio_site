import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog — Tyler Nguyen',
  description: 'Thoughts on software engineering, AI, React, and building things.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="section-tag">Blog</p>
          <h1 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Writing &amp;{' '}
            <span className="gradient-text">thinking</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Notes on software engineering, AI tooling, React, and the craft of building products.
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <p className="text-[var(--text-muted)]">No posts yet — check back soon.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card rounded-2xl p-7 block group"
              >
                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3">
                  <Calendar size={12} />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>

                <h2 className="font-[var(--font-space-grotesk)] text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-cyan)] transition-colors">
                  {post.title}
                </h2>

                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="skill-badge text-xs py-0.5 px-2.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--accent-cyan)] flex items-center gap-1 shrink-0 ml-4 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
