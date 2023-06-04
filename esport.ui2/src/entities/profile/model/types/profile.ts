import { IGymInfo } from "@/entities/gym";
import { ITrainerSportInfo } from "@/entities/trainer";

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
  isProfileConfirmed: boolean;
}

export interface ITrainerInfo extends IProfileInfo {
  trainerSportInfos: ITrainerSportInfo[];
  trainerGymInfo: IGymInfo[];
}

export interface IGymAdminInfo extends IProfileInfo {
  userGyms: (IGymInfo & { isConfirmed?: boolean })[];
}

export interface IOrganisationAdminInfo extends IProfileInfo {
  organisationId: number;
  organisationName: string;
  organisationDescription: string;
  isConfirmed: boolean;
}
