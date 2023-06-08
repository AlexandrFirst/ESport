import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { CheckboxBase, CheckboxBaseProps } from "./CheckboxBase";

interface CheckboxProps extends CheckboxBaseProps {
  name: string;
}

export const Checkbox: FC<CheckboxProps> = ({ name, ...props }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <CheckboxBase
          {...props}
          {...fieldState}
          checked={field.value}
          onCheckedChange={field.onChange}
          name={name}
        />
      )}
    />
  );
};
