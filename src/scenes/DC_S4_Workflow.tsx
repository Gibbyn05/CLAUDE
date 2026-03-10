// Scene 4 — Workflow Clarity (180f = 6s)
// 3 feature panels, each 60f, dark bg.
// Panel A: Lead search (type, results pop in)
// Panel B: Drag card to pipeline + reminder badge
// Panel C: AI email composer, send

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FakeWindow, FakeMenuBar } from '../components/FakeWindow';
import { FakeCursor, Waypoint, ClickFrame } from '../components/FakeCursor';
import { R_COLORS } from '../constants/reachr';

// ── Panel A: Lead search ───────────────────────────────────────────────────────
const PanelA: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const typed = Math.min(Math.floor(frame * 0.38), 12);
  const query = 'Maria Berge'.slice(0, typed);
  const showResults = frame > 22;

  const results = [
    { name: 'Maria Berge',    co: 'Berge Bygg AS',    tag: 'Ny lead',    color: '#3478f6' },
    { name: 'Maria Bakken',   co: 'Bakken Consult',   tag: 'Kontaktet',  color: '#f59e0b' },
    { name: 'Maria Nilsen',   co: 'Nilsen & Partners', tag: 'Venter',    color: '#a78bfa' },
  ];

  return (
    <div style={{ padding: '14px 16px', fontFamily: 'system-ui, sans-serif', background: '#141414', minHeight: 180 }}>
      {/* Search input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1e1e1e', borderRadius: 10, padding: '10px 14px', marginBottom: 12, border: `1.5px solid ${R_COLORS.green}55` }}>
        <div style={{ fontSize: 14, color: '#666' }}>🔍</div>
        <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#f0f0f0' }}>
          {query}
          {frame % 22 < 11 && typed < 12 ? <span style={{ background: R_COLORS.green, width: 2, height: 14, display: 'inline-block', marginLeft: 1, verticalAlign: 'middle' }} /> : null}
        </div>
      </div>

      {/* Results */}
      {showResults && results.map((r, i) => {
        const rS = spring({ frame: Math.max(0, frame - 24 - i * 6), fps, config: { damping: 16, stiffness: 140 } });
        const rOp = interpolate(rS, [0, 1], [0, 1]);
        const rX  = interpolate(rS, [0, 1], [20, 0]);
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: i === 0 ? '#1e1e1e' : 'transparent', marginBottom: 4, opacity: rOp, transform: `translateX(${rX}px)` }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: r.color + '22', border: `1.5px solid ${r.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.color, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{r.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#f0f0f0' : '#888' }}>{r.name}</div>
              <div style={{ fontSize: 10, color: '#555' }}>{r.co}</div>
            </div>
            <div style={{ padding: '2px 8px', background: r.color + '22', color: r.color, borderRadius: 5, fontSize: 10, fontWeight: 600 }}>{r.tag}</div>
          </div>
        );
      })}
    </div>
  );
};

// ── Panel B: Kanban drag ───────────────────────────────────────────────────────
const PanelB: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cols = [
    { label: 'Ny',       color: '#3478f6', cards: ['Maria B.', 'Per E.'] },
    { label: 'Kontaktet',color: '#f59e0b', cards: ['Kjell A.'] },
    { label: 'Demo',     color: R_COLORS.green, cards: [] },
    { label: 'Tilbud',   color: '#a78bfa', cards: ['Lene D.'] },
  ];

  // Card drag animation: Maria B. moves from col 0 to col 2
  const dragProgress = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dragging = frame >= 20 && frame < 55;

  // Reminder badge pops in
  const badgeS = spring({ frame: Math.max(0, frame - 56), fps, config: { damping: 10, stiffness: 200 } });
  const badgeOp = interpolate(frame, [56, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = interpolate(badgeS, [0, 1], [0.5, 1]);

  // Drag card position
  const dragX = interpolate(dragProgress, [0, 1], [22, 320]);
  const dragY = interpolate(dragProgress, [0, 0.5, 1], [54, 30, 54]);

  return (
    <div style={{ padding: '10px 8px', fontFamily: 'system-ui, sans-serif', background: '#141414', position: 'relative', minHeight: 160 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: col.color, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col.label}</div>
            <div style={{ background: '#1e1e1e', borderRadius: 6, minHeight: 60, padding: 4 }}>
              {col.cards.map((c, i) => (
                // Hide "Maria B." in col 0 when dragging
                (ci === 0 && c === 'Maria B.' && dragging) ? null : (
                  <div key={i} style={{ background: '#2a2a2a', borderRadius: 5, padding: '5px 7px', marginBottom: 3, fontSize: 10, color: '#ddd', border: '1px solid #333' }}>
                    {c}
                  </div>
                )
              ))}
              {/* Drop target highlight */}
              {ci === 2 && frame >= 45 && frame < 55 && (
                <div style={{ border: `1.5px dashed ${R_COLORS.green}88`, borderRadius: 5, height: 28, background: `${R_COLORS.green}11` }} />
              )}
              {/* Dropped card */}
              {ci === 2 && frame >= 55 && (
                <div style={{ background: `${R_COLORS.green}22`, borderRadius: 5, padding: '5px 7px', fontSize: 10, color: R_COLORS.green, border: `1px solid ${R_COLORS.green}55`, position: 'relative' }}>
                  Maria B.
                  {/* Reminder badge */}
                  {badgeOp > 0 && (
                    <div style={{ position: 'absolute', top: -8, right: -8, background: '#ef4444', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'white', fontWeight: 700, opacity: badgeOp, transform: `scale(${badgeScale})` }}>
                      !
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dragging card */}
      {dragging && (
        <div
          style={{
            position: 'absolute',
            left: dragX,
            top: dragY,
            background: '#2a2a2a',
            borderRadius: 5,
            padding: '5px 7px',
            fontSize: 10,
            color: '#ddd',
            border: `1.5px solid ${R_COLORS.green}88`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
            zIndex: 10,
            width: 60,
          }}
        >
          Maria B.
        </div>
      )}
    </div>
  );
};

// ── Panel C: AI email ──────────────────────────────────────────────────────────
const AI_EMAIL = 'Hei Maria,\n\nHåper du har det bra! Jeg ønsket å følge opp tilbudet vi sendte 18. januar.\n\nHar du hatt mulighet til å se på det?\n\nVennlig hilsen\nLars, Reachr';

const PanelC: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const typed = Math.min(Math.floor(frame * 2.1), AI_EMAIL.length);
  const text = AI_EMAIL.slice(0, typed);

  const sendAt = 48;
  const sendOp = interpolate(frame, [sendAt, sendAt + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sendS  = spring({ frame: Math.max(0, frame - sendAt), fps, config: { damping: 10, stiffness: 180 } });
  const sendScale = interpolate(sendS, [0, 1], [0.8, 1]);

  // "Sent!" confirmation
  const sentOp = interpolate(frame, [52, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ padding: '12px 14px', fontFamily: 'system-ui, sans-serif', background: '#141414', minHeight: 180 }}>
      {/* To field */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: '#555', fontWeight: 600, width: 24 }}>Til:</div>
        <div style={{ flex: 1, background: '#1e1e1e', borderRadius: 6, padding: '5px 10px', fontSize: 11, color: '#aaa' }}>maria@bergebygg.no</div>
        <div style={{ fontSize: 9, background: `${R_COLORS.green}22`, color: R_COLORS.green, padding: '3px 7px', borderRadius: 5, fontWeight: 700 }}>✨ AI</div>
      </div>
      {/* Body */}
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '10px 12px', minHeight: 90, fontSize: 11, color: '#ccc', lineHeight: 1.55, whiteSpace: 'pre-wrap', fontFamily: 'system-ui, sans-serif', marginBottom: 8 }}>
        {text}
        {typed < AI_EMAIL.length && frame % 16 < 8 ? <span style={{ background: R_COLORS.green, width: 1.5, height: 12, display: 'inline-block', verticalAlign: 'middle' }} /> : null}
      </div>
      {/* Send button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            background: R_COLORS.green,
            color: '#111',
            borderRadius: 8,
            padding: '8px 20px',
            fontSize: 12,
            fontWeight: 700,
            opacity: sendOp,
            transform: `scale(${sendScale})`,
            boxShadow: sendOp > 0.5 ? `0 0 20px ${R_COLORS.green}55` : 'none',
          }}
        >
          Send →
        </div>
        {sentOp > 0 && (
          <div style={{ fontSize: 11, color: R_COLORS.green, opacity: sentOp, fontWeight: 600 }}>✓ E-post sendt!</div>
        )}
      </div>
    </div>
  );
};

// ── Cursor waypoints (relative to local scene frame) ──────────────────────────
function buildWaypoints(panelStartFrames: number[]): Waypoint[] {
  const [a, b, c] = panelStartFrames;
  return [
    { x: 540, y: 540, t: 0 },
    { x: 300, y: 360, t: a + 8 },
    { x: 300, y: 360, t: a + 16 },
    { x: 300, y: 360, t: a + 50 },
    { x: 400, y: 500, t: b + 8 },
    { x: 310, y: 480, t: b + 22 },
    { x: 430, y: 460, t: b + 48 },
    { x: 430, y: 460, t: b + 54 },
    { x: 300, y: 400, t: c + 10 },
    { x: 300, y: 400, t: c + 46 },
    { x: 320, y: 540, t: c + 50 },
    { x: 320, y: 540, t: c + 56 },
  ];
}

// ── Main scene ─────────────────────────────────────────────────────────────────
export const DC_S4_Workflow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three 60f panels
  const PANEL = 60;
  const pA = 0, pB = PANEL, pC = PANEL * 2;

  const aLocal = Math.max(0, frame - pA);
  const bLocal = Math.max(0, frame - pB);
  const cLocal = Math.max(0, frame - pC);

  // Panel transitions: slide in/out
  const panelOp = (start: number, end: number) =>
    interpolate(frame, [start, start + 10, end - 6, end], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Feature label
  const labels = ['Finn leads raskt', 'Hold oversikt', 'Send perfekte e-poster'];
  const currentPanel = frame < pB ? 0 : frame < pC ? 1 : 2;
  const labelOp = interpolate(
    frame % PANEL,
    [0, 8, PANEL - 8, PANEL],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const waypoints = buildWaypoints([pA, pB, pC]);
  const clicks: ClickFrame[] = [
    { t: pA + 16 }, { t: pB + 54 }, { t: pC + 56 },
  ];

  return (
    <AbsoluteFill style={{ background: R_COLORS.dark, overflow: 'hidden' }}>
      {/* Subtle grid bg */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Feature label */}
      <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center', opacity: labelOp }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 13, fontWeight: 700, color: R_COLORS.green, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
          Feature {currentPanel + 1} / 3
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 38, fontWeight: 700, color: '#f8f5ec', letterSpacing: '-0.5px' }}>
          {labels[currentPanel]}
        </div>
      </div>

      {/* Panel A */}
      {frame < pB + 6 && (
        <div style={{ position: 'absolute', left: 40, right: 40, top: 240, borderRadius: 14, overflow: 'hidden', opacity: panelOp(pA, pB + 6), boxShadow: '0 24px 64px rgba(0,0,0,0.5)', border: '1px solid #333' }}>
          <div style={{ height: 32, background: '#1e1e1e', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 7, borderBottom: '1px solid #333' }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
            <div style={{ flex: 1, textAlign: 'center', fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#666', paddingRight: 24 }}>Reachr — Leads</div>
          </div>
          <PanelA frame={aLocal} fps={fps} />
        </div>
      )}

      {/* Panel B */}
      {frame >= pB - 6 && frame < pC + 6 && (
        <div style={{ position: 'absolute', left: 40, right: 40, top: 240, borderRadius: 14, overflow: 'hidden', opacity: panelOp(pB, pC + 6), boxShadow: '0 24px 64px rgba(0,0,0,0.5)', border: '1px solid #333' }}>
          <div style={{ height: 32, background: '#1e1e1e', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 7, borderBottom: '1px solid #333' }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
            <div style={{ flex: 1, textAlign: 'center', fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#666', paddingRight: 24 }}>Reachr — Pipeline</div>
          </div>
          <PanelB frame={bLocal} fps={fps} />
        </div>
      )}

      {/* Panel C */}
      {frame >= pC - 6 && (
        <div style={{ position: 'absolute', left: 40, right: 40, top: 240, borderRadius: 14, overflow: 'hidden', opacity: panelOp(pC, 181), boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 30px ${R_COLORS.green}22`, border: `1px solid ${R_COLORS.green}33` }}>
          <div style={{ height: 32, background: '#1e1e1e', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 7, borderBottom: `1px solid ${R_COLORS.green}33` }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
            <div style={{ flex: 1, textAlign: 'center', fontFamily: 'system-ui, sans-serif', fontSize: 11, color: R_COLORS.green, paddingRight: 24 }}>Reachr — AI E-post</div>
          </div>
          <PanelC frame={cLocal} fps={fps} />
        </div>
      )}

      {/* Caption */}
      <div style={{ position: 'absolute', bottom: 60, left: 44, right: 44, textAlign: 'center' }}>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 20, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
          Aldri mer tapte leads. Aldri mer kaos.
        </div>
      </div>

      <FakeCursor frame={frame} waypoints={waypoints} clicks={clicks} />
    </AbsoluteFill>
  );
};
