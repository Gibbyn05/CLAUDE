import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS } from '../constants';

interface TitleProps {
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}

export const Title: React.FC<TitleProps> = ({
  children,
  delay = 0,
  size = 100,
  color = COLORS.text,
  glow = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const progress = spring({
    frame: local,
    fps,
    config: { damping: 22, stiffness: 90, mass: 1 },
  });

  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(progress, [0, 1], [48, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize: size,
        fontWeight: 800,
        color,
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        fontFamily: "'Inter', 'SF Pro Display', 'Helvetica Neue', sans-serif",
        textAlign: 'center',
        whiteSpace: 'pre-line',
        textShadow: glow ? `0 0 60px ${color}55, 0 0 120px ${color}22` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
