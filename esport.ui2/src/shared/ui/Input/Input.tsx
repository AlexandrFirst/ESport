import React, { forwardRef } from "react";

import { Controller } from "react-hook-form";
import { InputBase, InputBaseProps } from "./InputBase";

interface InputProps extends Omit<InputBaseProps, "name"> {
  name: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { name, defaultValue, ...props },
  ref
) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue ?? ""}
      render={({ field, fieldState }) => (
        <InputBase {...props} {...field} {...fieldState} />
      )}
    />
  );
});
