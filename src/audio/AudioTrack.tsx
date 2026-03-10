// Audio layer for ReachrPromo (16:9, 750f @ 30fps)
// Background music + scene-synced SFX.

import { Audio, Sequence, staticFile } from 'remotion';
import { R_OFFSETS } from '../constants/reachr';

// Absolute composition frame → { file, volume, durationInFrames }
const SFX: Array<{ file: string; from: number; dur: number; vol: number }> = [
  // ── Scene 1 — Hook: chaos icons spin in ───────────────────────────────────
  { file: 'sfx_ping',  from: R_OFFSETS.s1 + 0,  dur: 12, vol: 0.42 },
  { file: 'sfx_ping',  from: R_OFFSETS.s1 + 4,  dur: 12, vol: 0.36 },
  { file: 'sfx_ping',  from: R_OFFSETS.s1 + 6,  dur: 12, vol: 0.38 },
  { file: 'sfx_ping',  from: R_OFFSETS.s1 + 12, dur: 12, vol: 0.34 },
  // ?? bubble pops up
  { file: 'sfx_pop',   from: R_OFFSETS.s1 + 80, dur: 7,  vol: 0.65 },

  // ── Scene 2 — Pain ────────────────────────────────────────────────────────
  // CutA: "glemt" stamp appears (~f 15 into cut)
  { file: 'sfx_stamp', from: R_OFFSETS.s2 + 15, dur: 9, vol: 0.50 },
  // CutB: notification badge bounces off (~f 44 into cut)
  { file: 'sfx_ping',  from: R_OFFSETS.s2 + 44, dur: 12, vol: 0.30 },
  // CutC: "TAPT" stamp (~f 72 into cut)
  { file: 'sfx_stamp', from: R_OFFSETS.s2 + 72, dur: 9, vol: 0.58 },

  // ── Scene 3 — Reveal ─────────────────────────────────────────────────────
  // Wordmark draws in
  { file: 'sfx_whoosh', from: R_OFFSETS.s3 + 2,  dur: 17, vol: 0.38 },
  // Underline green flash completes (~f 55)
  { file: 'sfx_chime',  from: R_OFFSETS.s3 + 55, dur: 20, vol: 0.52 },
  // Product UI slides up (~f 84)
  { file: 'sfx_whoosh', from: R_OFFSETS.s3 + 84, dur: 15, vol: 0.24 },

  // ── Scene 4 — Features ────────────────────────────────────────────────────
  // Feature A: typing cursor appears (~f 14)
  { file: 'sfx_type',  from: R_OFFSETS.s4 + 14, dur: 46, vol: 0.18 },
  // Feature A: search results appear (3 pings)
  { file: 'sfx_ping',  from: R_OFFSETS.s4 + 45, dur: 12, vol: 0.28 },
  { file: 'sfx_ping',  from: R_OFFSETS.s4 + 52, dur: 12, vol: 0.24 },
  { file: 'sfx_ping',  from: R_OFFSETS.s4 + 59, dur: 12, vol: 0.20 },
  // Feature B: card starts moving (~f 90+14=104 into scene 4)
  { file: 'sfx_drag',  from: R_OFFSETS.s4 + 104, dur: 9,  vol: 0.40 },
  // Feature B: card lands at Kunde + confetti (~f 90+74=164)
  { file: 'sfx_chime', from: R_OFFSETS.s4 + 164, dur: 20, vol: 0.58 },
  // Feature C: AI typing email (~f 180+18=198)
  { file: 'sfx_type',  from: R_OFFSETS.s4 + 198, dur: 66, vol: 0.16 },
  // Feature C: send button glows + click (~f 180+66=246)
  { file: 'sfx_send',  from: R_OFFSETS.s4 + 246, dur: 15, vol: 0.55 },

  // ── Scene 5 — Social Proof ────────────────────────────────────────────────
  // Counter ticks (~f 10, 25, 40)
  { file: 'sfx_ping',  from: R_OFFSETS.s5 + 10, dur: 8, vol: 0.22 },
  { file: 'sfx_ping',  from: R_OFFSETS.s5 + 25, dur: 8, vol: 0.22 },
  { file: 'sfx_ping',  from: R_OFFSETS.s5 + 40, dur: 8, vol: 0.22 },

  // ── Scene 6 — CTA ─────────────────────────────────────────────────────────
  // Wordmark drops in
  { file: 'sfx_chime', from: R_OFFSETS.s6 + 22, dur: 20, vol: 0.62 },
  // Button pulses
  { file: 'sfx_send',  from: R_OFFSETS.s6 + 64, dur: 15, vol: 0.42 },
];

export const AudioTrack: React.FC = () => (
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
