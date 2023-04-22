import React, { FC, ReactNode } from "react";
import styles from "./SemiBoldText.module.css";
import cn from "classnames";

interface SemiBoldTextProps {
  className?: string;
  children: ReactNode;
}

const SemiBoldText: FC<SemiBoldTextProps> = ({ className, children }) => {
  return <h5 className={cn(styles.wrapper, className)}>{children}</h5>;
};

export default SemiBoldText;
