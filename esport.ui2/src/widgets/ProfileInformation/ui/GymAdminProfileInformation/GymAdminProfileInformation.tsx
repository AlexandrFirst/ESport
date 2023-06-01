import React, { FC, useState } from "react";

import { IGymReadInfo, useGetGyms } from "@/entities/gym";

import { ProfileInfoPerRole } from "../ProfileInfoPerRole/ProfileInfoPerRole";
import { useSelectGymAdminGyms } from "../../model/selectors/selectGymAdminGyms/selectGymAdminGyms";
import { Autocomplete } from "@/shared/ui";
import { useRoleProfileInformationActions } from "../..";
import { transformGymInfoToGymReadInfo } from "../../lib/helpers/transformGymInfoToGymReadInfo/transformGymInfoToGymReadInfo";

interface GymAdminProfileInformationProps {
  className?: string;
}

export const GymAdminProfileInformation: FC<
  GymAdminProfileInformationProps
> = ({ className }) => {
  const [gymsValue, setGymsValue] = useState("");
  const gymAdminGyms = useSelectGymAdminGyms();

  const { data: gyms, isLoading: isGymsLoading } = useGetGyms(
    {
      page: 1,
      pageSize: 1000,
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

  return (
    <ProfileInfoPerRole
      profileKey={"userAdminInfo"}
      withBio
      additionalFieldsBelow={
        <>
          <Autocomplete<IGymReadInfo>
            list={gyms}
            value={transformGymInfoToGymReadInfo(gymAdminGyms)}
            onChange={setGymAdminGyms}
            onInputChange={setGymsValue}
            displayKey={"gymId"}
            displayValue={"name"}
            loading={isGymsLoading}
            label={"Gyms"}
            lazy
            multiple
            placeholder={"[Title of the gym]"}
            additionalDisplayValue={"address"}
            clearSearchOnChange
          />
        </>
      }
    />
  );
};
