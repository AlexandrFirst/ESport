import React, { FC } from "react";
import { InputBase, InputBaseProps } from "../Input/InputBase";

interface DatePickerProps extends InputBaseProps {
  className?: string;
}

export const DatePickerBase: FC<DatePickerProps> = ({ value, ...props }) => {
  return <InputBase {...props} value={value} type="date" labelActive />;
};
