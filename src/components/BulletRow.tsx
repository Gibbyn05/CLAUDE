import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS } from '../constants';

interface BulletRowProps {
  icon: string;
  text: string;
  delay?: number;
}

export const BulletRow: React.FC<BulletRowProps> = ({ icon, text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const progress = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 110, mass: 0.85 },
  });

  const opacity = interpolate(local, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const x = interpolate(progress, [0, 1], [-70, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        background: COLORS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        borderLeft: `4px solid ${COLORS.primary}`,
        borderRadius: 24,
        padding: '36px 44px',
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: `0 0 32px ${COLORS.glowPrimary}`,
      }}
    >
      <span style={{ fontSize: 60, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
      <span
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.text,
          fontFamily: "'Inter', 'SF Pro Display', sans-serif",
          letterSpacing: '-0.02em',
        }}
      >
        {text}
      </span>
    </div>
  );
};
