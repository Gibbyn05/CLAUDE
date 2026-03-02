// Scene 4 — What We Deliver (11–17s, 180 frames local)
// First 16 local frames: enters from right (push transition from Scene 3).
// 3 premium UI tiles come from depth with spring + subtle rotation correction.
// CameraRig parallax: background slower, tiles at full speed.
// StudioSweep passes over the tile group.

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { CameraRig }    from '../components/motion/CameraRig';
import { GrainOverlay } from '../components/motion/GrainOverlay';
import { StudioSweep }  from '../components/motion/StudioSweep';
import { T }            from '../constants/theme';
import { COPY }         from '../constants/copy';

const SCENE_DUR    = 180;
const PUSH_ENTER   = 16; // frames for push-in entrance

interface ServiceTileProps {
  icon: string;
  title: string;
  sub: string;
  delay: number;
}

const ServiceTile: React.FC<ServiceTileProps> = ({ icon, title, sub, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  // Comes from depth: starts small + slightly rotated, springs to natural state
  const progress = spring({ frame: local, fps, config: T.spring.depth });

  const scale   = interpolate(progress, [0, 1], [0.82, 1.0]);
  const rotateX = interpolate(progress, [0, 1], [6, 0]); // subtle perspective tilt
  const opacity = interpolate(local, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(progress, [0, 1], [22, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale}) perspective(600px) rotateX(${rotateX}deg)`,
        transformOrigin: '50% 0%',
        background: `linear-gradient(150deg, ${T.surface2}, ${T.surface1})`,
        border: `1px solid ${T.border}`,
        borderRadius: 24,
        padding: '36px 36px',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}
    >
      <span style={{ fontSize: 52, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
      <div>
        <div
          style={{
            fontSize: T.size.h3,
            fontWeight: 700,
            color: T.text,
            fontFamily: T.font,
            letterSpacing: T.tracking.h2,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: T.size.label + 2,
            fontWeight: 400,
            color: T.muted,
            fontFamily: T.font,
            marginTop: 6,
          }}
        >
          {sub}
        </div>
      </div>

      {/* Accent top-border line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 36,
          width: interpolate(local, [0, 30], [0, 40], { extrapolateRight: 'clamp' }),
          height: 2,
          borderRadius: 1,
          background: T.accent,
          opacity: 0.65,
        }}
      />
    </div>
  );
};

export const Scene04_Deliver: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Push-right entrance (first 16 frames) ────────────────────────────────
  const pushX = interpolate(frame, [0, PUSH_ENTER], [1080, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Eyebrow ────────────────────────────────────────────────────────────────
  const eyeOpacity = interpolate(Math.max(0, frame - PUSH_ENTER), [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const eyeY = interpolate(Math.max(0, frame - PUSH_ENTER), [0, 20], [14, 0], {
    extrapolateRight: 'clamp',
  });

  // ── Extra label ────────────────────────────────────────────────────────────
  const extraOpacity = interpolate(Math.max(0, frame - (PUSH_ENTER + 88)), [0, 16], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const tiles = COPY.scene4.tiles;

  return (
    <AbsoluteFill>
      {/* Background — parallax (moves at 0.35× tile speed via CameraRig intensity) */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 30% 60%, rgba(184,169,138,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 20%, rgba(184,169,138,0.04) 0%, transparent 45%),
            ${T.bg}
          `,
        }}
      >
        <CameraRig duration={SCENE_DUR} mode="in" intensity={0.35}>
          {/* Background depth texture — subtle horizontal lines */}
          {[0.28, 0.50, 0.72].map((t) => (
            <div
              key={t}
              style={{
                position: 'absolute',
                top: `${t * 100}%`,
                left: 0,
                right: 0,
                height: 1,
                background: T.divider,
              }}
            />
          ))}
        </CameraRig>
      </AbsoluteFill>

      <GrainOverlay />

      {/* StudioSweep over tiles */}
      <StudioSweep triggerFrame={PUSH_ENTER + 40} duration={40} peakOpacity={0.09} width={500} />

      {/* Main content — pushed in from right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${pushX}px)`,
        }}
      >
        <CameraRig duration={SCENE_DUR} mode="in" intensity={1}>
          <AbsoluteFill
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: `${T.safe.v}px ${T.safe.h}px`,
              gap: 20,
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
                marginBottom: 8,
              }}
            >
              {COPY.scene4.eyebrow}
            </div>

            {/* Tiles */}
            {tiles.map((tile, i) => (
              <div key={tile.title} style={{ position: 'relative' }}>
                <ServiceTile
                  icon={tile.icon}
                  title={tile.title}
                  sub={tile.sub}
                  delay={PUSH_ENTER + i * 18}
                />
              </div>
            ))}

            {/* Extra micro label */}
            <div
              style={{
                opacity: extraOpacity,
                fontSize: T.size.micro,
                fontWeight: 500,
                color: T.dim,
                fontFamily: T.font,
                letterSpacing: '0.08em',
                textAlign: 'center',
                marginTop: 8,
              }}
            >
              {COPY.scene4.extraLabel}
            </div>
          </AbsoluteFill>
        </CameraRig>
      </div>
    </AbsoluteFill>
  );
};
