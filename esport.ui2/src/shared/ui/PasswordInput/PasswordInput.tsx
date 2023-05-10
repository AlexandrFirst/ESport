import React, { forwardRef, useState } from "react";

import { useFormContext } from "react-hook-form";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { Input, InputProps } from "../Input/Input";
import { IconButton } from "../IconButton/IconButton";

type PasswordInputProps = InputProps & {
  name: string;
  className?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ name, type, ...props }, ref) {
    const {
      formState: { errors },
    } = useFormContext();

    const [visible, setVisible] = useState(false);

    const handleClickShowPassword = () => setVisible((p) => !p);

    // const hasError = !!errors[name]?.message;

    return (
      <Input
        {...props}
        name={name}
        ref={ref}
        type={visible ? "text" : "password"}
        endIcon={
          <IconButton
            Svg={visible ? EyeIcon : EyeSlashIcon}
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            iconSize={"m"}
            // edge="endvisible"
          />
        }
      />
    );
  }
);
