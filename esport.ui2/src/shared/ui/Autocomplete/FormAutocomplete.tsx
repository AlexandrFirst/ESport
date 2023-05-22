import React from "react";
import { Controller } from "react-hook-form";

import { Autocomplete, AutocompleteProps } from "./Autocomplete";

interface FormAutocompleteProps<T extends {} = {}>
  extends Omit<AutocompleteProps<T>, "name"> {
  name: string;
}

export function FormAutocomplete<T extends {} = {}>({
  name,
  // multiple,
  ...props
}: FormAutocompleteProps<T>) {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <Autocomplete {...props} {...field} {...fieldState} name={name} />
      )}
      name={name}
    />
  );
}
