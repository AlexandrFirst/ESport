import { IProfile } from "../../../model/types/profile";
import { UpdateProfileInfoRequest } from "../../../api/types/types";

export const transformProfileDataToUpdate = (
  data: IProfile,
  overrideLoginInfo: keyof IProfile | null
): UpdateProfileInfoRequest => {
  return {
    updateAdmin: {
      ...data.userAdminInfo,
      telephone: data.userAdminInfo?.telephoneNumber,
      overrideIdentityInfo: overrideLoginInfo === "userAdminInfo",
    },
    updateTrainee: {
      ...data.userTraineeInfo,
      overrideIdentityInfo: overrideLoginInfo === "userTraineeInfo",
    },
    updateTrainer: {
      ...data.userTrainerInfo,
      overrideIdentityInfo: overrideLoginInfo === "userTrainerInfo",
    },
    updateOrganisationAdmin: {
      ...data.userOrganisationAdminInfos?.[0],
      overrideIdentityInfo: overrideLoginInfo === "userOrganisationAdminInfos",
      organisationId: 0,
    },
  };
};
