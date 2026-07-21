import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';
import { demoCases } from '@/data/demo';

export const metadata: Metadata = {
  title: 'Demo',
  description:
    'Real before/after output from the published Aria CLI — format-tier auto-fixes and lint-tier diagnostics, captured verbatim.',
};

export default function DemoPage() {
  return (
    <div className="container-tight py-16 sm:py-20">
      <p className="eyebrow">Demo</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        What Aria actually does.
      </h1>
      <p className="prose-measure mt-4 text-base leading-relaxed text-[var(--color-ink-2)]">
        Every example below is real output captured from the published{' '}
        <span className="mono text-sm">@aria-a11y/cli@0.1.1</span> running against these exact
        snippets — the diagnostics and the fixed code are verbatim, not hand-typed to look
        plausible. It’s static on purpose: a live in-browser approximation could drift from the
        CI-verified rule behaviour, and for a tool whose whole claim is “provably identical
        everywhere,” a demo that might show wrong output is worse than no demo.
      </p>

      <div className="mt-12 space-y-12">
        {demoCases.map((c) => (
          <section key={`${c.ruleId}-${c.title}`} aria-labelledby={`demo-${slug(c.title)}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2
                id={`demo-${slug(c.title)}`}
                className="text-lg font-semibold tracking-tight text-[var(--color-ink)]"
              >
                {c.title}
              </h2>
              <p className="mono text-xs text-[var(--color-muted)]">
                {c.ruleId} ·{' '}
                {c.tier === 'format' ? (
                  <span className="font-semibold text-[var(--color-known-ink)]">
                    format tier — auto-fixed
                  </span>
                ) : (
                  <span className="font-semibold text-[var(--color-guess-ink)]">
                    lint tier — reported, never auto-applied
                  </span>
                )}
              </p>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <CodeBlock label="before" code={c.before} />
              <CodeBlock
                label={c.applied ? 'after `aria fix`' : 'after `aria fix` — unchanged, by design'}
                code={c.after}
                tone={c.applied ? 'known' : 'guess'}
              />
            </div>

            <div
              className={`mt-3 rounded-lg border px-4 py-3 ${
                c.severity === 'error'
                  ? 'border-[var(--color-known-line)] bg-[var(--color-known-soft)]/60'
                  : 'border-[var(--color-guess-line)] bg-[var(--color-guess-soft)]/60'
              }`}
            >
              <p className="mono text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                aria check · {c.severity}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-2)]">
                {c.diagnostic}
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-[var(--color-line)] bg-white/60 p-6">
        <h2 className="text-base font-semibold">Run it yourself — the demo is one command away.</h2>
        <p className="prose-measure mt-2 text-sm leading-relaxed text-[var(--color-ink-2)]">
          The honest interactive version of this page is your own codebase:
        </p>
        <pre className="mono mt-3 overflow-x-auto rounded-md bg-[var(--color-ink)] px-4 py-3 text-[13px] leading-relaxed text-[var(--color-paper)]">
          <code>npx @aria-a11y/cli check src</code>
        </pre>
      </div>
    </div>
  );
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
