import { ImageResponse } from 'next/og';

// Code-generated OG image (1200×630) — no binary asset to drift. Colours are the
// site's real Ocean-profile tokens, converted OKLCH→hex (Satori's oklch support
// is version-dependent, so hex is used for fidelity). The gate motif is the
// brand: green = native/declared → auto-fix, amber = inferred → suggestion.
// Next wires this into <meta og:image> automatically; twitter-image re-exports it.

export const alt =
  'Aria — the accessibility formatter. It never changes what the code means.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#f5feff';
const INK = '#0b191b';
const FG_MUTED = '#3d5e64';
const BORDER = '#d7e0e2';
const KNOWN = '#397600';
const KNOWN_SOFT = '#d3f0b8';
const KNOWN_INK = '#244200';
const GUESS = '#e34b00';
const GUESS_SOFT = '#ffd3bd';
const GUESS_INK = '#742400';

function Chip({
  label,
  arrow,
  outcome,
  soft,
  ink,
  edge,
}: {
  label: string;
  arrow: string;
  outcome: string;
  soft: string;
  ink: string;
  edge: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 22px',
          borderRadius: 999,
          background: soft,
          border: `2px solid ${edge}`,
          color: ink,
          fontSize: 30,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', color: FG_MUTED, fontSize: 30 }}>{arrow}</div>
      <div style={{ display: 'flex', color: ink, fontSize: 30, fontWeight: 600 }}>{outcome}</div>
    </div>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: PAPER,
          color: INK,
          padding: '68px 76px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* split top bar — the two tiers, one glance */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            width: '100%',
            height: 12,
          }}
        >
          <div style={{ display: 'flex', width: '62%', height: '100%', background: KNOWN }} />
          <div style={{ display: 'flex', width: '38%', height: '100%', background: GUESS }} />
        </div>

        {/* wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 22 }}>
          <div style={{ display: 'flex', fontSize: 50, fontWeight: 700, letterSpacing: -1 }}>
            Aria
          </div>
          <div style={{ display: 'flex', fontSize: 27, color: FG_MUTED }}>
            the accessibility formatter
          </div>
        </div>

        {/* headline — the core line, the star of the site hero */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
          <div style={{ display: 'flex', fontSize: 30, color: FG_MUTED, marginBottom: 14 }}>
            Accessibility that runs on save and gates CI —
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: KNOWN,
            }}
          >
            it never changes what the code means.
          </div>
        </div>

        {/* the gate, condensed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Chip
            label="native · declared"
            arrow="→"
            outcome="auto-fix, gates CI"
            soft={KNOWN_SOFT}
            ink={KNOWN_INK}
            edge={KNOWN}
          />
          <Chip
            label="inferred"
            arrow="→"
            outcome="suggestion, a human approves"
            soft={GUESS_SOFT}
            ink={GUESS_INK}
            edge={GUESS}
          />
        </div>

        {/* footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `2px solid ${BORDER}`,
            paddingTop: 26,
            fontSize: 27,
            color: FG_MUTED,
          }}
        >
          <div style={{ display: 'flex' }}>eslint-plugin-aria-a11y · @aria-a11y/cli</div>
          <div style={{ display: 'flex', fontWeight: 600, color: INK }}>
            aria-formatter.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
