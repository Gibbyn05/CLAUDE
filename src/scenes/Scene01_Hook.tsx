// Scene 1 — Hook (0–3s, 90 frames)
// TypeWipe headline + sub-line slide-in. CameraRig slow push-in.
// GrainOverlay always present. Exit handled by MaskWipeTransition overlay.

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { TypeWipe }    from '../components/motion/TypeWipe';
import { CameraRig }   from '../components/motion/CameraRig';
import { GrainOverlay } from '../components/motion/GrainOverlay';
import { T }           from '../constants/theme';
import { COPY }        from '../constants/copy';

const SCENE_DUR = 90;

export const Scene01_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-line slides up from below with spring
  const subProgress = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: T.spring.smooth,
  });
  const subY       = interpolate(subProgress, [0, 1], [32, 0]);
  const subOpacity = interpolate(Math.max(0, frame - 32), [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Eyebrow label
  const eyeOpacity = interpolate(frame, [4, 18], [0, 1], { extrapolateRight: 'clamp' });
  const eyeY       = interpolate(frame, [4, 18], [12, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      {/* Background: very dark with a faint warm centre glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, rgba(184,169,138,0.06) 0%, transparent 60%), ${T.bg}`,
        }}
      />

      <GrainOverlay />

      <CameraRig duration={SCENE_DUR} mode="in" intensity={0.7}>
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: `${T.safe.v}px ${T.safe.h}px`,
            gap: 32,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              opacity: eyeOpacity,
              transform: `translateY(${eyeY}px)`,
              fontSize: T.size.label,
              fontWeight: 600,
              color: T.accent,
              letterSpacing: T.tracking.label,
              textTransform: 'uppercase' as const,
              fontFamily: T.font,
            }}
          >
            {COPY.brand}
          </div>

          {/* Headline — TypeWipe clip reveal */}
          <TypeWipe
            delay={8}
            wipeDuration={30}
            trackingSettle
            fromTracking="0.06em"
            toTracking={T.tracking.hero}
            style={{
              fontSize: T.size.hero,
              fontWeight: 900,
              color: T.text,
              lineHeight: 1.04,
              fontFamily: T.font,
              whiteSpace: 'pre-line',
            }}
          >
            {COPY.scene1.headline}
          </TypeWipe>

          {/* Divider line */}
          <div
            style={{
              width: interpolate(Math.max(0, frame - 30), [0, 22], [0, 160], {
                extrapolateRight: 'clamp',
              }),
              height: 1.5,
              background: T.accentDim,
              borderRadius: 1,
            }}
          />

          {/* Sub-line slide up */}
          <div
            style={{
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
              fontSize: T.size.h2,
              fontWeight: 400,
              color: T.textSub,
              lineHeight: 1.35,
              fontFamily: T.font,
              letterSpacing: T.tracking.h2,
              whiteSpace: 'pre-line',
            }}
          >
            {COPY.scene1.sub}
          </div>
        </AbsoluteFill>
      </CameraRig>
    </AbsoluteFill>
  );
};
