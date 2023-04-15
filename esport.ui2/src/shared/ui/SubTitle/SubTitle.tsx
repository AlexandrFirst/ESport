import React, { FC, memo, ReactNode } from "react";
import styles from "./SubTitle.module.css";

import cn from "classnames";

interface SubTitleProps {
  className?: string;
  children: ReactNode;
}

const SubTitle: FC<SubTitleProps> = ({ className, children }) => {
  return <h2 className={cn(styles.text, className)}>{children}</h2>;
};

export default memo(SubTitle);
