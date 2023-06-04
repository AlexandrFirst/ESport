import { ISport } from "@/entities/sport";
import { ITrainerSportInfo } from "@/entities/trainer";

export const transformSportToTrainerSportInfo = (
  sports: ISport[]
): ITrainerSportInfo[] => {
  return sports.map((sport) => ({
    sportId: sport.id,
    name: sport.name,
    fromDate: "",
    level: "",
  }));
};
