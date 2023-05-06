import React, { FC, Fragment } from "react";

import { ICategoryWithRounds } from "../../model/types/category";

import { Round } from "../Round/Round";
import { SeedsList } from "../SeedsList/SeedsList";
import { Seed } from "@/entities/competition/ui/Seed/Seed";
import { SeedItem } from "@/entities/competition/ui/Seed/SeedItem";
import { SeedTeam } from "@/entities/competition/ui/Seed/SeedTeam";
import { SeedTime } from "@/entities/competition/ui/Seed/SeedTime";
import { IFight } from "@/entities/competition";
import { RoundTitle } from "@/entities/competition/ui/Round/RoundTitle";
import { Bracket } from "@/entities/competition/ui/Bracket/Bracket";

interface CompetitionGridProps {
  category?: ICategoryWithRounds;
  className?: string;
}

export const CompetitionGrid: FC<CompetitionGridProps> = ({
  className,
  category,
}) => {
  if (!category) return null;

  const renderSeed = ({ competitors, fightNumber }: IFight) => {
    return (
      <Seed>
        <SeedItem>
          <div>
            <SeedTeam>{competitors?.[0]?._id || "-----------"}</SeedTeam>
            <SeedTeam>{competitors?.[1]?._id || "-----------"}</SeedTeam>
          </div>
        </SeedItem>
        <SeedTime>{fightNumber}</SeedTime>
      </Seed>
    );
  };

  const data = category.rounds.map((round, roundIdx) => (
    <Round
      key={round._id}
      // className={roundClassName}
      // mobileBreakpoint={mobileBreakpoint}
    >
      {round.roundNumber && <RoundTitle>{round.roundNumber}</RoundTitle>}
      <SeedsList>
        {round.fights.map((fight, idx) => {
          return <Fragment key={fight._id}>{renderSeed(fight)}</Fragment>;
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
