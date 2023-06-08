import React, { ReactNode } from "react";

import { UseFormReturn } from "react-hook-form";

import { Button, FormWrapper, Input, TextArea } from "@/shared/ui";

import { ICreateOrganisation } from "../../model/types/create-organisation";

interface CreateOrganisationFormProps<T extends ICreateOrganisation> {
  className?: string;
  buttonText?: string;
  onSubmit?: () => void;
  methods: UseFormReturn<T>;
  isLoading?: boolean;
  additionalFields?: ReactNode;
  fullWidthSubmit?: boolean;
}

export function CreateEditOrganisationForm<T extends ICreateOrganisation>({
  className,
  buttonText = "Create",
  onSubmit,
  methods,
  isLoading,
  additionalFields,
  fullWidthSubmit,
}: CreateOrganisationFormProps<T>) {
  return (
    <FormWrapper methods={methods} className={className}>
      <Input name={"name"} label={"Organisation name"} fullWidth />
      <TextArea
        name={"description"}
        placeholder={"Organisation description"}
        fullWidth
      />
      {additionalFields}
      <Button
        onClick={onSubmit}
        className={"mt-10"}
        loading={isLoading}
        fullWidth={fullWidthSubmit}
      >
        {buttonText}
      </Button>
    </FormWrapper>
  );
}
