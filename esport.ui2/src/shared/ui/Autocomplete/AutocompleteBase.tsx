import React, { Fragment } from "react";
import styles from "./Autocomplete.module.css";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

import { useDebounce } from "@/shared/lib";

import { InputBase } from "../Input/InputBase";
import { Icon } from "../Icon/Icon";

import { useAutocomplete } from "./useAutocomplete";
import { AutocompleteTransition } from "./AutocompleteTransition";
import { AutocompleteCommonProps } from "./AutocompeleteCommonProps";

export interface AutocompleteBaseProps<T extends {} = {}>
  extends AutocompleteCommonProps<T> {
  value?: T | null;
  onChange?: (value: T | null) => void;
  multiple?: false;
}

export function AutocompleteBase<T extends {} = {}>({
  value,
  onChange,
  onInputChange,
  list,
  displayValue,
  displayKey,
  loading,
  delayTime = 200,
  additionalOptions,
  ...props
}: AutocompleteBaseProps<T>) {
  const {
    items,
    handleInputChange,
    getLoadingOrEmpty,
    getAdditionalOptions,
    getClassNamesForOption,
    handleChange,
  } = useAutocomplete({
    list,
    displayValue,
    onInputChange,
    loading,
    additionalOptions,
    onChange,
  });
  const debouncedHandleInputChange = useDebounce(handleInputChange, delayTime);

  return (
    <Combobox value={value} onChange={handleChange} nullable>
      {({ open, activeOption }) => (
        <div className={styles.wrapper}>
          <Combobox.Input
            as={Fragment}
            onChange={debouncedHandleInputChange}
            displayValue={(item: T) => String(item?.[displayValue] ?? "")}
          >
            <InputBase
              {...props}
              labelActive
              endIcon={
                <Combobox.Button>
                  <Icon
                    Svg={open ? ChevronUpIcon : ChevronDownIcon}
                    aria-hidden="true"
                  />
                </Combobox.Button>
              }
              endIconClassName={styles.end_icon}
            />
          </Combobox.Input>
          <AutocompleteTransition>
            <Combobox.Options static className={styles.options}>
              {getLoadingOrEmpty() ||
                items?.map((item) => (
                  <Combobox.Option
                    key={String(item[displayKey])}
                    value={item}
                    className={({ active }) =>
                      getClassNamesForOption(active, activeOption, item)
                    }
                  >
                    {String(item[displayValue])}
                  </Combobox.Option>
                ))}
              {getAdditionalOptions(activeOption)}
            </Combobox.Options>
          </AutocompleteTransition>
        </div>
      )}
    </Combobox>
  );
}
