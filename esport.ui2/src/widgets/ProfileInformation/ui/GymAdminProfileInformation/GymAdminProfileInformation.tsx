import React, { FC } from "react";

import { useGetGyms } from "@/entities/gym";

import { ProfileInfoPerRole } from "../ProfileInfoPerRole/ProfileInfoPerRole";
import { SetLoginDataToggle } from "../SetLoginDataToggle/SetLoginDataToggle";
import { useSelectGymAdminGyms } from "../../model/selectors/selectGymAdminGyms/selectGymAdminGyms";
import { useProfileInfo } from "@/entities/profile";
import { useAuth } from "@/entities/user";
import { BoldText } from "@/shared/ui";

interface GymAdminProfileInformationProps {
  className?: string;
}

export const GymAdminProfileInformation: FC<
  GymAdminProfileInformationProps
> = ({ className }) => {
  const { user } = useAuth();

  const { hasOrganizationAdminInfo, profile } = useProfileInfo({
    userId: user?.id ?? 0,
  });

  const { data: gyms, isLoading: isGymsLoading } = useGetGyms({
    page: 1,
    pageSize: 100,
    gymIds: [],
    organisationIds:
      profile?.userOrganisationAdminInfos?.map(
        ({ gymOrganisationId }) => gymOrganisationId ?? 0
      ) ?? [],
  });

  const gymAdminGyms = useSelectGymAdminGyms();

  return (
    <ProfileInfoPerRole
      profileKey={"userAdminInfo"}
      additionalFieldsAbove={
        <SetLoginDataToggle currentProfile={"userAdminInfo"} />
      }
      withBio
      additionalFieldsBelow={
        hasOrganizationAdminInfo ? (
          <>
            {/*<Autocomplete<ISport>*/}
            {/*    list={sports}*/}
            {/*    value={transformTrainerSportInfoToSport(trainerSports)}*/}
            {/*    displayKey={"id"}*/}
            {/*    displayValue={"name"}*/}
            {/*    loading={isSportsLoading}*/}
            {/*    label={"Sports"}*/}
            {/*    lazy*/}
            {/*    multiple*/}
            {/*    placeholder={"[Swimming, Karate]"}*/}
            {/*    onChange={setTrainerSportsBySports}*/}
            {/*/>*/}
          </>
        ) : (
          <BoldText>
            You have to be in organization to add more information
          </BoldText>
        )
      }
    />
  );
};
