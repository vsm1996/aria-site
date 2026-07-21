import type { Metadata } from 'next';
import { formatRules, lintRules, REGISTRY_URL, type Rule } from '@/data/rules';

export const metadata: Metadata = {
  title: 'Rules reference',
  description:
    "Every Aria rule with its real status, tier, basis, and spec citation — mirrored from the repo's rule registry, not reformatted into marketing language.",
};

function RuleCard({ rule }: { rule: Rule }) {
  const isFormat = rule.tier === 'format';
  return (
    <article
      aria-labelledby={`rule-${rule.id}`}
      className={`card overflow-hidden ${
        isFormat ? 'border-[var(--color-known-line)]' : 'border-[var(--color-guess-line)]'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-inherit px-5 py-3">
        <h3 id={`rule-${rule.id}`} className="mono text-sm font-semibold text-[var(--color-ink)]">
          {rule.id}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
              isFormat
                ? 'bg-[var(--color-known-soft)] text-[var(--color-known-ink)]'
                : 'bg-[var(--color-guess-soft)] text-[var(--color-guess-ink)]'
            }`}
          >
            {rule.tier}
          </span>
          <span className="rounded-full bg-[var(--color-ink)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-paper)]">
            {rule.status}
          </span>
        </div>
      </div>
      <div className="space-y-3 px-5 py-4">
        <p className="text-sm leading-relaxed text-[var(--color-ink-2)]">{rule.summary}</p>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{rule.note}</p>
        <dl className="space-y-1.5 border-t border-[var(--color-line)] pt-3 text-xs">
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 font-semibold uppercase tracking-wider text-[var(--color-muted)]">
              Basis
            </dt>
            <dd className="mono text-[var(--color-ink-2)]">{rule.basis}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 font-semibold uppercase tracking-wider text-[var(--color-muted)]">
              Spec
            </dt>
            <dd className="leading-relaxed text-[var(--color-ink-2)]">{rule.spec}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default function RulesPage() {
  return (
    <div className="container-tight py-16 sm:py-20">
      <p className="eyebrow">Rules reference</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Eight rules. Every one cited, tested, and CI-gated.
      </h1>
      <p className="prose-measure mt-4 text-base leading-relaxed text-[var(--color-ink-2)]">
        This page mirrors the repo’s{' '}
        <a href={REGISTRY_URL} className="underline underline-offset-4 hover:text-[var(--color-ink)]">
          rule registry
        </a>{' '}
        — the file a reviewer reads to learn a rule’s tier, basis, and spec citation without
        reading implementation code. The registry is the source of truth; nothing is marked
        shipped there that isn’t tested and CI-gated in the repo.
      </p>

      <section aria-labelledby="format-heading" className="mt-12">
        <h2 id="format-heading" className="text-xl font-semibold tracking-tight">
          Format tier{' '}
          <span className="text-sm font-normal text-[var(--color-muted)]">
            — basis native | declared. Auto-applied on save / --fix. Never add asserted values.
          </span>
        </h2>
        <div className="mt-5 grid gap-4">
          {formatRules.map((r) => (
            <RuleCard key={r.id} rule={r} />
          ))}
        </div>
      </section>

      <section aria-labelledby="lint-heading" className="mt-12">
        <h2 id="lint-heading" className="text-xl font-semibold tracking-tight">
          Lint tier{' '}
          <span className="text-sm font-normal text-[var(--color-muted)]">
            — located diagnostics, human-reviewed, never auto-applied.
          </span>
        </h2>
        <p className="prose-measure mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          Most carry <span className="mono">inferred</span> basis. Several are the interesting
          exception: a <span className="mono">native</span> fact that is still lint-tier — because
          the finding is advisory (idref-resolves), because only a human can author the repair
          (img-needs-alt, control-needs-name), or because multiple valid repairs exist and Aria
          refuses to pick (aria-hidden-not-focusable). Basis and tier deliberately diverge, and the
          registry documents each reason.
        </p>
        <div className="mt-5 grid gap-4">
          {lintRules.map((r) => (
            <RuleCard key={r.id} rule={r} />
          ))}
        </div>
      </section>

      <section aria-labelledby="watch-heading" className="mt-12">
        <h2 id="watch-heading" className="text-xl font-semibold tracking-tight">
          Watch queue{' '}
          <span className="text-sm font-normal text-[var(--color-muted)]">
            — roadmap, awaiting host platform support. Not shipped.
          </span>
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-ink-2)]">
          <li>Vue SFC template rules — blocked on the oxlint Vue parser (in progress upstream).</li>
          <li>Svelte component rules — blocked on an oxlint Svelte parser (not started).</li>
          <li>HTML template rules — blocked on oxlint / parse5 integration (not started).</li>
        </ul>
      </section>

      <p className="mt-12 border-t border-[var(--color-line)] pt-6 text-xs leading-relaxed text-[var(--color-muted)]">
        This page is generated from a structured snapshot of the registry (see{' '}
        <span className="mono">data/rules.ts</span> in the site repo), checked against the live
        registry by a drift script. If the registry and this page ever disagree, the registry wins.
      </p>
    </div>
  );
}
