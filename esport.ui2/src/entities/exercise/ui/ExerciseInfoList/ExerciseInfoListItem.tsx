import React, { FC } from "react";
import styles from "./ExerciseInfoList.module.css";

import { IExerciseInfo } from "../../model/types/exercise-info";
import {
  BoldText,
  Card,
  Collapse,
  CollapseList,
  RegularText,
} from "@/shared/ui";
import { VideoGrid } from "../VideoGrid/VideoGrid";

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
      title: (
        <div>
          <BoldText>Name: {item.name}</BoldText>
          <RegularText>Description: {item.description}</RegularText>
        </div>
      ),
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
