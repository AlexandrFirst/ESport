import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import styles from "./Autocomplete.module.css";

import { BeatLoader } from "react-spinners";

interface UseAutocompleteParams<T extends {} = {}> {
  list?: T[];
  displayValue: keyof T;
  onInputChange?: (value: string) => void;
  loading?: boolean;
  withFilter?: boolean;
  additionalOptions?: ReactNode[];
}

export function useAutocomplete<T extends {} = {}>({
  list,
  onInputChange,
  displayValue,
  loading,
  withFilter = true,
  additionalOptions,
}: UseAutocompleteParams<T>) {
  const [items, setItems] = useState(() => list);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (onInputChange) {
      onInputChange(inputValue);
    } else {
      if (withFilter) {
        const filteredItems = list?.filter((item) =>
          String(item[displayValue])
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        );
        setItems(filteredItems);
      }
    }
  };

  const getLoadingOrEmpty = () => {
    if (loading) {
      return (
        <>
          <div className={styles.text_wrapper}>
            <BeatLoader color={"#b2c9df"} />
          </div>
          {additionalOptions}
        </>
      );
    }
    if (!items?.length) {
      return (
        <>
          <div className={styles.text_wrapper}>
            <span className={styles.text}>No results found</span>
          </div>
          {additionalOptions}
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    setItems(() => list);
  }, [list]);

  return {
    items,
    handleInputChange,
    getLoadingOrEmpty,
  };
}
