import React, { useEffect, useState } from "react";
import { AutocompleteBase, AutocompleteBaseProps } from "./AutocompleteBase";
import {
  AutocompleteMultipleBase,
  AutocompleteMultipleBaseProps,
} from "./AutocompleteMultipleBase";

export type AutocompleteProps<T extends {} = {}> = (
  | AutocompleteBaseProps<T>
  | AutocompleteMultipleBaseProps<T>
) & {
  lazy?: boolean;
};

export function Autocomplete<T extends {} = {}>({
  lazy,
  onInputChange,
  loading,
  multiple,
  value,
  onChange,
  ...props
}: AutocompleteProps<T>) {
  const [isLoading, setIsLoading] = useState(loading);

  const handleInputChange = async (value: string) => {
    if (lazy && !isLoading) {
      setIsLoading(true);
      await onInputChange?.(value);
      setIsLoading(false);
    } else {
      onInputChange?.(value);
    }
  };

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const inputChangeHandler = onInputChange ? handleInputChange : undefined;

  if (!multiple) {
    return (
      <AutocompleteBase
        {...props}
        onChange={onChange}
        value={value}
        onInputChange={inputChangeHandler}
        loading={isLoading}
      />
    );
  }

  return (
    <AutocompleteMultipleBase
      {...props}
      value={value}
      onChange={onChange}
      multiple
      onInputChange={inputChangeHandler}
      loading={loading}
    />
  );
}
