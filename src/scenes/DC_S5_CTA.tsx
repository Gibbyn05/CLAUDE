// Scene 5 — CTA (120f = 4s)
// Dark bg, green glow, pipeline leads flowing into "Kunde" state.
// Headline: "Finn nye kunder raskere"
// CTA: "Start gratis på reachr.no"

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

// ── Animated pipeline: cards move across stages, one flips to "Møte booket" ──
const PipelineFlow: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const stages = ['Ny lead', 'Kontaktet', 'Demo', 'Kunde ✓'];
  const stageColors = ['#3478f6', '#f59e0b', '#a78bfa', R_COLORS.green];

  // Card 1 progresses through stages during the scene
  const cardStageRaw = interpolate(frame, [10, 80], [0, 3.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardStageIndex = Math.min(3, Math.floor(cardStageRaw));
  const cardColor = stageColors[cardStageIndex];

  // Card pulse when it lands on "Kunde ✓"
  const landS = spring({ frame: Math.max(0, frame - 72), fps, config: { damping: 8, stiffness: 220, mass: 0.7 } });
  const landScale = cardStageIndex >= 3 ? interpolate(landS, [0, 1], [1.3, 1]) : 1;
  const landGlow  = cardStageIndex >= 3 ? interpolate(frame, [72, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;

  // Flowing dot animation (additional leads behind main card)
  const dots = [0, 25, 50].map((offset) => {
    const f = frame + offset;
    const cycle = f % 90;
    const x = interpolate(cycle, [0, 90], [60, 960], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const op = cycle < 10 ? cycle / 10 : cycle > 80 ? (90 - cycle) / 10 : 1;
    return { x, op };
  });

  return (
    <div style={{ padding: '0 40px', position: 'relative' }}>
      {/* Stage labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        {stages.map((s, i) => (
          <div
            key={i}
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: i === cardStageIndex ? stageColors[i] : 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              transition: 'color 0.2s',
            }}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Track */}
      <div style={{ position: 'relative', height: 64 }}>
        <div style={{ position: 'absolute', top: 24, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }} />

        {/* Stage dots */}
        {stages.map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 17,
              left: `${(i / 3) * 100}%`,
              transform: 'translateX(-50%)',
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: i <= cardStageIndex ? stageColors[i] + '33' : '#1e1e1e',
              border: `2px solid ${i <= cardStageIndex ? stageColors[i] + '88' : '#333'}`,
              zIndex: 1,
            }}
          />
        ))}

        {/* Lead card */}
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: `${Math.min(cardStageIndex / 3, 1) * 100}%`,
            transform: `translateX(-50%) scale(${landScale})`,
            background: cardColor + '22',
            border: `2px solid ${cardColor}88`,
            borderRadius: 10,
            padding: '6px 12px',
            zIndex: 5,
            boxShadow: landGlow > 0 ? `0 0 ${24 * landGlow}px ${R_COLORS.green}66` : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: cardColor }}>Solberg &amp; Co</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{stages[cardStageIndex]}</div>
        </div>

        {/* Background flowing dots */}
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 20,
              left: d.x,
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: R_COLORS.green,
              opacity: d.op * 0.5,
              boxShadow: `0 0 8px ${R_COLORS.green}66`,
              transform: 'translateX(-50%)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ── Main scene ─────────────────────────────────────────────────────────────────
export const DC_S5_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene fade in
  const sceneOp = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Headline: "Finn nye kunder raskere"
  const line1S  = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 14, stiffness: 100 } });
  const line1Y  = interpolate(line1S, [0, 1], [-40, 0]);
  const line1Op = interpolate(frame, [8, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Subtitle: "Start gratis på reachr.no"
  const line2S  = spring({ frame: Math.max(0, frame - 24), fps, config: { damping: 12, stiffness: 110 } });
  const line2Y  = interpolate(line2S, [0, 1], [-30, 0]);
  const line2Op = interpolate(frame, [24, 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Green underline sweep under "raskere"
  const underW = interpolate(frame, [38, 56], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // CTA button springs in
  const btnS    = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 10, stiffness: 130 } });
  const btnScale = interpolate(btnS, [0, 1], [0.82, 1]);
  const btnGlow  = interpolate(frame, [58, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "Ingen kredittkort" appears
  const subOp = interpolate(frame, [64, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: `radial-gradient(ellipse, ${R_COLORS.green}28 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Pipeline flow */}
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0 }}>
        <PipelineFlow frame={frame} fps={fps} />
      </div>

      {/* Headline block */}
      <div style={{ textAlign: 'center', padding: '0 44px', marginBottom: 48 }}>
        {/* Line 1: "Finn nye kunder raskere" */}
        <div style={{ transform: `translateY(${line1Y}px)`, opacity: line1Op }}>
          <div
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 64,
              fontWeight: 700,
              color: '#f8f5ec',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
            }}
          >
            Finn nye kunder
          </div>
          {/* "raskere" with underline */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 64,
                fontWeight: 700,
                color: R_COLORS.green,
                letterSpacing: '-1.5px',
                lineHeight: 1.05,
              }}
            >
              raskere
            </div>
            <div
              style={{
                height: 4,
                background: R_COLORS.green,
                borderRadius: 3,
                width: `${underW}%`,
                marginTop: 4,
                boxShadow: `0 0 18px ${R_COLORS.green}88`,
              }}
            />
          </div>
        </div>

        {/* Line 2: "Start gratis på reachr.no" */}
        <div style={{ transform: `translateY(${line2Y}px)`, opacity: line2Op, marginTop: 14 }}>
          <div
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 28,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.50)',
              letterSpacing: '-0.2px',
            }}
          >
            Start gratis på reachr.no
          </div>
        </div>
      </div>

      {/* CTA Button */}
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

      {/* "Ingen kredittkort nødvendig" */}
      <div
        style={{
          marginTop: 18,
          fontFamily: 'system-ui, sans-serif',
          fontSize: 18,
          color: 'rgba(255,255,255,0.24)',
          opacity: subOp,
        }}
      >
        Ingen kredittkort nødvendig.
      </div>
    </AbsoluteFill>
  );
};
