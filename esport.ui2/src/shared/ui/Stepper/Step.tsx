import { FC } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

import BoldText from "../Text/BoldText/BoldText";

import { IStep } from "./stepper.props";
import { CheckIcon } from "./CheckIcon";

interface StepProps {
  step: IStep;
  activeStep: number;
  onClick?: (step: IStep) => void;
}

export const Step: FC<StepProps> = ({ step, activeStep, onClick }) => {
  let status = step.completed
    ? "complete"
    : activeStep === step.value
    ? "active"
    : activeStep < step.value
    ? "inactive"
    : "active";

  const handleClick = () => onClick?.(step);

  return (
    <div
      className={cn("flex flex-col items-center gap-1", {
        "cursor-pointer": Boolean(onClick),
      })}
      onClick={handleClick}
    >
      <motion.div animate={status} className="relative">
        <motion.div
          variants={{
            active: {
              scale: 1,
              transition: {
                delay: 0,
                duration: 0.2,
              },
            },
            complete: {
              scale: 1.25,
            },
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "tween",
            ease: "circOut",
          }}
          className="absolute inset-0 rounded-full bg-theme-sub"
        ></motion.div>

        <motion.div
          initial={false}
          variants={{
            inactive: {
              backgroundColor: "var(--color-bg-sub)",
              borderColor: "var(--color-bg-sub)",
              color: "var(--color-text-light)",
            },
            active: {
              backgroundColor: "var(--color-bg-accent)",
              borderColor: "var(--color-bg-sub)",
              color: "var(--color-text-light)",
            },
            complete: {
              backgroundColor: "var(--color-bg-accent)",
              borderColor: "var(--color-bg-sub)",
              color: "var(--color-text-light)",
            },
          }}
          transition={{ duration: 0.2 }}
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold`}
        >
          <div className="flex items-center justify-center">
            {status === "complete" ? (
              <CheckIcon className="h-6 w-6" />
            ) : (
              <span>{step.value}</span>
            )}
          </div>
        </motion.div>
      </motion.div>
      <BoldText>{step.title}</BoldText>
    </div>
  );
};
