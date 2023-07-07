import { FC } from "react";
import styles from "./ApplyToCompetitionForm.module.css";

interface ApplyToCompetitionFormProps {
  className?: string;
}

export const ApplyToCompetitionForm: FC<ApplyToCompetitionFormProps> = (
  props
) => {
  return <div className={styles.wrapper}></div>;
};
