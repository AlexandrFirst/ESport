import { IProfile, IProfileInfo } from "@/entities/profile";

import { defaultValuesForProfileInfo } from "../../../constants/defaultValuesForEditableProfile";

const getValuesForProfileInfo = (profileInfo: Maybe<IProfileInfo>) => {
  return profileInfo ? profileInfo : defaultValuesForProfileInfo;
};

const getValuesForProfileInfoArr = (profileInfo: Maybe<IProfileInfo[]>) => {
  return profileInfo && profileInfo.length
    ? profileInfo
    : [defaultValuesForProfileInfo];
};

export const getEditableProfile = (profile: IProfile) => {
  return {
    userIdentityInfo: getValuesForProfileInfo(profile.userIdentityInfo),
    userTraineeInfo: getValuesForProfileInfo(profile.userTraineeInfo),
    userTrainerInfo: getValuesForProfileInfo(profile.userTrainerInfo),
    userAdminInfo: getValuesForProfileInfo(profile.userAdminInfo),
    userOrganisationAdminInfos: getValuesForProfileInfoArr(
      profile.userOrganisationAdminInfos
    ),
  };
};
