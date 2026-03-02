// GraphLineAnimated — growing line chart with a light streak following the tip
// and an animated badge that pops in at the peak.

import { useCurrentFrame, interpolate } from 'remotion';
import { HM_COLORS } from '../../constants/highMotion';

interface GraphLineAnimatedProps {
  delay?: number;
  badge?: string;
  width?: number;
  height?: number;
}

const W_DEFAULT = 860;
const H_DEFAULT = 320;

// Control points (x, y) as fractions of width / height.
// y=0 is top (peak), y=1 is baseline (bottom).
const CTRL: [number, number][] = [
  [0,    1.00],
  [0.12, 0.91],
  [0.25, 0.78],
  [0.38, 0.61],
  [0.52, 0.43],
  [0.65, 0.26],
  [0.78, 0.11],
  [0.90, 0.04],
  [1.00, 0.01],
];

function buildPath(progress: number, W: number, H: number): string {
  if (progress <= 0) return '';
  const target = progress * (CTRL.length - 1);
  const endIdx = Math.min(Math.floor(target), CTRL.length - 2);
  const frac = target - endIdx;

  const pts: [number, number][] = CTRL.slice(0, endIdx + 1).map(([x, y]) => [x * W, y * H]);
  const p1 = CTRL[endIdx];
  const p2 = CTRL[endIdx + 1];
  pts.push([
    (p1[0] + (p2[0] - p1[0]) * frac) * W,
    (p1[1] + (p2[1] - p1[1]) * frac) * H,
  ]);
  return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
}

function tipPosition(progress: number, W: number, H: number): [number, number] {
  const target = progress * (CTRL.length - 1);
  const endIdx = Math.min(Math.floor(target), CTRL.length - 2);
  const frac = target - endIdx;
  const p1 = CTRL[endIdx];
  const p2 = CTRL[endIdx + 1] ?? p1;
  return [
    (p1[0] + (p2[0] - p1[0]) * frac) * W,
    (p1[1] + (p2[1] - p1[1]) * frac) * H,
  ];
}

export const GraphLineAnimated: React.FC<GraphLineAnimatedProps> = ({
  delay = 0,
  badge = '+XX%',
  width: W = W_DEFAULT,
  height: H = H_DEFAULT,
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);

  const lineProgress = interpolate(local, [0, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const containerOpacity = interpolate(local, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const badgeOpacity  = interpolate(local, [65, 80], [0, 1], { extrapolateRight: 'clamp' });
  const badgeScale    = interpolate(local, [65, 78], [0.5, 1], { extrapolateRight: 'clamp' });

  const path = buildPath(lineProgress, W, H);
  const [tipX, tipY] = tipPosition(lineProgress, W, H);

  // Light streak following tip
  const streakOpacity = interpolate(local, [0, 12, 68, 75], [0, 0.8, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity: containerOpacity, position: 'relative', width: W, height: H + 20 }}>
      <svg width={W} height={H + 20} viewBox={`0 0 ${W} ${H + 20}`}>
        <defs>
          <linearGradient id="hmLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={HM_COLORS.secondary} />
            <stop offset="100%" stopColor={HM_COLORS.primary}   />
          </linearGradient>
          <linearGradient id="hmFillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={HM_COLORS.primary} stopOpacity="0.22" />
            <stop offset="100%" stopColor={HM_COLORS.primary} stopOpacity="0"   />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={0} y1={t * H} x2={W} y2={t * H}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
            strokeDasharray="10 8"
          />
        ))}

        {/* Area fill */}
        {path && (
          <path
            d={`${path} L ${tipX.toFixed(1)} ${(H + 20).toFixed(1)} L 0 ${(H + 20).toFixed(1)} Z`}
            fill="url(#hmFillGrad)"
          />
        )}

        {/* Growth line */}
        {path && (
          <path
            d={path}
            fill="none"
            stroke="url(#hmLineGrad)"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Light-streak halo at tip */}
        {lineProgress > 0.04 && (
          <>
            <ellipse
              cx={tipX} cy={tipY}
              rx={60} ry={18}
              fill={HM_COLORS.primary}
              opacity={streakOpacity * 0.18}
            />
            <circle cx={tipX} cy={tipY} r={20}  fill={HM_COLORS.primary} opacity={streakOpacity * 0.12} />
            <circle cx={tipX} cy={tipY} r={10}  fill={HM_COLORS.primary} opacity={0.55} />
            <circle cx={tipX} cy={tipY} r={4.5} fill="#ffffff" opacity={0.95} />
          </>
        )}
      </svg>

      {/* Badge "+XX%" */}
      <div
        style={{
          position: 'absolute',
          top: -16,
          right: 0,
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          transformOrigin: 'top right',
          background: HM_COLORS.primary,
          color: HM_COLORS.bg,
          borderRadius: 16,
          padding: '14px 28px',
          fontSize: 48,
          fontWeight: 800,
          fontFamily: "'Inter', 'SF Pro Display', sans-serif",
          letterSpacing: '-0.02em',
          boxShadow: `0 0 40px ${HM_COLORS.primary}60`,
        }}
      >
        {badge}
      </div>
    </div>
  );
};
