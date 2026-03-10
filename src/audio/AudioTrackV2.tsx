// Audio layer for ReachrVideo (9:16, 750f @ 30fps)
// Background music + SFX synced to RV2 scene offsets.

import { Audio, Sequence, staticFile } from 'remotion';
import { RV2_OFF } from '../constants/reachrVideo';

// Absolute composition frames
const SFX: Array<{ file: string; from: number; dur: number; vol: number }> = [
  // ── Scene 1 — Hook: chaos cards spring in ─────────────────────────────────
  { file: 'sfx_type',  from: RV2_OFF.s1 + 0,  dur: 52, vol: 0.16 },  // keyboard chaos
  { file: 'sfx_ping',  from: RV2_OFF.s1 + 2,  dur: 12, vol: 0.40 },
  { file: 'sfx_ping',  from: RV2_OFF.s1 + 8,  dur: 12, vol: 0.35 },
  { file: 'sfx_ping',  from: RV2_OFF.s1 + 15, dur: 12, vol: 0.38 },
  { file: 'sfx_ping',  from: RV2_OFF.s1 + 5,  dur: 12, vol: 0.32 },
  { file: 'sfx_ping',  from: RV2_OFF.s1 + 22, dur: 12, vol: 0.30 },
  { file: 'sfx_ping',  from: RV2_OFF.s1 + 27, dur: 12, vol: 0.28 },

  // ── Scene 2 — Problem: leads disappearing ─────────────────────────────────
  { file: 'sfx_whoosh', from: RV2_OFF.s2 + 0,  dur: 16, vol: 0.30 },  // scene transition
  { file: 'sfx_ping',   from: RV2_OFF.s2 + 19, dur: 12, vol: 0.28 },  // card 1 appears
  { file: 'sfx_ping',   from: RV2_OFF.s2 + 27, dur: 12, vol: 0.25 },  // card 2
  { file: 'sfx_ping',   from: RV2_OFF.s2 + 35, dur: 12, vol: 0.22 },  // card 3
  { file: 'sfx_ping',   from: RV2_OFF.s2 + 43, dur: 12, vol: 0.20 },  // card 4
  { file: 'sfx_whoosh', from: RV2_OFF.s2 + 60, dur: 14, vol: 0.35 },  // card disappears
  { file: 'sfx_stamp',  from: RV2_OFF.s2 + 76, dur: 9,  vol: 0.42 },  // another gone

  // ── Scene 3 — Solution: "Meet Reachr" reveal ──────────────────────────────
  { file: 'sfx_whoosh', from: RV2_OFF.s3 + 0,  dur: 16, vol: 0.32 },  // scene flash
  { file: 'sfx_chime',  from: RV2_OFF.s3 + 22, dur: 20, vol: 0.55 },  // "Reachr" lands
  { file: 'sfx_pop',    from: RV2_OFF.s3 + 62, dur: 8,  vol: 0.50 },  // underline flash
  { file: 'sfx_whoosh', from: RV2_OFF.s3 + 108,dur: 16, vol: 0.22 },  // dashboard slides up

  // ── Scene 4 — Features ────────────────────────────────────────────────────
  // Feature A: lead search
  { file: 'sfx_type',  from: RV2_OFF.s4 + 12,  dur: 42, vol: 0.17 },
  { file: 'sfx_ping',  from: RV2_OFF.s4 + 43,  dur: 12, vol: 0.26 },
  { file: 'sfx_ping',  from: RV2_OFF.s4 + 50,  dur: 12, vol: 0.22 },
  { file: 'sfx_ping',  from: RV2_OFF.s4 + 57,  dur: 12, vol: 0.18 },
  // Feature B: pipeline card + reminder
  { file: 'sfx_drag',  from: RV2_OFF.s4 + 88,  dur: 9,  vol: 0.38 },
  { file: 'sfx_chime', from: RV2_OFF.s4 + 120, dur: 20, vol: 0.52 },
  // Feature C: AI email
  { file: 'sfx_type',  from: RV2_OFF.s4 + 156, dur: 55, vol: 0.15 },
  { file: 'sfx_send',  from: RV2_OFF.s4 + 198, dur: 15, vol: 0.52 },

  // ── Scene 5 — CTA ─────────────────────────────────────────────────────────
  { file: 'sfx_chime', from: RV2_OFF.s5 + 8,   dur: 20, vol: 0.65 },  // reveal
  { file: 'sfx_send',  from: RV2_OFF.s5 + 50,  dur: 15, vol: 0.45 },  // CTA button
];

export const AudioTrackV2: React.FC = () => (
  <>
    {/* Continuous background music */}
    <Audio src={staticFile('audio/bg_music.wav')} volume={0.11} />

    {/* Scene-synced SFX */}
    {SFX.map((s, i) => (
      <Sequence key={i} from={s.from} durationInFrames={s.dur}>
        <Audio src={staticFile(`audio/${s.file}.wav`)} volume={s.vol} />
      </Sequence>
    ))}
  </>
);
