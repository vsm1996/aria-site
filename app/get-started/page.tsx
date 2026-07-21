import type { Metadata } from 'next';
import { CodeBlock } from '@/components/CodeBlock';

export const metadata: Metadata = {
  title: 'Get started',
  description:
    'Install eslint-plugin-aria-a11y or run the zero-config @aria-a11y/cli. Real, verified commands — both packages live on npm at 0.1.1.',
};

const INSTALL_PLUGIN = 'npm install --save-dev eslint eslint-plugin-aria-a11y';

const FLAT_CONFIG = `// eslint.config.js
import aria from 'eslint-plugin-aria-a11y';

export default [
  { plugins: { 'aria-a11y': aria }, rules: aria.configs.recommended.rules },
];`;

const CLI_USAGE = `npx @aria-a11y/cli check [paths]   # report a11y diagnostics (both tiers);
                                   # exits nonzero on any format-tier issue — the CI teeth
npx @aria-a11y/cli fix   [paths]   # apply format-tier (safe, meaning-preserving) fixes only`;

const CONFIG_BRIDGE = `// aria.config.ts — optional; how a design system declares component semantics
import { defineConfig } from '@aria/config';

export default defineConfig({
  componentSemantics: {
    IconButton: { role: 'button' },
  },
});`;

export default function GetStartedPage() {
  return (
    <div className="container-tight py-renge-6 sm:py-renge-7">
      <p className="eyebrow">Get started</p>
      <h1 className="mt-renge-3 text-renge-xl font-semibold leading-[1.08] tracking-tight">
        Two surfaces, one rule set.
      </h1>
      <p className="prose-measure mt-renge-4 text-renge-base leading-relaxed text-renge-fg-muted">
        Both packages are live on npm at <span className="mono text-renge-sm">0.1.1</span>. The plugin
        and the CLI run the exact same rule modules — output is identical by construction, and a
        parity test in the repo asserts it.
      </p>

      {/* Plugin */}
      <section aria-labelledby="plugin" className="mt-renge-6">
        <h2 id="plugin" className="text-renge-lg font-semibold tracking-tight">
          The ESLint plugin
        </h2>
        <p className="prose-measure mt-renge-3 text-renge-base leading-relaxed text-renge-fg-muted">
          A standard flat-config plugin. It also runs under oxlint via{' '}
          <span className="mono text-renge-sm">jsPlugins</span>, unchanged — the aria repo’s own{' '}
          <a
            href="https://github.com/vsm1996/aria/blob/main/.oxlintrc.json"
            className="underline underline-offset-4 hover:text-renge-fg"
          >
            .oxlintrc.json
          </a>{' '}
          is a working example.
        </p>
        <div className="mt-renge-4 space-y-renge-4">
          <CodeBlock label="install" code={INSTALL_PLUGIN} />
          <CodeBlock label="eslint.config.js" code={FLAT_CONFIG} />
        </div>
        <p className="mt-renge-4 text-renge-sm leading-relaxed text-renge-fg-subtle">
          The recommended config sets the three format-tier rules to{' '}
          <span className="mono">error</span> — that’s the CI gate — and the five lint-tier rules
          to <span className="mono">warn</span>.
        </p>
      </section>

      {/* CLI */}
      <section aria-labelledby="cli" className="mt-renge-6">
        <h2 id="cli" className="text-renge-lg font-semibold tracking-tight">
          The zero-config CLI
        </h2>
        <p className="prose-measure mt-renge-3 text-renge-base leading-relaxed text-renge-fg-muted">
          No ESLint config file, no host setup — point it at files or directories and it works,
          parsing .jsx/.tsx (and plain JS) out of the box.
        </p>
        <div className="mt-renge-4">
          <CodeBlock label="usage" code={CLI_USAGE} />
        </div>
        <p className="prose-measure mt-renge-4 text-renge-sm leading-relaxed text-renge-fg-subtle">
          Under the hood the CLI wraps ESLint’s Linter programmatically with a Babel→ESTree parser
          — so eslint is a real internal dependency. That’s an implementation detail, not something
          you configure. “Standalone” means no ESLint config and no host — not a claim of zero
          ESLint code inside.
        </p>
      </section>

      {/* Config bridge */}
      <section aria-labelledby="config" className="mt-renge-6">
        <h2 id="config" className="text-renge-lg font-semibold tracking-tight">
          Optional: declare your design system
        </h2>
        <p className="prose-measure mt-renge-3 text-renge-base leading-relaxed text-renge-fg-muted">
          Both surfaces pick up an <span className="mono text-renge-sm">aria.config.&#123;ts,js,json&#125;</span>{' '}
          if present, but require none. Declaring a component’s semantics graduates its diagnostics
          from inferred suggestion to declared auto-fix — the line between guess and known moves in
          your favor as your design system declares more.
        </p>
        <div className="mt-renge-4">
          <CodeBlock label="aria.config.ts" code={CONFIG_BRIDGE} />
        </div>
      </section>

      {/* Version note */}
      <section aria-labelledby="version" className="mt-renge-6">
        <h2 id="version" className="sr-only">
          Version note
        </h2>
        <div className="rounded-renge-2 border border-renge-warning bg-renge-warning-subtle px-renge-4 py-renge-3">
          <p className="text-renge-sm leading-relaxed text-[var(--gate-guess-ink)]">
            <strong>Version note:</strong> start at <span className="mono">0.1.1</span>.{' '}
            <span className="mono">0.1.0</span> exists in npm’s history but was broken for
            installers (a packaging bug — its manifest pointed at unshipped src); it’s fixed in
            0.1.1 and guarded by a real install-and-import CI check. Details in the repo’s{' '}
            <a
              href="https://github.com/vsm1996/aria/blob/main/CHANGELOG.md"
              className="underline underline-offset-4"
            >
              CHANGELOG
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
