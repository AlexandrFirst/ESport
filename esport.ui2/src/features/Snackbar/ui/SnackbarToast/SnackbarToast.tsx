import React, { FC, useEffect, useRef, useState } from "react";
import { Toast, ToastProps } from "@/shared/ui";

import { useSnackbarActions } from "../../model/slices/SnackbarSlice";

export interface SnackbarToastProps
  extends Omit<ToastProps, "remove" | "progress"> {
  className?: string;
}

export const SnackbarToast: FC<SnackbarToastProps> = (props) => {
  const { id, duration, position, ...other } = props;

  const { removeSnack } = useSnackbarActions();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleRemove = (id: number) => {
    wrapperRef?.current?.classList.add("animate-toastOut");

    wrapperRef?.current?.addEventListener("animationend", () => {
      removeSnack({ toastId: id });
    });
  };

  //auto dismiss
  const dismissRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (duration) {
      dismissRef.current = setTimeout(() => {
        wrapperRef?.current?.classList.add("animate-toastOut");
        wrapperRef?.current?.addEventListener("animationend", () => {
          removeSnack({ toastId: id });
        });
      }, duration);
    }

    return () => {
      clearTimeout(dismissRef.current);
    };
  }, []);

  // progressBar
  const progressBarRef = useRef<ReturnType<typeof setInterval>>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const complete = 100;

    if (duration) {
      progressBarRef.current = setInterval(() => {
        if (progress < complete) {
          setProgress((prev) => prev + 1);
        } else {
          return;
        }
      }, duration / complete);
    }

    return () => {
      clearInterval(progressBarRef.current);
    };
  }, []);

  return (
    <Toast
      {...other}
      id={id}
      position={position}
      progress={progress}
      ref={wrapperRef}
      remove={handleRemove}
      duration={duration}
    />
  );
};
