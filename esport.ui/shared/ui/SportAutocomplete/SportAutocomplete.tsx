import React, { FC } from "react";

import { useAutocomplete } from "@mui/material";

import { SportInput, SportInputProps } from "@shared/ui/SportInput/SportInput";

type SportAutocompleteProps<T> = SportInputProps & {
  options: Record<string, T>[];
  displayKey?: string;
};

export const SportAutocomplete: FC<SportAutocompleteProps<any>> = ({
  options = [],
  id,
  displayKey,
  ...props
}) => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id,
    defaultValue: [options?.[0]?.[displayKey ?? ""]],
    // multiple: true,
    options,
    getOptionLabel: (option) => {
      const key = displayKey as keyof typeof option;
      if (option?.[key]) {
        return option[key] as string;
      }
      return option as string;
    },
  });

  console.log("===groupedOptions===", groupedOptions);
  console.log("===options===", options);

  return (
    <>
      <SportInput {...props} ref={setAnchorEl} id={id} />
      <ul>
        {groupedOptions?.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </>
    // <Autocomplete
    //   disablePortal
    //   id={id}
    //   options={options}
    //   // sx={{ width: 300 }}
    //   renderInput={({ id, fullWidth }) => (
    //
    //   )}
    // />
  );
};
