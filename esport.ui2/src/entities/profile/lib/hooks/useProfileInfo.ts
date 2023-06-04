import { useGetProfileInfo } from "../../api/hooks/useGetProfileInfo";
import { useProfileActions } from "../../model/slices/profileSlice";
import { getOrganisationAdminInfo } from "../..";
import { isAdminForGyms } from "../helpers/isAdminForGyms/isAdminForGyms";

export interface UseProfileInfoParams {
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

  const isConfirmedProfiles = {
    trainee: profile?.userTraineeInfo?.isProfileConfirmed,
    trainer: profile?.userTrainerInfo?.isProfileConfirmed,
    gymAdmin: profile?.userAdminInfo?.isProfileConfirmed,
    organisationAdmin: getOrganisationAdminInfo(profile)?.isConfirmed,
  };

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
    isConfirmedProfiles,
    isAdminForGyms: isAdminForGyms(profile, gymIds),
    trainerId: profile?.userTrainerInfo?.id ?? 0,
  };
};
