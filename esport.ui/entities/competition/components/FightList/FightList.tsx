import React from "react";

import { ICompetitor } from "@entities/competition";

interface CategoryListProps {
  competitors: ICompetitor[];
}

export const FightList: React.FC<CategoryListProps> = ({ competitors }) => {
  console.log("===competitors===", competitors);

  return (
    <>
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
