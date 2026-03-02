// Scene 5 — Benefits (15–22s, 210 frames)
// Three animated bullet rows, one per beat

import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { BulletRow } from '../components/BulletRow';
import { COLORS, DURATIONS, COPY, SAFE } from '../constants';

export const Scene5Benefits: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneOut = interpolate(frame, [DURATIONS.scene5 - 12, DURATIONS.scene5], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const labelOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const labelY = interpolate(frame, [0, 16], [20, 0], { extrapolateRight: 'clamp' });

  // Each bullet staggers ~2s (60 frames) apart
  const BULLET_DELAYS = [18, 78, 138];

  return (
    <AbsoluteFill style={{ opacity: sceneOut }}>
      <Background variant="dark" />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${SAFE.v}px ${SAFE.h}px`,
          gap: 32,
        }}
      >
        {/* Section label */}
        <div
          style={{
            opacity: labelOpacity,
            transform: `translateY(${labelY}px)`,
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.primary,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            marginBottom: 8,
          }}
        >
          Hva du får
        </div>

        {/* Bullet rows */}
        {COPY.scene5.bullets.map((b, i) => (
          <BulletRow
            key={b.text}
            icon={b.icon}
            text={b.text}
            delay={BULLET_DELAYS[i]}
          />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
