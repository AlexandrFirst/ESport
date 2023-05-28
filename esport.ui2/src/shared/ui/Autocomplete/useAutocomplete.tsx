import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Autocomplete.module.css";

import { BeatLoader } from "react-spinners";
import { Combobox } from "@headlessui/react";
import cn from "classnames";
import { AdditionalOption } from "./AutocompeleteCommonProps";

interface UseAutocompleteParams<T extends {} = {}> {
  list?: T[];
  displayValue: keyof T;
  onInputChange?: (value: string) => void;
  loading?: boolean;
  withFilter?: boolean;
  additionalOptions?: AdditionalOption[];
  onChange?: (value: any) => void;
}

export function useAutocomplete<T extends {} = {}>({
  list,
  onInputChange,
  displayValue,
  loading,
  withFilter = true,
  additionalOptions,
  onChange,
}: UseAutocompleteParams<T>) {
  const [items, setItems] = useState(() => list);

  const getClassNamesForOption = (
    active: boolean,
    activeOption?: T | null,
    option?: any
  ) => {
    return cn(styles.option, {
      [styles.selected]: active,
      [styles.selected]: activeOption === option,
    });
  };

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
        <div className={styles.text_wrapper}>
          <BeatLoader color={"#b2c9df"} />
        </div>
      );
    }
    if (!items?.length) {
      return (
        <div className={styles.text_wrapper}>
          <span className={styles.text}>No results found</span>
        </div>
      );
    }
    return null;
  };

  const getAdditionalOptions = (activeOption?: T | null) => {
    return additionalOptions?.map(({ onClick, content, key }) => (
      <Combobox.Option
        key={key}
        value={{ key, onClick }}
        onClick={onClick}
        className={({ active }) =>
          cn(styles.option, {
            [styles.selected]: active,
            // @ts-ignore
            [styles.selected]: activeOption?.key === key,
            "!cursor-pointer": Boolean(onClick),
          })
        }
      >
        {content}
      </Combobox.Option>
    ));
  };

  const handleChange = (value: T) => {
    if (value?.hasOwnProperty("onClick")) {
      // @ts-ignore
      value.onClick?.();
      return onChange?.(value);
    }
    return onChange?.(value);
  };

  useEffect(() => {
    setItems(() => list);
  }, [list]);

  return {
    items,
    handleInputChange,
    getLoadingOrEmpty,
    getAdditionalOptions,
    getClassNamesForOption,
    handleChange,
  };
}
