import React, { FC, useEffect, useState } from "react";
import styles from "./CreateCompetitionSteps.module.css";

import { useQueryState } from "next-usequerystate";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  BottomNav,
  Card,
  IStep,
  Prompt,
  Stepper,
  StepperList,
  Title,
} from "@/shared/ui";

import {
  CreateCompetitionAdditionalInfo,
  CreateCompetitionFormBasic,
  useCreateCompetition,
} from "@/entities/competition";
import { useSnackbar } from "@/shared/lib";

import { CreationCompetitionSteps } from "../../constants/create-competition-steps";
import { useAllValidation } from "../../lib/hooks/useAllValidation";

import { AnimationWrapper } from "../AnimationWrapper/AnimationWrapper";
import { CreateCategoriesForm } from "../CreateCategoriesForm/CreateCategoriesForm";
import { ICreateCompetitionSteps } from "../../model/types/CreateCompetitionSteps";

interface CreateCompetitionStepsProps {
  className?: string;
}

export const CreateCompetitionSteps: FC<CreateCompetitionStepsProps> = () => {
  const { showError, showApiError, showSuccess } = useSnackbar();

  const [activeStep, setActiveStep] = useQueryState<CreationCompetitionSteps>(
    "step",
    {
      defaultValue: CreationCompetitionSteps.BasicInfo,
      parse: (value) => Number(value),
    }
  );
  const { mutate, isLoading } = useCreateCompetition();

  const validationSchema = useAllValidation(activeStep);

  const methods = useForm<ICreateCompetitionSteps>({
    resolver: yupResolver(validationSchema),
    defaultValues: { categories: [{}] },
  });
  const categoryFields = useFieldArray({
    control: methods.control,
    name: "categories",
  });

  const { isSubmitted, isDirty } = methods.formState;

  const steps: StepperList = [
    {
      value: CreationCompetitionSteps.BasicInfo,
      title: "Basic info",
      completed: !!methods.getValues().title,
    },
    {
      value: CreationCompetitionSteps.AdditionalDescription,
      title: "Add description",
      optional: true,
      completed: !!methods.getValues().description,
    },
    {
      value: CreationCompetitionSteps.CreateCategories,
      title: "Create categories",
    },
  ];

  const handleSubmit = methods.handleSubmit(async (data) => {
    if (activeStep === CreationCompetitionSteps.CreateCategories) {
      if (!data.categories.length) {
        showError("You must create at least one category");
      }
      console.log("===WE ARE HERE===");
      mutate(data, {
        onError: (e) => showApiError(e),
        onSuccess() {
          showSuccess("You created it successfully!");
          // methods.reset()
        },
      });
    } else {
      console.log("===data===", data);
      setActiveStep((step) => step + 1);
    }
  });

  const handleCancel = () => {
    if (activeStep !== CreationCompetitionSteps.BasicInfo) {
      setActiveStep((step) => step - 1);
    }
  };

  const handleStepClick = (step: IStep) => {
    const currentStep = steps[activeStep - 1];
    const checkOptionalOrCompletedBefore = () => {
      for (let i = step.value - 1; i !== 0; i--) {
        const curr = steps[i - 1];
        if (!curr.optional && !curr.completed) {
          return false;
        }
      }
      return true;
    };

    if (
      step.completed ||
      currentStep.optional ||
      step.value <= activeStep ||
      (currentStep.completed && step.value === activeStep + 1) ||
      checkOptionalOrCompletedBefore()
    ) {
      setActiveStep(step.value);
    }
  };

  useEffect(() => {
    if (
      !methods.getValues().title &&
      activeStep !== CreationCompetitionSteps.BasicInfo
    ) {
      setActiveStep(CreationCompetitionSteps.BasicInfo);
    }
  }, [activeStep, methods, setActiveStep]);

  const promptCondition = !isSubmitted && isDirty;

  return (
    <>
      <Title center>Create competiton</Title>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        justifyBetween
        onStepClick={handleStepClick}
        className="my-8"
      />
      <Card padding={"lg"}>
        {activeStep === CreationCompetitionSteps.BasicInfo && (
          <AnimationWrapper>
            <CreateCompetitionFormBasic methods={methods} />
          </AnimationWrapper>
        )}
        {activeStep === CreationCompetitionSteps.AdditionalDescription && (
          <AnimationWrapper>
            <CreateCompetitionAdditionalInfo methods={methods} />
          </AnimationWrapper>
        )}
        {activeStep === CreationCompetitionSteps.CreateCategories && (
          <AnimationWrapper>
            <CreateCategoriesForm
              methods={methods}
              categoryFields={categoryFields}
            />
          </AnimationWrapper>
        )}
      </Card>
      <Prompt shouldConfirmLeave={promptCondition} />
      <BottomNav
        withCancel
        cancelText={"Back"}
        cancelColor={"normal"}
        onCancel={handleCancel}
        onSave={handleSubmit}
        loading={isLoading}
        cancelDisabled={activeStep === CreationCompetitionSteps.BasicInfo}
        saveText={
          activeStep !== CreationCompetitionSteps.CreateCategories
            ? "Next"
            : "Save"
        }
      />
    </>
  );
};
