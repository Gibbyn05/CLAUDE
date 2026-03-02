// CameraRig — subtle camera push/pull (scale 1.0–1.06) + slight translate drift.
// Wrap scene content in <CameraRig> for a slow, cinematic parallax feel.
// Use intensity 0.0–1.0 to control magnitude; background layers use lower intensity.

import { useCurrentFrame, interpolate } from 'remotion';

interface CameraRigProps {
  /** Scene duration in frames (used to compute progress). */
  duration: number;
  /** Push in (scale up) or pull back (scale down). Default 'in'. */
  mode?: 'in' | 'out' | 'static';
  /** 0 = no movement, 1 = full movement. Default 1. */
  intensity?: number;
  /** Horizontal pan amount in pixels (positive = pan right). Default 0. */
  panX?: number;
  /** Vertical pan amount in pixels (positive = pan down). Default 0. */
  panY?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const MAX_SCALE_DELTA = 0.055;

export const CameraRig: React.FC<CameraRigProps> = ({
  duration,
  mode = 'in',
  intensity = 1,
  panX = 0,
  panY = 0,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / Math.max(duration, 1), 1);

  const scaleDelta = MAX_SCALE_DELTA * intensity;
  const scale =
    mode === 'in'
      ? interpolate(progress, [0, 1], [1, 1 + scaleDelta])
      : mode === 'out'
      ? interpolate(progress, [0, 1], [1 + scaleDelta, 1])
      : 1;

  const tx = interpolate(progress, [0, 1], [0, panX * intensity]);
  const ty = interpolate(progress, [0, 1], [0, panY * intensity]);

  return (
    <div
      style={{
        transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
        transformOrigin: '50% 50%',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
