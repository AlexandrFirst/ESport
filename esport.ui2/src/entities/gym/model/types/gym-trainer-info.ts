import { IGymSports } from "./gym-sports";

export interface IGymTrainerInfo {
  id: number;
  name: string;
  trainerSport: IGymTrainerSport[];
}

export interface IGymTrainerSport extends IGymSports {
  level: string;
}
