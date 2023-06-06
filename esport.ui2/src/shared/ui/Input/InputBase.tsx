import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import styles from "./Input.module.css";

import cn from "classnames";

import { ErrorMessage } from "@/shared/types";

import { FormError } from "../FormError/FormError";
import {
  AnimatedLabel,
  AnimatedLabelProps,
} from "../AnimatedLabel/AnimatedLabel";

export type InputBaseProps = InputHTMLAttributes<HTMLInputElement> &
  Omit<AnimatedLabelProps, "error" | "htmlFor"> & {
    name?: string;
    errors?: Record<string, ErrorMessage>;
    callbackOnChange?: (value: string) => void;
    label?: ReactNode;
    endIcon?: ReactNode;
    variant?: "outlined" | "standard" | "filled";
    fullWidth?: boolean;
    marginTop?: "sm" | "md" | "lg" | "none";
    endIconClassName?: string;
    error?: ErrorMessage;
    withMarginBottom?: boolean;
  };

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  function InputBase(
    {
      name,
      defaultValue,
      variant = "outlined",
      errors,
      callbackOnChange,
      label,
      placeholder,
      endIcon,
      className,
      fullWidth = true,
      labelActive = false,
      marginTop = "none",
      error,
      onFocus,
      onBlur,
      value,
      endIconClassName,
      disabled,
      withMarginBottom = true,
      ...props
    },
    ref
  ) {
    const hasValue = Boolean(defaultValue || value);
    const [focused, setFocused] = useState(hasValue);

    return (
      <div
        className={cn(styles.main_wrapper, className, {
          [styles.full_width]: fullWidth,
          [styles.initial_width]: !fullWidth,
          [styles.with_margin]: withMarginBottom,
        })}
      >
        <div className={cn(styles.wrapper)}>
          {label && (
            <AnimatedLabel
              label={label}
              labelActive={labelActive}
              focused={focused}
              disabled={disabled}
              error={!!error}
              htmlFor={name}
            />
          )}
          <input
            {...props}
            ref={ref}
            placeholder={label && !labelActive ? undefined : placeholder}
            value={value}
            id={name}
            className={cn(styles.input_1, styles.text, {
              [styles.input_1_error]: !!error,
              [styles.disabled]: disabled,
            })}
            disabled={disabled}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(hasValue);
              onBlur?.(e);
            }}
          />
          <div
            className={cn(styles.endIcon, endIconClassName, {
              [styles.error]: !!error,
            })}
          >
            {endIcon}
          </div>
        </div>
        <FormError error={error} />
      </div>
    );
  }
);
