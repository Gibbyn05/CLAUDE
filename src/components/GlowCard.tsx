import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS } from '../constants';

interface GlowCardProps {
  icon: string;
  title: string;
  delay?: number;
  glowColor?: string;
  fromLeft?: boolean;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  icon,
  title,
  delay = 0,
  glowColor = COLORS.primary,
  fromLeft = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const progress = spring({
    frame: local,
    fps,
    config: { damping: 18, stiffness: 100, mass: 1 },
  });

  const opacity = interpolate(local, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const x = interpolate(progress, [0, 1], [fromLeft ? -90 : 90, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
        border: `1px solid ${glowColor}45`,
        borderRadius: 28,
        padding: '52px 36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        boxShadow: `0 0 48px ${glowColor}28, inset 0 1px 0 rgba(255,255,255,0.08)`,
        flex: 1,
      }}
    >
      <span style={{ fontSize: 64 }}>{icon}</span>
      <span
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.text,
          fontFamily: "'Inter', 'SF Pro Display', sans-serif",
          letterSpacing: '-0.02em',
          textAlign: 'center',
        }}
      >
        {title}
      </span>
      <div
        style={{
          width: 48,
          height: 3,
          borderRadius: 2,
          background: glowColor,
          boxShadow: `0 0 14px ${glowColor}`,
        }}
      />
    </div>
  );
};
