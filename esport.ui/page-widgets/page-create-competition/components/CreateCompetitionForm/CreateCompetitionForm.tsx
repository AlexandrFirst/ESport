import React from "react";
import styles from "./createCompetitionForm.module.scss";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Grid } from "@mui/material";

import { routes } from "routes";

import { SportButton } from "@shared/ui/SportButton/SportButton";
import { SportInput } from "@shared/ui/SportInput/SportInput";
import { SportDatePicker } from "@shared/ui/SportDatePicker/SportDatePicker";

import { useHttpRequest } from "@shared/lib/hooks/useHttpRequest";

import { SportForm } from "@features/SportForm";
import { useSnackbar } from "@features/SportSnackbar";

import { competitionApi } from "@entities/competition";

import { ICreateCompetitionForm } from "@page-widgets/page-create-competition/types/create-competition-form.interface";
import { useCreateCompetitionValidation } from "@page-widgets/page-create-competition/lib/hooks/use-create-competition-validation";

export const CreateCompetitionForm: React.FC = () => {
  const [createCompetition, loading] = useHttpRequest(competitionApi.create);

  const router = useRouter();
  const { success, error } = useSnackbar();

  const validationSchema = useCreateCompetitionValidation();

  const methods = useForm<ICreateCompetitionForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const { id } = await createCompetition({
        ...data,
        //TODO: handle it
        organizationId: 1,
        categories: [],
      });
      success("Competition created successfully");
      router.push(routes.Competition.Id(id));
    } catch (e: any) {
      error(e.message);
    }
  });

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
        <SportButton loading={loading} onClick={onSubmit}>
          Create
        </SportButton>
      </Grid>
    </SportForm>
  );
};
