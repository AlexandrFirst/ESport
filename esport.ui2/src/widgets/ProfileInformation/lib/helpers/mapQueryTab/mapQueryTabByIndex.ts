import { ProfileInfoTab } from "../../../constants/profile-info-tab";

export const mapQueryTabByIndex = (num: number) => {
  switch (num) {
    case 0:
      return ProfileInfoTab.Indentity;
    case 1:
      return ProfileInfoTab.Trainee;
    case 2:
      return ProfileInfoTab.Trainer;
    case 3:
      return ProfileInfoTab.GymAdmin;
    case 4:
      return ProfileInfoTab.OrganizationAdmin;
    default:
      return ProfileInfoTab.Indentity;
  }
};

export const mapQueryTabByName = (tab: ProfileInfoTab | null) => {
  switch (tab) {
    case ProfileInfoTab.Indentity:
      return 0;
    case ProfileInfoTab.Trainee:
      return 1;
    case ProfileInfoTab.Trainer:
      return 2;
    case ProfileInfoTab.GymAdmin:
      return 3;
    case ProfileInfoTab.OrganizationAdmin:
      return 4;
    default:
      return 0;
  }
};
