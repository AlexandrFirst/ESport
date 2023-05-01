import React, { ReactNode } from "react";
import { AnimationProvider, useAnimationLibs } from "@/shared/lib/ui";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

//TODO: make it!!!
export const DrawerContent = (props: DrawerProps) => {
  const { FramerMotion, Gesture } = useAnimationLibs();

  const { className, children, onClose, isOpen, lazy } = props;

  return (
    <FramerMotion.AnimatePresence>
      {isOpen && (
        <FramerMotion.motion.aside
          initial={{ width: 0 }}
          animate={{
            width: 300,
          }}
          exit={{
            width: 0,
            transition: { delay: 0.7, duration: 0.3 },
          }}
        >
          <FramerMotion.motion.div
            className="container"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
          >
            {children}
          </FramerMotion.motion.div>
        </FramerMotion.motion.aside>
      )}
    </FramerMotion.AnimatePresence>
  );
};

DrawerContent;

const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />
    </AnimationProvider>
  );
};
