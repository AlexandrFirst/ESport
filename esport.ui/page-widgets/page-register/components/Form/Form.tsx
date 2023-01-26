import React, { useState } from "react";
import styles from "./form.module.scss";

import cn from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Grid, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import { routes } from "routes";

import { useMedia } from "@shared/lib/hooks/useMedia";

import { RegisterSteps } from "@layouts/UnloggedLayout/enums";
import { IRegisterForm } from "@layouts/UnloggedLayout/interfaces";

import { SportForm } from "@features/SportForm/SportForm";

import { SportButton } from "@shared/ui/SportButton/SportButton";
import { SportIconButton } from "@shared/ui/SportIconButton/SportIconButton";
import { SportLink } from "@shared/ui/SportLink/SportLink";
import { Dividers } from "@shared/ui/Dividers/Dividers";

import { useRegisterValidation } from "@page-widgets/page-register/lib/hooks/useRegisterValidation";
import { useRegister } from "@page-widgets/page-register/lib/hooks/useRegister";

import { ThirdStep } from "../ThirdStep/ThirdStep";
import { FirstStep } from "../FirstStep/FirstStep";
import { SecondStep } from "../SecondStep/SecondStep";

export const Form: React.FC = () => {
  const validationSchema = useRegisterValidation();
  const methods = useForm<IRegisterForm>({
    resolver: yupResolver(validationSchema),
  });
  const { register } = methods;

  const [currStep, setCurrStep] = useState(RegisterSteps.MainInfo);

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
