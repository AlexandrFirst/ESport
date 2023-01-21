import React, { useState } from "react";
import styles from "./sportPasswordInput.module.css";

import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";

import {
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { SportIconButton } from "../SportIconButton/SportIconButton";

type SportPasswordInputProps = OutlinedInputProps & {
  name: string;
  className?: string;
};

export const SportPasswordInput: React.FC<SportPasswordInputProps> = ({
  id,
  name,
  defaultValue,
  className,
  inputProps,
  fullWidth = true,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [visible, setVisible] = useState(false);

  const handleClickShowPassword = () => {
    setVisible((prev) => !prev);
  };

  const hasError = !!errors[name]?.message;
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <OutlinedInput
            {...props}
            {...field}
            id={id}
            sx={{
              borderColor: "inherit",
            }}
            type={visible ? "text" : "password"}
            fullWidth={fullWidth}
            className={cn(styles.input_container, className)}
            classes={{
              root: styles.root,
              focused: styles.focus,
            }}
            inputProps={{
              ...inputProps,
              className: cn(styles.input, inputProps?.className, {
                [styles.error]: hasError,
              }),
            }}
            error={hasError}
            color="primary"
            endAdornment={
              <InputAdornment position="end">
                <SportIconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {visible ? (
                    <VisibilityOff
                      className={cn(styles.icon, { [styles.error]: hasError })}
                    />
                  ) : (
                    <Visibility
                      className={cn(styles.icon, { [styles.error]: hasError })}
                    />
                  )}
                </SportIconButton>
              </InputAdornment>
            }
          />
        )}
      />
      {hasError && (
        <FormHelperText className={styles.error_helper_text} id={id}>
          {errors[name]?.message as string}
        </FormHelperText>
      )}
    </>
  );
};
