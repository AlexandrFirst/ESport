import React, { Fragment } from "react";
import styles from "./Dropdown.module.css";
import popupStyles from "../styles/popup.module.css";

import { mapDirectionClass } from "../styles/consts";

import cn from "classnames";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { DropdownDirection } from "../types/dropdownDirection";
import {
  AnimatedLabel,
  AnimatedLabelProps,
} from "../../AnimatedLabel/AnimatedLabel";
import { ErrorMessage } from "@/shared/types";
import { FormError } from "../../FormError/FormError";

export interface DropdownBaseProps<T>
  extends Omit<AnimatedLabelProps, "error"> {
  className?: string;
  direction?: DropdownDirection;
  list: T[];
  displayValue: keyof T;
  displayKey: keyof T;
  value?: T;
  onChange?: (value: T) => void;
  name?: string;
  error?: ErrorMessage;
  fullWidth?: boolean;
}

export function DropdownBase<T>({
  className,
  direction = "bottom left",
  displayValue,
  list,
  value,
  onChange,
  label,
  name,
  error,
  displayKey,
  fullWidth,
}: DropdownBaseProps<T>) {
  const menuClasses = [mapDirectionClass[direction]];

  const compareBy = (a: T, b: T) => a?.[displayKey] === b?.[displayKey];

  return (
    <>
      <Listbox
        value={value}
        onChange={onChange}
        as={"div"}
        by={compareBy}
        className={cn(popupStyles.popup, className)}
      >
        {({ disabled, open }) => (
          <>
            {label && (
              <AnimatedLabel
                label={label}
                htmlFor={name}
                labelActive
                disabled={disabled}
                focused={open}
                error={!!error}
              />
            )}
            <Listbox.Button
              name={name}
              className={cn(styles.trigger, {
                [styles.trigger_error]: Boolean(error),
                [styles.disabled]: disabled,
                [styles.full_width]: fullWidth,
              })}
            >
              <span className="block truncate">
                {value && String(value[displayValue])}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options
                as={"ul"}
                className={cn(styles.list, menuClasses)}
              >
                {list?.map((item, index) => (
                  <Listbox.Option
                    className={({ active }) =>
                      cn(styles.item, { [styles.active]: active })
                    }
                    key={index}
                    value={item}
                    // className="ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                  >
                    {({ selected }) => (
                      <div className={"flex items-center gap-2"}>
                        {selected && <CheckIcon className={"w-4 h-4"} />}
                        {String(item[displayValue])}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
      <FormError error={error} />
    </>
  );
}
