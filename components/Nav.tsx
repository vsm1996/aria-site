'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/demo', label: 'Demo' },
  { href: '/rules', label: 'Rules' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/get-started', label: 'Get started' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes (the layout persists across
  // client navigations, so the disclosure would otherwise stay open).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes it, matching native disclosure expectations.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-renge-border-subtle bg-renge-bg backdrop-blur">
      <nav
        className="container-wide flex h-renge-6 items-center justify-between gap-renge-4"
        aria-label="Primary"
      >
        <Link href="/" className="group flex items-baseline gap-renge-2">
          <span className="text-renge-base font-semibold tracking-tight text-renge-fg">Aria</span>
          <span className="hidden text-renge-xs text-renge-fg-subtle sm:inline">
            the accessibility formatter
          </span>
        </Link>

        <div className="flex items-center gap-renge-1 sm:gap-renge-2">
          <ul className="hidden items-center gap-renge-1 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? 'page' : undefined}
                  className="rounded-renge-1 px-renge-3 py-renge-2 text-renge-sm text-renge-fg-muted transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-bg-subtle hover:text-renge-fg aria-[current=page]:text-renge-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href="https://github.com/vsm1996/aria"
            className="hidden rounded-renge-1 border border-renge-border px-renge-3 py-renge-1 text-renge-sm font-medium text-renge-fg transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-bg-inverse hover:text-renge-fg-inverse sm:inline-block"
          >
            GitHub
          </a>

          <ThemeToggle />

          {/* Mobile toggle — below sm only */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-renge-1 border border-renge-border text-renge-fg transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-bg-subtle sm:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-renge-border-subtle bg-renge-bg sm:hidden"
        >
          <nav aria-label="Mobile" className="container-wide py-renge-3">
            <ul className="flex flex-col gap-renge-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? 'page' : undefined}
                    className="block rounded-renge-1 px-renge-3 py-renge-2 text-renge-base text-renge-fg-muted transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-bg-subtle hover:text-renge-fg aria-[current=page]:text-renge-fg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/vsm1996/aria"
                  className="block rounded-renge-1 px-renge-3 py-renge-2 text-renge-base text-renge-fg-muted transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-bg-subtle hover:text-renge-fg"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
