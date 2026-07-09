'use client';

import { useTheme as useNextTheme, ThemeProvider as NextThemesProvider } from 'next-themes';

export type Theme = 'default' | 'mono';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="default"
      themes={['default', 'mono']}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

export function useTheme() {
  const { theme, setTheme } = useNextTheme();

  return {
    theme: (theme as Theme) ?? 'default',
    toggle: () => setTheme(theme === 'mono' ? 'default' : 'mono'),
  };
}
