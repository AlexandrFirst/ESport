import React from "react";
import styles from "./sportButton.module.css";

import { LoadingButton, LoadingButtonProps } from "@mui/lab";

import cn from "classnames";

interface SportButtonProps extends LoadingButtonProps {}

export const SportButton: React.FC<SportButtonProps> = ({
  children,
  className,
  variant = "contained",
  ...props
}) => {
  return (
    <LoadingButton
      {...props}
      className={cn(
        {
          [styles.contained]: variant === "contained",
          [styles.outlined]: variant === "outlined",
          [styles.text]: !variant || variant === "text",
        },
        className
      )}
      variant={variant}
    >
      {children}
    </LoadingButton>
  );
};
