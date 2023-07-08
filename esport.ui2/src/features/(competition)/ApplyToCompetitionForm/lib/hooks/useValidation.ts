import * as yup from "yup";

export const useValidation = () => {
  return yup.object().shape({
    level: yup.number().min(0).max(10).required(),
    weight: yup.number().min(1).max(1000).required(),
    height: yup.number().min(1).max(1000).required(),
    competitorType: yup.object().shape({
      value: yup.string().required(),
      name: yup.string().required(),
    }),
  });
};
