'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons'
import AnimatedSection from './AnimatedSection'
import { personalInfo } from '@/data/resume'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } else {
      setStatus('idle')
      alert('Something went wrong — please try again or email me directly.')
    }
  }

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/8 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <AnimatedSection>
          <p className="section-tag">Contact</p>
          <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-6">
            Let&apos;s{' '}
            <span className="gradient-text">connect</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mb-16">
            I&apos;m open to new opportunities and interesting projects. Whether you have a question or just want to say hi — my inbox is always open.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact details */}
          <AnimatedSection direction="left">
            <div className="space-y-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="glass-card rounded-2xl p-6 flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={18} className="text-[var(--accent-blue)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-[var(--text-primary)] font-medium text-sm">{personalInfo.email}</p>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-6 flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <GithubIcon size={18} className="text-[var(--text-secondary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-0.5">GitHub</p>
                  <p className="text-[var(--text-primary)] font-medium text-sm">{personalInfo.github.replace('https://', '')}</p>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-6 flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                  <LinkedinIcon size={18} className="text-[var(--accent-cyan)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-0.5">LinkedIn</p>
                  <p className="text-[var(--text-primary)] font-medium text-sm">{personalInfo.linkedin.replace('https://', '')}</p>
                </div>
              </a>
            </div>
          </AnimatedSection>

          {/* Contact form */}
          <AnimatedSection direction="right" delay={0.1}>
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center min-h-[360px]"
              >
                <CheckCircle size={40} className="text-emerald-400" />
                <h3 className="font-[var(--font-space-grotesk)] text-xl font-bold text-[var(--text-primary)]">
                  Message sent!
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-outline mt-2 text-sm"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center"
                >
                  {status === 'sending' ? (
                    'Sending…'
                  ) : (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
