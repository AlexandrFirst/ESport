import React from "react";
import styles from "./competitorItem.module.css";

import { ICompetitor } from "@entities/competition";
import cn from "classnames";

interface CompetitorItemProps {
  competitor: ICompetitor;
  bottom?: boolean;
}

export const CompetitorItem: React.FC<CompetitorItemProps> = ({
  competitor,
  bottom = false,
}) => {
  return (
    <>
      <div className={styles.fight_block_wrapper}>
        <div className={styles.fight_block}>{competitor.userId}</div>
        {/*<div className={styles.line_wrapper}>*/}
        <span className={styles.horizontal_line} />
        <span
          className={cn(styles.vertical_line, { [styles.bottom]: bottom })}
        />
        <span className={cn({ [styles.last_horizontal_line]: !bottom })} />
        {/*</div>*/}
      </div>
    </>
  );
};
