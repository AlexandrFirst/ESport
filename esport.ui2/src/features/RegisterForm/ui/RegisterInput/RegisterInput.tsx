import React, { forwardRef } from "react";
import styles from "./RegisterInput.module.css";

import cn from "classnames";

import { Input, InputProps, PasswordInput } from "@/shared/ui";

type RegisterInputProps = InputProps & {
  isHided?: boolean;
  type?: "text" | "password";
};

export const RegisterInput = forwardRef<HTMLInputElement, RegisterInputProps>(
  function RegisterInput({ isHided, type = "text", label, ...props }, ref) {
    return type === "text" ? (
      <Input
        {...props}
        ref={ref}
        label={label}
        className={cn(styles.input, { [styles.hide]: isHided })}
      />
    ) : (
      <PasswordInput
        {...props}
        ref={ref}
        placeholder={typeof label === "string" ? label : undefined}
        className={cn(styles.input, { [styles.hide]: isHided })}
      />
    );
  }
);