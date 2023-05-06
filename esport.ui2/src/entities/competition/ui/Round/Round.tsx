import React, { FC, ReactNode } from "react";
import styles from "./Round.module.css";

interface RoundProps {
  className?: string;
  children?: ReactNode;
}

export const Round: FC<RoundProps> = ({ className, children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
