import React, { FC } from "react";
import styles from "./CreateCompetitionForm.module.css";

import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  BottomNav,
  Button,
  DatePicker,
  FormWrapper,
  Input,
  Prompt,
} from "@/shared/ui";

interface CreateCompetitionFormBasicProps {
  withPrompt?: boolean;
  promptCondition?: boolean;
  methods: UseFormReturn;
}

export const CreateCompetitionFormBasic: FC<
  CreateCompetitionFormBasicProps
> = ({ withPrompt = true, promptCondition, methods }) => {
  // const validationSchema = useCreateCompetitionValidation();
  //
  // const methods = useForm<ICreateCompetitionBasicForm>({
  //   resolver: withValidation ? yupResolver(validationSchema) : undefined,
  // });

  // const handleSubmit = methods.handleSubmit((data) => onSubmit?.(data));

  // const { isSubmitted, isDirty } = methods.formState;
  // const shouldShowPrompt = !isSubmitted && isDirty;

  return (
    <>
      <FormWrapper methods={methods} className={styles.form}>
        <Input
          name={"title"}
          label={"Title for your next competition"}
          fullWidth
          required
        />
        <DatePicker
          name={"dateStart"}
          label={"Date start"}
          fullWidth
          required
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
        <DatePicker
          name={"registrationCloseDate"}
          label={"Registration close date"}
          fullWidth
          required
        />
        {/*<BottomNav loading={loading} onSave={handleSubmit} />*/}
      </FormWrapper>
    </>
  );
};
