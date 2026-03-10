// Scene 2 — Pain (120–209f, 3s)
// Three quick cuts: forgotten lead, ignored notification, lost deal stamp.

import { AbsoluteFill, interpolate, spring, useCurrentFrame } from 'remotion';
import { R_COLORS } from '../constants/reachr';

// ── Cut A: Lead card fades to grey ──────────────────────────────────────────
const CutA: React.FC<{ f: number }> = ({ f }) => {
  const slideIn = spring({ frame: f, fps: 30, config: { damping: 14, stiffness: 100 } });
  const grey = interpolate(f, [8, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const strikeW = interpolate(f, [15, 28], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const staleOpacity = interpolate(f, [18, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tx = interpolate(slideIn, [0, 1], [-420, 0]);

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `translateX(${tx}px)`, position: 'relative' }}>
        <div
          style={{
            width: 480,
            background: 'white',
            borderRadius: 20,
            padding: '32px 36px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            border: '2px solid rgba(0,0,0,0.07)',
            filter: `grayscale(${grey * 100}%)`,
            opacity: interpolate(grey, [0, 1], [1, 0.55]),
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#e8e4d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              👤
            </div>
            <div>
              <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 26, color: R_COLORS.dark }}>Erik Johansen</div>
              <div style={{ fontFamily: 'system-ui', fontSize: 18, color: '#aaa' }}>Nordvik AS</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span style={{ background: '#f0f0f0', borderRadius: 8, padding: '6px 14px', fontFamily: 'system-ui', fontSize: 16, color: '#888' }}>Ikke kontaktet</span>
            <span style={{ background: '#f0f0f0', borderRadius: 8, padding: '6px 14px', fontFamily: 'system-ui', fontSize: 16, color: '#888' }}>Beslutningsklar</span>
          </div>
          {/* Red strikethrough */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 36,
              height: 3,
              width: `${strikeW}%`,
              background: R_COLORS.red,
              borderRadius: 2,
            }}
          />
        </div>
        {/* Glemt stamp */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            right: -24,
            background: '#888',
            color: 'white',
            borderRadius: 10,
            padding: '6px 18px',
            fontFamily: 'system-ui',
            fontWeight: 700,
            fontSize: 22,
            transform: 'rotate(8deg)',
            opacity: staleOpacity,
          }}
        >
          glemt
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          fontSize: 64,
          fontWeight: 700,
          color: R_COLORS.dark,
          opacity: interpolate(f, [5, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        Glemte leads.
      </div>
    </AbsoluteFill>
  );
};

// ── Cut B: Calendar notification bounces off ─────────────────────────────────
const CutB: React.FC<{ f: number }> = ({ f }) => {
  const slideIn = spring({ frame: f, fps: 30, config: { damping: 14, stiffness: 100 } });
  const bounceOff = spring({ frame: Math.max(0, f - 14), fps: 30, config: { damping: 8, stiffness: 200, mass: 0.5 } });
  const tx = interpolate(slideIn, [0, 1], [420, 0]);
  const notifY = interpolate(bounceOff, [0, 1], [0, -440]);
  const notifOpacity = interpolate(f, [14, 24], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `translateX(${tx}px)`, position: 'relative' }}>
        <div style={{ width: 440, background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
          <div style={{ background: R_COLORS.dark, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>📅</span>
            <span style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 22, color: 'white' }}>Kalender</span>
          </div>
          <div style={{ padding: 24 }}>
            {['Oppfølging: Erik J.', 'Demo: Haugen AS', 'Møte: Petra Berg'].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 0',
                  borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none',
                  fontFamily: 'system-ui',
                  fontSize: 20,
                  color: i === 0 ? '#ccc' : R_COLORS.dark,
                  textDecoration: i === 0 ? 'line-through' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === 0 ? '#ccc' : R_COLORS.green }} />
                {item}
              </div>
            ))}
          </div>
        </div>
        {/* Badge bouncing away */}
        <div
          style={{
            position: 'absolute',
            top: -30,
            right: -30,
            background: R_COLORS.red,
            color: 'white',
            borderRadius: '50%',
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui',
            fontWeight: 800,
            fontSize: 26,
            transform: `translateY(${notifY}px) rotate(${notifY * -0.3}deg)`,
            opacity: notifOpacity,
            boxShadow: '0 4px 16px rgba(230,57,70,0.4)',
          }}
        >
          3
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          fontSize: 64,
          fontWeight: 700,
          color: R_COLORS.dark,
          opacity: interpolate(f, [5, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        Manglende oppfølging.
      </div>
    </AbsoluteFill>
  );
};

// ── Cut C: Pipeline with TAPT stamp ─────────────────────────────────────────
const CutC: React.FC<{ f: number }> = ({ f }) => {
  const slideIn = spring({ frame: f, fps: 30, config: { damping: 14, stiffness: 100 } });
  const stampScale = spring({ frame: Math.max(0, f - 12), fps: 30, config: { damping: 6, stiffness: 400, mass: 0.6 } });
  const tx = interpolate(slideIn, [0, 1], [-420, 0]);

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `translateX(${tx}px)`, position: 'relative' }}>
        <div style={{ background: 'white', borderRadius: 20, padding: 28, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', width: 600 }}>
          <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 14, color: '#aaa', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Pipeline
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Lead', color: '#e8e4d4', count: '3' },
              { label: 'Kontaktet', color: '#ddf0e8', count: '5' },
              { label: 'Møte booket', color: '#d0eaff', count: '2' },
              { label: 'Avsluttet', color: '#ffe0e0', count: '8' },
            ].map((col, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ background: col.color, borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'system-ui', fontSize: 13, color: '#666', marginBottom: 4 }}>{col.label}</div>
                  <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 28, color: i === 3 ? R_COLORS.red : R_COLORS.dark }}>{col.count}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: '12px 16px', background: '#fff5f5', borderRadius: 10, border: '1px solid #ffd0d0', fontFamily: 'system-ui', fontSize: 17, color: R_COLORS.red, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>📉</span>
            <span>8 deals gikk tapt denne måneden</span>
          </div>
        </div>

        {/* TAPT stamp */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${stampScale}) rotate(-14deg)`,
            border: `6px solid ${R_COLORS.red}`,
            color: R_COLORS.red,
            borderRadius: 12,
            padding: '10px 28px',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 64,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            opacity: 0.88,
            pointerEvents: 'none',
          }}
        >
          TAPT
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'Georgia, serif',
          fontSize: 64,
          fontWeight: 700,
          color: R_COLORS.dark,
          opacity: interpolate(f, [5, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        Tapte salg.
      </div>
    </AbsoluteFill>
  );
};

// ── Main export ──────────────────────────────────────────────────────────────
export const R2_Pain: React.FC = () => {
  const frame = useCurrentFrame();
  const cut = Math.floor(frame / 30);
  const localFrame = frame % 30;

  return (
    <>
      {cut === 0 && <CutA f={localFrame} />}
      {cut === 1 && <CutB f={localFrame} />}
      {cut >= 2 && <CutC f={localFrame} />}
    </>
  );
};
