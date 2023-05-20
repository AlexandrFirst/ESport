import React, { FC, useMemo, useState } from "react";
import styles from "./ProfileInformation.module.css";
import { TabList, Tabs } from "@/shared/ui";

import { IProfile, ProfileMainInfo } from "@/entities/profile";

import { ProfileInfoTab } from "../../constants/profile-info-tab";
import { ProfileInformationContent } from "../ProfileInformationContent/ProfileInformationContent";

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
  const [currentTab, setCurrentTab] = useState<ProfileInfoTab>(
    ProfileInfoTab.Indentity
  );

  const tabs: TabList<ProfileInfoTab> = useMemo(
    () => [
      {
        children: "Login Info",
        value: ProfileInfoTab.Indentity,
      },
      {
        children: "Trainee",
        value: ProfileInfoTab.Trainee,
      },
      {
        children: "Trainer",
        value: ProfileInfoTab.Trainer,
      },
      {
        children: "Gym Admin",
        value: ProfileInfoTab.GymAdmin,
      },
      {
        children: "Organization Admin",
        value: ProfileInfoTab.OrganizationAdmin,
      },
    ],
    []
  );

  return (
    <>
      <ProfileMainInfo
        profile={profile}
        withEditBtn={withEditBtn}
        onEditClick={onEditClick}
      />
      <Tabs
        currentTab={currentTab}
        tabs={tabs}
        onTabChange={setCurrentTab}
        className={styles.tabs}
      />
      <ProfileInformationContent currentTab={currentTab} userId={userId} />
    </>
  );
};
