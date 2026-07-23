import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';

export const metadata: Metadata = {
  title: 'Architecture',
  description:
    'The tier split, the basis taxonomy (native/declared/inferred), and the gate — how Aria decides what may run automatically, explained for engineers.',
};

const SEMANTIC_SOURCE = `type SemanticSource =
  | 'native'    // implicit role/semantics of a real HTML element, per aria-query
  | 'declared'  // author-written explicit ARIA, or component semantics from config
  | 'inferred'; // guessed by the engine from signals (onClick, class names, context)`;

const TIER = `type Tier =
  | 'format'  // meaning-preserving. runs on save. gates CI.
  | 'lint';   // inference. located errors + suggested fixes. never silently applied.`;

const CONFIG_EXAMPLE = `// aria.config.ts
import { defineConfig } from '@aria/config';

export default defineConfig({
  componentSemantics: {
    // renders a native <button>: declared so the name checks understand it
    IconButton:  { role: 'button', requiresName: true, nameProp: 'aria-label' },
    // renders a <div> that needs the role at runtime: opt into injection
    MenuButton:  { role: 'button', injectRole: true },
  },
});`;

export default function ArchitecturePage() {
  return (
    <div className="container-tight py-renge-6 sm:py-renge-7">
      <p className="eyebrow">Architecture</p>
      <h1 className="mt-renge-3 text-renge-xl font-semibold leading-[1.08] tracking-tight">
        One hard line, and finding it is the entire design.
      </h1>

      {/* The point */}
      <section aria-labelledby="point" className="mt-renge-5">
        <h2 id="point" className="text-renge-lg font-semibold tracking-tight">
          Why a formatter
        </h2>
        <div className="prose-measure mt-renge-4 space-y-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
          <p>
            Code formatters won. Not because they made code prettier, but because they made a class
            of argument extinct. Nobody debates brace style anymore because{' '}
            <span className="mono text-renge-sm">prettier --check</span> turns the debate into a failing
            build. The discipline that made that possible is a single contract:{' '}
            <strong>a formatter never changes what the code means.</strong> Output is equivalent by
            construction. That is the only reason a human stopped reading the diff.
          </p>
          <p>
            Accessibility has no such tool, and the absence is the excuse. “I’ll add a11y later”
            survives because a11y currently looks like judgment work: open a PR, argue about roles,
            eyeball a screen reader. Aria’s thesis is that a real, defensible slice of that work is
            mechanical, and the mechanical slice can be held to the formatter contract.
          </p>
          <p>
            The catch is that accessibility breaks the formatter contract the instant you guess.
            Put <span className="mono text-renge-sm">role=&quot;button&quot;</span> on a{' '}
            <span className="mono text-renge-sm">div</span> and you changed behavior. Author{' '}
            <span className="mono text-renge-sm">aria-label=&quot;Close&quot;</span> and you asserted a
            fact that might be a lie — and the spec is explicit that a wrong label is worse than
            none.
          </p>
        </div>
      </section>

      {/* The invariant */}
      <section aria-labelledby="invariant" className="mt-renge-6">
        <h2 id="invariant" className="text-renge-lg font-semibold tracking-tight">
          The central invariant
        </h2>
        <p className="prose-measure mt-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
          Aria classifies every accessibility fact by where its semantics came from, and every rule
          belongs to exactly one tier:
        </p>
        <div className="mt-renge-4 grid gap-renge-4 md:grid-cols-2">
          <CodeBlock label="the basis taxonomy" code={SEMANTIC_SOURCE} />
          <CodeBlock label="the two tiers" code={TIER} />
        </div>
        <blockquote className="mt-renge-4 rounded-renge-2 border-l-4 border-renge-fg bg-renge-bg-subtle px-renge-4 py-renge-3">
          <p className="text-renge-base font-medium leading-relaxed text-renge-fg">
            A fix may run in the format tier only if its semantic basis is{' '}
            <span className="mono text-renge-sm">native</span> or{' '}
            <span className="mono text-renge-sm">declared</span>. Any fix whose basis is{' '}
            <span className="mono text-renge-sm">inferred</span> is lint tier and is never auto-applied.
          </p>
        </blockquote>
        <p className="prose-measure mt-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
          The formatter acts only on semantics it <em>knows</em> — real HTML, or declared via
          config. It never acts on semantics it <em>guessed</em>. A format-tier fix must
          additionally satisfy meaning-preservation: for every possible runtime, the computed
          accessibility tree after the fix is identical to before, or strictly more
          spec-conformant, with zero change to the conveyed name, role, or state. In practice that
          means format fixes are <strong>subtractive or normalizing</strong> — they delete ARIA
          that is redundant or forbidden, and they normalize syntax. They do not add assertions.
        </p>
      </section>

      {/* Enforcement */}
      <section aria-labelledby="enforcement" className="mt-renge-6">
        <h2 id="enforcement" className="text-renge-lg font-semibold tracking-tight">
          Enforced three times, not promised once
        </h2>
        <div className="mt-renge-4 grid gap-renge-4 md:grid-cols-3">
          <div className="card p-renge-4">
            <p className="mono text-renge-sm font-semibold">1 · in code</p>
            <p className="mt-renge-2 text-renge-sm leading-relaxed text-renge-fg-muted">
              Rules never choose their fix kind. They declare a basis, and{' '}
              <span className="mono">@aria/core</span>’s policy derives the kind;{' '}
              <span className="mono">assertGate</span> throws on any inferred + auto-fix pairing.
              An inferred auto-fix is structurally impossible to emit, not merely discouraged.
            </p>
          </div>
          <div className="card p-renge-4">
            <p className="mono text-renge-sm font-semibold">2 · by the host</p>
            <p className="mt-renge-2 text-renge-sm leading-relaxed text-renge-fg-muted">
              ESLint and oxlint already distinguish an auto-applied <span className="mono">fix</span>{' '}
              from a surfaced <span className="mono">suggestion</span>. The gate maps onto that
              model, so the host’s own machinery guarantees inferred fixes never land on save.
            </p>
          </div>
          <div className="card p-renge-4">
            <p className="mono text-renge-sm font-semibold">3 · by tests</p>
            <p className="mt-renge-2 text-renge-sm leading-relaxed text-renge-fg-muted">
              A property suite asserts no inferred-basis diagnostic ever carries an applied fix,
              and an ESLint ↔ oxlint parity harness re-verifies every fixture on both hosts on
              every commit — a required CI check, currently zero drift.
            </p>
          </div>
        </div>
      </section>

      {/* Basis ≠ tier */}
      <section aria-labelledby="taxonomy" className="mt-renge-6">
        <h2 id="taxonomy" className="text-renge-lg font-semibold tracking-tight">
          Basis and tier can deliberately diverge
        </h2>
        <p className="prose-measure mt-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
          The gate says what may be <em>auto-applied</em>; it doesn’t force every provable fact to
          become an auto-fix. Several shipped rules detect a <span className="mono text-renge-sm">native</span>{' '}
          fact yet stay lint-tier, for three distinct, documented reasons:
        </p>
        <dl className="mt-renge-4 space-y-renge-4">
          <div className="card p-renge-4">
            <dt className="text-renge-sm font-semibold">
              Uncertain-if-broken <span className="mono font-normal text-renge-fg-subtle">— idref-resolves</span>
            </dt>
            <dd className="mt-renge-1 text-renge-sm leading-relaxed text-renge-fg-muted">
              “Not found in this file” is a fact, but not conclusively a bug — an id can
              legitimately live in another file or be injected at runtime. Advisory, never
              CI-failing: a false positive on correct code is the one thing the format tier may
              never produce.
            </dd>
          </div>
          <div className="card p-renge-4">
            <dt className="text-renge-sm font-semibold">
              Unfixable-by-machine{' '}
              <span className="mono font-normal text-renge-fg-subtle">
                — img-needs-alt, control-needs-name
              </span>
            </dt>
            <dd className="mt-renge-1 text-renge-sm leading-relaxed text-renge-fg-muted">
              A nameless image or control is certainly broken, but the only repair is authoring
              content — a hard non-goal. Aria flags the gap and leaves the words to a human.
            </dd>
          </div>
          <div className="card p-renge-4">
            <dt className="text-renge-sm font-semibold">
              Refuses-to-pick{' '}
              <span className="mono font-normal text-renge-fg-subtle">— aria-hidden-not-focusable</span>
            </dt>
            <dd className="mt-renge-1 text-renge-sm leading-relaxed text-renge-fg-muted">
              A mechanical fix exists (<span className="mono">tabindex=&quot;-1&quot;</span>), but
              which repair is right depends on intent the tool can’t see — applying the wrong one
              would make things strictly worse. The rule names the options and declines to choose.
            </dd>
          </div>
        </dl>
      </section>

      {/* The bridge */}
      <section aria-labelledby="bridge" className="mt-renge-6">
        <h2 id="bridge" className="text-renge-lg font-semibold tracking-tight">
          The line moves: the config bridge
        </h2>
        <div className="mt-renge-4 grid items-start gap-renge-4 md:grid-cols-2">
          <div className="prose-measure space-y-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
            <p>
              The boundary between guess and known isn’t fixed — config is the lever. Declare a
              component’s semantics and the engine stops guessing: its diagnostics move from{' '}
              <span className="mono text-renge-sm">inferred</span> to{' '}
              <span className="mono text-renge-sm">declared</span> basis. The declared{' '}
              <span className="mono text-renge-sm">role</span> is descriptive — it lets the name
              checks understand the component. Role <em>injection</em> is a separate opt-in
              (<span className="mono text-renge-sm">injectRole</span>), for a component that renders a
              non-semantic element and genuinely needs the role: that’s what graduates an inferred
              suggestion to a real declared-basis auto-fix. Proven by named end-to-end tests in the
              repo, not asserted.
            </p>
            <p className="text-renge-sm text-renge-fg-subtle">
              Declared basis doesn’t force a fix, either — a declared image component missing its
              name prop is still report-only, because Aria still can’t author the name. Known
              semantics, honest limits.
            </p>
          </div>
          <CodeBlock label="aria.config.ts" code={CONFIG_EXAMPLE} />
        </div>
      </section>

      <p className="mt-renge-6 border-t border-renge-border-subtle pt-renge-4 text-renge-sm leading-relaxed text-renge-fg-subtle">
        The full spec — the working agreement, the gate, the implementation plan, and every
        documented judgment call — lives in the repo:{' '}
        <a
          href="https://github.com/vsm1996/aria/blob/main/CLAUDE.md"
          className="underline underline-offset-4 hover:text-renge-fg"
        >
          CLAUDE.md
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/vsm1996/aria/blob/main/docs/rule-registry.md"
          className="underline underline-offset-4 hover:text-renge-fg"
        >
          docs/rule-registry.md
        </a>
        .
      </p>
    </div>
  );
}
