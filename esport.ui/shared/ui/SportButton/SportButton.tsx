import React from "react";
import styles from "./sportButton.module.css";

import { LoadingButton, LoadingButtonProps } from "@mui/lab";

import cn from "classnames";
import { SportSpinner } from "@shared/ui/SportSpinner/SportSpinner";
import { ButtonBase } from "@mui/material";

export interface SportButtonProps extends LoadingButtonProps {
  isNew?: boolean;
}

export const SportButton: React.FC<SportButtonProps> = ({
  isNew = false,
  className,
  loading,
  disabled,
  variant = "contained",
  children,
  ...props
}) => {
  return !isNew ? (
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
      disabled={loading || disabled}
      loading={loading}
    >
      {children}
    </LoadingButton>
  ) : (
    <ButtonBase component={"div"} className={styles.btnBase}>
      <button
        {...props}
        className={cn(styles.btn, className, {
          [styles.contained]: variant === "contained",
          [styles.textVariant]: variant === "text",
          [styles.disabled]: loading || disabled,
        })}
      >
        {!loading ? children : <SportSpinner />}
      </button>
    </ButtonBase>
  );
};
