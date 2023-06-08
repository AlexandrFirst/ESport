import { FC } from "react";
import styles from "./Trauma.module.css";

interface TraumaProps {
  className?: string;
}

export const Trauma: FC<TraumaProps> = (props) => {
  return <div className={styles.wrapper}></div>;
};
