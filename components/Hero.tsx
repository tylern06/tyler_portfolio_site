'use client';

import { useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';
import { personalInfo } from '@/data/resume';

const roles = [
  'Full Stack Engineer',
  'React Specialist',
  'TypeScript Advocate',
];

function useTypewriter(words: string[], speed = 80, pause = 2200) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setText(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setWordIdx((w) => (w + 1) % words.length);
            setCharIdx(0);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [words, wordIdx, charIdx, deleting, speed, pause]);

  return text;
}

export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[150px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-xs font-medium text-cyan-400">
              Available for new opportunities
            </span>
          </div>

          {/* Name — rendered without an entry animation so it paints immediately as the LCP element */}
          <h1 className="font-[var(--font-space-grotesk)] text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-4">
            Hi, I&apos;m <span className="gradient-text">Tyler Nguyen</span>
          </h1>

          {/* Typewriter role */}
          <div className="text-2xl sm:text-3xl font-[var(--font-space-grotesk)] text-[var(--text-secondary)] mb-6 h-10 flex items-center">
            <span className="text-[var(--accent-blue)]">{'> '}</span>
            <span className="ml-1">{role}</span>
            <span className="text-[var(--accent-cyan)] ml-0.5">|</span>
          </div>

          {/* Bio */}
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-xl">
            {personalInfo.tagline} I love building things that are fast, accessible, and genuinely
            delightful to use.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a href="#projects" className="btn-primary">
              View My Work
              <ArrowDown size={15} className="ml-1" />
            </a>
            <a href="#contact" className="btn-outline">
              Get In Touch
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
              Find me on
            </span>
            <div className="w-8 h-px bg-[var(--border-subtle)]" />
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)]"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
