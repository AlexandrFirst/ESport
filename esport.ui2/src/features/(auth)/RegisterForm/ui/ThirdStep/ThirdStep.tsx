import React from "react";

import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "next-i18next";

import { RegisterSteps } from "../../constants/register-step";
import { IRegisterForm } from "../../model/types/RegisterFormSchema";

import { RegisterInput } from "../RegisterInput/RegisterInput";

interface ThirdStepProps {
  currStep: RegisterSteps;
  register: UseFormRegister<IRegisterForm>;
}

export const ThirdStep: React.FC<ThirdStepProps> = ({ currStep, register }) => {
  const { t } = useTranslation("register");

  const isHided = currStep !== RegisterSteps.AdditioanalInfo;

  return (
    <>
      {/* <SportInputMask
        {...register("telephoneNumber")}
        mask={""}
        maskPlaceholder={"(+380)000-000-000"}
      /> */}
      <RegisterInput
        {...register("telephoneNumber")}
        label={t("telephoneNumber")}
        isHided={isHided}
      />
    </>
  );
};
