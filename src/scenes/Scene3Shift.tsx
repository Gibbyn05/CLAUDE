// Scene 3 — Shift (7–10s, 90 frames)
// "Bytt til et vekstsystem" — quick wipe + gradient shift

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Background } from '../components/Background';
import { COLORS, DURATIONS, COPY, SAFE } from '../constants';

export const Scene3Shift: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOut = interpolate(frame, [DURATIONS.scene3 - 12, DURATIONS.scene3], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Horizontal wipe reveal bar
  const wipeWidth = interpolate(frame, [0, 18], [0, 1080], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wipeOpacity = interpolate(frame, [16, 28], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Text entrance after wipe
  const headlineProgress = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { damping: 20, stiffness: 100, mass: 1 },
  });
  const headlineOpacity = interpolate(Math.max(0, frame - 14), [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(headlineProgress, [0, 1], [50, 0]);

  // Accent line expands
  const lineWidth = interpolate(Math.max(0, frame - 30), [0, 35], [0, 480], {
    extrapolateRight: 'clamp',
  });
  const lineOpacity = interpolate(Math.max(0, frame - 30), [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // "→" arrow
  const arrowOpacity = interpolate(Math.max(0, frame - 45), [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOut }}>
      <Background variant="dark-shift" />

      {/* Wipe bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: wipeWidth,
          height: '100%',
          background: `linear-gradient(90deg, ${COLORS.primary}22, ${COLORS.secondary}22)`,
          opacity: wipeOpacity,
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${SAFE.v}px ${SAFE.h}px`,
          gap: 40,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: interpolate(Math.max(0, frame - 20), [0, 16], [0, 1], { extrapolateRight: 'clamp' }),
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.secondary,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Løsningen
        </div>

        {/* Main headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontSize: 100,
            fontWeight: 800,
            color: COLORS.text,
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
            whiteSpace: 'pre-line',
            maxWidth: 900,
          }}
        >
          {COPY.scene3.headline}
        </div>

        {/* Accent divider */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            opacity: lineOpacity,
            boxShadow: `0 0 18px ${COLORS.primary}55`,
          }}
        />

        {/* Arrow hint */}
        <div
          style={{
            opacity: arrowOpacity,
            fontSize: 64,
            color: COLORS.primary,
            textShadow: `0 0 24px ${COLORS.primary}`,
          }}
        >
          →
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
