import { InputBaseProps } from "..";
import { ReactNode } from "react";

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
  additionalOptions?: ReactNode[];
}
