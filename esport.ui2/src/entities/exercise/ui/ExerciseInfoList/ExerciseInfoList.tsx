import React, { FC, ReactNode } from "react";
import styles from "./ExerciseInfoList.module.css";

import { IExerciseInfo } from "../../model/types/exercise-info";
import { Card } from "@/shared/ui";
import { ExerciseInfoListItem } from "./ExerciseInfoListItem";

interface ExerciseListProps {
  className?: string;
  list: IExerciseInfo[];
  emptyState?: ReactNode;
}

export const ExerciseInfoList: FC<ExerciseListProps> = ({
  className,
  list,
  emptyState = "Empty",
}) => {
  return !list.length ? (
    <Card>{emptyState}</Card>
  ) : (
    <ul className={styles.wrapper}>
      {list.map((exercise) => (
        <ExerciseInfoListItem key={exercise.Name} item={exercise} />
      ))}
    </ul>
  );
};
