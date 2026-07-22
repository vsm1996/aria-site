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
  metadataBase: new URL('https://aria-formatter.vercel.app'),
  applicationName: 'Aria',
  keywords: [
    'accessibility',
    'a11y',
    'ARIA',
    'ESLint',
    'oxlint',
    'formatter',
    'linter',
    'WCAG',
    'jsx-a11y',
  ],
  // og:image and twitter:image are supplied by the file conventions
  // (app/opengraph-image.tsx and app/twitter-image.tsx) — Next wires them in
  // automatically with the correct dimensions and alt text.
  openGraph: {
    title: 'Aria — the accessibility formatter',
    description:
      'Meaning-preserving accessibility fixes that run on save and gate CI. Everything that would require a guess stays out of the automatic path, by construction.',
    url: 'https://aria-formatter.vercel.app',
    siteName: 'Aria',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aria — the accessibility formatter',
    description:
      'Meaning-preserving accessibility fixes that run on save and gate CI. Everything that would require a guess stays out of the automatic path, by construction.',
  },
};

// Set the saved theme before first paint, so there's no flash of the wrong
// mode. Only applies an explicit choice; with none, Renge's tokens follow the
// OS `prefers-color-scheme` on their own. Kept tiny and dependency-free.
const noFlashThemeScript = `(function(){try{var m=localStorage.getItem('aria-theme');if(m==='dark'||m==='light'){document.documentElement.setAttribute('data-mode',m);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Renge profile "ocean". No data-mode here on purpose: the site follows the
    // OS preference until the user picks one via the nav toggle (which sets
    // data-mode + localStorage; the head script re-applies it before paint).
    <html lang="en" data-profile="ocean" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-renge-1 focus:bg-renge-bg-inverse focus:px-renge-3 focus:py-renge-2 focus:text-renge-sm focus:text-renge-fg-inverse"
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
