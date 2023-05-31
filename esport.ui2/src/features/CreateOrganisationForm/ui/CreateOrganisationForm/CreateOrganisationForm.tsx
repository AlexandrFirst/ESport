import React, { FC } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useSnackbar } from "@/shared/lib";
import {
  CreateEditOrganisationForm,
  ICreateOrganisation,
  useCreateOrganisation,
} from "@/entities/organisation";

import { useCreateOrganisationValidation } from "../../lib/hooks/useCreateOrganisationValidation";

interface CreateOrganisationProps {
  className?: string;
}

export const CreateOrganisation: FC<CreateOrganisationProps> = ({
  className,
}) => {
  const validationSchema = useCreateOrganisationValidation();
  const methods = useForm<ICreateOrganisation>({
    resolver: yupResolver(validationSchema),
  });

  const { showError, showSuccess } = useSnackbar();

  const { mutate, isLoading } = useCreateOrganisation({
    onError: (e: any) => {
      showError(e.message);
    },
    onSuccess: () => {
      showSuccess("Organisation created");
    },
  });

  const handleSubmit = methods.handleSubmit((data) => mutate(data));

  return (
    <CreateEditOrganisationForm methods={methods} onSubmit={handleSubmit} />
  );
};
