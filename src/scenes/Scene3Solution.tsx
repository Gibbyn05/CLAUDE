// Scene 3 — Solution Intro (9–14s, 150 frames)
// "Møt Kling Vekst" — Logo reveal with smooth slide-up

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [135, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Møt" label slides in first
  const meetProgress = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 22, stiffness: 120 },
  });

  // Logo reveals second
  const logoProgress = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 18, stiffness: 100, mass: 1.2 },
  });

  // Subtext last
  const subProgress = spring({
    frame: Math.max(0, frame - 45),
    fps,
    config: { damping: 20, stiffness: 110 },
  });

  // Divider line expands
  const lineWidth = interpolate(
    Math.max(0, frame - 55),
    [0, 40],
    [0, 480],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <Background variant="gradient-indigo" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {/* "Møt" eyebrow */}
        <div
          style={{
            opacity: interpolate(Math.max(0, frame - 5), [0, 15], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(meetProgress, [0, 1], [20, 0])}px)`,
            fontSize: 28,
            fontWeight: 500,
            color: "#6B7280",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'SF Pro Text', 'Inter', 'Helvetica Neue', sans-serif",
          }}
        >
          Møt
        </div>

        {/* Logo reveal */}
        <div
          style={{
            opacity: interpolate(Math.max(0, frame - 20), [0, 20], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(logoProgress, [0, 1], [40, 0])}px) scale(${interpolate(logoProgress, [0, 1], [0.85, 1])})`,
          }}
        >
          <Logo color="#111827" size={72} />
        </div>

        {/* Animated divider */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: "linear-gradient(90deg, transparent, #6366F1, transparent)",
            borderRadius: 2,
          }}
        />

        {/* Subtext */}
        <div
          style={{
            opacity: interpolate(Math.max(0, frame - 45), [0, 20], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(subProgress, [0, 1], [20, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#111827",
              textAlign: "center",
              letterSpacing: "-0.02em",
              fontFamily: "'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif",
            }}
          >
            Automatiser markedsføring.
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#6366F1",
              textAlign: "center",
              letterSpacing: "-0.02em",
              fontFamily: "'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif",
            }}
          >
            Få flere kunder.
          </div>
        </div>

        {/* Subtle UI mock — floating stats card */}
        <div
          style={{
            opacity: interpolate(Math.max(0, frame - 70), [0, 25], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(
              Math.max(0, frame - 70), [0, 25], [16, 0], { extrapolateRight: "clamp" }
            )}px)`,
            background: "rgba(255,255,255,0.85)",
            border: "1.5px solid rgba(99,102,241,0.15)",
            borderRadius: 16,
            padding: "14px 28px",
            display: "flex",
            gap: 36,
            boxShadow: "0 8px 32px rgba(99,102,241,0.1)",
          }}
        >
          {[
            { value: "+340%", label: "Henvendelser" },
            { value: "3x", label: "Vekst" },
            { value: "80%", label: "Tid spart" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ textAlign: "center", fontFamily: "'SF Pro Text', 'Inter', sans-serif" }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: "#6366F1" }}>{stat.value}</div>
              <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
