# aria-site

Marketing and documentation site for [Aria](https://github.com/vsm1996/aria) —
the accessibility formatter. Next.js + Tailwind, deployed on Vercel. Standalone
repo, same relationship to the aria monorepo as Renge's site has to Renge.

## Content discipline

Every claim on this site is sourced from the aria repo's README, CLAUDE.md, and
docs/rule-registry.md — nothing invented or approximated:

- `data/rules.ts` is a structured snapshot of the rule registry. `npm run
  gen:rules` fetches the live registry and fails on any drift (id or status).
- `data/demo.ts` is real output captured from the published
  `@aria-a11y/cli@0.1.1` against those exact snippets — not hand-typed.
- `npm run lint:a11y` runs the published Aria CLI against this site's own JSX;
  the footer's "checked by Aria — zero findings" claim is verified by it.
- `npm run audit:wcag` checks the WCAG AA contrast of every real
  foreground/background pair in both light and dark modes. It runs the design
  system's own `@renge-ui/test-utils` validator alongside a self-checked
  reference computation (black/white must equal 21.00). All pairs pass, and as
  of `@renge-ui/test-utils` 1.1.0 the two engines agree on every pair (an
  earlier OKLCH→luminance bug, fixed upstream, is described in the script
  header). Keeping both engines means any future regression shows up as a
  per-pair disagreement rather than a silent wrong number.

## Develop

```sh
npm install
npm run dev
```

## Design system

Styled with [Renge](https://www.npmjs.com/package/@renge-ui/tokens) via the
`@renge-ui/tailwind` v4 plugin — Fibonacci spacing, φ typography, radius and
motion tokens, profile `ocean` (light mode pinned; dark is a follow-up).

The two gate colors are Renge's own semantic status tokens: **known**
(native/declared → auto-fix) maps to `--renge-color-success`, **guess**
(inferred → suggestion) maps to `--renge-color-warning` — a 90° OKLCH hue
separation that keeps the safe/guess distinction legible. Two site-local ink
shades (`--gate-known-ink`, `--gate-guess-ink`) are hue-locked to those tokens
for AA text contrast on the `-subtle` fills; see `app/globals.css`.

`@renge-ui/react` components are deliberately not used: the package ships no
`use client` boundaries and creates context at module scope, so it cannot be
imported into this site's server components without converting pages to client
components — which would add client JS to a fully static site and re-open the
verified accessibility surface. Tokens and utilities only.
