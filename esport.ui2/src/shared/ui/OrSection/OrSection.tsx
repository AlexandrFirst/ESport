import React, { FC } from "react";
import styles from "./OrSection.module.css";
import { SubTitle } from "..";
import cn from "classnames";

interface OrSectionProps {
  className?: string;
}

export const OrSection: FC<OrSectionProps> = ({ className }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <hr className={styles.line} />
      <SubTitle className={styles.text}>OR</SubTitle>
      <hr className={styles.line} />
    </div>
  );
};
