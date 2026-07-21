import Link from 'next/link';

const links = [
  { href: '/demo', label: 'Demo' },
  { href: '/rules', label: 'Rules' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/get-started', label: 'Get started' },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-renge-border-subtle bg-renge-bg backdrop-blur">
      <nav
        className="container-wide flex h-renge-6 items-center justify-between gap-renge-4"
        aria-label="Primary"
      >
        <Link href="/" className="group flex items-baseline gap-renge-2">
          <span className="text-renge-base font-semibold tracking-tight text-renge-fg">
            Aria
          </span>
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
                  className="rounded-renge-1 px-renge-3 py-renge-2 text-renge-sm text-renge-fg-muted transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-bg-subtle hover:text-renge-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="https://github.com/vsm1996/aria"
            className="rounded-renge-1 border border-renge-border px-renge-3 py-renge-1 text-renge-sm font-medium text-renge-fg transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-bg-inverse hover:text-renge-fg-inverse"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
