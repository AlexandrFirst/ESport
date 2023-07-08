import React, { ReactNode } from "react";
import styles from "./Modal.module.css";

import { Portal } from "@headlessui/react";

import { useModal } from "../../lib";
import Overlay from "../Overlay/Overlay";

import cn from "classnames";
import { Nunito } from "next/font/google";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  title?: string;
  description?: string;
  actions?: (close: () => void) => ReactNode;
  minSize?: "md" | "lg" | "full";
}

const ANIMATION_DELAY = 50;

const font = Nunito({
  subsets: ["latin", "cyrillic-ext", "cyrillic"],
  weight: ["300", "600", "700", "900"],
});

export const Modal = (props: ModalProps) => {
  const {
    actions,
    className,
    children,
    description,
    isOpen,
    onClose,
    lazy,
    title,
    minSize = "md",
  } = props;

  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  // const { theme } = useTheme();

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={cn(styles.modal, className, font.className, {
          [styles.opened]: isOpen,
          [styles.isClosing]: isClosing,
        })}
      >
        <Overlay
          onClick={close}
          className={cn({
            [styles.opened]: isOpen,
            [styles.isClosing]: isClosing,
          })}
        />

        <div className={cn(styles.content, styles[minSize])}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <h2 className={styles.description}>{description}</h2>}
          {children}
          {actions?.(close)}
        </div>
      </div>
    </Portal>
  );
};
