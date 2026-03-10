// Scene 5 — CTA (90f = 3s)
// "Finn nye kunder raskere" / "Start gratis på reachr.no"
// Dark background, animated leads flowing into pipeline at top.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

// ── Small animated lead dots flowing into a pipeline ─────────────────────────
const LeadFlow: React.FC<{ frame: number }> = ({ frame }) => {
  const dots = [0, 18, 36, 54, 72].map((offset) => {
    const f = frame + offset;
    const cycle = f % 90;
    const x = interpolate(cycle, [0, 90], [80, 920], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const y = 40 + Math.sin((f + offset) * 0.12) * 18;
    const op = cycle < 10 ? cycle / 10 : cycle > 80 ? (90 - cycle) / 10 : 1;
    return { x, y, op };
  });

  return (
    <div style={{ position: 'relative', height: 90, marginBottom: 0 }}>
      {/* Pipeline track */}
      <div style={{ position: 'absolute', top: 44, left: 70, right: 70, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }} />
      <div style={{ position: 'absolute', top: 38, left: 70, height: 15, width: 15, borderRadius: '50%', background: '#333', border: '2px solid #444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#666' }} />
      </div>
      <div style={{ position: 'absolute', top: 38, right: 70, height: 15, width: 15, borderRadius: '50%', background: `${R_COLORS.green}33`, border: `2px solid ${R_COLORS.green}88`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: R_COLORS.green }} />
      </div>
      {/* Dots */}
      {dots.map((d, i) => (
        <div key={i} style={{ position: 'absolute', left: d.x, top: d.y, width: 10, height: 10, borderRadius: '50%', background: R_COLORS.green, opacity: d.op * 0.85, boxShadow: `0 0 10px ${R_COLORS.green}88` }} />
      ))}
    </div>
  );
};

// ── Main scene ────────────────────────────────────────────────────────────────
export const RV_S5_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in from dark
  const sceneOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "Finn nye kunder" line 1
  const line1Opacity = interpolate(frame, [8, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1Y       = interpolate(frame, [8, 26], [18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "raskere" — drops with spring
  const raskereSpring = spring({ frame: Math.max(0, frame - 24), fps, config: { damping: 12, stiffness: 110 } });
  const raskereY = interpolate(raskereSpring, [0, 1], [-50, 0]);

  // Underline under "raskere"
  const underlineW = interpolate(frame, [35, 52], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // CTA button
  const btnSpring = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 10, stiffness: 130 } });
  const btnScale  = interpolate(btnSpring, [0, 1], [0.85, 1]);
  const btnGlow   = interpolate(frame, [58, 74], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "Ingen kredittkort" sub
  const subOpacity = interpolate(frame, [60, 76], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Caption
  const captionOpacity = interpolate(frame, [68, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: R_COLORS.dark,
        opacity: sceneOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Green glow at top */}
      <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, background: `radial-gradient(ellipse, ${R_COLORS.green}28 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Lead flow animation at top */}
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0 }}>
        <LeadFlow frame={frame} />
      </div>

      {/* Headline */}
      <div style={{ textAlign: 'center', padding: '0 52px', marginBottom: 56 }}>
        {/* Line 1 */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)`, fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 76, fontWeight: 700, color: '#f8f5ec', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            Finn nye kunder
          </div>
        </div>
        {/* Line 2 — "raskere" with green underline */}
        <div style={{ position: 'relative', display: 'inline-block', transform: `translateY(${raskereY}px)` }}>
          <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 76, fontWeight: 700, color: R_COLORS.green, letterSpacing: '-1.5px', lineHeight: 1.05 }}>
            raskere.
          </div>
          <div style={{ height: 5, background: R_COLORS.green, borderRadius: 3, width: `${underlineW}%`, marginTop: 4, boxShadow: `0 0 20px ${R_COLORS.green}88` }} />
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
            boxShadow: `0 0 ${52 * btnGlow}px ${R_COLORS.green}55, 0 8px 32px rgba(9,254,148,0.20)`,
          }}
        >
          Start gratis på reachr.no →
        </div>
      </div>

      {/* "Ingen kredittkort" */}
      <div style={{ marginTop: 18, fontFamily: 'system-ui, sans-serif', fontSize: 22, color: 'rgba(255,255,255,0.28)', opacity: subOpacity }}>
        Ingen kredittkort nødvendig.
      </div>

      {/* Voiceover caption */}
      {/* VO: "Start gratis på reachr.no" */}
      <div style={{ position: 'absolute', bottom: 72, left: 44, right: 44, background: 'rgba(255,255,255,0.10)', borderRadius: 14, padding: '14px 20px', textAlign: 'center', opacity: captionOpacity, fontFamily: 'system-ui, sans-serif', fontSize: 29, fontWeight: 600, color: 'white', lineHeight: 1.4 }}>
        Start gratis på reachr.no
      </div>
    </AbsoluteFill>
  );
};
