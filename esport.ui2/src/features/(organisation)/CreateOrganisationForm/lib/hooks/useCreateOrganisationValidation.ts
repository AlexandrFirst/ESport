import * as yup from "yup";

export const useCreateOrganisationValidation = () => {
  return yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
  });
};
