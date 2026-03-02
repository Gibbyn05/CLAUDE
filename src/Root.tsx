import { Composition } from "remotion";
import { KlingVekstPromo } from "./compositions/KlingVekstPromo";

// 35 seconds at 30fps
const DURATION_IN_FRAMES = 1050;
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

export const Root: React.FC = () => {
  return (
    <Composition
      id="KlingVekstPromo"
      component={KlingVekstPromo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
