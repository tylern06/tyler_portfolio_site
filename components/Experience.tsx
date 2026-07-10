import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { experience } from '@/data/resume';

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 relative">
      {/* Section background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <AnimatedSection>
          <p className="section-tag">Experience</p>
          <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-16">
            Where I&apos;ve <span className="gradient-text">worked</span>
          </h2>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-blue)] via-[var(--border-subtle)] to-transparent hidden md:block" />

          <div className="space-y-8">
            {experience.map((job) => (
              <ExperienceCard key={job.company} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ job }: { job: (typeof experience)[number] }) {
  return (
    <div className="md:pl-16 relative">
      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-0 top-6 w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] items-center justify-center">
        <Briefcase size={16} className="text-[var(--accent-blue)]" />
      </div>

      <div className="glass-card rounded-2xl p-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="font-[var(--font-space-grotesk)] text-lg font-bold text-[var(--text-primary)]">
              {job.role}
            </h3>
            <p className="text-[var(--accent-cyan)] font-semibold text-sm mt-0.5">{job.company}</p>
          </div>
          <div className="flex flex-col sm:items-end gap-1 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <Calendar size={11} />
              {job.period}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <MapPin size={11} />
              {job.location}
            </div>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
          {job.description}
        </p>

        <ul className="space-y-2 mb-5">
          {job.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <ChevronRight size={14} className="text-[var(--accent-cyan)] mt-0.5 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {job.tech.map((t) => (
            <span key={t} className="skill-badge">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
