import React, { FC } from "react";
import SwipeableViews, { SwipeableViewsProps } from "react-swipeable-views";

import { IRoundProps } from "@entities/competition/types/tournament/round-props";
import { IRenderSeedProps } from "@entities/competition/types/tournament/seed";
import { useMedia } from "@shared/lib/hooks/useMedia";
import { TournamentRound } from "@entities/competition/components/TournamentRound/TournamentRound";
import { TournamentSeedsList } from "@entities/competition/components/TournamentSeedsList/TournamentSeedsList";
import { TournamentSeed } from "@entities/competition/components/TournamentSeed/TournamentSeed";
import { BracketWrapper } from "@entities/competition/components/TournamentBracket/BracketWrapper";

interface TournamentBracketProps {
  // If true, the component direction will be set to RTL
  rtl?: boolean;
  // Array of rounds matching RoundProps shape,
  rounds: IRoundProps[];
  // Single round className
  roundClassName?: string;
  /** @default 992, if you don't want a mobile breakpoint, pass 0 */
  mobileBreakpoint?: number;
  // The whole bracket className
  bracketClassName?: string;
  /** {@link https://github.com/oliviertassinari/react-swipeable-views} to read about it's props  */
  swipeableProps?: SwipeableViewsProps;
  /**
   * @param {string} title string or component passed with each round
   * @param {number} round the current round index
   */
  roundTitleComponent?: (
    title: string | JSX.Element,
    roundIdx: number
  ) => JSX.Element;
  /**
   * @param {object} seed the current seed
   * @param {number} breakpoint the breakpoint used to determine responsive size
   * @param {number} roundIdx the current round index
   */
  renderSeedComponent?: (props: IRenderSeedProps) => JSX.Element;
}

export const TournamentBracket: FC<TournamentBracketProps> = ({
  rounds,
  rtl = false,
  roundClassName,
  bracketClassName,
  swipeableProps = {},
  mobileBreakpoint = 992,
  // renderSeedComponent = renderSeed,
  // roundTitleComponent = renderTitle,
}) => {
  const { isMobile } = useMedia();

  const data = rounds.map((round, roundIdx) => (
    <TournamentRound
      key={round.title}
      className={roundClassName}
      // mobileBreakpoint={mobileBreakpoint}
    >
      {/*{round.title && roundTitleComponent(round.title, roundIdx)}*/}
      <TournamentSeedsList>
        {round.seeds.map((seed, idx) => (
          <TournamentSeed
            key={seed.id}
            seed={seed}
            roundIndex={roundIdx}
            seedIndex={idx}
            rounds={rounds}
          />
        ))}
      </TournamentSeedsList>
    </TournamentRound>
  ));

  if (isMobile) {
    // Since SwipeableViewsProps have an issue that it uses ref inside of it, We need to remove ref from the object
    const { ref, ...rest } = swipeableProps;
    return (
      <BracketWrapper
        className={bracketClassName}
        // dir={rtl ? "rtl" : "ltr"}
        // mobileBreakpoint={mobileBreakpoint}
      >
        <SwipeableViews
          style={{ minHeight: "500px" }}
          axis={rtl ? "x-reverse" : "x"}
          {...rest}
        >
          {data}
        </SwipeableViews>
      </BracketWrapper>
    );
  }

  return (
    <BracketWrapper
      className={bracketClassName}
      // dir={rtl ? "rtl" : "ltr"}
      // mobileBreakpoint={mobileBreakpoint}
    >
      {data}
    </BracketWrapper>
  );
};
