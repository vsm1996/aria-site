// Snapshot of docs/rule-registry.md from github.com/vsm1996/aria.
// The registry is the source of truth; this file is a structured mirror of it.
// Regenerate with `npm run gen:rules` (see scripts/gen-rules.mjs). Every status,
// tier, basis, and spec citation below is copied verbatim from the registry —
// nothing is softened into marketing language.

export type Tier = 'format' | 'lint';
export type Status = 'SHIPPED' | 'CANDIDATE' | 'WATCH';

export interface Rule {
  id: string;
  tier: Tier;
  status: Status;
  /** The basis exactly as the registry states it. */
  basis: string;
  /** WCAG / WAI-ARIA citation, verbatim from the registry. */
  spec: string;
  /** One-sentence summary, sourced from the README's "What exists today". */
  summary: string;
  /** Behaviour note — the deliberate scope call the registry documents. */
  note: string;
}

export const REGISTRY_VERSION = '0.1.1';
export const REGISTRY_URL =
  'https://github.com/vsm1996/aria/blob/main/docs/rule-registry.md';

export const rules: Rule[] = [
  // ---- Format tier (auto-applied on save / --fix; never add asserted values) ----
  {
    id: 'no-redundant-role',
    tier: 'format',
    status: 'SHIPPED',
    basis: 'native',
    spec: 'WAI-ARIA 1.2 §6.3 — "Authors MUST NOT use an explicit role that is the same as the element’s implicit ARIA role."',
    summary:
      "Removes an explicit role that duplicates the element's implicit role (<button role=\"button\"> → <button>).",
    note: 'Resolves ancestor-dependent roles statically and stays silent on anything undecidable — a broken ancestor chain, a spread, a dynamic role.',
  },
  {
    id: 'no-unsupported-aria',
    tier: 'format',
    status: 'SHIPPED',
    basis: 'native',
    spec: 'ARIA in HTML §2.4 / WAI-ARIA 1.2 §6.5 — ARIA attributes not in the allowed set for a role SHOULD be ignored. Removing them makes source honest.',
    summary:
      "Removes aria-* attributes WAI-ARIA doesn't support on the element's resolved role (<button aria-checked> → <button>).",
    note: 'Global ARIA properties are never touched, and an unresolved role means every aria-* on the element stays put.',
  },
  {
    id: 'aria-syntax-normalize',
    tier: 'format',
    status: 'SHIPPED',
    basis: 'native',
    spec: 'WAI-ARIA 1.2 §6.1 — ARIA attribute names and state/property token values are processed case-insensitively; lowercase is canonical and lossless.',
    summary:
      'Canonical lowercase for ARIA attribute names (aria-Label → aria-label) and enumerated values (aria-hidden="True" → "true").',
    note: 'Only ever changes character case — tested as a property, not a promise. Attribute ordering and role-value casing are deliberately out of scope.',
  },

  // ---- Lint tier (located diagnostics, human-reviewed, never auto-applied) ----
  {
    id: 'interactive-role-required',
    tier: 'lint',
    status: 'SHIPPED',
    basis: 'inferred → declared via config',
    spec: 'WCAG 2.1 SC 4.1.2 — UI components must have a role. Non-semantic elements with event handlers need one.',
    summary:
      'Flags a generic element (div, span) with a click handler and no role, then inspects its children to decide what to say.',
    note: 'A button-like element gets a role="button" suggestion; an ambiguous one is report-only. Every intrinsic diagnostic is inferred basis, so the gate keeps it a suggestion — until config declares the component, when it graduates to a real auto-fix.',
  },
  {
    id: 'control-needs-name',
    tier: 'lint',
    status: 'SHIPPED',
    basis: 'native (report-only) · declared for the component path',
    spec: 'WCAG 2.1 SC 4.1.2 — UI components must have an accessible name. Cannot author the name text — flagging only.',
    summary:
      'Flags an interactive control with no accessible name — an icon-only <button>/<a href>, an unlabeled <input>/<textarea>/<select>.',
    note: 'A name can come from text content, aria-label, a resolving aria-labelledby, or an associated <label>. A placeholder is explicitly not a name.',
  },
  {
    id: 'img-needs-alt',
    tier: 'lint',
    status: 'SHIPPED',
    basis: 'native (report-only)',
    spec: 'WCAG 2.1 SC 1.1.1 — All non-decorative images need alt text. Cannot author the text — flagging only.',
    summary:
      'Flags an <img> exposed as an image with no accessible name and no decorative signal.',
    note: 'alt="", role="presentation", aria-label, aria-labelledby, and aria-hidden all legitimately silence it — the point is presence of some valid encoding, not the word "alt".',
  },
  {
    id: 'idref-resolves',
    tier: 'lint',
    status: 'SHIPPED',
    basis: 'native (report-only)',
    spec: 'WAI-ARIA 1.2 §7 — aria-labelledby/describedby/controls MUST reference a valid id. In-file check only.',
    summary:
      "Flags aria-labelledby / aria-describedby / aria-controls references to an id that doesn't exist anywhere in the file.",
    note: 'The first rule where basis and tier deliberately diverge: the detection is a native fact, but it stays advisory because a reference can legitimately point across files. Literal-to-literal only.',
  },
  {
    id: 'aria-hidden-not-focusable',
    tier: 'lint',
    status: 'SHIPPED',
    basis: 'native (report-only)',
    spec: 'WAI-ARIA 1.2 — aria-hidden=true MUST NOT be applied to a focusable element (or a subtree containing one). Fix is ambiguous → lint.',
    summary:
      'Flags aria-hidden="true" on a focusable element — or on a subtree that still contains one (the common modal/dropdown bug).',
    note: 'A "focusable ghost" a keyboard user can reach but assistive tech can\'t see. Report-only because several valid repairs exist and which is right depends on intent the tool can\'t see.',
  },
];

export const formatRules = rules.filter((r) => r.tier === 'format');
export const lintRules = rules.filter((r) => r.tier === 'lint');
