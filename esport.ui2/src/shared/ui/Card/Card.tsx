import cn from "classnames";
import React, { FC, ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  className?: string;
  children?: ReactNode;
}

export const Card: FC<CardProps> = ({ className, children }) => {
  return <div className={cn(styles.wrapper, className)}>{children}</div>;
};
