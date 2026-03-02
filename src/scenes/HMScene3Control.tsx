// HMScene3 — Control Shift (6–10s, 120 frames)
// Grid lines animate in, text reveals via clip-path, camera zooms in slowly.

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { HM_COLORS, HM_COPY, HM_DURATIONS, HM_SAFE } from '../constants/highMotion';

// A single animated grid line
interface GridLineProps {
  x1: number; y1: number; x2: number; y2: number;
  delay: number; length: number; isHorizontal: boolean;
}
const GridLine: React.FC<GridLineProps> = ({ x1, y1, x2, y2, delay, length, isHorizontal }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const progress = interpolate(local, [0, 28], [0, 1], { extrapolateRight: 'clamp' });
  const drawn = progress * length;
  const opacity = interpolate(local, [0, 8], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <line
      x1={x1} y1={y1}
      x2={isHorizontal ? x1 + drawn : x2}
      y2={isHorizontal ? y2 : y1 + drawn}
      stroke="rgba(0,229,200,0.18)"
      strokeWidth={1}
      strokeDasharray="8 6"
      opacity={opacity}
    />
  );
};

export const HMScene3Control: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Camera zoom-in (entire scene) ─────────────────────────────────────────
  const camScale = interpolate(frame, [0, HM_DURATIONS.scene3], [1.0, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Headline clip-path reveal ─────────────────────────────────────────────
  const clipProgress = interpolate(frame, [22, 52], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineOpacity = interpolate(frame, [18, 28], [0, 1], { extrapolateRight: 'clamp' });

  // ── Sub-text ──────────────────────────────────────────────────────────────
  const subProgress = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const subOpacity = interpolate(Math.max(0, frame - 50), [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const subY = interpolate(subProgress, [0, 1], [28, 0]);

  // ── Eyebrow label ─────────────────────────────────────────────────────────
  const eyeOpacity = interpolate(frame, [4, 18], [0, 1], { extrapolateRight: 'clamp' });
  const eyeY = interpolate(frame, [4, 18], [16, 0], { extrapolateRight: 'clamp' });

  // ── Accent line expands after headline ───────────────────────────────────
  const lineWidth = interpolate(Math.max(0, frame - 54), [0, 30], [0, 500], {
    extrapolateRight: 'clamp',
  });

  const W = 1080;
  const H = 1920;

  return (
    <AbsoluteFill>
      {/* Dark background */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 35%, rgba(0,229,200,0.10) 0%, transparent 60%), ${HM_COLORS.bg}`,
        }}
      />

      {/* SVG grid overlay */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {/* Horizontal lines */}
          <GridLine x1={0}   y1={H * 0.3} x2={W} y2={H * 0.3} delay={0}  length={W} isHorizontal />
          <GridLine x1={0}   y1={H * 0.5} x2={W} y2={H * 0.5} delay={6}  length={W} isHorizontal />
          <GridLine x1={0}   y1={H * 0.7} x2={W} y2={H * 0.7} delay={12} length={W} isHorizontal />
          {/* Vertical lines */}
          <GridLine x1={W * 0.33} y1={0} x2={W * 0.33} y2={H} delay={4}  length={H} isHorizontal={false} />
          <GridLine x1={W * 0.67} y1={0} x2={W * 0.67} y2={H} delay={10} length={H} isHorizontal={false} />
        </svg>
      </AbsoluteFill>

      {/* Zoom wrapper */}
      <AbsoluteFill
        style={{
          transform: `scale(${camScale})`,
          transformOrigin: '50% 50%',
        }}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `${HM_SAFE.v}px ${HM_SAFE.h}px`,
            gap: 36,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              opacity: eyeOpacity,
              transform: `translateY(${eyeY}px)`,
              fontSize: 26,
              fontWeight: 600,
              color: HM_COLORS.secondary,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Løsningen
          </div>

          {/* Headline with clip-path reveal */}
          <div
            style={{
              opacity: headlineOpacity,
              clipPath: `inset(0 ${(100 - clipProgress).toFixed(1)}% 0 0)`,
              fontSize: 104,
              fontWeight: 900,
              color: HM_COLORS.text,
              textAlign: 'center',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              fontFamily: "'Inter', 'SF Pro Display', sans-serif",
              maxWidth: 900,
            }}
          >
            {HM_COPY.scene3.headline}
          </div>

          {/* Expanding accent line */}
          <div
            style={{
              width: lineWidth,
              height: 3,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${HM_COLORS.primary}, ${HM_COLORS.secondary})`,
              boxShadow: `0 0 20px ${HM_COLORS.primary}60`,
            }}
          />

          {/* Sub text */}
          <div
            style={{
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
              fontSize: 42,
              fontWeight: 400,
              color: HM_COLORS.muted,
              textAlign: 'center',
              lineHeight: 1.45,
              fontFamily: "'Inter', sans-serif",
              maxWidth: 820,
            }}
          >
            {HM_COPY.scene3.sub}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
