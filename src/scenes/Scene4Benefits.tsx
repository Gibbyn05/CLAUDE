// Scene 4 — Benefits (14–24s, 300 frames)
// Animated staggered bullet transitions

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";

const BENEFITS = [
  {
    icon: "📈",
    title: "Flere henvendelser",
    desc: "Automatiserte kampanjer som trekker til seg nye kunder — mens du sover.",
    accentColor: "#6366F1",
    delay: 15,
  },
  {
    icon: "🔍",
    title: "Bedre synlighet",
    desc: "Bli funnet på nett av de som allerede leter etter deg.",
    accentColor: "#0EA5E9",
    delay: 85,
  },
  {
    icon: "⏳",
    title: "Mer tid til det som betyr noe",
    desc: "La systemet gjøre jobben. Du fokuserer på kundene.",
    accentColor: "#16A34A",
    delay: 160,
  },
];

interface BenefitRowProps {
  icon: string;
  title: string;
  desc: string;
  accentColor: string;
  delay: number;
}

const BenefitRow: React.FC<BenefitRowProps> = ({ icon, title, desc, accentColor, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const progress = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 110, mass: 0.9 },
  });

  const opacity = interpolate(local, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const x = interpolate(progress, [0, 1], [-60, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "flex-start",
        gap: 28,
        background: "rgba(255,255,255,0.72)",
        border: `1.5px solid ${accentColor}22`,
        borderLeft: `5px solid ${accentColor}`,
        borderRadius: 20,
        padding: "28px 36px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        maxWidth: 900,
        width: "100%",
      }}
    >
      <div style={{ fontSize: 48, lineHeight: 1, marginTop: 2 }}>{icon}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#111827",
            letterSpacing: "-0.02em",
            fontFamily: "'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#6B7280",
            fontWeight: 400,
            lineHeight: 1.5,
            fontFamily: "'SF Pro Text', 'Inter', 'Helvetica Neue', sans-serif",
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
};

export const Scene4Benefits: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneOpacity = interpolate(frame, [280, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <Background variant="light" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          padding: "0 200px",
        }}
      >
        {/* Section header */}
        <div
          style={{
            opacity: headerOpacity,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#6366F1",
            marginBottom: 8,
            fontFamily: "'SF Pro Text', 'Inter', sans-serif",
          }}
        >
          Hva du får
        </div>

        {BENEFITS.map((b) => (
          <BenefitRow key={b.title} {...b} />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
