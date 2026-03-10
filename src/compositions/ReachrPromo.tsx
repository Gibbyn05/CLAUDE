// Reachr — 16:9 marketing video, 25s @ 30fps = 750 frames
//
// Scene timing (frames @ 30fps):
//   Scene 1 — Hook         :   0 – 119  (4s)
//   Scene 2 — Pain         : 120 – 209  (3s, 3×30f quick cuts)
//   Scene 3 — Reveal       : 210 – 329  (4s)
//   Scene 4 — Features     : 330 – 599  (9s, 3×90f)
//   Scene 5 — Social Proof : 600 – 659  (2s)
//   Scene 6 — CTA          : 660 – 749  (3s)

import { AbsoluteFill, Sequence } from 'remotion';
import { R1_Hook } from '../scenes/R1_Hook';
import { R2_Pain } from '../scenes/R2_Pain';
import { R3_Reveal } from '../scenes/R3_Reveal';
import { R4_Features } from '../scenes/R4_Features';
import { R5_SocialProof } from '../scenes/R5_SocialProof';
import { R6_CTA } from '../scenes/R6_CTA';
import { R_DURATIONS, R_OFFSETS } from '../constants/reachr';
import { AudioTrack } from '../audio/AudioTrack';

export const ReachrPromo: React.FC = () => (
  <AbsoluteFill>
    <AudioTrack />
    <Sequence from={R_OFFSETS.s1} durationInFrames={R_DURATIONS.s1}>
      <R1_Hook />
    </Sequence>

    <Sequence from={R_OFFSETS.s2} durationInFrames={R_DURATIONS.s2}>
      <R2_Pain />
    </Sequence>

    <Sequence from={R_OFFSETS.s3} durationInFrames={R_DURATIONS.s3}>
      <R3_Reveal />
    </Sequence>

    <Sequence from={R_OFFSETS.s4} durationInFrames={R_DURATIONS.s4}>
      <R4_Features />
    </Sequence>

    <Sequence from={R_OFFSETS.s5} durationInFrames={R_DURATIONS.s5}>
      <R5_SocialProof />
    </Sequence>

    <Sequence from={R_OFFSETS.s6} durationInFrames={R_DURATIONS.s6}>
      <R6_CTA />
    </Sequence>
  </AbsoluteFill>
);
