// Scene 1 — Desktop Chaos (180f = 6s)
// 6 macOS windows spring in chaotically with notifications firing.
// Frantic animated cursor. Headline fades in late.

import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FakeWindow, FakeMenuBar, FakeNotification } from '../components/FakeWindow';
import { FakeCursor, Waypoint, ClickFrame } from '../components/FakeCursor';
import { R_COLORS } from '../constants/reachr';

// ── Window contents ────────────────────────────────────────────────────────────

const SpreadsheetContent: React.FC = () => (
  <div style={{ padding: '8px 10px', fontFamily: 'monospace', fontSize: 11, color: '#222' }}>
    {[
      ['Navn',     'Status',  'Sist kontakt', 'Notat'],
      ['Kjell A.', 'Ukjent',  '???',          '—'],
      ['Maria B.', 'Venter',  '3 uker',       'Kanskje?'],
      ['Tom C.',   'Glemt',   '6 uker',       '🚨 FØLG OPP'],
      ['Lene D.',  'Tapt?',   '2 måneder',    '😰'],
      ['Per E.',   'Ukjent',  '1 måned',      'Ring igjen?'],
    ].map((row, ri) => (
      <div key={ri} style={{ display: 'flex', gap: 0, borderBottom: ri === 0 ? '1px solid #ddd' : '1px solid #f0f0f0', paddingBottom: 3, paddingTop: 3 }}>
        {row.map((cell, ci) => (
          <div key={ci} style={{ width: ci === 0 ? 72 : ci === 1 ? 58 : ci === 2 ? 72 : 90, fontSize: ri === 0 ? 10 : 11, fontWeight: ri === 0 ? 700 : 400, color: cell.includes('🚨') ? '#e53' : cell.includes('Glemt') ? '#e53' : '#333', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {cell}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const EmailContent: React.FC = () => (
  <div style={{ padding: '10px 14px', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#222' }}>
    <div style={{ fontWeight: 700, marginBottom: 6, color: '#111' }}>Innboks (47 ulest)</div>
    {[
      { from: 'Maria Berge', subj: 'Re: Tilbud — ventet på svar', time: '2d', unread: true },
      { from: 'Kjell Arne',  subj: 'Hei, hørte ikke noe fra deg?', time: '4d', unread: true },
      { from: 'Tom Chr.',    subj: 'Prøver siste gang...', time: '1u', unread: true },
      { from: 'Newsletter',  subj: 'Din ukentlige oppsummering', time: '1u', unread: false },
      { from: 'Lene D.',     subj: 'Oppfølging fra møtet i januar', time: '5u', unread: true },
    ].map((m, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid #f4f4f4' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.unread ? '#3478f6' : 'transparent', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: m.unread ? 700 : 400, fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.from}</div>
          <div style={{ fontSize: 10, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.subj}</div>
        </div>
        <div style={{ fontSize: 10, color: '#bbb', flexShrink: 0 }}>{m.time}</div>
      </div>
    ))}
  </div>
);

const NotesContent: React.FC = () => (
  <div style={{ padding: '10px 12px', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#333', background: '#fefce8' }}>
    <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Leads — huskeliste</div>
    {[
      '☑ Ring Maria B. (uke 3) → glemte',
      '□ Tom C. — prøv igjen ASAP',
      '□ Hvem sendte jeg tilbud til i jan?',
      '□ Sjekk kalender — hadde vi møte?',
      '□ Finn kontaktinfoen til Lene D.',
      '☑ Sende tilbud til Kjell — sendt?',
    ].map((n, i) => (
      <div key={i} style={{ marginBottom: 5, fontSize: 11, color: n.startsWith('☑') ? '#aaa' : '#333', textDecoration: n.startsWith('☑') ? 'line-through' : 'none' }}>{n}</div>
    ))}
  </div>
);

const CalendarContent: React.FC<{ frame: number }> = ({ frame }) => {
  const blink = Math.floor(frame * 0.5) % 2 === 0;
  return (
    <div style={{ padding: '8px 12px', fontFamily: 'system-ui, sans-serif', fontSize: 11 }}>
      <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 12 }}>Mars 2026</div>
      {[
        { time: '09:00', label: 'Salgsmøte (hvem møter?)', warn: false },
        { time: '11:30', label: 'Oppfølging Maria — OBS!', warn: true },
        { time: '14:00', label: 'Demo Reachr (husket?)', warn: false },
        { time: '16:00', label: 'Ring Tom C. — SISTE SJANSE', warn: true },
      ].map((e, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
          <div style={{ width: 36, fontWeight: 600, color: '#666', flexShrink: 0, fontSize: 10 }}>{e.time}</div>
          <div style={{ flex: 1, color: e.warn ? (blink ? '#e53' : '#c33') : '#333', fontWeight: e.warn ? 600 : 400 }}>{e.label}</div>
        </div>
      ))}
    </div>
  );
};

const SlackContent: React.FC = () => (
  <div style={{ padding: '8px 10px', fontFamily: 'system-ui, sans-serif', fontSize: 11, color: '#333' }}>
    <div style={{ fontWeight: 700, marginBottom: 6, color: '#1a1a1a', fontSize: 12 }}>#salg</div>
    {[
      { user: 'Lars',    msg: 'Hvem er ansvarlig for Berge-leaden?', time: '10:12' },
      { user: 'Sara',    msg: 'Ingen aner… sjekk regnearket?', time: '10:14' },
      { user: 'Markus',  msg: 'Hvilket regneark? Vi har 4 🤡', time: '10:15' },
      { user: 'Lars',    msg: 'Ring dem bare. Eller kanskje ikke?', time: '10:16' },
      { user: 'Sara',    msg: 'Jeg ga opp. De ringte konkurrenten', time: '11:02' },
    ].map((m, i) => (
      <div key={i} style={{ marginBottom: 5 }}>
        <span style={{ fontWeight: 700, color: '#444' }}>{m.user} </span>
        <span style={{ color: '#888', fontSize: 10 }}>{m.time}</span>
        <div style={{ color: '#333' }}>{m.msg}</div>
      </div>
    ))}
  </div>
);

const CRMContent: React.FC = () => (
  <div style={{ padding: '10px 12px', fontFamily: 'system-ui, sans-serif', fontSize: 11 }}>
    <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8, color: '#444' }}>CRM v1.3 — Kontakter</div>
    <div style={{ background: '#f5f5f5', borderRadius: 4, padding: '4px 8px', marginBottom: 6, color: '#666', fontSize: 10 }}>
      🔍 Søk... (502 resultater)
    </div>
    {[
      { name: 'Berge, Maria',     status: '???',     lastSeen: 'aldri' },
      { name: 'Andersen, Kjell',  status: 'Venter',  lastSeen: '3u' },
      { name: 'Christoffersen, T',status: 'Tapt',    lastSeen: '2m' },
    ].map((c, i) => (
      <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0', borderBottom: '1px solid #eee' }}>
        <div style={{ flex: 1, fontWeight: 500 }}>{c.name}</div>
        <div style={{ color: c.status === 'Tapt' ? '#e53' : '#888', fontSize: 10 }}>{c.status}</div>
        <div style={{ color: '#bbb', fontSize: 10 }}>{c.lastSeen}</div>
      </div>
    ))}
    <div style={{ marginTop: 8, color: '#ccc', fontSize: 10, textAlign: 'center' }}>…og 499 til</div>
  </div>
);

// ── Cursor waypoints ───────────────────────────────────────────────────────────
const WAYPOINTS: Waypoint[] = [
  { x: 540, y: 500, t: 0 },
  { x: 310, y: 340, t: 20 },
  { x: 310, y: 340, t: 28 },   // hover spreadsheet
  { x: 620, y: 420, t: 45 },
  { x: 620, y: 420, t: 52 },   // hover email
  { x: 180, y: 580, t: 68 },
  { x: 180, y: 580, t: 74 },   // hover notes
  { x: 760, y: 300, t: 90 },
  { x: 760, y: 300, t: 96 },   // hover calendar
  { x: 420, y: 620, t: 112 },
  { x: 420, y: 620, t: 118 },  // hover slack
  { x: 540, y: 500, t: 140 },  // return center, overwhelmed
  { x: 520, y: 510, t: 180 },
];

const CLICKS: ClickFrame[] = [
  { t: 28 }, { t: 52 }, { t: 74 }, { t: 96 }, { t: 118 },
];

// ── Main scene ─────────────────────────────────────────────────────────────────
export const DC_S1_Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOp = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headlineY  = interpolate(frame, [130, 155], [14, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#E8E6DE', overflow: 'hidden' }}>
      <FakeMenuBar appName="Finder" />

      {/* Spreadsheet */}
      <FakeWindow frame={frame} fps={fps} title="Leads_Q1_FINAL_v3.xlsx" width={310} x={60} y={120} enterAt={0} rotation={-1.5} zIndex={3}>
        <SpreadsheetContent />
      </FakeWindow>

      {/* Email */}
      <FakeWindow frame={frame} fps={fps} title="Innboks — Mail" width={290} x={390} y={200} enterAt={12} rotation={1.2} zIndex={2}>
        <EmailContent />
      </FakeWindow>

      {/* Notes */}
      <FakeWindow frame={frame} fps={fps} title="Notater" width={240} x={90} y={480} enterAt={6} rotation={2.0} zIndex={4} contentBg="#fefce8">
        <NotesContent />
      </FakeWindow>

      {/* Calendar */}
      <FakeWindow frame={frame} fps={fps} title="Kalender" width={280} x={640} y={140} enterAt={18} rotation={-0.8} zIndex={2}>
        <CalendarContent frame={frame} />
      </FakeWindow>

      {/* Slack */}
      <FakeWindow frame={frame} fps={fps} title="Slack — #salg" width={260} x={340} y={520} enterAt={24} rotation={1.5} zIndex={3} contentBg="#fff">
        <SlackContent />
      </FakeWindow>

      {/* CRM */}
      <FakeWindow frame={frame} fps={fps} title="CRM v1.3" width={250} x={660} y={460} enterAt={30} rotation={-1.0} zIndex={2}>
        <CRMContent />
      </FakeWindow>

      {/* Notifications */}
      <FakeNotification frame={frame} fps={fps} delay={35} icon="📧" appName="Mail" message="Kjell Arne: «Hørte aldri noe fra deg?»" topOffset={36} />
      <FakeNotification frame={frame} fps={fps} delay={58} icon="💬" appName="Slack" message="Sara: Ring dem bare. Eller kanskje ikke?" topOffset={108} />
      <FakeNotification frame={frame} fps={fps} delay={82} icon="📅" appName="Kalender" message="Oppfølging Maria — nå!" topOffset={180} />
      <FakeNotification frame={frame} fps={fps} delay={108} icon="📋" appName="CRM" message="3 leads har ikke hørt fra deg på 14 dager" topOffset={252} />

      {/* Cursor */}
      <FakeCursor frame={frame} waypoints={WAYPOINTS} clicks={CLICKS} />

      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          bottom: 90,
          left: 0, right: 0,
          textAlign: 'center',
          opacity: headlineOp,
          transform: `translateY(${headlineY}px)`,
          pointerEvents: 'none',
        }}
      >
        <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 42, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.5px', textShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
          Kjenner du igjen dette?
        </div>
        <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 22, color: '#555', marginTop: 6 }}>
          Kaos. Hvert eneste dag.
        </div>
      </div>
    </AbsoluteFill>
  );
};
