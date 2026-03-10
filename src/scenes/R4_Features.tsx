// Scene 4 — Features (330–599f, 9s)
// Three 3s feature demos: Lead Search → CRM Pipeline → AI Outreach.
// Slide-wipe (left→right) transitions between sub-scenes.

import { AbsoluteFill, interpolate, spring, useCurrentFrame } from 'remotion';
import { R_COLORS } from '../constants/reachr';

// ── Feature A: Lead Search (frames 0–89) ────────────────────────────────────
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
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 700, color: R_COLORS.dark, marginBottom: 8 }}>
          250 000+ norske bedrifter.
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontStyle: 'italic', color: R_COLORS.muted }}>
          Finn din neste kunde på sekunder.
        </div>
      </div>

      {/* Search bar */}
      <div
        style={{
          background: 'white',
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
          padding: '18px 24px',
          marginBottom: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          border: `2px solid ${R_COLORS.green}`,
        }}
      >
        <span style={{ fontSize: 26 }}>🔍</span>
        <span style={{ fontFamily: 'system-ui', fontSize: 26, color: R_COLORS.dark, fontWeight: 500, flex: 1 }}>
          {query.slice(0, typed)}
          {blink && <span style={{ borderRight: `2px solid ${R_COLORS.dark}`, marginLeft: 1 }} />}
        </span>
        <span style={{ fontFamily: 'system-ui', fontSize: 16, color: '#bbb', whiteSpace: 'nowrap' }}>250 382 resultater</span>
      </div>

      {/* Result cards */}
      {results.map((r, i) => (
        <div
          key={i}
          style={{
            background: 'white',
            borderRadius: 14,
            padding: '16px 22px',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            transform: `translateX(${interpolate(r.s, [0, 1], [-48, 0])}px)`,
            opacity: r.s,
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          }}
        >
          <div style={{ width: 42, height: 42, borderRadius: 10, background: R_COLORS.beige, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏢</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 20, color: R_COLORS.dark }}>{r.name}</div>
            <div style={{ fontFamily: 'system-ui', fontSize: 15, color: '#aaa' }}>Org: {r.org}</div>
          </div>
          <div
            style={{
              background: `${R_COLORS.green}22`,
              border: `1.5px solid ${R_COLORS.green}`,
              borderRadius: 10,
              padding: '5px 14px',
              fontFamily: 'system-ui',
              fontWeight: 700,
              fontSize: 17,
              color: R_COLORS.dark,
              whiteSpace: 'nowrap',
            }}
          >
            {r.rev} kr
          </div>
          <div style={{ fontSize: 20, color: R_COLORS.green, fontWeight: 700 }}>✓</div>
        </div>
      ))}
    </div>
  );
};

// ── Feature B: CRM Pipeline (frames 90–179) ──────────────────────────────────
const FeatureB: React.FC<{ f: number }> = ({ f }) => {
  const containerIn = spring({ frame: f, fps: 30, config: { damping: 16, stiffness: 80 } });
  const containerOpacity = interpolate(f, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const containerY = interpolate(containerIn, [0, 1], [60, 0]);

  const cardProgress = interpolate(f, [14, 74], [0, 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardCol = Math.min(Math.floor(cardProgress), 3);
  const cardFrac = cardProgress - Math.floor(Math.min(cardProgress, 3));

  const colW = 220;
  const gap = 16;
  const cardX = cardCol * (colW + gap) + cardFrac * (colW + gap);

  const atEnd = cardProgress >= 2.85;
  const confettiOpacity = interpolate(f, [74, 79, 86], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const columns = ['Ikke kontaktet', 'Kontaktet', 'Booket møte', 'Kunde'];

  return (
    <div style={{ opacity: containerOpacity, transform: `translateY(${containerY}px)` }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 700, color: R_COLORS.dark, marginBottom: 8 }}>
          Hold orden på alle leads.
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontStyle: 'italic', color: R_COLORS.muted }}>
          Pipeline som faktisk fungerer.
        </div>
      </div>

      <div style={{ display: 'flex', gap, position: 'relative' }}>
        {columns.map((col, i) => (
          <div
            key={i}
            style={{
              width: colW,
              background: i === 3 && atEnd ? `${R_COLORS.green}18` : 'rgba(255,255,255,0.75)',
              borderRadius: 16,
              padding: '14px 12px',
              border: `1.5px solid ${i === 3 && atEnd ? R_COLORS.green : 'rgba(0,0,0,0.08)'}`,
            }}
          >
            <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 13, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
              {col}
            </div>
            {[1, 2].map((j) => (
              <div key={j} style={{ background: 'white', borderRadius: 10, padding: '10px 12px', marginBottom: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', opacity: 0.45 }}>
                <div style={{ height: 11, background: '#f0f0f0', borderRadius: 6, marginBottom: 5, width: '80%' }} />
                <div style={{ height: 9, background: '#f5f5f5', borderRadius: 6, width: '50%' }} />
              </div>
            ))}
          </div>
        ))}

        {/* Animated card */}
        <div
          style={{
            position: 'absolute',
            top: 46,
            left: cardX,
            width: colW - 24,
            background: 'white',
            borderRadius: 12,
            padding: '14px 15px',
            boxShadow: '0 6px 28px rgba(0,0,0,0.18)',
            border: `2px solid ${R_COLORS.green}`,
            zIndex: 10,
          }}
        >
          <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 17, color: R_COLORS.dark, marginBottom: 4 }}>Erik Johansen</div>
          <div style={{ fontFamily: 'system-ui', fontSize: 13, color: '#aaa', marginBottom: 8 }}>Nordvik AS</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: R_COLORS.green }} />
            <div style={{ fontFamily: 'system-ui', fontSize: 12, color: R_COLORS.muted }}>Høy prioritet</div>
          </div>
        </div>

        {/* Green confetti on landing */}
        {f > 73 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 3 * (colW + gap),
              width: colW,
              height: '100%',
              opacity: confettiOpacity,
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 10 + (i * 18) % 90,
                  left: (i * 22) % colW,
                  width: 7,
                  height: 7,
                  background: i % 3 === 0 ? R_COLORS.green : i % 3 === 1 ? R_COLORS.dark : '#ffd700',
                  borderRadius: i % 2 === 0 ? '50%' : 2,
                  transform: `rotate(${i * 36}deg)`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Feature C: AI Outreach (frames 180–269) ──────────────────────────────────
const FeatureC: React.FC<{ f: number }> = ({ f }) => {
  const containerIn = spring({ frame: f, fps: 30, config: { damping: 16, stiffness: 80 } });
  const containerOpacity = interpolate(f, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const containerY = interpolate(containerIn, [0, 1], [60, 0]);

  const sparkleScale = spring({ frame: Math.max(0, f - 10), fps: 30, config: { damping: 8, stiffness: 280 } });

  const emailBody = `Hei Erik,

Jeg ser at Nordvik AS er i vekstfasen, og tror
Reachr kan hjelpe dere å finne de riktige
kundene raskere.

Har du 15 minutter til en rask prat?

Med vennlig hilsen,
Lars`;

  const typed = Math.round(
    interpolate(f, [18, 62], [0, emailBody.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
  );

  const sendGlow = interpolate(f, [66, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const blink = f < 66 && f % 20 < 10;

  return (
    <div style={{ opacity: containerOpacity, transform: `translateY(${containerY}px)` }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 700, color: R_COLORS.dark }}>
          AI skriver e-posten for deg.
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.11)', overflow: 'hidden', maxWidth: 720, margin: '0 auto' }}>
        {/* Window chrome */}
        <div style={{ background: '#f7f7f7', padding: '12px 18px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <div style={{ fontFamily: 'system-ui', fontSize: 15, color: '#999', marginLeft: 14 }}>Ny e-post</div>
        </div>
        {/* To */}
        <div style={{ padding: '12px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: 'system-ui', fontSize: 15, color: '#bbb', width: 52 }}>Til:</span>
          <span style={{ fontFamily: 'system-ui', fontSize: 15, color: R_COLORS.dark }}>erik@nordvik.no</span>
        </div>
        {/* Subject */}
        <div style={{ padding: '12px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: 'system-ui', fontSize: 15, color: '#bbb', width: 52 }}>Emne:</span>
          <span style={{ fontFamily: 'system-ui', fontSize: 15, color: R_COLORS.dark }}>Raskere vekst for Nordvik AS?</span>
        </div>
        {/* AI badge */}
        <div style={{ padding: '10px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              background: R_COLORS.green,
              borderRadius: 20,
              padding: '5px 14px',
              fontFamily: 'system-ui',
              fontWeight: 700,
              fontSize: 13,
              color: R_COLORS.dark,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transform: `scale(${sparkleScale})`,
              transformOrigin: 'left center',
            }}
          >
            ✦ AI generert
          </div>
          <span style={{ fontFamily: 'system-ui', fontSize: 13, color: '#bbb' }}>Personalisert for Erik Johansen</span>
        </div>
        {/* Body */}
        <div style={{ padding: '18px 22px', minHeight: 180 }}>
          <pre style={{ fontFamily: 'system-ui, sans-serif', fontSize: 16, lineHeight: 1.65, color: R_COLORS.dark, margin: 0, whiteSpace: 'pre-wrap' }}>
            {emailBody.slice(0, typed)}
            {blink && <span style={{ borderRight: `2px solid ${R_COLORS.dark}`, marginLeft: 1 }} />}
          </pre>
        </div>
        {/* Send */}
        <div style={{ padding: '14px 22px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end' }}>
          <div
            style={{
              background: R_COLORS.green,
              color: R_COLORS.dark,
              borderRadius: 12,
              padding: '11px 30px',
              fontFamily: 'system-ui',
              fontWeight: 700,
              fontSize: 17,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: `0 0 ${32 * sendGlow}px ${R_COLORS.green}88`,
              transform: `scale(${1 + 0.04 * sendGlow})`,
            }}
          >
            Send ✉️
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Helpers for slide-wipe positions ─────────────────────────────────────────
const getAX = (frame: number) => {
  if (frame < 85) return 0;
  if (frame < 95) return interpolate(frame, [85, 95], [0, -1920]);
  return -1920;
};
const getBX = (frame: number) => {
  if (frame < 88) return 1920;
  if (frame < 98) return interpolate(frame, [88, 98], [1920, 0]);
  if (frame < 175) return 0;
  if (frame < 185) return interpolate(frame, [175, 185], [0, -1920]);
  return -1920;
};
const getCX = (frame: number) => {
  if (frame < 178) return 1920;
  if (frame < 188) return interpolate(frame, [178, 188], [1920, 0]);
  return 0;
};

// ── Main export ──────────────────────────────────────────────────────────────
export const R4_Features: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, overflow: 'hidden' }}>
      {/* Feature A */}
      {frame < 98 && (
        <AbsoluteFill style={{ padding: '56px 120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: `translateX(${getAX(frame)}px)` }}>
          <FeatureA f={Math.max(0, frame)} />
        </AbsoluteFill>
      )}

      {/* Feature B */}
      {frame >= 88 && frame < 188 && (
        <AbsoluteFill style={{ padding: '56px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: `translateX(${getBX(frame)}px)` }}>
          <FeatureB f={Math.max(0, frame - 90)} />
        </AbsoluteFill>
      )}

      {/* Feature C */}
      {frame >= 178 && (
        <AbsoluteFill style={{ padding: '56px 120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: `translateX(${getCX(frame)}px)` }}>
          <FeatureC f={Math.max(0, frame - 180)} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
