// HMScene5 — Benefit Burst (16–20s, 120 frames)
// Three bullets appear with impact scale. Each new bullet pushes existing
// ones upward so the group stays vertically centred. Micro glow pulses.

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { HM_COLORS, HM_COPY, HM_DURATIONS, HM_SAFE } from '../constants/highMotion';

const B1_ENTER = 10;  // local frame bullet 1 enters
const B2_ENTER = 36;  // local frame bullet 2 enters
const B3_ENTER = 62;  // local frame bullet 3 enters
const GAP      = 175; // vertical gap between bullet centres

interface BulletProps {
  icon: string;
  text: string;
  enterFrame: number;
  centerY: number;  // final y position relative to scene center
}

const ImpactBullet: React.FC<BulletProps> = ({ icon, text, enterFrame, centerY }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - enterFrame);

  // Impact entrance: scale 1.28 → 1.0
  const entranceProgress = spring({
    frame: local,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.75 },
  });
  const scale   = interpolate(entranceProgress, [0, 1], [1.28, 1.0]);
  const opacity = interpolate(local, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const slideX  = interpolate(entranceProgress, [0, 1], [-80, 0]);

  // Micro glow pulse after entry
  const settled    = Math.max(0, local - 20);
  const pulsePhase = settled % 60;
  const glowMult   = interpolate(pulsePhase, [0, 30, 60], [0.5, 1, 0.5]);

  return (
    <div
      style={{
        position: 'absolute',
        left: HM_SAFE.h,
        right: HM_SAFE.h,
        top: '50%',
        transform: `translateY(calc(-50% + ${centerY}px)) translateX(${slideX}px) scale(${scale})`,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        border: `1px solid ${HM_COLORS.cardBorder}`,
        borderLeft: `4px solid ${HM_COLORS.primary}`,
        borderRadius: 24,
        padding: '32px 40px',
        boxShadow: `0 0 ${40 * glowMult}px ${HM_COLORS.glowPrimary}`,
      }}
    >
      {/* Icon with glow disc */}
      <div
        style={{
          position: 'relative',
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: HM_COLORS.primary,
            opacity: 0.14 * glowMult,
          }}
        />
        <span style={{ fontSize: 44, lineHeight: 1, position: 'relative' }}>{icon}</span>
      </div>

      <span
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: HM_COLORS.text,
          fontFamily: "'Inter', 'SF Pro Display', sans-serif",
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const HMScene5Benefits: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Exit ──────────────────────────────────────────────────────────────────
  const exitOpacity = interpolate(
    frame,
    [HM_DURATIONS.scene5 - 10, HM_DURATIONS.scene5],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const exitY = interpolate(
    frame,
    [HM_DURATIONS.scene5 - 10, HM_DURATIONS.scene5],
    [0, -280],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // ── "Push" shifts: each new bullet pushes existing ones up by GAP/2 ───────
  const shiftOnB2 = interpolate(
    spring({ frame: Math.max(0, frame - B2_ENTER), fps, config: { damping: 22, stiffness: 110 } }),
    [0, 1], [0, -GAP / 2]
  );
  const shiftOnB3 = interpolate(
    spring({ frame: Math.max(0, frame - B3_ENTER), fps, config: { damping: 22, stiffness: 110 } }),
    [0, 1], [0, -GAP / 2]
  );

  // Final vertical centres (relative to screen centre):
  const b1Y = 0          + shiftOnB2 + shiftOnB3;  // moves: 0 → -GAP/2 → -GAP
  const b2Y = GAP / 2    + shiftOnB3;               // moves: +GAP/2 → 0
  const b3Y = GAP;                                   // constant once visible

  const bullets = HM_COPY.scene5.bullets;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, ${HM_COLORS.primary}10 0%, transparent 55%),
            ${HM_COLORS.bg}
          `,
        }}
      />

      {/* Section label */}
      <div
        style={{
          position: 'absolute',
          top: HM_SAFE.v,
          left: HM_SAFE.h,
          opacity: interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' }),
          fontSize: 28,
          fontWeight: 600,
          color: HM_COLORS.primary,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Hva du får
      </div>

      {/* Bullets */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${exitY}px)`,
          opacity: exitOpacity,
        }}
      >
        <ImpactBullet icon={bullets[0].icon} text={bullets[0].text} enterFrame={B1_ENTER} centerY={b1Y} />
        {frame >= B2_ENTER && (
          <ImpactBullet icon={bullets[1].icon} text={bullets[1].text} enterFrame={B2_ENTER} centerY={b2Y} />
        )}
        {frame >= B3_ENTER && (
          <ImpactBullet icon={bullets[2].icon} text={bullets[2].text} enterFrame={B3_ENTER} centerY={b3Y} />
        )}
      </div>
    </AbsoluteFill>
  );
};
