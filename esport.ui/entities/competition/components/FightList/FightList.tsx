import React from "react";
// import { Bracket, IRenderSeedProps, IRoundProps } from "react-brackets";

import { ICompetitor } from "@entities/competition";

// const rounds: IRoundProps[] = [
//   {
//     title: "Round one",
//     seeds: [
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [{ name: "Team A" }, { name: "Team B" }],
//       },
//       {
//         id: 2,
//         date: new Date().toDateString(),
//         teams: [{ name: "Team C" }, { name: "Team D" }],
//       },
//     ],
//   },
//   {
//     title: "Round two",
//     seeds: [
//       {
//         id: 3,
//         date: new Date().toDateString(),
//         teams: [{ name: "Team A" }, { name: "Team C" }],
//       },
//     ],
//   },
// ];

interface CategoryListProps {
  competitors: ICompetitor[];
}

export const FightList: React.FC<CategoryListProps> = ({ competitors }) => {
  console.log("===competitors===", competitors);

  // function renderSeedComponent({ seed }: IRenderSeedProps) {
  //   console.log("===seed===", seed);
  //   return (
  //     <div>
  //       {seed.teams.map((f) => (
  //         <span>{f.name}</span>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <>
      {/* <Bracket rounds={rounds} /> */}
      {/*<CompetitorItem competitor={competitors[0]} />*/}
      {/*<CompetitorItem competitor={competitors[1]} bottom />*/}
      {/*{competitors.map((f) => (*/}
      {/*  // <div key={f.userId} className={styles.competitor}>*/}
      {/*  //   {f.userId}*/}
      {/*  // </div>*/}
      {/*))}*/}
      {/*<Reorder.Group onReorder={setCompetitors} values={competitors}>*/}
      {/*  {competitors.map((f) => (*/}
      {/*    <Reorder.Item key={f.userId} value={f}>*/}
      {/*      <div className={styles.competitor}>{f.userId}</div>*/}
      {/*    </Reorder.Item>*/}
      {/*  ))}*/}
      {/*</Reorder.Group>*/}
    </>
  );
};

// export default motion(FightList);
