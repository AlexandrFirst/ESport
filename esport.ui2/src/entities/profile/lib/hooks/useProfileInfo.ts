import { useGetProfileInfo } from "../../api/hooks/useGetProfileInfo";
import { useProfileActions } from "../../model/slices/profileSlice";

export const useProfileInfo = (userId?: string) => {
  const { setProfile } = useProfileActions();

  const {
    data: profile,
    isLoading,
    error,
    isError,
  } = useGetProfileInfo(userId, {
    onSuccess(data) {
      setProfile(data);
    },
  });

  return {
    profile,
    isProfileLoading: isLoading,
    hasTraineeInfo: !!profile?.userTraineeInfo,
    hasTrainerInfo: !!profile?.userTrainerInfo,
    hasGymAdminInfo: !!profile?.userAdminInfo,
    hasOrganizationAdminInfo:
      profile?.userOrganisationAdminInfos &&
      profile.userOrganisationAdminInfos.length > 0,
    isProfileError: isError,
    profileError: error,
  };
};
