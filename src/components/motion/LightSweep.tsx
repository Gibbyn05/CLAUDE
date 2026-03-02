// LightSweep — a neon light streak that sweeps horizontally across the frame.
// Renders nothing outside its active window to stay render-stable.

import { useCurrentFrame, interpolate } from 'remotion';
import { HM_COLORS } from '../../constants/highMotion';

interface LightSweepProps {
  /** Composition-local frame at which the sweep begins. */
  triggerFrame: number;
  /** Duration of the sweep in frames. Default 22. */
  duration?: number;
  /** Color of the streak. Defaults to primary. */
  color?: string;
  /** Width of the streak div in pixels. Default 160. */
  streakWidth?: number;
}

export const LightSweep: React.FC<LightSweepProps> = ({
  triggerFrame,
  duration = 22,
  color = HM_COLORS.primary,
  streakWidth = 160,
}) => {
  const frame = useCurrentFrame();
  const local = frame - triggerFrame;

  if (local < 0 || local > duration) return null;

  // Position: sweeps from -streakWidth to 1080 + streakWidth
  const x = interpolate(local, [0, duration], [-streakWidth, 1080 + streakWidth], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Opacity: ramps up, holds, then fades out
  const opacity = interpolate(
    local,
    [0, 3, duration - 4, duration],
    [0, 0.9, 0.9, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Wider soft glow halo behind the main streak
  const haloX = x - streakWidth * 0.5;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Soft halo */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: haloX,
          width: streakWidth * 3,
          height: '100%',
          background: `linear-gradient(90deg,
            transparent 0%,
            ${color}18 30%,
            ${color}35 50%,
            ${color}18 70%,
            transparent 100%)`,
          opacity,
        }}
      />
      {/* Sharp core streak */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: x - streakWidth / 2,
          width: streakWidth,
          height: '100%',
          background: `linear-gradient(90deg,
            transparent 0%,
            ${color}55 25%,
            rgba(255,255,255,0.80) 48%,
            rgba(255,255,255,0.90) 52%,
            ${color}55 75%,
            transparent 100%)`,
          opacity,
        }}
      />
    </div>
  );
};
