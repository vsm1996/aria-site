import Link from 'next/link';
import { GateDiagram } from '@/components/GateDiagram';
import { CodeBlock } from '@/components/CodeBlock';
import { formatRules, lintRules } from '@/data/rules';

const INSTALL = 'npm install --save-dev eslint eslint-plugin-aria-a11y';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-renge-border-subtle">
        <div className="container-tight py-renge-7 sm:py-renge-7">
          <p className="eyebrow">eslint-plugin-aria-a11y · @aria-a11y/cli · v0.2.0 on npm</p>
          <h1 className="mt-renge-4 max-w-3xl text-renge-xl font-semibold leading-[1.08] tracking-tight text-renge-fg">
            The accessibility formatter.
            <br />
            <span className="text-renge-success">It never changes what the code means.</span>
          </h1>
          <p className="prose-measure mt-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
            Prettier ended brace-style debates by turning them into a failing build. Aria applies
            the same discipline to the mechanical slice of accessibility work — the redundant,
            conflicting, and broken ARIA that pollutes most codebases — so that slice can run on
            save and gate CI instead of living in review debates.
          </p>
          <p className="prose-measure mt-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
            Everything that would require a guess stays out of the automatic path,{' '}
            <em>by construction</em>.
          </p>
          <div className="mt-renge-5 flex flex-wrap items-center gap-renge-4">
            <Link
              href="/get-started"
              className="rounded-renge-1 bg-renge-bg-inverse px-renge-4 py-renge-2 text-renge-sm font-medium text-renge-fg-inverse transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-accent-hover"
            >
              Get started
            </Link>
            <Link
              href="/demo"
              className="rounded-renge-1 border border-renge-border px-renge-4 py-renge-2 text-renge-sm font-medium text-renge-fg transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-bg-subtle"
            >
              See it run
            </Link>
            <code className="mono hidden rounded-renge-1 border border-renge-border-subtle bg-renge-bg-subtle px-renge-3 py-renge-2 text-renge-xs text-renge-fg-muted lg:block">
              {INSTALL}
            </code>
          </div>
        </div>
      </section>

      {/* The gate */}
      <section className="border-b border-renge-border-subtle bg-renge-bg-subtle">
        <div className="container-wide py-renge-6 sm:py-renge-7">
          <p className="eyebrow">The core idea</p>
          <h2 className="mt-renge-3 max-w-2xl text-renge-lg font-semibold tracking-tight">
            One gate governs the whole system.
          </h2>
          <p className="prose-measure mt-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
            Every accessibility fact is classified by where its semantics came from:{' '}
            <span className="mono text-renge-sm">native</span> (real HTML, per aria-query),{' '}
            <span className="mono text-renge-sm">declared</span> (explicit author ARIA or design-system
            config), or <span className="mono text-renge-sm">inferred</span> (a guess from signals like{' '}
            <span className="mono text-renge-sm">onClick</span>).
          </p>
          <div className="mt-renge-5">
            <GateDiagram />
          </div>
        </div>
      </section>

      {/* Why this contract */}
      <section className="border-b border-renge-border-subtle">
        <div className="container-tight grid gap-renge-6 py-renge-6 sm:py-renge-7 md:grid-cols-2 md:items-start">
          <div>
            <p className="eyebrow">Why a formatter, not another linter</p>
            <h2 className="mt-renge-3 text-renge-lg font-semibold tracking-tight">
              Formatters won because a class of argument went extinct.
            </h2>
          </div>
          <div className="space-y-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
            <p>
              Accessibility breaks the formatter contract the instant you guess. Put{' '}
              <span className="mono text-renge-sm">role=&quot;button&quot;</span> on a div and you changed
              behavior. Author <span className="mono text-renge-sm">aria-label=&quot;Close&quot;</span>{' '}
              and you asserted a fact that might be a lie — the spec is explicit that a wrong label
              is worse than none.
            </p>
            <p>
              So Aria is built around one hard line. Format-tier fixes are subtractive or
              normalizing: they delete ARIA that is redundant or forbidden, and they normalize
              syntax. They never add assertions. Aria will not invent label text, alt copy, or
              descriptions — it flags their absence and hands the words to a human.
            </p>
            <p className="text-renge-sm text-renge-fg-subtle">
              When it’s unsure whether a transform is format-safe, it isn’t. It’s lint.
            </p>
          </div>
        </div>
      </section>

      {/* What exists today */}
      <section className="border-b border-renge-border-subtle">
        <div className="container-tight py-renge-6 sm:py-renge-7">
          <p className="eyebrow">What exists today</p>
          <h2 className="mt-renge-3 text-renge-lg font-semibold tracking-tight">
            Eight rules, shipped and CI-gated. Nothing claimed that isn’t proven.
          </h2>
          <p className="prose-measure mt-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
            Three format-tier rules gate CI with auto-fixes; five lint-tier rules surface located,
            human-reviewed diagnostics. Both packages are live on npm at 0.2.0, with ESLint ↔
            oxlint parity verified on every commit — zero drift across every fixture.
          </p>
          <div className="mt-renge-5 grid gap-renge-4 sm:grid-cols-2">
            <div className="card p-renge-4">
              <p className="text-renge-xs font-semibold uppercase tracking-[0.14em] text-[var(--gate-known-ink)]">
                Format tier · auto-fix
              </p>
              <ul className="mt-renge-3 space-y-renge-2">
                {formatRules.map((r) => (
                  <li key={r.id} className="text-renge-sm leading-relaxed text-renge-fg-muted">
                    <span className="mono font-medium text-renge-fg">{r.id}</span> —{' '}
                    {r.summary}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-renge-4">
              <p className="text-renge-xs font-semibold uppercase tracking-[0.14em] text-[var(--gate-guess-ink)]">
                Lint tier · human-reviewed
              </p>
              <ul className="mt-renge-3 space-y-renge-2">
                {lintRules.map((r) => (
                  <li key={r.id} className="text-renge-sm leading-relaxed text-renge-fg-muted">
                    <span className="mono font-medium text-renge-fg">{r.id}</span> —{' '}
                    {r.summary}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-renge-4 text-renge-sm text-renge-fg-subtle">
            Every status, basis, and spec citation lives in the{' '}
            <Link href="/rules" className="underline underline-offset-4 hover:text-renge-fg">
              rules reference
            </Link>
            , mirrored from the repo’s registry.
          </p>
        </div>
      </section>

      {/* Install strip */}
      <section>
        <div className="container-tight py-renge-6 sm:py-renge-7">
          <div className="grid items-center gap-renge-5 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-renge-lg font-semibold tracking-tight">Two surfaces, one rule set.</h2>
              <p className="prose-measure mt-renge-3 text-renge-base leading-relaxed text-renge-fg-muted">
                An ESLint plugin that also runs under oxlint unchanged, and a zero-config CLI —
                the exact same rule modules, with output identical to ESLint by construction.
              </p>
            </div>
            <Link
              href="/get-started"
              className="justify-self-start rounded-renge-1 bg-renge-bg-inverse px-renge-4 py-renge-2 text-renge-sm font-medium text-renge-fg-inverse transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-accent-hover md:justify-self-end"
            >
              Install →
            </Link>
          </div>
          <div className="mt-renge-4 grid gap-renge-4 md:grid-cols-2">
            <CodeBlock label="ESLint plugin" code={INSTALL} />
            <CodeBlock label="Zero-config CLI" code="npx @aria-a11y/cli check src" />
          </div>
        </div>
      </section>
    </>
  );
}
