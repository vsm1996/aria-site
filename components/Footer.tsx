import Link from 'next/link';

const cols: { title: string; links: { href: string; label: string; ext?: boolean }[] }[] = [
  {
    title: 'Pages',
    links: [
      { href: '/demo', label: 'Demo' },
      { href: '/rules', label: 'Rules reference' },
      { href: '/architecture', label: 'Architecture' },
      { href: '/get-started', label: 'Get started' },
    ],
  },
  {
    title: 'Packages',
    links: [
      { href: 'https://www.npmjs.com/package/eslint-plugin-aria-a11y', label: 'eslint-plugin-aria-a11y', ext: true },
      { href: 'https://www.npmjs.com/package/@aria-a11y/cli', label: '@aria-a11y/cli', ext: true },
      { href: 'https://github.com/vsm1996/aria', label: 'Source', ext: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-line)]">
      <div className="container-wide grid grid-cols-2 gap-8 py-14 sm:grid-cols-4">
        <div className="col-span-2">
          <div className="text-lg font-semibold tracking-tight">Aria</div>
          <p className="prose-measure mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
            An accessibility formatter that holds itself to the one contract that made code
            formatters non-optional: it never changes what the code means.
          </p>
          {/* Verified: `npm run lint:a11y` (the published CLI) reports zero findings
              across this site's own app/ and components/. */}
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-known-line)] bg-[var(--color-known-soft)] px-3 py-1 text-xs font-medium text-[var(--color-known-ink)]">
            <span aria-hidden="true">✓</span> This site is checked by Aria — zero findings
          </p>
        </div>
        {cols.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="eyebrow">{col.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.ext ? (
                    <a
                      href={l.href}
                      className="text-[var(--color-ink-2)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-[var(--color-ink-2)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-wide flex flex-col gap-1 border-t border-[var(--color-line)] py-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
        <span>MIT licensed. Built by Soka Labs.</span>
        <span>Content sourced from the repo — nothing claimed that isn’t shipped.</span>
      </div>
    </footer>
  );
}
