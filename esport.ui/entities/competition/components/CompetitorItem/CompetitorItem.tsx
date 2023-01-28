import React from "react";
import styles from "./competitorItem.module.css";

import { ICompetitor } from "@entities/competition";

interface CompetitorItemProps {
  competitor: ICompetitor;
}

export const CompetitorItem: React.FC<CompetitorItemProps> = ({
  competitor,
}) => {
  return <div className={styles.fight_block}>{competitor.userId}</div>;
};
