// Audio layer for ReachrPromo_V (9:16, 750f @ 30fps)
// Same SFX as 16:9 but mapped to vertical scene offsets (no S5).

import { Audio, Sequence, staticFile } from 'remotion';
import { RV_OFFSETS } from '../constants/reachr';

const SFX: Array<{ file: string; from: number; dur: number; vol: number }> = [
  // ── Scene 1 — Hook (extended to 150f) ────────────────────────────────────
  { file: 'sfx_ping',  from: RV_OFFSETS.s1 + 0,  dur: 12, vol: 0.42 },
  { file: 'sfx_ping',  from: RV_OFFSETS.s1 + 4,  dur: 12, vol: 0.36 },
  { file: 'sfx_ping',  from: RV_OFFSETS.s1 + 6,  dur: 12, vol: 0.38 },
  { file: 'sfx_ping',  from: RV_OFFSETS.s1 + 12, dur: 12, vol: 0.34 },
  { file: 'sfx_pop',   from: RV_OFFSETS.s1 + 80, dur: 7,  vol: 0.65 },

  // ── Scene 2 — Pain (offset 150) ───────────────────────────────────────────
  { file: 'sfx_stamp', from: RV_OFFSETS.s2 + 15, dur: 9,  vol: 0.50 },
  { file: 'sfx_ping',  from: RV_OFFSETS.s2 + 44, dur: 12, vol: 0.30 },
  { file: 'sfx_stamp', from: RV_OFFSETS.s2 + 72, dur: 9,  vol: 0.58 },

  // ── Scene 3 — Reveal (offset 240) ────────────────────────────────────────
  { file: 'sfx_whoosh', from: RV_OFFSETS.s3 + 2,  dur: 17, vol: 0.38 },
  { file: 'sfx_chime',  from: RV_OFFSETS.s3 + 55, dur: 20, vol: 0.52 },
  { file: 'sfx_whoosh', from: RV_OFFSETS.s3 + 84, dur: 15, vol: 0.24 },

  // ── Scene 4 — Features (offset 360) ──────────────────────────────────────
  { file: 'sfx_type',  from: RV_OFFSETS.s4 + 14,  dur: 46, vol: 0.18 },
  { file: 'sfx_ping',  from: RV_OFFSETS.s4 + 45,  dur: 12, vol: 0.28 },
  { file: 'sfx_ping',  from: RV_OFFSETS.s4 + 52,  dur: 12, vol: 0.24 },
  { file: 'sfx_ping',  from: RV_OFFSETS.s4 + 59,  dur: 12, vol: 0.20 },
  { file: 'sfx_drag',  from: RV_OFFSETS.s4 + 104, dur: 9,  vol: 0.40 },
  { file: 'sfx_chime', from: RV_OFFSETS.s4 + 164, dur: 20, vol: 0.58 },
  { file: 'sfx_type',  from: RV_OFFSETS.s4 + 198, dur: 66, vol: 0.16 },
  { file: 'sfx_send',  from: RV_OFFSETS.s4 + 246, dur: 15, vol: 0.55 },

  // ── Scene 6 — CTA (offset 630, extended to 120f) ─────────────────────────
  { file: 'sfx_chime', from: RV_OFFSETS.s6 + 22, dur: 20, vol: 0.62 },
  { file: 'sfx_send',  from: RV_OFFSETS.s6 + 64, dur: 15, vol: 0.42 },
];

export const AudioTrack_V: React.FC = () => (
  <>
    <Audio src={staticFile('audio/bg_music.wav')} volume={0.11} />
    {SFX.map((s, i) => (
      <Sequence key={i} from={s.from} durationInFrames={s.dur}>
        <Audio src={staticFile(`audio/${s.file}.wav`)} volume={s.vol} />
      </Sequence>
    ))}
  </>
);
