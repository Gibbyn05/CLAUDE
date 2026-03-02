// Scene 4 — Solution (10–15s, 150 frames)
// "Kling Vekst" + two GlowCards sliding in

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { GlowCard } from '../components/GlowCard';
import { Title } from '../components/Title';
import { SubTitle } from '../components/SubTitle';
import { COLORS, DURATIONS, COPY, SAFE } from '../constants';

export const Scene4Solution: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneOut = interpolate(frame, [DURATIONS.scene4 - 12, DURATIONS.scene4], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle logo glow pulse
  const pulsePhase = frame % 60;
  const logoPulse = interpolate(pulsePhase, [0, 30, 60], [0.7, 1, 0.7]);

  return (
    <AbsoluteFill style={{ opacity: sceneOut }}>
      <Background variant="dark-teal" />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${SAFE.v}px ${SAFE.h}px`,
          gap: 48,
        }}
      >
        {/* Brand mark */}
        <div
          style={{
            opacity: interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' }),
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Mini icon */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: COLORS.primary,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '8px 10px',
              gap: 4,
              boxShadow: `0 0 ${28 * logoPulse}px ${COLORS.primary}55`,
            }}
          >
            {[0.4, 0.7, 1].map((h, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: `${h * 26}px`,
                  borderRadius: 2,
                  background: '#08080E',
                }}
              />
            ))}
          </div>
        </div>

        {/* Headline */}
        <Title delay={6} size={110} glow style={{ maxWidth: 920 }}>
          {COPY.scene4.headline}
        </Title>

        {/* Subtext */}
        <SubTitle delay={20} size={44} color={COLORS.muted} style={{ maxWidth: 820 }}>
          {COPY.scene4.sub}
        </SubTitle>

        {/* GlowCards row */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            width: '100%',
            marginTop: 16,
          }}
        >
          <GlowCard
            icon={COPY.scene4.cardA.icon}
            title={COPY.scene4.cardA.title}
            delay={35}
            glowColor={COLORS.primary}
            fromLeft
          />
          <GlowCard
            icon={COPY.scene4.cardB.icon}
            title={COPY.scene4.cardB.title}
            delay={50}
            glowColor={COLORS.secondary}
            fromLeft={false}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
