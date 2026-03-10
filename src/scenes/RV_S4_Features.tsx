// Scene 4 — Features (210f = 7s, 3 × 70f)
// Lead search → Pipeline + reminders → AI email generation

import { AbsoluteFill, interpolate, spring, useCurrentFrame } from 'remotion';
import { R_COLORS } from '../constants/reachr';

// ── Shared Caption ────────────────────────────────────────────────────────────
const Caption: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => (
  <div style={{ position: 'absolute', bottom: 72, left: 44, right: 44, background: 'rgba(23,23,23,0.68)', borderRadius: 14, padding: '14px 20px', textAlign: 'center', opacity, fontFamily: 'system-ui, sans-serif', fontSize: 29, fontWeight: 600, color: 'white', lineHeight: 1.4 }}>
    {text}
  </div>
);

// ── Feature label at top ──────────────────────────────────────────────────────
const FeatureLabel: React.FC<{ icon: string; label: string; opacity: number }> = ({ icon, label, opacity }) => (
  <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center', opacity }}>
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'white', borderRadius: 50, padding: '10px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: `1.5px solid ${R_COLORS.green}` }}>
      <span style={{ fontSize: 24 }}>{icon}</span>
      <span style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 20, color: R_COLORS.dark }}>{label}</span>
    </div>
  </div>
);

// ── FEATURE A: Lead Search ─────────────────────────────────────────────────────
const FeatureA: React.FC<{ f: number }> = ({ f }) => {
  const containerIn = spring({ frame: f, fps: 30, config: { damping: 16, stiffness: 80 } });
  const containerY  = interpolate(containerIn, [0, 1], [50, 0]);
  const containerOp = interpolate(f, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  const query = 'rørlegger Oslo';
  const typed = Math.round(interpolate(f, [12, 40], [0, query.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const blink = f < 40 && f % 18 < 9;

  const r1 = spring({ frame: Math.max(0, f - 43), fps: 30, config: { damping: 14, stiffness: 100 } });
  const r2 = spring({ frame: Math.max(0, f - 50), fps: 30, config: { damping: 14, stiffness: 100 } });
  const r3 = spring({ frame: Math.max(0, f - 57), fps: 30, config: { damping: 14, stiffness: 100 } });

  const results = [
    { name: 'Olsen Rørlegger AS', sub: 'Oslo • 8.2M omsetning',       badge: '★ Match', r: r1 },
    { name: 'VVS Ekspert Oslo',   sub: 'Oslo • 14.1M omsetning',      badge: '★ Match', r: r2 },
    { name: 'Nordvik Rør & Co',   sub: 'Oslo • 5.7M omsetning',       badge: '★ Match', r: r3 },
  ];

  const labelOp = interpolate(f, [5, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOp = interpolate(f, [45, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige }}>
      <FeatureLabel icon="🔍" label="Finn kunder i Norge" opacity={labelOp} />

      <div style={{ position: 'absolute', top: 230, left: 44, right: 44, transform: `translateY(${containerY}px)`, opacity: containerOp }}>
        {/* "250 000+ bedrifter" headline */}
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 46, fontWeight: 700, color: R_COLORS.dark, lineHeight: 1.15 }}>
            250 000+ norske{'\n'}bedrifter.
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontStyle: 'italic', color: R_COLORS.muted, marginTop: 10 }}>
            Data fra Brønnøysundregistrene.
          </div>
        </div>

        {/* Search bar */}
        <div style={{ background: 'white', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.09)', padding: '16px 20px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12, border: `2px solid ${R_COLORS.green}` }}>
          <span style={{ fontSize: 24 }}>🔍</span>
          <span style={{ fontFamily: 'system-ui', fontSize: 24, color: R_COLORS.dark, fontWeight: 500, flex: 1, minHeight: 28 }}>
            {query.slice(0, typed)}
            {blink && <span style={{ borderRight: `2.5px solid ${R_COLORS.dark}`, marginLeft: 1 }} />}
          </span>
          <div style={{ background: R_COLORS.green, borderRadius: 10, padding: '6px 14px', fontFamily: 'system-ui', fontWeight: 700, fontSize: 14, color: R_COLORS.dark }}>Søk</div>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.map((res, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, transform: `translateX(${interpolate(res.r, [0, 1], [-44, 0])}px)`, opacity: res.r, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: R_COLORS.beige, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🏢</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 18, color: R_COLORS.dark }}>{res.name}</div>
                <div style={{ fontFamily: 'system-ui', fontSize: 13, color: '#aaa' }}>{res.sub}</div>
              </div>
              <div style={{ background: `${R_COLORS.green}22`, border: `1.5px solid ${R_COLORS.green}`, borderRadius: 8, padding: '4px 10px', fontFamily: 'system-ui', fontWeight: 700, fontSize: 13, color: R_COLORS.dark }}>
                {res.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VO: "Finn kunder. Organiser leads. Følg opp automatisk." */}
      <Caption text="Finn kunder. Organiser leads." opacity={captionOp} />
    </AbsoluteFill>
  );
};

// ── FEATURE B: Pipeline + reminders ──────────────────────────────────────────
const FeatureB: React.FC<{ f: number }> = ({ f }) => {
  const containerIn = spring({ frame: f, fps: 30, config: { damping: 16, stiffness: 80 } });
  const containerOp = interpolate(f, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const containerY  = interpolate(containerIn, [0, 1], [50, 0]);

  // Card drag animation 0→3 columns
  const cardProgress = interpolate(f, [18, 56], [0, 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const colW = 222; const gap = 10;
  const cardX = cardProgress * (colW + gap);

  // Reminder badge appears at f=50
  const reminderS = spring({ frame: Math.max(0, f - 50), fps: 30, config: { damping: 9, stiffness: 260 } });

  const labelOp   = interpolate(f, [5, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOp = interpolate(f, [45, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cols = ['Nye', 'Kontaktet', 'Møte booket', 'Kunde ✓'];

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige }}>
      <FeatureLabel icon="📋" label="Hold styr på alle leads" opacity={labelOp} />

      <div style={{ position: 'absolute', top: 240, left: 44, right: 44, transform: `translateY(${containerY}px)`, opacity: containerOp }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 46, fontWeight: 700, color: R_COLORS.dark, lineHeight: 1.15 }}>
            Pipeline som{'\n'}faktisk fungerer.
          </div>
        </div>

        {/* Kanban board */}
        <div style={{ display: 'flex', gap: gap, position: 'relative' }}>
          {cols.map((col, i) => (
            <div key={i} style={{ width: colW, background: i === 3 && cardProgress > 2.7 ? `${R_COLORS.green}14` : 'rgba(255,255,255,0.7)', borderRadius: 14, padding: '10px 8px', border: `1.5px solid ${i === 3 && cardProgress > 2.7 ? R_COLORS.green : 'rgba(0,0,0,0.08)'}` }}>
              <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 11, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, textAlign: 'center' }}>{col}</div>
              {[1, 2].map(j => (
                <div key={j} style={{ background: 'white', borderRadius: 8, padding: '8px 9px', marginBottom: 6, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', opacity: 0.4 }}>
                  <div style={{ height: 9, background: '#f0f0f0', borderRadius: 5, marginBottom: 4, width: '80%' }} />
                  <div style={{ height: 7, background: '#f5f5f5', borderRadius: 5, width: '55%' }} />
                </div>
              ))}
            </div>
          ))}

          {/* Animated card */}
          <div style={{ position: 'absolute', top: 38, left: cardX, width: colW - 16, background: 'white', borderRadius: 10, padding: '11px 12px', boxShadow: '0 6px 28px rgba(0,0,0,0.18)', border: `2px solid ${R_COLORS.green}`, zIndex: 10 }}>
            <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 14, color: R_COLORS.dark, marginBottom: 3 }}>Erik Johansen</div>
            <div style={{ fontFamily: 'system-ui', fontSize: 11, color: '#aaa', marginBottom: 7 }}>Nordvik AS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: R_COLORS.green }} />
              <div style={{ fontFamily: 'system-ui', fontSize: 10, color: R_COLORS.muted }}>Høy prioritet</div>
            </div>
            {/* Reminder badge */}
            <div style={{ position: 'absolute', top: -18, right: -10, background: '#f59e0b', color: 'white', borderRadius: 10, padding: '3px 10px', fontFamily: 'system-ui', fontWeight: 700, fontSize: 11, transform: `scale(${reminderS})`, transformOrigin: 'bottom right', whiteSpace: 'nowrap' }}>
              🔔 Følg opp i dag
            </div>
          </div>
        </div>
      </div>

      <Caption text="Automatiske oppfølgingspåminnelser." opacity={captionOp} />
    </AbsoluteFill>
  );
};

// ── FEATURE C: AI Email ────────────────────────────────────────────────────────
const FeatureC: React.FC<{ f: number }> = ({ f }) => {
  const containerIn = spring({ frame: f, fps: 30, config: { damping: 16, stiffness: 80 } });
  const containerOp = interpolate(f, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const containerY  = interpolate(containerIn, [0, 1], [50, 0]);

  const emailBody =
`Hei Erik,

Jeg ser at Nordvik AS er i vekstfasen,
og tror Reachr kan hjelpe dere å nå
de riktige kundene raskere.

Har du 15 min til en rask prat?

Med vennlig hilsen,
Lars`;

  const typed    = Math.round(interpolate(f, [16, 56], [0, emailBody.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const sendGlow = interpolate(f, [58, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const blink    = f < 58 && f % 18 < 9;

  const aiS = spring({ frame: Math.max(0, f - 8), fps: 30, config: { damping: 8, stiffness: 280 } });

  const labelOp   = interpolate(f, [5, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOp = interpolate(f, [45, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige }}>
      <FeatureLabel icon="✉️" label="AI-genererte e-poster" opacity={labelOp} />

      <div style={{ position: 'absolute', top: 230, left: 44, right: 44, transform: `translateY(${containerY}px)`, opacity: containerOp }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 44, fontWeight: 700, color: R_COLORS.dark, lineHeight: 1.2 }}>
            AI skriver{'\n'}e-posten for deg.
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.11)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ background: '#f7f7f7', padding: '11px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
            <div style={{ fontFamily: 'system-ui', fontSize: 13, color: '#999', marginLeft: 10 }}>Ny e-post</div>
          </div>
          {/* To / Subject */}
          {[['Til:', 'erik@nordvik.no'], ['Emne:', 'Raskere vekst for Nordvik AS?']].map(([label, val], i) => (
            <div key={i} style={{ padding: '9px 14px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontFamily: 'system-ui', fontSize: 13, color: '#bbb', width: 44 }}>{label}</span>
              <span style={{ fontFamily: 'system-ui', fontSize: 14, color: R_COLORS.dark }}>{val}</span>
            </div>
          ))}
          {/* AI badge */}
          <div style={{ padding: '8px 14px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: R_COLORS.green, borderRadius: 20, padding: '3px 11px', fontFamily: 'system-ui', fontWeight: 700, fontSize: 11, color: R_COLORS.dark, display: 'flex', alignItems: 'center', gap: 4, transform: `scale(${aiS})`, transformOrigin: 'left center' }}>
              ✦ AI generert
            </div>
            <span style={{ fontFamily: 'system-ui', fontSize: 11, color: '#bbb' }}>Personalisert for Erik</span>
          </div>
          {/* Body */}
          <div style={{ padding: '14px 16px', minHeight: 175 }}>
            <pre style={{ fontFamily: 'system-ui, sans-serif', fontSize: 15, lineHeight: 1.6, color: R_COLORS.dark, margin: 0, whiteSpace: 'pre-wrap' }}>
              {emailBody.slice(0, typed)}
              {blink && <span style={{ borderRight: `2px solid ${R_COLORS.dark}`, marginLeft: 1 }} />}
            </pre>
          </div>
          {/* Send button */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ background: R_COLORS.green, color: R_COLORS.dark, borderRadius: 12, padding: '9px 22px', fontFamily: 'system-ui', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 6, boxShadow: `0 0 ${28 * sendGlow}px ${R_COLORS.green}88`, transform: `scale(${1 + 0.04 * sendGlow})` }}>
              Send ✉️
            </div>
          </div>
        </div>
      </div>

      {/* VO: "Finn kunder. Organiser leads. Følg opp automatisk." */}
      <Caption text="Følg opp automatisk med AI." opacity={captionOp} />
    </AbsoluteFill>
  );
};

// ── Slide wipe helpers ────────────────────────────────────────────────────────
const slideOutLeft = (f: number, at: number) =>
  interpolate(f, [at, at + 10], [0, -1080], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const slideInRight = (f: number, at: number) =>
  interpolate(f, [at, at + 10], [1080, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

// ── Main scene ────────────────────────────────────────────────────────────────
export const RV_S4_Features: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {frame < 78 && (
        <AbsoluteFill style={{ transform: `translateX(${slideOutLeft(frame, 68)}px)` }}>
          <FeatureA f={frame} />
        </AbsoluteFill>
      )}
      {frame >= 68 && frame < 148 && (
        <AbsoluteFill style={{ transform: `translateX(${slideInRight(frame, 68) + slideOutLeft(frame, 138)}px)` }}>
          <FeatureB f={Math.max(0, frame - 70)} />
        </AbsoluteFill>
      )}
      {frame >= 138 && (
        <AbsoluteFill style={{ transform: `translateX(${slideInRight(frame, 138)}px)` }}>
          <FeatureC f={Math.max(0, frame - 140)} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
