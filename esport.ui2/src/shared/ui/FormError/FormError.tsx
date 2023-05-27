import React, { FC } from "react";
import styles from "./FormError.module.css";

import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";

import { Message } from "../Input/InputBase";

interface FormErrorProps {
  className?: string;
  error?: Message;
}

export const FormError: FC<FormErrorProps> = ({ className, error }) => {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <motion.p
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={cn(styles.error, styles.helper_text, className)}
        >
          {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};
