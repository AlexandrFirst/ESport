import React, { FC } from "react";
import { Input } from "../Input/Input";
import { InputBaseProps } from "../Input/InputBase";

interface DatePickerProps extends Omit<InputBaseProps, "name"> {
  name: string;
  className?: string;
}

export const DatePicker: FC<DatePickerProps> = (props) => {
  return <Input {...props} type="date" labelActive />;
};
