// Kling Vekst wordmark — SVG-based, no external assets required

interface LogoProps {
  color?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({
  color = "#111827",
  size = 56,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontFamily: "'SF Pro Display', 'Inter', 'Helvetica Neue', sans-serif",
    }}
  >
    {/* Icon mark — abstract upward arrow / growth symbol */}
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="56" height="56" rx="14" fill={color} />
      {/* Upward growth bars */}
      <rect x="10" y="34" width="8" height="12" rx="2" fill="white" opacity="0.5" />
      <rect x="24" y="24" width="8" height="22" rx="2" fill="white" opacity="0.75" />
      <rect x="38" y="14" width="8" height="32" rx="2" fill="white" />
    </svg>

    {/* Wordmark */}
    <div>
      <div
        style={{
          fontSize: size * 0.75,
          fontWeight: 800,
          color,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        Kling
      </div>
      <div
        style={{
          fontSize: size * 0.38,
          fontWeight: 500,
          color,
          opacity: 0.55,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginTop: 2,
        }}
      >
        Vekst
      </div>
    </div>
  </div>
);
