// Scene 2 — Pain (3–7s, 120 frames)
// "Manuelle oppgaver = treg vekst" + drifting icon cards

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Background } from '../components/Background';
import { COLORS, DURATIONS, COPY, SAFE } from '../constants';

interface IconCardProps {
  emoji: string;
  label: string;
  delay: number;
  offsetX: number;
  offsetY: number;
}

const IconCard: React.FC<IconCardProps> = ({ emoji, label, delay, offsetX, offsetY }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const progress = spring({
    frame: local,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.75 },
  });

  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const x = interpolate(progress, [0, 1], [offsetX, 0]);
  const y = interpolate(progress, [0, 1], [offsetY, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translate(${x}px, ${y}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        background: COLORS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 22,
        padding: '30px 32px',
        minWidth: 200,
        boxShadow: `0 0 20px rgba(255,92,92,0.08)`,
      }}
    >
      <span style={{ fontSize: 48 }}>{emoji}</span>
      <span
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.muted,
          fontFamily: "'Inter', sans-serif",
          textAlign: 'center',
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const Scene2Pain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOut = interpolate(frame, [DURATIONS.scene2 - 12, DURATIONS.scene2], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const headlineProgress = spring({ frame, fps, config: { damping: 22, stiffness: 100 } });

  const line1Opacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const line1Y = interpolate(headlineProgress, [0, 1], [-36, 0]);

  const line2Progress = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 20, stiffness: 110 },
  });
  const line2Opacity = interpolate(Math.max(0, frame - 12), [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const line2Y = interpolate(line2Progress, [0, 1], [36, 0]);

  const iconDrift = [
    { offsetX: -50, offsetY: -30, delay: 22 },
    { offsetX:  50, offsetY: -20, delay: 30 },
    { offsetX: -40, offsetY:  30, delay: 38 },
    { offsetX:  40, offsetY:  25, delay: 46 },
  ];

  return (
    <AbsoluteFill style={{ opacity: sceneOut }}>
      <Background variant="dark-purple" />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${SAFE.v}px ${SAFE.h}px`,
          gap: 64,
        }}
      >
        {/* Headline block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              opacity: line1Opacity,
              transform: `translateY(${line1Y}px)`,
              fontSize: 84,
              fontWeight: 800,
              color: COLORS.text,
              letterSpacing: '-0.03em',
              fontFamily: "'Inter', 'SF Pro Display', sans-serif",
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            {COPY.scene2.line1}
          </div>

          <div
            style={{
              opacity: line2Opacity,
              transform: `translateY(${line2Y}px)`,
              fontSize: 84,
              fontWeight: 800,
              color: COLORS.danger,
              letterSpacing: '-0.03em',
              fontFamily: "'Inter', 'SF Pro Display', sans-serif",
              textAlign: 'center',
              lineHeight: 1.1,
              textShadow: `0 0 40px ${COLORS.danger}44`,
            }}
          >
            {COPY.scene2.line2}
          </div>
        </div>

        {/* Icon cards grid (2x2) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
            {COPY.scene2.icons.slice(0, 2).map((ic, i) => (
              <IconCard
                key={ic.label}
                emoji={ic.emoji}
                label={ic.label}
                delay={iconDrift[i].delay}
                offsetX={iconDrift[i].offsetX}
                offsetY={iconDrift[i].offsetY}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
            {COPY.scene2.icons.slice(2, 4).map((ic, i) => (
              <IconCard
                key={ic.label}
                emoji={ic.emoji}
                label={ic.label}
                delay={iconDrift[i + 2].delay}
                offsetX={iconDrift[i + 2].offsetX}
                offsetY={iconDrift[i + 2].offsetY}
              />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
