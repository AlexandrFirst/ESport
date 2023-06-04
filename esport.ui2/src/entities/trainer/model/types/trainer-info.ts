import { ITrainerSportInfo } from "./trainer-sport-info";

export interface ITrainerInfo {
  name: string;
  id: number;
  email: string;
  trainerSportInfos: ITrainerSportInfo[];
}
