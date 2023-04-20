import React, { FC, ReactNode } from "react";
import styles from "./TwoItemsGridContainer.module.css";
import cn from "classnames";

interface TwoItemsGridContainerProps {
  className?: string;
  children: ReactNode;
}

export const TwoItemsGridContainer: FC<TwoItemsGridContainerProps> = ({
  className,
  children,
}) => {
  return <div className={cn(styles.wrapper, className)}>{children}</div>;
};
