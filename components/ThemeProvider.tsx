'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'default' | 'mono'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'default', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'default'
    const stored = window.localStorage.getItem('theme')
    return stored === 'mono' || stored === 'default' ? stored : 'default'
  })

  useEffect(() => {
    if (theme === 'mono') {
      document.documentElement.setAttribute('data-theme', 'mono')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggle() {
    setTheme((t) => (t === 'default' ? 'mono' : 'default'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
