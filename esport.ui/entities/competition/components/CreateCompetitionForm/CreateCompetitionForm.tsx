import React from "react";
import styles from "./createCompetitionForm.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Grid } from "@mui/material";

import { SportButton } from "@shared/ui/SportButton/SportButton";
import { SportInput } from "@shared/ui/SportInput/SportInput";
import { SportDatePicker } from "@shared/ui/SportDatePicker/SportDatePicker";

import { SportForm } from "@features/SportForm";

import { ICreateCompetitionForm } from "@entities/competition/types/create-competition-form.interface";
import { useCreateCompetitionValidation } from "@entities/competition/lib/hooks/use-create-competition-validation";

interface CreateCompetitionFormProps {
  loading?: boolean;
  onSubmit?: (data: ICreateCompetitionForm) => void;
  withValidation?: boolean;
}

export const CreateCompetitionForm: React.FC<CreateCompetitionFormProps> = ({
  withValidation = true,
  loading,
  onSubmit,
}) => {
  const validationSchema = useCreateCompetitionValidation();

  const methods = useForm<ICreateCompetitionForm>({
    resolver: withValidation ? yupResolver(validationSchema) : undefined,
  });

  const handleSubmit = methods.handleSubmit((data) => onSubmit?.(data));

  return (
    <SportForm methods={methods} className={styles.form}>
      <SportInput
        name={"title"}
        label={"Title for your next competition"}
        className={styles.input}
      />
      <SportDatePicker
        name={"dateStart"}
        label={"Date start"}
        className={styles.input}
        minDate={new Date()}
      />
      <SportDatePicker
        name={"dateEnd"}
        label={"Date end"}
        className={styles.input}
        minDate={new Date()}
      />
      <Grid item xs={12} className={styles.btn_container}>
        <SportButton loading={loading} onClick={handleSubmit}>
          Create
        </SportButton>
      </Grid>
    </SportForm>
  );
};
