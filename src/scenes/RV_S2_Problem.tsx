// Scene 2 — Problem (120f = 4s)
// "Leads blir glemt"
// Lead cards appear in a pipeline, then disappear — showing the problem.

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { R_COLORS } from '../constants/reachr';

const Caption: React.FC<{ text: string; opacity: number }> = ({ text, opacity }) => (
  <div style={{ position: 'absolute', bottom: 72, left: 44, right: 44, background: 'rgba(23,23,23,0.72)', borderRadius: 14, padding: '14px 20px', textAlign: 'center', opacity, fontFamily: 'system-ui, sans-serif', fontSize: 29, fontWeight: 600, color: 'white', lineHeight: 1.4 }}>
    {text}
  </div>
);

// A single lead card
const LeadCard: React.FC<{
  name: string;
  company: string;
  status: 'new' | 'warning' | 'lost';
  statusLabel: string;
  frame: number; fps: number; delay: number;
  // For "lost" cards: fade out after fadeOutStart
  fadeOutStart?: number;
  // Horizontal slide: start and end x offset
  slideX?: { from: number; to: number; start: number; end: number };
}> = ({ name, company, status, statusLabel, frame, fps, delay, fadeOutStart, slideX }) => {
  const f = Math.max(0, frame - delay);
  const enter = spring({ frame: f, fps, config: { damping: 14, stiffness: 90 } });
  const enterY = interpolate(enter, [0, 1], [40, 0]);
  const enterOpacity = Math.min(1, enter * 2);

  // Fade out for forgotten cards
  const fadeOpacity = fadeOutStart != null
    ? interpolate(frame, [fadeOutStart, fadeOutStart + 18], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 1;

  // Shake before fade (nervous/forgetting)
  const shakeStart = fadeOutStart != null ? fadeOutStart - 10 : 9999;
  const shakeX = frame >= shakeStart && frame < (fadeOutStart ?? 9999)
    ? Math.sin((frame - shakeStart) * 1.8) * 5
    : 0;

  // Horizontal slide
  let slideOffset = 0;
  if (slideX) {
    slideOffset = interpolate(
      frame,
      [slideX.start, slideX.end],
      [slideX.from, slideX.to],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
  }

  const statusColor =
    status === 'new'     ? R_COLORS.green :
    status === 'warning' ? '#f59e0b' :
                           R_COLORS.red;
  const statusBg =
    status === 'new'     ? `${R_COLORS.green}18` :
    status === 'warning' ? '#fffbeb' :
                           '#fff0f0';

  return (
    <div
      style={{
        transform: `translateY(${enterY}px) translateX(${slideOffset + shakeX}px)`,
        opacity: enterOpacity * fadeOpacity,
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 18,
          padding: '18px 20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.09)',
          border: `1.5px solid ${status === 'lost' ? '#fecdd3' : '#f0ece2'}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Avatar */}
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: R_COLORS.beige, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
          👤
        </div>
        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 20, color: R_COLORS.dark }}>{name}</div>
          <div style={{ fontFamily: 'system-ui', fontSize: 15, color: '#aaa' }}>{company}</div>
        </div>
        {/* Status badge */}
        <div style={{ background: statusBg, border: `1.5px solid ${statusColor}44`, borderRadius: 10, padding: '5px 12px', fontFamily: 'system-ui', fontWeight: 700, fontSize: 13, color: statusColor, whiteSpace: 'nowrap' }}>
          {status === 'lost' ? '👻' : status === 'warning' ? '⚠' : '●'} {statusLabel}
        </div>
      </div>
    </div>
  );
};

export const RV_S2_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene slides in
  const sceneEnter = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const sceneY = interpolate(sceneEnter, [0, 1], [60, 0]);

  // Text "Leads blir glemt" appears at f=70
  const headlineOpacity = interpolate(frame, [68, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOpacity  = interpolate(frame, [92, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Pipeline header label
  const pipelineOpacity = interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: R_COLORS.beige, overflow: 'hidden' }}>
      <div style={{ transform: `translateY(${sceneY}px)`, height: '100%' }}>

        {/* Pipeline header */}
        <div style={{ position: 'absolute', top: 180, left: 0, right: 0, textAlign: 'center', opacity: pipelineOpacity }}>
          <div style={{ fontFamily: 'system-ui', fontSize: 15, fontWeight: 700, color: '#bbb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Din pipeline
          </div>
          <div style={{ width: 40, height: 3, background: R_COLORS.green, borderRadius: 2, margin: '8px auto 0' }} />
        </div>

        {/* Lead cards — stacked in the center */}
        <div style={{ position: 'absolute', top: 280, left: 60, right: 60, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Card 1: healthy (new lead) */}
          <LeadCard
            name="Peter Hansen"
            company="Haugen Bygg AS"
            status="new"
            statusLabel="Ny kontakt"
            frame={frame} fps={fps} delay={18}
          />

          {/* Card 2: warning (no follow-up) */}
          <LeadCard
            name="Erik Johansen"
            company="Nordvik AS"
            status="warning"
            statusLabel="3 dager siden"
            frame={frame} fps={fps} delay={26}
          />

          {/* Card 3: forgotten — shakes then fades out */}
          <LeadCard
            name="Sara Larsen"
            company="Viken Rør AS"
            status="lost"
            statusLabel="Glemt"
            frame={frame} fps={fps} delay={34}
            fadeOutStart={62}
          />

          {/* Card 4: also forgotten */}
          <LeadCard
            name="Lars Berg"
            company="Bergström & Co"
            status="lost"
            statusLabel="Ingen kontakt"
            frame={frame} fps={fps} delay={42}
            fadeOutStart={78}
          />
        </div>

        {/* "Leads blir glemt" — large headline */}
        <div
          style={{
            position: 'absolute',
            bottom: 320,
            left: 0,
            right: 0,
            textAlign: 'center',
            padding: '0 50px',
            opacity: headlineOpacity,
          }}
        >
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 66, fontWeight: 700, color: R_COLORS.dark, letterSpacing: '-1px', lineHeight: 1.1 }}>
            Leads blir glemt.
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 38, fontStyle: 'italic', color: R_COLORS.muted, marginTop: 12 }}>
            Oppfølging stopper.
          </div>
        </div>

      </div>

      {/* VO: "Leads blir glemt. Oppfølging stopper." */}
      <Caption text="Leads blir glemt. Oppfølging stopper." opacity={captionOpacity} />
    </AbsoluteFill>
  );
};
