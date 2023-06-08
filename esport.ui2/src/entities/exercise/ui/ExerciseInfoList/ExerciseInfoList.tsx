import React, { FC, ReactNode } from "react";
import styles from "./ExerciseInfoList.module.css";

import { BeatLoader } from "react-spinners";

import { Card } from "@/shared/ui";
import { LoaderColor } from "@/shared/constants";

import { IExerciseInfo } from "../../model/types/exercise-info";
import { ExerciseInfoListItem } from "./ExerciseInfoListItem";

interface ExerciseListProps {
  className?: string;
  list: IExerciseInfo[];
  emptyState?: ReactNode;
  isLoading?: boolean;
}

export const ExerciseInfoList: FC<ExerciseListProps> = ({
  className,
  list,
  emptyState = "Empty",
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className={"flex justify-center mt-3"}>
        <BeatLoader color={LoaderColor} />
      </div>
    );
  }

  return !list.length ? (
    <Card>{emptyState}</Card>
  ) : (
    <ul className={styles.wrapper}>
      {list.map((exercise, index) => (
        <ExerciseInfoListItem
          key={exercise.exerciseTutorialLinks[0] ?? exercise.name}
          item={exercise}
          index={index}
        />
      ))}
    </ul>
  );
};
