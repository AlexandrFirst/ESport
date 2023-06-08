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

interface ExerciseListItemProps {
  className?: string;
  item: IExerciseInfo;
}

export const ExerciseInfoListItem: FC<ExerciseListItemProps> = ({
  className,
  item,
}) => {
  console.log("===item===", item);
  const list: CollapseList = [
    {
      title: (
        <div>
          <BoldText>Name: {item.name}</BoldText>
          <RegularText>Description: {item.description}</RegularText>
        </div>
      ),
      key: item.description,
      content: (
        <video
          src={`${process.env.NEXT_PUBLIC_API_URL}/exercise-tutorial/${item.exerciseTutorialLinks[0]}`}
          controls
        />
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Card padding={"md"}>
        <Collapse list={list} justifyBetween />
        {/*<video*/}
        {/*  src={`${process.env.NEXT_PUBLIC_API_URL}/exercise-tutorial/${item.exerciseTutorialLinks[0]}`}*/}
        {/*  controls*/}
        {/*/>*/}
      </Card>
    </div>
  );
};
