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

## Develop

```sh
npm install
npm run dev
```
