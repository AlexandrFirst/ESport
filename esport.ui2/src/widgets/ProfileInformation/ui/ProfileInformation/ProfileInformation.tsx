import React, { FC } from "react";
import styles from "./ProfileInformation.module.css";

import { BottomNav, TabList, Tabs } from "@/shared/ui";
import { useMappedRoles, useSnackbar } from "@/shared/lib";
import { UserRole } from "@/shared/constants";

import {
  ProfileApi,
  ProfileMainInfo,
  transformProfileDataToUpdate,
  useUpdateProfileInfo,
} from "@/entities/profile";

import { ProfileInfoTab } from "../../constants/profile-info-tab";

import { useGetEmailChangedMessage } from "../../lib/hooks/useGetEmailChangedMessage/useGetEmailChangedMessage";

import { useProfileInformationActions } from "../../model/slices/ProfileInformationSlice";
import { useSelectEditableProfile } from "../../model/selectors/selectEditableProfile/selectEditableProfile";
import { useSelectOverrideLoginInfo } from "../../model/selectors/selectOverrideLoginInfo/selectOverrideLoginInfo";
import { useSelectCurrentProfile } from "../../model/selectors/selectCurrentProfile/selectCurrentProfile";
import { useSelectTrainerSports } from "../../model/selectors/selectTrainerSports/selectTrainerSports";
import { useSelectOrganisationAdminOrganisationId } from "../../model/selectors/selectOrganisationAdminOrganisation/selectOrganisationAdminOrganisationId";
import { useSelectNewOrganisationName } from "../../model/selectors/selectNewOrganisationName/selectNewOrganisationName";
import { useSelectNewOrganisationDescription } from "../../model/selectors/selectNewOrganisationDescription/selectNewOrganisationDescription";

import { ProfileInfoPerRole } from "../ProfileInfoPerRole/ProfileInfoPerRole";
import { TrainerProfileInformation } from "../TrainerProfileInformation/TrainerProfileInformation";
import { GymAdminProfileInformation } from "../GymAdminProfileInformation/GymAdminProfileInformation";
import { OrganisationAdminProfileInformation } from "../OrganisationAdminProfileInformation/OrganisationAdminProfileInformation";
import { useSelectGymAdminGyms } from "../../model/selectors/selectGymAdminGyms/selectGymAdminGyms";

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
  const translatedRoles = useMappedRoles();

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
  const gymAdminGyms = useSelectGymAdminGyms();

  const emailChangedMessage = useGetEmailChangedMessage();

  const { showError, showSuccess } = useSnackbar();

  const { mutate, isLoading } = useUpdateProfileInfo(userId, {
    onError(e: any) {
      showError(e.message);
    },
    async onSuccess() {
      showSuccess(
        `Profile updated successfully. In order to apply new roles you have to login to your account again. ${emailChangedMessage}`,
        {
          duration: 10000,
        }
      );
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
        gymAdminGyms,
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
      label: translatedRoles[UserRole.Trainee],
      value: ProfileInfoTab.Trainee,
      content: <ProfileInfoPerRole profileKey={"userTraineeInfo"} />,
    },
    {
      label: translatedRoles[UserRole.Trainer],
      value: ProfileInfoTab.Trainer,
      content: <TrainerProfileInformation />,
    },
    {
      label: translatedRoles[UserRole.GymAdmin],
      value: ProfileInfoTab.GymAdmin,
      content: <GymAdminProfileInformation />,
    },
    {
      label: translatedRoles[UserRole.OrganisationAdmin],
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
