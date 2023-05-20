import React, { forwardRef, useState } from "react";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { Input } from "../Input/Input";
import { InputBaseProps } from "../Input/InputBase";
import { IconButton } from "../IconButton/IconButton";

type PasswordInputProps = InputBaseProps & {
  name: string;
  className?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ name, type, ...props }, ref) {
    const [visible, setVisible] = useState(false);

    const handleClickShowPassword = () => setVisible((p) => !p);

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
