// Scene 3 — Reachr Enters (150f = 5s)
// Chaos windows scatter off-screen, dark bg wipes in,
// Reachr logo/wordmark springs down, dashboard slides up.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FakeWindow, FakeMenuBar } from '../components/FakeWindow';
import { R_COLORS } from '../constants/reachr';

// ── Reachr Dashboard mockup ────────────────────────────────────────────────────
const DashboardPreview: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const rows = [
    { name: 'Maria Berge',     company: 'Berge Bygg AS',    stage: 'Ny lead',      value: '85k', color: '#3478f6' },
    { name: 'Kjell Andersen',  company: 'Andersen Elektro', stage: 'Kontaktet',    value: '42k', color: '#f59e0b' },
    { name: 'Tom Christoff.',  company: 'TC Consult',       stage: 'Demo booket',  value: '120k', color: R_COLORS.green },
    { name: 'Lene Dahl',       company: 'Dahl & Co',        stage: 'Tilbud sendt', value: '67k', color: '#a78bfa' },
  ];

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'system-ui, sans-serif', fontSize: 12, background: '#141414' }}>
      {/* Search bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#222', borderRadius: 8, padding: '7px 12px', marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: '#666' }}>🔍</div>
        <div style={{ color: '#555', fontSize: 12 }}>Søk leads, selskaper, notater…</div>
      </div>
      {/* Lead rows */}
      {rows.map((r, i) => {
        const rowS = spring({ frame: Math.max(0, frame - i * 8 - 20), fps, config: { damping: 16, stiffness: 120 } });
        const rowOp = interpolate(rowS, [0, 1], [0, 1]);
        const rowX  = interpolate(rowS, [0, 1], [30, 0]);
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 0',
              borderBottom: '1px solid #222',
              opacity: rowOp,
              transform: `translateX(${rowX}px)`,
            }}
          >
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: r.color + '33', border: `2px solid ${r.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.color, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
              {r.name[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, color: '#f0f0f0', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
              <div style={{ color: '#666', fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.company}</div>
            </div>
            <div style={{ padding: '3px 8px', background: r.color + '22', color: r.color, borderRadius: 6, fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{r.stage}</div>
            <div style={{ color: '#888', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{r.value}</div>
          </div>
        );
      })}
    </div>
  );
};

// ── Main scene ─────────────────────────────────────────────────────────────────
export const DC_S3_Reachr: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dark bg wipes in
  const darkOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Chaos windows exit (scatter off)
  // They enter early so they're visible, then exit by frame 30
  const chaosExitS = spring({ frame, fps, config: { damping: 12, stiffness: 160, mass: 1 } });
  const chaosOp = interpolate(frame, [0, 20], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "Meet" fade in
  const meetOp = interpolate(frame, [22, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "Reachr" spring drop
  const reachrS = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 100, mass: 1 } });
  const reachrY = interpolate(reachrS, [0, 1], [-80, 0]);
  const reachrOp = interpolate(frame, [30, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Green underline sweep
  const underlineW = interpolate(frame, [48, 68], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Dashboard slides up
  const dashS = spring({ frame: Math.max(0, frame - 72), fps, config: { damping: 16, stiffness: 90, mass: 1.1 } });
  const dashY = interpolate(dashS, [0, 1], [120, 0]);
  const dashOp = interpolate(frame, [72, 86], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Green glow pulse
  const glowOp = interpolate(frame, [55, 75], [0, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Caption
  const capOp = interpolate(frame, [100, 116], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#E8E6DE', overflow: 'hidden' }}>
      {/* Chaos residue: fading windows */}
      {chaosOp > 0.01 && (
        <div style={{ position: 'absolute', inset: 0, opacity: chaosOp }}>
          <FakeMenuBar appName="Finder" />
          <FakeWindow frame={0} fps={fps} title="Leads_Q1_FINAL.xlsx" width={280} x={70} y={130} rotation={-1.5} zIndex={2}>
            <div style={{ height: 80, background: '#fff', padding: 10, fontSize: 11, color: '#aaa' }}>…</div>
          </FakeWindow>
          <FakeWindow frame={0} fps={fps} title="Mail" width={260} x={400} y={180} rotation={1.2} zIndex={2}>
            <div style={{ height: 80, background: '#fff', padding: 10, fontSize: 11, color: '#aaa' }}>…</div>
          </FakeWindow>
        </div>
      )}

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: R_COLORS.dark, opacity: darkOp, pointerEvents: 'none' }} />

      {/* Green radial glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: `radial-gradient(ellipse, ${R_COLORS.green}44 0%, transparent 70%)`, opacity: glowOp, pointerEvents: 'none' }} />

      {/* Wordmark area */}
      <div style={{ position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center', opacity: darkOp }}>
        {/* "Meet" */}
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 22, fontWeight: 300, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', opacity: meetOp, marginBottom: 4 }}>
          Meet
        </div>

        {/* "Reachr" */}
        <div style={{ transform: `translateY(${reachrY}px)`, opacity: reachrOp }}>
          <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 86, fontWeight: 700, color: R_COLORS.green, letterSpacing: '-2px', lineHeight: 1 }}>
            Reachr
          </div>
          {/* Underline */}
          <div style={{ height: 5, background: R_COLORS.green, borderRadius: 3, width: `${underlineW}%`, margin: '6px auto 0', boxShadow: `0 0 20px ${R_COLORS.green}88`, transition: 'none' }} />
        </div>

        <div style={{ marginTop: 14, fontFamily: 'system-ui, sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.4)', opacity: reachrOp }}>
          CRM for norske selgere
        </div>
      </div>

      {/* Dashboard preview window */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 40, right: 40,
          opacity: dashOp,
          transform: `translateY(${dashY}px)`,
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 40px ${R_COLORS.green}22`,
          border: `1px solid ${R_COLORS.green}33`,
        }}
      >
        {/* Minimal title bar */}
        <div style={{ height: 34, background: '#1e1e1e', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 7, borderBottom: '1px solid #333' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
          <div style={{ flex: 1, textAlign: 'center', fontFamily: 'system-ui, sans-serif', fontSize: 12, fontWeight: 600, color: R_COLORS.green, paddingRight: 30 }}>
            reachr.no — Leads
          </div>
        </div>
        <DashboardPreview frame={Math.max(0, frame - 72)} fps={fps} />
      </div>

      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 44, right: 44,
          background: 'rgba(9,254,148,0.12)',
          borderRadius: 10,
          padding: '10px 16px',
          textAlign: 'center',
          opacity: capOp,
          fontFamily: 'system-ui, sans-serif',
          fontSize: 22,
          fontWeight: 600,
          color: R_COLORS.green,
          lineHeight: 1.3,
          zIndex: 30,
        }}
      >
        Alt på ett sted. Alltid oversikt.
      </div>
    </AbsoluteFill>
  );
};
