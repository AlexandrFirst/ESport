import React, { FC, useState } from "react";
import styles from "./OrganisationAdminProfileInformation.module.css";

import { Autocomplete, Card, UILink } from "@/shared/ui";

import { routes } from "@/shared/config";
import { IProfileInfo, ProfileDataForm } from "@/entities/profile";
import {
  IOrganizationInfoRead,
  useGetOrganisations,
} from "@/entities/organisation";

import { useSelectEditableProfile } from "../../model/selectors/selectEditableProfile/selectEditableProfile";
import { useProfileInformationActions } from "../../model/slices/ProfileInformationSlice";

import { SetLoginDataToggle } from "../SetLoginDataToggle/SetLoginDataToggle";
import { NoData } from "../NoData/NoData";

interface OrganizationAdminProfileInformationProps {
  className?: string;
}

export const OrganisationAdminProfileInformation: FC<
  OrganizationAdminProfileInformationProps
> = ({ className }) => {
  const { userOrganisationAdminInfos } = useSelectEditableProfile();
  const { setEditableProfileByKey } = useProfileInformationActions();

  const [organizationValue, setOrganizationValue] = useState("");

  const hasInfo = Boolean(userOrganisationAdminInfos?.length);

  const { data: organizations, isLoading: areOrganizationsLoading } =
    useGetOrganisations(
      { name: organizationValue, organisationIds: [] },
      {
        enabled: hasInfo,
      }
    );

  const handleChange =
    (profileInfoKey: keyof IProfileInfo) => (value: string) =>
      setEditableProfileByKey({
        profileKey: "userOrganisationAdminInfos",
        profileInfoKey,
        value,
      });

  return (
    <Card padding={"md"}>
      {!hasInfo ? (
        <NoData name={"userOrganisationAdminInfos"} />
      ) : (
        userOrganisationAdminInfos?.map((profileInfo) => (
          <ProfileDataForm
            {...profileInfo}
            key={profileInfo.id}
            onChangeTelephoneNumber={handleChange("telephoneNumber")}
            onChangeSurname={handleChange("surname")}
            onChangeName={handleChange("name")}
            onChangeEmail={handleChange("email")}
            onChangeBio={handleChange("info")}
            withBio
            additionalFieldsAbove={
              <SetLoginDataToggle
                currentProfile={"userOrganisationAdminInfos"}
              />
            }
            additionalFieldsBelow={
              <>
                <Autocomplete<IOrganizationInfoRead>
                  list={
                    organizations?.organisationInfoListing
                      ?.organisatationInfoListing ?? []
                  }
                  displayValue={"name"}
                  displayKey={"organisationId"}
                  onInputChange={setOrganizationValue}
                  lazy
                  loading={areOrganizationsLoading}
                  label={"Organisation"}
                  additionalOptions={[
                    <UILink
                      key={"Unique"}
                      href={routes.Organisation.Create()}
                      className={styles.create_organisation}
                    >
                      Create organisation
                    </UILink>,
                  ]}
                />
              </>
            }
          />
        ))
      )}
    </Card>
  );
};
