import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

type BackgroundVariant = "light" | "dark" | "gradient-indigo" | "gradient-green";

interface BackgroundProps {
  variant?: BackgroundVariant;
}

const VARIANTS: Record<BackgroundVariant, React.CSSProperties> = {
  light: {
    background: "linear-gradient(145deg, #FAFAF8 0%, #F0EDE6 100%)",
  },
  dark: {
    background: "linear-gradient(145deg, #0F172A 0%, #1E293B 100%)",
  },
  "gradient-indigo": {
    background: "linear-gradient(145deg, #EEF2FF 0%, #E0E7FF 60%, #F0EDE6 100%)",
  },
  "gradient-green": {
    background: "linear-gradient(145deg, #F0FDF4 0%, #DCFCE7 60%, #F0EDE6 100%)",
  },
};

// Subtle animated noise / grain overlay for depth
const Grain: React.FC = () => (
  <AbsoluteFill
    style={{
      opacity: 0.025,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
    }}
  />
);

// Decorative soft circle blobs
const Blobs: React.FC<{ variant: BackgroundVariant }> = ({ variant }) => {
  const frame = useCurrentFrame();
  const breathe = interpolate(frame % 120, [0, 60, 120], [0, 8, 0]);

  const isDark = variant === "dark";
  const blob1Color = isDark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.08)";
  const blob2Color = isDark ? "rgba(16,185,129,0.1)" : "rgba(16,185,129,0.06)";

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: -200 + breathe,
          right: -150,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: blob1Color,
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200 - breathe,
          left: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: blob2Color,
          filter: "blur(80px)",
        }}
      />
    </>
  );
};

export const Background: React.FC<BackgroundProps> = ({ variant = "light" }) => (
  <AbsoluteFill style={VARIANTS[variant]}>
    <Blobs variant={variant} />
    <Grain />
  </AbsoluteFill>
);
