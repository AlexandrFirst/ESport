import React, { FC } from "react";
import styles from "./ExerciseCommonInfo.module.css";

import { IExerciseInfo } from "../../model/types/exercise-info";
import { BoldText, RegularText } from "@/shared/ui";
import { ExerciseRelationModel } from "../..";

interface ExerciseCommonInfoProps {
  className?: string;
  item: Omit<IExerciseInfo, "exerciseTutorialLinks">;
}

export const ExerciseCommonInfo: FC<ExerciseCommonInfoProps> = ({
  className,
  item,
}) => {
  return (
    <ul className={styles.wrapper}>
      <li>
        <BoldText size={"xl"}>Name: {item.name}</BoldText>
      </li>
      <li>
        <RegularText>Description: {item.description}</RegularText>
      </li>
      <li>
        <RelationList relations={item.sportRelations} title={"Sports:"} />
      </li>
      <li>
        <RelationList relations={item.bodypartRelation} title={"Body parts:"} />
      </li>
    </ul>
  );
};

const RelationList: FC<{
  relations: ExerciseRelationModel[];
  title?: string;
}> = ({ relations, title }) => {
  return (
    <div className={styles.list}>
      {title && <RegularText>{title}&nbsp;</RegularText>}
      {relations.length ? relations.map(({ name }) => name).join(", ") : "--"}
    </div>
  );
};
