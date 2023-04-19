import { FC } from "react";
import styles from "./CreateCompetitionCard.module.css";

import { Card, Title } from "@/shared/ui";

import {
  CreateCompetitionForm,
  useCreateCompetition,
} from "@/entities/competition";

interface CreateCompetitionCardProps {
  className?: string;
}

export const CreateCompetitionCard: FC<CreateCompetitionCardProps> = ({
  className,
}) => {
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
