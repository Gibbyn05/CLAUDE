// Scene 6 — CTA (22–26s, 120 frames)
// Headline, button with subtle elevation, StudioSweep over button.
// Ends on a confident clean hold — no fade to black.

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { MotionIn }     from '../components/motion/MotionIn';
import { StudioSweep }  from '../components/motion/StudioSweep';
import { GrainOverlay } from '../components/motion/GrainOverlay';
import { CameraRig }    from '../components/motion/CameraRig';
import { T }            from '../constants/theme';
import { COPY }         from '../constants/copy';

const SCENE_DUR = 120;

export const Scene06_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Button elevation spring ────────────────────────────────────────────────
  const btnProgress = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: T.spring.depth,
  });
  const btnOpacity    = interpolate(Math.max(0, frame - 36), [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
  });
  // Subtle elevation (translateY slightly negative = lifted)
  const btnElevation  = interpolate(btnProgress, [0, 1], [6, -4]);
  const btnScale      = interpolate(btnProgress, [0, 1], [0.96, 1.0]);

  // ── Sub text ───────────────────────────────────────────────────────────────
  const subOpacity = interpolate(Math.max(0, frame - 65), [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // ── Site label ─────────────────────────────────────────────────────────────
  const siteOpacity = interpolate(Math.max(0, frame - 88), [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // ── Chart-line echo from Scene 5 (appears as subtle bg element) ───────────
  const chartOpacity = interpolate(frame, [0, 20], [0.08, 0.08], { extrapolateRight: 'clamp' });
  const W = 920; const H = 260;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 55%, rgba(184,169,138,0.07) 0%, transparent 55%), ${T.bgDeep}`,
        }}
      />
      <GrainOverlay />

      {/* Residual rising chart line (match-cut echo) */}
      <svg
        width={W} height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', bottom: T.safe.v + 180, left: T.safe.h, opacity: chartOpacity, pointerEvents: 'none' }}
      >
        <line x1={0} y1={H * 0.8} x2={W} y2={H * 0.2}
          stroke={T.accent} strokeWidth={1} strokeLinecap="round" />
      </svg>

      {/* StudioSweep: passes over the button region */}
      <StudioSweep triggerFrame={46} duration={40} peakOpacity={0.10} width={480} />

      <CameraRig duration={SCENE_DUR} mode="in" intensity={0.5}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `${T.safe.v}px ${T.safe.h}px`,
            gap: 44,
          }}
        >
          {/* Headline */}
          <MotionIn delay={6} fromY={28} fromScale={0.97} config={T.spring.snappy}>
            <div
              style={{
                fontSize: T.size.hero,
                fontWeight: 900,
                color: T.text,
                textAlign: 'center',
                lineHeight: 1.0,
                letterSpacing: T.tracking.hero,
                fontFamily: T.font,
              }}
            >
              {COPY.scene6.headline}
            </div>
          </MotionIn>

          {/* CTA Button */}
          <div
            style={{
              opacity: btnOpacity,
              transform: `translateY(${btnElevation}px) scale(${btnScale})`,
              background: T.accent,
              borderRadius: 100,
              padding: '36px 64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `
                0 ${16 - btnElevation}px 48px rgba(0,0,0,0.55),
                0 ${4 - btnElevation / 2}px 16px rgba(0,0,0,0.35),
                0 2px 0 rgba(255,255,255,0.06) inset
              `,
            }}
          >
            <span
              style={{
                fontSize: T.size.h3,
                fontWeight: 700,
                color: T.bgDeep,
                fontFamily: T.font,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              {COPY.scene6.cta}
            </span>
          </div>

          {/* Sub text */}
          <div
            style={{
              opacity: subOpacity,
              fontSize: T.size.label,
              fontWeight: 400,
              color: T.muted,
              fontFamily: T.font,
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            {COPY.scene6.sub}
          </div>

          {/* Site label */}
          <div
            style={{
              opacity: siteOpacity,
              position: 'absolute',
              bottom: T.safe.v,
              fontSize: T.size.micro,
              fontWeight: 500,
              color: T.dim,
              fontFamily: T.font,
              letterSpacing: '0.08em',
            }}
          >
            {COPY.scene6.site}
          </div>
        </AbsoluteFill>
      </CameraRig>
    </AbsoluteFill>
  );
};
