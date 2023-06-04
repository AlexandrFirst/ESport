import { useGetProfileInfo } from "../../api/hooks/useGetProfileInfo";
import { useProfileActions } from "../../model/slices/profileSlice";
import { getOrganisationAdminInfo } from "../..";
import { isAdminForGyms } from "../helpers/isAdminForGyms/isAdminForGyms";

interface UseProfileInfoParams {
  userId: number;
  forceFetch?: boolean;
  gymIds?: number[];
}

export const useProfileInfo = ({
  userId,
  forceFetch = false,
  gymIds,
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
    profileOrganisationId: getOrganisationAdminInfo(profile)?.organisationId,
    isConfirmedOrgAdmin:
      getOrganisationAdminInfo(profile)?.isConfirmed ?? false,
    //TODO: check with backend
    // isConfirmedGymAdmin: profile?.userAdminInfo?.isConfirmed ?? false,
    isAdminForGyms: isAdminForGyms(profile, gymIds),
    trainerId: profile?.userTrainerInfo?.id,
  };
};
