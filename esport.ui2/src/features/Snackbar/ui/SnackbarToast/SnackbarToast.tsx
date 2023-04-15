import React, { FC, memo, RefObject, useEffect, useRef, useState } from "react";
import styles from "./SnackbarToast.module.css";
import { Toast, ToastProps } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { snackbarActions } from "@/features/Snackbar";
import { selectPosition } from "@/features/Snackbar/model/selectors/selectPosition/selectPosition";

export interface SnackbarToastProps
  extends Omit<ToastProps, "remove" | "progress"> {
  className?: string;
}

export const SnackbarToast: FC<SnackbarToastProps> = (props) => {
  const { id, duration, position, ...other } = props;

  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleRemove = (id: number) => {
    wrapperRef?.current?.classList.add("animate-toastOut");

    wrapperRef?.current?.addEventListener("animationend", () => {
      dispatch(snackbarActions.remove({ toastId: id }));
    });
  };

  //auto dismiss
  const dismissRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (duration) {
      dismissRef.current = setTimeout(() => {
        wrapperRef?.current?.classList.add("animate-toastOut");
        wrapperRef?.current?.addEventListener("animationend", () => {
          dispatch(snackbarActions.remove({ toastId: id }));
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
