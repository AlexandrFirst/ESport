import React, { FC, ReactNode } from "react";
import styles from "./SeedsList.module.css";

interface SeedsListProps {
  className?: string;
  children?: ReactNode;
}

export const SeedsList: FC<SeedsListProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
