import React, { FC, ReactNode } from "react";
import styles from "./CardSubTitle.module.scss";
import cn from "classnames";

interface CardSubTitleProps {
  children: ReactNode;
  gap?: boolean;
  className?: string;
}

export const CardSubTitle: FC<CardSubTitleProps> = ({
  gap,
  className,
  children,
}) => {
  return (
    <h4
      className={cn(styles.subtitle, className, {
        [styles.gap]: gap,
      })}
    >
      {children}
    </h4>
  );
};
