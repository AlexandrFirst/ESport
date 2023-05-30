import { ServerStage } from "@/shared/constants";
import {
  capitalize,
  randomAlphabetString,
  randomNumberString,
} from "@/shared/lib";

import { IRegisterForm } from "../../model/types/RegisterFormSchema";

export const getDefaultValues = (): IRegisterForm => {
  if (process.env.NEXT_PUBLIC_STAGE !== ServerStage.Prod) {
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
