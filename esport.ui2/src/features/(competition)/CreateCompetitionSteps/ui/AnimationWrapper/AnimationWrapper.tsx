import { FC, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimationWrapperProps {
  children: ReactNode;
}

export const AnimationWrapper: FC<AnimationWrapperProps> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
};
