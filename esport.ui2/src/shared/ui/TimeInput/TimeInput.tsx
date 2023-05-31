import { FC } from "react";
import { Controller } from "react-hook-form";
import { TimeInputBase } from "..";
import { TimeInputBaseProps } from "./TimeInputBase";

interface TimeInputProps extends TimeInputBaseProps {
  name: string;
}

export const TimeInput: FC<TimeInputProps> = ({ name, ...props }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <TimeInputBase {...props} {...field} />}
    />
  );
};
