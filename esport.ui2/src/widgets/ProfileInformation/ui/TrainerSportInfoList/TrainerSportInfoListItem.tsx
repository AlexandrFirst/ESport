import React, { FC } from "react";

import { ITrainerSportInfo } from "@/entities/profile";

interface TrainerSportInfoListItemProps {
  trainerSport: Partial<ITrainerSportInfo>;
  className?: string;
}

export const TrainerSportInfoListItem: FC<TrainerSportInfoListItemProps> = ({
  className,
  trainerSport,
}) => {
  return <li></li>;
};
