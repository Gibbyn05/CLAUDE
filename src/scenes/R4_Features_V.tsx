// Scene 4 Vertical — Features (9s, 270f)
// Portrait 1080×1920. Compact layouts with adjusted column widths.

import { AbsoluteFill, interpolate, spring, useCurrentFrame } from 'remotion';
import { R_COLORS } from '../constants/reachr';

// ── Feature A: Lead Search ───────────────────────────────────────────────────
const FeatureA: React.FC<{ f: number }> = ({ f }) => {
  const containerIn = spring({ frame: f, fps: 30, config: { damping: 16, stiffness: 80 } });
  const containerY = interpolate(containerIn, [0, 1], [60, 0]);
  const containerOpacity = interpolate(f, [0, 14], [0, 1], { extrapolateRight: 'clamp' });

  const query = 'rørlegger Oslo';
  const typed = Math.round(interpolate(f, [14, 44], [0, query.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const r1 = spring({ frame: Math.max(0, f - 45), fps: 30, config: { damping: 14, stiffness: 100 } });
  const r2 = spring({ frame: Math.max(0, f - 52), fps: 30, config: { damping: 14, stiffness: 100 } });
  const r3 = spring({ frame: Math.max(0, f - 59), fps: 30, config: { damping: 14, stiffness: 100 } });

  const results = [
    { name: 'Olsen Rørlegger AS', org: '912 345 678', rev: '8.2M', s: r1 },
    { name: 'VVS Ekspert Oslo', org: '923 456 789', rev: '14.1M', s: r2 },
    { name: 'Nordvik Rør & Ventil', org: '934 567 890', rev: '5.7M', s: r3 },
  ];

  const blink = f % 20 < 10 && typed < query.length;

  return (
    <div style={{ transform: `translateY(${containerY}px)`, opacity: containerOpacity }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 44, fontWeight: 700, color: R_COLORS.dark, marginBottom: 10, lineHeight: 1.2 }}>
          250 000+ norske bedrifter.
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontStyle: 'italic', color: R_COLORS.muted }}>
          Finn din neste kunde på sekunder.
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.09)', padding: '18px 22px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14, border: `2px solid ${R_COLORS.green}` }}>
        <span style={{ fontSize: 26 }}>🔍</span>
        <span style={{ fontFamily: 'system-ui', fontSize: 26, color: R_COLORS.dark, fontWeight: 500, flex: 1 }}>
          {query.slice(0, typed)}
          {blink && <span style={{ borderRight: `2px solid ${R_COLORS.dark}`, marginLeft: 1 }} />}
        </span>
      </div>

      {results.map((r, i) => (
        <div key={i} style={{ background: 'white', borderRadius: 14, padding: '16px 20px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 16, transform: `translateX(${interpolate(r.s, [0, 1], [-48, 0])}px)`, opacity: r.s, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: R_COLORS.beige, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏢</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 20, color: R_COLORS.dark }}>{r.name}</div>
            <div style={{ fontFamily: 'system-ui', fontSize: 14, color: '#aaa' }}>Org: {r.org}</div>
          </div>
          <div style={{ background: `${R_COLORS.green}22`, border: `1.5px solid ${R_COLORS.green}`, borderRadius: 10, padding: '5px 13px', fontFamily: 'system-ui', fontWeight: 700, fontSize: 16, color: R_COLORS.dark, whiteSpace: 'nowrap' }}>
            {r.rev} kr
          </div>
          <div style={{ fontSize: 18, color: R_COLORS.green, fontWeight: 700 }}>✓</div>
        </div>
      ))}
    </div>
  );
};

// ── Feature B: CRM Pipeline ──────────────────────────────────────────────────
const FeatureB: React.FC<{ f: number }> = ({ f }) => {
  const containerIn = spring({ frame: f, fps: 30, config: { damping: 16, stiffness: 80 } });
  const containerOpacity = interpolate(f, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const containerY = interpolate(containerIn, [0, 1], [60, 0]);

  const cardProgress = interpolate(f, [14, 74], [0, 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardCol = Math.min(Math.floor(cardProgress), 3);
  const cardFrac = cardProgress - Math.floor(Math.min(cardProgress, 3));

  const colW = 218;
  const gap = 12;
  const cardX = cardCol * (colW + gap) + cardFrac * (colW + gap);

  const atEnd = cardProgress >= 2.85;
  const confettiOpacity = interpolate(f, [74, 79, 86], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const columns = ['Ikke kontaktet', 'Kontaktet', 'Booket møte', 'Kunde'];

  return (
    <div style={{ opacity: containerOpacity, transform: `translateY(${containerY}px)` }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 44, fontWeight: 700, color: R_COLORS.dark, marginBottom: 10, lineHeight: 1.2 }}>
          Hold orden på alle leads.
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontStyle: 'italic', color: R_COLORS.muted }}>
          Pipeline som faktisk fungerer.
        </div>
      </div>

      <div style={{ display: 'flex', gap, position: 'relative' }}>
        {columns.map((col, i) => (
          <div key={i} style={{ width: colW, background: i === 3 && atEnd ? `${R_COLORS.green}18` : 'rgba(255,255,255,0.75)', borderRadius: 14, padding: '12px 10px', border: `1.5px solid ${i === 3 && atEnd ? R_COLORS.green : 'rgba(0,0,0,0.08)'}` }}>
            <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 12, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{col}</div>
            {[1, 2].map((j) => (
              <div key={j} style={{ background: 'white', borderRadius: 8, padding: '8px 10px', marginBottom: 6, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', opacity: 0.45 }}>
                <div style={{ height: 9, background: '#f0f0f0', borderRadius: 5, marginBottom: 4, width: '80%' }} />
                <div style={{ height: 7, background: '#f5f5f5', borderRadius: 5, width: '50%' }} />
              </div>
            ))}
          </div>
        ))}

        {/* Animated card */}
        <div style={{ position: 'absolute', top: 44, left: cardX, width: colW - 20, background: 'white', borderRadius: 10, padding: '12px 13px', boxShadow: '0 6px 28px rgba(0,0,0,0.18)', border: `2px solid ${R_COLORS.green}`, zIndex: 10 }}>
          <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 15, color: R_COLORS.dark, marginBottom: 3 }}>Erik Johansen</div>
          <div style={{ fontFamily: 'system-ui', fontSize: 12, color: '#aaa', marginBottom: 7 }}>Nordvik AS</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: R_COLORS.green }} />
            <div style={{ fontFamily: 'system-ui', fontSize: 11, color: R_COLORS.muted }}>Høy prioritet</div>
          </div>
        </div>

        {/* Confetti */}
        {f > 73 && (
          <div style={{ position: 'absolute', top: 0, left: 3 * (colW + gap), width: colW, height: '100%', opacity: confettiOpacity, pointerEvents: 'none', overflow: 'hidden' }}>
            {[...Array(10)].map((_, i) => (
              <div key={i} style={{ position: 'absolute', top: 8 + (i * 16) % 80, left: (i * 20) % colW, width: 6, height: 6, background: i % 3 === 0 ? R_COLORS.green : i % 3 === 1 ? R_COLORS.dark : '#ffd700', borderRadius: i % 2 === 0 ? '50%' : 2, transform: `rotate(${i * 36}deg)` }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Feature C: AI Outreach ───────────────────────────────────────────────────
const FeatureC: React.FC<{ f: number }> = ({ f }) => {
  const containerIn = spring({ frame: f, fps: 30, config: { damping: 16, stiffness: 80 } });
  const containerOpacity = interpolate(f, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const containerY = interpolate(containerIn, [0, 1], [60, 0]);

  const sparkleScale = spring({ frame: Math.max(0, f - 10), fps: 30, config: { damping: 8, stiffness: 280 } });

  const emailBody = `Hei Erik,

Jeg ser at Nordvik AS er i vekstfasen,
og tror Reachr kan hjelpe dere å finne
de riktige kundene raskere.

Har du 15 minutter til en rask prat?

Med vennlig hilsen,
Lars`;

  const typed = Math.round(interpolate(f, [18, 62], [0, emailBody.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const sendGlow = interpolate(f, [66, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const blink = f < 66 && f % 20 < 10;

  return (
    <div style={{ opacity: containerOpacity, transform: `translateY(${containerY}px)` }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 44, fontWeight: 700, color: R_COLORS.dark }}>
          AI skriver e-posten for deg.
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.11)', overflow: 'hidden' }}>
        <div style={{ background: '#f7f7f7', padding: '12px 18px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <div style={{ fontFamily: 'system-ui', fontSize: 15, color: '#999', marginLeft: 12 }}>Ny e-post</div>
        </div>
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: 'system-ui', fontSize: 14, color: '#bbb', width: 46 }}>Til:</span>
          <span style={{ fontFamily: 'system-ui', fontSize: 15, color: R_COLORS.dark }}>erik@nordvik.no</span>
        </div>
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: 'system-ui', fontSize: 14, color: '#bbb', width: 46 }}>Emne:</span>
          <span style={{ fontFamily: 'system-ui', fontSize: 15, color: R_COLORS.dark }}>Raskere vekst for Nordvik AS?</span>
        </div>
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: R_COLORS.green, borderRadius: 20, padding: '4px 12px', fontFamily: 'system-ui', fontWeight: 700, fontSize: 12, color: R_COLORS.dark, display: 'flex', alignItems: 'center', gap: 4, transform: `scale(${sparkleScale})`, transformOrigin: 'left center' }}>
            ✦ AI generert
          </div>
          <span style={{ fontFamily: 'system-ui', fontSize: 12, color: '#bbb' }}>Personalisert for Erik Johansen</span>
        </div>
        <div style={{ padding: '16px 20px', minHeight: 200 }}>
          <pre style={{ fontFamily: 'system-ui, sans-serif', fontSize: 16, lineHeight: 1.65, color: R_COLORS.dark, margin: 0, whiteSpace: 'pre-wrap' }}>
            {emailBody.slice(0, typed)}
            {blink && <span style={{ borderRight: `2px solid ${R_COLORS.dark}`, marginLeft: 1 }} />}
          </pre>
        </div>
        <div style={{ padding: '14px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: R_COLORS.green, color: R_COLORS.dark, borderRadius: 12, padding: '10px 26px', fontFamily: 'system-ui', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, boxShadow: `0 0 ${32 * sendGlow}px ${R_COLORS.green}88`, transform: `scale(${1 + 0.04 * sendGlow})` }}>
            Send ✉️
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Slide-wipe helpers ───────────────────────────────────────────────────────
const getAX = (f: number) => {
  if (f < 85) return 0;
  if (f < 95) return interpolate(f, [85, 95], [0, -1080]);
  return -1080;
};
const getBX = (f: number) => {
  if (f < 88) return 1080;
  if (f < 98) return interpolate(f, [88, 98], [1080, 0]);
  if (f < 175) return 0;
  if (f < 185) return interpolate(f, [175, 185], [0, -1080]);
  return -1080;
};
const getCX = (f: number) => {
  if (f < 178) return 1080;
  if (f < 188) return interpolate(f, [178, 188], [1080, 0]);
  return 0;
};

// ── Main export ──────────────────────────────────────────────────────────────
export const R4_Features_V: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, overflow: 'hidden' }}>
      {frame < 98 && (
        <AbsoluteFill style={{ padding: '80px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: `translateX(${getAX(frame)}px)` }}>
          <FeatureA f={Math.max(0, frame)} />
        </AbsoluteFill>
      )}
      {frame >= 88 && frame < 188 && (
        <AbsoluteFill style={{ padding: '80px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: `translateX(${getBX(frame)}px)` }}>
          <FeatureB f={Math.max(0, frame - 90)} />
        </AbsoluteFill>
      )}
      {frame >= 178 && (
        <AbsoluteFill style={{ padding: '80px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: `translateX(${getCX(frame)}px)` }}>
          <FeatureC f={Math.max(0, frame - 180)} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
