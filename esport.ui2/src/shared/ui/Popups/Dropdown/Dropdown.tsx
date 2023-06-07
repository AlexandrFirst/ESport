import React from "react";
import { Controller } from "react-hook-form";
import { DropdownBase, DropdownBaseProps } from "./DropdownBase";

interface DropdownProps<T> extends DropdownBaseProps<T> {
  name: string;
}

export function Dropdown<T>({ name, ...props }: DropdownProps<T>) {
  return (
    <Controller
      name={name}
      render={({ field }) => <DropdownBase {...props} {...field} />}
    />
  );
}
