import React from "react";
import styles from "./Form.module.css";

import cn from "classnames";
import {UseFormReturn} from "react-hook-form";

import {Grid} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import {useMedia} from "@hooks/useMedia";

import {RegisterSteps} from "@features/UnloggedLayout/enums";
import {IRegisterForm} from "@features/UnloggedLayout/interfaces";
import {routes} from "routes";

import {SportForm} from "@components/SportForm/SportForm";
import {SportButton} from "@components/SportButton/SportButton";
import {SportIconButton} from "@components/SportIconButton/SportIconButton";
import {SportLink} from "@components/SportLink/SportLink";

import {Dividers} from "../../Dividers/Dividers";

import {useRegister} from "../useRegister";
import {FirstStep} from "../FirstStep/FirstStep";
import {SecondStep} from "../SecondStep/SecondStep";

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
  const {handleSubmit, register} = methods;

  const {isMobile} = useMedia();
  const {registration} = useRegister();

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
      <Grid container justifyContent="space-between">
        <SportIconButton disabled={isFirstStep} onClick={handleBack}>
          <KeyboardDoubleArrowLeftIcon />
        </SportIconButton>
        {!isLastStep ? (
          <SportButton className="w-60 my-3" onClick={handleNext}>
            Next
          </SportButton>
        ) : (
          <SportButton
            className="w-60 my-3"
            onClick={handleSubmit(registration)}
          >
            Submit
          </SportButton>
        )}
      </Grid>
      Already have an account?{" "}
      <SportLink to={routes.Login}>Sign in instead</SportLink>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className="mt-6"
      >
        <Dividers>
          <p className="px-3">or</p>
        </Dividers>
      </Grid>
    </SportForm>
  );
};
