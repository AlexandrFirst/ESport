import React, { CSSProperties, FC } from "react";
import styles from "./Blur.module.css";
import cn from "classnames";

type BlurSize = "small" | "medium" | "large";

interface BlurProps {
  className?: string;
  absolute?: boolean;
  size?: BlurSize;
  style?: CSSProperties;
}

export const Blur: FC<BlurProps> = ({
  className,
  absolute,
  size = "medium",
  style,
}) => {
  return (
    <div
      style={style}
      className={cn(styles.blur, styles[size], className, { absolute })}
    />
  );
};
