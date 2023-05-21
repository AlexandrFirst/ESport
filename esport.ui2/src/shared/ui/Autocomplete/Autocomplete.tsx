import React, { useEffect, useState } from "react";
import { AutocompleteBase, AutocompleteBaseProps } from "./AutocompleteBase";

export interface AutocompleteProps<T extends {} = {}>
  extends AutocompleteBaseProps<T> {
  lazy?: boolean;
}

export function Autocomplete<T extends {} = {}>({
  lazy,
  onInputChange,
  loading,
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

  return (
    <AutocompleteBase
      {...props}
      onInputChange={onInputChange ? handleInputChange : undefined}
      loading={isLoading}
    />
  );
}
