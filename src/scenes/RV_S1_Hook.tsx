// Scene 1 — Hook (150f = 5s)
// "Slik ser salg ut uten et system"
// Chaotic workspace: floating doc cards around the stressed sales rep.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';
import { SalesRep } from './R1_Hook';

// ── Voiceover caption pill ───────────────────────────────────────────────────
const Caption: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 72,
      left: 44,
      right: 44,
      background: 'rgba(23,23,23,0.72)',
      borderRadius: 14,
      padding: '14px 20px',
      textAlign: 'center',
      opacity,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: 29,
      fontWeight: 600,
      color: 'white',
      lineHeight: 1.4,
    }}
  >
    {text}
  </div>
);

// ── Floating card wrapper with spring entrance + gentle float ────────────────
const FloatCard: React.FC<{
  frame: number; fps: number; delay: number;
  x: number; y: number; rotation: number;
  children: React.ReactNode;
}> = ({ frame, fps, delay, x, y, rotation, children }) => {
  const f = Math.max(0, frame - delay);
  const enter = spring({ frame: f, fps, config: { damping: 12, stiffness: 65, mass: 1.1 } });
  const fy = f > 18 ? Math.sin((f - 18) * 0.052 + delay) * 8 : 0;
  const fr = f > 18 ? Math.sin((f - 18) * 0.036 + delay * 0.5) * 1.4 : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${enter}) rotate(${rotation + fr}deg) translateY(${fy}px)`,
        opacity: Math.min(1, enter * 1.8),
      }}
    >
      {children}
    </div>
  );
};

// ── Chaos card designs ────────────────────────────────────────────────────────
const StickyNote: React.FC<{ lines: string[] }> = ({ lines }) => (
  <div
    style={{
      background: '#fef08a',
      width: 220,
      padding: '16px 18px 22px',
      fontFamily: 'system-ui, sans-serif',
      fontSize: 18,
      color: '#4a4a2a',
      fontWeight: 600,
      lineHeight: 1.5,
      boxShadow: '3px 5px 18px rgba(0,0,0,0.16)',
      clipPath: 'polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%)',
    }}
  >
    {lines.map((l, i) => <div key={i}>{l}</div>)}
  </div>
);

const SheetCard: React.FC = () => (
  <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', width: 272, boxShadow: '3px 5px 18px rgba(0,0,0,0.13)', border: '1.5px solid #e8e4d4' }}>
    <div style={{ background: '#188038', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 15 }}>📊</span>
      <span style={{ fontFamily: 'system-ui', fontSize: 12, color: 'white', fontWeight: 600 }}>Leads_2024.xlsx</span>
    </div>
    {[
      { name: 'Erik Johansen', st: '?', bad: false },
      { name: 'Sara Larsen', st: 'Glemt', bad: true },
      { name: 'Lars Berg', st: '???', bad: false },
    ].map((r, i) => (
      <div key={i} style={{ display: 'flex', padding: '6px 10px', background: r.bad ? '#fff5f5' : 'white', borderBottom: '1px solid #f5f5f5', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, background: '#f0f0f0', flexShrink: 0 }} />
        <div style={{ fontFamily: 'system-ui', fontSize: 12, color: '#333', flex: 1 }}>{r.name}</div>
        <div style={{ fontFamily: 'system-ui', fontSize: 11, color: r.bad ? '#c00' : '#aaa' }}>{r.st}</div>
      </div>
    ))}
  </div>
);

const EmailCard: React.FC = () => (
  <div style={{ background: 'white', borderRadius: 14, padding: '13px 15px', width: 256, boxShadow: '3px 5px 18px rgba(0,0,0,0.13)', border: '1.5px solid #e8e4d4' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#4285f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'white', flexShrink: 0 }}>✉</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'system-ui', fontSize: 12, fontWeight: 700, color: '#333' }}>3 uleste e-poster</div>
        <div style={{ fontFamily: 'system-ui', fontSize: 10, color: '#999' }}>Siste: 3 dager siden</div>
      </div>
      <div style={{ background: '#c00', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>3</div>
    </div>
    <div style={{ fontFamily: 'system-ui', fontSize: 12, color: '#555' }}>RE: Oppfølging – Erik J.</div>
    <div style={{ fontFamily: 'system-ui', fontSize: 11, color: '#bbb', marginTop: 2 }}>Hei, jeg lurer på om dere h...</div>
  </div>
);

const CalendarCard: React.FC = () => (
  <div style={{ background: 'white', borderRadius: 14, padding: '12px 15px', width: 248, boxShadow: '3px 5px 18px rgba(0,0,0,0.13)', border: '1.5px solid #fecdd3' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
      <span style={{ fontSize: 20 }}>📅</span>
      <div>
        <div style={{ fontFamily: 'system-ui', fontSize: 12, fontWeight: 700, color: '#333' }}>Demo – Haugen AS</div>
        <div style={{ fontFamily: 'system-ui', fontSize: 10, color: '#e00' }}>Mandag 09:00</div>
      </div>
    </div>
    <div style={{ background: '#fff0f0', borderRadius: 8, padding: '4px 10px', fontFamily: 'system-ui', fontSize: 11, color: '#c00', fontWeight: 600 }}>⚠ 3 dager forsinket — ikke fulgt opp</div>
  </div>
);

const NotifCard: React.FC = () => (
  <div style={{ background: '#1c1c1e', borderRadius: 16, padding: '11px 14px', width: 264, boxShadow: '3px 5px 20px rgba(0,0,0,0.28)', display: 'flex', gap: 10, alignItems: 'center' }}>
    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#2c2c2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>📱</div>
    <div>
      <div style={{ fontFamily: 'system-ui', fontSize: 13, fontWeight: 600, color: 'white' }}>12 uleste varslinger</div>
      <div style={{ fontFamily: 'system-ui', fontSize: 10, color: '#777' }}>Fra i går — ikke åpnet</div>
    </div>
  </div>
);

const TodoCard: React.FC = () => (
  <div style={{ background: 'white', borderRadius: 14, padding: '13px 16px', width: 238, boxShadow: '3px 5px 18px rgba(0,0,0,0.13)', border: '1.5px solid #e8e4d4' }}>
    <div style={{ fontFamily: 'system-ui', fontSize: 10, fontWeight: 700, color: '#bbb', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Huskeliste</div>
    {['Ring Peter Hansen', 'Send tilbud – Sara', 'Oppdater CRM...'].map((item, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
        <div style={{ width: 13, height: 13, borderRadius: 3, border: '2px solid #ddd', flexShrink: 0 }} />
        <div style={{ fontFamily: 'system-ui', fontSize: 12, color: '#555', textDecoration: i === 2 ? 'line-through' : 'none', opacity: i === 2 ? 0.4 : 1 }}>{item}</div>
      </div>
    ))}
  </div>
);

// ── Main scene ────────────────────────────────────────────────────────────────
export const RV_S1_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [58, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOpacity  = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const chaos = [
    { C: StickyNote,  props: { lines: ['Ring Erik', 'tilbake!! 🚨'] }, x: 46,  y: 108,  rot: -13, delay: 0  },
    { C: SheetCard,   props: {},                                         x: 668, y: 88,   rot: 9,   delay: 7  },
    { C: EmailCard,   props: {},                                         x: 32,  y: 328,  rot: -6,  delay: 14 },
    { C: CalendarCard,props: {},                                         x: 694, y: 298,  rot: 13,  delay: 4  },
    { C: NotifCard,   props: {},                                         x: 56,  y: 860,  rot: -8,  delay: 21 },
    { C: TodoCard,    props: {},                                         x: 698, y: 830,  rot: 8,   delay: 25 },
  ];

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, overflow: 'hidden' }}>
      {/* Chaos cards */}
      {chaos.map(({ C, props, x, y, rot, delay }, i) => (
        <FloatCard key={i} frame={frame} fps={fps} delay={delay} x={x} y={y} rotation={rot}>
          {/* @ts-ignore */}
          <C {...props} />
        </FloatCard>
      ))}

      {/* Stressed sales rep — center at ~36% down */}
      <div style={{ position: 'absolute', left: '50%', top: '38%', transform: 'translate(-50%, -50%)' }}>
        <SalesRep frame={frame} fps={fps} scale={1.7} />
      </div>

      {/* Main headline */}
      <div
        style={{
          position: 'absolute',
          bottom: 340,
          left: 0,
          right: 0,
          padding: '0 52px',
          textAlign: 'center',
          opacity: headlineOpacity,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 58,
          fontWeight: 700,
          color: R_COLORS.dark,
          letterSpacing: '-0.5px',
          lineHeight: 1.2,
        }}
      >
        Slik ser salg ut{'\n'}uten et system.
      </div>

      {/* Voiceover caption */}
      {/* VO: "Føles salgsarbeid mer kaotisk enn det burde?" */}
      <Caption text="Føles salgsarbeid mer kaotisk enn det burde?" opacity={captionOpacity} />
    </AbsoluteFill>
  );
};
