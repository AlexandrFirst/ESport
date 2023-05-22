import { FC } from "react";
import styles from "./Gym.module.css";

interface GymProps {
  className?: string;
}

export const Gym: FC<GymProps> = (props) => {
  return <div className={styles.wrapper}></div>;
};
