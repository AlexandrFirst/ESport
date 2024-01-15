import React, { FC, TextareaHTMLAttributes, useState } from "react";
import styles from "./TextArea.module.css";

import cn from "classnames";

import { ErrorMessage } from "@/shared/types";

import { FormError } from "../FormError/FormError";
import { AnimatedLabel } from "../AnimatedLabel/AnimatedLabel";

export interface TextAreaBaseProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean;
  error?: ErrorMessage;
  label?: string;
  labelActive?: boolean;
}

export const TextAreaBase: FC<TextAreaBaseProps> = ({
  className,
  fullWidth = false,
  error,
  disabled,
  label,
  required,
  labelActive,
  defaultValue,
  value,
  name,
  onFocus,
  ...props
}) => {
  const hasValue = Boolean(defaultValue || value);
  const [focused, setFocused] = useState(hasValue);

  return (
    <div className={cn(styles.wrapper, className)}>
      {label && (
        <AnimatedLabel
          label={required ? `${label} *` : label}
          labelActive={labelActive}
          focused={focused}
          disabled={disabled}
          error={!!error}
          htmlFor={name}
          additionalHeight={-10}
        />
      )}
      <textarea
        {...props}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        className={cn(styles.text_area, {
          [styles.full_width]: fullWidth,
          [styles.error]: !!error,
          [styles.disabled]: disabled,
        })}
      />
      <FormError error={error} />
    </div>
  );
};
