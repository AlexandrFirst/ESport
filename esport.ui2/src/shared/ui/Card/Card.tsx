import cn from "classnames";
import React, { FC, ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  className?: string;
  children?: ReactNode;
  padding?: "sm" | "md" | "lg" | "none" | "xl";
}

export const Card: FC<CardProps> = ({
  className,
  padding = "lg",
  children,
}) => {
  return (
    <div className={cn(styles.wrapper, styles[padding], className)}>
      {children}
    </div>
  );
};
