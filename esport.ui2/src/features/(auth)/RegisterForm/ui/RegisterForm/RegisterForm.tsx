import { FC, useState } from "react";
import styles from "./RegisterForm.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

import cn from "classnames";

import { routes } from "@/shared/config";
import { useMedia, useSnackbar, useUrlWithReturnUrl } from "@/shared/lib";
import { Button, FormWrapper, IconButton, UILink } from "@/shared/ui";

import { AuthService } from "@/entities/user";

import { useValidation } from "../../lib/hooks/useValidation";
import { IRegisterForm } from "../../model/types/RegisterFormSchema";
import { getDefaultValues } from "../../lib/getDefaultValues/getDefaultValues";
import { RegisterSteps } from "../../constants/register-step";

import { FirstStep } from "../FirstStep/FirstStep";
import { SecondStep } from "../SecondStep/SecondStep";
import { ThirdStep } from "../ThirdStep/ThirdStep";

export const RegisterForm: FC = () => {
  const { t } = useTranslation("register");

  const validationSchema = useValidation();
  const methods = useForm<IRegisterForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: getDefaultValues(),
  });

  const { register, trigger } = methods;
  const [currStep, setCurrStep] = useState(RegisterSteps.MainInfo);
  const [isLoading, setIsLoading] = useState(false);

  const { isMobile } = useMedia();
  const { showError, showSuccess } = useSnackbar();
  const loginWithReturnUrl = useUrlWithReturnUrl(routes.Login());

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

  const handleSubmit = methods.handleSubmit(async (registerForm) => {
    setIsLoading(true);
    try {
      const { data } = await AuthService().register({
        ...registerForm,
        name: registerForm.firstName,
        surname: registerForm.lastName,
      });
      if (!data.isSuccess) {
        showError(data.error.toString(), { duration: 10000 });
        return;
      }
      showSuccess(t("form.success"));
    } catch (e: any) {
      showError(e.message);
    } finally {
      setIsLoading(false);
    }
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
            {t("form.next")}
          </Button>
        ) : (
          <Button
            fullWidth={false}
            className={styles.btn}
            onClick={handleSubmit}
            loading={isLoading}
          >
            {t("form.submit")}
          </Button>
        )}
      </div>
      <span className={styles.text}>{t("login.first")} </span>
      <UILink href={loginWithReturnUrl}>{t("login.link")}</UILink>
    </FormWrapper>
  );
};
