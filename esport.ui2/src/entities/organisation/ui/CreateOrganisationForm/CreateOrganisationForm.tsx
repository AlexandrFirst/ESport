import React, { FC } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useSnackbar } from "@/shared/lib";
import { Button, FormWrapper, Input, TextArea } from "@/shared/ui";

import { ICreateOrganisation } from "../../model/types/create-organisation";
import { useCreateOrganisation } from "../../api/hooks/useCreateOrganisation";
import { useCreateOrganisationValidation } from "../../lib/hooks/useCreateOrganisationValidation";

interface CreateOrganisationFormProps {
  className?: string;
}

export const CreateOrganisationForm: FC<CreateOrganisationFormProps> = ({
  className,
}) => {
  const { showError, showSuccess } = useSnackbar();

  const { mutate, isLoading } = useCreateOrganisation({
    onError: (e: any) => {
      showError(e.message);
    },
    onSuccess: () => {
      showSuccess("Organisation created");
    },
  });

  const validationSchema = useCreateOrganisationValidation();
  const methods = useForm<ICreateOrganisation>({
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = methods.handleSubmit(async (data) => mutate(data));

  return (
    <FormWrapper methods={methods} className={className}>
      <Input name={"name"} label={"Organisation name"} />
      <TextArea name={"description"} placeholder={"Organisation description"} />
      <Button onClick={handleSubmit} className={"mt-10"} loading={isLoading}>
        Create
      </Button>
    </FormWrapper>
  );
};
