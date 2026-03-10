// Scene 3 — Reveal (210–329f, 4s)
// Reachr wordmark draws in, green underline pulses, product UI slides up.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

const Wordmark: React.FC<{ progress: number }> = ({ progress }) => {
  const revealW = interpolate(progress, [0, 1], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Ghost outline */}
      <div
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 148,
          fontWeight: 700,
          color: 'transparent',
          WebkitTextStroke: `2px rgba(23,23,23,0.10)`,
          letterSpacing: '-4px',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        Reachr
      </div>
      {/* Revealed fill */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 148,
          fontWeight: 700,
          color: R_COLORS.dark,
          letterSpacing: '-4px',
          clipPath: `inset(0 ${100 - revealW}% 0 0)`,
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        Reachr
      </div>
    </div>
  );
};

export const R3_Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });

  const underlineW = interpolate(frame, [35, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const underlinePulse = spring({
    frame: Math.max(0, frame - 52),
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.4 },
  });
  const underlineScale = interpolate(underlinePulse, [0, 1], [1.28, 1]);

  const tagOpacity = interpolate(frame, [58, 76], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const uiProgress = spring({
    frame: Math.max(0, frame - 82),
    fps,
    config: { damping: 18, stiffness: 80 },
  });
  const uiY = interpolate(uiProgress, [0, 1], [420, 0]);
  const uiOpacity = interpolate(frame, [82, 98], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: R_COLORS.beige,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Wordmark + underline */}
      <div style={{ position: 'relative', zIndex: 2, marginBottom: 0 }}>
        <Wordmark progress={logoProgress} />
        <div
          style={{
            height: 6,
            background: R_COLORS.green,
            borderRadius: 3,
            width: `${underlineW * 100}%`,
            transform: `scaleX(${underlineScale})`,
            transformOrigin: 'left',
            marginTop: 6,
            boxShadow: `0 0 24px ${R_COLORS.green}88`,
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: 44,
          fontStyle: 'italic',
          color: R_COLORS.muted,
          opacity: tagOpacity,
          marginTop: 28,
          zIndex: 2,
        }}
      >
        Din nye salgsmotor.
      </div>

      {/* Product UI teaser slides up */}
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: `translateX(-50%) translateY(${uiY}px)`,
          opacity: uiOpacity,
          width: 960,
          background: 'white',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -8px 56px rgba(0,0,0,0.14)',
          padding: '28px 36px 0',
          zIndex: 1,
        }}
      >
        {/* App chrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <div style={{ flex: 1, background: '#f4f4f4', borderRadius: 8, height: 26, marginLeft: 10 }} />
        </div>
        {/* Nav tabs */}
        <div style={{ display: 'flex', gap: 28, borderBottom: '1px solid #f0f0f0', paddingBottom: 14, marginBottom: 22 }}>
          {['Dashboard', 'Leads', 'Pipeline', 'E-post', 'Rapporter'].map((tab, i) => (
            <div
              key={i}
              style={{
                fontFamily: 'system-ui',
                fontSize: 16,
                color: i === 1 ? R_COLORS.dark : '#bbb',
                fontWeight: i === 1 ? 700 : 400,
                borderBottom: i === 1 ? `2.5px solid ${R_COLORS.green}` : '2.5px solid transparent',
                paddingBottom: 10,
              }}
            >
              {tab}
            </div>
          ))}
        </div>
        {/* Placeholder rows */}
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#f2efe3' }} />
            <div style={{ flex: 1, height: 14, background: '#f5f5f5', borderRadius: 7 }} />
            <div style={{ width: 72, height: 14, background: '#f0f0f0', borderRadius: 7 }} />
            <div style={{ width: 56, height: 26, background: `${R_COLORS.green}22`, borderRadius: 8, border: `1px solid ${R_COLORS.green}` }} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
