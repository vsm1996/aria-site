/**
 * The one diagram that explains the whole project: every accessibility fact is
 * classified by where its semantics came from, and one gate decides what may be
 * auto-applied. Content mirrors the gate table in the repo README / CLAUDE.md §2.
 */
export function GateDiagram() {
  return (
    <figure aria-labelledby="gate-caption" className="w-full">
      <div className="grid gap-renge-4 md:grid-cols-[1fr_auto_1fr]">
        {/* Left: known semantics */}
        <div className="card overflow-hidden border-renge-success">
          <div className="border-b border-renge-success bg-renge-success-subtle px-renge-4 py-renge-3">
            <p className="text-renge-xs font-semibold uppercase tracking-[0.14em] text-[var(--gate-known-ink)]">
              Known semantics
            </p>
          </div>
          <div className="space-y-renge-4 px-renge-4 py-renge-4">
            <div>
              <p className="mono text-renge-sm font-semibold text-[var(--gate-known-ink)]">native</p>
              <p className="mt-1 text-renge-sm leading-relaxed text-renge-fg-muted">
                The implicit role of real HTML, per aria-query. <span className="mono">&lt;button&gt;</span> is a
                button. Nobody guessed.
              </p>
            </div>
            <div>
              <p className="mono text-renge-sm font-semibold text-[var(--gate-known-ink)]">declared</p>
              <p className="mt-1 text-renge-sm leading-relaxed text-renge-fg-muted">
                Explicit author ARIA, or component semantics a design system declares in{' '}
                <span className="mono">aria.config.ts</span>. Ground truth, supplied.
              </p>
            </div>
            <div className="rounded-renge-1 bg-renge-success-subtle px-renge-3 py-renge-3">
              <p className="text-renge-sm font-semibold text-[var(--gate-known-ink)]">
                → format tier: auto-fix
              </p>
              <p className="mt-1 text-renge-xs leading-relaxed text-[var(--gate-known-ink)]">
                Meaning-preserving, subtractive fixes. Run on save. Fail CI. ESLint/oxlint{' '}
                <span className="mono">fix</span>; Biome <span className="mono">safe</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Middle: the gate itself */}
        <div className="flex items-center justify-center md:px-2">
          <div className="flex max-w-[220px] flex-col items-center gap-renge-3 rounded-renge-3 border-2 border-renge-fg bg-renge-bg-inverse px-renge-4 py-renge-4 text-center text-renge-fg-inverse">
            <p className="text-renge-xs font-semibold uppercase tracking-[0.18em]">The gate</p>
            <p className="text-renge-sm leading-snug">
              A fix may be auto-applied <em>only</em> if its basis is{' '}
              <span className="mono">native</span> or <span className="mono">declared</span>.
            </p>
            <p className="text-renge-xs leading-snug text-renge-fg-inverse opacity-75">
              Enforced in code, by the host’s fix model, and by tests.
            </p>
          </div>
        </div>

        {/* Right: guessed semantics */}
        <div className="card overflow-hidden border-renge-warning">
          <div className="border-b border-renge-warning bg-renge-warning-subtle px-renge-4 py-renge-3">
            <p className="text-renge-xs font-semibold uppercase tracking-[0.14em] text-[var(--gate-guess-ink)]">
              Guessed semantics
            </p>
          </div>
          <div className="space-y-renge-4 px-renge-4 py-renge-4">
            <div>
              <p className="mono text-renge-sm font-semibold text-[var(--gate-guess-ink)]">inferred</p>
              <p className="mt-1 text-renge-sm leading-relaxed text-renge-fg-muted">
                A guess from signals — an <span className="mono">onClick</span> on a div, class
                names, surrounding context. Plausible. Not proven.
              </p>
            </div>
            <div className="rounded-renge-1 bg-renge-warning-subtle px-renge-3 py-renge-3">
              <p className="text-renge-sm font-semibold text-[var(--gate-guess-ink)]">
                → lint tier: suggestion, never silent
              </p>
              <p className="mt-1 text-renge-xs leading-relaxed text-[var(--gate-guess-ink)]">
                Located diagnostics a human approves. Never auto-applied — structurally impossible,
                not just discouraged. ESLint/oxlint <span className="mono">suggestion</span>; Biome{' '}
                <span className="mono">unsafe</span>.
              </p>
            </div>
            <p className="text-renge-xs leading-relaxed text-renge-fg-subtle">
              The line moves: declare a component’s semantics in config and its diagnostics
              graduate from guess to known — from suggestion to auto-fix.
            </p>
          </div>
        </div>
      </div>
      <figcaption id="gate-caption" className="mt-renge-4 text-center text-renge-xs text-renge-fg-subtle">
        Every accessibility fact is classified by where its semantics came from. One rule decides
        what runs automatically.
      </figcaption>
    </figure>
  );
}
