import React, { FC } from "react";

import { UseFormRegister } from "react-hook-form";

import { RegisterSteps } from "../../constants/register-step";
import { IRegisterForm } from "../../model/types/RegisterFormSchema";

import { RegisterInput } from "../RegisterInput/RegisterInput";

interface FirstStepProps {
  currStep: RegisterSteps;
  register: UseFormRegister<IRegisterForm>;
}

export const FirstStep: FC<FirstStepProps> = ({ currStep, register }) => {
  const isHided = currStep !== RegisterSteps.MainInfo;
  return (
    <>
      <RegisterInput
        {...register("firstName")}
        label={"First name"}
        isHided={isHided}
      />
      <RegisterInput
        {...register("lastName")}
        label={"Last name"}
        isHided={isHided}
      />
      <RegisterInput {...register("email")} label={"Email"} isHided={isHided} />
    </>
  );
};
