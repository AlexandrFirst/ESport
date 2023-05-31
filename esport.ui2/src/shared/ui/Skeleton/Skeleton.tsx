import { FC, HTMLAttributes } from "react";
import styles from "./Skeleton.module.css";

import cn from "classnames";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => {
  return <div className={cn(styles.wrapper, className)} {...props} />;
};
