// Scene 2 — Problem (3–7s, 120 frames)
// Text beats appear one at a time. Task cards stagger in then compress
// towards the bottom to prepare for the match-cut to Scene 3.
// GrainOverlay always on.

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { TypeWipe }           from '../components/motion/TypeWipe';
import { MatchCutCardStack }  from '../components/motion/MatchCutCardStack';
import { GrainOverlay }       from '../components/motion/GrainOverlay';
import { T }                  from '../constants/theme';
import { COPY }               from '../constants/copy';

const SCENE_DUR = 120;
const COMPRESS_START = 82; // frame at which cards compress

export const Scene02_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beat 1: "Manuelle oppgaver"
  const beat1Opacity = interpolate(frame, [6, 18], [0, 1], { extrapolateRight: 'clamp' });

  // Beat 2: "stjeler tid" — TypeWipe after beat 1 settles
  const beat2Delay = 32;

  // Cards visible cue
  const cardsOpacity = interpolate(frame, [10, 24], [0, 1], { extrapolateRight: 'clamp' });

  // Match-cut layout transition: stack → compress as scene exits
  const compressProgress = spring({
    frame: Math.max(0, frame - COMPRESS_START),
    fps,
    config: T.spring.smooth,
  });
  const fromLayout = 'stack';
  const toLayout   = compressProgress > 0.01 ? 'compress' : 'stack';

  // Text fades out as cards compress
  const textOpacity = interpolate(frame, [COMPRESS_START, COMPRESS_START + 20], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cards = COPY.scene2.cards.map((c) => ({ id: c.label, icon: c.icon, label: c.label }));

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: T.bg }} />
      <GrainOverlay />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: `${T.safe.v}px ${T.safe.h}px`,
          gap: 24,
        }}
      >
        {/* Text beats */}
        <div
          style={{
            opacity: textOpacity,
            marginTop: 'auto',
            marginBottom: 40,
          }}
        >
          {/* Beat 1 */}
          <div
            style={{
              opacity: beat1Opacity,
              fontSize: T.size.h1,
              fontWeight: 800,
              color: T.text,
              fontFamily: T.font,
              letterSpacing: T.tracking.h1,
              lineHeight: 1.1,
            }}
          >
            {COPY.scene2.beat1}
          </div>

          {/* Beat 2 — TypeWipe */}
          <TypeWipe
            delay={beat2Delay}
            wipeDuration={22}
            style={{
              fontSize: T.size.h1,
              fontWeight: 800,
              color: T.muted,
              fontFamily: T.font,
              letterSpacing: T.tracking.h1,
              lineHeight: 1.1,
            }}
          >
            {COPY.scene2.beat2}
          </TypeWipe>
        </div>

        {/* Task cards — appear with stagger, then compress */}
        <div
          style={{
            opacity: cardsOpacity,
            position: 'relative',
            height: 340,
            flex: 'none',
          }}
        >
          <MatchCutCardStack
            cards={cards}
            fromLayout={fromLayout}
            toLayout={toLayout}
            transitionDuration={30}
            delay={0}
            stagger={14}
            width={880}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
