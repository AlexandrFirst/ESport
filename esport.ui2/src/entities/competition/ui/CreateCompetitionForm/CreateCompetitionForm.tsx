import React, { FC } from "react";
import styles from "./CreateCompetitionForm.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, DatePicker, FormWrapper, Input, Prompt } from "@/shared/ui";

import { useCreateCompetitionValidation } from "../../lib/hooks/use-create-competition-validation";
import { ICreateCompetitionForm } from "../../model/types/create-competitiom-form";

interface CreateCompetitionFormProps {
  loading?: boolean;
  onSubmit?: (data: ICreateCompetitionForm) => void;
  withValidation?: boolean;
  withPrompt?: boolean;
}

export const CreateCompetitionForm: FC<CreateCompetitionFormProps> = ({
  onSubmit,
  loading,
  withValidation = true,
  withPrompt = true,
}) => {
  const validationSchema = useCreateCompetitionValidation();

  const methods = useForm<ICreateCompetitionForm>({
    resolver: withValidation ? yupResolver(validationSchema) : undefined,
  });

  const handleSubmit = methods.handleSubmit((data) => onSubmit?.(data));

  const { isSubmitted, isDirty } = methods.formState;
  const shouldShowPrompt = !isSubmitted && isDirty;

  return (
    <>
      <FormWrapper methods={methods} className={styles.form}>
        <Input
          name={"title"}
          label={"Title for your next competition"}
          fullWidth
        />
        <DatePicker
          name={"dateStart"}
          label={"Date start"}
          fullWidth
          // minDate={new Date()}
          // inputProps={{ fullWidth: true }}
        />
        <DatePicker
          name={"dateEnd"}
          label={"Date end"}
          fullWidth
          // minDate={new Date()}
          // inputProps={{ fullWidth: true }}
        />
        <Button loading={loading} onClick={handleSubmit} fullWidth>
          Create
        </Button>
      </FormWrapper>
      {withPrompt && <Prompt shouldConfirmLeave={shouldShowPrompt} />}
    </>
  );
};
