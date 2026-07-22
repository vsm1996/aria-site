import { ImageResponse } from 'next/og';

// Code-generated OG image (1200×630) — no binary asset to drift. Colours are the
// site's real Ocean-profile tokens, converted OKLCH→hex (Satori's oklch support
// is version-dependent, so hex is used for fidelity). Deliberately spare: one
// focal line (the core hero statement), a light gate legend, and the domain.
// The title/description already show in the share card, so the image doesn't
// repeat them. Next wires this into <meta og:image>; twitter-image re-exports it.

export const alt =
  'Aria — the accessibility formatter. It never changes what the code means.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#f5feff';
const INK = '#0b191b';
const FG_MUTED = '#3d5e64';
const BORDER = '#d7e0e2';
const KNOWN = '#397600';
const GUESS = '#e34b00';

function LegendItem({ color, term, outcome }: { color: string; term: string; outcome: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 27 }}>
      <div style={{ display: 'flex', width: 16, height: 16, borderRadius: 999, background: color }} />
      <div style={{ display: 'flex', color: INK, fontWeight: 600 }}>{term}</div>
      <div style={{ display: 'flex', color: FG_MUTED }}>→ {outcome}</div>
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
          padding: '76px 84px',
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
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
            Aria
          </div>
          <div style={{ display: 'flex', fontSize: 27, color: FG_MUTED }}>
            the accessibility formatter
          </div>
        </div>

        {/* the one focal line */}
        <div
          style={{
            display: 'flex',
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: -3,
            color: KNOWN,
            maxWidth: 980,
          }}
        >
          It never changes what the code means.
        </div>

        {/* light gate legend — the whole idea, at a glance */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 52,
            borderTop: `2px solid ${BORDER}`,
            paddingTop: 30,
          }}
        >
          <LegendItem color={KNOWN} term="native · declared" outcome="auto-fix" />
          <LegendItem color={GUESS} term="inferred" outcome="suggestion" />
        </div>
      </div>
    ),
    { ...size },
  );
}
