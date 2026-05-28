'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Mail, Download } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import { personalInfo, stats } from '@/data/resume'

export default function About() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="section-tag">About Me</p>
          <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-16">
            A little about{' '}
            <span className="gradient-text">who I am</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Photo + contact info */}
          <AnimatedSection direction="left">
            <div className="space-y-6">
              {/* Avatar */}
              <div className="relative w-fit">
                <div className="w-64 h-64 rounded-2xl overflow-hidden border border-[var(--border-subtle)] relative bg-gradient-to-br from-blue-900/40 to-purple-900/40">
                  {/* Placeholder avatar */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-[var(--border-subtle)] flex items-center justify-center">
                      <svg className="w-12 h-12 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">Photo coming soon</span>
                  </div>
                </div>
                {/* Decorative corner accent */}
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-blue-500/20 -z-10" />
              </div>

              {/* Contact details */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <MapPin size={14} className="text-[var(--accent-cyan)] shrink-0" />
                  {personalInfo.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Mail size={14} className="text-[var(--accent-cyan)] shrink-0" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-[var(--accent-cyan)] transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <a
                href={personalInfo.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex mt-2"
              >
                <Download size={15} />
                Download Resume
              </a>
            </div>
          </AnimatedSection>

          {/* Bio text */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="space-y-5">
              {personalInfo.bio.map((paragraph, i) => (
                <p key={i} className="text-[var(--text-secondary)] leading-relaxed text-[1.0625rem]">
                  {paragraph}
                </p>
              ))}

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-card rounded-xl p-4 text-center"
                  >
                    <div className="font-[var(--font-space-grotesk)] text-2xl font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
