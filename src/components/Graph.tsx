import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../constants';

interface GraphProps {
  delay?: number;
  badge?: string;
}

const W = 900;
const H = 380;

// Sampled points along a growth curve (x, y) — y=0 is top, y=H is bottom
const PTS: [number, number][] = [
  [0,       H],
  [W * 0.12, H * 0.88],
  [W * 0.25, H * 0.74],
  [W * 0.38, H * 0.58],
  [W * 0.52, H * 0.40],
  [W * 0.65, H * 0.24],
  [W * 0.80, H * 0.10],
  [W,        H * 0.02],
];

function buildPath(progress: number): string {
  if (progress <= 0) return '';
  const target = progress * (PTS.length - 1);
  const endIdx = Math.min(Math.floor(target), PTS.length - 2);
  const frac = target - endIdx;

  const visible: [number, number][] = PTS.slice(0, endIdx + 1);
  const p1 = PTS[endIdx];
  const p2 = PTS[endIdx + 1];
  visible.push([
    p1[0] + (p2[0] - p1[0]) * frac,
    p1[1] + (p2[1] - p1[1]) * frac,
  ]);

  return visible
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
}

export const Graph: React.FC<GraphProps> = ({ delay = 0, badge = '+XX%' }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);

  const lineProgress = interpolate(local, [0, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const containerOpacity = interpolate(local, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(local, [58, 72], [0, 1], { extrapolateRight: 'clamp' });
  const badgeScale = interpolate(local, [58, 72], [0.5, 1], { extrapolateRight: 'clamp' });

  const path = buildPath(lineProgress);

  // Tip dot
  const lastPt = (() => {
    const target = lineProgress * (PTS.length - 1);
    const endIdx = Math.min(Math.floor(target), PTS.length - 2);
    const frac = target - endIdx;
    const p1 = PTS[endIdx];
    const p2 = PTS[endIdx + 1] ?? p1;
    return [
      p1[0] + (p2[0] - p1[0]) * frac,
      p1[1] + (p2[1] - p1[1]) * frac,
    ];
  })();

  return (
    <div style={{ opacity: containerOpacity, position: 'relative', width: W, height: H + 20 }}>
      <svg width={W} height={H + 20} viewBox={`0 0 ${W} ${H + 20}`}>
        <defs>
          <linearGradient id="gLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={COLORS.secondary} />
            <stop offset="100%" stopColor={COLORS.primary} />
          </linearGradient>
          <linearGradient id="gFillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.18" />
            <stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={0} y1={t * H}
            x2={W} y2={t * H}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={1}
            strokeDasharray="10 7"
          />
        ))}

        {/* Area fill */}
        {path && (
          <path
            d={`${path} L ${lastPt[0].toFixed(1)} ${H + 20} L 0 ${H + 20} Z`}
            fill="url(#gFillGrad)"
          />
        )}

        {/* Growth line */}
        {path && (
          <path
            d={path}
            fill="none"
            stroke="url(#gLineGrad)"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Tip glow rings */}
        {lineProgress > 0.06 && (
          <>
            <circle cx={lastPt[0]} cy={lastPt[1]} r={18} fill={COLORS.primary} opacity={0.12} />
            <circle cx={lastPt[0]} cy={lastPt[1]} r={9}  fill={COLORS.primary} opacity={0.45} />
            <circle cx={lastPt[0]} cy={lastPt[1]} r={4}  fill={COLORS.primary} />
          </>
        )}
      </svg>

      {/* "+XX%" badge */}
      <div
        style={{
          position: 'absolute',
          top: -10,
          right: 0,
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          transformOrigin: 'top right',
          background: COLORS.primary,
          color: '#08080E',
          borderRadius: 18,
          padding: '16px 30px',
          fontSize: 52,
          fontWeight: 800,
          fontFamily: "'Inter', 'SF Pro Display', sans-serif",
          letterSpacing: '-0.02em',
          boxShadow: `0 0 36px ${COLORS.primary}55`,
        }}
      >
        {badge}
      </div>
    </div>
  );
};
