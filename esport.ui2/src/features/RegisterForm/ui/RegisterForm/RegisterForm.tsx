import { FC, useState } from "react";
import styles from "./RegisterForm.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

import cn from "classnames";

import { routes } from "@/shared/config";
import { useMedia, useWrapApi } from "@/shared/lib";
import { Button, FormWrapper, IconButton, UILink } from "@/shared/ui";

import { authService } from "@/entities/user";
import { useSnackbar } from "@/features/Snackbar";

import { useValidation } from "../../lib/hooks/useValidation";
import { IRegisterForm } from "../../model/types/RegisterFormSchema";
import { RegisterSteps } from "../../constants/register-step";

import { FirstStep } from "../FirstStep/FirstStep";
import { ThirdStep } from "../ThirdStep/ThirdStep";
import { SecondStep } from "../SecondStep/SecondStep";

export const RegisterForm: FC = () => {
  const validationSchema = useValidation();
  const methods = useForm<IRegisterForm>({
    resolver: yupResolver(validationSchema),
  });

  const { register, trigger } = methods;
  const [currStep, setCurrStep] = useState(RegisterSteps.MainInfo);
  const [isLoading, setIsLoading] = useState(false);

  const { isMobile } = useMedia();
  const withErrorAndLoading = useWrapApi();
  const { showError } = useSnackbar();

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

  const handleSubmit = methods.handleSubmit((data) => {
    setIsLoading(true);
    withErrorAndLoading(
      authService.register,
      {
        ...data,
        name: data.firstName,
        surname: data.lastName,
      },
      {
        onError: (e) => {
          showError(e.message);
        },
        onFinally: () => {
          setIsLoading(false);
        },
      }
    );
  });

  return (
    <FormWrapper
      methods={methods}
      className={cn(styles.form, {
        [styles.form_mobile]: isMobile(),
      })}
    >
      <FirstStep currStep={currStep} register={register} />
      <SecondStep currStep={currStep} register={register} />
      <ThirdStep currStep={currStep} register={register} />
      <div className={styles.btn_container}>
        <div className={styles.icon_container}>
          <IconButton
            Svg={ArrowUturnLeftIcon}
            disabled={isFirstStep}
            onClick={handleBack}
          />
        </div>

        {!isLastStep ? (
          <Button fullWidth={false} className={styles.btn} onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            fullWidth={false}
            className={styles.btn}
            onClick={handleSubmit}
            loading={isLoading}
          >
            Submit
          </Button>
        )}
      </div>
      <span className={styles.text}>Already have an account? </span>
      <UILink href={routes.Login}>Sign in instead</UILink>
    </FormWrapper>
  );
};