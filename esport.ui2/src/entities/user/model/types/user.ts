import { UserRole } from "@/shared/constants";

export interface IUser {
  userIdentityInfo: UserInfo;
  userTraineeInfo: UserInfo;
  userTrainerInfo: UserInfo;
  userAdminInfo: UserInfo;
  userOrganisationAdminInfos: UserInfo[];
}

export interface UserInfo {
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

//TODO: remove
export interface IAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  roles?: UserRole[];
}
