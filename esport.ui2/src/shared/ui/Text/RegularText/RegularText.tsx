import React, { FC, ReactNode } from "react";
import styles from "./RegularText.module.css";
import cn from "classnames";

interface SemiBoldTextProps {
  className?: string;
  children: ReactNode;
}

const RegularText: FC<SemiBoldTextProps> = ({ className, children }) => {
  return <h5 className={cn(styles.wrapper, className)}>{children}</h5>;
};

export default RegularText;
