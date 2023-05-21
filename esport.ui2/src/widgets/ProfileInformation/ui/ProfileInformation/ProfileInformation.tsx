import React, { FC } from "react";
import styles from "./ProfileInformation.module.css";

import { Autocomplete, BottomNav, TabList, Tabs } from "@/shared/ui";
import { useSnackbar } from "@/shared/lib";

import {
  ProfileApi,
  ProfileMainInfo,
  transformProfileDataToUpdate,
  useUpdateProfileInfo,
} from "@/entities/profile";
import { useGetAllSports } from "@/entities/sport";

import { ProfileInfoTab } from "../../constants/profile-info-tab";

import { useProfileInformationActions } from "../../model/slices/ProfileInformationSlice";
import { useSelectEditableProfile } from "../../model/selectors/selectEditableProfile/selectEditableProfile";
import { useSelectOverrideLoginInfo } from "../../model/selectors/selectOverrideLoginInfo/selectOverrideLoginInfo";
import { useSelectCurrentProfile } from "../../model/selectors/selectCurrentProfile/selectCurrentProfile";
import { SetLoginDataToggle } from "../SetLoginDataToggle/SetLoginDataToggle";
import { ProfileInfoPerRole } from "../ProfileInfoPerRole/ProfileInfoPerRole";

interface ProfileInformationProps {
  userId: string;
  withEditBtn?: boolean;
  onEditClick?: () => void;
  className?: string;
}

export const ProfileInformation: FC<ProfileInformationProps> = ({
  onEditClick,
  withEditBtn,
  userId,
}) => {
  const { setCurrentProfile } = useProfileInformationActions();
  const profile = useSelectCurrentProfile();
  const editableProfile = useSelectEditableProfile();
  const overrideLoginInfo = useSelectOverrideLoginInfo();
  const { data: sports, isLoading: isSportsLoading } = useGetAllSports();

  const { showError, showSuccess } = useSnackbar();

  const { mutate, isLoading } = useUpdateProfileInfo(userId, {
    onError(e: any) {
      showError(e.message);
    },
    async onSuccess() {
      showSuccess("Profile updated successfully");
      const { data: profile } = await ProfileApi().getProfileInfo(userId);
      setCurrentProfile(profile);
    },
  });

  const handleSave = async () => {
    console.log(
      "===transformProfileDataToUpdate(editableProfile, overrideLoginInfo)===",
      transformProfileDataToUpdate(editableProfile, overrideLoginInfo)
    );
    await mutate(
      transformProfileDataToUpdate(editableProfile, overrideLoginInfo)
    );
  };

  const tabs: TabList<ProfileInfoTab> = [
    {
      label: "Login Info",
      value: ProfileInfoTab.Indentity,
      content: (
        <ProfileInfoPerRole profileKey={"userIdentityInfo"} editable={false} />
      ),
    },
    {
      label: "Trainee",
      value: ProfileInfoTab.Trainee,
      content: (
        <ProfileInfoPerRole
          profileKey={"userTraineeInfo"}
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
        <ProfileInfoPerRole
          profileKey={"userTrainerInfo"}
          additionalFieldsAbove={
            <SetLoginDataToggle currentProfile={"userTrainerInfo"} />
          }
          additionalFieldsBelow={
            <>
              <Autocomplete
                list={sports}
                displayKey={"id"}
                displayValue={"name"}
                loading={isSportsLoading}
                label={"Sports"}
                lazy
              />
            </>
          }
        />
      ),
    },
    {
      label: "Gym Admin",
      value: ProfileInfoTab.GymAdmin,
      content: (
        <ProfileInfoPerRole
          profileKey={"userAdminInfo"}
          additionalFieldsAbove={
            <SetLoginDataToggle currentProfile={"userAdminInfo"} />
          }
        />
      ),
    },
    {
      label: "Organization Admin",
      value: ProfileInfoTab.OrganizationAdmin,
      // content: <ProfileInfoPerRole profileKey={"userOrganisationAdminInfos"} />,
      content: <></>,
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
