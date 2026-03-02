// Scene 1 — Hook (0–3s, 90 frames)
// "Får du for få leads?" + "Du er ikke alene."

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Background } from '../components/Background';
import { Title } from '../components/Title';
import { SubTitle } from '../components/SubTitle';
import { COLORS, DURATIONS, COPY, SAFE } from '../constants';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOut = interpolate(frame, [DURATIONS.scene1 - 12, DURATIONS.scene1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Ambient glow orb entrance
  const glowProgress = spring({ frame, fps, config: { damping: 28, stiffness: 60, mass: 1.5 } });
  const glowScale = interpolate(glowProgress, [0, 1], [0.4, 1]);
  const glowOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Subtext pulse
  const pulsePhase = frame % 90;
  const pulse = interpolate(pulsePhase, [0, 45, 90], [0.6, 1, 0.6]);

  return (
    <AbsoluteFill style={{ opacity: sceneOut }}>
      <Background variant="dark-teal" />

      {/* Ambient glow orb */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primary}18 0%, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${SAFE.v}px ${SAFE.h}px`,
          gap: 36,
        }}
      >
        {/* Brand label */}
        <div
          style={{
            opacity: interpolate(frame, [4, 18], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(frame, [4, 18], [16, 0], { extrapolateRight: 'clamp' })}px)`,
            fontSize: 30,
            fontWeight: 600,
            color: COLORS.primary,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontFamily: "'Inter', 'SF Pro Text', sans-serif",
          }}
        >
          {COPY.brand}
        </div>

        <Title delay={6} size={112} glow style={{ maxWidth: 900 }}>
          {COPY.scene1.headline}
        </Title>

        <SubTitle
          delay={22}
          size={50}
          color={COLORS.muted}
          style={{ textShadow: `0 0 ${40 * pulse}px ${COLORS.primary}33` }}
        >
          {COPY.scene1.sub}
        </SubTitle>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
