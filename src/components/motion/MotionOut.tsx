// MotionOut — interpolate-based exit wrapper.
// Call with the frame at which the exit should begin; it animates to the target state.

import { useCurrentFrame, interpolate } from 'remotion';

interface MotionOutProps {
  /** Composition-local frame when exit begins. */
  from: number;
  /** Exit duration in frames. Default 14. */
  duration?: number;
  toY?: number;
  toX?: number;
  toScale?: number;
  toOpacity?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const MotionOut: React.FC<MotionOutProps> = ({
  from,
  duration = 14,
  toY = 0,
  toX = 0,
  toScale = 1,
  toOpacity = 0,
  children,
  style,
}) => {
  const frame = useCurrentFrame();

  const opacity    = interpolate(frame, [from, from + duration], [1, toOpacity],     { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [from, from + duration], [0, toY],           { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const translateX = interpolate(frame, [from, from + duration], [0, toX],           { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale      = interpolate(frame, [from, from + duration], [1, toScale],        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
