import { IProfile } from "../../../model/types/profile";

export const getOrganisationAdminInfo = (profile?: IProfile) => {
  return profile?.userOrganisationAdminInfos?.[0];
};
