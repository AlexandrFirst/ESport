import React, { useState } from "react";
import styles from "./form.module.css";

import cn from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Grid } from "@mui/material";
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
  const { register, trigger } = methods;

  const [currStep, setCurrStep] = useState(RegisterSteps.MainInfo);

  const { isMobile } = useMedia();
  const apiRegister = useRegister();

  const isFirstStep = currStep === RegisterSteps.MainInfo;
  const isLastStep = currStep === RegisterSteps.AdditioanalInfo;

  const validate = async (currStep: RegisterSteps) => {
    if (currStep === RegisterSteps.MainInfo) {
      return trigger(["email", "firstName", "lastName"]);
    } else if (currStep === RegisterSteps.SportInfo) {
      return trigger(["password", "confirmPassword"]);
    } else if (currStep === RegisterSteps.AdditioanalInfo) {
      return trigger(["telephoneNumber"]);
    }
  };

  const handleNext = async () => {
    const isValidated = await validate(currStep);
    if (isValidated) {
      setCurrStep((p) => p + 1);
    }
  };

  const handleBack = () => setCurrStep((p) => p - 1);

  const onSubmit = methods.handleSubmit(apiRegister);

  return (
    <SportForm
      methods={methods}
      className={cn(styles.form, {
        [styles.form_mobile]: isMobile,
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
          <SportButton
            fullWidth={false}
            isNew
            className={styles.btn}
            onClick={handleNext}
          >
            Next
          </SportButton>
        ) : (
          <SportButton
            fullWidth={false}
            isNew
            className={styles.btn}
            onClick={onSubmit}
          >
            Submit
          </SportButton>
        )}
      </Grid>
      <span className={styles.text}>Already have an account? </span>
      <SportLink to={routes.Login}>Sign in instead</SportLink>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={styles.grid}
      >
        <Dividers>
          <span className={cn(styles.text, styles.dividers)}>or</span>
        </Dividers>
      </Grid>
    </SportForm>
  );
};
