// ReachrVideo — 9:16 TikTok/Reels, 25s @ 30fps = 750 frames
//
// Scene timing:
//   S1 Hook        :   0 – 149  (5s)  "Slik ser salg ut uten et system"
//   S2 Problem     : 150 – 269  (4s)  "Leads blir glemt"
//   S3 Solution    : 270 – 449  (6s)  "Meet Reachr"
//   S4 Features    : 450 – 659  (7s)  Lead search / Pipeline / AI email
//   S5 CTA         : 660 – 749  (3s)  "Start gratis på reachr.no"

import { AbsoluteFill, Sequence } from 'remotion';
import { RV_S1_Hook }     from '../scenes/RV_S1_Hook';
import { RV_S2_Problem }  from '../scenes/RV_S2_Problem';
import { RV_S3_Solution } from '../scenes/RV_S3_Solution';
import { RV_S4_Features } from '../scenes/RV_S4_Features';
import { RV_S5_CTA }      from '../scenes/RV_S5_CTA';
import { AudioTrackV2 }   from '../audio/AudioTrackV2';
import { RV2_DUR, RV2_OFF } from '../constants/reachrVideo';

export const ReachrVideo: React.FC = () => (
  <AbsoluteFill>
    <AudioTrackV2 />

    <Sequence from={RV2_OFF.s1} durationInFrames={RV2_DUR.s1}>
      <RV_S1_Hook />
    </Sequence>

    <Sequence from={RV2_OFF.s2} durationInFrames={RV2_DUR.s2}>
      <RV_S2_Problem />
    </Sequence>

    <Sequence from={RV2_OFF.s3} durationInFrames={RV2_DUR.s3}>
      <RV_S3_Solution />
    </Sequence>

    <Sequence from={RV2_OFF.s4} durationInFrames={RV2_DUR.s4}>
      <RV_S4_Features />
    </Sequence>

    <Sequence from={RV2_OFF.s5} durationInFrames={RV2_DUR.s5}>
      <RV_S5_CTA />
    </Sequence>
  </AbsoluteFill>
);
