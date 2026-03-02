// TypeWipe — reveal text progressively via a clip-path (left→right) or
// overflow:hidden (bottom→top slide). Optionally applies a "tracking settle"
// animation where letter-spacing tightens slightly after reveal.

import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface TypeWipeProps {
  delay?: number;
  /** 'clip' reveals left→right via clip-path. 'slide' slides text up from overflow. */
  mode?: 'clip' | 'slide';
  wipeDuration?: number;       // frames for the wipe. Default 28.
  /** If true, letter-spacing starts open and tightens after reveal. */
  trackingSettle?: boolean;
  fromTracking?: string;       // e.g. '0.06em'
  toTracking?: string;         // e.g. '-0.04em'
  children: React.ReactNode;
  /** lineHeight for 'slide' mode — needed to size the overflow container. */
  lineHeight?: number;
  style?: React.CSSProperties;
  wrapStyle?: React.CSSProperties;
}

export const TypeWipe: React.FC<TypeWipeProps> = ({
  delay = 0,
  mode = 'clip',
  wipeDuration = 28,
  trackingSettle = false,
  fromTracking = '0.08em',
  toTracking = '-0.04em',
  children,
  lineHeight,
  style,
  wrapStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  // Wipe reveal progress (0 → 1)
  const wipeP = interpolate(local, [0, wipeDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tracking settle (letter-spacing)
  let letterSpacing: string | undefined;
  if (trackingSettle) {
    const settleProgress = spring({
      frame: Math.max(0, local - wipeDuration),
      fps,
      config: { damping: 26, stiffness: 100, mass: 1 },
    });
    const fromNum = parseFloat(fromTracking);
    const toNum   = parseFloat(toTracking);
    const unit    = fromTracking.replace(/[0-9.-]/g, '') || 'em';
    letterSpacing = `${(fromNum + (toNum - fromNum) * settleProgress).toFixed(4)}${unit}`;
  }

  if (mode === 'clip') {
    const clipRight = (1 - wipeP) * 100;
    return (
      <div
        style={{
          clipPath: `inset(0 ${clipRight.toFixed(2)}% 0 0)`,
          letterSpacing,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  // mode === 'slide'
  const slideY = interpolate(wipeP, [0, 1], [lineHeight ?? 80, 0]);
  return (
    <div
      style={{
        overflow: 'hidden',
        height: lineHeight,
        ...wrapStyle,
      }}
    >
      <div
        style={{
          transform: `translateY(${slideY}px)`,
          letterSpacing,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};
