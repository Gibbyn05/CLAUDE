// Scene 2 Vertical — Pain (3s, 3×30f)
// Same logic as R2_Pain, portrait-adapted bottom positions.

import { AbsoluteFill, interpolate, spring, useCurrentFrame } from 'remotion';
import { R_COLORS } from '../constants/reachr';

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
            width: 820,
            background: 'white',
            borderRadius: 24,
            padding: '36px 40px',
            boxShadow: '0 8px 36px rgba(0,0,0,0.10)',
            border: '2px solid rgba(0,0,0,0.07)',
            filter: `grayscale(${grey * 100}%)`,
            opacity: interpolate(grey, [0, 1], [1, 0.55]),
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#e8e4d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>
              👤
            </div>
            <div>
              <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 32, color: R_COLORS.dark }}>Erik Johansen</div>
              <div style={{ fontFamily: 'system-ui', fontSize: 22, color: '#aaa' }}>Nordvik AS</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ background: '#f0f0f0', borderRadius: 10, padding: '8px 18px', fontFamily: 'system-ui', fontSize: 20, color: '#888' }}>Ikke kontaktet</span>
            <span style={{ background: '#f0f0f0', borderRadius: 10, padding: '8px 18px', fontFamily: 'system-ui', fontSize: 20, color: '#888' }}>Beslutningsklar</span>
          </div>
          <div style={{ position: 'absolute', top: '50%', left: 40, height: 3, width: `${strikeW}%`, background: R_COLORS.red, borderRadius: 2 }} />
        </div>
        <div style={{ position: 'absolute', top: -22, right: -26, background: '#888', color: 'white', borderRadius: 10, padding: '6px 20px', fontFamily: 'system-ui', fontWeight: 700, fontSize: 24, transform: 'rotate(8deg)', opacity: staleOpacity }}>
          glemt
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 220, left: 0, right: 0, textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: 56, fontWeight: 700, color: R_COLORS.dark, opacity: interpolate(f, [5, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        Glemte leads.
      </div>
    </AbsoluteFill>
  );
};

const CutB: React.FC<{ f: number }> = ({ f }) => {
  const slideIn = spring({ frame: f, fps: 30, config: { damping: 14, stiffness: 100 } });
  const bounceOff = spring({ frame: Math.max(0, f - 14), fps: 30, config: { damping: 8, stiffness: 200, mass: 0.5 } });
  const tx = interpolate(slideIn, [0, 1], [420, 0]);
  const notifY = interpolate(bounceOff, [0, 1], [0, -480]);
  const notifOpacity = interpolate(f, [14, 24], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `translateX(${tx}px)`, position: 'relative' }}>
        <div style={{ width: 760, background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 36px rgba(0,0,0,0.10)' }}>
          <div style={{ background: R_COLORS.dark, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 32 }}>📅</span>
            <span style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 26, color: 'white' }}>Kalender</span>
          </div>
          <div style={{ padding: 28 }}>
            {['Oppfølging: Erik J.', 'Demo: Haugen AS', 'Møte: Petra Berg'].map((item, i) => (
              <div key={i} style={{ padding: '18px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none', fontFamily: 'system-ui', fontSize: 24, color: i === 0 ? '#ccc' : R_COLORS.dark, textDecoration: i === 0 ? 'line-through' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: i === 0 ? '#ccc' : R_COLORS.green }} />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', top: -32, right: -32, background: R_COLORS.red, color: 'white', borderRadius: '50%', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', fontWeight: 800, fontSize: 30, transform: `translateY(${notifY}px) rotate(${notifY * -0.3}deg)`, opacity: notifOpacity, boxShadow: '0 4px 16px rgba(230,57,70,0.4)' }}>
          3
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 220, left: 0, right: 0, textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: 56, fontWeight: 700, color: R_COLORS.dark, opacity: interpolate(f, [5, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        Manglende oppfølging.
      </div>
    </AbsoluteFill>
  );
};

const CutC: React.FC<{ f: number }> = ({ f }) => {
  const slideIn = spring({ frame: f, fps: 30, config: { damping: 14, stiffness: 100 } });
  const stampScale = spring({ frame: Math.max(0, f - 12), fps: 30, config: { damping: 6, stiffness: 400, mass: 0.6 } });
  const tx = interpolate(slideIn, [0, 1], [-420, 0]);

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `translateX(${tx}px)`, position: 'relative' }}>
        <div style={{ background: 'white', borderRadius: 24, padding: 32, boxShadow: '0 8px 36px rgba(0,0,0,0.10)', width: 840 }}>
          <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 16, color: '#aaa', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pipeline</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Lead', color: '#e8e4d4', count: '3' },
              { label: 'Kontaktet', color: '#ddf0e8', count: '5' },
              { label: 'Møte', color: '#d0eaff', count: '2' },
              { label: 'Avsluttet', color: '#ffe0e0', count: '8' },
            ].map((col, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ background: col.color, borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'system-ui', fontSize: 14, color: '#666', marginBottom: 4 }}>{col.label}</div>
                  <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 32, color: i === 3 ? R_COLORS.red : R_COLORS.dark }}>{col.count}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, padding: '14px 18px', background: '#fff5f5', borderRadius: 12, border: '1px solid #ffd0d0', fontFamily: 'system-ui', fontSize: 20, color: R_COLORS.red, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span>📉</span>
            <span>8 deals gikk tapt denne måneden</span>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: `translate(-50%, -50%) scale(${stampScale}) rotate(-14deg)`, border: `6px solid ${R_COLORS.red}`, color: R_COLORS.red, borderRadius: 14, padding: '10px 28px', fontFamily: 'system-ui, sans-serif', fontWeight: 900, fontSize: 72, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.88, pointerEvents: 'none' }}>
          TAPT
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 220, left: 0, right: 0, textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: 56, fontWeight: 700, color: R_COLORS.dark, opacity: interpolate(f, [5, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        Tapte salg.
      </div>
    </AbsoluteFill>
  );
};

export const R2_Pain_V: React.FC = () => {
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
