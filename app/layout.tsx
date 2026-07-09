import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tyler Nguyen — Software Engineer',
  description:
    'Full Stack Engineer specializing in React, Next.js, and modern web experiences. Building fast, beautiful, and accessible products.',
  keywords: [
    'software engineer',
    'frontend developer',
    'React',
    'Next.js',
    'TypeScript',
    'Tyler Nguyen',
  ],
  authors: [{ name: 'Tyler Nguyen' }],
  openGraph: {
    title: 'Tyler Nguyen — Software Engineer',
    description: 'Full Stack Engineer specializing in React, Next.js, and modern web experiences.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tyler Nguyen — Software Engineer',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
