import { FC } from "react";
import styles from "./CreateCompetitionCard.module.css";

import { Card, Title } from "@/shared/ui";

import { useCreateCompetition } from "../../api/hooks/useCreateCompetition";
import { CreateCompetitionForm } from "../CreateCompetitionForm/CreateCompetitionForm";

export const CreateCompetitionCard: FC = () => {
  const { mutate, isLoading } = useCreateCompetition();

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
