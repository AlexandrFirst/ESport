import React from "react";
import styles from "./sportButton.module.css";

import { LoadingButton, LoadingButtonProps } from "@mui/lab";

import cn from "classnames";
import { SportSpinner } from "@shared/ui/SportSpinner/SportSpinner";
import { ButtonBase } from "@mui/material";

export interface SportButtonProps extends LoadingButtonProps {
  isNew?: boolean;
  fullWidth?: boolean;
}

export const SportButton: React.FC<SportButtonProps> = ({
  isNew = false,
  className,
  loading,
  disabled,
  variant = "contained",
  fullWidth = true,
  children,
  ...props
}) => {
  return !isNew ? (
    <LoadingButton
      {...props}
      className={cn(
        {
          [styles.contained]: variant === "contained",
          // [styles.outlined]: variant === "outlined",
          [styles.text]: !variant || variant === "text",
        },
        className
      )}
      variant={variant}
      disabled={loading || disabled}
      loading={loading}
    >
      {children}
    </LoadingButton>
  ) : (
    <ButtonBase
      {...props}
      className={cn(styles.btnBase, styles.btn, className, {
        [styles.contained]: variant === "contained",
        [styles.textVariant]: variant === "text",
        [styles.outlined]: variant === "outlined",
        [styles.disabled]: loading || disabled,
        [styles.full_width]: fullWidth,
      })}
    >
      {!loading ? children : <SportSpinner />}
    </ButtonBase>
  );
};
