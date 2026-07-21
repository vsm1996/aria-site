import Link from 'next/link';

const links = [
  { href: '/demo', label: 'Demo' },
  { href: '/rules', label: 'Rules' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/get-started', label: 'Get started' },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-paper)]/85 backdrop-blur">
      <nav
        className="container-wide flex h-16 items-center justify-between gap-6"
        aria-label="Primary"
      >
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
            Aria
          </span>
          <span className="hidden text-xs text-[var(--color-muted)] sm:inline">
            the accessibility formatter
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm text-[var(--color-ink-2)] transition-colors hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="https://github.com/vsm1996/aria"
            className="rounded-md border border-[var(--color-line-2)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
