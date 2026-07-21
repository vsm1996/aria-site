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
    <div className="container-tight py-renge-6 sm:py-renge-7">
      <p className="eyebrow">Demo</p>
      <h1 className="mt-renge-3 text-renge-xl font-semibold leading-[1.08] tracking-tight">
        What Aria actually does.
      </h1>
      <p className="prose-measure mt-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
        Every example below is real output captured from the published{' '}
        <span className="mono text-renge-sm">@aria-a11y/cli@0.1.1</span> running against these exact
        snippets — the diagnostics and the fixed code are verbatim, not hand-typed to look
        plausible. It’s static on purpose: a live in-browser approximation could drift from the
        CI-verified rule behaviour, and for a tool whose whole claim is “provably identical
        everywhere,” a demo that might show wrong output is worse than no demo.
      </p>

      <div className="mt-renge-6 space-y-renge-6">
        {demoCases.map((c) => (
          <section key={`${c.ruleId}-${c.title}`} aria-labelledby={`demo-${slug(c.title)}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-renge-2">
              <h2
                id={`demo-${slug(c.title)}`}
                className="text-renge-base font-semibold tracking-tight text-renge-fg"
              >
                {c.title}
              </h2>
              <p className="mono text-renge-xs text-renge-fg-subtle">
                {c.ruleId} ·{' '}
                {c.tier === 'format' ? (
                  <span className="font-semibold text-[var(--gate-known-ink)]">
                    format tier — auto-fixed
                  </span>
                ) : (
                  <span className="font-semibold text-[var(--gate-guess-ink)]">
                    lint tier — reported, never auto-applied
                  </span>
                )}
              </p>
            </div>

            <div className="mt-renge-4 grid gap-renge-4 md:grid-cols-2">
              <CodeBlock label="before" code={c.before} />
              <CodeBlock
                label={c.applied ? 'after `aria fix`' : 'after `aria fix` — unchanged, by design'}
                code={c.after}
                tone={c.applied ? 'known' : 'guess'}
              />
            </div>

            <div
              className={`mt-renge-3 rounded-renge-2 border px-renge-3 py-renge-3 ${
                c.severity === 'error'
                  ? 'border-renge-success bg-renge-success-subtle'
                  : 'border-renge-warning bg-renge-warning-subtle'
              }`}
            >
              <p className="mono text-renge-xs font-semibold uppercase tracking-wider text-renge-fg-subtle">
                aria check · {c.severity}
              </p>
              <p className="mt-renge-1 text-renge-sm leading-relaxed text-renge-fg-muted">
                {c.diagnostic}
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-renge-6 rounded-renge-3 border border-renge-border-subtle bg-renge-bg-subtle p-renge-4">
        <h2 className="text-renge-base font-semibold">Run it yourself — the demo is one command away.</h2>
        <p className="prose-measure mt-renge-2 text-renge-sm leading-relaxed text-renge-fg-muted">
          The honest interactive version of this page is your own codebase:
        </p>
        <pre className="mono mt-renge-3 overflow-x-auto rounded-renge-1 bg-renge-bg-inverse px-renge-3 py-renge-3 text-renge-xs leading-relaxed text-renge-fg-inverse">
          <code>npx @aria-a11y/cli check src</code>
        </pre>
      </div>
    </div>
  );
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
