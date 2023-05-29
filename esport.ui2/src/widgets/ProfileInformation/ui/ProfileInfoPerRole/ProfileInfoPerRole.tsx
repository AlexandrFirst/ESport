import React, { FC } from "react";

import { ErrorMessage } from "@/shared/types";

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
import { useSelectIsEmailForProfileChanged } from "../../model/selectors/selectIsEmailForProfileChanged/selectIsEmailForProfileChanged";

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
  const { setEditableProfileByKey, setIsEmailForProfileChanged } =
    useProfileInformationActions();

  const editableProfile = useSelectEditableProfile();
  const isEmailChanged = useSelectIsEmailForProfileChanged(profileKey);

  const getEmailError = (): ErrorMessage | undefined => {
    return !editableProfile?.[profileKey]?.isConfirmed || isEmailChanged
      ? {
          message:
            "You can save profile, but you need to confirm your email. Check your inbox!",
        }
      : undefined;
  };

  const handleChange =
    (params: Omit<SetEditableProfileParams, "value">) => (value: string) =>
      setEditableProfileByKey({ ...params, value });

  const handleChangeEmail =
    (params: Omit<SetEditableProfileParams, "value">) => (value: string) => {
      setEditableProfileByKey({ ...params, value });
      setIsEmailForProfileChanged({ key: profileKey, value: true });
    };

  return (
    <ProfileInfoWithCard
      {...props}
      name={profileKey as keyof Omit<IProfile, "userIdentityInfo">}
      key={profileKey}
      profileInfo={editableProfile?.[profileKey]}
      onChangeName={handleChange({
        profileKey,
        profileInfoKey: "name",
      })}
      onChangeSurname={handleChange({
        profileKey,
        profileInfoKey: "surname",
      })}
      onChangeEmail={handleChangeEmail({
        profileKey,
        profileInfoKey: "email",
      })}
      onChangeTelephoneNumber={handleChange({
        profileKey,
        profileInfoKey: "telephoneNumber",
      })}
      emailError={getEmailError()}
    />
  );
};
