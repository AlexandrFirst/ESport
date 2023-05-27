import React, { FC } from "react";

// import RDatePicker, { ReactDatePickerProps } from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { InputBase, InputBaseProps } from "../Input/InputBase";

type DatePickerProps = InputBaseProps;

export const DatePickerBase: FC<DatePickerProps> = ({ ...props }) => {
  return <InputBase {...props} type="date" labelActive />;
  // return (
  //   <RDatePicker
  //     {...props}
  //     showTimeSelect
  //     customInput={<InputBase label={label} />}
  //   />
  // );
};
