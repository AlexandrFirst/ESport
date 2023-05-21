import React, { useState } from "react";
import { AutocompleteBase, AutocompleteBaseProps } from "./AutocompleteBase";

export interface AutocompleteProps<T extends {} = {}>
  extends AutocompleteBaseProps<T> {
  lazy?: boolean;
}

export function Autocomplete<T extends {} = {}>({
  lazy,
  onInputChange,
  ...props
}: AutocompleteProps<T>) {
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async (value: string) => {
    if (lazy) {
      setIsLoading(true);
      await onInputChange?.(value);
      setIsLoading(false);
    } else {
      onInputChange?.(value);
    }
  };

  return (
    <AutocompleteBase
      {...props}
      onInputChange={handleInputChange}
      loading={isLoading}
    />
  );
}
