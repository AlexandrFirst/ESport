import React from "react";
import styles from "./form.module.scss";

import cn from "classnames";
import { UseFormReturn } from "react-hook-form";

import { Grid, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import { useMedia } from "@hooks/useMedia";

import { RegisterSteps } from "@features/UnloggedLayout/enums";
import { IRegisterForm } from "@features/UnloggedLayout/interfaces";

import { routes } from "routes";

import { SportForm } from "@components/SportForm/SportForm";
import { SportButton } from "@components/SportButton/SportButton";
import { SportIconButton } from "@components/SportIconButton/SportIconButton";
import { SportLink } from "@components/SportLink/SportLink";

import { ThirdStep } from "@features/UnloggedLayout/components/page-register/ThirdStep/ThirdStep";
import { useRegister } from "@features/UnloggedLayout/components/page-register/useRegister";
import { FirstStep } from "@features/UnloggedLayout/components/page-register/FirstStep/FirstStep";
import { SecondStep } from "@features/UnloggedLayout/components/page-register/SecondStep/SecondStep";
import { Dividers } from "@features/UnloggedLayout/components/Dividers/Dividers";

interface FormProps {
  methods: UseFormReturn<IRegisterForm>;
  currStep: RegisterSteps;
  setCurrStep: (newStep: RegisterSteps) => void;
}

export const Form: React.FC<FormProps> = ({
  methods,
  currStep,
  setCurrStep,
}) => {
  const { register } = methods;

  const { isMobile } = useMedia();
  const apiRegister = useRegister();

  const isFirstStep = currStep === RegisterSteps.MainInfo;
  const isLastStep = currStep === RegisterSteps.AdditioanalInfo;

  const handleNext = () => {
    const newStep = currStep + 1;
    setCurrStep(newStep);
  };

  const handleBack = () => {
    const newStep = currStep - 1;
    setCurrStep(newStep);
  };

  const onSubmit = methods.handleSubmit(apiRegister);

  return (
    <SportForm
      methods={methods}
      className={cn("text-center overflow-hidden", styles.form, {
        ["w-full"]: isMobile,
        ["w-80"]: !isMobile,
      })}
    >
      <FirstStep currStep={currStep} register={register} />
      <SecondStep currStep={currStep} register={register} />
      <ThirdStep currStep={currStep} register={register} />
      <Grid container justifyContent="space-between">
        <SportIconButton disabled={isFirstStep} onClick={handleBack}>
          <KeyboardDoubleArrowLeftIcon />
        </SportIconButton>
        {!isLastStep ? (
          <SportButton className="w-60 my-3" onClick={handleNext}>
            Next
          </SportButton>
        ) : (
          <SportButton className="w-60 my-3" onClick={onSubmit}>
            Submit
          </SportButton>
        )}
      </Grid>
      <Typography component={"span"} className={styles.text}>
        Already have an account?{" "}
      </Typography>
      <SportLink to={routes.Login}>Sign in instead</SportLink>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className="mt-6"
      >
        <Dividers>
          <Typography className={cn(styles.text, styles.dividers)}>
            or
          </Typography>
        </Dividers>
      </Grid>
    </SportForm>
  );
};
