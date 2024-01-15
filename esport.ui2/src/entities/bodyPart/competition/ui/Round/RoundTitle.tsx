import React, { FC, ReactNode } from "react";
import styles from "./Round.module.css";

interface RoundTitleProps {
  children: ReactNode;
}

export const RoundTitle: FC<RoundTitleProps> = ({ children }) => {
  return <h6 className={styles.title}>{children}</h6>;
};
