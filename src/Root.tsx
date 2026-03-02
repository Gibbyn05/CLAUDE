import { Composition } from 'remotion';
import { KlingVekstVerticalDark } from './compositions/KlingVekstPromo';
import { DURATIONS, FPS } from './constants';

export const Root: React.FC = () => (
  <Composition
    id="KlingVekst-Vertical-Dark"
    component={KlingVekstVerticalDark}
    durationInFrames={DURATIONS.total}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
