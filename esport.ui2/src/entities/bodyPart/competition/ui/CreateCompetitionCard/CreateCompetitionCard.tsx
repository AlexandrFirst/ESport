import { FC } from "react";
import styles from "./CreateCompetitionCard.module.css";

import { Card, Title } from "@/shared/ui";

import { useCreateCompetition } from "../../api/hooks/useCreateCompetition";
import { CreateCompetitionForm } from "../CreateCompetitionForm/CreateCompetitionForm";
import { Logger, useSnackbar } from "@/shared/lib";

export const CreateCompetitionCard: FC = () => {
  const { showError } = useSnackbar();

  const { mutate, isLoading } = useCreateCompetition({
    onError(e) {
      Logger.Error(e);
      showError(e.message);
    },
  });

  return (
    <>
      <Title center className={styles.title}>
        Create competiton
      </Title>
      <Card padding={"lg"}>
        <CreateCompetitionForm onSubmit={mutate} loading={isLoading} />
      </Card>
    </>
  );
};
