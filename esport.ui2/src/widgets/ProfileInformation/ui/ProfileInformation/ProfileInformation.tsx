import React, { FC } from "react";
import styles from "./ProfileInformation.module.css";

import { BottomNav, TabList, Tabs } from "@/shared/ui";
import { useSnackbar } from "@/shared/lib";

import {
  ProfileApi,
  ProfileMainInfo,
  transformProfileDataToUpdate,
  useUpdateProfileInfo,
} from "@/entities/profile";

import { ProfileInfoTab } from "../../constants/profile-info-tab";

import { useProfileInformationActions } from "../../model/slices/ProfileInformationSlice";
import { useSelectEditableProfile } from "../../model/selectors/selectEditableProfile/selectEditableProfile";
import { useSelectOverrideLoginInfo } from "../../model/selectors/selectOverrideLoginInfo/selectOverrideLoginInfo";
import { useSelectCurrentProfile } from "../../model/selectors/selectCurrentProfile/selectCurrentProfile";
import { useSelectTrainerSports } from "../../model/selectors/selectTrainerSports/selectTrainerSports";
import { ProfileInfoPerRole } from "../ProfileInfoPerRole/ProfileInfoPerRole";
import { TrainerProfileInformation } from "../TrainerProfileInformation/TrainerProfileInformation";
import { GymAdminProfileInformation } from "../GymAdminProfileInformation/GymAdminProfileInformation";
import { OrganisationAdminProfileInformation } from "../OrganisationAdminProfileInformation/OrganisationAdminProfileInformation";
import { useSelectOrganisationAdminOrganisationId } from "../../model/selectors/selectOrganisationAdminOrganisation/selectOrganisationAdminOrganisationId";
import { useGetEmailChangedMessage } from "../../lib/hooks/useGetEmailChangedMessage/useGetEmailChangedMessage";
import { useSelectNewOrganisationName } from "../../model/selectors/selectNewOrganisationName/selectNewOrganisationName";
import { useSelectNewOrganisationDescription } from "../../model/selectors/selectNewOrganisationDescription/selectNewOrganisationDescription";

interface ProfileInformationProps {
  userId: number;
  withEditBtn?: boolean;
  onEditClick?: () => void;
  className?: string;
}

export const ProfileInformation: FC<ProfileInformationProps> = ({
  onEditClick,
  withEditBtn,
  userId,
}) => {
  const { setInitialData, resetIsEmailForProfileChanged } =
    useProfileInformationActions();
  const profile = useSelectCurrentProfile();
  const editableProfile = useSelectEditableProfile();
  const overrideLoginInfo = useSelectOverrideLoginInfo();
  const trainerSports = useSelectTrainerSports();
  const organisationAdminOrganisationId =
    useSelectOrganisationAdminOrganisationId();
  const newOrganisationName = useSelectNewOrganisationName();
  const newOrganisationDescription = useSelectNewOrganisationDescription();

  const emailChangedMessage = useGetEmailChangedMessage();

  const { showError, showSuccess } = useSnackbar();

  const { mutate, isLoading } = useUpdateProfileInfo(userId, {
    onError(e: any) {
      showError(e.message);
    },
    async onSuccess() {
      showSuccess(`Profile updated successfully. ${emailChangedMessage}`, {
        duration: 10000,
      });
      const { data: profile } = await ProfileApi().getProfileInfo(
        Number(userId)
      );
      setInitialData(profile);
      resetIsEmailForProfileChanged();
    },
  });

  const handleSave = async () => {
    await mutate(
      transformProfileDataToUpdate({
        data: editableProfile,
        overrideLoginInfo,
        trainerSports,
        organisationAdminOrganisationId,
        organisationAdminOrganisationName: newOrganisationName,
        organisationAdminOrganisationDescription: newOrganisationDescription,
      })
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
      content: <ProfileInfoPerRole profileKey={"userTraineeInfo"} />,
    },
    {
      label: "Trainer",
      value: ProfileInfoTab.Trainer,
      content: <TrainerProfileInformation />,
    },
    {
      label: "Gym Admin",
      value: ProfileInfoTab.GymAdmin,
      content: <GymAdminProfileInformation />,
    },
    {
      label: "Organisation Admin",
      value: ProfileInfoTab.OrganizationAdmin,
      content: <OrganisationAdminProfileInformation />,
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
