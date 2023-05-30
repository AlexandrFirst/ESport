import { useGetProfileInfo } from "../../api/hooks/useGetProfileInfo";
import { useProfileActions } from "../../model/slices/profileSlice";

interface UseProfileInfoParams {
  userId: number;
  forceFetch?: boolean;
}

export const useProfileInfo = ({
  userId,
  forceFetch = false,
}: UseProfileInfoParams) => {
  const { setProfile } = useProfileActions();

  const {
    data: profile,
    isLoading,
    error,
    isError,
  } = useGetProfileInfo(userId, forceFetch, {
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
    organisationId: profile?.userOrganisationAdminInfos?.[0]?.organisationId,
  };
};
