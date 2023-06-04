import * as yup from "yup";

export const useValidation = () => {
  return yup.object().shape({
    from: yup.string().required("Required"),
    to: yup.string().required("Required"),
  });
};
