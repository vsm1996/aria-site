/**
 * The one diagram that explains the whole project: every accessibility fact is
 * classified by where its semantics came from, and one gate decides what may be
 * auto-applied. Content mirrors the gate table in the repo README / CLAUDE.md §2.
 */
export function GateDiagram() {
  return (
    <figure aria-labelledby="gate-caption" className="w-full">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* Left: known semantics */}
        <div className="card overflow-hidden border-[var(--color-known-line)]">
          <div className="border-b border-[var(--color-known-line)] bg-[var(--color-known-soft)] px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-known-ink)]">
              Known semantics
            </p>
          </div>
          <div className="space-y-4 px-5 py-5">
            <div>
              <p className="mono text-sm font-semibold text-[var(--color-known-ink)]">native</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-2)]">
                The implicit role of real HTML, per aria-query. <span className="mono">&lt;button&gt;</span> is a
                button. Nobody guessed.
              </p>
            </div>
            <div>
              <p className="mono text-sm font-semibold text-[var(--color-known-ink)]">declared</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-2)]">
                Explicit author ARIA, or component semantics a design system declares in{' '}
                <span className="mono">aria.config.ts</span>. Ground truth, supplied.
              </p>
            </div>
            <div className="rounded-md bg-[var(--color-known-soft)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--color-known-ink)]">
                → format tier: auto-fix
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-known-ink)]/80">
                Meaning-preserving, subtractive fixes. Run on save. Fail CI. ESLint/oxlint{' '}
                <span className="mono">fix</span>; Biome <span className="mono">safe</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Middle: the gate itself */}
        <div className="flex items-center justify-center md:px-2">
          <div className="flex max-w-[220px] flex-col items-center gap-3 rounded-xl border-2 border-[var(--color-ink)] bg-[var(--color-ink)] px-5 py-6 text-center text-[var(--color-paper)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">The gate</p>
            <p className="text-sm leading-snug">
              A fix may be auto-applied <em>only</em> if its basis is{' '}
              <span className="mono">native</span> or <span className="mono">declared</span>.
            </p>
            <p className="text-[11px] leading-snug text-[var(--color-paper)]/70">
              Enforced in code, by the host’s fix model, and by tests.
            </p>
          </div>
        </div>

        {/* Right: guessed semantics */}
        <div className="card overflow-hidden border-[var(--color-guess-line)]">
          <div className="border-b border-[var(--color-guess-line)] bg-[var(--color-guess-soft)] px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-guess-ink)]">
              Guessed semantics
            </p>
          </div>
          <div className="space-y-4 px-5 py-5">
            <div>
              <p className="mono text-sm font-semibold text-[var(--color-guess-ink)]">inferred</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-2)]">
                A guess from signals — an <span className="mono">onClick</span> on a div, class
                names, surrounding context. Plausible. Not proven.
              </p>
            </div>
            <div className="rounded-md bg-[var(--color-guess-soft)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--color-guess-ink)]">
                → lint tier: suggestion, never silent
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-guess-ink)]/80">
                Located diagnostics a human approves. Never auto-applied — structurally impossible,
                not just discouraged. ESLint/oxlint <span className="mono">suggestion</span>; Biome{' '}
                <span className="mono">unsafe</span>.
              </p>
            </div>
            <p className="text-xs leading-relaxed text-[var(--color-muted)]">
              The line moves: declare a component’s semantics in config and its diagnostics
              graduate from guess to known — from suggestion to auto-fix.
            </p>
          </div>
        </div>
      </div>
      <figcaption id="gate-caption" className="mt-4 text-center text-xs text-[var(--color-muted)]">
        Every accessibility fact is classified by where its semantics came from. One rule decides
        what runs automatically.
      </figcaption>
    </figure>
  );
}
