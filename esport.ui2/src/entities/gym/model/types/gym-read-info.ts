import { IGymSports } from "./gym-sports";
import { IGymTrainerSport } from "./gym-trainer-info";

export interface IGymReadInfo {
  onenTime: string;
  closeTime: string;
  organisationId: string;
  gymId: string;
  address: string;
  gymSports: IGymSports[];
  gymTrainerInfos: IGymTrainerSport[];
}
