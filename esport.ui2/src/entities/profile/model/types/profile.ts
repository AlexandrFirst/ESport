import { ITrainerSportInfo } from "../../model/types/trainer-sport-info";
import { IGymInfo } from "@/entities/gym";

export interface IProfile {
  userIdentityInfo?: IProfileInfo;
  userTraineeInfo?: IProfileInfo;
  userTrainerInfo?: ITrainerInfo;
  userAdminInfo?: IProfileInfo;
  userOrganisationAdminInfos?: IProfileInfo[];
}

export interface ITrainerInfo extends IProfileInfo {
  trainerSportInfos: ITrainerSportInfo[];
  trainerGymInfo: IGymInfo[];
}

export interface IProfileInfo {
  id?: number;
  userGyms?: number[];
  userId: number;
  name: string;
  surname: string;
  email: string;
  telephoneNumber: string;
  photoId: null;
  gymOrganisationId?: number;
  organisationName?: string;
  info?: string;
}
