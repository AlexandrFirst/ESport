import React, { FC, ReactNode } from "react";
import styles from "./Selected.module.css";
import cn from "classnames";

interface SelectedProps {
  className?: string;
  children: ReactNode;
}

export const Selected: FC<SelectedProps> = ({ className, children }) => {
  return <span className={cn(styles.accent_text, className)}>{children}</span>;
};
