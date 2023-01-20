import React from "react";
import styles from "./createCompetitionForm.module.css";

import { UseFormReturn } from "react-hook-form";

import { SportForm } from "@components/SportForm/SportForm";
import { SportInput } from "@components/SportInput/SportInput";
import { SportDatePicker } from "@components/SportDatePicker/SportDatePicker";

interface CreateCompetitionFormProps {
  methods: UseFormReturn<any>;
}

export const CreateCompetitionForm: React.FC<CreateCompetitionFormProps> = ({
  methods,
}) => {
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
