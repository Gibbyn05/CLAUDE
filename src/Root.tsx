import { Composition } from 'remotion';
import { KlingVekstVerticalDark }  from './compositions/KlingVekstPromo';
import { KlingVekstHighMotion }    from './compositions/KlingVekstHighMotion';
import { KlingVekstDarkPremium }   from './compositions/KlingVekstDarkPremium';
import { ReachrPromo }             from './compositions/ReachrPromo';
import { ReachrPromo_V }           from './compositions/ReachrPromo_V';
import { ReachrVideo }             from './compositions/ReachrVideo';
import { ReachrDesktopChaos }      from './compositions/ReachrDesktopChaos';
import { DURATIONS, FPS }          from './constants';
import { HM_DURATIONS }            from './constants/highMotion';
import { R_DURATIONS, RV_DURATIONS } from './constants/reachr';
import { RV2_DUR }                 from './constants/reachrVideo';
import { DC_DUR }                  from './constants/desktopChaos';

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

    <Composition
      id="Reachr-16x9"
      component={ReachrPromo}
      durationInFrames={R_DURATIONS.total}
      fps={30}
      width={1920}
      height={1080}
    />

    <Composition
      id="Reachr-9x16"
      component={ReachrPromo_V}
      durationInFrames={RV_DURATIONS.total}
      fps={30}
      width={1080}
      height={1920}
    />

    <Composition
      id="ReachrVideo"
      component={ReachrVideo}
      durationInFrames={RV2_DUR.total}
      fps={30}
      width={1080}
      height={1920}
    />

    <Composition
      id="ReachrDesktopChaos"
      component={ReachrDesktopChaos}
      durationInFrames={DC_DUR.total}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
