// Scene 1 — Hook (0–4s, 120 frames)
// "Sliter du med å få nok kunder?"

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade entire scene out in last 15 frames
  const sceneOpacity = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main text entrance
  const textProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100, mass: 1 },
  });

  const textScale = interpolate(textProgress, [0, 1], [0.9, 1]);
  const textOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Cursor blink at end of question
  const cursorOpacity = interpolate((frame % 30), [0, 15, 30], [1, 0, 1]);

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <Background variant="light" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 160px",
        }}
      >
        {/* Eyebrow label */}
        <div
          style={{
            opacity: interpolate(frame, [8, 20], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [8, 20], [10, 0], { extrapolateRight: "clamp" })}px)`,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6366F1",
            marginBottom: 28,
            fontFamily: "'SF Pro Text', 'Inter', 'Helvetica Neue', sans-serif",
          }}
        >
          Kling Vekst
        </div>

        {/* Main headline */}
        <div
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            fontSize: 96,
            fontWeight: 800,
            color: "#111827",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            fontFamily: "'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif",
            maxWidth: 1100,
          }}
        >
          Sliter du med å få{" "}
          <span style={{ color: "#6366F1" }}>nok kunder?</span>
          <span style={{ opacity: cursorOpacity, color: "#6366F1" }}>|</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
