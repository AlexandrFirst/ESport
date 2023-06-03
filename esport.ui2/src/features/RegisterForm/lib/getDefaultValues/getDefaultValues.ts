import {
  capitalize,
  randomAlphabetString,
  randomNumberString,
} from "@/shared/lib";

import { IRegisterForm } from "../../model/types/RegisterFormSchema";

export const getDefaultValues = (): IRegisterForm => {
  if (process.env.NODE_ENV !== "production") {
    return {
      email: `user${randomNumberString(4)}@test.com`,
      firstName: capitalize(randomAlphabetString(5)),
      lastName: capitalize(randomAlphabetString(5)),
      password: "$Tiger123",
      confirmPassword: "$Tiger123",
      telephoneNumber: `+380${randomNumberString(9)}`,
    };
  }

  return {
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    telephoneNumber: "",
  };
};
