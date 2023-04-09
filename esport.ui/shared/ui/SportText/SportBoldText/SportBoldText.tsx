import React, { FC, ReactNode } from "react";
import styles from "./SportBoldText.module.scss";
import cn from "classnames";

interface SportBoldTextProps {
  className?: string;
  children: ReactNode;
}

const SportBoldText: FC<SportBoldTextProps> = ({ className, children }) => {
  return <h5 className={cn(styles.wrapper, className)}>{children}</h5>;
};

export default SportBoldText;
