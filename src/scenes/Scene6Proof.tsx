// Scene 6 — Proof-feel (22–25s, 90 frames)
// "Se veksten i tall" + animated line graph + "+XX%" badge

import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { Graph } from '../components/Graph';
import { Title } from '../components/Title';
import { COLORS, DURATIONS, COPY, SAFE } from '../constants';

export const Scene6Proof: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneOut = interpolate(frame, [DURATIONS.scene6 - 12, DURATIONS.scene6], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOut }}>
      <Background variant="dark-teal" />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${SAFE.v}px ${SAFE.h}px`,
          gap: 56,
        }}
      >
        {/* Headline */}
        <Title delay={0} size={96} glow style={{ maxWidth: 860 }}>
          {COPY.scene6.headline}
        </Title>

        {/* Graph */}
        <Graph delay={10} badge={COPY.scene6.badge} />

        {/* Bottom note */}
        <div
          style={{
            opacity: interpolate(Math.max(0, frame - 60), [0, 16], [0, 1], { extrapolateRight: 'clamp' }),
            fontSize: 30,
            color: COLORS.muted,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.04em',
          }}
        >
          Gjennomsnitt blant Kling Vekst-kunder
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
