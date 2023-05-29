import React, { FC, memo, ReactNode } from "react";
import styles from "./SubTitle.module.css";

import cn from "classnames";

export type SubTitleSize = "small" | "medium" | "large";

interface SubTitleProps {
  className?: string;
  children: ReactNode;
  size?: SubTitleSize;
}

const SubTitle: FC<SubTitleProps> = ({
  className,
  size = "medium",
  children,
}) => {
  return (
    <h2 className={cn(styles.text, styles[size], className)}>{children}</h2>
  );
};

export default memo(SubTitle);
