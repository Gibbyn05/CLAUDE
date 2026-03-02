// Scene 2 — Problem (4–9s, 150 frames)
// "Manuelle oppgaver stjeler tid og vekst stopper opp."
// Icons representing repetitive tasks

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";

const ICONS = [
  { emoji: "📋", label: "Manuelle rapporter" },
  { emoji: "📧", label: "E-post-oppfølging" },
  { emoji: "📅", label: "Manuell booking" },
  { emoji: "📊", label: "Spredt data" },
];

interface IconCardProps {
  emoji: string;
  label: string;
  delay: number;
  crossed?: boolean;
}

const IconCard: React.FC<IconCardProps> = ({ emoji, label, delay, crossed = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 18, stiffness: 130, mass: 0.7 },
  });

  const opacity = interpolate(Math.max(0, frame - delay), [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        background: "rgba(255,255,255,0.7)",
        border: "1.5px solid rgba(0,0,0,0.06)",
        borderRadius: 20,
        padding: "28px 32px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        width: 200,
        position: "relative",
      }}
    >
      <div style={{ fontSize: 44 }}>{emoji}</div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#374151",
          textAlign: "center",
          fontFamily: "'SF Pro Text', 'Inter', 'Helvetica Neue', sans-serif",
          textDecoration: crossed ? "line-through" : "none",
          opacity: crossed ? 0.4 : 1,
        }}
      >
        {label}
      </div>

      {/* Red X overlay for "broken" feel */}
      {crossed && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: 20,
            color: "#EF4444",
          }}
        >
          ✕
        </div>
      )}
    </div>
  );
};

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [135, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineProgress = spring({ frame, fps, config: { damping: 20, stiffness: 110 } });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <Background variant="light" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          padding: "0 120px",
        }}
      >
        {/* Headline */}
        <div
          style={{
            opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(headlineProgress, [0, 1], [-30, 0])}px)`,
            fontSize: 60,
            fontWeight: 800,
            color: "#111827",
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
            fontFamily: "'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif",
            maxWidth: 900,
          }}
        >
          Manuelle oppgaver{" "}
          <span style={{ color: "#EF4444" }}>stjeler tid</span>
          {" "}og vekst stopper opp.
        </div>

        {/* Icon cards grid */}
        <div style={{ display: "flex", gap: 24 }}>
          {ICONS.map((icon, i) => (
            <IconCard
              key={icon.label}
              emoji={icon.emoji}
              label={icon.label}
              delay={20 + i * 12}
              crossed
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
