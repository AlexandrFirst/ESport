import React, { FC } from "react";

import { useSnackbar } from "@/shared/lib";
import { BottomNav } from "@/shared/ui";

import {
  transformProfileDataToUpdate,
  useUpdateProfileInfo,
} from "@/entities/profile";

import { ProfileInfoTab } from "../../constants/profile-info-tab";
import {
  SetEditableProfileParams,
  useProfileInformationActions,
} from "../../model/slices/ProfileInformationSlice";
import { useSelectEditableProfile } from "../../model/selectors/selectEditableProfile/selectEditableProfile";

import { ProfileInfoWithCard } from "./ProfileInfoWithCard";
import { useSelectOverrideLoginInfo } from "../../model/selectors/selectOverrideLoginInfo/selectOverrideLoginInfo";
import { SetLoginDataToggle } from "../SetLoginDataToggle/SetLoginDataToggle";

interface ProfileInformationContentProps {
  currentTab: ProfileInfoTab;
  className?: string;
  userId: string;
}

export const ProfileInformationContent: FC<ProfileInformationContentProps> = ({
  currentTab,
  userId,
}) => {
  const { setEditableProfileByKey } = useProfileInformationActions();
  const editableProfile = useSelectEditableProfile();
  const overrideLoginInfo = useSelectOverrideLoginInfo();

  const { showError } = useSnackbar();

  const { mutate, isLoading } = useUpdateProfileInfo(userId, {
    onError(e: any) {
      showError(e.message);
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

  const content = [
    {
      tab: ProfileInfoTab.Indentity,
      children: (
        <ProfileInfoWithCard
          key={"userIdentityInfo"}
          profileInfo={userIdentityInfo}
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
      tab: ProfileInfoTab.Trainee,
      children: (
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
      tab: ProfileInfoTab.Trainer,
      children: (
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
      tab: ProfileInfoTab.GymAdmin,
      children: (
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
      tab: ProfileInfoTab.OrganizationAdmin,
      children: (
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

  return (
    <>
      {content.map(({ tab, children }) => {
        return tab === currentTab ? children : null;
      })}
      <BottomNav onSave={handleSave} loading={isLoading} />
    </>
  );
};
