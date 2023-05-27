import React, { FC } from "react";

import { BoldText, Button } from "@/shared/ui";
import { IProfile } from "@/entities/profile";

import { useProfileInformationActions } from "../../model/slices/ProfileInformationSlice";

interface NoDataProps {
  name: keyof IProfile;
  className?: string;
}

export const NoData: FC<NoDataProps> = ({ className, name }) => {
  const { setEditableProfileNotToNull } = useProfileInformationActions();

  const handleSetData = () => {
    setEditableProfileNotToNull(name);
  };
  return (
    <div className={"flex items-center justify-between"}>
      <BoldText>No data</BoldText>
      <Button
        fullWidth={false}
        variant={"outlined"}
        color={"theme-main"}
        onClick={handleSetData}
      >
        Set data
      </Button>
    </div>
  );
};
