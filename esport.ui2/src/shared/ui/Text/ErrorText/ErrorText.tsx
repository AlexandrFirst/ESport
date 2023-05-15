import React, { FC, memo, ReactNode } from "react";
import styles from "./ErrorText.module.css";

interface ErrorTextProps {
  className?: string;
  children?: ReactNode;
}

const ErrorText: FC<ErrorTextProps> = ({ className, children }) => {
  return <h6 className={styles.wrapper}>{children}</h6>;
};

export default memo(ErrorText);
