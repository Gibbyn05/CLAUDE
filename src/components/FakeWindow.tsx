// Reusable macOS-style floating window component.
// Supports spring entrance, gentle float, and spring exit animations.

import { interpolate, spring } from 'remotion';

export interface FakeWindowProps {
  frame: number;
  fps: number;
  title: string;
  width: number;
  x: number;
  y: number;
  rotation?: number;
  zIndex?: number;
  /** Frame (local to scene) when the window springs in. Default 0. */
  enterAt?: number;
  /** Frame when window starts flying off screen. */
  exitAt?: number;
  /** Pixel offset for exit destination (relative). */
  exitDX?: number;
  exitDY?: number;
  contentBg?: string;
  children: React.ReactNode;
}

export const FakeWindow: React.FC<FakeWindowProps> = ({
  frame, fps, title, width, x, y,
  rotation = 0, zIndex = 1,
  enterAt = 0,
  exitAt, exitDX = 0, exitDY = -1800,
  contentBg = 'white',
  children,
}) => {
  const f = Math.max(0, frame - enterAt);

  // Spring entrance (scale up from 0)
  const enter = spring({ frame: f, fps, config: { damping: 14, stiffness: 80, mass: 0.9 } });
  const enterOp = interpolate(f, [0, 6], [0, 1], { extrapolateRight: 'clamp' });

  // Gentle float after landing
  const floatY = f > 20 ? Math.sin((f - 20) * 0.038 + enterAt * 0.3) * 4 : 0;

  // Exit animation
  let exitTransX = 0, exitTransY = 0, exitOp = 1, exitScale = 1;
  if (exitAt !== undefined && frame >= exitAt) {
    const ef = frame - exitAt;
    const exitS = spring({ frame: ef, fps, config: { damping: 18, stiffness: 180, mass: 1.0 } });
    exitTransX = interpolate(exitS, [0, 1], [0, exitDX]);
    exitTransY = interpolate(exitS, [0, 1], [0, exitDY]);
    exitOp    = interpolate(ef, [0, 14], [1, 0], { extrapolateRight: 'clamp' });
    exitScale = interpolate(exitS, [0, 1], [1, 0.75]);
  }

  const visible = enterOp * exitOp > 0.01;
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x + exitTransX,
        top:  y + floatY + exitTransY,
        width,
        zIndex,
        transform: `scale(${enter * exitScale}) rotate(${rotation}deg)`,
        transformOrigin: 'center 38px',
        opacity: enterOp * exitOp,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.20), 0 4px 16px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.07)',
        userSelect: 'none',
      }}
    >
      {/* macOS title bar */}
      <div
        style={{
          height: 36,
          background: '#EBEBEB',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 7,
          borderBottom: '1px solid rgba(0,0,0,0.09)',
          flexShrink: 0,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', flexShrink: 0 }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E', flexShrink: 0 }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840', flexShrink: 0 }} />
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 13,
            fontWeight: 500,
            color: '#666',
            paddingRight: 30,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </div>
      </div>
      {/* Content */}
      <div style={{ background: contentBg, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};

// ── macOS menubar ─────────────────────────────────────────────────────────────
export const FakeMenuBar: React.FC<{ appName?: string }> = ({ appName = 'Finder' }) => (
  <div
    style={{
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: 28,
      background: 'rgba(230,228,220,0.96)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 14px',
      gap: 18,
      zIndex: 9999,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: 13,
      fontWeight: 500,
      color: '#333',
    }}
  >
    <span style={{ fontWeight: 700 }}>🍎</span>
    <span style={{ fontWeight: 700 }}>{appName}</span>
    <span style={{ fontWeight: 400, color: '#666' }}>Fil</span>
    <span style={{ fontWeight: 400, color: '#666' }}>Rediger</span>
    <span style={{ fontWeight: 400, color: '#666' }}>Vis</span>
    <div style={{ flex: 1 }} />
    <span style={{ fontFamily: 'system-ui', fontSize: 12, color: '#555' }}>🔋 📶 🔊</span>
    <span style={{ fontFamily: 'system-ui', fontSize: 12, color: '#555', fontWeight: 600 }}>10:47</span>
  </div>
);

// ── macOS-style notification popup ───────────────────────────────────────────
export const FakeNotification: React.FC<{
  frame: number; fps: number; delay: number;
  icon: string; appName: string; message: string;
  topOffset?: number;
}> = ({ frame, fps, delay, icon, appName, message, topOffset = 48 }) => {
  const f = Math.max(0, frame - delay);
  if (f === 0 && frame < delay) return null;

  const enter = spring({ frame: f, fps, config: { damping: 18, stiffness: 140 } });
  const slideIn = interpolate(enter, [0, 1], [360, 0]);
  const enterOp  = interpolate(f, [0, 6], [0, 1], { extrapolateRight: 'clamp' });

  // Auto-dismiss after 60 frames
  const df = Math.max(0, f - 62);
  const dismissS = spring({ frame: df, fps, config: { damping: 14, stiffness: 200 } });
  const slideOut = df > 0 ? interpolate(dismissS, [0, 1], [0, 380]) : 0;
  const dismissOp = df > 0 ? interpolate(df, [0, 16], [1, 0], { extrapolateRight: 'clamp' }) : 1;

  if (df > 20) return null;

  return (
    <div
      style={{
        position: 'absolute',
        right: 12,
        top: topOffset,
        width: 340,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        borderRadius: 14,
        padding: '11px 14px',
        boxShadow: '0 8px 28px rgba(0,0,0,0.16)',
        border: '1px solid rgba(0,0,0,0.06)',
        transform: `translateX(${slideIn + slideOut}px)`,
        opacity: enterOp * dismissOp,
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        zIndex: 9990,
      }}
    >
      <div style={{ fontSize: 26, flexShrink: 0, lineHeight: 1 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'system-ui', fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
          {appName}
        </div>
        <div style={{ fontFamily: 'system-ui', fontSize: 13, color: '#333', lineHeight: 1.35 }}>{message}</div>
      </div>
      <div style={{ fontSize: 14, color: '#ccc', flexShrink: 0, marginTop: 1 }}>✕</div>
    </div>
  );
};
