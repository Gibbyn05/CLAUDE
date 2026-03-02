// HMScene6 — Strong CTA (20–24s, 120 frames)
// Dark background intensifies. Headline + button with synced glow pulse.
// Camera pushes in (scale 1 → 1.05). Holds confidently — no fade-out.

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { LightSweep } from '../components/motion/LightSweep';
import { HM_COLORS, HM_COPY, HM_SAFE } from '../constants/highMotion';

export const HMScene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Camera push-in (entire scene scales in from centre) ───────────────────
  const camScale = interpolate(frame, [0, 120], [1.0, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Background intensifies ────────────────────────────────────────────────
  const bgIntensity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });

  // ── Headline entrance ─────────────────────────────────────────────────────
  const headlineProgress = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.9 },
  });
  const headlineScale   = interpolate(headlineProgress, [0, 1], [1.18, 1.0]);
  const headlineOpacity = interpolate(frame, [6, 22], [0, 1], { extrapolateRight: 'clamp' });
  const headlineY       = interpolate(headlineProgress, [0, 1], [40, 0]);

  // ── Button entrance ───────────────────────────────────────────────────────
  const buttonProgress = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.8 },
  });
  const buttonOpacity = interpolate(Math.max(0, frame - 32), [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const buttonY = interpolate(buttonProgress, [0, 1], [40, 0]);

  // ── Button glow pulse (synced with camera push-in) ────────────────────────
  const pulsePhase   = Math.max(0, frame - 48) % 50;
  const glowStrength = interpolate(pulsePhase, [0, 25, 50], [0.55, 1.0, 0.55]);
  const buttonScale  = interpolate(pulsePhase, [0, 25, 50], [1, 1.028, 1]);

  // ── Site URL ──────────────────────────────────────────────────────────────
  const urlOpacity = interpolate(Math.max(0, frame - 65), [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Light sweep near the start of the scene for energy
  // (uses LightSweep at local triggerFrame 8)

  return (
    <AbsoluteFill>
      {/* Deepened background */}
      <AbsoluteFill
        style={{
          background: HM_COLORS.bgDeep,
          opacity: bgIntensity,
        }}
      />
      {/* Neon glow orbs */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 50% 45%, ${HM_COLORS.primary}16 0%, transparent 55%),
            radial-gradient(ellipse at 50% 45%, ${HM_COLORS.secondary}10 0%, transparent 70%),
            ${HM_COLORS.bg}
          `,
        }}
      />

      {/* Light sweep on entry */}
      <LightSweep triggerFrame={8} duration={22} color={HM_COLORS.primary} streakWidth={200} />

      {/* Camera zoom wrapper */}
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
            gap: 56,
          }}
        >
          {/* Headline */}
          <div
            style={{
              opacity: headlineOpacity,
              transform: `translateY(${headlineY}px) scale(${headlineScale})`,
            }}
          >
            {/* "Klar for" */}
            <div
              style={{
                fontSize: 114,
                fontWeight: 900,
                color: HM_COLORS.text,
                textAlign: 'center',
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                fontFamily: "'Inter', 'SF Pro Display', sans-serif",
              }}
            >
              {HM_COPY.scene6.headline.replace('?', '')}
              <span
                style={{
                  color: HM_COLORS.primary,
                  textShadow: `0 0 60px ${HM_COLORS.primary}70, 0 0 120px ${HM_COLORS.primary}30`,
                }}
              >
                ?
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div
            style={{
              opacity: buttonOpacity,
              transform: `translateY(${buttonY}px) scale(${buttonScale})`,
              background: `linear-gradient(135deg, ${HM_COLORS.primary} 0%, #00C8B2 100%)`,
              borderRadius: 100,
              padding: '40px 72px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `
                0 0 ${64 * glowStrength}px ${HM_COLORS.primary}55,
                0 0 ${120 * glowStrength}px ${HM_COLORS.primary}22,
                0 8px 32px rgba(0,0,0,0.5)
              `,
            }}
          >
            <span
              style={{
                fontSize: 50,
                fontWeight: 700,
                color: HM_COLORS.bgDeep,
                fontFamily: "'Inter', 'SF Pro Display', sans-serif",
                letterSpacing: '-0.01em',
              }}
            >
              {HM_COPY.scene6.cta}
            </span>
          </div>

          {/* Site URL */}
          <div
            style={{
              opacity: urlOpacity,
              fontSize: 30,
              color: HM_COLORS.muted,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            {HM_COPY.site}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
