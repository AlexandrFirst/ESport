import React from "react";
import styles from "./createCompetitionFormCard.module.css";

import { SportPageTitle } from "@shared/ui/SportPageTitle/SportPageTitle";
import { SportCard } from "@shared/ui/SportCard/SportCard";

import { CreateCompetitionForm } from "@entities/competition";

import { useCreateCompetitionMutation } from "@page-widgets/page-create-competition/lib/hooks/useCreateCompetitionMutation";

export const CreateCompetitionFormCard: React.FC = () => {
  const { isLoading, mutate } = useCreateCompetitionMutation();

  return (
    <SportCard className={styles.card}>
      <SportPageTitle className={styles.title}>
        Create competition
      </SportPageTitle>
      <CreateCompetitionForm onSubmit={mutate} loading={isLoading} />
    </SportCard>
  );
};
