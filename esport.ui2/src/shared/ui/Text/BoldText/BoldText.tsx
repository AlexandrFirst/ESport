import React, { FC, ReactNode } from "react";
import styles from "./BoldText.module.css";
import cn from "classnames";

interface BoldTextProps {
  className?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  center?: boolean;
}

const BoldText: FC<BoldTextProps> = ({
  className,
  size = "md",
  center,
  children,
}) => {
  return (
    <h5
      className={cn(
        styles.wrapper,
        styles[size],
        className,
        center ? styles.center : styles.fit
      )}
    >
      {children}
    </h5>
  );
};

export default BoldText;
