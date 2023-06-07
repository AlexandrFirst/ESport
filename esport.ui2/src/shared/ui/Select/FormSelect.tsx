import React, { FC, ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Select } from "..";

interface FormSelectProps {
  name: string;
  children: ReactNode;
}

export const FormSelect: FC<FormSelectProps> = ({ name, children }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <Select {...field}>{children}</Select>}
    />
  );
};
