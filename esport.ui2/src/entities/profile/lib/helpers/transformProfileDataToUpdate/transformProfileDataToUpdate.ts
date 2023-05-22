import { IProfile } from "../../../model/types/profile";
import { ITrainerSportInfo } from "../../../model/types/trainer-sport-info";
import { UpdateProfileInfoRequest } from "../../../api/types/types";

import { transformTrainerSportInfo } from "../transformTrainerSportInfo/transformTrainerSportInfo";

interface TransformProfileDataToUpdateParams {
  data: IProfile;
  overrideLoginInfo: keyof IProfile | null;
  trainerSports?: ITrainerSportInfo[];
}

export const transformProfileDataToUpdate = ({
  data,
  overrideLoginInfo,
  trainerSports,
}: TransformProfileDataToUpdateParams): UpdateProfileInfoRequest => {
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
      trainerSportInfoIds: transformTrainerSportInfo(trainerSports),
    },
    updateOrganisationAdminInfo: data.userOrganisationAdminInfos?.[0]
      ? {
          updateUserInfo: {
            ...data.userOrganisationAdminInfos[0],
            overrideIdentityInfo:
              overrideLoginInfo === "userOrganisationAdminInfos",
          },
          organisationId: 0,
        }
      : null,
  };
};
