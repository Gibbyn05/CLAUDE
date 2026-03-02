// GrainOverlay — subtle filmic grain using SVG feTurbulence.
// The grain seed cycles every 2 frames for a slowly-shifting texture.
// No random() — fully deterministic from frame number.

import { useCurrentFrame } from 'remotion';

interface GrainOverlayProps {
  /** Opacity of the grain layer. Default 0.048. */
  opacity?: number;
  /** How many frames between grain seed changes. Default 2. */
  updateEvery?: number;
  /** Number of unique seeds to cycle through. Default 24. */
  seedCount?: number;
  baseFrequency?: number;
  numOctaves?: number;
}

export const GrainOverlay: React.FC<GrainOverlayProps> = ({
  opacity = 0.048,
  updateEvery = 2,
  seedCount = 24,
  baseFrequency = 0.72,
  numOctaves = 4,
}) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / updateEvery) % seedCount;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 900,
        opacity,
        mixBlendMode: 'overlay',
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs>
          <filter id={`grain-${seed}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              seed={seed}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter={`url(#grain-${seed})`}
        />
      </svg>
    </div>
  );
};
