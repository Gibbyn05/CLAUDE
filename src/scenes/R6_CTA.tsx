// Scene 6 — CTA (660–749f, 3s)
// Beige → dark fade, logo drops in, tagline rises, green button pulses.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

export const R6_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background: beige → #171717
  const bgP = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r = Math.round(interpolate(bgP, [0, 1], [242, 23]));
  const g = Math.round(interpolate(bgP, [0, 1], [239, 23]));
  const b = Math.round(interpolate(bgP, [0, 1], [227, 23]));

  // Logo drops from top
  const logoSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 100 } });
  const logoY = interpolate(logoSpring, [0, 1], [-90, 0]);
  const logoOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Tagline fades up
  const tagOpacity = interpolate(frame, [28, 44], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagY = interpolate(frame, [28, 44], [22, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Button
  const btnOpacity = interpolate(frame, [44, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnPulse = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 6, stiffness: 200, mass: 0.5 } });
  const btnScale = interpolate(btnPulse, [0, 1], [1.10, 1]);
  const glowStrength = interpolate(frame, [58, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Voiceover caption
  const voiceOpacity = interpolate(frame, [72, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `rgb(${r},${g},${b})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          transform: `translateY(${logoY}px)`,
          opacity: logoOpacity,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 128,
          fontWeight: 700,
          color: '#f8f5ec',
          letterSpacing: '-3px',
          lineHeight: 1,
          position: 'relative',
        }}
      >
        Reachr
        <span
          style={{
            color: R_COLORS.green,
            fontSize: 22,
            verticalAlign: 'super',
            marginLeft: 4,
            lineHeight: 1,
          }}
        >
          ●
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          fontFamily: 'Georgia, serif',
          fontSize: 44,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.62)',
          letterSpacing: '0.01em',
        }}
      >
        Finn nye kunder raskere.
      </div>

      {/* CTA button */}
      <div style={{ opacity: btnOpacity, transform: `scale(${btnScale})`, marginTop: 12 }}>
        <div
          style={{
            background: R_COLORS.green,
            color: R_COLORS.dark,
            borderRadius: 18,
            padding: '22px 56px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 800,
            fontSize: 32,
            letterSpacing: '-0.4px',
            whiteSpace: 'nowrap',
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
          bottom: 60,
          opacity: voiceOpacity,
          fontFamily: 'Georgia, serif',
          fontSize: 28,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.38)',
          letterSpacing: '0.02em',
        }}
      >
        Reachr. Finn nye kunder raskere.
      </div>
    </AbsoluteFill>
  );
};
