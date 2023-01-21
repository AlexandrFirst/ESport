import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IRegisterForm } from "@features/UnloggedLayout/interfaces";
import { RegisterSteps } from "@features/UnloggedLayout/enums";
import { SportInputMask } from "@components/SportInputMask/SportInputMask";

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
