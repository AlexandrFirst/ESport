import { ISport, SportType } from "@/entities/sport";
import { ITrainerSportInfo } from "@/entities/profile";

export const transformTrainerSportInfoToSport = (
  trainerSportsInfo: Partial<ITrainerSportInfo>[]
): ISport[] => {
  return trainerSportsInfo.map((trainerSport) => ({
    id: trainerSport?.sportId ?? 0,
    name: trainerSport?.name ?? "",
    type: SportType.Team,
    description: "",
  }));
};
