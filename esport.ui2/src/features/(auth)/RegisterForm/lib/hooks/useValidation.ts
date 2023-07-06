import * as yup from "yup";

const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const useValidation = () => {
  // const phoneRegExp = new RegExp(RegularExpression.phone);
  return yup.object().shape({
    firstName: yup.string().required().min(5).max(255),
    lastName: yup.string().required().min(5).max(255),
    email: yup.string().email().required(),
    password: yup.string().required().matches(passwordRegExp, {
      message:
        "Password must contain at least 8 characters, one uppercase letter, one number and one special character",
    }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
    telephoneNumber: yup.string(),
    // .matches(phoneRegExp, "Phone number is not valid"),
  });
};
