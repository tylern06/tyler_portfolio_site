'use client';

import { useEffect, useState } from 'react';
import { Contrast } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional immediate state update on mount
    setMounted(true);
  }, []);

  const isMono = mounted && theme === 'mono';

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isMono ? 'color' : 'monochrome'} theme`}
      className={cn(
        'relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
        isMono
          ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
          : 'bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:bg-white/10',
      )}
    >
      <Contrast size={14} />
    </button>
  );
}
