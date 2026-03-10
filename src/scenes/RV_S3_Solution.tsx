// Scene 3 — Solution (180f = 6s)
// "Meet Reachr" — dark premium reveal + clean dashboard mockup slides up.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

const Caption: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => (
  <div style={{ position: 'absolute', bottom: 72, left: 44, right: 44, background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '14px 20px', textAlign: 'center', opacity, fontFamily: 'system-ui, sans-serif', fontSize: 29, fontWeight: 600, color: 'white', lineHeight: 1.4 }}>
    {text}
  </div>
);

// ── Dashboard mockup that slides up ──────────────────────────────────────────
const DashboardMockup: React.FC<{ frame: number }> = ({ frame }) => {
  // Stat card inner animation
  const statP = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stats = [
    { label: 'Leads i dag',   value: Math.round(statP * 47),   icon: '🔍', color: R_COLORS.green },
    { label: 'Pipeline-verdi', value: `${(statP * 2.4).toFixed(1)}M`,  icon: '📈', color: '#60a5fa' },
    { label: 'Aktive følgere', value: Math.round(statP * 12),   icon: '🔔', color: '#f59e0b' },
  ];

  return (
    <div
      style={{
        background: '#1a1a1a',
        borderRadius: '24px 24px 0 0',
        padding: '28px 26px 0',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Titlebar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        <div style={{ flex: 1, height: 22, background: '#2a2a2a', borderRadius: 6, marginLeft: 8 }} />
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: 1, background: '#242424', borderRadius: 16, padding: '14px 12px', border: `1px solid #333` }}>
            <div style={{ fontFamily: 'system-ui', fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: 'system-ui', fontWeight: 800, fontSize: 22, color: s.color, fontVariantNumeric: 'tabular-nums' }}>
              {s.value}
            </div>
            <div style={{ fontFamily: 'system-ui', fontSize: 11, color: '#666', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mini lead list */}
      <div style={{ background: '#242424', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #2e2e2e', fontFamily: 'system-ui', fontSize: 12, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          Siste leads
        </div>
        {[
          { name: 'Erik Johansen', co: 'Nordvik AS', badge: 'Kontakt nå', bg: `${R_COLORS.green}22`, col: R_COLORS.green },
          { name: 'Sara Larsen',   co: 'Viken Rør',  badge: 'Booket møte', bg: '#1e3a5f',             col: '#60a5fa' },
          { name: 'Lars Berg',     co: 'Bergström',  badge: 'AI-e-post',   bg: '#3a1e5f',             col: '#c084fc' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderBottom: '1px solid #2a2a2a', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2e2e2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'system-ui', fontWeight: 600, fontSize: 15, color: '#e8e8e8' }}>{r.name}</div>
              <div style={{ fontFamily: 'system-ui', fontSize: 12, color: '#555' }}>{r.co}</div>
            </div>
            <div style={{ background: r.bg, borderRadius: 8, padding: '4px 10px', fontFamily: 'system-ui', fontWeight: 600, fontSize: 12, color: r.col, whiteSpace: 'nowrap' }}>
              {r.badge}
            </div>
          </div>
        ))}
        {/* Bottom padding buffer so it bleeds off screen */}
        <div style={{ height: 80, background: '#242424' }} />
      </div>
    </div>
  );
};

// ── Main scene ────────────────────────────────────────────────────────────────
export const RV_S3_Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash in from white (transition from S2)
  const flashOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "Meet" — thin, muted
  const meetOpacity = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const meetY       = interpolate(frame, [8, 28], [12, 0],  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // "Reachr" — bold, drops with spring
  const reachrSpring = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 14, stiffness: 90 } });
  const reachrY = interpolate(reachrSpring, [0, 1], [-80, 0]);

  // Green underline draws across
  const underlineW = interpolate(frame, [60, 82], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const underlinePulse = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 6, stiffness: 350, mass: 0.3 } });
  const underlineScale = interpolate(underlinePulse, [0, 1], [1.3, 1]);

  // Tagline
  const tagOpacity = interpolate(frame, [88, 106], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagY       = interpolate(frame, [88, 106], [14, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Dashboard slides up
  const dashSpring = spring({ frame: Math.max(0, frame - 108), fps, config: { damping: 18, stiffness: 75 } });
  const dashY = interpolate(dashSpring, [0, 1], [620, 0]);
  const dashOpacity = interpolate(frame, [108, 124], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Caption
  const captionOpacity = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: R_COLORS.dark, overflow: 'hidden', opacity: flashOpacity }}>

      {/* "Meet" */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 0, right: 0,
          textAlign: 'center',
          opacity: meetOpacity,
          transform: `translateY(${meetY}px)`,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 32,
          fontWeight: 300,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        Meet
      </div>

      {/* "Reachr" */}
      <div
        style={{
          position: 'absolute',
          top: 290,
          left: 0, right: 0,
          textAlign: 'center',
          transform: `translateY(${reachrY}px)`,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 104,
          fontWeight: 700,
          color: '#f8f5ec',
          letterSpacing: '-2.5px',
          lineHeight: 1,
        }}
      >
        Reachr
        <span style={{ color: R_COLORS.green, fontSize: 18, verticalAlign: 'top', marginLeft: 2, lineHeight: '1.2' }}>●</span>
      </div>

      {/* Green underline */}
      <div
        style={{
          position: 'absolute',
          top: 412,
          left: '50%',
          transform: `translateX(-50%) scaleX(${underlineScale})`,
          transformOrigin: 'left',
          width: `${underlineW * 4.4}px`,  // ~440px when full
          height: 5,
          background: R_COLORS.green,
          borderRadius: 3,
          boxShadow: `0 0 22px ${R_COLORS.green}99`,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          position: 'absolute',
          top: 450,
          left: 0, right: 0,
          textAlign: 'center',
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          fontFamily: 'Georgia, serif',
          fontSize: 34,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.50)',
          letterSpacing: '0.01em',
        }}
      >
        Reachr organiserer hele salgsprosessen.
      </div>

      {/* Dashboard mockup */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0, right: 0,
          transform: `translateY(${dashY}px)`,
          opacity: dashOpacity,
        }}
      >
        <DashboardMockup frame={Math.max(0, frame - 110)} />
      </div>

      {/* VO: "Reachr organiserer hele salgsprosessen." */}
      <Caption text="Reachr organiserer hele salgsprosessen." opacity={captionOpacity} />
    </AbsoluteFill>
  );
};
