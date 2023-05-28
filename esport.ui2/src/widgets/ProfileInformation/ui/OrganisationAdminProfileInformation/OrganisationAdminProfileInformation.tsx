import React, { FC, useState } from "react";

import { useRouter } from "next/router";

import {
  Autocomplete,
  AutocompleteAdditionalOptionList,
  Card,
  UILink,
} from "@/shared/ui";

import { routes } from "@/shared/config";
import { IProfileInfo, ProfileDataForm } from "@/entities/profile";
import {
  IOrganizationInfoRead,
  useGetOrganisations,
} from "@/entities/organisation";

import { useSelectEditableProfile } from "../../model/selectors/selectEditableProfile/selectEditableProfile";
import { useProfileInformationActions } from "../../model/slices/ProfileInformationSlice";
import { useRoleProfileInformationActions } from "../../model/slices/roleProfileInformationSlice";
import { useSelectOrganisationAdminOrganisationId } from "../../model/selectors/selectOrganisationAdminOrganisation/selectOrganisationAdminOrganisationId";

import { NoData } from "../NoData/NoData";

interface OrganizationAdminProfileInformationProps {
  className?: string;
}

export const OrganisationAdminProfileInformation: FC<
  OrganizationAdminProfileInformationProps
> = ({ className }) => {
  const { userOrganisationAdminInfos } = useSelectEditableProfile();
  const organisationAdminOrganisationId =
    useSelectOrganisationAdminOrganisationId();

  const { setEditableProfileByKey, setIsEmailForProfileChanged } =
    useProfileInformationActions();
  const { setOrganisationAdminOrganisation } =
    useRoleProfileInformationActions();

  const router = useRouter();
  const [organizationValue, setOrganizationValue] = useState("");
  const hasInfo = Boolean(userOrganisationAdminInfos?.length);

  const { data: organizations, isLoading: areOrganizationsLoading } =
    useGetOrganisations(
      { name: organizationValue, organisationIds: [] },
      {
        enabled: hasInfo,
        select: (data) => data.organisatationInfoListing,
      }
    );

  const handleChange =
    (profileInfoKey: keyof IProfileInfo) => (value: string) =>
      setEditableProfileByKey({
        profileKey: "userOrganisationAdminInfos",
        profileInfoKey,
        value,
      });

  const handleChangeEmail = (value: string) => {
    setEditableProfileByKey({
      profileKey: "userOrganisationAdminInfos",
      profileInfoKey: "email",
      value,
    });
    setIsEmailForProfileChanged({
      key: "userOrganisationAdminInfos",
      value: true,
    });
  };

  const additionalOptions: AutocompleteAdditionalOptionList =
    userOrganisationAdminInfos?.[0]?.isConfirmed
      ? [
          {
            key: "create",
            onClick: () => router.push(routes.Organisation.Create()),
            content: (
              <UILink href={routes.Organisation.Create()} color={"inverted"}>
                Create organisation
              </UILink>
            ),
          },
        ]
      : [];

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
            onChangeEmail={handleChangeEmail}
            onChangeBio={handleChange("info")}
            withBio
            additionalFieldsBelow={
              <>
                <Autocomplete<IOrganizationInfoRead>
                  value={organizations?.find(
                    (o) => o.organisationId === organisationAdminOrganisationId
                  )}
                  list={organizations ?? []}
                  displayValue={"name"}
                  displayKey={"organisationId"}
                  onInputChange={setOrganizationValue}
                  lazy
                  loading={areOrganizationsLoading}
                  label={"Organisation"}
                  additionalOptions={additionalOptions}
                  onChange={(value) =>
                    setOrganisationAdminOrganisation(value?.organisationId ?? 0)
                  }
                />
              </>
            }
          />
        ))
      )}
    </Card>
  );
};
