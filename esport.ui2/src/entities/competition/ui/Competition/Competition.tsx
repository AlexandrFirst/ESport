import { FC } from "react";
import styles from "./Competition.module.css";

interface CompetitionProps {
  className?: string;
}

export const Competition: FC<CompetitionProps> = (props) => {
  return <div className={styles.wrapper}></div>;
};
