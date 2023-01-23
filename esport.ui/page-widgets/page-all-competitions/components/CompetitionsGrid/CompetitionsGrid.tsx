import React from "react";
import styles from "./competitionsGrid.module.scss";

import { SportCard } from "@shared/ui/SportCard/SportCard";
import { CompetitionsTable, ICompetition } from "@entities/competition";
import { SportSearch } from "@widgets/SportSearch/SportSearch";

interface CompetitionsGridProps {
  competitions: ICompetition[];
}

export const CompetitionsGrid: React.FC<CompetitionsGridProps> = ({
  competitions,
}) => {
  return (
    <SportCard>
      <SportSearch className={styles.search} />
      <CompetitionsTable competitions={competitions} />
    </SportCard>
  );
};
