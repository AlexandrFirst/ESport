import { FC } from "react";
import styles from "./Trainee.module.css";

interface TraineeProps {
  className?: string;
}

export const Trainee: FC<TraineeProps> = (props) => {
  return <div className={styles.wrapper}></div>;
};
