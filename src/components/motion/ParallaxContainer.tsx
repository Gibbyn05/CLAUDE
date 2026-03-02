// ParallaxContainer — applies a depth offset based on a "camera" offset value.
// speed 0 = stationary, speed 1 = moves with camera, speed 0.3 = slow background layer.

interface ParallaxContainerProps {
  /** Virtual camera offset in pixels (computed by the parent scene). */
  offset: number;
  /** 0 = fixed in place, 1 = moves fully with camera. Default 0.5. */
  speed?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  offset,
  speed = 0.5,
  children,
  style,
}) => (
  <div
    style={{
      transform: `translateX(${offset * speed}px) translateY(${offset * speed * 0.3}px)`,
      ...style,
    }}
  >
    {children}
  </div>
);
