import React, { FC, memo, ReactNode } from "react";
import styles from "./ErrorText.module.css";
import cn from "classnames";

interface ErrorTextProps {
  className?: string;
  children?: ReactNode;
}

const ErrorText: FC<ErrorTextProps> = ({ className, children }) => {
  return <h6 className={cn(styles.wrapper, className)}>{children}</h6>;
};

export default memo(ErrorText);
