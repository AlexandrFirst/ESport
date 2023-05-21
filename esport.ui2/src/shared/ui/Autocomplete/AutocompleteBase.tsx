import React, { ChangeEvent, Fragment } from "react";
import styles from "./Autocomplete.module.css";

import cn from "classnames";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { BeatLoader } from "react-spinners";

import { useDebounce } from "@/shared/lib";

import { InputBase, InputBaseProps } from "../Input/InputBase";
import { Icon } from "../Icon/Icon";

export interface AutocompleteBaseProps<T extends {} = {}>
  extends Omit<InputBaseProps, "value" | "onChange" | "list"> {
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
  onInputChange?: (value: string) => void;
  list: T[];
  displayValue: keyof T;
  displayKey: keyof T;
  label?: string;
  loading?: boolean;
  delayTime?: number;
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
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    onInputChange?.(e.target.value);

  const debouncedHandleInputChange = useDebounce(handleInputChange, delayTime);

  return (
    <Combobox value={value} onChange={onChange} nullable>
      {({ open }) => (
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
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options static className={styles.options}>
              {loading ? (
                <div className={"text-center py-4"}>
                  <BeatLoader color={"#b2c9df"} />
                </div>
              ) : (
                list.map((item) => (
                  <Combobox.Option
                    key={String(item[displayKey])}
                    value={item}
                    className={({ active }) =>
                      cn(styles.option, { [styles.selected]: active })
                    }
                  >
                    {String(item[displayValue])}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      )}
    </Combobox>
  );
}
