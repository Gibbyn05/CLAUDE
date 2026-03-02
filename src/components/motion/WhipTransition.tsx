// WhipTransition — 12-frame overlay rendered at scene boundaries.
// Simulates a fast whip-pan: a neon streak sweeps across while the screen
// briefly dims to near-black, then reveals the next scene.
//
// Usage: place in a <Sequence from={boundary - 6} durationInFrames={12}>
//   <WhipTransition />
// </Sequence>
// in the parent composition.

import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { HM_COLORS } from '../../constants/highMotion';

export const WhipTransition: React.FC = () => {
  const frame = useCurrentFrame(); // 0–11

  // Neon streak: travels full width in 12 frames
  const streakX = interpolate(frame, [0, 11], [-200, 1280], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Streak opacity: ramp up → hold → ramp down
  const streakOpacity = interpolate(
    frame,
    [0, 2, 9, 11],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Directional motion-blur simulation: 2 trailing ghost layers
  const trail1X = streakX - 90;
  const trail2X = streakX - 200;

  // Dark screen flash: peaks at the halfway point
  const flashOpacity = interpolate(
    frame,
    [0, 5, 6, 11],
    [0, 0.82, 0.82, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 1000 }}>
      {/* Dark blanket — creates the "shutter" feel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: HM_COLORS.bgDeep,
          opacity: flashOpacity,
        }}
      />

      {/* Trailing ghost 2 (furthest behind, most transparent) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: trail2X,
          width: 300,
          height: '100%',
          background: `linear-gradient(90deg,
            transparent 0%,
            ${HM_COLORS.primary}10 50%,
            transparent 100%)`,
          opacity: streakOpacity * 0.4,
        }}
      />

      {/* Trailing ghost 1 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: trail1X,
          width: 220,
          height: '100%',
          background: `linear-gradient(90deg,
            transparent 0%,
            ${HM_COLORS.primary}28 50%,
            transparent 100%)`,
          opacity: streakOpacity * 0.65,
        }}
      />

      {/* Main neon streak */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: streakX - 80,
          width: 160,
          height: '100%',
          background: `linear-gradient(90deg,
            transparent 0%,
            ${HM_COLORS.primary}55 20%,
            ${HM_COLORS.secondary}70 45%,
            rgba(255, 255, 255, 0.92) 50%,
            ${HM_COLORS.secondary}70 55%,
            ${HM_COLORS.primary}55 80%,
            transparent 100%)`,
          opacity: streakOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
