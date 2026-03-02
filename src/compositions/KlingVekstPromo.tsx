// KlingVekst_Vertical_Dark — 9:16 portrait, dark SaaS, 28s @ 30fps = 840 frames
//
// Scene timing (frames @ 30fps):
//   Scene 1 — Hook      :   0 –  90  (3s)
//   Scene 2 — Pain      :  90 – 210  (4s)
//   Scene 3 — Shift     : 210 – 300  (3s)
//   Scene 4 — Solution  : 300 – 450  (5s)
//   Scene 5 — Benefits  : 450 – 660  (7s)
//   Scene 6 — Proof     : 660 – 750  (3s)
//   Scene 7 — CTA       : 750 – 840  (3s)

import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1Hook } from '../scenes/Scene1Hook';
import { Scene2Pain } from '../scenes/Scene2Pain';
import { Scene3Shift } from '../scenes/Scene3Shift';
import { Scene4Solution } from '../scenes/Scene4Solution';
import { Scene5Benefits } from '../scenes/Scene5Benefits';
import { Scene6Proof } from '../scenes/Scene6Proof';
import { Scene7CTA } from '../scenes/Scene7CTA';
import { OFFSETS, DURATIONS } from '../constants';

// Each Sequence resets useCurrentFrame() to 0 inside the scene component.
export const KlingVekstVerticalDark: React.FC = () => (
  <AbsoluteFill style={{ background: '#08080E' }}>
    <Sequence from={OFFSETS.scene1} durationInFrames={DURATIONS.scene1}>
      <Scene1Hook />
    </Sequence>

    <Sequence from={OFFSETS.scene2} durationInFrames={DURATIONS.scene2}>
      <Scene2Pain />
    </Sequence>

    <Sequence from={OFFSETS.scene3} durationInFrames={DURATIONS.scene3}>
      <Scene3Shift />
    </Sequence>

    <Sequence from={OFFSETS.scene4} durationInFrames={DURATIONS.scene4}>
      <Scene4Solution />
    </Sequence>

    <Sequence from={OFFSETS.scene5} durationInFrames={DURATIONS.scene5}>
      <Scene5Benefits />
    </Sequence>

    <Sequence from={OFFSETS.scene6} durationInFrames={DURATIONS.scene6}>
      <Scene6Proof />
    </Sequence>

    <Sequence from={OFFSETS.scene7} durationInFrames={DURATIONS.scene7}>
      <Scene7CTA />
    </Sequence>
  </AbsoluteFill>
);
