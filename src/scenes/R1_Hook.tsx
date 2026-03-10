// Scene 1 — Hook (0–119f, 4s)
// Frustrated sales rep at a messy desk, chaos icons orbit, question appears.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

const ChaosIcon: React.FC<{
  emoji: string;
  tx: number;
  ty: number;
  delay: number;
  frame: number;
  fps: number;
}> = ({ emoji, tx, ty, delay, frame, fps }) => {
  const f = Math.max(0, frame - delay);
  const s = spring({ frame: f, fps, config: { damping: 10, stiffness: 60, mass: 1.2 } });
  const rot = interpolate(f, [0, 25], [720, 0], { extrapolateRight: 'clamp' });
  const opacity = interpolate(f, [0, 5], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        left: `${tx}%`,
        top: `${ty}%`,
        transform: `translate(-50%,-50%) scale(${s}) rotate(${rot}deg)`,
        fontSize: 64,
        opacity,
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
      }}
    >
      {emoji}
    </div>
  );
};

const SalesRep: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const shrug = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 8, stiffness: 150 },
  });
  const lift = interpolate(shrug, [0, 1], [0, -18]);

  return (
    <svg width="160" height="240" viewBox="0 0 160 240" fill="none">
      {/* Shadow */}
      <ellipse cx="80" cy="232" rx="52" ry="10" fill="rgba(0,0,0,0.07)" />
      {/* Body */}
      <rect x="45" y="100" width="70" height="80" rx="12" fill="#e8e4d4" stroke={R_COLORS.dark} strokeWidth="3" />
      {/* Left arm */}
      <line x1="45" y1={110 + lift} x2="16" y2={142 + lift} stroke={R_COLORS.dark} strokeWidth="4" strokeLinecap="round" />
      {/* Right arm */}
      <line x1="115" y1={110 + lift} x2="144" y2={142 + lift} stroke={R_COLORS.dark} strokeWidth="4" strokeLinecap="round" />
      {/* Legs */}
      <line x1="66" y1="180" x2="60" y2="226" stroke={R_COLORS.dark} strokeWidth="4" strokeLinecap="round" />
      <line x1="94" y1="180" x2="100" y2="226" stroke={R_COLORS.dark} strokeWidth="4" strokeLinecap="round" />
      {/* Head */}
      <circle cx="80" cy="68" r="38" fill="#e8e4d4" stroke={R_COLORS.dark} strokeWidth="3" />
      {/* Eyes */}
      <ellipse cx="65" cy="62" rx="5" ry="6" fill={R_COLORS.dark} />
      <ellipse cx="95" cy="62" rx="5" ry="6" fill={R_COLORS.dark} />
      {/* Worried brows */}
      <line x1="57" y1="50" x2="73" y2="55" stroke={R_COLORS.dark} strokeWidth="3" strokeLinecap="round" />
      <line x1="87" y1="55" x2="103" y2="50" stroke={R_COLORS.dark} strokeWidth="3" strokeLinecap="round" />
      {/* Flat mouth */}
      <path d="M 67 83 Q 80 78 93 83" stroke={R_COLORS.dark} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Sweat drop */}
      <ellipse cx="110" cy="47" rx="5" ry="7" fill="#a8d8ea" opacity="0.85" />
    </svg>
  );
};

export const R1_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bubbleScale = spring({
    frame: Math.max(0, frame - 80),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const chaos = [
    { emoji: '📋', tx: 18, ty: 28, delay: 0 },
    { emoji: '📊', tx: 82, ty: 22, delay: 6 },
    { emoji: '📞', tx: 20, ty: 72, delay: 12 },
    { emoji: '📅', tx: 80, ty: 68, delay: 4 },
  ];

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, overflow: 'hidden' }}>
      {chaos.map((c, i) => (
        <ChaosIcon key={i} emoji={c.emoji} tx={c.tx} ty={c.ty} delay={c.delay} frame={frame} fps={fps} />
      ))}

      {/* Central character */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '42%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <SalesRep frame={frame} fps={fps} />

        {/* ?? bubble */}
        <div
          style={{
            position: 'absolute',
            top: -24,
            right: -108,
            background: 'white',
            border: `2.5px solid ${R_COLORS.dark}`,
            borderRadius: '20px 20px 20px 4px',
            padding: '10px 22px',
            fontSize: 36,
            fontWeight: 800,
            fontFamily: 'system-ui, sans-serif',
            color: R_COLORS.dark,
            transform: `scale(${bubbleScale})`,
            transformOrigin: 'bottom left',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          }}
        >
          ??
        </div>
      </div>

      {/* Main headline */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: textOpacity,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 80,
          fontWeight: 700,
          color: R_COLORS.dark,
          letterSpacing: '-1.5px',
          lineHeight: 1.1,
        }}
      >
        Hvem skal jeg kontakte neste?
      </div>

      {/* Voiceover sub */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: subOpacity,
          fontFamily: 'Georgia, serif',
          fontSize: 38,
          fontStyle: 'italic',
          color: R_COLORS.muted,
        }}
      >
        Prospektering er kaotisk.
      </div>
    </AbsoluteFill>
  );
};
