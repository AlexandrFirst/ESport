import React from "react";
import { UseFormRegister } from "react-hook-form";

import { IRegisterForm } from "../../../../layouts/UnloggedLayout/interfaces";
import { RegisterSteps } from "../../../../layouts/UnloggedLayout/enums";
import { RegisterInput } from "../RegisterInput/RegisterInput";

interface FirstStepProps {
  currStep: RegisterSteps;
  register: UseFormRegister<IRegisterForm>;
}

export const FirstStep: React.FC<FirstStepProps> = ({ currStep, register }) => {
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
