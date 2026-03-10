// Scene 5 — CTA (120f = 4s)
// Dark bg, green glow, leads flowing, bold CTA button.
// Norwegian: "Slutt å miste leads. Start gratis."

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

// ── Flowing lead dots (horizontal pipeline) ────────────────────────────────────
const LeadFlow: React.FC<{ frame: number }> = ({ frame }) => {
  const dots = [0, 20, 40, 60, 80].map((offset) => {
    const f = frame + offset;
    const cycle = f % 100;
    const x = interpolate(cycle, [0, 100], [60, 960], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const y = 44 + Math.sin((f + offset) * 0.10) * 16;
    const op = cycle < 12 ? cycle / 12 : cycle > 88 ? (100 - cycle) / 12 : 1;
    return { x, y, op };
  });

  return (
    <div style={{ position: 'relative', height: 100 }}>
      {/* Track */}
      <div style={{ position: 'absolute', top: 48, left: 50, right: 50, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }} />
      {/* Start node */}
      <div style={{ position: 'absolute', top: 41, left: 50, width: 14, height: 14, borderRadius: '50%', background: '#1e1e1e', border: '2px solid #444' }} />
      {/* End node (green) */}
      <div style={{ position: 'absolute', top: 41, right: 50, width: 14, height: 14, borderRadius: '50%', background: `${R_COLORS.green}22`, border: `2px solid ${R_COLORS.green}88`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: R_COLORS.green }} />
      </div>
      {/* Dots */}
      {dots.map((d, i) => (
        <div key={i} style={{ position: 'absolute', left: d.x, top: d.y, width: 11, height: 11, borderRadius: '50%', background: R_COLORS.green, opacity: d.op * 0.88, boxShadow: `0 0 12px ${R_COLORS.green}88`, transform: 'translate(-50%,-50%)' }} />
      ))}
    </div>
  );
};

// ── Main scene ─────────────────────────────────────────────────────────────────
export const DC_S5_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene fade in
  const sceneOp = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Headline line 1
  const line1Op = interpolate(frame, [10, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1Y  = interpolate(frame, [10, 26], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "Start gratis." — spring drop
  const line2S = spring({ frame: Math.max(0, frame - 26), fps, config: { damping: 12, stiffness: 110 } });
  const line2Y = interpolate(line2S, [0, 1], [-50, 0]);
  const line2Op = interpolate(frame, [26, 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Underline
  const underlineW = interpolate(frame, [42, 58], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // CTA button
  const btnS = spring({ frame: Math.max(0, frame - 54), fps, config: { damping: 10, stiffness: 130 } });
  const btnScale = interpolate(btnS, [0, 1], [0.82, 1]);
  const btnGlow  = interpolate(frame, [62, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Sub-text
  const subOp = interpolate(frame, [64, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Caption
  const capOp = interpolate(frame, [72, 86], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: R_COLORS.dark,
        opacity: sceneOp,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Green radial glow top */}
      <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 350, background: `radial-gradient(ellipse, ${R_COLORS.green}2a 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Lead flow */}
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0 }}>
        <LeadFlow frame={frame} />
      </div>

      {/* Headline */}
      <div style={{ textAlign: 'center', padding: '0 44px', marginBottom: 52 }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ opacity: line1Op, transform: `translateY(${line1Y}px)`, fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 68, fontWeight: 700, color: '#f8f5ec', letterSpacing: '-1px', lineHeight: 1.1 }}>
            Slutt å miste leads.
          </div>
        </div>
        <div style={{ transform: `translateY(${line2Y}px)`, opacity: line2Op, position: 'relative', display: 'inline-block' }}>
          <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 68, fontWeight: 700, color: R_COLORS.green, letterSpacing: '-1px', lineHeight: 1.05 }}>
            Start gratis.
          </div>
          <div style={{ height: 4, background: R_COLORS.green, borderRadius: 3, width: `${underlineW}%`, marginTop: 4, boxShadow: `0 0 18px ${R_COLORS.green}88` }} />
        </div>
      </div>

      {/* CTA button */}
      <div style={{ padding: '0 44px', width: '100%', boxSizing: 'border-box', transform: `scale(${btnScale})` }}>
        <div
          style={{
            background: R_COLORS.green,
            color: R_COLORS.dark,
            borderRadius: 20,
            padding: '26px 32px',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: '-0.3px',
            boxShadow: `0 0 ${54 * btnGlow}px ${R_COLORS.green}55, 0 8px 32px rgba(9,254,148,0.18)`,
          }}
        >
          Start gratis på reachr.no →
        </div>
      </div>

      {/* "Ingen kredittkort" */}
      <div style={{ marginTop: 18, fontFamily: 'system-ui, sans-serif', fontSize: 20, color: 'rgba(255,255,255,0.26)', opacity: subOp }}>
        Ingen kredittkort nødvendig.
      </div>

      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 68,
          left: 44, right: 44,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 14,
          padding: '14px 20px',
          textAlign: 'center',
          opacity: capOp,
          fontFamily: 'system-ui, sans-serif',
          fontSize: 28,
          fontWeight: 600,
          color: 'white',
          lineHeight: 1.4,
        }}
      >
        Start gratis på reachr.no
      </div>
    </AbsoluteFill>
  );
};
