import React, { FC } from "react";
import { BoldText, Button, Card } from "@/shared/ui";

import {
  IProfile,
  IProfileInfo,
  ProfileDataForm,
  ProfileDataFormProps,
  ReadonlyProfileInfo,
} from "@/entities/profile";
import { useSelectEditableProfile } from "../../model/selectors/selectEditableProfile/selectEditableProfile";
import { useProfileInformationActions } from "../..";

interface ProfileInfoWithCardProps extends ProfileDataFormProps {
  profileInfo?: IProfileInfo;
  name: keyof IProfile;
  editable?: boolean;
}

export const ProfileInfoWithCard: FC<ProfileInfoWithCardProps> = ({
  profileInfo,
  editable = true,
  name,
  ...props
}) => {
  const { setEditableProfileNotToNull } = useProfileInformationActions();

  const handleSetData = () => {
    setEditableProfileNotToNull(name);
  };

  return (
    <Card padding={"md"}>
      {editable ? (
        profileInfo ? (
          <ProfileDataForm {...profileInfo} {...props} />
        ) : (
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
        )
      ) : (
        <ReadonlyProfileInfo profileInfo={profileInfo} />
      )}
    </Card>
  );
};
