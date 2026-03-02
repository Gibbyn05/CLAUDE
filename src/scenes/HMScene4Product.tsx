// HMScene4 — Product Power (10–16s, 180 frames)
// Three DepthCards staggered entrance with skew.
// GraphLineAnimated rises in the bottom card with a light streak following the tip.

import {
  AbsoluteFill, useCurrentFrame,
  interpolate,
} from 'remotion';
import { DepthCard } from '../components/motion/DepthCard';
import { GraphLineAnimated } from '../components/motion/GraphLineAnimated';
import { LightSweep } from '../components/motion/LightSweep';
import { HM_COLORS, HM_COPY, HM_DURATIONS, HM_SAFE } from '../constants/highMotion';

export const HMScene4Product: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Scene fade-in + headline ───────────────────────────────────────────────
  const sceneOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  const headlineOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const headlineY = interpolate(frame, [0, 20], [32, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Exit ──────────────────────────────────────────────────────────────────
  const exitY = interpolate(
    frame,
    [HM_DURATIONS.scene4 - 10, HM_DURATIONS.scene4],
    [0, -320],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const exitOpacity = interpolate(
    frame,
    [HM_DURATIONS.scene4 - 10, HM_DURATIONS.scene4],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const panels = HM_COPY.scene4.panels;
  const panelColors = [HM_COLORS.primary, HM_COLORS.secondary, HM_COLORS.accent];

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      {/* Background */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 80% 20%, ${HM_COLORS.secondary}12 0%, transparent 55%),
            radial-gradient(ellipse at 20% 80%, ${HM_COLORS.primary}10 0%, transparent 50%),
            ${HM_COLORS.bg}
          `,
        }}
      />

      {/* Light sweep accompanying the graph (triggers as graph starts drawing) */}
      <LightSweep triggerFrame={80} duration={28} color={HM_COLORS.primary} streakWidth={140} />

      {/* All content — exits together */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${exitY}px)`,
          opacity: exitOpacity,
        }}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: `${HM_SAFE.v}px ${HM_SAFE.h}px`,
            gap: 24,
            justifyContent: 'center',
          }}
        >
          {/* Section headline */}
          <div
            style={{
              opacity: headlineOpacity,
              transform: `translateY(${headlineY}px)`,
              fontSize: 34,
              fontWeight: 600,
              color: HM_COLORS.primary,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              marginBottom: 8,
            }}
          >
            {HM_COPY.brand}
          </div>

          {/* Top row: two side-by-side cards */}
          <div style={{ display: 'flex', gap: 20 }}>
            <DepthCard
              icon={panels[0].icon}
              title={panels[0].title}
              sub={panels[0].sub}
              delay={12}
              glowColor={panelColors[0]}
              fromLeft
            />
            <DepthCard
              icon={panels[1].icon}
              title={panels[1].title}
              sub={panels[1].sub}
              delay={28}
              glowColor={panelColors[1]}
              fromLeft={false}
            />
          </div>

          {/* Bottom: full-width card with graph */}
          <DepthCard
            icon={panels[2].icon}
            title={panels[2].title}
            sub={panels[2].sub}
            delay={48}
            glowColor={panelColors[2]}
            fromLeft
            wide
          >
            <GraphLineAnimated
              delay={72}
              badge={HM_COPY.scene4.badge}
              width={820}
              height={260}
            />
          </DepthCard>
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
