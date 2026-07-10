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
          {Object.entries(skills).map(([category, items]) => (
            <SkillCategory
              key={category}
              category={category}
              items={items}
              icon={categoryIcons[category] ?? '•'}
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
}: {
  category: string;
  items: string[];
  icon: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">{icon}</span>
        <h3 className="font-[var(--font-space-grotesk)] font-semibold text-[var(--text-primary)] text-sm">
          {category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span key={skill} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
