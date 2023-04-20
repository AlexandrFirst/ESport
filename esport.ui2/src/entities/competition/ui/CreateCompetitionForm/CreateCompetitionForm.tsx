import React, { FC } from "react";
import styles from "./CreateCompetitionForm.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, DatePicker, FormWrapper, Input } from "@/shared/ui";

import { Prompt } from "@/features/Prompt";

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
          // minDate={new Date()}
          // inputProps={{ fullWidth: true }}
        />
        <DatePicker
          name={"dateEnd"}
          label={"Date end"}
          // minDate={new Date()}
          // inputProps={{ fullWidth: true }}
        />
        <div className={styles.btn_container}>
          <Button loading={loading} onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </FormWrapper>
      {withPrompt && <Prompt shouldConfirmLeave={shouldShowPrompt} />}
    </>
  );
};