import React from "react";
import styles from "./createCompetitionTitle.module.scss";

import { SportPageTitle } from "@shared/ui/SportPageTitle/SportPageTitle";

export const CreateCompetitionTitle: React.FC = () => {
  return (
    <SportPageTitle className={styles.title}>Create competition</SportPageTitle>
  );
};
