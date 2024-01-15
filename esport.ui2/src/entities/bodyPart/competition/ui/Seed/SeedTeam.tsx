import React, { FC, ReactNode } from "react";
import styles from "./Seed.module.css";

interface SeedTeamProps {
  children: ReactNode;
}

export const SeedTeam: FC<SeedTeamProps> = ({ children }) => {
  return <div className={styles.seed_team}>{children}</div>;
};
