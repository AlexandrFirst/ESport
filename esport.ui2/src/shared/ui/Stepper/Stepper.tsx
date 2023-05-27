import React, { FC } from "react";
import styles from "./Stepper.module.css";
import cn from "classnames";

export interface Step {
  title: string;
  subtitle?: string;
}

interface StepperProps {
  className?: string;
  steps: Step[];
  activeStep: number;
  setActiveStep: (step: number) => void;
}

export const Stepper: FC<StepperProps> = ({ className }) => {
  return <div className={cn(styles.wrapper, className)}>In progress</div>;
};
