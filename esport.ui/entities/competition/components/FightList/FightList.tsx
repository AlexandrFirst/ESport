import React, { FC, useState } from "react";
// import { Bracket, IRenderSeedProps, IRoundProps } from "react-brackets";
import { ICompetitor } from "@entities/competition";
import { IRoundProps } from "@entities/competition/types/tournament/round-props";
import { useForm } from "react-hook-form";
import { SportForm } from "@features/SportForm";
import { TournamentBracket } from "@entities/competition/components/TournamentBracket/TournamentBracket";

const rounds: IRoundProps[] = [
  {
    title: "Round one",
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: "Team A" }, { name: "Team B" }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: "Team C" }, { name: "Team D" }],
      },
    ],
  },
  {
    title: "Round two",
    seeds: [
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: "Team A" }, { name: "Team C" }],
      },
    ],
  },
];

interface CategoryListProps {
  competitors: ICompetitor[];
}

export const FightList: FC<CategoryListProps> = ({ competitors }) => {
  const [state, setState] = useState();

  /*
  *
            {
                id: "1",
                matchups: [
                  {
                    id: "1",
                    participant1: {
                      id: "1",
                      name: "Bob",
                    },
                    participant2: {
                      id: "2",
                      name: "Alice",
                    },
                  },
                ],
              },
* */

  const m = useForm();

  return (
    <SportForm methods={m}>
      <TournamentBracket rounds={rounds} />
    </SportForm>
  );
};

// export default motion(FightList);
