import React, { Fragment } from "react";
import styles from "./Autocomplete.module.css";

import cn from "classnames";
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
  value?: T;
  onChange?: (value: T) => void;
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
  const { items, handleInputChange, getLoadingOrEmpty } = useAutocomplete({
    list,
    displayValue,
    onInputChange,
    loading,
    additionalOptions,
  });
  const debouncedHandleInputChange = useDebounce(handleInputChange, delayTime);

  return (
    <Combobox value={value} onChange={onChange} nullable>
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
                      cn(styles.option, {
                        [styles.selected]: active,
                        [styles.selected]:
                          activeOption?.[displayKey] === item[displayKey],
                      })
                    }
                  >
                    {String(item[displayValue])}
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </AutocompleteTransition>
        </div>
      )}
    </Combobox>
  );
}
