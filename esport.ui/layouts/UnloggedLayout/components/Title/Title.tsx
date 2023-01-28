import React, { PropsWithChildren } from "react";
import styles from "./title.module.scss";

import cn from "classnames";

interface TitleProps extends PropsWithChildren {
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ className, children }) => {
  return <h1 className={cn(styles.text, className)}>{children}</h1>;
};
