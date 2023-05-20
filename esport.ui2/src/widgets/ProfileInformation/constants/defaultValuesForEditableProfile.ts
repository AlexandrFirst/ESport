import { IProfileInfo } from "@/entities/profile";

export const defaultValuesForProfileInfo: IProfileInfo = {
  email: "",
  name: "",
  photoId: null,
  surname: "",
  telephoneNumber: "",
  userId: 0,
};

export const defaultValuesForEditableProfile = {
  userIdentityInfo: defaultValuesForProfileInfo,
  userTraineeInfo: defaultValuesForProfileInfo,
  userTrainerInfo: defaultValuesForProfileInfo,
  userAdminInfo: defaultValuesForProfileInfo,
  userOrganisationAdminInfos: [defaultValuesForProfileInfo],
};
