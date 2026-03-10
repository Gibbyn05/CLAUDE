// Audio layer for ReachrDesktopChaos (9:16, 750f @ 30fps)
// Background music + SFX synced to DC scene offsets.

import { Audio, Sequence, staticFile } from 'remotion';
import { DC_OFF } from '../constants/desktopChaos';

const SFX: Array<{ file: string; from: number; dur: number; vol: number }> = [
  // ── Scene 1 — Desktop Chaos ────────────────────────────────────────────────
  { file: 'sfx_type',   from: DC_OFF.s1 + 0,   dur: 60, vol: 0.18 },  // frantic typing
  { file: 'sfx_ping',   from: DC_OFF.s1 + 2,   dur: 12, vol: 0.38 },
  { file: 'sfx_ping',   from: DC_OFF.s1 + 8,   dur: 12, vol: 0.34 },
  { file: 'sfx_ping',   from: DC_OFF.s1 + 16,  dur: 12, vol: 0.30 },
  { file: 'sfx_ping',   from: DC_OFF.s1 + 22,  dur: 12, vol: 0.36 },  // notification
  { file: 'sfx_ping',   from: DC_OFF.s1 + 35,  dur: 12, vol: 0.40 },  // mail notif
  { file: 'sfx_ping',   from: DC_OFF.s1 + 58,  dur: 12, vol: 0.38 },  // slack notif
  { file: 'sfx_ping',   from: DC_OFF.s1 + 82,  dur: 12, vol: 0.36 },  // calendar notif
  { file: 'sfx_ping',   from: DC_OFF.s1 + 108, dur: 12, vol: 0.34 },  // crm notif
  { file: 'sfx_click',  from: DC_OFF.s1 + 28,  dur: 4,  vol: 0.50 },
  { file: 'sfx_click',  from: DC_OFF.s1 + 52,  dur: 4,  vol: 0.48 },
  { file: 'sfx_click',  from: DC_OFF.s1 + 74,  dur: 4,  vol: 0.46 },
  { file: 'sfx_click',  from: DC_OFF.s1 + 96,  dur: 4,  vol: 0.44 },
  { file: 'sfx_click',  from: DC_OFF.s1 + 118, dur: 4,  vol: 0.42 },

  // ── Scene 2 — Lost Lead ────────────────────────────────────────────────────
  { file: 'sfx_whoosh', from: DC_OFF.s2 + 0,   dur: 16, vol: 0.28 },
  { file: 'sfx_click',  from: DC_OFF.s2 + 22,  dur: 4,  vol: 0.50 },
  { file: 'sfx_click',  from: DC_OFF.s2 + 48,  dur: 4,  vol: 0.48 },
  { file: 'sfx_error',  from: DC_OFF.s2 + 88,  dur: 10, vol: 0.55 },  // X stamp
  { file: 'sfx_stamp',  from: DC_OFF.s2 + 88,  dur: 9,  vol: 0.46 },

  // ── Scene 3 — Reachr Enters ────────────────────────────────────────────────
  { file: 'sfx_whoosh', from: DC_OFF.s3 + 0,   dur: 18, vol: 0.36 },
  { file: 'sfx_chime',  from: DC_OFF.s3 + 30,  dur: 22, vol: 0.60 },  // "Reachr" lands
  { file: 'sfx_pop',    from: DC_OFF.s3 + 66,  dur: 8,  vol: 0.48 },  // underline
  { file: 'sfx_whoosh', from: DC_OFF.s3 + 100, dur: 16, vol: 0.24 },  // dashboard rises

  // ── Scene 4 — Workflow ─────────────────────────────────────────────────────
  // Panel A: search
  { file: 'sfx_type',  from: DC_OFF.s4 + 0,   dur: 40, vol: 0.16 },
  { file: 'sfx_ping',  from: DC_OFF.s4 + 24,  dur: 12, vol: 0.24 },
  { file: 'sfx_ping',  from: DC_OFF.s4 + 30,  dur: 12, vol: 0.20 },
  { file: 'sfx_ping',  from: DC_OFF.s4 + 36,  dur: 12, vol: 0.18 },
  // Panel B: drag + reminder
  { file: 'sfx_drag',  from: DC_OFF.s4 + 80,  dur: 9,  vol: 0.40 },
  { file: 'sfx_chime', from: DC_OFF.s4 + 116, dur: 20, vol: 0.50 },
  // Panel C: AI email
  { file: 'sfx_type',  from: DC_OFF.s4 + 140, dur: 52, vol: 0.14 },
  { file: 'sfx_send',  from: DC_OFF.s4 + 172, dur: 15, vol: 0.55 },

  // ── Scene 5 — CTA ─────────────────────────────────────────────────────────
  { file: 'sfx_chime', from: DC_OFF.s5 + 8,   dur: 22, vol: 0.68 },
  { file: 'sfx_send',  from: DC_OFF.s5 + 54,  dur: 15, vol: 0.48 },
];

export const AudioTrackDC: React.FC = () => (
  <>
    {/* Background music */}
    <Audio src={staticFile('audio/bg_music.wav')} volume={0.10} />

    {/* SFX */}
    {SFX.map((s, i) => (
      <Sequence key={i} from={s.from} durationInFrames={s.dur}>
        <Audio src={staticFile(`audio/${s.file}.wav`)} volume={s.vol} />
      </Sequence>
    ))}
  </>
);
