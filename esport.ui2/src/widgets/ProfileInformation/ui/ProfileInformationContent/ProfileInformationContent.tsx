import React, { FC } from "react";

import { IProfile, IProfileInfo, ProfileDataForm } from "@/entities/profile";

import { ProfileInfoTab } from "../../constants/profile-info-tab";
import { Card, FormWrapper } from "@/shared/ui";
import { BottomNav } from "@/shared/ui/BottomNav/BottomNav";
import { useForm } from "react-hook-form";

interface ProfileInformationContentProps {
  profile: IProfile;
  currentTab: ProfileInfoTab;
  className?: string;
}

export const ProfileInformationContent: FC<ProfileInformationContentProps> = ({
  currentTab,
  profile,
  className,
}) => {
  const {
    userTraineeInfo,
    userIdentityInfo,
    userTrainerInfo,
    userOrganisationAdminInfos,
    userAdminInfo,
  } = profile || {};

  const methods = useForm();

  const getProfileForm = (profileInfo?: IProfileInfo) => {
    return (
      <Card padding={"md"}>
        <ProfileDataForm profile={profileInfo} />
      </Card>
    );
  };

  const content = [
    {
      tab: ProfileInfoTab.Indentity,
      children: getProfileForm(userIdentityInfo),
    },
    {
      tab: ProfileInfoTab.Trainee,
      children: getProfileForm(userTraineeInfo),
    },
    {
      tab: ProfileInfoTab.Trainer,
      children: getProfileForm(userTrainerInfo),
    },
    {
      tab: ProfileInfoTab.GymAdmin,
      children: getProfileForm(userAdminInfo),
    },
    {
      tab: ProfileInfoTab.OrganizationAdmin,
      children: getProfileForm(userOrganisationAdminInfos?.[0]),
    },
  ];

  return (
    <FormWrapper methods={methods}>
      {content.map(({ tab, children }) => {
        return tab === currentTab ? children : null;
      })}
      <BottomNav />
    </FormWrapper>
  );
};
