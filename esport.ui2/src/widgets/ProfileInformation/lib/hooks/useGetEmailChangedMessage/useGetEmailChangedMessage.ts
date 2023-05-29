import { useSelectIsEmailHaveBeenChanged } from "../../../model/selectors/selectIsEmailHaveBeenChanged/selectIsEmailHaveBeenChanged";
import { IProfile } from "@/entities/profile";
import { Logger } from "@/shared/lib";

const map: Record<keyof Omit<IProfile, "userIdentityInfo">, string> = {
  userTraineeInfo: "Trainee",
  userTrainerInfo: "Trainer",
  userAdminInfo: "Gym Admin",
  userOrganisationAdminInfos: "Organisation Admin",
};

export const useGetEmailChangedMessage = () => {
  const profileKeys = useSelectIsEmailHaveBeenChanged();

  const profiles = Object.entries(profileKeys)
    .map(([key, value]) => {
      if (value) {
        return map[key as keyof Omit<IProfile, "userIdentityInfo">];
      }
    })
    .filter(Boolean)
    .join(", ");

  Logger.Debug(profiles);

  if (profiles) {
    return `You updated email. Please check email inbox you entered to ${profiles}`;
  }

  return "";
};
