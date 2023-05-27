import { IProfile, IProfileInfo } from "@/entities/profile";

export const defaultValuesForProfileInfo: IProfileInfo = {
  email: "",
  name: "",
  photoId: null,
  surname: "",
  telephoneNumber: "",
  userId: 0,
};

export const defaultValuesForEditableProfile: IProfile = {
  userIdentityInfo: defaultValuesForProfileInfo,
  userTraineeInfo: defaultValuesForProfileInfo,
  userTrainerInfo: {
    ...defaultValuesForProfileInfo,
    trainerGymInfo: [],
    trainerSportInfos: [],
  },
  userAdminInfo: {
    ...defaultValuesForProfileInfo,
    userGyms: [],
  },
  userOrganisationAdminInfos: [defaultValuesForProfileInfo],
};
