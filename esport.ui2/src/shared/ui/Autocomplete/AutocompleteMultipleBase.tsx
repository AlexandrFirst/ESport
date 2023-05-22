import React, { Fragment, useCallback } from "react";
import styles from "./Autocomplete.module.css";

import cn from "classnames";
import { Combobox } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

import { InputBase, InputBaseProps } from "../Input/InputBase";
import { Icon } from "../Icon/Icon";

import { useAutocomplete } from "./useAutocomplete";
import { AutocompleteTransition } from "./AutocompleteTransition";
import { ByComparator } from "@headlessui/react/dist/types";

export interface AutocompleteMultipleBaseProps<T extends {} = {}>
  extends Omit<InputBaseProps, "value" | "onChange" | "list" | "name"> {
  value?: T[];
  onChange?: (value: T[]) => void;
  className?: string;
  list?: T[];
  loading?: boolean;
  delayTime?: number;
  name?: string;
  displayValue: keyof T;
  displayKey: keyof T;
  onInputChange?: (value: string) => void;
  multiple: true;
}

export function AutocompleteMultipleBase<T extends {} = {}>({
  value,
  onChange,
  displayValue,
  displayKey,
  list,
  loading,
  delayTime = 200,
  ...props
}: AutocompleteMultipleBaseProps<T>) {
  const { items, getLoadingOrEmpty, handleInputChange } = useAutocomplete({
    list,
    displayValue,
    loading,
    withFilter: false,
  });

  const compare: ByComparator<T> = useCallback(
    (a: T, b: T) => a[displayKey] === b[displayKey],
    [displayKey]
  );

  return (
    //@ts-ignore
    <Combobox value={value} onChange={onChange} nullable multiple by={compare}>
      {({ open }) => (
        <div className={styles.wrapper}>
          <Combobox.Input
            as={Fragment}
            displayValue={(items: T[]) =>
              items.map((item) => item[displayValue]).join(", ")
            }
            onChange={handleInputChange}
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
                        <span>{String(item[displayValue])}</span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </AutocompleteTransition>
        </div>
      )}
    </Combobox>
  );
}
