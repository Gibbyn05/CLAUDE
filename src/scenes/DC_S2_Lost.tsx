// Scene 2 — Lost Lead (120f = 4s)
// Story: Browser → Notes → Calendar → Email buried.
// One lead (Maria Berge) slips through. Red X stamp.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FakeWindow, FakeMenuBar } from '../components/FakeWindow';
import { FakeCursor, Waypoint, ClickFrame } from '../components/FakeCursor';

// ── Lead profile card ──────────────────────────────────────────────────────────
const LeadProfile: React.FC = () => (
  <div style={{ padding: '14px 16px', fontFamily: 'system-ui, sans-serif' }}>
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#6eb5ff,#3478f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>M</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>Maria Berge</div>
        <div style={{ fontSize: 11, color: '#888' }}>CEO, Berge Bygg AS</div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 11, color: '#555' }}>
      <div><span style={{ fontWeight: 600 }}>Sist kontakt:</span> 18. jan</div>
      <div><span style={{ fontWeight: 600 }}>Status:</span> <span style={{ color: '#f59e0b' }}>Venter</span></div>
      <div><span style={{ fontWeight: 600 }}>Verdi:</span> ~85.000 kr</div>
      <div><span style={{ fontWeight: 600 }}>Kilde:</span> Messe</div>
    </div>
    <div style={{ marginTop: 10, padding: '8px 10px', background: '#fff3cd', borderRadius: 6, fontSize: 11, color: '#856404', border: '1px solid #ffc107' }}>
      ⚠ Ingen oppfølging siden første kontakt
    </div>
  </div>
);

// ── Email thread (buried) ──────────────────────────────────────────────────────
const BuriedEmail: React.FC<{ highlight: boolean }> = ({ highlight }) => (
  <div style={{ padding: '8px 10px', fontFamily: 'system-ui, sans-serif', fontSize: 11 }}>
    <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 12, color: '#333' }}>Innboks (47 ulest)</div>
    {[
      { from: 'Newsletter',    subj: 'Din ukentlige SaaS-oppdatering',   unread: false, match: false },
      { from: 'HR',            subj: 'Husk: Ferieskjema innen fredag',   unread: true,  match: false },
      { from: 'Maria Berge',   subj: 'Re: Oppfølging fra messen i jan.', unread: true,  match: true  },
      { from: 'Bank',          subj: 'Kontoutskrift februar 2026',       unread: false, match: false },
      { from: 'LinkedIn',      subj: '5 nye profiler sett på deg i dag', unread: false, match: false },
      { from: 'Supplier',      subj: 'Ny prisliste Q2 2026',             unread: true,  match: false },
    ].map((m, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          gap: 8,
          padding: '4px 6px',
          borderRadius: 4,
          borderBottom: '1px solid #f4f4f4',
          background: m.match && highlight ? 'rgba(255,59,48,0.08)' : 'transparent',
          alignItems: 'center',
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.unread ? '#3478f6' : 'transparent', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: m.unread ? 700 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: m.match ? '#e53' : '#222' }}>{m.from}</div>
          <div style={{ color: '#888', fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.subj}</div>
        </div>
      </div>
    ))}
  </div>
);

// ── Cursor waypoints ───────────────────────────────────────────────────────────
const WAYPOINTS: Waypoint[] = [
  { x: 540, y: 540, t: 0 },
  { x: 300, y: 300, t: 15 },   // hover lead profile
  { x: 300, y: 300, t: 22 },
  { x: 620, y: 420, t: 40 },   // move to email
  { x: 620, y: 420, t: 48 },
  { x: 620, y: 500, t: 62 },   // scroll down to buried email
  { x: 620, y: 500, t: 70 },
  { x: 300, y: 300, t: 90 },   // back to lead, helpless
  { x: 300, y: 300, t: 120 },
];
const CLICKS: ClickFrame[] = [{ t: 22 }, { t: 48 }];

// ── Main scene ─────────────────────────────────────────────────────────────────
export const DC_S2_Lost: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Red X stamp
  const stampAt = 88;
  const stampS  = spring({ frame: Math.max(0, frame - stampAt), fps, config: { damping: 10, stiffness: 200, mass: 0.8 } });
  const stampOp = interpolate(frame, [stampAt, stampAt + 4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stampScale = interpolate(stampS, [0, 1], [2.2, 1]);

  // Caption
  const capOp = interpolate(frame, [94, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Email highlight on after cursor arrives
  const emailHighlight = frame >= 62;

  return (
    <AbsoluteFill style={{ background: '#E8E6DE', overflow: 'hidden' }}>
      <FakeMenuBar appName="Mail" />

      {/* Lead profile window */}
      <FakeWindow frame={frame} fps={fps} title="Maria Berge — CRM" width={310} x={80} y={120} enterAt={0} zIndex={3}>
        <LeadProfile />
      </FakeWindow>

      {/* Email window */}
      <FakeWindow frame={frame} fps={fps} title="Mail — Innboks" width={300} x={440} y={160} enterAt={10} zIndex={2}>
        <BuriedEmail highlight={emailHighlight} />
      </FakeWindow>

      {/* Red X stamp over lead profile */}
      {stampOp > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: 80 + 30,
            top:  120 + 60,
            width: 250,
            height: 250,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: stampOp,
            transform: `scale(${stampScale}) rotate(-12deg)`,
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              border: '10px solid rgba(220,50,40,0.85)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(220,50,40,0.06)',
            }}
          >
            <div style={{ fontFamily: 'system-ui', fontWeight: 900, fontSize: 88, color: 'rgba(220,50,40,0.82)', lineHeight: 1, marginTop: -6 }}>✕</div>
          </div>
        </div>
      )}

      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 72,
          left: 44, right: 44,
          background: 'rgba(0,0,0,0.75)',
          borderRadius: 14,
          padding: '14px 20px',
          textAlign: 'center',
          opacity: capOp,
          fontFamily: 'system-ui, sans-serif',
          fontSize: 28,
          fontWeight: 600,
          color: 'white',
          lineHeight: 1.4,
          zIndex: 30,
        }}
      >
        En lead til — glemt og tapt.
      </div>

      <FakeCursor frame={frame} waypoints={WAYPOINTS} clicks={CLICKS} />
    </AbsoluteFill>
  );
};
