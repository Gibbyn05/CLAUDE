import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS } from '../constants';

interface SubTitleProps {
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const SubTitle: React.FC<SubTitleProps> = ({
  children,
  delay = 0,
  size = 48,
  color = COLORS.muted,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const progress = spring({
    frame: local,
    fps,
    config: { damping: 24, stiffness: 100, mass: 0.9 },
  });

  const opacity = interpolate(local, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(progress, [0, 1], [28, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize: size,
        fontWeight: 500,
        color,
        lineHeight: 1.35,
        letterSpacing: '-0.01em',
        fontFamily: "'Inter', 'SF Pro Text', 'Helvetica Neue', sans-serif",
        textAlign: 'center',
        whiteSpace: 'pre-line',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
