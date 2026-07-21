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
        isFormat ? 'border-renge-success' : 'border-renge-warning'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-renge-3 border-b border-inherit px-renge-4 py-renge-3">
        <h3 id={`rule-${rule.id}`} className="mono text-renge-sm font-semibold text-renge-fg">
          {rule.id}
        </h3>
        <div className="flex items-center gap-renge-2">
          <span
            className={`rounded-renge-full px-renge-2 py-renge-1 text-renge-xs font-semibold uppercase tracking-wider ${
              isFormat
                ? 'bg-renge-success-subtle text-[var(--gate-known-ink)]'
                : 'bg-renge-warning-subtle text-[var(--gate-guess-ink)]'
            }`}
          >
            {rule.tier}
          </span>
          <span className="rounded-renge-full bg-renge-bg-inverse px-renge-2 py-renge-1 text-renge-xs font-semibold uppercase tracking-wider text-renge-fg-inverse">
            {rule.status}
          </span>
        </div>
      </div>
      <div className="space-y-renge-3 px-renge-4 py-renge-3">
        <p className="text-renge-sm leading-relaxed text-renge-fg-muted">{rule.summary}</p>
        <p className="text-renge-sm leading-relaxed text-renge-fg-subtle">{rule.note}</p>
        <dl className="space-y-renge-1 border-t border-renge-border-subtle pt-renge-3 text-renge-xs">
          <div className="flex gap-renge-2">
            <dt className="w-14 shrink-0 font-semibold uppercase tracking-wider text-renge-fg-subtle">
              Basis
            </dt>
            <dd className="mono text-renge-fg-muted">{rule.basis}</dd>
          </div>
          <div className="flex gap-renge-2">
            <dt className="w-14 shrink-0 font-semibold uppercase tracking-wider text-renge-fg-subtle">
              Spec
            </dt>
            <dd className="leading-relaxed text-renge-fg-muted">{rule.spec}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default function RulesPage() {
  return (
    <div className="container-tight py-renge-6 sm:py-renge-7">
      <p className="eyebrow">Rules reference</p>
      <h1 className="mt-renge-3 text-renge-xl font-semibold leading-[1.08] tracking-tight">
        Eight rules. Every one cited, tested, and CI-gated.
      </h1>
      <p className="prose-measure mt-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
        This page mirrors the repo’s{' '}
        <a href={REGISTRY_URL} className="underline underline-offset-4 hover:text-renge-fg">
          rule registry
        </a>{' '}
        — the file a reviewer reads to learn a rule’s tier, basis, and spec citation without
        reading implementation code. The registry is the source of truth; nothing is marked
        shipped there that isn’t tested and CI-gated in the repo.
      </p>

      <section aria-labelledby="format-heading" className="mt-renge-6">
        <h2 id="format-heading" className="text-renge-lg font-semibold tracking-tight">
          Format tier{' '}
          <span className="text-renge-sm font-normal text-renge-fg-subtle">
            — basis native | declared. Auto-applied on save / --fix. Never add asserted values.
          </span>
        </h2>
        <div className="mt-renge-4 grid gap-renge-4">
          {formatRules.map((r) => (
            <RuleCard key={r.id} rule={r} />
          ))}
        </div>
      </section>

      <section aria-labelledby="lint-heading" className="mt-renge-6">
        <h2 id="lint-heading" className="text-renge-lg font-semibold tracking-tight">
          Lint tier{' '}
          <span className="text-renge-sm font-normal text-renge-fg-subtle">
            — located diagnostics, human-reviewed, never auto-applied.
          </span>
        </h2>
        <p className="prose-measure mt-renge-3 text-renge-sm leading-relaxed text-renge-fg-subtle">
          Most carry <span className="mono">inferred</span> basis. Several are the interesting
          exception: a <span className="mono">native</span> fact that is still lint-tier — because
          the finding is advisory (idref-resolves), because only a human can author the repair
          (img-needs-alt, control-needs-name), or because multiple valid repairs exist and Aria
          refuses to pick (aria-hidden-not-focusable). Basis and tier deliberately diverge, and the
          registry documents each reason.
        </p>
        <div className="mt-renge-4 grid gap-renge-4">
          {lintRules.map((r) => (
            <RuleCard key={r.id} rule={r} />
          ))}
        </div>
      </section>

      <section aria-labelledby="watch-heading" className="mt-renge-6">
        <h2 id="watch-heading" className="text-renge-lg font-semibold tracking-tight">
          Watch queue{' '}
          <span className="text-renge-sm font-normal text-renge-fg-subtle">
            — roadmap, awaiting host platform support. Not shipped.
          </span>
        </h2>
        <ul className="mt-renge-4 space-y-renge-2 text-renge-sm leading-relaxed text-renge-fg-muted">
          <li>Vue SFC template rules — blocked on the oxlint Vue parser (in progress upstream).</li>
          <li>Svelte component rules — blocked on an oxlint Svelte parser (not started).</li>
          <li>HTML template rules — blocked on oxlint / parse5 integration (not started).</li>
        </ul>
      </section>

      <p className="mt-renge-6 border-t border-renge-border-subtle pt-renge-4 text-renge-xs leading-relaxed text-renge-fg-subtle">
        This page is generated from a structured snapshot of the registry (see{' '}
        <span className="mono">data/rules.ts</span> in the site repo), checked against the live
        registry by a drift script. If the registry and this page ever disagree, the registry wins.
      </p>
    </div>
  );
}
