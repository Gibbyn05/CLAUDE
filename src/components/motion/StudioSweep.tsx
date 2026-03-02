// StudioSweep — a soft, wide, very low-contrast light sweep.
// Feels like a studio light reflecting across a surface.
// NOT neon — warm white/cream, low opacity, diffuse edges.

import { useCurrentFrame, interpolate } from 'remotion';

interface StudioSweepProps {
  /** Composition-local frame at which the sweep begins. */
  triggerFrame: number;
  /** Duration of the sweep in frames. Default 36. */
  duration?: number;
  /** Opacity of the sweep at its brightest. Max ~0.12 for premium feel. */
  peakOpacity?: number;
  /** Width of the streak div. Default 400 (very wide, very soft). */
  width?: number;
}

export const StudioSweep: React.FC<StudioSweepProps> = ({
  triggerFrame,
  duration = 36,
  peakOpacity = 0.11,
  width = 420,
}) => {
  const frame = useCurrentFrame();
  const local = frame - triggerFrame;

  if (local < 0 || local > duration) return null;

  // Position: sweeps from far-left to far-right
  const x = interpolate(local, [0, duration], [-width, 1080 + width], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Opacity: ease in, hold, ease out — very gentle
  const opacity = interpolate(
    local,
    [0, duration * 0.15, duration * 0.75, duration],
    [0, peakOpacity, peakOpacity, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: x - width / 2,
          width,
          height: '100%',
          // Very soft radial gradient — wide, diffuse, warm white
          background: `linear-gradient(90deg,
            transparent 0%,
            rgba(255, 248, 235, 0.18) 25%,
            rgba(255, 252, 242, 0.65) 50%,
            rgba(255, 248, 235, 0.18) 75%,
            transparent 100%)`,
          opacity,
        }}
      />
    </div>
  );
};
