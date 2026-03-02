// Scene 3 — Solution Intro (7–11s + 16f push exit, 136 frames local)
// Match-cut from compressed cards → "Kling Vekst" title reveal.
// StudioSweep passes over brand title.
// EXIT: push left (content translates X: 0 → -1080 in last 16 frames).
// Scene 4 overlaps these last 16 frames and enters from right simultaneously.

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { MatchCutCardStack }  from '../components/motion/MatchCutCardStack';
import { TypeWipe }           from '../components/motion/TypeWipe';
import { StudioSweep }        from '../components/motion/StudioSweep';
import { GrainOverlay }       from '../components/motion/GrainOverlay';
import { T }                  from '../constants/theme';
import { COPY }               from '../constants/copy';

const CONTENT_END   = 120; // frames of actual content
const PUSH_DURATION = 16;  // exit push frames
const TOTAL         = CONTENT_END + PUSH_DURATION; // 136

export const Scene03_Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Push-left exit ────────────────────────────────────────────────────────
  const pushX = interpolate(
    frame,
    [CONTENT_END, TOTAL],
    [0, -1080],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // ── Cards re-expand from compressed state into clean layout ───────────────
  const expandProgress = spring({
    frame,
    fps,
    config: T.spring.depth,
  });
  // Cards opacity fades as headline takes focus
  const cardsOpacity = interpolate(frame, [0, 20, 55, 70], [0.6, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Brand headline ─────────────────────────────────────────────────────────
  const titleDelay = 14;

  // ── Eyebrow ────────────────────────────────────────────────────────────────
  const eyeProgress = spring({ frame: Math.max(0, frame - 10), fps, config: T.spring.snappy });
  const eyeY        = interpolate(eyeProgress, [0, 1], [16, 0]);
  const eyeOpacity  = interpolate(Math.max(0, frame - 10), [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  // ── Value line ─────────────────────────────────────────────────────────────
  const valueProgress = spring({ frame: Math.max(0, frame - 58), fps, config: T.spring.smooth });
  const valueY        = interpolate(valueProgress, [0, 1], [24, 0]);
  const valueOpacity  = interpolate(Math.max(0, frame - 58), [0, 14], [0, 1], { extrapolateRight: 'clamp' });

  const cards = COPY.scene2.cards.map((c) => ({ id: c.label, icon: c.icon, label: c.label }));

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 35%, rgba(184,169,138,0.08) 0%, transparent 55%), ${T.bg}`,
        }}
      />
      <GrainOverlay />

      {/* StudioSweep over the brand title */}
      <StudioSweep triggerFrame={titleDelay + 18} duration={38} peakOpacity={0.10} width={460} />

      {/* All content pushed left on exit */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${pushX}px)`,
        }}
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: `${T.safe.v}px ${T.safe.h}px`,
            gap: 40,
          }}
        >
          {/* Compressed cards (match-cut entry) — expand and fade out */}
          <div
            style={{
              opacity: cardsOpacity,
              position: 'relative',
              height: 80,
              overflow: 'visible',
            }}
          >
            <MatchCutCardStack
              cards={cards}
              fromLayout="compress"
              toLayout="grid"
              transitionDuration={50}
              delay={0}
              stagger={0}
              width={880}
            />
          </div>

          {/* Eyebrow */}
          <div
            style={{
              opacity: eyeOpacity,
              transform: `translateY(${eyeY}px)`,
              fontSize: T.size.label,
              fontWeight: 600,
              color: T.accent,
              letterSpacing: T.tracking.label,
              textTransform: 'uppercase' as const,
              fontFamily: T.font,
            }}
          >
            {COPY.scene3.eyebrow}
          </div>

          {/* Brand title — TypeWipe + tracking settle */}
          <TypeWipe
            delay={titleDelay}
            wipeDuration={26}
            trackingSettle
            fromTracking="0.09em"
            toTracking={T.tracking.hero}
            style={{
              fontSize: T.size.hero,
              fontWeight: 900,
              color: T.text,
              lineHeight: 1.0,
              fontFamily: T.font,
            }}
          >
            {COPY.scene3.brand}
          </TypeWipe>

          {/* Divider */}
          <div
            style={{
              width: interpolate(Math.max(0, frame - titleDelay + 22), [0, 24], [0, 200], {
                extrapolateRight: 'clamp',
              }),
              height: 1,
              background: T.accentDim,
            }}
          />

          {/* Value line */}
          <div
            style={{
              opacity: valueOpacity,
              transform: `translateY(${valueY}px)`,
              fontSize: T.size.body,
              fontWeight: 400,
              color: T.textSub,
              lineHeight: 1.55,
              fontFamily: T.font,
              letterSpacing: T.tracking.body,
              whiteSpace: 'pre-line',
            }}
          >
            {COPY.scene3.value}
          </div>
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
