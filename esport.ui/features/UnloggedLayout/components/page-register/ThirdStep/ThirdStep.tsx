import React from "react";
import { RegisterInput } from "@features/UnloggedLayout/components/page-register/RegisterInput/RegisterInput";
import { UseFormRegister } from "react-hook-form";
import { IRegisterForm } from "@features/UnloggedLayout/interfaces";
import { RegisterSteps } from "@features/UnloggedLayout/enums";

interface ThirdStepProps {
  currStep: RegisterSteps;
  register: UseFormRegister<IRegisterForm>;
}

export const ThirdStep: React.FC<ThirdStepProps> = ({ currStep, register }) => {
  const isHided = currStep !== RegisterSteps.AdditioanalInfo;

  return (
    <>
      <RegisterInput
        {...register("telephoneNumber")}
        label={"Telephone number"}
        isHided={isHided}
      />
    </>
  );
};
