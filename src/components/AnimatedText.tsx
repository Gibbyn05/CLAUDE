import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;            // frames before animation starts
  style?: React.CSSProperties;
  animation?: "fade-scale" | "slide-up" | "slide-right";
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  style,
  animation = "fade-scale",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });

  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const transforms: Record<string, string> = {
    "fade-scale": `scale(${interpolate(progress, [0, 1], [0.88, 1])})`,
    "slide-up": `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
    "slide-right": `translateX(${interpolate(progress, [0, 1], [-50, 0])}px)`,
  };

  return (
    <div
      style={{
        opacity,
        transform: transforms[animation],
        ...style,
      }}
    >
      {children}
    </div>
  );
};
