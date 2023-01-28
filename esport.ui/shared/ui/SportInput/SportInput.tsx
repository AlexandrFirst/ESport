import React, { forwardRef } from "react";
import styles from "./sportInput.module.scss";

import cn from "classnames";
import { Controller, useFormContext } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";

export type Message = { message: string };

export type SportInputProps = TextFieldProps & {
  name: string;
  errors?: Record<string, Message>;
  callbackOnChange?: (value: string) => void;
};

export const SportInput = forwardRef<HTMLDivElement, SportInputProps>(
  function SportInput(
    {
      name,
      defaultValue,
      variant = "outlined",
      inputProps,
      fullWidth = true,
      errors,
      InputProps,
      inputRef,
      callbackOnChange,
      ...props
    },
    ref
  ) {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...props}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              callbackOnChange?.(e.target.value);
            }}
            variant={variant}
            inputRef={inputRef}
            ref={ref}
            // sx={{
            //   "& .MuiOutlinedInput-root:hover": {
            //     "& > fieldset": {
            //       borderColor: "inherit",
            //     },
            //   },
            // }}
            InputLabelProps={{ className: styles.input_label }}
            InputProps={{
              ...InputProps,
              className: styles.input,
              classes: {
                root: styles.root,
                focused: styles.focus,
              },
            }}
            fullWidth={fullWidth}
            inputProps={{
              ...inputProps,
              className: cn(styles.input, inputProps?.className),
            }}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    );
  }
);
