import React, { Fragment } from "react";
import styles from "./Autocomplete.module.css";

import cn from "classnames";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

import { useDebounce } from "@/shared/lib";

import { InputBase, InputBaseProps } from "../Input/InputBase";
import { Icon } from "../Icon/Icon";
import { useAutocomplete } from "./useAutocomplete";
import { AutocompleteTransition } from "./AutocompleteTransition";

export interface AutocompleteBaseProps<T extends {} = {}>
  extends Omit<InputBaseProps, "value" | "onChange" | "list" | "name"> {
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
  onInputChange?: (value: string) => void;
  list?: T[];
  displayValue: keyof T;
  displayKey: keyof T;
  loading?: boolean;
  delayTime?: number;
  name?: string;
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
  ...props
}: AutocompleteBaseProps<T>) {
  const { items, handleInputChange, getLoadingOrEmpty } = useAutocomplete({
    list,
    displayValue,
    onInputChange,
    loading,
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
