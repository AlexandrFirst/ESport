import React, { FC, memo, PropsWithChildren } from "react";
import styles from "./Title.module.css";
import cn from "classnames";

interface SportTitleProps extends PropsWithChildren {
  className?: string;
}

export const Title: FC<SportTitleProps> = ({
  className,
  children = "E-SPORT",
}) => {
  return <h1 className={cn(styles.title, className)}>{children}</h1>;
};

export default memo(Title);
