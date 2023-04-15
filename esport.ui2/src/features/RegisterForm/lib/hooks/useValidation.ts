import * as yup from "yup";

export const useValidation = () => {
  // const phoneRegExp = new RegExp(RegularExpression.phone);
  return yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
    telephoneNumber: yup.string(),
    // .matches(phoneRegExp, "Phone number is not valid"),
  });
};
