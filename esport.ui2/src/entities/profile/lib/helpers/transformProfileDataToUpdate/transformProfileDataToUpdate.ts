import { IProfile } from "../../../model/types/profile";
import { UpdateProfileInfoRequest } from "../../../api/types/types";

export const transformProfileDataToUpdate = (
  data: IProfile,
  overrideLoginInfo: keyof IProfile | null
): UpdateProfileInfoRequest => {
  return {
    updateAdminInfo: data.userAdminInfo && {
      updateUserInfo: {
        ...data.userAdminInfo,
        telephone: data.userAdminInfo?.telephoneNumber,
        overrideIdentityInfo: overrideLoginInfo === "userAdminInfo",
      },
      gymIds: [],
    },
    updateTraineeInfo: data.userTraineeInfo && {
      updateUserInfo: {
        ...data.userTraineeInfo,
        overrideIdentityInfo: overrideLoginInfo === "userTraineeInfo",
      },
    },
    updateTrainerInfo: data.userTrainerInfo && {
      updateUserInfo: {
        ...data.userTrainerInfo,
        overrideIdentityInfo: overrideLoginInfo === "userTrainerInfo",
      },
      trainerSportInfoIds: [],
    },
    updateOrganisationAdminInfo: data.userOrganisationAdminInfos?.[0] && {
      updateUserInfo: {
        ...data.userOrganisationAdminInfos[0],
        overrideIdentityInfo:
          overrideLoginInfo === "userOrganisationAdminInfos",
      },
      organisationId: 0,
    },
  };
};
