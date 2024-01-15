import * as yup from "yup";

import { useCreateCompetitionBasicValidation } from "./use-create-competition-validation";
import { CreationCompetitionSteps } from "../../constants/create-competition-steps";

const useCreateCategoriesSchema = () => {
  return yup.object().shape({
    categories: yup.array().of(
      yup.object().shape({
        title: yup.string().required("This field is required"),
      })
    ),
  });
};

export const useAllValidation = (activeStep: CreationCompetitionSteps) => {
  const basicSchema = useCreateCompetitionBasicValidation();
  const categoriesSchema = useCreateCategoriesSchema();

  switch (activeStep) {
    case CreationCompetitionSteps.BasicInfo:
      return basicSchema;
    case CreationCompetitionSteps.AdditionalDescription:
      return basicSchema;
    case CreationCompetitionSteps.CreateCategories:
      return categoriesSchema;
  }
};
