import React from "react";
import styles from "./sportDatePicker.module.scss";

import { Controller } from "react-hook-form";

import { DatePickerProps, DesktopDatePicker } from "@mui/x-date-pickers";

import { SportLocalizationProvider } from "@components/SportDatePicker/SportLocalizationProvider";
import { SportInput } from "@components/SportInput/SportInput";

interface SportDatePickerProps
  extends Omit<
    DatePickerProps<any, any>,
    "value" | "onChange" | "renderInput"
  > {
  name: string;
}

export const SportDatePicker: React.FC<SportDatePickerProps> = ({
  name,
  ...props
}) => {
  return (
    <SportLocalizationProvider>
      <Controller
        name={name}
        render={({ field }) => (
          <DesktopDatePicker
            {...props}
            {...field}
            mask="__.__.____"
            inputFormat={"dd.MM.yyyy"}
            PaperProps={{
              className: styles.calendar,
            }}
            renderInput={(params) => <SportInput name={name} {...params} />}
          />
        )}
      />
    </SportLocalizationProvider>
  );
};
