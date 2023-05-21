import { ISport } from "@/entities/sport";

export const transformSportToTrainerSportInfo = (sports: ISport[]) => {
  return sports.map((sport) => ({
    name: sport.name,
    fromDate: new Date(),
    level: "",
  }));
};
