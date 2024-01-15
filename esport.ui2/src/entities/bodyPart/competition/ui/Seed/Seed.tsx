import React, { FC, ReactNode } from "react";
import styles from "./Seed.module.css";

interface SeedProps {
  children?: ReactNode;
}

export const Seed: FC<SeedProps> = ({ children }) => {
  return <div className={styles.seed}>{children}</div>;
};
