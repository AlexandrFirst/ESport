import React, { FC } from "react";
import { Card } from "@/shared/ui";

import {
  IProfileInfo,
  ProfileDataForm,
  ProfileDataFormProps,
  ReadonlyProfileInfo,
} from "@/entities/profile";

interface ProfileInfoWithCardProps extends ProfileDataFormProps {
  profileInfo?: IProfileInfo;
  editable?: boolean;
}

export const ProfileInfoWithCard: FC<ProfileInfoWithCardProps> = ({
  profileInfo,
  editable = true,
  ...props
}) => {
  return (
    <Card padding={"md"}>
      {editable ? (
        <ProfileDataForm {...profileInfo} {...props} />
      ) : (
        <ReadonlyProfileInfo profileInfo={profileInfo} />
      )}
    </Card>
  );
};
