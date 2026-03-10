// Animated macOS-style cursor for Desktop Chaos scenes.
// Interpolates between waypoints with ease-in-out cubic easing.
// Supports click animations (scale + ripple).

export interface Waypoint {
  x: number;
  y: number;
  /** Frame (absolute to caller's reference) when cursor is at this point */
  t: number;
}

export interface ClickFrame {
  /** Frame when click occurs */
  t: number;
}

interface FakeCursorProps {
  frame: number;
  waypoints: Waypoint[];
  clicks?: ClickFrame[];
  scale?: number;
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function getCursorPos(frame: number, waypoints: Waypoint[]): { x: number; y: number } {
  if (waypoints.length === 0) return { x: 0, y: 0 };
  if (frame <= waypoints[0].t) return { x: waypoints[0].x, y: waypoints[0].y };
  const last = waypoints[waypoints.length - 1];
  if (frame >= last.t) return { x: last.x, y: last.y };

  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    if (frame >= a.t && frame <= b.t) {
      const span = b.t - a.t;
      const raw = span === 0 ? 1 : (frame - a.t) / span;
      const t = easeInOut(Math.min(1, Math.max(0, raw)));
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
      };
    }
  }
  return { x: last.x, y: last.y };
}

export const FakeCursor: React.FC<FakeCursorProps> = ({
  frame,
  waypoints,
  clicks = [],
  scale = 1,
}) => {
  const { x, y } = getCursorPos(frame, waypoints);

  // Determine nearest click and its phase
  let clickPhase = 0;
  let ripplePhase = 0;
  for (const ck of clicks) {
    const df = frame - ck.t;
    if (df >= 0 && df < 12) {
      clickPhase = Math.max(clickPhase, df / 12); // 0→1 over 12f
    }
    if (df >= 0 && df < 20) {
      ripplePhase = Math.max(ripplePhase, df / 20); // 0→1 over 20f
    }
  }

  // Click: cursor shrinks on press then bounces back
  const clickScale = clickPhase < 0.4
    ? 1 - clickPhase * 0.4
    : 1 - (1 - clickPhase) * 0.4;

  const rippleOp = ripplePhase > 0 ? (1 - ripplePhase) * 0.55 : 0;
  const rippleR  = ripplePhase * 36;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top:  y,
        zIndex: 9999,
        pointerEvents: 'none',
        transform: `scale(${scale})`,
        transformOrigin: '0 0',
      }}
    >
      {/* Click ripple */}
      {rippleOp > 0 && (
        <div
          style={{
            position: 'absolute',
            left: -rippleR,
            top:  -rippleR,
            width:  rippleR * 2,
            height: rippleR * 2,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.7)',
            opacity: rippleOp,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Arrow cursor SVG */}
      <svg
        width={28}
        height={34}
        viewBox="0 0 28 34"
        style={{ transform: `scale(${clickScale})`, transformOrigin: '0 0', display: 'block' }}
      >
        <path
          d="M2 2 L2 26 L8 20 L13 30 L17 28 L12 18 L20 18 Z"
          fill="white"
          stroke="rgba(0,0,0,0.6)"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
