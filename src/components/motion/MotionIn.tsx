// MotionIn — spring-based entrance wrapper.
// Applies translate + scale + opacity on entry, all driven by spring().

import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { T } from '../../constants/theme';

interface MotionInProps {
  delay?: number;
  fromY?: number;
  fromX?: number;
  fromScale?: number;
  config?: { damping: number; stiffness: number; mass: number };
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const MotionIn: React.FC<MotionInProps> = ({
  delay = 0,
  fromY = 24,
  fromX = 0,
  fromScale = 1,
  config = T.spring.smooth,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const progress = spring({ frame: local, fps, config });

  const translateY = interpolate(progress, [0, 1], [fromY, 0]);
  const translateX = interpolate(progress, [0, 1], [fromX, 0]);
  const scale      = interpolate(progress, [0, 1], [fromScale, 1]);
  const opacity    = interpolate(local, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
