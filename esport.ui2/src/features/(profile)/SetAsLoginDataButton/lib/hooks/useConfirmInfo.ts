import { IProfile, useProfileInfo } from "@/entities/profile";
import { useAuth } from "@/entities/user";

interface UseConfirmInfoProps {
  userId?: number;
  forCurrentUser?: boolean;
  profileKey: keyof Omit<IProfile, "userIdentityInfo">;
}

export const useConfirmInfo = (params?: UseConfirmInfoProps) => {
  const { userId, forCurrentUser, profileKey } = params || {};
  const { user } = useAuth();

  const { isConfirmedProfiles } = useProfileInfo({
    userId: forCurrentUser ? user?.id ?? 0 : userId ?? 0,
  });

  if (profileKey === "userTrainerInfo") {
    return isConfirmedProfiles.trainer;
  }

  if (profileKey === "userTraineeInfo") {
    return isConfirmedProfiles.trainee;
  }

  if (profileKey === "userAdminInfo") {
    return isConfirmedProfiles.gymAdmin;
  }

  if (profileKey === "userOrganisationAdminInfos") {
    return isConfirmedProfiles.organisationAdmin;
  }

  return false;
};
