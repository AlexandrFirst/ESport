import React, { FC } from "react";
import styles from "./TrainerSportInfoList.module.css";

import { BoldText, DatePickerBase, InputBase } from "@/shared/ui";

import { ITrainerSportInfo } from "@/entities/profile";

interface TrainerSportInfoListItemProps {
  trainerSport: Partial<ITrainerSportInfo>;
  index: number;
  className?: string;
}

export const TrainerSportInfoListItem: FC<TrainerSportInfoListItemProps> = ({
  className,
  index,
  trainerSport,
}) => {
  return (
    <li className={className}>
      <BoldText className={styles.title}>{trainerSport.name}</BoldText>
      <div className={styles.form}>
        <InputBase label={"Level"} />
        <DatePickerBase label={"Started from"} />
        <DatePickerBase label={"Finished at"} />
      </div>
    </li>
  );
};
