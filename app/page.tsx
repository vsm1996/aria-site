import Link from 'next/link';
import { GateDiagram } from '@/components/GateDiagram';
import { CodeBlock } from '@/components/CodeBlock';
import { formatRules, lintRules } from '@/data/rules';

const INSTALL = 'npm install --save-dev eslint eslint-plugin-aria-a11y';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[var(--color-line)]">
        <div className="container-tight py-20 sm:py-28">
          <p className="eyebrow">eslint-plugin-aria-a11y · @aria-a11y/cli · v0.1.1 on npm</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-5xl">
            The accessibility formatter.
            <br />
            <span className="text-[var(--color-known)]">It never changes what the code means.</span>
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-[var(--color-ink-2)]">
            Prettier ended brace-style debates by turning them into a failing build. Aria applies
            the same discipline to the mechanical slice of accessibility work — the redundant,
            conflicting, and broken ARIA that pollutes most codebases — so that slice can run on
            save and gate CI instead of living in review debates.
          </p>
          <p className="prose-measure mt-4 text-lg leading-relaxed text-[var(--color-ink-2)]">
            Everything that would require a guess stays out of the automatic path,{' '}
            <em>by construction</em>.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/get-started"
              className="rounded-md bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-paper)] transition-colors hover:bg-[var(--color-ink-2)]"
            >
              Get started
            </Link>
            <Link
              href="/demo"
              className="rounded-md border border-[var(--color-line-2)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper-2)]"
            >
              See it run
            </Link>
            <code className="mono hidden rounded-md border border-[var(--color-line)] bg-white/70 px-3 py-2 text-xs text-[var(--color-ink-2)] lg:block">
              {INSTALL}
            </code>
          </div>
        </div>
      </section>

      {/* The gate */}
      <section className="border-b border-[var(--color-line)] bg-[var(--color-paper-2)]/50">
        <div className="container-wide py-16 sm:py-20">
          <p className="eyebrow">The core idea</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            One gate governs the whole system.
          </h2>
          <p className="prose-measure mt-4 text-base leading-relaxed text-[var(--color-ink-2)]">
            Every accessibility fact is classified by where its semantics came from:{' '}
            <span className="mono text-sm">native</span> (real HTML, per aria-query),{' '}
            <span className="mono text-sm">declared</span> (explicit author ARIA or design-system
            config), or <span className="mono text-sm">inferred</span> (a guess from signals like{' '}
            <span className="mono text-sm">onClick</span>).
          </p>
          <div className="mt-10">
            <GateDiagram />
          </div>
        </div>
      </section>

      {/* Why this contract */}
      <section className="border-b border-[var(--color-line)]">
        <div className="container-tight grid gap-10 py-16 sm:py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow">Why a formatter, not another linter</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Formatters won because a class of argument went extinct.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-[var(--color-ink-2)]">
            <p>
              Accessibility breaks the formatter contract the instant you guess. Put{' '}
              <span className="mono text-sm">role=&quot;button&quot;</span> on a div and you changed
              behavior. Author <span className="mono text-sm">aria-label=&quot;Close&quot;</span>{' '}
              and you asserted a fact that might be a lie — the spec is explicit that a wrong label
              is worse than none.
            </p>
            <p>
              So Aria is built around one hard line. Format-tier fixes are subtractive or
              normalizing: they delete ARIA that is redundant or forbidden, and they normalize
              syntax. They never add assertions. Aria will not invent label text, alt copy, or
              descriptions — it flags their absence and hands the words to a human.
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              When it’s unsure whether a transform is format-safe, it isn’t. It’s lint.
            </p>
          </div>
        </div>
      </section>

      {/* What exists today */}
      <section className="border-b border-[var(--color-line)]">
        <div className="container-tight py-16 sm:py-20">
          <p className="eyebrow">What exists today</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Eight rules, shipped and CI-gated. Nothing claimed that isn’t proven.
          </h2>
          <p className="prose-measure mt-4 text-base leading-relaxed text-[var(--color-ink-2)]">
            Three format-tier rules gate CI with auto-fixes; five lint-tier rules surface located,
            human-reviewed diagnostics. Both packages are live on npm at 0.1.1, with ESLint ↔
            oxlint parity verified on every commit — zero drift across every fixture.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-known-ink)]">
                Format tier · auto-fix
              </p>
              <ul className="mt-3 space-y-2">
                {formatRules.map((r) => (
                  <li key={r.id} className="text-sm leading-relaxed text-[var(--color-ink-2)]">
                    <span className="mono font-medium text-[var(--color-ink)]">{r.id}</span> —{' '}
                    {r.summary}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-guess-ink)]">
                Lint tier · human-reviewed
              </p>
              <ul className="mt-3 space-y-2">
                {lintRules.map((r) => (
                  <li key={r.id} className="text-sm leading-relaxed text-[var(--color-ink-2)]">
                    <span className="mono font-medium text-[var(--color-ink)]">{r.id}</span> —{' '}
                    {r.summary}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-[var(--color-muted)]">
            Every status, basis, and spec citation lives in the{' '}
            <Link href="/rules" className="underline underline-offset-4 hover:text-[var(--color-ink)]">
              rules reference
            </Link>
            , mirrored from the repo’s registry.
          </p>
        </div>
      </section>

      {/* Install strip */}
      <section>
        <div className="container-tight py-16 sm:py-20">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Two surfaces, one rule set.</h2>
              <p className="prose-measure mt-3 text-base leading-relaxed text-[var(--color-ink-2)]">
                An ESLint plugin that also runs under oxlint unchanged, and a zero-config CLI —
                the exact same rule modules, with output identical to ESLint by construction.
              </p>
            </div>
            <Link
              href="/get-started"
              className="justify-self-start rounded-md bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-paper)] transition-colors hover:bg-[var(--color-ink-2)] md:justify-self-end"
            >
              Install →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <CodeBlock label="ESLint plugin" code={INSTALL} />
            <CodeBlock label="Zero-config CLI" code="npx @aria-a11y/cli check src" />
          </div>
        </div>
      </section>
    </>
  );
}
