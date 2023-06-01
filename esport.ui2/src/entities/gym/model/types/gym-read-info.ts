import { IGymSports } from "./gym-sports";
import { IGymTrainerSport } from "./gym-trainer-info";

export interface IGymReadInfo {
  onenTime: string;
  closeTime: string;
  organisationId: number;
  gymId: number;
  address: string;
  name: string;
  gymSports: IGymSports[];
  gymTrainerInfos: IGymTrainerSport[];
}
