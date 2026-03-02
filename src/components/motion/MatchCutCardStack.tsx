// MatchCutCardStack — UI cards that can be animated between two layout states
// ('stack' = vertical pile / 'grid' = arranged dashboard tiles).
// Use the same component in adjacent scenes with matching hard-coded positions
// to create a visual match-cut across the scene boundary.

import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { T } from '../../constants/theme';

export interface CardItem {
  id: string;
  icon: string;
  label: string;
}

interface LayoutPos { x: number; y: number; scale?: number; opacity?: number; rotate?: number }

export type StackLayout = 'stack' | 'compress' | 'grid';

interface MatchCutCardStackProps {
  cards: CardItem[];
  /** Layout at the start of the animation window. */
  fromLayout: StackLayout;
  /** Layout at the end of the animation window. */
  toLayout: StackLayout;
  /** How many frames the layout transition takes. */
  transitionDuration?: number;
  /** Delay before transition begins. */
  delay?: number;
  /** Stagger between each card in 'stack' entrance (frames). */
  stagger?: number;
  width?: number;
}

// Layout definitions — positions relative to a reference origin (top-left of the stack)
function getLayout(layout: StackLayout, width: number): LayoutPos[] {
  const cardW = width;

  if (layout === 'stack') {
    return [
      { x: 0,    y: 0,   scale: 1,    opacity: 1, rotate: -1.5 },
      { x: 12,   y: 140, scale: 1,    opacity: 1, rotate:  1.0 },
      { x: -8,   y: 280, scale: 1,    opacity: 1, rotate: -0.8 },
    ];
  }
  if (layout === 'compress') {
    // Cards stack tightly (match-cut ready state)
    return [
      { x: 0, y: 0,  scale: 1,    opacity: 1, rotate: 0 },
      { x: 4, y: 10, scale: 0.96, opacity: 0.7, rotate: 0 },
      { x: 8, y: 20, scale: 0.92, opacity: 0.5, rotate: 0 },
    ];
  }
  // grid: three cards spread into a dashboard-style grid
  return [
    { x: 0,           y: 0,   scale: 1, opacity: 1, rotate: 0 },
    { x: cardW + 20,  y: 0,   scale: 1, opacity: 1, rotate: 0 },
    { x: 0,           y: 170, scale: 1, opacity: 1, rotate: 0 },
  ];
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export const MatchCutCardStack: React.FC<MatchCutCardStackProps> = ({
  cards,
  fromLayout,
  toLayout,
  transitionDuration = 40,
  delay = 0,
  stagger = 10,
  width = 440,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const fromPositions = getLayout(fromLayout, width);
  const toPositions   = getLayout(toLayout, width);

  const layoutProgress = spring({
    frame: local,
    fps,
    config: T.spring.smooth,
  });
  const lp = Math.min(layoutProgress, 1);

  return (
    <div style={{ position: 'relative' }}>
      {cards.map((card, i) => {
        const from = fromPositions[i] ?? fromPositions[0];
        const to   = toPositions[i]   ?? toPositions[0];

        const x       = lerp(from.x,       to.x,       lp);
        const y       = lerp(from.y,       to.y,       lp);
        const scale   = lerp(from.scale!,  to.scale!,  lp);
        const opacity = lerp(from.opacity!, to.opacity!, lp);
        const rotate  = lerp(from.rotate!, to.rotate!, lp);

        // Entrance stagger (when fromLayout === 'stack')
        const entranceLocal = Math.max(0, local - i * stagger - (fromLayout !== 'stack' ? 0 : 0));
        const entranceP = interpolate(entranceLocal, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

        return (
          <div
            key={card.id}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width,
              opacity: entranceP * opacity,
              transform: `scale(${scale}) rotate(${rotate}deg)`,
              transformOrigin: '50% 50%',
              background: T.surface1,
              border: `1px solid ${T.border}`,
              borderRadius: 20,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              backdropFilter: 'blur(4px)',
            }}
          >
            <span style={{ fontSize: 38, lineHeight: 1 }}>{card.icon}</span>
            <span
              style={{
                fontSize: T.size.label + 4,
                fontWeight: 600,
                color: T.text,
                fontFamily: T.font,
                whiteSpace: 'pre-line',
                lineHeight: 1.25,
              }}
            >
              {card.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
