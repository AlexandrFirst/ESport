import React from "react";
import { Controller } from "react-hook-form";

import { Autocomplete, AutocompleteProps } from "./Autocomplete";

interface FormAutocompleteProps<T extends {} = {}>
  extends AutocompleteProps<T> {}

export function FormAutocomplete<T extends {} = {}>({
  name,
  ...props
}: FormAutocompleteProps<T>) {
  return (
    <Controller
      render={({ field }) => <Autocomplete {...props} {...field} name={name} />}
      name={name}
    />
  );
}
