import React, { FC } from "react";
import styles from "./Stepper.module.css";

import cn from "classnames";

import { Step } from "./Step";
import { IStep } from "./stepper.props";

export type StepperList = IStep[];

interface StepperProps {
  className?: string;
  steps: IStep[];
  activeStep: number;
  onStepClick?: (step: IStep) => void;
  justifyBetween?: boolean;
}

export const Stepper: FC<StepperProps> = ({
  className,
  steps,
  activeStep,
  onStepClick,
  justifyBetween,
}: StepperProps) => {
  return (
    <div
      className={cn("flex gap-4", className, {
        "justify-between": justifyBetween,
      })}
    >
      {steps.map((step) => (
        <Step
          key={step.title}
          step={step}
          activeStep={activeStep}
          onClick={onStepClick}
        />
      ))}
    </div>
  );
};
