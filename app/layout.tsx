import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Aria — the accessibility formatter',
    template: '%s · Aria',
  },
  description:
    'Aria holds itself to the contract that made code formatters non-optional: it never changes what the code means. Meaning-preserving ARIA fixes that run on save and gate CI, plus lint-tier checks a human approves.',
  metadataBase: new URL('https://aria-a11y.dev'),
  openGraph: {
    title: 'Aria — the accessibility formatter',
    description:
      'Meaning-preserving accessibility fixes that run on save and gate CI. Everything that would require a guess stays out of the automatic path, by construction.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--color-paper)]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
