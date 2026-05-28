'use client'

import { Contrast } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'default' ? 'monochrome' : 'color'} theme`}
      className={cn(
        'relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
        theme === 'mono'
          ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
          : 'bg-white/5 text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:bg-white/10'
      )}
    >
      <Contrast size={14} />
    </button>
  )
}
