import {ProfileContacts} from "./profile-contacts";

//TODO: remove
export interface IOldProfileToRemove {
  bannerImage?: string;
  avatarImage?: string;
  fullName: string;
  level?: string;
  location?: string;
  lastLogin?: string;
  country?: string;
  contacts?: ProfileContacts;
}

export interface IProfile {
  userIdentityInfo?: IProfileInfo;
  userTraineeInfo?: IProfileInfo;
  userTrainerInfo?: IProfileInfo;
  userAdminInfo?: IProfileInfo;
  userOrganisationAdminInfos?: IProfileInfo[];
}

export interface IProfileInfo {
  id?: number;
  userGyms?: any[];
  userId: number;
  name: string;
  surname: string;
  email: string;
  telephoneNumber: string;
  photoId: null;
  gymOrganisationId?: number;
  organisationName?: null;
  info?: null;
}
