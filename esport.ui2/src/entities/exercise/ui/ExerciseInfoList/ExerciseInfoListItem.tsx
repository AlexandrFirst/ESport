import React, { FC } from "react";
import styles from "./ExerciseInfoList.module.css";

import { IExerciseInfo } from "../../model/types/exercise-info";

interface ExerciseListItemProps {
  className?: string;
  item: IExerciseInfo;
}

export const ExerciseInfoListItem: FC<ExerciseListItemProps> = ({
  className,
  item,
}) => {
  return <div className={styles.wrapper}>ExerciseList</div>;
};
