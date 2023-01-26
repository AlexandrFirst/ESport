import React from "react";
import styles from "./createCompetitionForm.module.scss";

import { useForm } from "react-hook-form";

import { SportInput } from "@shared/ui/SportInput/SportInput";
import { SportDatePicker } from "@shared/ui/SportDatePicker/SportDatePicker";

import { SportForm } from "@features/SportForm/SportForm";

export const CreateCompetitionForm: React.FC = () => {
  const methods = useForm();

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
    </SportForm>
  );
};
