import React, { FC, ReactNode } from "react";
import styles from "./AnimatedLabel.module.css";

import cn from "classnames";
import { motion } from "framer-motion";

export interface AnimatedLabelProps {
  className?: string;
  label?: ReactNode;
  labelActive?: boolean;
  focused?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  error?: boolean;
  additionalHeight?: number;
}

export const AnimatedLabel: FC<AnimatedLabelProps> = ({
  className,
  label,
  labelActive,
  htmlFor,
  disabled,
  focused,
  error,
  additionalHeight = 0,
}) => {
  return (
    <motion.label
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: (labelActive || focused) && !disabled ? -35 + additionalHeight : 0,
        x: (labelActive || focused) && !disabled ? -10 : 0,
      }}
      htmlFor={htmlFor}
      className={cn(styles.text, styles.label, {
        [styles.error]: error,
        [styles.disabled]: disabled,
      })}
    >
      {label}
    </motion.label>
  );
};
