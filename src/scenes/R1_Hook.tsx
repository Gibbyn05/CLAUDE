// Scene 1 — Hook (0–119f, 4s)
// Frustrated sales rep at a messy desk, chaos icons orbit, question appears.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

export const ChaosIcon: React.FC<{
  emoji: string;
  tx: number;
  ty: number;
  delay: number;
  frame: number;
  fps: number;
  size?: number;
}> = ({ emoji, tx, ty, delay, frame, fps, size = 64 }) => {
  const f = Math.max(0, frame - delay);
  const s = spring({ frame: f, fps, config: { damping: 10, stiffness: 60, mass: 1.2 } });
  const rot = interpolate(f, [0, 25], [720, 0], { extrapolateRight: 'clamp' });
  const opacity = interpolate(f, [0, 5], [0, 1], { extrapolateRight: 'clamp' });
  // Gentle float after landing
  const floatY = f > 25 ? Math.sin((f - 25) * 0.08 + tx) * 6 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${tx}%`,
        top: `${ty}%`,
        transform: `translate(-50%,-50%) translateY(${floatY}px) scale(${s}) rotate(${rot}deg)`,
        fontSize: size,
        opacity,
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
      }}
    >
      {emoji}
    </div>
  );
};

export const SalesRep: React.FC<{ frame: number; fps: number; scale?: number }> = ({ frame, fps, scale = 1 }) => {
  // Breathing — subtle body scale
  const breathe = 1 + Math.sin(frame * 0.14) * 0.018;

  // Weight shift — body tilts gently left/right
  const weightShift = Math.sin(frame * 0.07) * 2.5;

  // Blink — every 50 frames, closes for 4 frames
  const blinkCycle = frame % 50;
  const eyeH = blinkCycle < 4 ? interpolate(blinkCycle, [0, 1.5, 2.5, 4], [1, 0.08, 0.08, 1]) : 1;

  // Head sway left/right
  const headSway = Math.sin(frame * 0.09) * 4;

  // Arms fidget before shrug, then lift
  const armFidget = frame < 75 ? Math.sin(frame * 0.22) * 5 : 0;
  const shrug = spring({ frame: Math.max(0, frame - 75), fps, config: { damping: 8, stiffness: 150 } });
  const shrugLift = interpolate(shrug, [0, 1], [0, -18]);
  const armY = shrugLift - armFidget;

  // Legs — slight restless shift
  const legSwing = Math.sin(frame * 0.15) * 3;

  // Mouth nervous twitch
  const mouthY = Math.sin(frame * 0.2) * 1.5;

  // Sweat drop bobs
  const sweatY = Math.sin(frame * 0.18) * 3;

  const w = 160 * scale;
  const h = 240 * scale;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 160 240"
      fill="none"
      style={{ transform: `scale(${breathe}) rotate(${weightShift}deg)`, transformOrigin: 'center 220px' }}
    >
      {/* Ground shadow */}
      <ellipse cx="80" cy="232" rx="52" ry="10" fill="rgba(0,0,0,0.07)" />

      {/* Body */}
      <rect x="45" y="100" width="70" height="80" rx="12" fill="#e8e4d4" stroke={R_COLORS.dark} strokeWidth="3" />

      {/* Left arm — fidgets then shrugs */}
      <line x1="45" y1={110 + armY} x2="16" y2={142 + armY} stroke={R_COLORS.dark} strokeWidth="4" strokeLinecap="round" />
      {/* Right arm */}
      <line x1="115" y1={110 + armY} x2="144" y2={142 + armY} stroke={R_COLORS.dark} strokeWidth="4" strokeLinecap="round" />

      {/* Legs — restless shift */}
      <line x1="66" y1="180" x2={60 + legSwing} y2="226" stroke={R_COLORS.dark} strokeWidth="4" strokeLinecap="round" />
      <line x1="94" y1="180" x2={100 - legSwing} y2="226" stroke={R_COLORS.dark} strokeWidth="4" strokeLinecap="round" />

      {/* Head group — sways */}
      <g transform={`rotate(${headSway}, 80, 68)`}>
        <circle cx="80" cy="68" r="38" fill="#e8e4d4" stroke={R_COLORS.dark} strokeWidth="3" />

        {/* Eyes — blink */}
        <ellipse cx="65" cy="62" rx="5" ry={6 * eyeH} fill={R_COLORS.dark} />
        <ellipse cx="95" cy="62" rx="5" ry={6 * eyeH} fill={R_COLORS.dark} />
        {/* Pupils — look side to side */}
        <ellipse cx={65 + Math.sin(frame * 0.05) * 2} cy={62} rx="2" ry={2 * eyeH} fill="white" />
        <ellipse cx={95 + Math.sin(frame * 0.05) * 2} cy={62} rx="2" ry={2 * eyeH} fill="white" />

        {/* Worried brows */}
        <line x1="57" y1="50" x2="73" y2="55" stroke={R_COLORS.dark} strokeWidth="3" strokeLinecap="round" />
        <line x1="87" y1="55" x2="103" y2="50" stroke={R_COLORS.dark} strokeWidth="3" strokeLinecap="round" />

        {/* Mouth — nervous twitch */}
        <path
          d={`M 67 ${83 + mouthY} Q 80 ${78 + mouthY} 93 ${83 + mouthY}`}
          stroke={R_COLORS.dark}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Sweat drop — bobs */}
        <ellipse cx="110" cy={47 + sweatY} rx="5" ry="7" fill="#a8d8ea" opacity="0.85" />
      </g>
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
        Slik ser salg ut uten et system.
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
        Kaos av regneark, e-poster og lapper.
      </div>
    </AbsoluteFill>
  );
};
