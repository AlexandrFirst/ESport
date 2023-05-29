import React, { FC, useState } from "react";

import { IGymReadInfo, useGetGyms } from "@/entities/gym";

import { ProfileInfoPerRole } from "../ProfileInfoPerRole/ProfileInfoPerRole";
import { useSelectGymAdminGyms } from "../../model/selectors/selectGymAdminGyms/selectGymAdminGyms";
import { Autocomplete } from "@/shared/ui";
import { useRoleProfileInformationActions } from "../..";

interface GymAdminProfileInformationProps {
  className?: string;
}

export const GymAdminProfileInformation: FC<
  GymAdminProfileInformationProps
> = ({ className }) => {
  const [gymsValue, setGymsValue] = useState("");

  const { data: gyms, isLoading: isGymsLoading } = useGetGyms(
    {
      page: 1,
      pageSize: 100,
      gymIds: [],
      organisationIds: [],
      name: gymsValue,
      address: gymsValue,
    },
    {
      select: (data) => data.gymReadInfos,
    }
  );
  const { setGymAdminGyms } = useRoleProfileInformationActions();

  const gymAdminGyms = useSelectGymAdminGyms();

  return (
    <ProfileInfoPerRole
      profileKey={"userAdminInfo"}
      withBio
      additionalFieldsBelow={
        <>
          <Autocomplete<IGymReadInfo>
            list={gyms}
            // value={transformTrainerSportInfoToSport(trainerSports)}
            onChange={setGymAdminGyms}
            onInputChange={setGymsValue}
            displayKey={"gymId"}
            displayValue={"address"}
            loading={isGymsLoading}
            label={"Gyms"}
            lazy
            multiple
            placeholder={"[Address]"}
          />
        </>
      }
    />
  );
};
