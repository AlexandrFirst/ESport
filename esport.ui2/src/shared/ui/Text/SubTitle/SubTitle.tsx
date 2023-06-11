import React, { FC, memo, ReactNode } from "react";
import styles from "./SubTitle.module.css";

import cn from "classnames";

export type SubTitleSize = "small" | "medium" | "large" | "extra-large";

interface SubTitleProps {
  className?: string;
  children: ReactNode;
  size?: SubTitleSize;
  center?: boolean;
}

const SubTitle: FC<SubTitleProps> = ({
  className,
  size = "medium",
  children,
  center = false,
}) => {
  return (
    <h2
      className={cn(styles.text, styles[size], className, {
        [styles.center]: center,
      })}
    >
      {children}
    </h2>
  );
};

export default memo(SubTitle);
