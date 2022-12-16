import React from "react";
import styles from "./sportButton.module.css";

import { Button, ButtonProps } from "@mui/material";
import cn from "classnames";

interface SportButtonProps extends ButtonProps {}

export const SportButton: React.FC<SportButtonProps> = ({
  children,
  className,
  variant = "contained",
  ...props
}) => {
  return (
    <Button
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
    </Button>
  );
};
