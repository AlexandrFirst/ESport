import { INSTEAD_STRING } from "@shared/consts/app";
import { Maybe } from "@shared/types/maybe";

export const validateStr = (
  value: Maybe<string | number>,
  instead = INSTEAD_STRING
) => {
  return value ?? instead;
};
