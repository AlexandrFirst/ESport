import { FC, HTMLAttributes } from "react";
import styles from "./Skeleton.module.css";

import cn from "classnames";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export const Skeleton: FC<SkeletonProps> = ({
  className = "w-[100px] h-[20px] rounded-full",
  ...props
}) => {
  return <div className={cn(styles.wrapper, className)} {...props} />;
};
