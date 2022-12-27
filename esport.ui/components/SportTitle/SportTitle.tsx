import React, { PropsWithChildren } from "react";
import styles from "./sportTitle.module.css";
import cn from "classnames";

interface SportTitleProps extends PropsWithChildren {
  className?: string;
}

export const SportTitle: React.FC<SportTitleProps> = ({
  className,
  children = "E-SPORT",
}) => {
  return <h1 className={cn(styles.title, className)}>{children}</h1>;
};
