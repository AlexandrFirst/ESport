import { ITrainerSportInfo } from "@/entities/trainer";
import { TrainerSportInfoToUpdate } from "../../../api/types/types";

export const transformTrainerSportInfo = (
  trainerSports?: ITrainerSportInfo[]
): TrainerSportInfoToUpdate[] => {
  return (
    trainerSports?.map(({ sportId, toDate, fromDate, level }) => ({
      sportId,
      level,
      from: new Date(fromDate),
      to: toDate ? new Date(toDate) : undefined,
    })) || []
  );
};
