import React, { Fragment, useCallback } from "react";
import styles from "./Autocomplete.module.css";

import cn from "classnames";
import { Combobox } from "@headlessui/react";
import { ByComparator } from "@headlessui/react/dist/types";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

import { InputBase } from "../Input/InputBase";
import { Icon } from "../Icon/Icon";

import { useAutocomplete } from "./useAutocomplete";
import { AutocompleteTransition } from "./AutocompleteTransition";
import { AutocompleteCommonProps } from "./AutocompeleteCommonProps";

export interface AutocompleteMultipleBaseProps<T extends {} = {}>
  extends AutocompleteCommonProps<T> {
  multiple: true;
  value?: T[];
  onChange?: (value: T[]) => void;
}

export function AutocompleteMultipleBase<T extends {} = {}>({
  value,
  onChange,
  displayValue,
  displayKey,
  list,
  loading,
  delayTime = 200,
  additionalOptions,
  disabled,
  onInputChange,
  additionalDisplayValue,
  ...props
}: AutocompleteMultipleBaseProps<T>) {
  const {
    items,
    getLoadingOrEmpty,
    handleChange,
    getAdditionalOptions,
    debouncedHandleInputChange,
  } = useAutocomplete({
    list,
    displayValue,
    loading,
    withFilter: false,
    additionalOptions,
    onChange,
    onInputChange,
    delayTime,
  });

  const compare: ByComparator<T> = useCallback(
    (a: T, b: T) => a[displayKey] === b[displayKey],
    [displayKey]
  );

  return (
    <Combobox
      //@ts-ignore
      value={value}
      //@ts-ignore
      onChange={handleChange}
      //@ts-ignore
      nullable
      multiple
      //@ts-ignore
      by={compare}
      disabled={disabled}
    >
      {({ open }) => (
        <div className={styles.wrapper}>
          <Combobox.Input
            as={Fragment}
            displayValue={(items: T[]) =>
              items.map((item) => item[displayValue]).join(", ")
            }
            onChange={debouncedHandleInputChange}
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
                      cn(styles.option, { [styles.selected]: active })
                    }
                  >
                    {({ selected }) => (
                      <div className={"flex gap-3"}>
                        {selected && <Icon Svg={CheckIcon} />}
                        <span>
                          {String(item[displayValue])}{" "}
                          {additionalDisplayValue
                            ? `(${String(item[additionalDisplayValue])})`
                            : ""}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              {getAdditionalOptions()}
            </Combobox.Options>
          </AutocompleteTransition>
        </div>
      )}
    </Combobox>
  );
}
