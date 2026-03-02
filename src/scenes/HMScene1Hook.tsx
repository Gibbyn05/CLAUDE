// HMScene1 — Impact Hook (0–2s, 60 frames)
// Full-screen bold text with scale+rotation entrance, neon glow flicker, light sweep.

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { LightSweep } from '../components/motion/LightSweep';
import { HM_COLORS, HM_COPY, HM_DURATIONS, HM_SAFE } from '../constants/highMotion';

// Deterministic glow flicker table (no random())
const FLICKER = [1, 1, 0.45, 1, 1, 1, 1, 0.35, 1, 0.85, 1, 1, 1, 1, 0.55, 1];

export const HMScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Entrance ────────────────────────────────────────────────────────────────
  const entranceProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.9 },
  });

  // Scale from 1.22 → 1.0 and slight rotation correction
  const scale    = interpolate(entranceProgress, [0, 1], [1.22, 1.0]);
  const rotation = interpolate(entranceProgress, [0, 1], [-3, 0]);
  const textOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // ── Neon glow flicker (deterministic) ─────────────────────────────────────
  const flickerMult = FLICKER[frame % FLICKER.length];
  const glowStr = `
    0 0 ${48 * flickerMult}px ${HM_COLORS.primary}88,
    0 0 ${96 * flickerMult}px ${HM_COLORS.primary}40,
    0 0 ${160 * flickerMult}px ${HM_COLORS.secondary}22
  `;

  // ── Exit (frames 52–60): scale up + fade ──────────────────────────────────
  const exitProgress = interpolate(
    frame,
    [HM_DURATIONS.scene1 - 10, HM_DURATIONS.scene1],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const exitScale   = interpolate(exitProgress, [0, 1], [1, 1.12]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  // ── Animated dot-grid background ──────────────────────────────────────────
  const dotShift = (Math.floor(frame / 3)) % 40;

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      {/* Dot-grid background */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(rgba(0,229,200,0.07) 1px, transparent 0),
            linear-gradient(${HM_COLORS.bg}, ${HM_COLORS.bg})
          `,
          backgroundSize: '38px 38px, 100% 100%',
          backgroundPosition: `${dotShift}px ${dotShift}px, 0 0`,
        }}
      />

      {/* Top ambient glow orb */}
      <div
        style={{
          position: 'absolute',
          top: -300,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${HM_COLORS.primary}14 0%, transparent 70%)`,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />

      {/* Light sweep across text */}
      <LightSweep triggerFrame={22} duration={20} color={HM_COLORS.primary} streakWidth={180} />

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${HM_SAFE.v}px ${HM_SAFE.h}px`,
        }}
      >
        {/* Brand eyebrow */}
        <div
          style={{
            opacity: interpolate(frame, [6, 22], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(frame, [6, 22], [18, 0], { extrapolateRight: 'clamp' })}px)`,
            fontSize: 28,
            fontWeight: 600,
            color: HM_COLORS.primary,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            marginBottom: 32,
          }}
        >
          {HM_COPY.brand}
        </div>

        {/* Impact headline */}
        <div
          style={{
            opacity: textOpacity,
            transform: `scale(${scale * exitScale}) rotate(${rotation}deg)`,
            fontSize: 116,
            fontWeight: 900,
            color: HM_COLORS.text,
            textAlign: 'center',
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
            whiteSpace: 'pre-line',
            textShadow: glowStr,
            maxWidth: 900,
          }}
        >
          {HM_COPY.scene1.headline}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
