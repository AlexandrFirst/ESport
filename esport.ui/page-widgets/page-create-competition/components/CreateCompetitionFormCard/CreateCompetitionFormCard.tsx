import React from "react";
import styles from "./createCompetitionFormCard.module.css";

import { useRouter } from "next/navigation";

import { routes } from "routes";

import { SportPageTitle } from "@shared/ui/SportPageTitle/SportPageTitle";
import { SportCard } from "@shared/ui/SportCard/SportCard";

import { useHttpRequest } from "@shared/lib/hooks/useHttpRequest";

import {
  competitionApi,
  CreateCompetitionForm,
  ICreateCompetitionForm,
} from "@entities/competition";

import { useSnackbar } from "@features/SportSnackbar";

export const CreateCompetitionFormCard: React.FC = () => {
  const [createCompetition, loading] = useHttpRequest(competitionApi.create);

  const router = useRouter();
  const { success, error } = useSnackbar();

  const onSubmit = async (data: ICreateCompetitionForm) => {
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
  };

  return (
    <SportCard className={styles.card}>
      <SportPageTitle className={styles.title}>
        Create competition
      </SportPageTitle>
      <CreateCompetitionForm onSubmit={onSubmit} loading={loading} />
    </SportCard>
  );
};
