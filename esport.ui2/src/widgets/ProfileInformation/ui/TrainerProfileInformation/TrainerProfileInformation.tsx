import React, { FC } from "react";

import { Autocomplete } from "@/shared/ui";
import { ISport, useGetAllSports } from "@/entities/sport";

import { ProfileInfoPerRole } from "../ProfileInfoPerRole/ProfileInfoPerRole";
import { SetLoginDataToggle } from "../SetLoginDataToggle/SetLoginDataToggle";

import { useTrainerProfileInformationActions } from "../../model/slices/trainerProfileInformationSlice";
import { useSelectTrainerSports } from "../../model/selectors/selectTrainerSports/selectTrainerSports";
import { TrainerSportInfoList } from "../TrainerSportInfoList/TrainerSportInfoList";
import { transformTrainerSportInfoToSport } from "../../lib/helpers/transformTrainerSportInfoToSport/transformTrainerSportInfoToSport";

interface TrainerProfileInformationProps {
  className?: string;
}

export const TrainerProfileInformation: FC<TrainerProfileInformationProps> = ({
  className,
}) => {
  const { data: sports, isLoading: isSportsLoading } = useGetAllSports();

  const { setTrainerSportsBySports } = useTrainerProfileInformationActions();
  const trainerSports = useSelectTrainerSports();

  return (
    <>
      <ProfileInfoPerRole
        profileKey={"userTrainerInfo"}
        additionalFieldsAbove={
          <SetLoginDataToggle currentProfile={"userTrainerInfo"} />
        }
        additionalFieldsBelow={
          <>
            <Autocomplete<ISport>
              list={sports}
              value={transformTrainerSportInfoToSport(trainerSports)}
              displayKey={"id"}
              displayValue={"name"}
              loading={isSportsLoading}
              label={"Sports"}
              lazy
              multiple
              placeholder={"[Swimming, Karate]"}
              onChange={setTrainerSportsBySports}
            />
            <TrainerSportInfoList />
          </>
        }
      />
    </>
  );
};
