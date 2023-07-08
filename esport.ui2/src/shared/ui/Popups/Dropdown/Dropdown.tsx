import React from "react";
import { Controller } from "react-hook-form";
import { DropdownBase, DropdownBaseProps } from "./DropdownBase";

export interface DropdownProps<T> extends DropdownBaseProps<T> {
  name: string;
  defaultValue?: T;
}

export function Dropdown<T>({
  name,
  defaultValue,
  ...props
}: DropdownProps<T>) {
  return (
    <Controller
      name={name}
      render={({ field }) => <DropdownBase {...props} {...field} />}
      defaultValue={defaultValue}
    />
  );
}
