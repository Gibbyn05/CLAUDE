// Scene 5 — Social Proof (600–659f, 2s)
// Company logo placeholders fade in left-to-right, pull-quote fades up.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

const LOGOS = ['NB', 'TA', 'VS', 'HG', 'FK', 'PB', 'LE', 'OR'];

export const R5_SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const quoteOpacity = interpolate(frame, [22, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const quoteY = interpolate(frame, [22, 38], [18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: R_COLORS.beige,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 48,
      }}
    >
      {/* Headline */}
      <div
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 58,
          fontWeight: 700,
          color: R_COLORS.dark,
          opacity: headlineOpacity,
          textAlign: 'center',
        }}
      >
        Brukt av <span style={{ borderBottom: `4px solid ${R_COLORS.green}`, paddingBottom: 2 }}>500+</span> norske salgsteam
      </div>

      {/* Logo row */}
      <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
        {LOGOS.map((logo, i) => {
          const logoOpacity = interpolate(frame, [6 + i * 4, 16 + i * 4], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const logoScale = spring({
            frame: Math.max(0, frame - (6 + i * 4)),
            fps,
            config: { damping: 12, stiffness: 200 },
          });

          return (
            <div
              key={i}
              style={{
                width: 72,
                height: 72,
                borderRadius: 18,
                background: 'white',
                border: '1.5px solid rgba(0,0,0,0.09)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 18,
                color: '#666',
                opacity: logoOpacity,
                transform: `scale(${logoScale})`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              {logo}
            </div>
          );
        })}
      </div>

      {/* Pull quote */}
      <div
        style={{
          opacity: quoteOpacity,
          transform: `translateY(${quoteY}px)`,
          textAlign: 'center',
          maxWidth: 720,
        }}
      >
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 36,
            fontStyle: 'italic',
            color: R_COLORS.dark,
            lineHeight: 1.5,
            marginBottom: 14,
          }}
        >
          "Vi doblet antall møter på én måned."
        </div>
        <div style={{ fontFamily: 'system-ui', fontSize: 18, color: R_COLORS.muted }}>
          — Salgssjef, Oslo
        </div>
      </div>
    </AbsoluteFill>
  );
};
