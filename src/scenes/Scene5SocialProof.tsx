// Scene 5 — Social Proof (24–30s, 180 frames)
// "Bedrifter vokser raskere med riktig system."
// Animated upward graph line

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";

// SVG graph — cubic bezier growth curve points
const GRAPH_WIDTH = 640;
const GRAPH_HEIGHT = 260;

// Control points for a smooth upward curve (normalised 0–1)
const CURVE_POINTS = [
  [0, 1],
  [0.15, 0.88],
  [0.3, 0.72],
  [0.45, 0.55],
  [0.6, 0.35],
  [0.75, 0.18],
  [0.9, 0.06],
  [1, 0],
];

function buildPath(points: number[][], w: number, h: number): string {
  const mapped = points.map(([x, y]) => [x * w, y * h]);
  const d = mapped
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(" ");
  return d;
}

const AnimatedGraph: React.FC = () => {
  const frame = useCurrentFrame();

  // Total path length approximation — we'll animate stroke-dashoffset
  const pathLength = 720;
  const progress = interpolate(frame, [20, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dashOffset = interpolate(progress, [0, 1], [pathLength, 0]);

  const path = buildPath(CURVE_POINTS, GRAPH_WIDTH, GRAPH_HEIGHT);

  // Animated dot at tip of line
  const tipX = interpolate(progress, [0, 1], [0, GRAPH_WIDTH]);
  const tipY = interpolate(progress, [0, 1], [GRAPH_HEIGHT, 0]);
  const dotOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });

  // Glow fill under line
  const fillOpacity = interpolate(progress, [0.3, 1], [0, 0.12], { extrapolateLeft: "clamp" });

  return (
    <div
      style={{
        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
        position: "relative",
      }}
    >
      <svg
        width={GRAPH_WIDTH}
        height={GRAPH_HEIGHT + 20}
        viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT + 20}`}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
          <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Fill area under curve */}
        <path
          d={`${path} L ${GRAPH_WIDTH} ${GRAPH_HEIGHT + 20} L 0 ${GRAPH_HEIGHT + 20} Z`}
          fill="url(#fillGrad)"
          opacity={fillOpacity}
        />

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={0}
            y1={t * GRAPH_HEIGHT}
            x2={GRAPH_WIDTH}
            y2={t * GRAPH_HEIGHT}
            stroke="#E5E7EB"
            strokeWidth={1}
            strokeDasharray="6 4"
          />
        ))}

        {/* Animated growth line */}
        <path
          d={path}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
        />

        {/* Moving dot at line tip */}
        <circle
          cx={tipX}
          cy={tipY}
          r={8}
          fill="#16A34A"
          opacity={dotOpacity}
        />
        <circle
          cx={tipX}
          cy={tipY}
          r={14}
          fill="#16A34A"
          opacity={dotOpacity * 0.25}
        />
      </svg>
    </div>
  );
};

export const Scene5SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [165, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 110 },
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <Background variant="gradient-green" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          padding: "0 160px",
        }}
      >
        {/* Headline */}
        <div
          style={{
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(headlineProgress, [0, 1], [-25, 0])}px)`,
            fontSize: 58,
            fontWeight: 800,
            color: "#111827",
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: "-0.025em",
            fontFamily: "'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif",
            maxWidth: 900,
          }}
        >
          Bedrifter vokser raskere med{" "}
          <span style={{ color: "#16A34A" }}>riktig system.</span>
        </div>

        {/* Graph */}
        <AnimatedGraph />

        {/* Stat chips */}
        <div
          style={{
            display: "flex",
            gap: 20,
            opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {[
            { label: "Kunder i vekst", value: "150+" },
            { label: "Gj.snitt ROI", value: "4.2x" },
            { label: "Tid til første resultat", value: "< 30 dager" },
          ].map((chip) => (
            <div
              key={chip.label}
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1.5px solid rgba(22,163,74,0.2)",
                borderRadius: 12,
                padding: "12px 24px",
                textAlign: "center",
                fontFamily: "'SF Pro Text', 'Inter', sans-serif",
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 800, color: "#16A34A" }}>{chip.value}</div>
              <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 500 }}>{chip.label}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
