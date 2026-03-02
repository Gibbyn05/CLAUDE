// Scene 7 — CTA (25–28s, 90 frames)
// "Klar for vekst?" + pulsing CTA button — holds clean to end

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Background } from '../components/Background';
import { CTAButton } from '../components/CTAButton';
import { COLORS, COPY, SAFE } from '../constants';

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // No fade-out — last scene holds to end

  const headlineProgress = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { damping: 20, stiffness: 95, mass: 1 },
  });
  const headlineOpacity = interpolate(frame, [4, 20], [0, 1], { extrapolateRight: 'clamp' });
  const headlineY = interpolate(headlineProgress, [0, 1], [48, 0]);

  const urlOpacity = interpolate(Math.max(0, frame - 55), [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background variant="dark-shift" />

      {/* Large background glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primary}10 0%, ${COLORS.secondary}08 40%, transparent 70%)`,
          opacity: interpolate(frame, [0, 24], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${SAFE.v}px ${SAFE.h}px`,
          gap: 52,
        }}
      >
        {/* Main CTA headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontSize: 108,
            fontWeight: 900,
            color: COLORS.text,
            textAlign: 'center',
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
          }}
        >
          {COPY.scene7.headline.split('?')[0]}
          <span
            style={{
              color: COLORS.primary,
              textShadow: `0 0 60px ${COLORS.primary}55`,
            }}
          >
            ?
          </span>
        </div>

        {/* CTA Button */}
        <CTAButton label={COPY.scene7.cta} delay={28} />

        {/* Site URL */}
        <div
          style={{
            opacity: urlOpacity,
            fontSize: 30,
            color: COLORS.muted,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.05em',
          }}
        >
          {COPY.site}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
