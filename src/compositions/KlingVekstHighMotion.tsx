// KlingVekst-HighMotion-9x16 — 9:16 portrait, 24s @ 30fps = 720 frames
//
// Scene timeline:
//   Scene 1 — Hook        :   0 –  60  (2s)
//   Scene 2 — Chaos       :  60 – 180  (4s)
//   Scene 3 — Control     : 180 – 300  (4s)
//   Scene 4 — Product     : 300 – 480  (6s)
//   Scene 5 — Benefits    : 480 – 600  (4s)
//   Scene 6 — CTA         : 600 – 720  (4s)
//
// WhipTransition overlays (12 frames, centred on each boundary):
//   WT1: 54–66   (scene 1 → 2)
//   WT2: 174–186 (scene 2 → 3)
//   WT3: 294–306 (scene 3 → 4)
//   WT4: 474–486 (scene 4 → 5)
//   WT5: 594–606 (scene 5 → 6)

import { AbsoluteFill, Sequence } from 'remotion';
import { HMScene1Hook }     from '../scenes/HMScene1Hook';
import { HMScene2Chaos }    from '../scenes/HMScene2Chaos';
import { HMScene3Control }  from '../scenes/HMScene3Control';
import { HMScene4Product }  from '../scenes/HMScene4Product';
import { HMScene5Benefits } from '../scenes/HMScene5Benefits';
import { HMScene6CTA }      from '../scenes/HMScene6CTA';
import { WhipTransition }   from '../components/motion/WhipTransition';
import { HM_OFFSETS, HM_DURATIONS } from '../constants/highMotion';

const WT = HM_DURATIONS.whip; // 12 frames

export const KlingVekstHighMotion: React.FC = () => (
  <AbsoluteFill style={{ background: '#070710' }}>

    {/* ── Scenes ─────────────────────────────────────────────────────────── */}
    <Sequence from={HM_OFFSETS.scene1} durationInFrames={HM_DURATIONS.scene1}>
      <HMScene1Hook />
    </Sequence>

    <Sequence from={HM_OFFSETS.scene2} durationInFrames={HM_DURATIONS.scene2}>
      <HMScene2Chaos />
    </Sequence>

    <Sequence from={HM_OFFSETS.scene3} durationInFrames={HM_DURATIONS.scene3}>
      <HMScene3Control />
    </Sequence>

    <Sequence from={HM_OFFSETS.scene4} durationInFrames={HM_DURATIONS.scene4}>
      <HMScene4Product />
    </Sequence>

    <Sequence from={HM_OFFSETS.scene5} durationInFrames={HM_DURATIONS.scene5}>
      <HMScene5Benefits />
    </Sequence>

    <Sequence from={HM_OFFSETS.scene6} durationInFrames={HM_DURATIONS.scene6}>
      <HMScene6CTA />
    </Sequence>

    {/* ── WhipTransition overlays at every scene boundary ────────────────── */}
    <Sequence from={HM_OFFSETS.scene2 - WT / 2} durationInFrames={WT}>
      <WhipTransition />
    </Sequence>

    <Sequence from={HM_OFFSETS.scene3 - WT / 2} durationInFrames={WT}>
      <WhipTransition />
    </Sequence>

    <Sequence from={HM_OFFSETS.scene4 - WT / 2} durationInFrames={WT}>
      <WhipTransition />
    </Sequence>

    <Sequence from={HM_OFFSETS.scene5 - WT / 2} durationInFrames={WT}>
      <WhipTransition />
    </Sequence>

    <Sequence from={HM_OFFSETS.scene6 - WT / 2} durationInFrames={WT}>
      <WhipTransition />
    </Sequence>
  </AbsoluteFill>
);
