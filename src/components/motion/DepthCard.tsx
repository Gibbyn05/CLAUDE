// DepthCard — premium glass card with skew-correct entrance and animated border glow.
// Used for the product panels in Scene 4.

import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { HM_COLORS } from '../../constants/highMotion';

interface DepthCardProps {
  icon: string;
  title: string;
  sub: string;
  delay?: number;
  glowColor?: string;
  fromLeft?: boolean;
  /** If true the card expands to fill its parent's width */
  wide?: boolean;
  children?: React.ReactNode;
}

export const DepthCard: React.FC<DepthCardProps> = ({
  icon,
  title,
  sub,
  delay = 0,
  glowColor = HM_COLORS.primary,
  fromLeft = true,
  wide = false,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const progress = spring({
    frame: local,
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.85 },
  });

  const opacity  = interpolate(local, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const translateX = interpolate(progress, [0, 1], [fromLeft ? -220 : 220, 0]);
  const skewX    = interpolate(progress, [0, 1], [fromLeft ? -14 : 14, 0]);

  // Subtle border glow pulse after entrance
  const settled = Math.max(0, local - 30);
  const pulsePhase = settled % 70;
  const glowIntensity = interpolate(pulsePhase, [0, 35, 70], [0.55, 1.0, 0.55]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px) skewX(${skewX}deg)`,
        flex: wide ? '1 1 100%' : '1',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.065), rgba(255,255,255,0.018))',
        border: `1px solid ${glowColor}50`,
        borderRadius: 28,
        padding: '40px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: `0 0 ${48 * glowIntensity}px ${glowColor}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 44 }}>{icon}</span>
        <div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: HM_COLORS.text,
              fontFamily: "'Inter', 'SF Pro Display', sans-serif",
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: HM_COLORS.muted,
              fontFamily: "'Inter', sans-serif",
              marginTop: 4,
            }}
          >
            {sub}
          </div>
        </div>
      </div>

      {/* Accent divider */}
      <div
        style={{
          width: 40,
          height: 3,
          borderRadius: 2,
          background: glowColor,
          boxShadow: `0 0 12px ${glowColor}`,
        }}
      />

      {/* Optional children (e.g. graph) */}
      {children}
    </div>
  );
};
