import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import styles from "./sportInput.module.css";

import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { Controller, useFormContext } from "react-hook-form";

export type Message = { message: string };

export type SportInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  errors?: Record<string, Message>;
  callbackOnChange?: (value: string) => void;
  label?: ReactNode;
  endIcon?: ReactNode;
  variant?: "outlined" | "standard" | "filled";
  fullWidth?: boolean;
  labelActive?: boolean;
};

export const SportInput = forwardRef<HTMLInputElement, SportInputProps>(
  function SportInput(
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
      ...props
    },
    ref
  ) {
    const { control } = useFormContext();
    const [focused, setFocused] = useState(false);

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <div
            className={cn(styles.main_wrapper, className, {
              [styles.full_width]: fullWidth,
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
                {...field}
                ref={ref ?? field.ref}
                placeholder={label ? undefined : placeholder}
                id={name}
                className={cn(styles.input_1, styles.text, {
                  [styles.input_1_error]: !!error,
                })}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  field.onBlur();
                  setFocused(!!field.value);
                }}
              />
              <div className={cn(styles.endIcon, { [styles.error]: !!error })}>
                {endIcon}
              </div>
            </div>
            <AnimatePresence initial={false}>
              {error && (
                <motion.p
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className={cn(styles.error, styles.helper_text)}
                >
                  {error.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      />
    );
  }
);

//   <TextField
//     {...props}
//     {...field}
//     onChange={(e) => {
//       field.onChange(e);
//       callbackOnChange?.(e.target.value);
//     }}
//     variant={variant}
//     inputRef={inputRef}
//     ref={ref}
//     // sx={{
//     //   "& .MuiOutlinedInput-root:hover": {
//     //     "& > fieldset": {
//     //       borderColor: "inherit",
//     //     },
//     //   },
//     // }}
//     InputLabelProps={{ className: styles.input_label }}
//     InputProps={{
//       ...InputProps,
//       className: styles.input,
//       classes: {
//         root: styles.root,
//         focused: styles.focus,
//       },
//     }}
//     fullWidth={fullWidth}
//     inputProps={{
//       ...inputProps,
//       className: cn(styles.input, inputProps?.className),
//     }}
//     error={!!error}
//     helperText={error?.message}
//   />
