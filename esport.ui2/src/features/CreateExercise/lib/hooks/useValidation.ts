import * as yup from "yup";

export const useValidation = () => {
  return yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    sports: yup.array().min(1, "At least one sport is required"),
    traumas: yup.array().min(1, "At least one trauma is required"),
    bodyParts: yup.array().min(1, "At least one body part is required"),
  });
};
