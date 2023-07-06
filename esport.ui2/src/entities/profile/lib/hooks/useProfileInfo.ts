import { useGetProfileInfo } from "../../api/hooks/useGetProfileInfo";
import { useProfileActions } from "../../model/slices/profileSlice";
import { getOrganisationAdminInfo, IProfile, IProfileInfo } from "../..";
import { isAdminForGyms } from "../helpers/isAdminForGyms/isAdminForGyms";
import { useCallback } from "react";

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

  const isOrgAdminForOrganisations = useCallback(
    (organisationIds: number[]) => {
      return organisationIds.includes(
        getOrganisationAdminInfo(profile)?.organisationId ?? 0
      );
    },
    [profile]
  );

  // return {
  //   profile,
  //   isProfileLoading: isLoading,
  //   hasTraineeInfo: !!profile?.userTraineeInfo,
  //   hasTrainerInfo: !!profile?.userTrainerInfo,
  //   hasGymAdminInfo: !!profile?.userAdminInfo,
  //   hasOrganizationAdminInfo:
  //     profile?.userOrganisationAdminInfos &&
  //     profile.userOrganisationAdminInfos.length > 0,
  //   isProfileError: isError,
  //   profileError: error,
  //   profileOrganisationId: getOrganisationAdminInfo(profile)?.organisationId,
  //   isConfirmedOrgAdmin:
  //     getOrganisationAdminInfo(profile)?.isConfirmed ?? false,
  //   //TODO: check with backend
  //   // isConfirmedGymAdmin: profile?.userAdminInfo?.isConfirmed ?? false,
  //   isConfirmedProfiles,
  //   isAdminForGyms: isAdminForGyms(profile, gymIds),
  //   trainerId: profile?.userTrainerInfo?.id ?? 0,
  //   trainerSports: profile?.userTrainerInfo?.trainerSportInfos ?? [],
  //   isOrgAdminForOrganisations,
  // };

  const mock_profile_info: IProfileInfo = {
    id: 1,
    info: "lalala",
    isProfileConfirmed: true,
    userId: 1,
    name: "lalala",
    email: "lalala@lalala.com",
    photoId: null,
    surname: "lalala",
    telephoneNumber: "lalala",
  };

  const mock_profile: IProfile = {
    userAdminInfo: {
      ...mock_profile_info,
      userGyms: [],
    },
    userTraineeInfo: mock_profile_info,
    userTrainerInfo: {
      ...mock_profile_info,
      trainerGymInfo: [],
      trainerSportInfos: [],
    },
    userIdentityInfo: mock_profile_info,
    userOrganisationAdminInfos: [
      {
        ...mock_profile_info,
        organisationDescription: "lalala",
        organisationId: 1,
        organisationName: "lalala",
        isConfirmed: true,
      },
    ],
  };

  const mock_isConfirmedProfiles = {
    trainee: mock_profile?.userTraineeInfo?.isProfileConfirmed,
    trainer: mock_profile?.userTrainerInfo?.isProfileConfirmed,
    gymAdmin: mock_profile?.userAdminInfo?.isProfileConfirmed,
    organisationAdmin: getOrganisationAdminInfo(mock_profile)?.isConfirmed,
  };

  const mock_isOrgAdminForOrganisations = (organisationIds: number[]) => {
    return organisationIds.includes(
      getOrganisationAdminInfo(mock_profile)?.organisationId ?? 0
    );
  };

  return {
    profile: mock_profile,
    isProfileLoading: false,
    hasTraineeInfo: true,
    hasTrainerInfo: true,
    hasGymAdminInfo: true,
    hasOrganizationAdminInfo: true,
    isProfileError: false,
    profileError: null,
    profileOrganisationId:
      getOrganisationAdminInfo(mock_profile)?.organisationId,
    isConfirmedOrgAdmin:
      getOrganisationAdminInfo(mock_profile)?.isConfirmed ?? false,
    //TODO: check with backend
    // isConfirmedGymAdmin: profile?.userAdminInfo?.isConfirmed ?? false,
    isConfirmedProfiles: mock_isConfirmedProfiles,
    isAdminForGyms: isAdminForGyms(mock_profile, gymIds),
    trainerId: mock_profile?.userTrainerInfo?.id ?? 0,
    trainerSports: mock_profile?.userTrainerInfo?.trainerSportInfos ?? [],
    isOrgAdminForOrganisations: mock_isOrgAdminForOrganisations,
  };
};
