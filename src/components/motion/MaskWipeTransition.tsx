// MaskWipeTransition — a rectangular mask that sweeps across the screen,
// creating a premium scene-change wipe effect.
//
// How it works (16-frame arc):
//   Phase 1 (frames 0–7):  dark curtain expands from the leading edge,
//                           covering the old scene.
//   Phase 2 (frames 7–16): curtain's trailing edge catches up, sweeping
//                           the bar off the screen and revealing the new scene.
//
// Place this inside a <Sequence from={boundary - 8} durationInFrames={16}/>
// in the parent composition.

import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { T } from '../../constants/theme';

type WipeDirection = 'left-to-right' | 'right-to-left' | 'top-to-bottom';

interface MaskWipeTransitionProps {
  direction?: WipeDirection;
  /** Adds a skew to the curtain for a diagonal feel (degrees). Default 0. */
  skew?: number;
  /** Color of the curtain. Defaults to bg. */
  color?: string;
  /** Thin accent line at the curtain's leading edge. Pass '' to disable. */
  accentColor?: string;
  totalFrames?: number;
}

export const MaskWipeTransition: React.FC<MaskWipeTransitionProps> = ({
  direction = 'left-to-right',
  skew = 0,
  color = T.bg,
  accentColor = T.accent,
  totalFrames = 16,
}) => {
  const frame = useCurrentFrame(); // 0 … totalFrames-1
  const half = totalFrames / 2;

  // Leading edge grows first, trailing edge follows
  const p1 = interpolate(frame, [0, half],         [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p2 = interpolate(frame, [half, totalFrames],[0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const W = 1080;
  const H = 1920;

  let curtainStyle: React.CSSProperties;
  let accentStyle: React.CSSProperties;

  if (direction === 'left-to-right') {
    const leading  = p1 * W;  // right edge expands →
    const trailing = p2 * W;  // left edge follows →
    curtainStyle = {
      position: 'absolute', top: -200, bottom: -200,
      left: trailing, width: Math.max(0, leading - trailing),
      transform: skew ? `skewX(${skew}deg)` : undefined,
    };
    accentStyle = {
      position: 'absolute', top: 0, height: '100%',
      left: leading - 1, width: 1,
      opacity: interpolate(frame, [0, half - 2, half + 2, totalFrames], [0, 1, 1, 0]),
    };
  } else if (direction === 'right-to-left') {
    const leading  = W - p1 * W; // left edge retreats ←
    const trailing = W - p2 * W; // right edge follows ←
    curtainStyle = {
      position: 'absolute', top: -200, bottom: -200,
      left: leading, width: Math.max(0, trailing - leading),
      transform: skew ? `skewX(${-skew}deg)` : undefined,
    };
    accentStyle = {
      position: 'absolute', top: 0, height: '100%',
      left: leading, width: 1,
      opacity: interpolate(frame, [0, half - 2, half + 2, totalFrames], [0, 1, 1, 0]),
    };
  } else {
    // top-to-bottom
    const leading  = p1 * H;
    const trailing = p2 * H;
    curtainStyle = {
      position: 'absolute', left: -200, right: -200,
      top: trailing, height: Math.max(0, leading - trailing),
      transform: skew ? `skewY(${skew}deg)` : undefined,
    };
    accentStyle = {
      position: 'absolute', left: 0, width: '100%',
      top: leading - 1, height: 1,
      opacity: interpolate(frame, [0, half - 2, half + 2, totalFrames], [0, 1, 1, 0]),
    };
  }

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 500, overflow: 'hidden' }}>
      {/* Curtain */}
      <div style={{ ...curtainStyle, background: color }} />

      {/* Accent edge line */}
      {accentColor && (
        <div style={{ ...accentStyle, background: accentColor }} />
      )}
    </AbsoluteFill>
  );
};
