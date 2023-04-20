import React, { FC, ReactNode } from "react";
import styles from "./BoldText.module.css";
import cn from "classnames";

interface BoldTextProps {
  className?: string;
  children: ReactNode;
}

const BoldText: FC<BoldTextProps> = ({ className, children }) => {
  return <h5 className={cn(styles.wrapper, className)}>{children}</h5>;
};

export default BoldText;
