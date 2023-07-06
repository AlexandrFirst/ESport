import * as yup from "yup";

export const useEditOrganisationValidation = () => {
  return yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    gymList: yup.array().of(
      yup.object().shape({
        address: yup.string().required("This is required field"),
        name: yup.string().required("This is required field"),
        closeTime: yup.string(),
        openTime: yup.string(),
      })
    ),
  });
};
