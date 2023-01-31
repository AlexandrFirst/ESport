import * as yup from "yup";
import { RegularExpression } from "../../../../shared/enums/regular-expression";

export const useRegisterValidation = () => {
  const phoneRegExp = new RegExp(RegularExpression.phone);
  return yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    telephoneNumber: yup
      .string()
      // .matches(phoneRegExp, "Phone number is not valid"),
  });
};
