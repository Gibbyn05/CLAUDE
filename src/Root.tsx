import { Composition } from 'remotion';
import { KlingVekstVerticalDark }  from './compositions/KlingVekstPromo';
import { KlingVekstHighMotion }    from './compositions/KlingVekstHighMotion';
import { KlingVekstDarkPremium }   from './compositions/KlingVekstDarkPremium';
import { DURATIONS, FPS }          from './constants';
import { HM_DURATIONS }            from './constants/highMotion';

const DP_FRAMES = 780; // 26s @ 30fps

export const Root: React.FC = () => (
  <>
    <Composition
      id="KlingVekst-Vertical-Dark"
      component={KlingVekstVerticalDark}
      durationInFrames={DURATIONS.total}
      fps={FPS}
      width={1080}
      height={1920}
    />

    <Composition
      id="KlingVekst-HighMotion-9x16"
      component={KlingVekstHighMotion}
      durationInFrames={HM_DURATIONS.total}
      fps={FPS}
      width={1080}
      height={1920}
    />

    <Composition
      id="KlingVekst-Dark-Premium-9x16"
      component={KlingVekstDarkPremium}
      durationInFrames={DP_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  </>
);
