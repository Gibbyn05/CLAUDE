// Scene 5 — Benefits (17–22s, 150 frames)
// Bullets enter with TypeWipe. Previous bullets shift up as new ones appear.
// Thin accent line grows under the most-recently-appeared bullet.
// End: bullets fade and a minimal chart line draws (match-cut to Scene 6).

import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring,
} from 'remotion';
import { TypeWipe }     from '../components/motion/TypeWipe';
import { GrainOverlay } from '../components/motion/GrainOverlay';
import { T }            from '../constants/theme';
import { COPY }         from '../constants/copy';

const B_ENTER  = [12, 45, 78];  // frame each bullet enters
const B_GAP    = 140;           // vertical gap between settled bullets
const FADE_OUT = 130;           // frame at which bullets begin fading

// Accent line grows under bullet i after it appears
interface AccentLineProps { delay: number; width: number }
const AccentLine: React.FC<AccentLineProps> = ({ delay, width }) => {
  const frame = useCurrentFrame();
  const lineW = interpolate(Math.max(0, frame - delay - 18), [0, 30], [0, width], {
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        bottom: -6,
        left: 0,
        height: 1.5,
        width: lineW,
        background: T.accent,
        opacity: 0.55,
        borderRadius: 1,
      }}
    />
  );
};

// Chart line that draws at the very end (match-cut prep)
const RisingChart: React.FC = () => {
  const frame = useCurrentFrame();
  const startFrame = 128;
  const local = Math.max(0, frame - startFrame);
  const progress = interpolate(local, [0, 22], [0, 1], { extrapolateRight: 'clamp' });
  const opacity  = interpolate(local, [0, 8, 22], [0, 0.22, 0.22], { extrapolateRight: 'clamp' });
  const W = 920; const H = 220;
  const x2 = progress * W;

  return (
    <svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ position: 'absolute', bottom: T.safe.v, left: T.safe.h, opacity, pointerEvents: 'none' }}
    >
      <line x1={0} y1={H * 0.8} x2={x2} y2={H * 0.2 * progress}
        stroke={T.accent} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
};

export const Scene05_Benefits: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Push-up" shifts: when bullet N+1 appears, all existing bullets shift up by B_GAP/2
  const shiftOnB2 = interpolate(
    spring({ frame: Math.max(0, frame - B_ENTER[1]), fps, config: T.spring.smooth }),
    [0, 1], [0, -B_GAP / 2]
  );
  const shiftOnB3 = interpolate(
    spring({ frame: Math.max(0, frame - B_ENTER[2]), fps, config: T.spring.smooth }),
    [0, 1], [0, -B_GAP / 2]
  );

  // Final Y of each bullet relative to screen centre
  const b0Y = 0         + shiftOnB2 + shiftOnB3;  // 0 → -B_GAP/2 → -B_GAP
  const b1Y = B_GAP / 2 + shiftOnB3;              // +B_GAP/2 → 0
  const b2Y = B_GAP;                               // constant (+B_GAP)

  const bulletYs     = [b0Y, b1Y, b2Y];
  const CONTENT_W    = 1080 - T.safe.h * 2;

  // Fade-out
  const fadeOpacity = interpolate(frame, [FADE_OUT, FADE_OUT + 18], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Eyebrow
  const eyeOpacity = interpolate(frame, [4, 18], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: T.bg }} />
      <GrainOverlay />

      {/* Rising chart (match-cut prep) */}
      <RisingChart />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: `${T.safe.v}px ${T.safe.h}px`,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: eyeOpacity,
            fontSize: T.size.label,
            fontWeight: 600,
            color: T.accent,
            letterSpacing: T.tracking.label,
            textTransform: 'uppercase' as const,
            fontFamily: T.font,
            marginBottom: 'auto',
          }}
        >
          {COPY.scene5.eyebrow}
        </div>

        {/* Bullet stack, vertically centred */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{ opacity: fadeOpacity, position: 'relative', width: '100%' }}>
            {COPY.scene5.bullets.map((text, i) => (
              frame >= B_ENTER[i] && (
                <div
                  key={text}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: `translateY(calc(-50% + ${bulletYs[i]}px))`,
                    width: CONTENT_W,
                  }}
                >
                  {/* Bullet row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      position: 'relative',
                      paddingBottom: 10,
                    }}
                  >
                    {/* Dot marker */}
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: T.accent,
                        opacity: 0.80,
                        flexShrink: 0,
                      }}
                    />

                    {/* Text TypeWipe */}
                    <TypeWipe
                      delay={B_ENTER[i]}
                      wipeDuration={24}
                      style={{
                        fontSize: T.size.h2,
                        fontWeight: 700,
                        color: T.text,
                        fontFamily: T.font,
                        letterSpacing: T.tracking.h2,
                        lineHeight: 1.1,
                      }}
                    >
                      {text}
                    </TypeWipe>

                    {/* Accent underline grows under latest bullet */}
                    {i === Math.min(
                      COPY.scene5.bullets.length - 1,
                      B_ENTER.filter((t) => frame >= t).length - 1
                    ) && (
                      <AccentLine delay={B_ENTER[i]} width={CONTENT_W - 30} />
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
