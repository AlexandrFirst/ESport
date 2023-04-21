import { FC } from "react";
import styles from "./Profile.module.css";

interface ProfileProps {
  className?: string;
}

export const Profile: FC<ProfileProps> = (props) => {
  return <div className={styles.wrapper}></div>;
};
