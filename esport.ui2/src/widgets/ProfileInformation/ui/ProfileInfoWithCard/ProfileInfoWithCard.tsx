import React, { FC } from "react";
import { Card } from "@/shared/ui";

import {
  IProfile,
  IProfileInfo,
  ProfileDataForm,
  ProfileDataFormProps,
  ReadonlyProfileInfo,
} from "@/entities/profile";
import { NoData } from "../NoData/NoData";

export interface ProfileInfoWithCardProps extends ProfileDataFormProps {
  profileInfo?: IProfileInfo;
  name: keyof Omit<IProfile, "userIdentityInfo">;
  editable?: boolean;
}

export const ProfileInfoWithCard: FC<ProfileInfoWithCardProps> = ({
  profileInfo,
  editable = true,
  name,
  ...props
}) => {
  return (
    <Card padding={"md"}>
      {editable ? (
        profileInfo ? (
          <ProfileDataForm {...profileInfo} {...props} />
        ) : (
          <NoData name={name} />
        )
      ) : (
        <ReadonlyProfileInfo profileInfo={profileInfo} />
      )}
    </Card>
  );
};
