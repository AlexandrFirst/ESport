import React, { forwardRef } from "react";
import styles from "./sportInput.module.css";

import cn from "classnames";
import { Controller, useFormContext } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";

export type Message = { message: string };

export type SportInputProps = TextFieldProps & {
  name: string;
  errors?: Record<string, Message>;
};

export const SportInput = forwardRef<HTMLInputElement, SportInputProps>(
  function SportInput(
    {
      name,
      defaultValue,
      variant = "filled",
      inputProps,
      fullWidth = true,
      errors,
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
            inputRef={ref}
            // sx={{
            //   "& .MuiOutlinedInput-root:hover": {
            //     "& > fieldset": {
            //       borderColor: "inherit",
            //     },
            //   },
            // }}
            InputLabelProps={{ className: styles.input_label }}
            InputProps={{
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
