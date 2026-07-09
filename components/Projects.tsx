'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';
import AnimatedSection from './AnimatedSection';
import { projects } from '@/data/resume';

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <AnimatedSection>
          <p className="section-tag">Projects</p>
          <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-16">
            Things I&apos;ve <span className="gradient-text">built</span>
          </h2>
        </AnimatedSection>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} featured />
          ))}
        </div>

        {/* Other projects */}
        {rest.length > 0 && (
          <>
            <AnimatedSection>
              <h3 className="font-[var(--font-space-grotesk)] text-lg font-semibold text-[var(--text-secondary)] mb-6 flex items-center gap-2">
                <Star size={14} className="text-[var(--accent-cyan)]" />
                Other noteworthy projects
              </h3>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i + featured.length} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: (typeof projects)[number];
  index: number;
  featured?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group glass-card rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Card gradient header */}
      <div className={`h-36 bg-gradient-to-br ${project.gradient} relative`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)]" />
        <div className="absolute bottom-4 left-5 flex gap-2">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 text-white/70 hover:text-white transition-all"
              aria-label="Live demo"
            >
              <ExternalLink size={13} />
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 text-white/70 hover:text-white transition-all"
              aria-label="GitHub"
            >
              <GithubIcon size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-[var(--font-space-grotesk)] font-bold text-[var(--text-primary)] text-base mb-2">
          {project.title}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="skill-badge text-xs py-0.5 px-2.5">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
