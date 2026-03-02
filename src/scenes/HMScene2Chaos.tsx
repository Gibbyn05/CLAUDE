// HMScene2 — Chaos (2–6s, 120 frames)
// Task cards fly in from all four corners with overshoot + rotation.
// Slow parallax blobs add depth. Text overlay appears mid-scene.
// Exit: content directional-sweeps right (simulated blur) in last 8 frames.

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { ParallaxContainer } from '../components/motion/ParallaxContainer';
import { HM_COLORS, HM_COPY, HM_DURATIONS, HM_SAFE } from '../constants/highMotion';

interface ChaoticCardProps {
  emoji: string;
  label: string;
  delay: number;
  startX: number;
  startY: number;
  finalX: number;
  finalY: number;
  startRot: number;
  finalRot: number;
}

const ChaoticCard: React.FC<ChaoticCardProps> = ({
  emoji, label, delay,
  startX, startY, finalX, finalY,
  startRot, finalRot,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  // Low damping = overshoot (bouncy spring)
  const progress = spring({
    frame: local,
    fps,
    config: { damping: 9, stiffness: 115, mass: 0.85 },
  });

  const x   = interpolate(progress, [0, 1], [startX, finalX]);
  const y   = interpolate(progress, [0, 1], [startY, finalY]);
  const rot = interpolate(progress, [0, 1], [startRot, finalRot]);
  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        opacity,
        transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))',
        border: `1px solid ${HM_COLORS.cardBorder}`,
        borderRadius: 22,
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        minWidth: 340,
        boxShadow: `0 0 24px ${HM_COLORS.glowAccent}`,
        backdropFilter: 'blur(6px)',
      }}
    >
      <span style={{ fontSize: 44, lineHeight: 1 }}>{emoji}</span>
      <span
        style={{
          fontSize: 30,
          fontWeight: 600,
          color: HM_COLORS.text,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const HMScene2Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Exit: directional blur right (last 8 frames) ─────────────────────────
  const exitX = interpolate(
    frame,
    [HM_DURATIONS.scene2 - 9, HM_DURATIONS.scene2],
    [0, 680],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const exitOpacity = interpolate(
    frame,
    [HM_DURATIONS.scene2 - 9, HM_DURATIONS.scene2],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // ── Text overlay ─────────────────────────────────────────────────────────
  const textProgress = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 18, stiffness: 110 },
  });
  const textOpacity = interpolate(Math.max(0, frame - 60), [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(textProgress, [0, 1], [40, 0]);

  // ── Parallax camera offset (slow rightward drift) ─────────────────────────
  const cameraOffset = interpolate(frame, [0, HM_DURATIONS.scene2], [0, 60]);

  // Card layout: 4 cards, two rows, centered on the screen
  // Screen: 1080 wide, cards ≈ 340px wide
  // Center horizontally: (1080 - 340) / 2 = 370
  const CX = 90;  // left card x
  const CX2 = 570; // right card x (90 + 340 + gap 140)
  const CY1 = 380; // upper row y
  const CY2 = 580; // lower row y

  const cards = [
    // Top-left: arrives from top-left corner
    { ...HM_COPY.scene2.cards[0], delay: 0,  startX: -500, startY: -400, finalX: CX,  finalY: CY1, startRot: -18, finalRot: -3  },
    // Top-right: arrives from top-right corner
    { ...HM_COPY.scene2.cards[1], delay: 8,  startX:  800, startY: -350, finalX: CX2, finalY: CY1, startRot:  20, finalRot:  4  },
    // Bottom-left: arrives from bottom-left
    { ...HM_COPY.scene2.cards[2], delay: 16, startX: -600, startY:  600, finalX: CX,  finalY: CY2, startRot:  16, finalRot: -5  },
    // Bottom-right: arrives from bottom-right
    { ...HM_COPY.scene2.cards[3], delay: 24, startX:  900, startY:  550, finalX: CX2, finalY: CY2, startRot: -22, finalRot:  6  },
  ];

  return (
    <AbsoluteFill>
      {/* Background */}
      <AbsoluteFill style={{ background: HM_COLORS.bg }} />

      {/* Background parallax blobs (move at 0.25x speed) */}
      <ParallaxContainer offset={cameraOffset} speed={0.25} style={{ position: 'absolute', inset: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -100,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${HM_COLORS.primary}10 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            right: -50,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${HM_COLORS.secondary}10 0%, transparent 70%)`,
          }}
        />
      </ParallaxContainer>

      {/* All animated content (exits together) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${exitX}px)`,
          opacity: exitOpacity,
        }}
      >
        {/* Chaos cards */}
        {cards.map((c) => (
          <ChaoticCard key={c.label} {...c} />
        ))}

        {/* Text overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 220,
            left: HM_SAFE.h,
            right: HM_SAFE.h,
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: HM_COLORS.text,
              fontFamily: "'Inter', 'SF Pro Display', sans-serif",
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              textAlign: 'center',
            }}
          >
            {HM_COPY.scene2.line1}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: HM_COLORS.accent,
              fontFamily: "'Inter', 'SF Pro Display', sans-serif",
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              textAlign: 'center',
              textShadow: `0 0 40px ${HM_COLORS.accent}55`,
            }}
          >
            {HM_COPY.scene2.line2}
          </div>
        </div>
      </div>

      {/* Motion-blur ghost layers (only during exit) */}
      {exitX > 0 && (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: `translateX(${exitX * 0.6}px)`,
              opacity: exitOpacity * 0.35,
              background: `linear-gradient(90deg, transparent 0%, ${HM_COLORS.primary}08 100%)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(90deg, transparent ${exitX / 12}%, ${HM_COLORS.bg} ${exitX / 10 + 20}%)`,
              opacity: Math.min(exitX / 400, 0.9),
            }}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
