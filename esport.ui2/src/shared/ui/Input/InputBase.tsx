import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import styles from "./Input.module.css";

import cn from "classnames";
import { motion } from "framer-motion";

import { ErrorMessage } from "@/shared/types";

import { FormError } from "../FormError/FormError";

export type InputBaseProps = InputHTMLAttributes<HTMLInputElement> & {
  name?: string;
  errors?: Record<string, ErrorMessage>;
  callbackOnChange?: (value: string) => void;
  label?: ReactNode;
  endIcon?: ReactNode;
  variant?: "outlined" | "standard" | "filled";
  fullWidth?: boolean;
  labelActive?: boolean;
  marginTop?: "sm" | "md" | "lg" | "none";
  endIconClassName?: string;
  error?: ErrorMessage;
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
        })}
      >
        <div className={cn(styles.wrapper)}>
          {label && (
            <motion.label
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                y: labelActive || focused ? -35 : 0,
                x: labelActive || focused ? -10 : 0,
              }}
              htmlFor={name}
              className={cn(styles.text, styles.label, {
                [styles.error]: !!error,
              })}
            >
              {label}
            </motion.label>
          )}
          <input
            {...props}
            ref={ref}
            placeholder={label && !labelActive ? undefined : placeholder}
            value={value}
            id={name}
            className={cn(styles.input_1, styles.text, {
              [styles.input_1_error]: !!error,
            })}
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
        {/*<AnimatePresence initial={false}>*/}
        {/*  {error && (*/}
        {/*    <motion.p*/}
        {/*      initial={{ opacity: 0, scale: 0 }}*/}
        {/*      animate={{ opacity: 1, scale: 1 }}*/}
        {/*      exit={{ opacity: 0, scale: 0 }}*/}
        {/*      className={cn(styles.error, styles.helper_text)}*/}
        {/*    >*/}
        {/*      {error.message}*/}
        {/*    </motion.p>*/}
        {/*  )}*/}
        {/*</AnimatePresence>*/}
        <FormError error={error} />
      </div>
    );
  }
);
