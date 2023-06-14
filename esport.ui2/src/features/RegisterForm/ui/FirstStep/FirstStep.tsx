import React, { FC } from "react";

import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "next-i18next";

import { RegisterSteps } from "../../constants/register-step";
import { IRegisterForm } from "../../model/types/RegisterFormSchema";

import { RegisterInput } from "../RegisterInput/RegisterInput";

interface FirstStepProps {
  currStep: RegisterSteps;
  register: UseFormRegister<IRegisterForm>;
}

export const FirstStep: FC<FirstStepProps> = ({ currStep, register }) => {
  const { t } = useTranslation("register");

  const isHided = currStep !== RegisterSteps.MainInfo;
  return (
    <>
      <RegisterInput
        {...register("firstName")}
        label={t("firstName")}
        isHided={isHided}
      />
      <RegisterInput
        {...register("lastName")}
        label={t("lastName")}
        isHided={isHided}
      />
      <RegisterInput
        {...register("email")}
        label={t("email")}
        isHided={isHided}
      />
    </>
  );
};
