import React, { FC } from "react";
import { Card } from "@/shared/ui";

import {
  IProfileInfo,
  ProfileDataForm,
  ProfileDataFormProps,
} from "@/entities/profile";

interface ProfileInfoWithCardProps extends ProfileDataFormProps {
  profileInfo?: IProfileInfo;
}

export const ProfileInfoWithCard: FC<ProfileInfoWithCardProps> = ({
  profileInfo,
  ...props
}) => {
  return (
    <Card padding={"md"}>
      <ProfileDataForm {...profileInfo} {...props} />
    </Card>
  );
};
