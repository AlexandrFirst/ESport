import { IGymInfo } from "@/entities/gym";
import { ITrainerSportInfo } from "../../model/types/trainer-sport-info";

export interface IProfile {
  userIdentityInfo?: IProfileInfo;
  userTraineeInfo?: IProfileInfo;
  userTrainerInfo?: ITrainerInfo;
  userAdminInfo?: IGymAdminInfo;
  userOrganisationAdminInfos?: IOrganisationAdminInfo[];
}

export interface IProfileInfo {
  id?: number;
  userId: number;
  name: string;
  surname: string;
  email: string;
  telephoneNumber: string;
  photoId: null;
  info?: string;
}

export interface ITrainerInfo extends IProfileInfo {
  trainerSportInfos: ITrainerSportInfo[];
  trainerGymInfo: IGymInfo[];
}

export interface IGymAdminInfo extends IProfileInfo {
  userGyms: IGymInfo[];
}

export interface IOrganisationAdminInfo extends IProfileInfo {
  organisationId?: number;
  organisationName?: string;
  isConfirmed?: boolean;
}
