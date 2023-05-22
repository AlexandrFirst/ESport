import React, { FC } from "react";

import { IProfile } from "@/entities/profile";

import {
  ProfileInfoWithCard,
  ProfileInfoWithCardProps,
} from "../ProfileInfoWithCard/ProfileInfoWithCard";

import {
  SetEditableProfileParams,
  useProfileInformationActions,
} from "../../model/slices/ProfileInformationSlice";
import { useSelectEditableProfile } from "../../model/selectors/selectEditableProfile/selectEditableProfile";

interface ProfileInfoPerRoleProps
  extends Pick<
    ProfileInfoWithCardProps,
    "withBio" | "editable" | "additionalFieldsBelow" | "additionalFieldsAbove"
  > {
  profileKey: keyof Omit<IProfile, "userOrganisationAdminInfos">;
  className?: string;
}

export const ProfileInfoPerRole: FC<ProfileInfoPerRoleProps> = ({
  profileKey,
  className,
  ...props
}) => {
  const { setEditableProfileByKey } = useProfileInformationActions();
  const editableProfile = useSelectEditableProfile();

  const handleChange =
    (params: Omit<SetEditableProfileParams, "value">) => (value: string) =>
      setEditableProfileByKey({ ...params, value });

  return (
    <ProfileInfoWithCard
      {...props}
      name={profileKey}
      key={profileKey}
      profileInfo={editableProfile?.[profileKey]}
      onChangeName={handleChange({
        profileKey: profileKey,
        profileInfoKey: "name",
      })}
      onChangeSurname={handleChange({
        profileKey: profileKey,
        profileInfoKey: "surname",
      })}
      onChangeEmail={handleChange({
        profileKey: profileKey,
        profileInfoKey: "email",
      })}
      onChangeTelephoneNumber={handleChange({
        profileKey: profileKey,
        profileInfoKey: "telephoneNumber",
      })}
    />
  );
};
