// KlingVekstPromo — main composition
// 35 seconds @ 30fps = 1050 frames
//
// Scene timing (frames):
//   Scene 1 — Hook          :   0 – 120  (4s)
//   Scene 2 — Problem       : 120 – 270  (5s)
//   Scene 3 — Solution Intro: 270 – 420  (5s)
//   Scene 4 — Benefits      : 420 – 720  (10s)
//   Scene 5 — Social Proof  : 720 – 900  (6s)
//   Scene 6 — CTA           : 900 – 1050 (5s)

import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Hook } from "../scenes/Scene1Hook";
import { Scene2Problem } from "../scenes/Scene2Problem";
import { Scene3Solution } from "../scenes/Scene3Solution";
import { Scene4Benefits } from "../scenes/Scene4Benefits";
import { Scene5SocialProof } from "../scenes/Scene5SocialProof";
import { Scene6CTA } from "../scenes/Scene6CTA";

// Each scene gets its own Sequence so useCurrentFrame() resets to 0
// inside each scene component.

export const KlingVekstPromo: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={120}>
      <Scene1Hook />
    </Sequence>

    <Sequence from={120} durationInFrames={150}>
      <Scene2Problem />
    </Sequence>

    <Sequence from={270} durationInFrames={150}>
      <Scene3Solution />
    </Sequence>

    <Sequence from={420} durationInFrames={300}>
      <Scene4Benefits />
    </Sequence>

    <Sequence from={720} durationInFrames={180}>
      <Scene5SocialProof />
    </Sequence>

    <Sequence from={900} durationInFrames={150}>
      <Scene6CTA />
    </Sequence>
  </AbsoluteFill>
);
