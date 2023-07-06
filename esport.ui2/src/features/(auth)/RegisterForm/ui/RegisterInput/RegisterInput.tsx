import React, { forwardRef } from "react";
import styles from "./RegisterInput.module.css";

import cn from "classnames";

import { Input, InputBaseProps, PasswordInput } from "@/shared/ui";

type RegisterInputProps = Omit<InputBaseProps, "name"> & {
  name: string;
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
        fullWidth
      />
    ) : (
      <PasswordInput
        {...props}
        ref={ref}
        placeholder={typeof label === "string" ? label : undefined}
        className={cn(styles.input, { [styles.hide]: isHided })}
        fullWidth
      />
    );
  }
);
