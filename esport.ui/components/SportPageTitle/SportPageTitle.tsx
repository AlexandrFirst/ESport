import React, { PropsWithChildren } from "react";
import styles from "./sportPageTitle.module.css";

import cn from "classnames";

interface SportPageTitleProps extends PropsWithChildren {
  className?: string;
  textCenter?: boolean;
}

export const SportPageTitle: React.FC<SportPageTitleProps> = ({
  className,
  children,
  textCenter,
}) => {
  return (
    <h1
      className={cn(styles.title, className, { [styles.center]: textCenter })}
    >
      {children}
    </h1>
  );
};
