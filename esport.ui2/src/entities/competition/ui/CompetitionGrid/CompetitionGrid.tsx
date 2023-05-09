import React, { FC, Fragment } from "react";

import { ICategoryWithRounds } from "../../model/types/category";
import { IFight } from "../../model/types/fight";

import { Round } from "../Round/Round";
import { RoundTitle } from "../Round/RoundTitle";
import { Seed } from "../Seed/Seed";
import { SeedItem } from "../Seed/SeedItem";
import { SeedTeam } from "../Seed/SeedTeam";
import { SeedTime } from "../Seed/SeedTime";
import { SeedsList } from "../SeedsList/SeedsList";
import { Bracket } from "../Bracket/Bracket";

interface CompetitionGridProps {
  category?: ICategoryWithRounds;
  className?: string;
}

export const CompetitionGrid: FC<CompetitionGridProps> = ({ category }) => {
  if (!category) return null;

  const renderFights = ({ competitors, fightNumber }: IFight) => {
    return (
      <Seed>
        <SeedItem>
          <SeedTeam>
            {competitors?.[0]?.teamName ||
              competitors?.[0]?.userId ||
              "-----------"}
          </SeedTeam>
          <SeedTeam>
            {competitors?.[1]?.teamName ||
              competitors?.[1]?.userId ||
              "-----------"}
          </SeedTeam>
        </SeedItem>
        <SeedTime>{fightNumber}</SeedTime>
      </Seed>
    );
  };

  // const getAllRounds = (category: ICategoryWithRounds) => {
  //   const rounds: IRoundWithFights[] = [];
  //   for (let i = 0; i < 3; ++i) {
  //     const prevRounds: IRoundWithFights = category.rounds[i - 1];
  //     const currRounds: IRoundWithFights = category.rounds[i];
  //     if (currRounds && prevRounds) {
  //       break;
  //     }
  //     currRounds.roundNumber = prevRounds?.roundNumber + 1;
  //     currRounds.fights = prevRounds?.fights
  //       .slice(0, Math.floor(prevRounds?.fights.length / 2))
  //       .map((f, idx) => ({
  //         _id: idx.toString(),
  //         fightNumber: 0,
  //         competitors: [],
  //         isProcessed: false,
  //       }));
  //     rounds.push(currRounds);
  //   }
  //   return rounds;
  // };

  const data = category.rounds.map((round) => (
    <Round
      key={round._id}
      // className={roundClassName}
      // mobileBreakpoint={mobileBreakpoint}
    >
      {round.roundNumber && <RoundTitle>{round.roundNumber}</RoundTitle>}
      <SeedsList>
        {round.fights.map((fight) => {
          return <Fragment key={fight._id}>{renderFights(fight)}</Fragment>;
        })}
      </SeedsList>
    </Round>
  ));

  return (
    // <div className={styles.wrapper}>
    <Bracket
    // className={bracketClassName}
    // mobileBreakpoint={mobileBreakpoint}
    // dir={rtl ? "rtl" : "ltr"}
    >
      {data}
    </Bracket>
    // </div>
  );
};
