import React, { FC, useState } from "react";

import { useRouter } from "next/router";

import {
  Autocomplete,
  AutocompleteAdditionalOptionList,
  Card,
  InputBase,
  OrSection,
  SubTitle,
  TextAreaBase,
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
import { ErrorMessage } from "@/shared/types";
import { useSelectIsEmailForProfileChanged } from "../../model/selectors/selectIsEmailForProfileChanged/selectIsEmailForProfileChanged";
import { useSelectNewOrganisationName } from "../../model/selectors/selectNewOrganisationName/selectNewOrganisationName";
import { useSelectNewOrganisationDescription } from "../../model/selectors/selectNewOrganisationDescription/selectNewOrganisationDescription";

interface OrganizationAdminProfileInformationProps {
  className?: string;
}

export const OrganisationAdminProfileInformation: FC<
  OrganizationAdminProfileInformationProps
> = ({ className }) => {
  const { userOrganisationAdminInfos } = useSelectEditableProfile();
  const organisationAdminOrganisationId =
    useSelectOrganisationAdminOrganisationId();
  const isEmailChanged = useSelectIsEmailForProfileChanged(
    "userOrganisationAdminInfos"
  );

  const { setEditableProfileByKey, setIsEmailForProfileChanged } =
    useProfileInformationActions();
  const {
    setOrganisationAdminOrganisation,
    setNewOrganisationName,
    setNewOrganisationDescription,
  } = useRoleProfileInformationActions();

  const organisationName = useSelectNewOrganisationName();
  const organisationDescription = useSelectNewOrganisationDescription();

  const router = useRouter();
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
    userOrganisationAdminInfos?.[0]?.isProfileConfirmed
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

  const getEmailError = (): ErrorMessage | undefined => {
    return userOrganisationAdminInfos?.[0].isProfileConfirmed === false ||
      isEmailChanged
      ? {
          message:
            "You can save profile, but you need to confirm your email. Check your inbox!",
        }
      : undefined;
  };

  const handleChangeOrganisation = (org: IOrganizationInfoRead | null) => {
    if (org) {
      setNewOrganisationName("");
      setNewOrganisationDescription("");
    }
    setOrganisationAdminOrganisation(org?.organisationId ?? 0);
  };

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
            emailError={getEmailError()}
            additionalFieldsBelow={
              <>
                <Autocomplete<IOrganizationInfoRead>
                  value={organizations?.organisatationInfoListing.find(
                    (o) => o.organisationId === organisationAdminOrganisationId
                  )}
                  list={organizations?.organisatationInfoListing ?? []}
                  displayValue={"name"}
                  displayKey={"organisationId"}
                  onInputChange={setOrganizationValue}
                  lazy
                  loading={areOrganizationsLoading}
                  label={"Choose existing organisation"}
                  additionalOptions={additionalOptions}
                  onChange={handleChangeOrganisation}
                  disabled={Boolean(
                    organisationName || organisationDescription
                  )}
                  fullWidth
                />
                <OrSection />
                <SubTitle size={"large"} className={"my-5"}>
                  Create new organisation
                </SubTitle>
                <InputBase
                  value={organisationName ?? undefined}
                  onChange={(e) => setNewOrganisationName(e.target.value)}
                  disabled={Boolean(organisationAdminOrganisationId)}
                  label={"Organisation name"}
                  fullWidth
                />
                <TextAreaBase
                  value={organisationDescription ?? undefined}
                  onChange={(e) =>
                    setNewOrganisationDescription(e.target.value)
                  }
                  fullWidth
                  disabled={Boolean(organisationAdminOrganisationId)}
                  placeholder={"Organisation description"}
                />
              </>
            }
          />
        ))
      )}
    </Card>
  );
};
