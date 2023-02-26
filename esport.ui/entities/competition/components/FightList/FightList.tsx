import React, { FC } from "react";
import { ICompetitor } from "@entities/competition";
import { IRoundProps } from "@entities/competition/types/tournament/round-props";
import { TournamentBracket } from "@entities/competition/components/TournamentBracket/TournamentBracket";

const rounds: IRoundProps[] = [
  {
    title: "Round one",
    rounds: [
      {
        id: 1,
        roundNumber: new Date().toDateString(),
        compatitors: [{ name: "Team A" }, { name: "Team B" }],
      },
      {
        id: 2,
        roundNumber: new Date().toDateString(),
        compatitors: [{ name: "Team C" }, { name: "Team D" }],
      },
    ],
  },
  {
    title: "Round two",
    rounds: [
      {
        id: 3,
        roundNumber: new Date().toDateString(),
        compatitors: [{ name: "Team A" }, { name: "Team C" }],
      },
    ],
  },
];

interface CategoryListProps {
  competitors: ICompetitor[];
}

export const FightList: FC<CategoryListProps> = ({ competitors }) => {
  return (
    <>
      <TournamentBracket rounds={rounds} />
    </>
  );
};

// export default motion(FightList);
