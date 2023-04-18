import { useModal } from "@/shared/lib";
import { Overlay } from "@/shared/ui";
import { Portal } from "@headlessui/react";

import cn from "classnames";
import React, { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  title?: string;
  description?: string;
  actions?: (close: () => void) => ReactNode;
}

const ANIMATION_DELAY = 50;

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
        className={cn(styles.modal, className, "app_modal", {
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

        <div className={styles.content}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <h2 className={styles.description}>{description}</h2>}
          {children}
          {actions?.(close)}
        </div>
      </div>
    </Portal>
  );
};
