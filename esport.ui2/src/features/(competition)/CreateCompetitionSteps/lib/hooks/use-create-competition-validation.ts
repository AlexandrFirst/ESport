import * as yup from "yup";

export const useCreateCompetitionBasicValidation = () => {
  return yup.object().shape({
    title: yup.string().required("This field is required"),
    dateStart: yup.string().required("This field is required"),
  });
};
