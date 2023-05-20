import React, { FC } from "react";
import styles from "./ProfileInformation.module.css";

import { BottomNav, TabList, Tabs } from "@/shared/ui";
import { useSnackbar } from "@/shared/lib";

import {
  IProfile,
  ProfileMainInfo,
  transformProfileDataToUpdate,
  useUpdateProfileInfo,
} from "@/entities/profile";

import { ProfileInfoTab } from "../../constants/profile-info-tab";
import {
  SetEditableProfileParams,
  useProfileInformationActions,
} from "../../model/slices/ProfileInformationSlice";
import { useSelectEditableProfile } from "../../model/selectors/selectEditableProfile/selectEditableProfile";
import { useSelectOverrideLoginInfo } from "../../model/selectors/selectOverrideLoginInfo/selectOverrideLoginInfo";
import { ProfileInfoWithCard } from "../ProfileInfoWithCard/ProfileInfoWithCard";
import { SetLoginDataToggle } from "../SetLoginDataToggle/SetLoginDataToggle";

interface ProfileInformationProps {
  profile: IProfile;
  withEditBtn?: boolean;
  onEditClick?: () => void;
  className?: string;
  userId: string;
}

export const ProfileInformation: FC<ProfileInformationProps> = ({
  profile,
  onEditClick,
  withEditBtn,
  userId,
}) => {
  const { setEditableProfileByKey } = useProfileInformationActions();
  const editableProfile = useSelectEditableProfile();
  const overrideLoginInfo = useSelectOverrideLoginInfo();

  const { showError, showSuccess } = useSnackbar();

  const { mutate, isLoading } = useUpdateProfileInfo(userId, {
    onError(e: any) {
      showError(e.message);
    },
    onSuccess() {
      showSuccess("Profile updated successfully");
    },
  });

  const {
    userIdentityInfo,
    userTrainerInfo,
    userAdminInfo,
    userOrganisationAdminInfos,
    userTraineeInfo,
  } = editableProfile;

  const handleChange =
    (params: Omit<SetEditableProfileParams, "value">) => (value: string) =>
      setEditableProfileByKey({ ...params, value });

  const handleSave = async () => {
    console.log(
      "===transformProfileDataToUpdate(editableProfile, overrideLoginInfo)===",
      transformProfileDataToUpdate(editableProfile, overrideLoginInfo)
    );
    try {
      await mutate(
        transformProfileDataToUpdate(editableProfile, overrideLoginInfo)
      );
    } catch (e: any) {
      console.log("===e===", e);
      showError(e.message);
    }
  };

  const tabs: TabList<ProfileInfoTab> = [
    {
      label: "Login Info",
      value: ProfileInfoTab.Indentity,
      content: (
        <ProfileInfoWithCard
          key={"userIdentityInfo"}
          profileInfo={userIdentityInfo}
          editable={false}
          onChangeName={handleChange({
            profileKey: "userIdentityInfo",
            profileInfoKey: "name",
          })}
          onChangeSurname={handleChange({
            profileKey: "userIdentityInfo",
            profileInfoKey: "surname",
          })}
          onChangeEmail={handleChange({
            profileKey: "userIdentityInfo",
            profileInfoKey: "email",
          })}
          onChangeTelephoneNumber={handleChange({
            profileKey: "userIdentityInfo",
            profileInfoKey: "telephoneNumber",
          })}
        />
      ),
    },
    {
      label: "Trainee",
      value: ProfileInfoTab.Trainee,
      content: (
        <ProfileInfoWithCard
          key={"userTraineeInfo"}
          profileInfo={userTraineeInfo}
          onChangeName={handleChange({
            profileKey: "userTraineeInfo",
            profileInfoKey: "name",
          })}
          onChangeSurname={handleChange({
            profileKey: "userTraineeInfo",
            profileInfoKey: "surname",
          })}
          onChangeEmail={handleChange({
            profileKey: "userTraineeInfo",
            profileInfoKey: "email",
          })}
          onChangeTelephoneNumber={handleChange({
            profileKey: "userTraineeInfo",
            profileInfoKey: "telephoneNumber",
          })}
          withBio
          onChangeBio={handleChange({
            profileKey: "userTraineeInfo",
            profileInfoKey: "info",
          })}
          additionalFieldsAbove={
            <SetLoginDataToggle currentProfile={"userTraineeInfo"} />
          }
        />
      ),
    },
    {
      label: "Trainer",
      value: ProfileInfoTab.Trainer,
      content: (
        <ProfileInfoWithCard
          key={"userTrainerInfo"}
          profileInfo={userTrainerInfo}
          onChangeName={handleChange({
            profileKey: "userTrainerInfo",
            profileInfoKey: "name",
          })}
          onChangeSurname={handleChange({
            profileKey: "userTrainerInfo",
            profileInfoKey: "surname",
          })}
          onChangeEmail={handleChange({
            profileKey: "userTrainerInfo",
            profileInfoKey: "email",
          })}
          onChangeTelephoneNumber={handleChange({
            profileKey: "userTrainerInfo",
            profileInfoKey: "telephoneNumber",
          })}
          withBio
          onChangeBio={handleChange({
            profileKey: "userTrainerInfo",
            profileInfoKey: "info",
          })}
          additionalFieldsAbove={
            <SetLoginDataToggle currentProfile={"userTrainerInfo"} />
          }
        />
      ),
    },
    {
      label: "Gym Admin",
      value: ProfileInfoTab.GymAdmin,
      content: (
        <ProfileInfoWithCard
          key={"userAdminInfo"}
          profileInfo={userAdminInfo}
          onChangeName={handleChange({
            profileKey: "userAdminInfo",
            profileInfoKey: "name",
          })}
          onChangeSurname={handleChange({
            profileKey: "userAdminInfo",
            profileInfoKey: "surname",
          })}
          onChangeEmail={handleChange({
            profileKey: "userAdminInfo",
            profileInfoKey: "email",
          })}
          onChangeTelephoneNumber={handleChange({
            profileKey: "userAdminInfo",
            profileInfoKey: "telephoneNumber",
          })}
          withBio
          onChangeBio={handleChange({
            profileKey: "userAdminInfo",
            profileInfoKey: "info",
          })}
          additionalFieldsAbove={
            <SetLoginDataToggle currentProfile={"userAdminInfo"} />
          }
        />
      ),
    },
    {
      label: "Organization Admin",
      value: ProfileInfoTab.OrganizationAdmin,
      content: (
        <ProfileInfoWithCard
          key={"userOrganisationAdminInfos"}
          profileInfo={userOrganisationAdminInfos?.[0]}
          onChangeName={handleChange({
            profileKey: "userOrganisationAdminInfos",
            profileInfoKey: "name",
          })}
          onChangeSurname={handleChange({
            profileKey: "userOrganisationAdminInfos",
            profileInfoKey: "surname",
          })}
          onChangeEmail={handleChange({
            profileKey: "userOrganisationAdminInfos",
            profileInfoKey: "email",
          })}
          onChangeTelephoneNumber={handleChange({
            profileKey: "userOrganisationAdminInfos",
            profileInfoKey: "telephoneNumber",
          })}
          withBio
          onChangeBio={handleChange({
            profileKey: "userOrganisationAdminInfos",
            profileInfoKey: "info",
          })}
          additionalFieldsAbove={
            <SetLoginDataToggle currentProfile={"userOrganisationAdminInfos"} />
          }
        />
      ),
    },
  ];

  return (
    <>
      <ProfileMainInfo
        profile={profile}
        withEditBtn={withEditBtn}
        onEditClick={onEditClick}
      />
      <Tabs tabs={tabs} className={styles.tabs} />
      <BottomNav onSave={handleSave} loading={isLoading} />
    </>
  );
};
