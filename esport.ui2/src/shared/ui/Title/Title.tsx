import React, { FC, memo, PropsWithChildren } from "react";
import styles from "./Title.module.css";
import cn from "classnames";

interface SportTitleProps extends PropsWithChildren {
  className?: string;
  center?: boolean;
}

export const Title: FC<SportTitleProps> = ({
  className,
  children = "",
  center,
}) => {
  return (
    <h1 className={cn(styles.title, className, { [styles.center]: center })}>
      {children}
    </h1>
  );
};

export default memo(Title);
