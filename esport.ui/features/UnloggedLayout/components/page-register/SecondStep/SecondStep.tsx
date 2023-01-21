import React from "react";
import { UseFormRegister } from "react-hook-form";

import { RegisterSteps } from "@features/UnloggedLayout/enums";
import { IRegisterForm } from "@features/UnloggedLayout/interfaces";

import { RegisterInput } from "../RegisterInput/RegisterInput";

interface SecondStepProps {
  currStep: RegisterSteps;
  register: UseFormRegister<IRegisterForm>;
}

export const SecondStep: React.FC<SecondStepProps> = ({
  currStep,
  register,
}) => {
  const isHided = currStep !== RegisterSteps.SportInfo;

  return (
    <>
      <RegisterInput
        {...register("password")}
        label={"Password"}
        isHided={isHided}
        type={"password"}
      />
      <RegisterInput
        {...register("confirmPassword")}
        label={"Confirm password"}
        isHided={isHided}
        type={"password"}
      />
    </>
  );
};
