import { InputBaseProps } from "..";
import { Key, ReactNode } from "react";

export type AdditionalOption = {
  onClick?: () => void;
  content: ReactNode;
  key: Key;
};

export type AdditionalOptionList = AdditionalOption[];

export interface AutocompleteCommonProps<T extends {} = {}>
  extends Omit<InputBaseProps, "value" | "onChange" | "list" | "name"> {
  className?: string;
  onInputChange?: (value: string) => void;
  list?: T[];
  displayValue: keyof T;
  displayKey: keyof T;
  loading?: boolean;
  delayTime?: number;
  name?: string;
  additionalOptions?: AdditionalOption[];
}
