import { IProfile, UserTypeEntity } from "@/entities/profile";

export const mapProfileKeyToUserTypeEntity = (
  profileKey: keyof Omit<IProfile, "userIdentityInfo">
): UserTypeEntity => {
  switch (profileKey) {
    case "userOrganisationAdminInfos":
      return UserTypeEntity.Organisator;
    case "userAdminInfo":
      return UserTypeEntity.Admin;
    case "userTrainerInfo":
      return UserTypeEntity.Trainer;
    case "userTraineeInfo":
      return UserTypeEntity.Trainee;
  }
};
