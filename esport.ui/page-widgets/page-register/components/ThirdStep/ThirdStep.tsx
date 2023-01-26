import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IRegisterForm } from "../../../../layouts/UnloggedLayout/interfaces";
import { RegisterSteps } from "../../../../layouts/UnloggedLayout/enums";
import { SportInputMask } from "../../../../shared/ui/SportInputMask/SportInputMask";

interface ThirdStepProps {
  currStep: RegisterSteps;
  register: UseFormRegister<IRegisterForm>;
}

export const ThirdStep: React.FC<ThirdStepProps> = ({ currStep, register }) => {
  const isHided = currStep !== RegisterSteps.AdditioanalInfo;

  return (
    <>
      <SportInputMask
        {...register("telephoneNumber")}
        mask={""}
        maskPlaceholder={"(+380)000-000-000"}
      />
      {/*<RegisterInput*/}
      {/*  {...register("telephoneNumber")}*/}
      {/*  label={"Telephone number"}*/}
      {/*  isHided={isHided}*/}
      {/*/>*/}
    </>
  );
};
