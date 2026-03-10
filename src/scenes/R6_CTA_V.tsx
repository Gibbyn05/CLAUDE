// Scene 6 Vertical — CTA (4s, 120f)
// Portrait 1080×1920. Extended hold, adjusted timings.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

export const R6_CTA_V: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background: beige → #171717
  const bgP = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r = Math.round(interpolate(bgP, [0, 1], [242, 23]));
  const g = Math.round(interpolate(bgP, [0, 1], [239, 23]));
  const b = Math.round(interpolate(bgP, [0, 1], [227, 23]));

  // Logo drops from top
  const logoSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 100 } });
  const logoY = interpolate(logoSpring, [0, 1], [-110, 0]);
  const logoOpacity = interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Tagline
  const tagOpacity = interpolate(frame, [30, 46], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagY = interpolate(frame, [30, 46], [22, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Button
  const btnOpacity = interpolate(frame, [48, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnPulse = spring({ frame: Math.max(0, frame - 64), fps, config: { damping: 6, stiffness: 200, mass: 0.5 } });
  const btnScale = interpolate(btnPulse, [0, 1], [1.10, 1]);
  const glowStrength = interpolate(frame, [62, 76], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Voiceover caption
  const voiceOpacity = interpolate(frame, [80, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `rgb(${r},${g},${b})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          transform: `translateY(${logoY}px)`,
          opacity: logoOpacity,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 104,
          fontWeight: 700,
          color: '#f8f5ec',
          letterSpacing: '-2px',
          lineHeight: 1,
          position: 'relative',
          textAlign: 'center',
        }}
      >
        Reachr
        <span style={{ color: R_COLORS.green, fontSize: 20, verticalAlign: 'super', marginLeft: 4, lineHeight: 1 }}>●</span>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          fontFamily: 'Georgia, serif',
          fontSize: 38,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.62)',
          letterSpacing: '0.01em',
          textAlign: 'center',
          padding: '0 60px',
        }}
      >
        Finn nye kunder raskere.
      </div>

      {/* CTA button */}
      <div style={{ opacity: btnOpacity, transform: `scale(${btnScale})`, marginTop: 16, padding: '0 48px', width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            background: R_COLORS.green,
            color: R_COLORS.dark,
            borderRadius: 20,
            padding: '24px 40px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 800,
            fontSize: 28,
            letterSpacing: '-0.4px',
            textAlign: 'center',
            boxShadow: `0 0 ${44 * glowStrength}px ${R_COLORS.green}66, 0 8px 32px rgba(9,254,148,0.22)`,
          }}
        >
          Start gratis på reachr.no
        </div>
      </div>

      {/* Voiceover caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          opacity: voiceOpacity,
          fontFamily: 'Georgia, serif',
          fontSize: 28,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.38)',
          letterSpacing: '0.02em',
          textAlign: 'center',
          padding: '0 60px',
        }}
      >
        Reachr. Finn nye kunder raskere.
      </div>
    </AbsoluteFill>
  );
};
