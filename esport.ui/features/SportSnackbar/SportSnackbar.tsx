import React from "react";
import styles from "./sportSnackbar.module.scss";

import cn from "classnames";

import { Alert, Slide, Snackbar } from "@mui/material";

import { MESSAGE_TIME } from "@shared/consts/app";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/useStore";

import {
  clearError,
  SnackbarPosition,
  SnackBarType,
} from "@features/SportSnackbar";

export const SportSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { type, message, open, position } = useAppSelector(
    ({ snackbar }) => snackbar
  );

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <Snackbar
      TransitionComponent={Slide}
      open={open}
      autoHideDuration={MESSAGE_TIME}
      onClose={handleClose}
      anchorOrigin={
        position === SnackbarPosition.TopRight
          ? { vertical: "top", horizontal: "right" }
          : { vertical: "bottom", horizontal: "left" }
      }
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}
        className={cn(styles.alert, {
          [styles.alert_success]: type === SnackBarType.SUCCESS,
          [styles.alert_error]: type === SnackBarType.ERROR,
          //TODO: add other types
        })}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
