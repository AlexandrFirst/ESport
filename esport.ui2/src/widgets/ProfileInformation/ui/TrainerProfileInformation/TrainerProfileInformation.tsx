import React, { FC } from "react";

import { ProfileInfoPerRole } from "../ProfileInfoPerRole/ProfileInfoPerRole";
import { SetLoginDataToggle } from "../SetLoginDataToggle/SetLoginDataToggle";

import { Autocomplete } from "@/shared/ui";
import { useGetAllSports } from "@/entities/sport";

interface TrainerProfileInformationProps {
  className?: string;
}

export const TrainerProfileInformation: FC<TrainerProfileInformationProps> = ({
  className,
}) => {
  const { data: sports, isLoading: isSportsLoading } = useGetAllSports();

  return (
    <>
      <ProfileInfoPerRole
        profileKey={"userTrainerInfo"}
        additionalFieldsAbove={
          <SetLoginDataToggle currentProfile={"userTrainerInfo"} />
        }
        additionalFieldsBelow={
          <Autocomplete
            list={sports}
            displayKey={"id"}
            displayValue={"name"}
            loading={isSportsLoading}
            label={"Sports"}
            lazy
            multiple
            placeholder={"[Swimming, Karate]"}
          />
        }
      />
    </>
  );
};
