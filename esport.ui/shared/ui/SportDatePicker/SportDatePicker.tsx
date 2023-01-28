import React from "react";
import styles from "./sportDatePicker.module.scss";

import { Controller } from "react-hook-form";

import { DatePickerProps, DesktopDatePicker } from "@mui/x-date-pickers";

import { SportLocalizationProvider } from "./SportLocalizationProvider";
import { SportInput, SportInputProps } from "../SportInput/SportInput";

interface SportDatePickerProps
  extends Omit<
    DatePickerProps<any, any>,
    "value" | "onChange" | "renderInput"
  > {
  name: string;
  inputProps?: SportInputProps;
}

export const SportDatePicker: React.FC<SportDatePickerProps> = ({
  name,
  inputProps,
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
            value={field.value ?? null}
            mask="__.__.____"
            inputFormat={"dd.MM.yyyy"}
            PaperProps={{
              className: styles.calendar,
            }}
            renderInput={(params) => (
              <SportInput name={name} {...params} {...inputProps} />
            )}
          />
        )}
      />
    </SportLocalizationProvider>
  );
};
