import React, { FC, ReactNode } from "react";
import styles from "./Bracket.module.css";

interface BracketProps {
  className?: string;
  children: ReactNode;
}

export const Bracket: FC<BracketProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
