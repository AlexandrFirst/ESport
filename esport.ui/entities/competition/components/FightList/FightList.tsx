import React, { FC, useState } from "react";
// import { Bracket, IRenderSeedProps, IRoundProps } from "react-brackets";
import { ICompetitor } from "@entities/competition";
import { IRoundProps } from "@entities/competition/types/tournament/round-props";
import { useForm } from "react-hook-form";
import { SportForm } from "@features/SportForm";
import { TournamentGrid } from "@entities/competition/components/testChatGPT";

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

  const methods = useForm();
  return (
    <SportForm methods={methods}>
      {/*<TournamentBracket rounds={rounds} />*/}
      <TournamentGrid
        rounds={[
          {
            id: "1",
            name: "Round 1",
            participants: [
              {
                id: "1",
                name: "Bob",
              },
              {
                id: "2",
                name: "Alice",
              },
              {
                id: "3",
                name: "Mark",
              },
            ],
          },
          {
            id: "2",
            name: "Round 2",
            participants: [
              {
                id: "1",
                name: "Bob",
              },
              {
                id: "2",
                name: "Alice",
              },
              {
                id: "3",
                name: "Mark",
              },
            ],
          },
        ]}
        // rounds={rounds}
      />
    </SportForm>
  );
};

// export default motion(FightList);
