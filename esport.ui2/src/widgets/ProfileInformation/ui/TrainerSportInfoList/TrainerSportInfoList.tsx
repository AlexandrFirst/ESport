import React, { FC } from "react";

import { useSelectTrainerSports } from "../../model/selectors/selectTrainerSports/selectTrainerSports";
import { TrainerSportInfoListItem } from "./TrainerSportInfoListItem";

interface TrainerSportInfoProps {
  className?: string;
}

export const TrainerSportInfoList: FC<TrainerSportInfoProps> = ({
  className,
}) => {
  const trainerSports = useSelectTrainerSports();

  return (
    <ul>
      {trainerSports.map((trainerSport) => (
        <TrainerSportInfoListItem
          key={trainerSport.sportId}
          trainerSport={trainerSport}
        />
      ))}
    </ul>
  );
};
