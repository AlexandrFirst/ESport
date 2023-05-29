import { IProfile } from "../../../model/types/profile";
import { ITrainerSportInfo } from "../../../model/types/trainer-sport-info";
import { UpdateProfileInfoRequest } from "../../../api/types/types";

import { transformTrainerSportInfo } from "../transformTrainerSportInfo/transformTrainerSportInfo";

interface TransformProfileDataToUpdateParams {
  data: IProfile;
  overrideLoginInfo: keyof IProfile | null;
  trainerSports?: ITrainerSportInfo[];
  organisationAdminOrganisationId: number;
  organisationAdminOrganisationName: string | null;
  organisationAdminOrganisationDescription: string | null;
}

export const transformProfileDataToUpdate = ({
  data,
  overrideLoginInfo,
  trainerSports,
  organisationAdminOrganisationId,
  organisationAdminOrganisationName,
  organisationAdminOrganisationDescription,
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
        telephone: data.userTraineeInfo?.telephoneNumber,
        overrideIdentityInfo: overrideLoginInfo === "userTraineeInfo",
      },
    },
    updateTrainerInfo: data.userTrainerInfo && {
      updateUserInfo: {
        ...data.userTrainerInfo,
        telephone: data.userTrainerInfo?.telephoneNumber,
        overrideIdentityInfo: overrideLoginInfo === "userTrainerInfo",
      },
      trainerSportInfoIds: transformTrainerSportInfo(trainerSports),
    },
    updateOrganisationAdminInfo: data.userOrganisationAdminInfos?.[0]
      ? {
          updateUserInfo: {
            ...data.userOrganisationAdminInfos[0],
            telephone: data.userOrganisationAdminInfos[0].telephoneNumber,
            overrideIdentityInfo:
              overrideLoginInfo === "userOrganisationAdminInfos",
          },
          organisationId:
            organisationAdminOrganisationName ||
            organisationAdminOrganisationDescription
              ? 0
              : organisationAdminOrganisationId,
          organisationName: organisationAdminOrganisationId
            ? null
            : organisationAdminOrganisationName,
          organisationDescription: organisationAdminOrganisationId
            ? null
            : organisationAdminOrganisationDescription,
        }
      : null,
  };
};
