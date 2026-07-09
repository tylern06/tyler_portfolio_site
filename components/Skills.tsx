'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from './AnimatedSection';
import { skills } from '@/data/resume';

const categoryIcons: Record<string, string> = {
  Frontend: '⚡',
  Backend: '🛠',
  'DevOps & Tools': '🚀',
  'AI & Emerging': '✨',
};

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <AnimatedSection>
          <p className="section-tag">Skills</p>
          <h2 className="font-[var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-16">
            My tech <span className="gradient-text">toolkit</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items], catIdx) => (
            <SkillCategory
              key={category}
              category={category}
              items={items}
              icon={categoryIcons[category] ?? '•'}
              index={catIdx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategory({
  category,
  items,
  icon,
  index,
}: {
  category: string;
  items: string[];
  icon: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">{icon}</span>
        <h3 className="font-[var(--font-space-grotesk)] font-semibold text-[var(--text-primary)] text-sm">
          {category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + i * 0.04 + 0.2, duration: 0.3 }}
            className="skill-badge"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
