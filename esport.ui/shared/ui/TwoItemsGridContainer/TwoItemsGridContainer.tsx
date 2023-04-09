import React, { FC, ReactNode } from "react";
import styles from "./TwoItemsGridContainer.module.scss";
import cn from "classnames";

interface TwoItemsGridContainerProps {
  className?: string;
  children: ReactNode;
}

const TwoItemsGridContainer: FC<TwoItemsGridContainerProps> = ({
  className,
  children,
}) => {
  return <div className={cn(styles.wrapper, className)}>{children}</div>;
};

export default TwoItemsGridContainer;
