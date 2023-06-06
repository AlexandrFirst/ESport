import React, { FC, memo, PropsWithChildren } from "react";
import styles from "./Title.module.css";
import cn from "classnames";

export type TitleSize = "small" | "medium" | "large";

interface SportTitleProps extends PropsWithChildren {
  className?: string;
  center?: boolean;
  size?: TitleSize;
}

export const Title: FC<SportTitleProps> = ({
  className,
  children = "",
  center,
  size = "medium",
}) => {
  return (
    <h1
      className={cn(styles.title, className, styles[size], {
        [styles.center]: center,
      })}
    >
      {children}
    </h1>
  );
};

export default memo(Title);
