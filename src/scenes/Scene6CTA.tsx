// Scene 6 — CTA (30–35s, 150 frames)
// "Klar for vekst?" + "Book en gratis strategiøkt"

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";
import { Logo } from "../components/Logo";

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // No fade-out — this is the last scene, hold to end

  const headlineProgress = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 20, stiffness: 110, mass: 1 },
  });

  const buttonProgress = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 16, stiffness: 120, mass: 0.8 },
  });

  const logoProgress = spring({
    frame: Math.max(0, frame - 65),
    fps,
    config: { damping: 22, stiffness: 100 },
  });

  // Subtle button pulse after it appears
  const buttonScale = interpolate(
    (Math.max(0, frame - 70) % 60),
    [0, 30, 60],
    [1, 1.025, 1]
  );

  const headlineOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });
  const buttonOpacity = interpolate(Math.max(0, frame - 35), [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoOpacity = interpolate(Math.max(0, frame - 65), [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background variant="gradient-indigo" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {/* Main CTA headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${interpolate(headlineProgress, [0, 1], [30, 0])}px)`,
            fontSize: 100,
            fontWeight: 900,
            color: "#111827",
            textAlign: "center",
            letterSpacing: "-0.035em",
            lineHeight: 1,
            fontFamily: "'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif",
          }}
        >
          Klar for{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            vekst?
          </span>
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: buttonOpacity,
            transform: `translateY(${interpolate(buttonProgress, [0, 1], [20, 0])}px) scale(${buttonScale})`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
              borderRadius: 100,
              padding: "22px 56px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 12px 40px rgba(99,102,241,0.35), 0 2px 8px rgba(99,102,241,0.2)",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.01em",
                fontFamily: "'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif",
              }}
            >
              Book en gratis strategiøkt
            </div>
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.85)" }}>→</div>
          </div>
        </div>

        {/* URL hint */}
        <div
          style={{
            opacity: interpolate(Math.max(0, frame - 80), [0, 20], [0, 1], {
              extrapolateRight: "clamp",
            }),
            fontSize: 22,
            color: "#9CA3AF",
            fontFamily: "'SF Pro Text', 'Inter', sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          klingvekst.no
        </div>

        {/* Logo — bottom center */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `translateY(${interpolate(logoProgress, [0, 1], [16, 0])}px)`,
            position: "absolute",
            bottom: 60,
          }}
        >
          <Logo color="#6366F1" size={36} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
