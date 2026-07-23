// Real output captured from the published @aria-a11y/cli@0.2.0 running against
// these exact snippets — not hand-typed to look plausible. `after` is the true
// `aria fix` result; `diagnostic` is the true `aria check` message; `applied`
// reflects whether the fix actually changed the file. Static by design: zero
// risk of drifting from the CI-verified rule behaviour.

export interface DemoCase {
  ruleId: string;
  tier: 'format' | 'lint';
  severity: 'error' | 'warning';
  /** True when `aria fix` auto-applied a change (format tier only). */
  applied: boolean;
  title: string;
  before: string;
  after: string;
  diagnostic: string;
}

export const demoCases: DemoCase[] = [
  {
    ruleId: 'no-redundant-role',
    tier: 'format',
    severity: 'error',
    applied: true,
    title: 'Redundant role',
    before: 'export const A = () => <button role="button">Save</button>;',
    after: 'export const A = () => <button>Save</button>;',
    diagnostic:
      "Role 'button' is redundant: it matches the implicit role of <button>. Remove it.",
  },
  {
    ruleId: 'no-unsupported-aria',
    tier: 'format',
    severity: 'error',
    applied: true,
    title: 'Unsupported aria-*',
    before: 'export const B = () => <button aria-checked="true">Go</button>;',
    after: 'export const B = () => <button>Go</button>;',
    diagnostic:
      "'aria-checked' is not supported by role 'button' of <button>: WAI-ARIA defines no such property for the role, so user agents ignore it. Remove it.",
  },
  {
    ruleId: 'control-needs-name',
    tier: 'lint',
    severity: 'warning',
    applied: false,
    title: 'Icon-only button, no name',
    before: 'export const C = () => <button><svg /></button>;',
    after: 'export const C = () => <button><svg /></button>;',
    diagnostic:
      '<button> is an interactive control (button) with no accessible name, so assistive technology cannot announce it (control-needs-name; WCAG 2.1 SC 4.1.2). Add text content, aria-label, or an associated <label>. A placeholder is not a name. Aria cannot write it for you.',
  },
  {
    ruleId: 'control-needs-name',
    tier: 'lint',
    severity: 'warning',
    applied: false,
    title: 'Placeholder is not a name',
    before: 'export const D = () => <input type="text" placeholder="Search" />;',
    after: 'export const D = () => <input type="text" placeholder="Search" />;',
    diagnostic:
      '<input> is an interactive control (textbox) with no accessible name, so assistive technology cannot announce it (control-needs-name; WCAG 2.1 SC 4.1.2). Add text content, aria-label, or an associated <label>. A placeholder is not a name. Aria cannot write it for you.',
  },
  {
    ruleId: 'aria-hidden-not-focusable',
    tier: 'lint',
    severity: 'warning',
    applied: false,
    title: 'Focusable ghost',
    before: 'export const E = () => <div aria-hidden="true"><button>x</button></div>;',
    after: 'export const E = () => <div aria-hidden="true"><button>x</button></div>;',
    diagnostic:
      '<div> has aria-hidden="true" but its hidden subtree still contains a focusable element (<button>), a focusable ghost (aria-hidden-not-focusable; WAI-ARIA 1.2). Remove aria-hidden, make the descendant non-focusable (tabindex="-1"), or move it out of the hidden subtree. Aria will not choose.',
  },
];
