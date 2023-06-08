import React, { FC } from "react";
import styles from "./ExerciseInfoList.module.css";

import { IExerciseInfo } from "../../model/types/exercise-info";
import { Card, Collapse, CollapseList } from "@/shared/ui";
import { VideoGrid } from "../VideoGrid/VideoGrid";
import { ExerciseCommonInfo } from "../ExerciseCommonInfo/ExerciseCommonInfo";

interface ExerciseListItemProps {
  className?: string;
  item: IExerciseInfo;
  index?: number;
}

export const ExerciseInfoListItem: FC<ExerciseListItemProps> = ({
  className,
  item,
  index,
}) => {
  const list: CollapseList = [
    {
      title: <ExerciseCommonInfo item={item} />,
      key: index ?? item.name,
      content: <VideoGrid exerciseTutorialLinks={item.exerciseTutorialLinks} />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Card padding={"md"}>
        <Collapse list={list} justifyBetween />
      </Card>
    </div>
  );
};
