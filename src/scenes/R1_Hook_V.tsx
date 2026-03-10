// Scene 1 Vertical — Hook (0–149f, 5s)
// Portrait 1080×1920. Imports animated character from landscape file.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';
import { ChaosIcon, SalesRep } from './R1_Hook';

export const R1_Hook_V: React.FC = () => {
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
    { emoji: '📋', tx: 14, ty: 20, delay: 0 },
    { emoji: '📊', tx: 86, ty: 18, delay: 6 },
    { emoji: '📞', tx: 16, ty: 62, delay: 12 },
    { emoji: '📅', tx: 84, ty: 58, delay: 4 },
  ];

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, overflow: 'hidden' }}>
      {chaos.map((c, i) => (
        <ChaosIcon key={i} emoji={c.emoji} tx={c.tx} ty={c.ty} delay={c.delay} frame={frame} fps={fps} size={72} />
      ))}

      {/* Character — larger in portrait, positioned in upper half */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '36%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <SalesRep frame={frame} fps={fps} scale={1.6} />

        {/* ?? bubble */}
        <div
          style={{
            position: 'absolute',
            top: -32,
            right: -130,
            background: 'white',
            border: `2.5px solid ${R_COLORS.dark}`,
            borderRadius: '20px 20px 20px 4px',
            padding: '12px 26px',
            fontSize: 42,
            fontWeight: 800,
            fontFamily: 'system-ui, sans-serif',
            color: R_COLORS.dark,
            transform: `scale(${bubbleScale})`,
            transformOrigin: 'bottom left',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}
        >
          ??
        </div>
      </div>

      {/* Main headline */}
      <div
        style={{
          position: 'absolute',
          bottom: 260,
          left: 0,
          right: 0,
          padding: '0 56px',
          textAlign: 'center',
          opacity: textOpacity,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 60,
          fontWeight: 700,
          color: R_COLORS.dark,
          letterSpacing: '-1px',
          lineHeight: 1.2,
        }}
      >
        Slik ser salg ut uten et system.
      </div>

      {/* Voiceover sub */}
      <div
        style={{
          position: 'absolute',
          bottom: 170,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: subOpacity,
          fontFamily: 'Georgia, serif',
          fontSize: 34,
          fontStyle: 'italic',
          color: R_COLORS.muted,
        }}
      >
        Kaos av regneark, e-poster og lapper.
      </div>
    </AbsoluteFill>
  );
};
