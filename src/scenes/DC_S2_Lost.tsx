// Scene 2 — Lost Lead (120f = 4s)
// Story: Browser finds company → name copied to Notes → email draft left unfinished →
//         inbox buries the lead. Red X stamp. Caption: "Leads blir borte i kaoset"

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FakeWindow, FakeMenuBar } from '../components/FakeWindow';
import { FakeCursor, Waypoint, ClickFrame } from '../components/FakeCursor';

// ── Browser — company found in Brreg ──────────────────────────────────────────
const BrowserFound: React.FC = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif' }}>
    <div style={{ display: 'flex', background: '#dee1e6', borderBottom: '1px solid #ccc', overflow: 'hidden' }}>
      {['brreg.no — Søk', 'Proff.no', 'LinkedIn'].map((tab, i) => (
        <div key={i} style={{ padding: '5px 9px', background: i === 0 ? 'white' : '#dee1e6', borderRight: '1px solid #ccc', fontSize: 9, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#111' : '#777', whiteSpace: 'nowrap' }}>
          {tab}
        </div>
      ))}
    </div>
    <div style={{ padding: '4px 8px', background: '#f5f5f5', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ background: 'white', borderRadius: 10, padding: '3px 8px', fontSize: 9, color: '#555', border: '1px solid #ddd' }}>🔒 brreg.no/enhetsregisteret/</div>
    </div>
    <div style={{ padding: '10px 12px' }}>
      <div style={{ fontSize: 9, color: '#888', marginBottom: 3 }}>Brønnøysundregistrene</div>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: '#111' }}>Solberg &amp; Co AS</div>
      <div style={{ fontSize: 10, color: '#555', marginBottom: 2 }}>Org.nr: 924 112 334 | Aktiv</div>
      <div style={{ fontSize: 10, color: '#555', marginBottom: 5 }}>Bransje: Konsulentvirksomhet | 42 ansatte</div>
      <div style={{ background: '#d1fae5', border: '1px solid #34d399', borderRadius: 5, padding: '5px 7px', fontSize: 10, color: '#065f46', fontWeight: 600 }}>
        ✓ Potensiell B2B-kunde — kontakt@solberg.no
      </div>
    </div>
  </div>
);

// ── Notes — lead scribbled down ────────────────────────────────────────────────
const NotesScribbled: React.FC<{ showEntry: boolean }> = ({ showEntry }) => (
  <div style={{ padding: '10px 12px', fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#333', background: '#fefce8', minHeight: 130 }}>
    <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Nye leads å ta tak i</div>
    <div style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>— Bjørnstad Holding (ring mandag)</div>
    <div style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>— NordTech AS (venter på svar)</div>
    {showEntry && (
      <div style={{ fontSize: 11, color: '#111', fontWeight: 600, background: '#fde68a', padding: '3px 6px', borderRadius: 4, marginBottom: 6 }}>
        — Solberg &amp; Co AS ← ny! følg opp?
      </div>
    )}
    <div style={{ fontSize: 11, color: '#aaa', textDecoration: 'line-through' }}>— Berge Bygg (glemte å ringe)</div>
  </div>
);

// ── Email draft — left unfinished ─────────────────────────────────────────────
const EmailDraft: React.FC = () => (
  <div style={{ padding: '10px 12px', fontFamily: 'system-ui, sans-serif', fontSize: 11 }}>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, borderBottom: '1px solid #eee', paddingBottom: 6 }}>
      <span style={{ color: '#888', fontWeight: 600, fontSize: 10, width: 32 }}>Til:</span>
      <span style={{ color: '#555' }}>kontakt@solberg.no</span>
    </div>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, borderBottom: '1px solid #eee', paddingBottom: 6 }}>
      <span style={{ color: '#888', fontWeight: 600, fontSize: 10, width: 32 }}>Emne:</span>
      <span style={{ color: '#555' }}>Hei, vi har noe som kan</span>
      <span style={{ background: '#ccc', width: 1.5, height: 12, display: 'inline-block', verticalAlign: 'middle', marginLeft: 2 }} />
    </div>
    <div style={{ color: '#ccc', fontSize: 11, fontStyle: 'italic', marginTop: 6 }}>(Kladd — ikke sendt)</div>
    <div style={{ marginTop: 8, padding: '5px 0', color: '#e59', fontSize: 10, borderTop: '1px solid #eee' }}>
      ⚠ Lagret for 3 dager siden
    </div>
  </div>
);

// ── Inbox — lead buried ────────────────────────────────────────────────────────
const BuriedInbox: React.FC<{ highlight: boolean }> = ({ highlight }) => (
  <div style={{ padding: '8px 10px', fontFamily: 'system-ui, sans-serif', fontSize: 11 }}>
    <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 12, color: '#333' }}>Innboks (47 ulest)</div>
    {[
      { from: 'Newsletter',   subj: 'Din ukentlige SaaS-oppdatering',        unread: false, lost: false },
      { from: 'HR',           subj: 'Husk: Ferieskjema innen fredag',        unread: true,  lost: false },
      { from: 'Solberg & Co', subj: 'Re: Hei — er dere fortsatt interessert?', unread: true, lost: true },
      { from: 'Bank',         subj: 'Kontoutskrift februar 2026',            unread: false, lost: false },
      { from: 'LinkedIn',     subj: '5 nye profiler sett på deg i dag',      unread: false, lost: false },
      { from: 'Supplier',     subj: 'Ny prisliste Q2 2026',                  unread: true,  lost: false },
    ].map((m, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          gap: 8,
          padding: '4px 6px',
          borderRadius: 4,
          borderBottom: '1px solid #f4f4f4',
          background: m.lost && highlight ? 'rgba(255,59,48,0.07)' : 'transparent',
          alignItems: 'center',
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.unread ? '#3478f6' : 'transparent', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: m.unread ? 700 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: m.lost ? '#e53' : '#222', fontSize: 11 }}>{m.from}</div>
          <div style={{ color: '#888', fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.subj}</div>
        </div>
      </div>
    ))}
  </div>
);

// ── Cursor waypoints ───────────────────────────────────────────────────────────
const WAYPOINTS: Waypoint[] = [
  { x: 540, y: 540, t: 0 },
  { x: 220, y: 340, t: 12 },   // hover browser
  { x: 220, y: 400, t: 20 },
  { x: 220, y: 400, t: 26 },   // click / select text
  { x: 550, y: 310, t: 38 },   // jump to notes
  { x: 550, y: 380, t: 44 },
  { x: 550, y: 380, t: 50 },   // type in notes
  { x: 600, y: 510, t: 62 },   // move to email draft
  { x: 600, y: 560, t: 68 },
  { x: 600, y: 560, t: 72 },   // realize it's unfinished
  { x: 430, y: 460, t: 84 },   // move to inbox — buried
  { x: 430, y: 510, t: 90 },
  { x: 430, y: 510, t: 120 },
];
const CLICKS: ClickFrame[] = [{ t: 26 }, { t: 50 }, { t: 72 }];

// ── Main scene ─────────────────────────────────────────────────────────────────
export const DC_S2_Lost: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Notes entry appears when cursor types
  const notesEntry = frame >= 44;
  // Email highlight when cursor reaches inbox
  const emailHighlight = frame >= 86;

  // Email draft fades out as inbox takes over
  const draftOp = interpolate(frame, [74, 84], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Red X stamp
  const stampAt  = 86;
  const stampS   = spring({ frame: Math.max(0, frame - stampAt), fps, config: { damping: 10, stiffness: 200, mass: 0.8 } });
  const stampOp  = interpolate(frame, [stampAt, stampAt + 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stampScale = interpolate(stampS, [0, 1], [2.0, 1]);

  // Caption
  const capOp = interpolate(frame, [96, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#E8E6DE', overflow: 'hidden' }}>
      <FakeMenuBar appName="Chrome" />

      {/* Browser — company found */}
      <FakeWindow frame={frame} fps={fps} title="Google Chrome" width={295} x={62} y={115} enterAt={0} rotation={-1.0} zIndex={3}>
        <BrowserFound />
      </FakeWindow>

      {/* Notes — lead scribbled down */}
      <FakeWindow frame={frame} fps={fps} title="Notater" width={265} x={415} y={150} enterAt={10} rotation={1.2} zIndex={2} contentBg="#fefce8">
        <NotesScribbled showEntry={notesEntry} />
      </FakeWindow>

      {/* Email draft — left unfinished */}
      {draftOp > 0.01 && (
        <div style={{ opacity: draftOp, position: 'absolute', inset: 0 }}>
          <FakeWindow frame={frame} fps={fps} title="Ny e-post — Kladd" width={275} x={460} y={415} enterAt={36} rotation={0.8} zIndex={4}>
            <EmailDraft />
          </FakeWindow>
        </div>
      )}

      {/* Inbox — lead buried */}
      {frame >= 76 && (
        <FakeWindow frame={frame} fps={fps} title="Mail — Innboks" width={295} x={310} y={430} enterAt={0} rotation={-1.2} zIndex={5}>
          <BuriedInbox highlight={emailHighlight} />
        </FakeWindow>
      )}

      {/* Red X stamp over the buried inbox */}
      {stampOp > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: 310 + 18,
            top:  430 + 40,
            width: 260,
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: stampOp,
            transform: `scale(${stampScale}) rotate(-10deg)`,
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: 130,
              height: 130,
              border: '9px solid rgba(220,50,40,0.85)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(220,50,40,0.05)',
            }}
          >
            <div style={{ fontFamily: 'system-ui', fontWeight: 900, fontSize: 72, color: 'rgba(220,50,40,0.82)', lineHeight: 1, marginTop: -4 }}>✕</div>
          </div>
        </div>
      )}

      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 64,
          left: 44, right: 44,
          background: 'rgba(10,10,10,0.82)',
          borderRadius: 14,
          padding: '14px 20px',
          textAlign: 'center',
          opacity: capOp,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 30,
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.35,
          zIndex: 30,
        }}
      >
        Leads blir borte i kaoset
      </div>

      <FakeCursor frame={frame} waypoints={WAYPOINTS} clicks={CLICKS} />
    </AbsoluteFill>
  );
};
