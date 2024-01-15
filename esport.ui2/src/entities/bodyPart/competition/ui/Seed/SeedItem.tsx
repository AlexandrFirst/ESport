import React, { FC, ReactNode } from "react";
import styles from "./Seed.module.css";

interface SeedItemProps {
  children?: ReactNode;
}

export const SeedItem: FC<SeedItemProps> = ({ children }) => {
  return <div className={styles.seed_item}>{children}</div>;
};
