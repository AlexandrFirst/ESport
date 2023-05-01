import { Input, InputProps } from "@/shared/ui";
import React, { FC } from "react";

interface DatePickerProps extends InputProps {
  className?: string;
}

export const DatePicker: FC<DatePickerProps> = (props) => {
  return <Input {...props} type="date" labelActive />;
};
