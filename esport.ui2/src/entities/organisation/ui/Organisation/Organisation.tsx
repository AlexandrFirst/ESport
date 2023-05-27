import { FC } from "react";
import styles from "./Organisation.module.css";

interface OrganizationProps {
  className?: string;
}

export const Organisation: FC<OrganizationProps> = (props) => {
  return <div className={styles.wrapper}></div>;
};
