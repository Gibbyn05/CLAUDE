import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS } from '../constants';

interface CTAButtonProps {
  label: string;
  delay?: number;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ label, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const progress = spring({
    frame: local,
    fps,
    config: { damping: 16, stiffness: 120, mass: 0.8 },
  });

  const opacity = interpolate(local, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(progress, [0, 1], [36, 0]);

  // Gentle pulse after entrance — every 60 frames
  const pulsePhase = Math.max(0, local - 30) % 60;
  const pulse = interpolate(pulsePhase, [0, 30, 60], [1, 1.030, 1]);
  const glowStrength = interpolate(pulsePhase, [0, 30, 60], [0.55, 1.0, 0.55]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${pulse})`,
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, #00C4AA 100%)`,
        borderRadius: 100,
        padding: '38px 68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 ${56 * glowStrength}px ${COLORS.primary}55, 0 6px 28px rgba(0,0,0,0.5)`,
      }}
    >
      <span
        style={{
          fontSize: 46,
          fontWeight: 700,
          color: '#08080E',
          fontFamily: "'Inter', 'SF Pro Display', sans-serif",
          letterSpacing: '-0.01em',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        {label}
      </span>
    </div>
  );
};
