import { forwardRef, ReactNode, RefObject } from "react";
import styles from "./Toast.module.css";

import cn from "classnames";

// import { useToast } from "./useToast";
import {
  animationVariables,
  closeButtonClasses,
  closeIcon,
  getIcon,
  iconClasses,
  wrapperClasses,
} from "./utils";

export type ToastPositionType =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomRight"
  | "bottomCenter"
  | "bottomLeft";

export type ToastProps = {
  id: number;
  type?: "success" | "info" | "warning" | "error";
  message?: ReactNode;
  duration?: number;
  icon?: ReactNode | boolean;
  remove?: (toastId: number) => void;
  position: ToastPositionType;
  progress?: number;
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  props,
  wrapperRef
) {
  let {
    type = "info",
    icon = "",
    message = "---",
    id,
    duration = 3000,
    remove,
    position,
    progress = 0,
  } = props;
  icon = icon === "" ? getIcon(type) : icon;

  return (
    <div
      style={{ ["--elm-translate" as any]: animationVariables[position] }}
      className={cn(styles.wrapper, wrapperClasses[type], "animate-toastIn")}
      ref={wrapperRef}
      role={"alert"}
    >
      {!!duration && (
        <div className={styles.durationWrapper}>
          <span className={styles.duration} style={{ width: `${progress}%` }} />
        </div>
      )}

      {icon && (
        <div className={cn(iconClasses[type], "flex p-3")}>
          <div className={styles.iconWrapper}>
            <span className="sr-only">{type} Icon</span>
            {icon}
          </div>
        </div>
      )}
      <div className={styles.message}>{message}</div>
      <button
        aria-label="Close"
        onClick={() => remove?.(id)}
        className={styles.close}
      >
        <span className="sr-only">Close</span>
        {closeIcon}
      </button>
    </div>
  );
});
