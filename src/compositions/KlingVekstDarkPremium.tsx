// KlingVekst-Dark-Premium-9x16
// 1080×1920 · 26s · 30fps · 780 frames
//
// ─── Scene timeline ────────────────────────────────────────────────────────
//  Scene 1 (Hook)         :   0 –  90  (3s)
//  Scene 2 (Problem)      :  90 – 210  (4s)
//  Scene 3 (Solution)     : 210 – 346  (4s content + 16f push exit)
//  Scene 4 (Deliver)      : 330 – 510  (16f push entrance + 6s content)
//     → S3 + S4 overlap   : 330 – 346  push transition (S3 exits left, S4 enters right)
//  Scene 5 (Benefits)     : 510 – 660  (5s)
//  Scene 6 (CTA)          : 660 – 780  (4s)
//
// ─── Transition overlays ──────────────────────────────────────────────────
//  T1 MaskWipe top→bottom :  82 –  98  (Scene 1 → 2)
//  T2 MaskWipe left→right : 202 – 218  (Scene 2 → 3)
//  T3 (push): built into  : 330 – 346  (S3 exit + S4 entrance, no overlay)
//  T4 MaskWipe diagonal   : 502 – 518  (Scene 4 → 5)
//  T5 MaskWipe left→right : 652 – 668  (Scene 5 → 6 match cut)

import { AbsoluteFill, Sequence } from 'remotion';
import { Scene01_Hook }      from '../scenes/Scene01_Hook';
import { Scene02_Problem }   from '../scenes/Scene02_Problem';
import { Scene03_Solution }  from '../scenes/Scene03_Solution';
import { Scene04_Deliver }   from '../scenes/Scene04_Deliver';
import { Scene05_Benefits }  from '../scenes/Scene05_Benefits';
import { Scene06_CTA }       from '../scenes/Scene06_CTA';
import { MaskWipeTransition } from '../components/motion/MaskWipeTransition';

const TW = 16; // transition window in frames

export const KlingVekstDarkPremium: React.FC = () => (
  <AbsoluteFill style={{ background: '#0A0A0C' }}>

    {/* ── Scenes ──────────────────────────────────────────────────────────── */}
    <Sequence from={0}   durationInFrames={90}>
      <Scene01_Hook />
    </Sequence>

    <Sequence from={90}  durationInFrames={120}>
      <Scene02_Problem />
    </Sequence>

    {/* Scene 3: 136 frames — 120 content + 16 push-exit */}
    <Sequence from={210} durationInFrames={136}>
      <Scene03_Solution />
    </Sequence>

    {/* Scene 4: 180 frames — 16 push-entrance + 164 content
        Starts at 330 so it overlaps Scene 3's last 16 frames (push transition) */}
    <Sequence from={330} durationInFrames={180}>
      <Scene04_Deliver />
    </Sequence>

    <Sequence from={510} durationInFrames={150}>
      <Scene05_Benefits />
    </Sequence>

    <Sequence from={660} durationInFrames={120}>
      <Scene06_CTA />
    </Sequence>

    {/* ── MaskWipeTransition overlays ─────────────────────────────────────── */}

    {/* T1: Scene 1 → 2  (top-to-bottom curtain) */}
    <Sequence from={90 - TW / 2} durationInFrames={TW}>
      <MaskWipeTransition direction="top-to-bottom" />
    </Sequence>

    {/* T2: Scene 2 → 3  (left-to-right curtain) */}
    <Sequence from={210 - TW / 2} durationInFrames={TW}>
      <MaskWipeTransition direction="left-to-right" />
    </Sequence>

    {/* T3: Scene 3 → 4  is a push transition (built into the scenes, no overlay) */}

    {/* T4: Scene 4 → 5  (diagonal mask — left-to-right with skew) */}
    <Sequence from={510 - TW / 2} durationInFrames={TW}>
      <MaskWipeTransition direction="left-to-right" skew={-7} />
    </Sequence>

    {/* T5: Scene 5 → 6  (left-to-right — match cut feel) */}
    <Sequence from={660 - TW / 2} durationInFrames={TW}>
      <MaskWipeTransition direction="left-to-right" />
    </Sequence>
  </AbsoluteFill>
);
