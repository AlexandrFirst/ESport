import React, { useState } from "react";
import styles from "./fightList.module.css";

import { Reorder } from "framer-motion";

import { ICategory } from "@entities/competition";

interface CategoryListProps {
  category: ICategory;
}

export const FightList: React.FC<CategoryListProps> = ({ category }) => {
  const [competitors, setCompetitors] = useState(() =>
    category.fights.flatMap((f) => f.competitors)
  );

  console.log("===competitors===", competitors);

  return (
    <>
      <Reorder.Group onReorder={setCompetitors} values={competitors}>
        {competitors.map((f) => (
          <Reorder.Item key={f.userId} value={f}>
            <div className={styles.competitor}>{f.userId}</div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
};

// export default motion(FightList);
