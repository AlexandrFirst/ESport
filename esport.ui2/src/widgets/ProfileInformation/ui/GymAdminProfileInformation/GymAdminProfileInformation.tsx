import React, { FC } from "react";

import { ProfileInfoPerRole } from "../ProfileInfoPerRole/ProfileInfoPerRole";
import { SetLoginDataToggle } from "../SetLoginDataToggle/SetLoginDataToggle";

interface GymAdminProfileInformationProps {
  className?: string;
}

export const GymAdminProfileInformation: FC<
  GymAdminProfileInformationProps
> = ({ className }) => {
  return (
    <ProfileInfoPerRole
      profileKey={"userAdminInfo"}
      additionalFieldsAbove={
        <SetLoginDataToggle currentProfile={"userAdminInfo"} />
      }
      additionalFieldsBelow={
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
      }
    />
  );
};
