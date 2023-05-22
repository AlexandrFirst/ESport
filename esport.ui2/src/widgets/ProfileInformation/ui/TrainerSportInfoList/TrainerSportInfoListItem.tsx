import React, { ChangeEvent, FC } from "react";
import styles from "./TrainerSportInfoList.module.css";

import { BoldText, DatePickerBase, InputBase } from "@/shared/ui";

import { ITrainerSportInfo } from "@/entities/profile";
import { useTrainerProfileInformationActions } from "../..";
import { useSelectTrainerSports } from "../../model/selectors/selectTrainerSports/selectTrainerSports";

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
  const { setTrainerSportsByIndex } = useTrainerProfileInformationActions();
  const trainerSports = useSelectTrainerSports();

  const handleChange =
    (key: keyof ITrainerSportInfo) => (e: ChangeEvent<HTMLInputElement>) =>
      setTrainerSportsByIndex({
        value: e.target.value,
        index,
        key,
      });

  return (
    <li className={className}>
      <BoldText className={styles.title}>{trainerSport.name}</BoldText>
      <div className={styles.form}>
        <InputBase
          value={trainerSports[index].level}
          onChange={handleChange("level")}
          label={"Level"}
        />
        <DatePickerBase
          value={trainerSports[index].fromDate}
          label={"Started from"}
          onChange={handleChange("fromDate")}
        />
        <DatePickerBase
          value={trainerSports[index].toDate}
          label={"Finished at"}
          onChange={handleChange("toDate")}
        />
      </div>
    </li>
  );
};
