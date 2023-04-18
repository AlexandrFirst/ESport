import { Button, DatePicker, FormWrapper, Input } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { FC } from "react";
import { useForm } from "react-hook-form";

import { useCreateCompetitionValidation } from "../../lib/hooks/use-create-competition-validation";
import { ICreateCompetitionForm } from "../../model/types/create-competitiom-form";
import styles from "./CreateCompetitionForm.module.css";

interface CreateCompetitionFormProps {
  loading?: boolean;
  onSubmit?: (data: ICreateCompetitionForm) => void;
  withValidation?: boolean;
}

export const CreateCompetitionForm: FC<CreateCompetitionFormProps> = ({
  withValidation,
  onSubmit,
  loading,
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
          className={styles.input}
          fullWidth
        />
        <DatePicker
          name={"dateStart"}
          label={"Date start"}
          className={styles.input}
          // minDate={new Date()}
          // inputProps={{ fullWidth: true }}
        />
        <DatePicker
          name={"dateEnd"}
          label={"Date end"}
          className={styles.input}
          // minDate={new Date()}
          // inputProps={{ fullWidth: true }}
        />
        <div className={styles.btn_container}>
          <Button loading={loading} onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </FormWrapper>
      {/*<SportPrompt shouldConfirmLeave={shouldShowPrompt} />*/}
    </>
  );
};
