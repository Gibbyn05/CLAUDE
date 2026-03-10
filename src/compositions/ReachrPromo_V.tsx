// Reachr — 9:16 vertical (Reels/TikTok), 25s @ 30fps = 750 frames
// No scene 5 (social proof). Extended hook (5s) and CTA (4s).
//
// Scene timing (frames @ 30fps):
//   Scene 1 — Hook     :   0 – 149  (5s)
//   Scene 2 — Pain     : 150 – 239  (3s, 3×30f)
//   Scene 3 — Reveal   : 240 – 359  (4s)
//   Scene 4 — Features : 360 – 629  (9s, 3×90f)
//   Scene 6 — CTA      : 630 – 749  (4s)

import { AbsoluteFill, Sequence } from 'remotion';
import { R1_Hook_V } from '../scenes/R1_Hook_V';
import { R2_Pain_V } from '../scenes/R2_Pain_V';
import { R3_Reveal_V } from '../scenes/R3_Reveal_V';
import { R4_Features_V } from '../scenes/R4_Features_V';
import { R6_CTA_V } from '../scenes/R6_CTA_V';
import { RV_DURATIONS, RV_OFFSETS } from '../constants/reachr';

export const ReachrPromo_V: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={RV_OFFSETS.s1} durationInFrames={RV_DURATIONS.s1}>
      <R1_Hook_V />
    </Sequence>

    <Sequence from={RV_OFFSETS.s2} durationInFrames={RV_DURATIONS.s2}>
      <R2_Pain_V />
    </Sequence>

    <Sequence from={RV_OFFSETS.s3} durationInFrames={RV_DURATIONS.s3}>
      <R3_Reveal_V />
    </Sequence>

    <Sequence from={RV_OFFSETS.s4} durationInFrames={RV_DURATIONS.s4}>
      <R4_Features_V />
    </Sequence>

    <Sequence from={RV_OFFSETS.s6} durationInFrames={RV_DURATIONS.s6}>
      <R6_CTA_V />
    </Sequence>
  </AbsoluteFill>
);
