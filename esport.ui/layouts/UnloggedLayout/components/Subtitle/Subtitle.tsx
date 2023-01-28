import React, { PropsWithChildren } from "react";
import styles from "./subtitle.module.scss";

import cn from "classnames";

interface SubtitleProps extends PropsWithChildren {
  className?: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({ className, children }) => {
  return <h2 className={cn(styles.text, className)}>{children}</h2>;
};
