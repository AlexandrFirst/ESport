import React from "react";
import styles from "./registerInput.module.scss";

import cn from "classnames";

import { SportInput, SportInputProps } from "@components/SportInput/SportInput";
import { SportPasswordInput } from "@components/SportPasswordInput/SportPasswordInput";

type RegisterInputProps = SportInputProps & {
  isHided?: boolean;
  type?: "text" | "password";
};

export const RegisterInput: React.FC<RegisterInputProps> = ({
  isHided,
  type = "text",
  label,
  ...props
}) => {
  return type === "text" ? (
    <SportInput
      {...props}
      label={label}
      className={cn(styles.input, { [styles.hide]: isHided })}
    />
  ) : (
    <SportPasswordInput
      {...(props as any)}
      placeholder={label}
      className={cn(styles.input, { [styles.hide]: isHided })}
    />
  );
};
