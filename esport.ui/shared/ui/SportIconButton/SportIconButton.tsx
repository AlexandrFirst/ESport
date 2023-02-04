import React from "react";
import styles from "./sportIconButton.module.css";

import cn from "classnames";
import { IconButton, IconButtonProps } from "@mui/material";

export interface SportIconButtonProps extends IconButtonProps {}

export const SportIconButton: React.FC<SportIconButtonProps> = ({
  className,
  disabled,
  children,
  ...props
}) => {
  return (
    <IconButton
      {...props}
      disabled={disabled}
      className={cn(styles.icon_btn, className, {
        [styles.disabled]: disabled,
      })}
    >
      {children}
    </IconButton>
  );
};
