import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { TextAreaBase, TextAreaBaseProps } from "./TextAreaBase";

interface TextAreaProps extends TextAreaBaseProps {
  name: string;
}

export const TextArea: FC<TextAreaProps> = ({
  name,
  defaultValue,
  ...props
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue ?? ""}
      render={({ field, fieldState }) => (
        <TextAreaBase {...props} {...field} {...fieldState} />
      )}
    />
  );
};
