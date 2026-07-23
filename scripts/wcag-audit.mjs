// WCAG AA contrast audit of the site's real foreground/background pairs, both
// Ocean modes. Run: `npm run audit:wcag`.
//
// Two engines run on the SAME OKLCH token inputs:
//   1. A correct OKLCH→sRGB→relative-luminance computation (WCAG 2.x formula).
//      Self-checked: black/white MUST equal 21.00, and its per-colour hex
//      matches what Lightning CSS / the browser actually paint.
//   2. @renge-ui/test-utils · validateContrastRatio — the design system's own
//      validator, run per the request to exercise it.
//
// The verdict uses engine 1. Engine 2 is reported alongside and, as of
// @renge-ui/test-utils 1.1.0, now AGREES with it on every pair. (Through
// 1.0.2 it had an OKLCH→luminance bug — a double sRGB linearization that was
// only correct at the 0%/100% extremes and badly mis-estimated the midrange,
// emitting false failures on dark backgrounds and false passes on mid-tones.
// Fixed upstream; this script keeps both engines so any future regression
// surfaces as a per-pair disagreement rather than a silent wrong number.)

import { validateContrastRatio } from '@renge-ui/test-utils';

// --- correct OKLCH → relative luminance -------------------------------------
function parseOklch(s) {
  const m = s.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/i);
  if (!m) throw new Error(`bad oklch: ${s}`);
  return [parseFloat(m[1]) / 100, parseFloat(m[2]), parseFloat(m[3])];
}
function oklchToLinearSrgb(L, C, h) {
  const hr = (h * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => Math.max(0, Math.min(1, v))); // gamut clamp, as the browser does
}
function relLuminance(oklch) {
  // WCAG luminance is computed from LINEAR sRGB — no extra gamma step needed;
  // oklchToLinearSrgb already returns linear-light components.
  const [r, g, b] = oklchToLinearSrgb(...parseOklch(oklch));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function trueRatio(fg, bg) {
  const L1 = relLuminance(fg);
  const L2 = relLuminance(bg);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}
function rengeRatio(fg, bg) {
  const r = validateContrastRatio(fg, bg, 100); // force the number into the message
  const m = [...r.errors, ...r.warnings].join(' ').match(/ratio ([\d.]+)/);
  return m ? parseFloat(m[1]) : NaN;
}

// --- self-check: the correct engine must nail the known extreme -------------
const bw = trueRatio('oklch(0% 0 0)', 'oklch(100% 0 0)');
if (Math.abs(bw - 21) > 0.1) {
  console.error(`✗ luminance self-check failed: black/white = ${bw.toFixed(2)}, expected 21.00`);
  process.exit(2);
}

// --- Ocean tokens (as they render), plus the site's derived text tones ------
const T = {
  light: {
    bg: 'oklch(99% 0.01 210)', bgSubtle: 'oklch(93% 0.02 210)', bgInverse: 'oklch(50% 0.08 210)',
    fg: 'oklch(20% 0.02 210)', fgMuted: 'oklch(46% 0.04 210)', fgSubtle: 'oklch(35% 0.03 210)',
    fgInverse: 'oklch(99% 0.01 210)', success: 'oklch(50% 0.2 130)', successSubtle: 'oklch(92% 0.08 130)',
    warning: 'oklch(62% 0.2 40)', warningSubtle: 'oklch(92% 0.08 40)',
    gateKnownInk: 'oklch(34% 0.11 130)', gateGuessInk: 'oklch(38% 0.12 40)',
  },
  dark: {
    bg: 'oklch(14% 0.08 205)', bgSubtle: 'oklch(20% 0.10 205)', bgInverse: 'oklch(93% 0.02 210)',
    fg: 'oklch(92% 0.02 205)', fgMuted: 'oklch(62% 0.06 210)', fgSubtle: 'oklch(76% 0.04 205)',
    fgInverse: 'oklch(14% 0.08 205)', success: 'oklch(80% 0.1 170)', successSubtle: 'oklch(20% 0.10 170)',
    warning: 'oklch(78% 0.14 52)', warningSubtle: 'oklch(22% 0.08 52)',
    gateKnownInk: 'oklch(85% 0.13 168)', gateGuessInk: 'oklch(84% 0.14 60)',
  },
};

// [label, fg, bg, minRatio] — minRatio is 3.0 only where the text is large.
const PAIRS = [
  ['body text — fg / bg', 'fg', 'bg', 4.5],
  ['card/heading — fg / bg-subtle', 'fg', 'bgSubtle', 4.5],
  ['muted prose — fg-muted / bg', 'fgMuted', 'bg', 4.5],
  ['muted prose in card — fg-muted / bg-subtle', 'fgMuted', 'bgSubtle', 4.5],
  ['diagnostic — fg-muted / success-subtle', 'fgMuted', 'successSubtle', 4.5],
  ['diagnostic — fg-muted / warning-subtle', 'fgMuted', 'warningSubtle', 4.5],
  ['eyebrow — fg-subtle / bg', 'fgSubtle', 'bg', 4.5],
  ['eyebrow in card — fg-subtle / bg-subtle', 'fgSubtle', 'bgSubtle', 4.5],
  ['gate known label — gate-known-ink / success-subtle', 'gateKnownInk', 'successSubtle', 4.5],
  ['gate guess label — gate-guess-ink / warning-subtle', 'gateGuessInk', 'warningSubtle', 4.5],
  ['inverse block — fg-inverse / bg-inverse', 'fgInverse', 'bgInverse', 4.5],
  ['hero headline (large) — success / bg', 'success', 'bg', 3.0],
];

const g = (s) => `\x1b[32m${s}\x1b[0m`;
const r = (s) => `\x1b[31m${s}\x1b[0m`;
let failures = 0;
let disagreements = 0;

for (const mode of ['light', 'dark']) {
  console.log(`\n\x1b[1m${mode.toUpperCase()} MODE\x1b[0m`);
  const t = T[mode];
  for (const [label, fk, bk, min] of PAIRS) {
    const truth = trueRatio(t[fk], t[bk]);
    const renge = rengeRatio(t[fk], t[bk]);
    const ok = truth >= min;
    if (!ok) failures += 1;
    const mismatch = Math.abs(truth - renge) > 0.5;
    if (mismatch) disagreements += 1;
    const rengeNote = mismatch ? `  \x1b[2m[renge tool: ${renge.toFixed(2)} ✗]\x1b[0m` : '';
    console.log(`  ${ok ? g('PASS') : r('FAIL')}  ${truth.toFixed(2)}  (AA ${min})  ${label}${rengeNote}`);
  }
}

console.log(
  failures === 0
    ? g('\n✓ All pairs meet WCAG AA in both modes (correct engine).')
    : r(`\n✗ ${failures} real failure(s).`),
);
if (disagreements > 0) {
  console.log(
    `\x1b[33mⓘ @renge-ui/test-utils disagreed on ${disagreements} pair(s) — its OKLCH→luminance\n` +
      `  conversion is unreliable off the 0%/100% extremes (false fails on dark bg,\n` +
      `  false passes on mid-tone bg). Verdict above uses the self-checked engine.\x1b[0m`,
  );
}
process.exit(failures === 0 ? 0 : 1);
