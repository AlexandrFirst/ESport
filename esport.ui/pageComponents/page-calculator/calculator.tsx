import React from "react";

import { useForm } from "react-hook-form";

import { SportInput } from "@components/SportInput/SportInput";
import { SportForm } from "@components/SportForm/SportForm";

import { ICalculatorForm } from "@pageComponents/page-calculator/interfaces";

export const Calculator: React.FC = () => {
  const m = useForm<ICalculatorForm>();
  return (
    <SportForm methods={m}>
      {/*TODO: add select with many variants at time*/}
      <SportInput name={"goals"} label={"Insert your goals"} />
    </SportForm>
  );
};
