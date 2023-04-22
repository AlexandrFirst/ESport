import * as yup from "yup";

export const useValidation = () => {
  return yup.object().shape({
    mail: yup
      .string()
      .email("This should be an email")
      .required("This field is required"),
    // .required("This field is required"),
    password: yup.string().required("This field is required"),
  });
};
