// ReachrDesktopChaos — 9:16 TikTok/Reels, 25s @ 30fps = 750 frames
//
// Scene timing:
//   S1 Chaos    :   0 – 179  (6s)  Desktop windows mayhem
//   S2 Lost     : 180 – 299  (4s)  Lead slips through
//   S3 Reachr   : 300 – 449  (5s)  Chaos clears, Reachr enters
//   S4 Workflow : 450 – 629  (6s)  Clean features: search / pipeline / AI email
//   S5 CTA      : 630 – 749  (4s)  "Slutt å miste leads. Start gratis."

import { AbsoluteFill, Sequence } from 'remotion';
import { DC_S1_Chaos }   from '../scenes/DC_S1_Chaos';
import { DC_S2_Lost }    from '../scenes/DC_S2_Lost';
import { DC_S3_Reachr }  from '../scenes/DC_S3_Reachr';
import { DC_S4_Workflow } from '../scenes/DC_S4_Workflow';
import { DC_S5_CTA }     from '../scenes/DC_S5_CTA';
import { AudioTrackDC }  from '../audio/AudioTrackDC';
import { DC_DUR, DC_OFF } from '../constants/desktopChaos';

export const ReachrDesktopChaos: React.FC = () => (
  <AbsoluteFill>
    <AudioTrackDC />

    <Sequence from={DC_OFF.s1} durationInFrames={DC_DUR.s1}>
      <DC_S1_Chaos />
    </Sequence>

    <Sequence from={DC_OFF.s2} durationInFrames={DC_DUR.s2}>
      <DC_S2_Lost />
    </Sequence>

    <Sequence from={DC_OFF.s3} durationInFrames={DC_DUR.s3}>
      <DC_S3_Reachr />
    </Sequence>

    <Sequence from={DC_OFF.s4} durationInFrames={DC_DUR.s4}>
      <DC_S4_Workflow />
    </Sequence>

    <Sequence from={DC_OFF.s5} durationInFrames={DC_DUR.s5}>
      <DC_S5_CTA />
    </Sequence>
  </AbsoluteFill>
);
